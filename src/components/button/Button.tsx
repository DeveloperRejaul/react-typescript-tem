import React from 'react';
import { useToken } from '../../hooks/useToken';

interface IPropsType {
  onPress?: () => void
  text?: string;
  isLoading?: boolean;
  textStyle?: object;
  containerStyle?: object;
  className?: string;
  leftIcon?: React.ReactNode
}


const textColor = useToken('colors', 'blueGray400');

export default function Button({ onPress ,text,isLoading,textStyle,containerStyle,className, leftIcon}: IPropsType) {
  return (
    <button
      disabled={isLoading}
      style={containerStyle}
      className={`flex bg-blue400 justify-center items-center rounded-md py-1 hover:bg-blue300 flex-row ${className}`}
      onClick={onPress}
    >
      {leftIcon && leftIcon}
        <p
          style={textStyle}
          className={`text-[${textColor}] android:font-semibold ios:font-semibold text-lg web:font-bold`}
        >
          {text || 'Click Me'}
        </p>
    </button>
  );
}
