import { IconMenu } from '@tabler/icons-react'
import { IconShoppingCart } from '@tabler/icons-react'
import { HTMLAttributes } from 'react'
import { useThemeStorage } from '../zustand/Theme'
import { useNavigate } from 'react-router'
import { PUBLIC_ROUTES } from '../routes/TypesRoutes'

interface Props extends HTMLAttributes<HTMLElement> {
}
export const Header: React.FC<Props> = ({...props})=>{
  const ThemeStorage = useThemeStorage()
  const navegate = useNavigate()
  const handleClickIconMenu = ()=>{
    ThemeStorage.setMenuAside(ThemeStorage.visibleMenuAside)
  }
  const handleClickIconCart = ()=>{
    ThemeStorage.setViewCart(ThemeStorage.viewCart)
  }
  const handleClickHeader = ()=>{
    navegate(PUBLIC_ROUTES.HOME)
  }
  return (
    <header {...props} className={`w-full h-20 bg-dark flex flex-row justify-between items-center text-white px-6 ${props.className}`}>
      <IconMenu onClick={handleClickIconMenu} className='cursor-pointer hover:text-action' />
      <h1 onClick={handleClickHeader} className="font-bold text-3xl font-mono cursor-pointer hover:text-action">Coffee shop</h1>
      <IconShoppingCart onClick={handleClickIconCart} className='cursor-pointer hover:text-action' />
    </header>
  )
}