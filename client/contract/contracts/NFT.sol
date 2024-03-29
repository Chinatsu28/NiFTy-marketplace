pragma solidity 0.5.16;
// pragma experimental ABIEncoderV2;

import "./ERC721Full.sol";

contract NFT is ERC721Full {
    uint public tokenCount;
    constructor() ERC721Full("DApp NFT", "DAPP") public {}
    function mint(string calldata _tokenURI) external returns(uint) {
        tokenCount ++;
        _mint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }
}