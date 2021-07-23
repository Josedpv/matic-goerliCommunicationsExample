const hre = require('hardhat');
async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer address', signer.address);
  /**
   * Contract factory
   */
  const NFT = await hre.ethers.getContractFactory('FlatChildCreature4');
  // const URI = 'something';

  /**
   * Owner of the nft and contract addresses
   */
  const WALLET_ADDRESS = '0x7e693A3E0132Fa9D24B883979d4e405A64D67361';
  const CONTRACT_ADDRESS = '0xfBb8a6edCF3EBDaF5a138E2750709df44D1C73d9';

  /**
   * Returns a new instance of the Contract attached to a new address
   */
  const contract = NFT.attach(CONTRACT_ADDRESS);

  /**
   * Minting a new NFT
   */
  const txResult = await contract.mintTo(WALLET_ADDRESS);
  console.log('Tx Result:', txResult);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
