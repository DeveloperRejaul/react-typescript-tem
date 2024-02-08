import React from "react";

interface ICardProps {
    title: string,
    price: number,
    icon: React.ReactNode
  }
  

export default function Card ({title, price, icon}: ICardProps) {
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
  