const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const infuraKey = "ee7b75c863fb42a781fd6db2dd2dd68f";

const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = mnemonic;

const NODE_API_KEY = infuraKey;
const isInfura = true;

const NFT_CONTRACT_ADDRESS = '0xc481A6F6cEaD4F04bA40D8eeE2da577d7e7653f4';
const OWNER_ADDRESS = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const NETWORK = 'rinkeby';
const NUM_CREATURES = 12;

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "to",
        type: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

      const nftContract = new web3Instance.eth.Contract(
        NFT_ABI,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
      );

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await nftContract.methods
        .mint(OWNER_ADDRESS, i)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }
  }

main();