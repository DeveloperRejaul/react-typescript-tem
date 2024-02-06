
export default [
     {
       "inputs": [],
       "stateMutability": "nonpayable",
       "type": "constructor"
     },
     {
       "inputs": [
         {
           "internalType": "address payable",
           "name": "walletAddress",
           "type": "address"
         },
         {
           "internalType": "string",
           "name": "fristName",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "lastName",
           "type": "string"
         },
         {
           "internalType": "bool",
           "name": "canRent",
           "type": "bool"
         },
         {
           "internalType": "bool",
           "name": "active",
           "type": "bool"
         },
         {
           "internalType": "uint256",
           "name": "balance",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "due",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "start",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "end",
           "type": "uint256"
         }
       ],
       "name": "addRenter",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [],
       "name": "balanceOf",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "walletAddress",
           "type": "address"
         }
       ],
       "name": "balanceOfRenters",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "walletAddress",
           "type": "address"
         }
       ],
       "name": "canRentBike",
       "outputs": [
         {
           "internalType": "bool",
           "name": "",
           "type": "bool"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "walletAddress",
           "type": "address"
         }
       ],
       "name": "checkOut",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "walletAddress",
           "type": "address"
         }
       ],
       "name": "checkinBike",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "walletAddress",
           "type": "address"
         }
       ],
       "name": "deposit",
       "outputs": [],
       "stateMutability": "payable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "walletAddress",
           "type": "address"
         }
       ],
       "name": "getTotalDuration",
       "outputs": [
         {
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "walletAddress",
           "type": "address"
         }
       ],
       "name": "makePayment",
       "outputs": [],
       "stateMutability": "payable",
       "type": "function"
     },
     {
       "inputs": [
         {
           "internalType": "address",
           "name": "",
           "type": "address"
         }
       ],
       "name": "renters",
       "outputs": [
         {
           "internalType": "address payable",
           "name": "walletAddress",
           "type": "address"
         },
         {
           "internalType": "string",
           "name": "fristName",
           "type": "string"
         },
         {
           "internalType": "string",
           "name": "lastName",
           "type": "string"
         },
         {
           "internalType": "bool",
           "name": "canRent",
           "type": "bool"
         },
         {
           "internalType": "bool",
           "name": "active",
           "type": "bool"
         },
         {
           "internalType": "uint256",
           "name": "balance",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "due",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "start",
           "type": "uint256"
         },
         {
           "internalType": "uint256",
           "name": "end",
           "type": "uint256"
         }
       ],
       "stateMutability": "view",
       "type": "function"
     }
   ]


export const contractAddress="0x5fbdb2315678afecb367f032d93f642f64180aa3"
