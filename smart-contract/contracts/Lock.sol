// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {

     address private  owner;
    struct User {
      string name;
      uint age;
      string gender;
      string email;
      uint due;
      uint deposit;
      uint time;
      bytes32 role;
    }
    mapping ( address => User) private users;
    address[] private userAddresses;


    constructor () {
      owner = msg.sender;
    }


    function createUser (address _address, string memory _name, uint _age , string memory _gender, string memory _email) public  {
     users[_address] = User(_name, _age,_gender,_email, 0, 0, 0, "user");
     userAddresses.push(_address);
    }

    function getUser (address _address) public view  returns (User memory) {
      return  users[_address];
    } 

    function getUsers  () public  view  returns (User[] memory){
     require(msg.sender == owner || (users[msg.sender].role == "admin"), "Owner or admin can only access get all user");

      User[] memory userList = new User[](userAddresses.length);
      for (uint i = 0; i < userAddresses.length; i++) {
        userList[i] = users[userAddresses[i]];
      }
      return userList;
    }

    function makeDeposit (address _address)  payable  public {
      if(users[_address].due > 0){
        uint depositeValue = msg.value - users[_address].due;
        users[_address].deposit = depositeValue;
        users[_address].due=0;
      }else  {
        users[_address].deposit = msg.value;
      }
    }

    function payDue (address _address) payable public  {
      require(users[_address].due >= msg.value, " Your value getterthen due");
      users[_address].due = users[_address].due - msg.value;
    }

   function renter (address _address, uint price) public  {
    require(users[_address].deposit > 0, "You don't have any deposit");
    if(users[_address].deposit < price) {
      users[_address].due =  price - users[_address].deposit;
    }else {
      users[_address].deposit =  users[_address].deposit - price;
    }
  }

   function makeAdmin (address _address) public  {
    require(msg.sender == owner, "Owner can make admin");
    users[_address].role = "admin";
   }

}
