# meta-transactions

## Compiling

This project uses Hardhat as the Solidity development environment. Run the following to compile the contracts within the `contracts` directory:

```
yarn run hardhat compile
```

## Testing

Tests can be found in the `test` directory, and can be run with the following:

```
yarn run hardhat test
```

## Running scripts

Scripts within the `scripts` directory can be used to deploy the contracts. For example:

```
npx hardhat run scripts/ERC721-deploy.js --network matic
```
