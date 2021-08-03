const utils = require('../utils');
const maticPOSClient = utils.getMaticPOSClient();

const burnHash =
  '0x589267fcc495aeb1206c89392bdfed50e9a0d0cef6a800d1ff325927ab2bf215';

const execute = async () => {
  try {
    const tx = await maticPOSClient.exitERC721(burnHash, { from: '0x6844b555aed63c1741F469Ae87dE219a87825bFe' });
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

execute().then(() => process.exit(0));
