/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ethers, Contract, formatUnits, BrowserProvider, Eip1193Provider,Signer } from 'ethers';
import {  useEffect, useState } from 'react';
import abi from './constants/abi.json'
const CONTRACT_ADDRESS = "0x270003719038c94eeae9932bbe973d2f4ab0910f";


interface IWindow extends Window {
  ethereum?: Eip1193Provider
}
const myWindow:IWindow = window ;

function App() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState <Signer | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [usd, setUsd] = useState<string>("0")


 // handle wallet connections
 const loginWithMetamask = async () => {
  
  if (myWindow.ethereum == null) {
    //@ts-ignore
    const newProvider = ethers.getDefaultProvider();
    setProvider(newProvider);
  } else {
    const newProvider = new ethers.BrowserProvider(myWindow.ethereum);
    setProvider(newProvider);

    const newSigner = await newProvider.getSigner();
    setSigner(newSigner);

    const newContract = new Contract(CONTRACT_ADDRESS, abi, newProvider);
    setContract(newContract);

    if (newSigner) {
      const { address } = newSigner;
      setAccount(address);
    }
  }
};

useEffect(()=>{
  loginWithMetamask()
},[])

  // get balance information
  const getBalance = async () => {
    if (contract && account) {
      const myBalance = await contract.balanceOf(account);
      setBalance(ethers.formatEther(myBalance))
      // setBalance(formatUnits(myBalance, 18));
    }
  };

// convert  eth to usd
const calculateEthToUsd = async () => {
  const res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`);
  const usdOfOneEth = await res.json();
  return usdOfOneEth.USD;
};

  useEffect(()=>{
  const init = async () => {
    const usdOfOneEth =  await calculateEthToUsd();
      if(balance) setUsd((Number(balance) * Number(usdOfOneEth)).toString())
    };
  init ()
  },[balance])


  return (
    <div className='flex flex-1 justify-center items-center flex-col space-y-4 '>
      <h1>{`Balance: ${balance}`} </h1>
      <p className='cursor-pointer' onClick={getBalance}>Get Balance </p>
      <h1>{`USD: ${usd}`} </h1>
    </div>
  )
}

export default App