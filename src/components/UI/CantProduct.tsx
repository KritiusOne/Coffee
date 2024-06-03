import { useEffect, useState } from "react"
import { useCartStorage } from "../../zustand/CartStorage"
import { Button } from "./Button"

interface Props {
  idProduct: number
}
export const CantProduct: React.FC<Props> = ({idProduct}) => {
  const CartStorage = useCartStorage()
  const [cantidad, setCantidad] = useState<number | undefined>(1)
  useEffect(()=>{
    const actualCantidad = CartStorage.CartProducts.find(product => product.Product.Menu.id_menu == idProduct)
    setCantidad(actualCantidad?.stockSolicitado)
  }, )
  const handleClickButton = (e: React.MouseEvent)=>{
    e.stopPropagation()
    const actualCantidad = CartStorage.CartProducts.find(product => product.Product.Menu.id_menu == idProduct)
    if(actualCantidad != undefined){
      if(e.currentTarget.textContent == "+"){
        CartStorage.setCantidad(idProduct, actualCantidad.stockSolicitado + 1)
      }else if(e.currentTarget.textContent == "-"){
        actualCantidad.stockSolicitado - 1 > 0 ? CartStorage.setCantidad(idProduct, actualCantidad.stockSolicitado - 1): actualCantidad.stockSolicitado
      }
      setCantidad(actualCantidad.stockSolicitado)
    }
  }
  console.log(CartStorage)
  return (
    <div>
      <Button onClick={handleClickButton}>-</Button>
      <strong> {cantidad} </strong>
      <Button onClick={handleClickButton}>+</Button>
    </div>
  )
}