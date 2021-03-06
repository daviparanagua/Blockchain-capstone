pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract SquareVerifier is Verifier {

}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is MonsterToken {


// TODO define a solutions struct that can hold an index & an address
struct Solution {
        uint256 index;
        address addr;
    }


// TODO define an array of the above struct
Solution[] solutionsArray;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solution) private uniqueSolutions;

// TODO Create an event to emit when a solution is added
event SolutionAdded(address addr, uint256 key);


// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address _to, uint256 _index, bytes32 _key) internal {

        Solution memory mySolution = Solution({index : _index, addr : _to});

        solutionsArray.push(mySolution);
        uniqueSolutions[_key] = mySolution;
        emit SolutionAdded(_to, _index);
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintWithProof(address to, uint256 _tokenId, uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[2] memory input) public returns(bool){
       
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].addr == address(0), "Solution has already been used");
        addSolution(to, _tokenId, key);
        return super.mint(to, _tokenId);
    }
  
}