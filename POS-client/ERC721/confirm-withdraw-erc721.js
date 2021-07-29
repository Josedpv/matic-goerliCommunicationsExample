const utils = require('./utils')

async function execute() {
    const { matic, network } = await utils.getMaticClient()
    const { from } = utils.getAccount()

    // provide the burn tx hash
    const txHash = '0x4a6dcb4704d3d8e6ca57221917b5041740a07d78a1abdb4eec00a4d44a155463'
    console.log(await matic.withdrawNFT(txHash, { from, gas: '2000000' }))

    // May use this to get Withdraw events from the child token contract
    // const c = matic.getERC721TokenContract(network.Matic.Contracts.Tokens.RootERC721)
    // const events = await c.getPastEvents('Withdraw', { fromBlock: 0, toBlock: 'latest'})
    // console.log(events)
}

execute().then(_ => process.exit(0))