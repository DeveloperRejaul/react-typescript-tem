/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, BrowserProvider, ethers } from "ethers"
import { MainAbi } from "./abis/abis"
import { useEffect, useState } from "react"
import Header from "./components/header/header";
import { JsonRpcSigner } from "ethers";


interface IWindow extends Window {
  ethereum?: any
}
interface IParticipants {
  name?: string;
  addr?: string;
}

const newWindow: IWindow = window;


function App() {

  const [readContract, setReadContract] = useState<Contract>();
  const [writeContract, setWriteContract] = useState<Contract>();
  const [connected, setConnect] = useState(false);
  const [account, setAccount] = useState<JsonRpcSigner>()

  const [balance, setBalance] = useState<string>("0");
  const [winner, setWinner] = useState<IParticipants>();
  const [participants, setParticipants] = useState<IParticipants[]>([])

  useEffect(() => {

    newWindow.ethereum?.on("accountsChanged", async () => {
      const _provider = new BrowserProvider(newWindow.ethereum);
      const accounts = await _provider?.listAccounts();
      if (accounts.length <= 0) {
        setAccount(accounts[0])
      }
      connectWallet()
    });

    const init = async () => {
      if (!newWindow.ethereum) return
      const _provider = new BrowserProvider(newWindow.ethereum);
      const accounts = await _provider?.listAccounts();
      if (accounts.length <= 0) {
        setConnect(false)
      } else {
        setConnect(true);
        setAccount(accounts[0])
        connectWallet()
      }
    }
    init()
  }, [])

  useEffect(() => {
    if (readContract && writeContract) {
      getBalance()
      getAllParticipants()
      getWinner()
    }
  }, [readContract, writeContract])

  async function connectWallet() {
    if (!newWindow.ethereum) return
    const _provider = new BrowserProvider(newWindow.ethereum);
    const _readContract = new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", MainAbi.abi, _provider);
    setReadContract(_readContract)
    const signer = await _provider.getSigner()
    const _writeContract = new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", MainAbi.abi, account || signer)
    setWriteContract(_writeContract);
    setConnect(true)
  }


  async function getBalance() {
    const _balance = await readContract?.getBalance();
    setBalance(ethers.formatEther(_balance));
  }

  async function getWinner() {
    const _winner = await readContract?.winner();
    setWinner(_winner);
  }

  async function makeWinner() {
    const tx = await writeContract?.makeWinner();
    await tx.wait();
    getWinner()
    getBalance()
    getAllParticipants()
  }



  async function makeParticipate() {
    const tx = await writeContract?.participate("Kamal Mia", { value: ethers.parseEther("1.0") });
    await tx.wait();
    getAllParticipants()
    getBalance()
  }

  async function getAllParticipants() {
    const players = await readContract?.getParticipates();
    setParticipants(players);
  }


  return (
    <div >
      <Header onClick={connectWallet} text={connected ? "Disconnect" : "Connect"} />
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
          <div className="w-[20rem] bg-pink300 rounded-lg px-2 pt-4 pb-8">
            <div className="text-center font-bold text-xl text-violet500">Winner</div>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-warmGray300" />
              <div>
                <p className="font-semibold text-lg text-warmGray700">{winner?.name}</p>
                <p className="font-semibold text-lg text-warmGray700">{winner?.addr?.slice(0, 12)}...{winner?.addr?.slice(winner?.addr?.length - 5, winner?.addr?.length)}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App