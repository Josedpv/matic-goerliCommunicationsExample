const utils = require('../utils');
const maticPOSClient = utils.getMaticPOSClient();

const burnHash =
  '0x00d622827173c6dd6b1fcfd82f7e1ac0831685bffbdac4ba9c5ec07847e5db8f';

const execute = async () => {
  try {
    const tx = await maticPOSClient.exitERC721(burnHash, { from: '0x6844b555aed63c1741F469Ae87dE219a87825bFe' });
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

execute().then(() => process.exit(0));
