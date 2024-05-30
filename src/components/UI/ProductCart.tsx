import { ChangeEvent, useState } from "react"
import { CartProductsInfo } from "../../types/ProductType"
import { Button } from "./Button"
import { Input } from "./Input"
import { useCartStorage } from "../../zustand/CartStorage"

interface Props {
  product: CartProductsInfo
}
export const ProductCart: React.FC<Props> = ({ product }) => {
  const setNewCantidad = useCartStorage(Storage => Storage.setCantidad)
  const [cantidad, setCantidad] = useState<number>(product.stockSolicitado)
  console.log( product.Product.title + " " + product.stockSolicitado)
  const handleChangeCantidad = (e: ChangeEvent<HTMLInputElement>)=>{
    const newCantidad: number =  parseInt(e.target.value)
    setCantidad(newCantidad)
  }
  const handleCickAddQuantity = ()=>{
    if(cantidad != product.stockSolicitado && cantidad > 0){
      setNewCantidad(product.Product.id, cantidad)
    }
  }
  return (
    <article className="flex flex-col justify-center items-start shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-mono">
      <div className="flex flex-row gap-3">
        <div className="w-2/5 h-full">
          <img className="w-full h-full" src={product.Product.thumbnail} alt={`Imagen de ${product.Product.title}`} />
        </div>
        <div className="flex flex-col gap-4 p-2">
          <h2 className="text-xl font-semibold text-dark text-pretty">
            {
              product.Product.title
            }
          </h2>
          <p className="text-md text-balance">
            {
              product.Product.description
            }
          </p>
        </div>
      </div>
      <div className="p-4 ">
        <span>Precio: <strong>${product.Product.price} C/U </strong></span>
        <div className="flex flex-row justify-center items-center gap-3">
          <span>Cantidad: {product.stockSolicitado} </span>
          <div className="flex flex-row justify-center gap-2">
            <Input onChange={handleChangeCantidad} typeInput="number" className="h-4 w-16"></Input>
            <Button onClick={handleCickAddQuantity}>Agregar cantidad</Button>
          </div>
        </div>
      </div>
    </article>
  )
}