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
        let result = await this.contract.mint(account_two, 1, { from: account_one });
        assert.equal(result.logs[0].event, 'SolutionAdded', 'Failed to add a solution')
    })
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier

    it('Token cant be minted with repeated solution', async function () {
        let reversed = true
        try {
            await this.contract.mint(account_two, 1, { from: account_one })
        } catch (e) {
            reversed = false
        }

        assert.equal(reversed, true, "should not be able to mint");
    })
})