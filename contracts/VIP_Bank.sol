// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
// At any cost, lock the VIP user balance forever into the contract.

// 0xB6dDAf3348914D6E317bC3BC40AdC299A7F9b6b8
contract VIP_Bank{

    address public manager;
    mapping(address => uint) public balances;
    mapping(address => bool) public VIP;

    // @audit unless you want to create more problem to your VIP customers
    // @audit do not use this state variable, let him deposit as much money that he wants
    // @audit the balances mapping is enough to track how much funds a VIP own in the total contract balance
    uint public maxETH = 0.5 ether;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager , "you are not manager");
        _;
    }

    modifier onlyVIP() {
        require(VIP[msg.sender] == true, "you are not our VIP customer");
        _;
    }

    function addVIP(address addr) public onlyManager {
        VIP[addr] = true;
    }
    
    // @audit the deposit function should check that 
    // @audit the contract balance is not greater than
    // @audit maxETH , before accepting new deposits
    // @audit if contract balance is greater than maxETH, reverse the transaction
    // @audit-ok add require(address(this).balance <= maxETH), to avoid depositing more than maxETH
    // @audit-ok even that statements does not completely protect the VIP user
    // @audit-ok a maicious VIP can send more than maxETH by leveraging selfdestruct() function power
    // @audit-ok see https://www.alchemy.com/overviews/selfdestruct-solidity

    function deposit() public payable onlyVIP {
        require(msg.value <= 0.05 ether, "Cannot deposit more than 0.05 ETH per transaction");
        balances[msg.sender] += msg.value;
    }
    
    // @audit withdraw() will fail if a VIP manage to send more than maxETH
    // @audit funds to the contract . 
    // @audit-ok way to avoid locking VIP funds in your bank forever
    // @audit-ok remember VIP will get angry and accuse your bank of stealing his money
    // @audit-ok avoid using address(this).balance as a step of verification
    // @audit-ok you can delete it because checking that the VIP balance >= _amount is enough for him to withdraw
    function withdraw(uint _amount) public onlyVIP {
        require(address(this).balance <= maxETH, "Cannot withdraw more than 0.5 ETH per transaction");
        require(balances[msg.sender] >= _amount, "Not enough ether");
        balances[msg.sender] -= _amount;
        (bool success,) = payable(msg.sender).call{value: _amount}("");
        require(success, "Withdraw Failed!");
    }

    function contractBalance() public view returns (uint){
        return address(this).balance;
    }

}