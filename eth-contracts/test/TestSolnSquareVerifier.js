let SquareVerifier = artifacts.require('SquareVerifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

let zkProof = require('../../zokrates/code/square/proof');

// Test if a new solution can be added for contract - SolnSquareVerifier

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0]
    const account_two = accounts[1]

    beforeEach(async function () {
        const squareVerifier = await SquareVerifier.new({ from: account_one })
        this.contract = await SolnSquareVerifier.new(squareVerifier.address, {
            from: account_one
        })
    })

    it('Token can me minted with new solution', async function () {
        let proof = zkProof.proof;
        let result = await this.contract.mintWithProof(account_two, 1, proof.a, proof.b, proof.c, zkProof.inputs, { from: account_one });
        let owner = await (this.contract.ownerOf(1,  { from: account_one }));

        assert.equal(owner, account_two, 'Failed to add a solution and mint token')
    })
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier

    it('Token cant be minted with repeated solution', async function () {
        let reversed = false
        try {
            let result = await this.contract.mintWithProof(account_two, 1, proof.a, proof.b, proof.c, zkProof.inputs, { from: account_one });
        } catch (e) {
            reversed = true
        }

        assert.equal(reversed, true, "should not be able to mint");
    })
})