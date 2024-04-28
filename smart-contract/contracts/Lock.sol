// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {

    string private str = "";

    function setter (string memory _str) public {
        str=_str;
    }

    function getter () public view  returns (string memory){
        return str;
    }


    function addNumbers (uint num1, uint num2) pure public returns(uint) {
        return num1 + num2;
    }
}
