import { useLocation } from "react-router"
import { Layout } from "../components/UI/Layout"
import { useEffect, useState } from "react"
import ResponseMock from "../helpers/mocks/products.json"
import { ProductMock } from "../types/ProductType"
import { Stars } from "../components/UI/Stars"
import { CARD_TYPE } from "../helpers/CardProductType"
import { Button } from "../components/UI/Button"
import { useCartStorage } from "../zustand/CartStorage"

export const ProductDetails: React.FC = ()=>{
  const location = useLocation()
  const UrlParams = new URLSearchParams(location.search)
  const [actualProductMock, setActualProductMock] = useState<ProductMock>(ResponseMock.products[0])
  const setProductCart = useCartStorage(Storage => Storage.setCartProduct)
  const [actualInfo, setActualInfo] = useState(false)
  useEffect(()=>{
    const [actualProductMock] = ResponseMock.products.filter(product => product.id.toString() == UrlParams.get("id"))
    setActualProductMock(actualProductMock)
  },[UrlParams.get("id")])
  console.log(actualProductMock)
  const handleClickButton = ()=>{
    setProductCart(actualProductMock)
  }
  const handleClickDescription = ()=> {
    setActualInfo(false)
  }
  const handleClickReview = ()=> {
    setActualInfo(true)
  }
  return (
    <Layout>
      <div className="mx-auto mt-8 w-3/5 font-mono">
        <header className="w-full">
          <section className="w-full">
            <img className="object-cover w-full h-full" src={actualProductMock?.thumbnail} alt={`miniatura del producto${actualProductMock.title}`} />
          </section>
        </header>
        <main className="flex flex-col justify-start gap-1 mt-4">
          <h2 className="text-dark text-xl"> {actualProductMock?.title} </h2>
          <Stars typeCard={CARD_TYPE.PRODUCT_CART} numStars={actualProductMock.rating} />
          <p className="text-l">
            {
              actualProductMock?.description
            }
          </p>
          <strong className="text-dark text-xl"> ${actualProductMock?.price} </strong>
          <Button onClick={handleClickButton} className="max-w-48 text-sm"> Agregar al Carrito </Button>
        </main>
        <footer className="flex flex-col mt-4">
          <header className="w-full flex flex-row justify-between text-center"> 
            <h3 onClick={handleClickDescription} className={`w-full text-center text-xl ${!actualInfo ? "border-action" : "" } border-b-2 border-solid`} >Descripción</h3>
            <h3 onClick={handleClickReview} className={`w-full text-center text-xl cursor-pointer ${actualInfo ? "border-action" : "" } border-b-2 border-solid`}>Review</h3> 
          </header>
          <main className="flex justify-center items-center text-center text-md min-h-52">
            {
              !actualInfo ? <p>
                { actualProductMock.description }
              </p>
              : <Stars numStars={actualProductMock.rating} typeCard={CARD_TYPE.PRODUCT_GRID} />
            }
          </main>
        </footer>
      </div>
    </Layout>
  )
}