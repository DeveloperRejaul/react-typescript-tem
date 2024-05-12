/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, BrowserProvider, ethers, JsonRpcSigner } from "ethers"
import { MAIN_ABI, CONTRACT_ADDRESS } from "./constants/web3"
import { useEffect, useState } from "react"
import Header from "./components/header/header";
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/react';


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
    const tx = await contract?.participate("Kamal Mia", { value: ethers.parseEther("1.0") });
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

        <div className="flex space-x-2 justify-center py-6">
          <p className="text-xl text-warmGray600">Balance:</p>
          <p className="text-xl text-warmGray600">{balance} Eth</p>
        </div>

        <div className="flex space-x-7 justify-center py-6">
          <div className="cursor-pointer text-trueGray800 font-semibold bg-indigo500 px-3 py-1 rounded-md" onClick={makeParticipate}> Participate </div>
          <div className="cursor-pointer text-trueGray800 font-semibold bg-indigo500 px-3 py-1 rounded-md" onClick={makeWinner}> Make Winner </div>
        </div>

        <div className="flex space-x-7 justify-center">
          {/* Participant */}
          <div className="w-[20rem] bg-pink300 rounded-lg px-2 pt-4 pb-8">
            <h1 className="text-center font-bold text-xl text-violet500">Participant</h1>
            <div className="space-y-2 max-h-[12rem] overflow-y-auto">
              {participants.map((e, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-warmGray300" />
                  <div >
                    <p className="font-semibold text-lg text-warmGray700">{e?.name}</p>
                    <p className="font-semibold text-lg text-warmGray700">{e?.addr?.slice(0, 12)}...{e?.addr?.slice(e?.addr?.length - 5, e?.addr?.length)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Winner */}
          <div className="w-[20rem] bg-pink300 rounded-lg px-2 pt-4 pb-8 h-28">
            <div className="text-center font-bold text-xl text-violet500">Winner</div>
            <div className="flex items-center space-x-2">
              {winner && <div className="h-10 w-10 rounded-full bg-warmGray300" />}
              <div>
                {winner && <p className="font-semibold text-lg text-warmGray700">{winner?.name}</p>}
                {winner && <p className="font-semibold text-lg text-warmGray700">{winner?.addr?.slice(0, 12)}...{winner?.addr?.slice(winner?.addr?.length - 5, winner?.addr?.length)}</p>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App