import { IconMenu } from '@tabler/icons-react'
import { IconShoppingCart } from '@tabler/icons-react'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {
}
export const Header: React.FC<Props> = ({...props})=>{
  return (
    <header {...props} className={`w-full h-full bg-dark flex flex-row justify-between items-center text-white px-6 ${props.className}`}>
      <IconMenu />
      <h1 className="font-bold ">Coffee shop</h1>
      <IconShoppingCart />
    </header>
  )
}