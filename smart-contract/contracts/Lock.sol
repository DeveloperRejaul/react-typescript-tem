// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {

   address public owner;
   address payable [] public players;
   address payable public winwer;

   constructor(){
    owner = msg.sender;
   }


   function prticipate () public payable {
        require(msg.sender != owner, "owner can't prticipate");
        require(msg.value == 1 ether, "1 eth required for prticipate");
        players.push(payable(msg.sender));
   }


   function getBalance() public view returns(uint) {
    require(msg.sender == owner, "owner can only get balance");
    return address(this).balance;
   }

   function makeWinwer() public {
     require(msg.sender == owner, "owner can only makeWinwer");
     require(players.length >= 3, "requires at least 3 players");
     winwer=players[0];
     winwer.transfer(getBalance());
   }
}
