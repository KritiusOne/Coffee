import { IconUser } from '@tabler/icons-react'
import { useThemeStorage } from "../../zustand/Theme"
import { Link, useNavigate } from 'react-router-dom'
import { PRIVATE_CLIENT_ROUTES, PUBLIC_ROUTES } from '../../routes/TypesRoutes'
import { IconBuildingStore } from '@tabler/icons-react'
import { useUserStorage } from '../../zustand/UserStorage'

export const MenuAside: React.FC = ()=>{
  const ThemeConfig = useThemeStorage()
  const UserInfo = useUserStorage(Storage => Storage.userInfo)
  const logOut = useUserStorage(Storage => Storage.logOut)
  const navegate = useNavigate()
  const handleClickOverlay = () =>{
    ThemeConfig.setMenuAside(true)
    console.log(ThemeConfig.visibleMenuAside)
  }
  const handleAsideClick = (e: React.MouseEvent)=>{
    e.stopPropagation()
  }
  const handleClickOpcion2 = ()=>{
    if(UserInfo == undefined){
      navegate(PUBLIC_ROUTES.SIGNIN)
    }else{
      logOut()
      navegate(PUBLIC_ROUTES.LOGIN)
    }
  }
  return (
    <section className='w-screen h-screen fixed top-0 left-0 bg- flex justify-center items-center md:justify-start bg-black/[0.5]' onClick={handleClickOverlay} >
      <aside className='px-6 h-4/5 w-4/5 md:h-full md:w-3/12 bg-white text-dark z-[1000]' onClick={handleAsideClick} >
        <header className='w-full flex flex-row justify-around items-center font-bold py-4'>
          <IconUser className='text-action' />
          <h2 >Hola, {UserInfo == undefined ? "¿quieres iniciar sesion?" : UserInfo.first_name}</h2>
        </header>
        <main className='h-full flex flex-col justify-start items-start gap-3'>
          <Link to={ UserInfo == undefined ? PUBLIC_ROUTES.LOGIN : PRIVATE_CLIENT_ROUTES.RESERVATION} className='flex flex-row w-full justify-center md:justify-start gap-2'> <IconUser className='text-action' /> {UserInfo == undefined ?  "Iniciar sesion" : "Hacer Reservacion"}</Link>
          <button onClick={handleClickOpcion2} className='flex flex-row w-full justify-center md:justify-start gap-2'> 
            <IconUser className='text-action' /> { UserInfo == undefined? "Registrarse" : "LogOut"} 
          </button>
          <Link className='flex flex-row w-full justify-center md:justify-start gap-2' to={PUBLIC_ROUTES.PRODUCTS} > 
            <IconBuildingStore className='text-action' /> Ver Productos 
          </Link>
        </main>
      </aside>
    </section>
  )
}