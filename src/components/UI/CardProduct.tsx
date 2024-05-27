import { HTMLAttributes } from "react"
import { Stars } from "./Stars"
import { Button } from "./Button"
import { useCartStorage } from "../../zustand/CartStorage"
import { ProductMock } from "../../types/ProductType"
import { CARD_TYPE } from "../../helpers/CardProductType"
import { IconX } from '@tabler/icons-react';

interface Props extends HTMLAttributes<HTMLElement>{
  Product: ProductMock
  typeCard: string
}
export const CardProduct: React.FC<Props> = ({Product, typeCard,...props})=>{
  const AddCartProduct = useCartStorage(Cart => Cart.setCartProduct)
  const DeleteCartProduct = useCartStorage(Cart=> Cart.setDeleteProduct)
  const handleClickButton = ()=>{
    AddCartProduct(Product)
  }
  const handleClickIconX = ()=>{
    DeleteCartProduct(Product)
  }
  return (
    <article {...props} className={`flex ${typeCard == CARD_TYPE.PRODUCT_GRID ? "flex-col justify-center pb-4" : "flex-row justify-between pr-2"} items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] max-w-96 ${props.className}`} >
      <header className={`${typeCard == CARD_TYPE.PRODUCT_GRID ? "w-full h-3/5" : "h-full w-2/6"}`}>
        <img src={Product.thumbnail} alt={`Imagen del producto ${Product.title}`} className="w-full h-full" />
      </header>
      <main className="flex flex-col justify-center items-center py-1 gap-1">
        <h3 className="font-semibold text-dark text-l"> {Product.title} </h3>
        <Stars numStars={Product.rating} typeCard={CARD_TYPE.PRODUCT_CART} />
        <strong className={`text-dark ${CARD_TYPE.PRODUCT_GRID == typeCard ? "text-xl" : "text-l"}`}> ${Product.price} </strong>
      </main>
      {
        typeCard == CARD_TYPE.PRODUCT_GRID ?
        <Button onClick={handleClickButton} >Agregar al Carrito</Button>
        : <IconX onClick={handleClickIconX} className="hover:text-action cursor-pointer" />

      }
    </article>
  )
}