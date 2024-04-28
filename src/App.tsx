import { Contract, JsonRpcProvider } from "ethers"
import { MainAbi } from "./abis/abis"
import { useEffect } from "react"
const provider = new JsonRpcProvider("http://127.0.0.1:8545/")
const contract = new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", MainAbi.abi, provider)

function App() {


  useEffect(() => {
    const init = async () => {
      console.log(await contract.addNumbers(1, 1));
    }
    init()
  }, [])

  return (
    <div >App</div>
  )
}

export default App