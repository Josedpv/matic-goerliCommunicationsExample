const utils = require('../utils');
const maticPOSClient = utils.getMaticPOSClient();

const burnHash =
  '0x4a6dcb4704d3d8e6ca57221917b5041740a07d78a1abdb4eec00a4d44a155463';

const execute = async () => {
  try {
    const tx = await maticPOSClient.exitERC721(burnHash);
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

execute().then(() => process.exit(0));
