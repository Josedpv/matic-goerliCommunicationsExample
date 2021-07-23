//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "./ERC721Tradeable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract ChildCreature4 is ERC721Tradeable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradeable("DCreature4", "DOSC4", _proxyRegistryAddress)
    {}
    /**
     * Events for the burning 
     */
    event WithdrawnBatch(address indexed user, uint256[] tokenIds);
    event TransferWithMetadata(address indexed from, address indexed to, uint256 indexed tokenId, bytes metaData);

    /**
     * @notice called when user wants to withdraw token back to root chain
     * @dev Should handle withraw by burning user's token.
     * Should set `withdrawnTokens` mapping to `true` for the tokenId being withdrawn
     * This transaction will be verified when exiting on root chain
     * @param tokenId tokenId to withdraw
     */

    function withdraw(uint256 tokenId) external {
        require(_msgSender() == ownerOf(tokenId), "ChildMintableERC721: INVALID_TOKEN_OWNER");
        withdrawnTokens[tokenId] = true;
        _burn(tokenId);
    }
    mapping (uint256 => bool) public withdrawnTokens;

      /**
     * @notice called when token is deposited on root chain
     * @dev Should be callable only by ChildChainManager
     * Should handle deposit by minting the required tokenId(s) for user
     * Should set `withdrawnTokens` mapping to `false` for the tokenId being deposited
     * Minting can also be done by other functions
     * @param user user address for whom deposit is being done
     * @param depositData abi encoded tokenIds. Batch deposit also supported.
     */
    function deposit(address user, bytes calldata depositData)
        external
    {
        /**
        * Making contract only callable by ChildChainManager
        */
        require(msg.sender == 0x2e5e27d50EFa501D90Ad3638ff8441a0C0C0d75e);

        // deposit single
        if (depositData.length == 32) {
            uint256 tokenId = abi.decode(depositData, (uint256));
            withdrawnTokens[tokenId] = false;
            _mint(user, tokenId);

        // deposit batch
        } else {
            uint256[] memory tokenIds = abi.decode(depositData, (uint256[]));
            uint256 length = tokenIds.length;
            for (uint256 i; i < length; i++) {
                withdrawnTokens[tokenIds[i]] = false;
                _mint(user, tokenIds[i]);
            }
        }

    }
    bytes32 public constant DEPOSITOR_ROLE = keccak256("DEPOSITOR_ROLE");

    /**
    * Opensea URI's
    */
    function baseTokenURI() override public pure returns (string memory) {
        return "https://creatures-api.opensea.io/api/creature/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }

    

    /**
     * @notice called when user wants to withdraw multiple tokens back to root chain
     * @dev Should burn user's tokens. This transaction will be verified when exiting on root chain
     * @param tokenIds tokenId list to withdraw
     */
    function withdrawBatch(uint256[] calldata tokenIds) external {

        uint256 length = tokenIds.length;

        /**
         * Condition for how many tokens can you withdraw at once
         */
        require(length <= 10, "ChildMintableERC721: EXCEEDS_BATCH_LIMIT");

        // Iteratively burn ERC721 tokens, for performing
        // batch withdraw
        for (uint256 i; i < length; i++) {

            uint256 tokenId = tokenIds[i];

            require(_msgSender() == ownerOf(tokenId), string(abi.encodePacked("ChildMintableERC721: INVALID_TOKEN_OWNER ", tokenId)));
            withdrawnTokens[tokenId] = true;
            _burn(tokenId);

        }

        // At last emit this event, which will be used
        // in MintableERC721 predicate contract on L1
        // while verifying burn proof
        emit WithdrawnBatch(_msgSender(), tokenIds);

    }

   /**
   * Override isApprovedForAll to whitelist proxy accounts
   */
    function isApprovedForAll(
        address _owner,
        address _operator
    ) public override virtual view returns (bool isOperator) {
        // Use 0x58807baD0B376efc12F5AD86aAc70E78ed67deaE as the whitelisted address for ERC721's.
        if (_operator == address(0x58807baD0B376efc12F5AD86aAc70E78ed67deaE)) {
            return true;
        }
        
        return ERC721.isApprovedForAll(_owner, _operator);
    }


}