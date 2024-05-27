import { useEffect } from "react"
import { Hero } from "../components/Hero"
import { Horarios } from "../components/Horarios"
import { CardProduct } from "../components/UI/CardProduct"
import { CollectionDataHome } from "../components/UI/CollectionDataHome"
import { Layout } from "../components/UI/Layout"
import { useProductsStorage } from "../zustand/ProductsStorage"
import ResponseMock from "../helpers/mocks/products.json"
import { CARD_TYPE } from "../helpers/CardProductType"

export const Home: React.FC = () => {
  const ProductStorage = useProductsStorage()
  useEffect(()=>{
    ProductStorage.setAllProducts(ResponseMock.products.slice(0, 6))
  },[])
  return (
    <Layout>
      <Hero />
      <div className="flex flex-col justify-center items-center">
        <CollectionDataHome className="mt-6" />
        <Horarios className="mt-6" />
      </div>
      <div className="my-6 w-full flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 justify-center items-center gap-2 px-4">
        {
          ProductStorage.AllProducts.map(Product => {
            return (
              <div key={Product.id} className="flex justify-center items-center">
                <CardProduct typeCard={CARD_TYPE.PRODUCT_GRID} Product={Product}  />
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}