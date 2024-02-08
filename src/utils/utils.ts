// const getContract = async () => {
//     try {
//       const signer =  await provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);
//       setContract(contract);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const connectWallet = async()=> {
//     try {
//       if(!window.ethereum) return alert("Please install meta mask extension in your browser");
//       const account = await provider.send("eth_requestAccounts",[]);
//       setCurrentAccount(account[0])
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const checkConnectAccount = async() => {
//     try {
//       if(!window.ethereum) return alert("Please install meta mask extension in your browser");
//      const account = await provider.send("eth_accounts",[]);
//      setCurrentAccount(account[0])
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const getBalance = async() => {
//     try {
//     const balance:number =  await contract.balanceOf();
//     const formattedBalance = formatUnits(balance, 18)
//     setBalance(formattedBalance)
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   const getDue = async() => {
//     try {
//       if(!currentAccount) return "No account"
//       const due:number = await contract.getDue(currentAccount)
//       const formattedDue:string = formatUnits(due,18);
//       setDue(formattedDue);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const getTotalDuration = async() => {
//     try {
//       const durationInMinutes = await contract.getTotalDuration()
//       setTotalDuration(durationInMinutes)
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const checkRenterExist =  async() => {
//     try {
//      const isRenter = await contract.renterExists()
//      setRenter(isRenter)
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   const addRenters = async(firstName:string , lastName:string) => {
//     try {
//       const renter = await contract.addRenter(currentAccount,firstName , lastName, true, false, 0,0,0,0 )
//       if(renter) await checkRenterExist()
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   const makeDeposit = async(amount: string)=> {
//     try {
//       const deposit = await contract.deposit(currentAccount, {value:parseUnits(amount, 18)})
//       await deposit.wait()
//       await getBalance()
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const getRenter = async ()=> {
//     try {
//       const renterDetails = await contract.getRenter(currentAccount);
//       setRenterDetails(renterDetails)
//     } catch (error) {
//       console.log(error);
      
//     }
//   }

//   const makePayment = async (amount:string) => {
//     try {
//       const payment = await contract.makePayment(currentAccount, {value: parseUnits(amount, 18)})
//       await payment.wait();
//       await getBalance();
//       await getDue();
//       await getTotalDuration();
//       await getRenter();
//     } catch (error) {
//       console.log(error);
      
//     }
//   }

// const checkout = async() => {
//   try {
//     const check = await contract.checkOut(currentAccount)
//     await check.wait();
//     await getRenter();
//   } catch (error) {
//     console.log(error);
//   }
// }

// const checkIn = async() => {
//   try {
//     const check = await contract.checkIn(currentAccount)
//     await check.wait();
//     await getRenter();
//     await getTotalDuration();
//     await getDue();
    
//   } catch (error) {
//     console.log(error);
    
//   }
// }

