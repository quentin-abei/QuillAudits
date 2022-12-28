// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./VIP_Bank.sol";

contract HackVIP {
    constructor(address _target) payable {
        VIP_Bank(_target).deposit();

    }
}