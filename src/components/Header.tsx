import { IconMenu } from '@tabler/icons-react'
import { IconShoppingCart } from '@tabler/icons-react'
import { HTMLAttributes } from 'react'
import { useThemeStorage } from '../zustand/Theme'

interface Props extends HTMLAttributes<HTMLElement> {
}
export const Header: React.FC<Props> = ({...props})=>{
  const ThemeStorage = useThemeStorage()
  const handleClickIconMenu = ()=>{
    ThemeStorage.setMenuAside(ThemeStorage.visibleMenuAside)
  }
  return (
    <header {...props} className={`w-full h-full bg-dark flex flex-row justify-between items-center text-white px-6 ${props.className}`}>
      <IconMenu onClick={handleClickIconMenu} />
      <h1 className="font-bold ">Coffee shop</h1>
      <IconShoppingCart />
    </header>
  )
}