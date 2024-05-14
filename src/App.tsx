/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, BrowserProvider, ethers, JsonRpcSigner } from "ethers"
import { MAIN_ABI, CONTRACT_ADDRESS } from "./constants/web3"
import { useEffect, useState } from "react"
import Header from "./components/header/header";
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/react';
import Card from "./components/card/Card";
import Button from "./components/button/Button";
import CreditIcon from "./assets/icon/CreditIcon";
import MonyIcon from "./assets/icon/MonyIcon";
import ClockIcon from "./assets/icon/ClockIcon";


interface IParticipants {
  name?: string;
  addr?: string;
}

interface IWindow extends Window {
  ethereum?: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newWindow: IWindow = window;

// 1. Get projectId
const projectId = 'fd72a76967ba46cdfeb67b2c6de4b821';


// 2. Set chains
const mainnet = {
  chainId: 31337,
  name: 'localhost', // 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'http://localhost:8545', // 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}


// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  // enableEIP6963: true, // true by default
  // enableInjected: true, // true by default
  // enableCoinbase: true, // true by default
  // rpcUrl: 'http://localhost:8545', // used for the Coinbase SDK
  // defaultChainId: 31337, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})


function App() {
  const { open, } = useWeb3Modal()
  const { walletProvider } = useWeb3ModalProvider()
  const { isConnected } = useWeb3ModalAccount()
  const { disconnect } = useDisconnect()

  const [contract, setContract] = useState<Contract>();
  const [account, setAccount] = useState<JsonRpcSigner>()

  const [balance, setBalance] = useState<string>("0");
  const [winner, setWinner] = useState<IParticipants>();
  const [participants, setParticipants] = useState<IParticipants[]>([])


  useEffect(() => {
    if (!isConnected) return console.log('User disconnected');
    if (walletProvider == undefined) return console.log("Provider not found");

    newWindow.ethereum?.on("accountsChanged", async () => {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      setAccount(signer)
    })
  }, [])


  useEffect(() => {

    async function init() {
      if (!isConnected) return console.log('User disconnected');
      if (walletProvider == undefined) return console.log("Provider not found");

      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const _contract = new Contract(CONTRACT_ADDRESS, MAIN_ABI.abi, account || signer);
      setContract(_contract)
    }

    if (isConnected) init()
  }, [isConnected, account])

  useEffect(() => {
    if (contract) {
      getBalance()
      getAllParticipants()
      getWinner()
    }
  }, [contract]);



  async function getBalance() {
    const _balance = await contract?.getBalance();
    setBalance(ethers.formatEther(_balance));
  }

  async function getWinner() {
    const _winner = await contract?.winner();
    setWinner(_winner);
  }

  async function makeWinner() {
    const tx = await contract?.makeWinner();
    await tx.wait();
    getWinner()
    getBalance()
    getAllParticipants()
  }



  async function makeParticipate() {
    const tx = await contract?.participate("User Name", { value: ethers.parseEther("1.0") });
    await tx.wait();
    getAllParticipants()
    getBalance()
  }

  async function getAllParticipants() {
    const players = await contract?.getParticipates();
    setParticipants(players);
  }


  return (
    <div >
      <Header onClick={isConnected ? () => disconnect() : () => open()} text={isConnected ? "Disconnect" : "Connect"} />
      <div className="px-5 py-4">
        <div className="flex justify-center">
          <Card price={200} title="Total Balance" icon={<CreditIcon size={40} />} />
          <Card price={200} title="Deposited" icon={<MonyIcon size={40} />} />
          <Card price={200} title="Total Duration" icon={<ClockIcon size={40} />} />
        </div>
        <div className="flex justify-center space-x-3">
          <Button text="Deposit" onPress={() => { }} className="px-4" />
          <input type="number" name="deposit" id="deposit" className="border border-warmGray400 rounded-md text-center" />
        </div>
        <div className="flex justify-center mt-10">
          <p>Bike 01</p>
          <p>Bike 02</p>
          <p>Bike 03</p>
        </div>
      </div>
    </div>
  )
}

export default App