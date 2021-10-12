const Web3 = require('web3');
const EEAClient = require('web3-eea');

const bytecode = "608060405234801561001057600080fd5b5060405161014d38038061014d8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f38061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea2646970667358221220e6966e446bd0af8e6af40eb0d8f323dd02f771ba1f11ae05c65d1624ffb3c58264736f6c63430007060033";
// initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";

const web3 = new Web3(clientUrl);
const web3eea = new EEAClient(web3, 1337);
const txOptions = {
    data: '0x' + bytecode + contractConstructorInit,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey]
};
console.log("Creating contract...");
const txHash = await web3eea.eea.sendRawTransaction(txOptions);
console.log("Getting contractAddress from txHash: ", txHash);

const privateTxReceipt = await web3.priv.getTransactionReceipt(txHash, fromPublicKey);
// console.log("Private Transaction Receipt: ", privateTxReceipt);
return privateTxReceipt;