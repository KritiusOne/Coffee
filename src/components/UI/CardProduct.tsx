import { HTMLAttributes } from "react"
import { Stars } from "./Stars"
import { Button } from "./Button"
import { useCartStorage } from "../../zustand/CartStorage"
import { Menu } from "../../types/ProductType"
import { CARD_TYPE } from "../../helpers/CardProductType"
import { IconX } from '@tabler/icons-react';
import { useNavigate } from "react-router"
import { PUBLIC_ROUTES } from "../../routes/TypesRoutes"
import { CantProduct } from "./CantProduct"

interface Props extends HTMLAttributes<HTMLElement> {
  Product: Menu
  typeCard: string
}
export const CardProduct: React.FC<Props> = ({ Product, typeCard, ...props }) => {
  const AddCartProduct = useCartStorage(Cart => Cart.setCartProduct)
  const DeleteCartProduct = useCartStorage(Cart => Cart.setDeleteProduct)
  const navegate = useNavigate()
  const handleClickButton = (e: React.MouseEvent) => {
    e.stopPropagation()
    AddCartProduct(Product)
  }
  const handleClickIconX = (e: React.MouseEvent) => {
    DeleteCartProduct(Product)
    e.stopPropagation()
  }
  const handleClickCard = () => {
    const UrlParams = new URLSearchParams();
    UrlParams.set("id", Product.Menu.id_menu.toString())
    const baseURL = PUBLIC_ROUTES.PRODUCT_DETAILS.split(":")
    const finalURL = `${baseURL[0]}${baseURL[1]}?${UrlParams.toString()}`
    navegate(finalURL)
    console.log(finalURL)
  }
  return (
    <article {...props} onClick={handleClickCard} className={`flex ${typeCard == CARD_TYPE.PRODUCT_GRID ? "flex-col justify-center pb-4" : "flex-row justify-between pr-2"} items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] max-w-96 cursor-pointer ${props.className}`} >
      <header className={`${typeCard == CARD_TYPE.PRODUCT_GRID ? "w-full h-3/5" : "h-full w-2/6"}`}>
        <img src={Product.Menu.img} alt={`Imagen del producto ${Product.Menu.nombre_producto}`} className="w-full h-full" />
      </header>
      <main className="flex flex-col justify-center items-center py-1 gap-1">
        <h3 className="font-semibold text-dark text-l"> {Product.Menu.nombre_producto} </h3>
        {
          typeCard != CARD_TYPE.PRODUCT_CART ? <Stars numStars={Product.average_rating == null ? undefined : Product.average_rating} typeCard={CARD_TYPE.PRODUCT_GRID} />
          :
          <CantProduct idProduct={Product.Menu.id_menu}  />
        }
        <strong className={`text-dark ${CARD_TYPE.PRODUCT_GRID == typeCard ? "text-xl" : "text-l"}`}> ${Product.Menu.precio} </strong>
      </main>
      {
        typeCard == CARD_TYPE.PRODUCT_GRID ?
          <Button onClick={handleClickButton} >Agregar al Carrito</Button>
          : <IconX onClick={handleClickIconX} className="hover:text-action cursor-pointer" />

      }
    </article>
  )
}