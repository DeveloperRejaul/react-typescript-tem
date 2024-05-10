/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, BrowserProvider, Signer, ethers } from "ethers"
import { MainAbi } from "./abis/abis"
import { useEffect, useState } from "react"


interface IWindow extends Window {
  ethereum?: any
}

const newWindow: IWindow = window;


function App() {

  // const [provider, setProvider] = useState<BrowserProvider>()
  // const [signer, setSigner] = useState<Signer>()

  useEffect(() => {
    const init = async () => {
      if (!newWindow.ethereum) return
      const provider = new BrowserProvider(newWindow.ethereum);
      const contract = new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", MainAbi.abi, provider);
      const signer = await provider.getSigner();
      const newContract = new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", MainAbi.abi, signer)

      console.log(await contract.getBalance());

      // const tx = await newContract.prticipate({ value: ethers.parseEther("1.0") })
      // await tx.wait();

      // await newContract.makeWinwer()

      // console.log("Participation successful!");




      // console.log(await contract.addNumbers(20, 50));
      // console.log(await contract.getter());

      // const transaction = await newContract.setter("hello world");
      // await transaction.wait();

      // console.log(await contract.getter());
    }
    init()
  }, [])

  return (
    <div >
      <div>connect Metamask</div>
    </div>
  )
}

export default App