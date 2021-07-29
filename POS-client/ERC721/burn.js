const config = require('../config');
const utils = require('../utils');
const maticPOSClient = utils.getMaticPOSClient();

const execute = async () => {
  try {
    const tx = await maticPOSClient.burnERC721(
      config.child.DERC721,
      config.user.tokenId,
      { from: '0x6844b555aed63c1741F469Ae87dE219a87825bFe' }
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

execute().then(() => process.exit(0));
