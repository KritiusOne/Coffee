import { useLocation } from "react-router"
import { Layout } from "../components/UI/Layout"
import { useProductsStorage } from "../zustand/ProductsStorage"
import { useOrderStorage } from "../zustand/OrderStorage"
import { useEffect, useState } from "react"
import { Menu } from "../types/ProductType"
import { Orders } from "../types/OrdersType"

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
              return product.Menu.id_menu == iterator.id_menu
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
        <main className="w-3/5 mx-auto mt-8 flex flex-col gap-2">
          {
            (actualProducts && newOrder) && actualProducts.map(product => {
              return (
                <article className="flex flex-row justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-mono">
                  <div className="flex flex-row gap-3">
                    <div className="md:w-2/5 h-full">
                      <img className="w-full h-full" src={product.Menu.img} alt={`Imagen de ${product.Menu.nombre_producto}`} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 p-2">
                    <h2 className="text-xl font-semibold text-dark text-pretty">
                      {
                        product.Menu.nombre_producto
                      }
                    </h2>
                    <p className="text-md text-balance">
                      {
                        product.Menu.descripcion
                      }
                    </p>
                    <div className="p-4 flex flex-col">
                      <span>Precio: <strong>${product.Menu.precio} C/U </strong></span>
                      <span>Cantidad: <strong>{newOrder.sellers.map(seller=> seller.id_menu == product.Menu.id_menu)} </strong></span>
                      
                    </div>
                  </div>
                </article>
              )
            })
          }
        </main>
      </div>
    </Layout>
  )
}