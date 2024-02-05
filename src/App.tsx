import CheckIcon from "./assets/icon/CheckIcon";
import ClockIcon from "./assets/icon/ClockIcon";
import CreditIcon from "./assets/icon/CreditIcon";
import MetamaskIcon from "./assets/icon/MetamaskIcon";
import MonyIcon from "./assets/icon/MonyIcon";
import Button from "./components/button/Button";
import { useToken } from "./hooks/useToken";


const BLUE_COLOR:string = useToken('colors', 'blue700');

const data = [
  'https://i.ibb.co/FJKrV0m/motorcycle-png-20320.png',
  'https://i.ibb.co/RSrb8tm/motorcycles-icon-png-2710.png',
  'https://i.ibb.co/ZzGLxRN/motorcycle-png-20325.png'
];

interface ICardProps {
  title: string,
  price: number,
  icon: React.ReactNode
}


function HeaderLeftTitle () {
  return (
    <div className='flex flex-row' style={{paddingLeft:20}}>
      <p className='text-blue600 font-bold text-2xl '>Bike</p>
      <p className='text-blue400 font-bold text-2xl '>Chain</p>
    </div>
  );
}

function HeaderRightButton () {
  return (
    <div style={{paddingRight:20}}>
      <Button text='Metamask ID' className='px-2 bg-blue300 hover:bg-blue200' textStyle={{color:useToken('colors','blue900')}} leftIcon={<MetamaskIcon className='mr-2' />} />
    </div>
  );
}

function Card ({title, price, icon}: ICardProps) {
  return (
      <div className='flex justify-between items-center h-28 w-40 bg-white rounded-lg shadow-sm p-2 px-4 mx-4 my-4'>
        <div>
          <p className='text-black text-sm font-medium'>{title}</p>
          <p className='text-black text-lg font-bold'>{price}</p>
        </div>
        {icon}
    </div>
  );
}

export default function App() {

  return (
      <div className="h-screen overflow-hidden">
          <div className="flex justify-between py-3 shadow-md">
            <HeaderLeftTitle/>
            <HeaderRightButton/>
          </div>  
      <div className='overflow-y-scroll px-6 h-[90%]'>
        <div className='flex self-end py-5'>
          <p className='text-blueGray800 text-xl font-semibold'>Welcome </p>
          <p className='text-blue700 text-xl font-semibold'>Rezaul!</p>
        </div>

        {/* card part  */}
        <div className='flex flex-row justify-center flex-wrap'>
          <Card title='BNB Credit' price={20} icon={<CreditIcon size={40} />} />
          <Card title='BNB Due' price={20} icon={<MonyIcon size={40} color={BLUE_COLOR} />} />
          <Card title='Ride Minutes' price={20} icon={<ClockIcon size={40} color={BLUE_COLOR} />} />
          <Card title='Bike Status' price={20} icon={<CheckIcon size={40} color={BLUE_COLOR} />} />
        </div>

        {/* input part   */}
        <div className='flex justify-center flex-wrap py-9 '>
          <div className='p-4 rounded-md gap-y-5 border border-coolGray200 mr-2 my-2'>
            <p className='text-center bg-blue300 py-2 rounded-md font-bold'> Pay Deo  amount </p>
           <input className="my-3 py-1 focus:outline-none border border-warmGray100 rounded-lg px-2"/>
            <Button text='Submit' className='bg-blue400 hover:bg-blue300 w-full' />
          </div>
          <div className='p-4 rounded-md gap-y-5 border border-coolGray200 ml-2 my-2'>
            <p className='text-center bg-blue300 py-2 rounded-md font-bold'> Pay Deo  amount </p>
            <input className="my-3 py-1 focus:outline-none border border-warmGray100 rounded-lg px-2"/>
            <Button text='Submit' className='bg-blue400 hover:bg-blue300 w-full' />
          </div>
        </div>

        {/* Shop part */}
        <div className='flex mb-40 justify-center flex-wrap'>
          {data.map(uri=> (
            <div key={uri} className='w-[20rem] border border-coolGray200 px-3 py-4 mx-2 my-3 rounded-xl'>
              <div className='w-[18rem] h-[10rem] overflow-hidden pb-4'>
                <img src={uri} style={{height:'100%', width:'100%'}} />
              </div>
              <p className='text-warmGray500 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, saepe. Voluptatum quam nisi porro cumque voluptatem fuga provident recusandae ullam!</p>
              <div className='flex justify-between'>
                <Button className='px-4 mt-3' text='Check in' />
                <Button className='px-4 mt-3' text='Check out' />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
}