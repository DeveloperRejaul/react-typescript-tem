import { createContext,useEffect,useState } from "react"
import abi  from "../config/abi.json";
import { ethers, formatUnits, parseUnits, Contract } from "ethers";
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"


interface IAppContextProps  {
    children: React.ReactNode
}

interface IEtherContextTypes {
  currentAccount:string;
  contract: Contract,
  account:any;
  balance:string;
  due:string;
  totalDuration:number;
  renter:boolean;
  renterDetails:any;
  getContract: ()=> Promise<void>;
  connectWallet: ()=> Promise<void>;
  checkConnectAccount: ()=> Promise<void>;
  getBalance: ()=> Promise<void>;
  getDue: ()=> Promise<void>;
  getTotalDuration: ()=> Promise<void>;
  checkRenterExist: ()=> Promise<void>;
  addRenters: ()=> Promise<void>;
  makeDeposit: (amount: string)=> Promise<void>;
  getRenter: ()=> Promise<void>;
  makePayment: ()=> Promise<void>;
  checkoutBike: ()=> Promise<void>;
  checkinBike: ()=> Promise<void>;
}

export const EtherContext = createContext<IEtherContextTypes>({} as IEtherContextTypes )


export default function AppContext({children}:IAppContextProps) {

  const provider = new ethers.BrowserProvider(window.ethereum);
  



  useEffect(() => {
    const init  = async () => {
      const r =  await provider.send("eth_requestAccounts", []);
      console.log(r);
      
      const signer = await provider.getSigner()
      console.log(signer);
      
      
    }
    init()
  }, [])
  


  return (
    <EtherContext.Provider value={{}}>{children}</EtherContext.Provider>
  )
}


