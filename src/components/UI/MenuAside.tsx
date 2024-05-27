import { IconUser } from '@tabler/icons-react'
import { useThemeStorage } from "../../zustand/Theme"
import { Link } from 'react-router-dom'
import { PUBLIC_ROUTES } from '../../routes/TypesRoutes'
import { IconBuildingStore } from '@tabler/icons-react'

export const MenuAside: React.FC = ()=>{
  const ThemeConfig = useThemeStorage()
  const handleClickOverlay = () =>{
    ThemeConfig.setMenuAside(true)
    console.log(ThemeConfig.visibleMenuAside)
  }
  const handleAsideClick = (e: React.MouseEvent)=>{
    e.stopPropagation()
  }
  return (
    <section className='w-screen h-screen fixed top-0 left-0 bg- flex justify-center items-center md:justify-start bg-black/[0.5]' onClick={handleClickOverlay} >
      <aside className='px-6 h-4/5 w-4/5 md:h-full md:w-3/12 bg-white text-dark z-[1000]' onClick={handleAsideClick} >
        <header className='w-full flex flex-row justify-around items-center font-bold py-4'>
          <IconUser className='text-action' />
          <h2 >Hola, ¿quieres iniciar sesion?</h2>
        </header>
        <main className='h-full flex flex-col justify-start items-start gap-3'>
          <Link to={PUBLIC_ROUTES.LOGIN} className='flex flex-row w-full justify-center md:justify-start gap-2'> <IconUser className='text-action' /> Iniciar sesion </Link>
          <Link to={PUBLIC_ROUTES.SIGNIN} className='flex flex-row w-full justify-center md:justify-start gap-2'> 
            <IconUser className='text-action' /> Registrarse 
          </Link>
          <Link className='flex flex-row w-full justify-center md:justify-start gap-2' to={PUBLIC_ROUTES.PRODUCTS} > 
            <IconBuildingStore className='text-action' /> Ver Productos 
          </Link>
        </main>
      </aside>
    </section>
  )
}