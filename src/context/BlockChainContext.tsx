import { createContext, useState } from "react"
import { ethers } from "ethers";
import abi,{contractAddress} from "../config/abi";


// const provider = new ethers.providers.Web3Provider(window.ethereum)
// await provider.send("eth_requestAccounts", []);
// const signer = provider.getSigner()


interface IAppContextProps  {
    children: React.ReactNode
}



interface IEtherContextTypes {
    connectWallet: ()=> Promise<void>
    currentAccount:string
}

export const EtherContext = createContext<IEtherContextTypes>({} as IEtherContextTypes )


export default function AppContext({children}:IAppContextProps) {

 const [currentAccount , setCurrentAccount] =useState<string>("")
  const  provider = new ethers.BrowserProvider(window.ethereum)

  // const contract = new ethers.Contract(contractAddress, abi, signer);

  const connectWallet = async () => {    
    try {
        if(!window.ethereum) return alert("Please install metamask");
        const signer =  await provider.getSigner();
        
        const account = await provider.send("eth_requestAccounts", [])
        setCurrentAccount(account[0]);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <EtherContext.Provider value={{connectWallet, currentAccount}}>{children}</EtherContext.Provider>
  )
}


