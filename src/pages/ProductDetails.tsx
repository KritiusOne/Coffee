import { useLocation } from "react-router"
import { Layout } from "../components/UI/Layout"
import { useEffect, useState } from "react"
import { Menu } from "../types/ProductType"
import { Stars } from "../components/UI/Stars"
import { CARD_TYPE } from "../helpers/CardProductType"
import { Button } from "../components/UI/Button"
import { useCartStorage } from "../zustand/CartStorage"
import { useProductsStorage } from "../zustand/ProductsStorage"

export const ProductDetails: React.FC = ()=>{
  const location = useLocation()
  const UrlParams = new URLSearchParams(location.search)
  const [actualProductMenu, setActualProductMenu] = useState<Menu>()
  const setProductCart = useCartStorage(Storage => Storage.setCartProduct)
  const ProductStorage = useProductsStorage()
  const [actualInfo, setActualInfo] = useState(false)
  useEffect(()=>{
    const getAllProducts = async()=>{
      const idProductPage = UrlParams.get("id") == null ? "-1" : `${UrlParams.get("id")}`
      const [ActualProduct] = ProductStorage.AllProducts.filter(Product => Product.Menu.id_menu == parseInt(idProductPage))
      if(ActualProduct){
        setActualProductMenu(ActualProduct)
      }else{
        try{
          const API_PRODUCT = import.meta.env.VITE_URL_API_ALL_PRODUCTS
          const response = await fetch(`${API_PRODUCT}/${UrlParams.get("id")}`)
          if(response.ok){
            const newProduct:Menu = await response.json()
            ProductStorage.setAllProducts([newProduct])
            setActualProductMenu(newProduct)
          }
        }catch(e){
          console.log(e)
        }
      }
    }
    getAllProducts()
  },[UrlParams.get("id")])
  const handleClickButton = ()=>{
    setProductCart((actualProductMenu as Menu))
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
            <img className="object-cover w-full h-full" src={actualProductMenu?.Menu.img} alt={`miniatura del producto${actualProductMenu?.Menu.nombre_producto}`} />
          </section>
        </header>
        <main className="flex flex-col justify-start gap-1 mt-4">
          <h2 className="text-dark text-xl"> {actualProductMenu?.Menu.nombre_producto} </h2>
          <Stars typeCard={CARD_TYPE.PRODUCT_CART} numStars={(actualProductMenu?.average_rating as number)} />
          <strong className="text-dark text-xl"> ${actualProductMenu?.Menu?.precio} </strong>
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
                { actualProductMenu?.Menu.descripcion }
              </p>
              : <Stars numStars={(actualProductMenu?.average_rating as number)} typeCard={CARD_TYPE.PRODUCT_GRID} />
            }
          </main>
        </footer>
      </div>
    </Layout>
  )
}