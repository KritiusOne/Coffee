import { useLocation } from "react-router"
import { Layout } from "../components/UI/Layout"
import { useProductsStorage } from "../zustand/ProductsStorage"
import { useOrderStorage } from "../zustand/OrderStorage"
import { useEffect, useState } from "react"
import { Menu } from "../types/ProductType"
import { Orders } from "../types/OrdersType"
import { CardPedidoProduct } from "../components/UI/CardPedidoProduct"

export const DetailsPedido = () => {
  const location = useLocation()
  const UrlParams = new URLSearchParams(location.search)
  const ProductStorage = useProductsStorage()
  const OrderStorage = useOrderStorage()
  const [actualProducts, setactualProducts] = useState<Menu[]>([])
  const [newOrder, setActualOrder] = useState<Orders>()
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const API_ALL_PRODUCTS = import.meta.env.VITE_URL_API_ALL_PRODUCTS
        const response = await fetch(API_ALL_PRODUCTS)
        if (response.ok) {
          const AllProducts: Menu[] = await response.json()
          const actualOrder = OrderStorage.AllOrders.find(order => order.delivery.code_following == UrlParams.get("id")) as Orders

          const AllPresetProducts = AllProducts.filter(product => {
            for (const iterator of actualOrder.sellers) {
              if(iterator.id_menu == product.Menu.id_menu){
                return product
              }
            }
          })
          setactualProducts(AllPresetProducts)
          setActualOrder(actualOrder)
          ProductStorage.setAllProducts(AllProducts)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getAllProducts()
  }, [UrlParams.get("id")])
  return (
    <Layout>
      <div className="flex flex-col justify-start py-8 items-center w-4/5 mx-auto">
        <h2 className="text-3xl font-bold"> Pedido #{UrlParams.get("id")} </h2>
        <main className="w-3/5 md:w-4/5 mx-auto mt-8 flex flex-col md:grid md:grid-cols-3 gap-2">
          {
            (actualProducts && newOrder) && actualProducts.map(product =>{
              const [cantidad] = newOrder.sellers.filter(seller=> seller.id_menu == product.Menu.id_menu ? seller : null)
              return <CardPedidoProduct cantidad={cantidad.numbers} descripcion={product.Menu.descripcion} img={product.Menu.img} nombre={product.Menu.nombre_producto} price={product.Menu.precio} key={product.Menu.id_menu} />
            })
          }
        </main>
      </div>
    </Layout>
  )
}