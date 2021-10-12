const path = require('path');
const host = new Web3.providers.HttpProvider("https://goerli.infura.io/v3/8173bc023d8f45e595df4f3fb55db36e");
const fs = require('fs-extra');
const web3 = new Web3(host);
// use the existing Member1 account or make a new account
const privateKey = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

// read in the contracts
const contractJsonPath = path.resolve(__dirname, 'SimpleStorage.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = contractJson.abi;
const contractByteCode = contractJson.evm.bytecode.object

async function createContract(host, contractAbi, contractByteCode, contractInit, fromAddress, toPublicKey) {
    fromAddress = '0x6844b555aed63c1741F469Ae87dE219a87825bFe';

    const web3 = new Web3(host)
    const contractInstance = new web3.eth.Contract(contractAbi);
    const ci = await contractInstance
        .deploy({ data: '0x' + contractByteCode, arguments: [contractInit] })
        .send({ from: fromAddress, privateFor: [toPublicKey], gasLimit: "0x24A22" })
        .on('transactionHash', function (hash) {
            console.log("The transaction hash is: " + hash);
        });
    return ci;
};

// create the contract
async function main() {
    // sending the transaction from Member1 to Member3
    createContract("http://localhost:20000", contractAbi, contractByteCode, 47, "f0e2db6c8dc6c681bb5d6ad121a107f300e9b2b5", "1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=")
        .then(async function (ci) {
            console.log("Address of transaction: ", ci.options.address);
        })
        .catch(console.error);

}