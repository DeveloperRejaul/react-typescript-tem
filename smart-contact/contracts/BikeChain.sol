// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BikeChain {
    
    address owner;
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

    // chexkout bike 
    function checkOut (address walletAddress)public   {
        require(renters[walletAddress].due == 0 , "You have panding balance ");
        require(renters[walletAddress].canRent == true , "Can rent at this time ");
        renters[walletAddress].active = true; 
        renters[walletAddress].start = block.timestamp; 
        renters[walletAddress].canRent = false;
    }

     // chexkin bike 
     function checkinBike (address walletAddress) public  {
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
    function getTotalDuration(address walletAddress) public view  returns (uint) {
        if(renters[walletAddress].start == 0 || renters[walletAddress].end == 0){
            return 0;
        } else {
            uint timespan = rentersTimespan(renters[walletAddress].start, renters[walletAddress].end);
            uint timespanMinutes = timespan / 60 ;
            return  timespanMinutes; 
        }
    }

    // get contract balance 
    function balanceOf () view  public returns(uint) {
        return  address(this).balance;
    }

    // get Renters balance 
    function balanceOfRenters (address walletAddress) public  view  returns (uint){
        return renters[walletAddress].balance;
    }

    // Set Due Amount 
    function setDue (address walletAddress) internal  {
        uint timespanMinutes = getTotalDuration(walletAddress);
        uint fiveMinutesInrements = timespanMinutes / 5 ;
        renters[walletAddress].due = fiveMinutesInrements * 5000000000000000;
    }


    function canRentBike (address walletAddress) public  view  returns (bool){
        return renters[walletAddress].canRent;
    }


    // deposit 
    function deposit (address walletAddress) payable  public  {
        renters[walletAddress].balance +=msg.value;
    }

    // make payments
    function makePayment (address walletAddress) payable  public {
        require(renters[walletAddress].due > 0 , "You don't have any deo at this time");
        require(renters[walletAddress].balance > msg.value , "You don't have anough founds to cover payment. please make a deposit .");

        renters[walletAddress].balance -=msg.value;
        renters[walletAddress].canRent =true;
        renters[walletAddress].due =0;
        renters[walletAddress].start =0;
        renters[walletAddress].end =0;

    }
}