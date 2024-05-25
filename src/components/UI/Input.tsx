import {  InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  typeInput?: string 
}
export const Input: React.FC<Props> = ({typeInput, ...props})=>{
  return (
    <input {...props} type={!typeInput? "text" : typeInput} className={`shadow-[0_3px_10px_rgb(0,0,0,0.2)] outline-none border-2 border-dark/50 border-solid w-full h-7 px-3 py-4 rounded-md ${props.className}`}/>
  )
}