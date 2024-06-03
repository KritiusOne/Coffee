import { useNavigate } from "react-router"
import { CARD_TYPE } from "../../helpers/CardProductType"
import { useCartStorage } from "../../zustand/CartStorage"
import { useThemeStorage } from "../../zustand/Theme"
import { useUserStorage } from "../../zustand/UserStorage"
import { Button } from "./Button"
import { CardProduct } from "./CardProduct"
import { PRIVATE_CLIENT_ROUTES, PUBLIC_ROUTES } from "../../routes/TypesRoutes"

export const CartMenu:React.FC = ()=>{
  const Theme = useThemeStorage()
  const AllProductCart = useCartStorage()
  const token = useUserStorage(Storage => Storage.typeToken)
  const navegate = useNavigate()
  const handleClickOverly = ()=>{
    Theme.setViewCart(Theme.viewCart)
  }
  const handleClickCartMenu = (e: React.MouseEvent)=>{
    e.stopPropagation()
  }
  const handleClickButtonPedido = ()=>{
    if(token.length == 0){
      navegate(PUBLIC_ROUTES.LOGIN)
    }else{
      navegate(PRIVATE_CLIENT_ROUTES.CART_BUY)
    }
  }
  const handleClickButtonReservation = ()=>{
    if(token.length == 0){
      navegate(PUBLIC_ROUTES.LOGIN)
    }else{
      navegate(PRIVATE_CLIENT_ROUTES.RESERVATION)
    }
  }
  
  return (
    <div className='w-screen h-screen fixed top-0 right-0 flex items-center justify-center md:justify-end bg-black/[0.5]' onClick={handleClickOverly}>
      <aside className='flex flex-col justify-between h-4/5 w-4/5 md:h-full md:w-3/12 bg-white text-dark z-[1000] pb-2' onClick={handleClickCartMenu}>
        <header className="bg-action px-6 h-10 text-center flex justify-center items-center"> <span className="font-semibold text-xl">Carrito de compras</span></header>
        <main className="flex flex-col items-center md:justify-start h-full py-2 gap-2 overflow-auto px-4">
          {
            AllProductCart.CartProducts.map(ProductCart=> <CardProduct Product={ProductCart.Product} typeCard={CARD_TYPE.PRODUCT_CART} key={ProductCart.Product.Menu.id_menu} className="w-full"/>)
          }
        </main>
        <footer className="flex flex-col justify-center items-center mt-2">
          <div className="flex flex-row justify-center items-center gap-2">
            <Button onClick={handleClickButtonPedido}> Realizar pedido </Button>
            <Button onClick={handleClickButtonReservation}> Ir a la reservación </Button>
          </div>
          <span> Total: <strong>${AllProductCart.parcialPrice}</strong> </span>
        </footer>
      </aside>
    </div>
  )
}