//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "./ERC721Tradeable.sol";
import {NativeMetaTransaction} from "./common/meta-transactions/NativeMetaTransaction.sol";
import {AccessControlMixin} from "./common/AccessControlMixin.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract ParentCreature4 is ERC721Tradeable, AccessControlMixin {

    bytes32 public constant PREDICATE_ROLE = keccak256("PREDICATE_ROLE");

    constructor(address _proxyRegistryAddress)
        ERC721Tradeable("DCreature4", "DOSC4", _proxyRegistryAddress)
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(PREDICATE_ROLE, 0x56E14C4C1748a818a5564D33cF774c59EB3eDF59);
    }
   
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
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return interfaceId == type(ERC721Tradeable).interfaceId || super.supportsInterface(interfaceId);
    }
    
    /**
     * @dev See {IMintableERC721-mint}.
     */
    function mint(address user, uint256 tokenId) external  only(PREDICATE_ROLE) {
        _mint(user, tokenId);
    }
    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;
        /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
     
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    /**
     * If you're attempting to bring metadata associated with token
     * from L2 to L1, you must implement this method, to be invoked
     * when minting token back on L1, during exit
     */
    function setTokenMetadata(uint256 tokenId, bytes memory data) internal virtual {
        // This function should decode metadata obtained from L2
        // and attempt to set it for this `tokenId`
        //
        // Following is just a default implementation, feel
        // free to define your own encoding/ decoding scheme
        // for L2 -> L1 token metadata transfer
        string memory uri = abi.decode(data, (string));

        _setTokenURI(tokenId, uri);
    }
    
    /**
     * @dev See {IMintableERC721-mint}.
     * 
     * If you're attempting to bring metadata associated with token
     * from L2 to L1, you must implement this method
     */
    function mint(address user, uint256 tokenId, bytes calldata metaData) external  only(PREDICATE_ROLE) {
        _mint(user, tokenId);

        setTokenMetadata(tokenId, metaData);
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
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