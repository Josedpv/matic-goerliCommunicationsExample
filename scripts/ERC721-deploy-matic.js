const hre = require('hardhat');

/**
 * Opensea address to whitelist
 */
const openseaProxy = '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE';
async function main() {
  // We get the contract to deploy
  const Creature3 = await hre.ethers.getContractFactory('ChildMintableERC721');
  const creature3 = await Creature3.deploy(
    //'0x3166fAF2D5c1669872e09065De614d3b98090E8f'
    '0x56E14C4C1748a818a5564D33cF774c59EB3eDF59'
  );

  await creature3.deployed();

  console.log('Sample ERC712 token deployed in matic to:', creature3.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
