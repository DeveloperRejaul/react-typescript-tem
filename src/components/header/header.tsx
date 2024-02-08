import MetamaskIcon from "../../assets/icon/MetamaskIcon";
import { useBlockChainContext } from "../../hooks/useBlockChainContext";
import { useToken } from "../../hooks/useToken";
import Button from "../button/Button";

export  function HeaderLeftTitle () {
    return (
      <div className='flex flex-row' style={{paddingLeft:20}}>
        <p className='text-blue600 font-bold text-2xl'>Bike</p>
        <p className='text-blue400 font-bold text-2xl'>Chain</p>
      </div>
    );
  }
  
 export function HeaderRightButton ({onPress}:{onPress?:()=>void}) {
    const {currentAccount} = useBlockChainContext ();
    return (
      <div style={{paddingRight:20}}>
        <Button onPress={onPress} text={ currentAccount ? `${currentAccount.slice(0,5)} ... ${currentAccount.slice(currentAccount.length-4)}`  :"Connect Wallet"} className='px-2 w-48 bg-blue300 hover:bg-blue200' textStyle={{color:useToken('colors','blue900')}} leftIcon={<MetamaskIcon className='mr-2' />} />
      </div>
    );
  }