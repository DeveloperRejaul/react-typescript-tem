// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {

   struct Player {
      string name;
      address payable addr;
    }

   address public owner;
   Player[] public players;
   Player public winner;

   constructor(){
    owner = msg.sender;
   }


   function participate (string memory name) public payable {
        require(msg.sender != owner, "owner can't participate");
        require(msg.value == 1 ether, "1 eth required for participate");
        players.push(Player(name,payable(msg.sender)));
   }


   function getBalance() public view returns(uint) {
    return address(this).balance;
   }

   function makeWinner() public {
     require(msg.sender == owner, "owner can only make Winner");
     require(players.length >= 3, "requires at least 3 players");
     uint index = uint256(keccak256(abi.encodePacked(block.timestamp)))%players.length;
     winner=players[index];
     winner.addr.transfer(getBalance());
     delete  players;
   }

   function getParticipates () public view  returns (Player[] memory) {
    return  players;
   }
}
