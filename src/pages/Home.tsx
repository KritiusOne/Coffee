import { useEffect, useState } from "react"
import { Hero } from "../components/Hero"
import { Horarios } from "../components/Horarios"
import { CardProduct } from "../components/UI/CardProduct"
import { CollectionDataHome } from "../components/UI/CollectionDataHome"
import { Layout } from "../components/UI/Layout"
import { useProductsStorage } from "../zustand/ProductsStorage"
//import ResponseMock from "../helpers/mocks/products.json"
import { CARD_TYPE } from "../helpers/CardProductType"
import { Menu } from "../types/ProductType"

export const Home: React.FC = () => {
  const ProductStorage = useProductsStorage()
  const [ProductsHome, setProductsHome] = useState<Menu[]>([])
  useEffect(()=>{
    const getAllProducts = async()=>{
      try{
        const API_ALL_PRODUCTS = import.meta.env.VITE_URL_API_ALL_PRODUCTS
        const response = await fetch(API_ALL_PRODUCTS)
        if(response.ok){
          const AllProducts:Menu[] = await response.json()
          ProductStorage.setAllProducts(AllProducts)
          setProductsHome(AllProducts.length >= 6 ? AllProducts.slice(0, 6) : AllProducts)
        }
      }catch(e){
        console.log(e)
      }
    }
    getAllProducts()
  },[])
  return (
    <Layout>
      <Hero />
      <div className="flex flex-col justify-center items-center">
        <CollectionDataHome className="mt-6" />
        <Horarios className="mt-6" />
      </div>
      <div className={`my-6 w-full flex flex-col md:grid md:grid-cols-2 justify-center items-center gap-2 px-4`}>
        {
          ProductsHome && ProductsHome.map(Product => {
            return (
              <div key={Product.Menu.id_menu} className="flex justify-center items-center">
                <CardProduct typeCard={CARD_TYPE.PRODUCT_GRID} Product={Product}  />
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}