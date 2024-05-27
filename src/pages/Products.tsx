import { useEffect } from "react"
import { CardProduct } from "../components/UI/CardProduct"
import { Layout } from "../components/UI/Layout"
import { useProductsStorage } from "../zustand/ProductsStorage"
import AllMockProducts from "../helpers/mocks/products.json"
import { CARD_TYPE } from "../helpers/CardProductType"

export const Products: React.FC = ()=>{
  const ProductState = useProductsStorage()
  useEffect(()=>{
    const newProducts = AllMockProducts.products.slice(0, 10)
    ProductState.setAllProducts(newProducts)
  }, [])
  return (
    <Layout>
      <h1 className="text-center text-3xl font-sans font-semibold mt-6">Productos</h1>
      <div className="flex flex-col lg:grid md:grid-cols-2 my-6 gap-4">
        {
          ProductState.AllProducts.map((Product, i)=>{
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