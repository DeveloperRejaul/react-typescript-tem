

interface IProps {
  onClick: () => void;
  text: string
}

function Header({ onClick, text }: IProps) {
  return (
    <div className="flex justify-between bg-light50 px-5 py-4 border-b border-b-darkBlue50">
      <div className="font-bold text-xl text-fuchsia600"><span className="text-pink600">Lottery Web3</span>/<span className="text-lime400">Blockchain App</span></div>
      <div onClick={onClick} className="font-semibold bg-indigo600 px-5 py-1 rounded-md cursor-pointer"> {text} </div>
    </div>
  )
}

export default Header