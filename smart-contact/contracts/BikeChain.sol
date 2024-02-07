// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BikeChain {
    
    address owner;
    uint ownerBalance;

    constructor() {
        owner = msg.sender;
    }

    
    // add yourself as a renter 
    struct Renter {
        address payable  walletAddress;
        string fristName;
        string lastName;
        bool canRent;
        bool active;
        uint balance;
        uint due;
        uint start;
        uint end;
    }

    mapping (address => Renter ) public  renters;

    function addRenter (address payable  walletAddress, string memory fristName, string memory lastName, bool canRent, bool active, uint balance, uint due, uint start,uint end) public  {
        renters[walletAddress] = Renter(walletAddress, fristName, lastName, canRent, active, balance, due, start, end);
    }

    modifier isRenter(address walletAddress) {
        require(msg.sender == walletAddress, "You can only manage your account");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to access this");
        _;
    }

    // chexkout bike 
    function checkOut (address walletAddress)public isRenter(walletAddress)   {
        require(renters[walletAddress].due == 0 , "You have panding balance ");
        require(renters[walletAddress].canRent == true , "Can rent at this time ");
        renters[walletAddress].active = true; 
        renters[walletAddress].start = block.timestamp; 
        renters[walletAddress].canRent = false;
    }

     // chexk in a bike 
     function checkIn (address walletAddress) public isRenter(walletAddress)  {
        require(renters[walletAddress].active == false , "Please checkout a bike first");
        renters[walletAddress].active = false;
        renters[walletAddress].end = block.timestamp;

        // set amount deo
        setDue(walletAddress);
        
     }

    function rentersTimespan   (uint start, uint end) internal pure  returns(uint) {
        return  end - start;
    }

    // get total duration bike use 
    function getTotalDuration(address walletAddress) public isRenter(walletAddress) view  returns (uint) {
        if(renters[walletAddress].start == 0 || renters[walletAddress].end == 0){
            return 0;
        } else {
            uint timespan = rentersTimespan(renters[walletAddress].start, renters[walletAddress].end);
            uint timespanMinutes = timespan / 60 ;
            return  timespanMinutes; 
        }
    }

    // get contract balance 
    function balanceOf () view  public onlyOwner() returns(uint) {
        return  address(this).balance;
    }

    function getOwnerBalance() view public onlyOwner() returns(uint) {
        return ownerBalance;
    }

    // get Renters balance 
    function balanceOfRenter (address walletAddress) public isRenter(walletAddress)   view  returns (uint){
        return renters[walletAddress].balance;
    }

    function withdrawOwnerBalance() payable public {
        payable(owner).transfer(ownerBalance);
    }

    // Set Due Amount 
    function setDue (address walletAddress) internal  {
        uint timespanMinutes = getTotalDuration(walletAddress);
        uint fiveMinutesInrements = timespanMinutes / 5 ;
        renters[walletAddress].due = fiveMinutesInrements * 5000000000000000;
    }


    function canRentBike (address walletAddress) public isRenter(walletAddress)  view  returns (bool){
        return renters[walletAddress].canRent;
    }


    // deposit 
    function deposit (address walletAddress) isRenter(walletAddress) payable  public  {
        renters[walletAddress].balance +=msg.value;
    }

    // Make Payment
    function makePayment(address walletAddress, uint amount) public isRenter(walletAddress) {
        require(renters[walletAddress].due > 0, "You do not have anything due at this time.");
        require(renters[walletAddress].balance > amount, "You do not have enough funds to cover payment. Please make a deposit.");
        
        renters[walletAddress].balance -= amount;
        ownerBalance += amount;
        renters[walletAddress].canRent = true;
        renters[walletAddress].due = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }


    function getDue(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].due;
    }

    function getRenter(address walletAddress) public isRenter(walletAddress) view returns(string memory fristName, string memory lastName, bool canRent, bool active) {
        fristName = renters[walletAddress].fristName;
        lastName = renters[walletAddress].lastName;
        canRent = renters[walletAddress].canRent;
        active = renters[walletAddress].active;
    }

    function renterExists(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        if (renters[walletAddress].walletAddress != address(0)) {
            return true;
        }
        return false;
    }
}




