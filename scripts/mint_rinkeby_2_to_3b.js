const hre = require('hardhat');
async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer address', signer.address);
  /**
   * Contract factory
   */
  const NFT = await hre.ethers.getContractFactory('FlatChildCreature2');
  // const URI = 'something';

  /**
   * Owner of the nft and contract addresses
   */
  const WALLET_ADDRESS = '0x6844b555aed63c1741F469Ae87dE219a87825bFe';

  const CONTRACT_ADDRESS = '0xE401502F4c559018D0e8e31F46D2b80F3e485cA2';//FlatChildCreature2
  /**
   * Returns a new instance of the Contract attached to a new address
   */
  const contract = NFT.attach(CONTRACT_ADDRESS);

  /**
   * Minting a new NFT
   */
  //transferOwnership
  const txResult = await contract.mintTo_b(WALLET_ADDRESS);

  console.log('Tx Result:', txResult);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
