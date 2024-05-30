import { useEffect } from "react"
import { CardProduct } from "../components/UI/CardProduct"
import { Layout } from "../components/UI/Layout"
import { useProductsStorage } from "../zustand/ProductsStorage"
//import AllMockProducts from "../helpers/mocks/products.json"
import { CARD_TYPE } from "../helpers/CardProductType"
import { Menu } from "../types/ProductType"

export const Products: React.FC = ()=>{
  const ProductStorage = useProductsStorage()
  useEffect(()=>{
    const getAllProducts = async()=>{
      try{
        const response = await fetch("https://coffee-shop-pablosanchezb-a5f28cd7.koyeb.app/menu")
        if(response.ok){
          const AllProducts:Menu[] = await response.json()
          ProductStorage.setAllProducts(AllProducts)
        }
      }catch(e){
        console.log(e)
      }
    }
    getAllProducts()
  }, [])
  return (
    <Layout>
      <h1 className="text-center text-3xl font-sans font-semibold mt-6">Productos</h1>
      <div className="flex flex-col lg:grid md:grid-cols-2 my-6 gap-4">
        {
          ProductStorage.AllProducts.map((Product, i)=>{
            return (
              <div className="flex justify-center items-center">
                <CardProduct key={i} Product={Product} typeCard={CARD_TYPE.PRODUCT_GRID} />
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}