import { useLocation, useNavigate } from "react-router"
import { Layout } from "../components/UI/Layout"
import { useEffect, useState } from "react"
import { Menu } from "../types/ProductType"
import { Orders } from "../types/OrdersType"
import { CardPedidoProduct } from "../components/UI/CardPedidoProduct"
import { useOrderStorage } from "../zustand/OrderStorage"
import { Button } from "../components/UI/Button"
import { TOKEN } from "../helpers/LocalStorageItems"
import { useUserStorage } from "../zustand/UserStorage"
import { PRIVATE_CLIENT_ROUTES } from "../routes/TypesRoutes"

type state_delivery = "new" | "preparacion" | "enviado" | "finalizado" | "Error" | "cancel"
export const PedidoDetailsUser: React.FC = () => {
  const location = useLocation()
  const UrlParams = new URLSearchParams(location.search)
  const OrderStorage = useOrderStorage()
  const [ordenActual, setActualOrder] = useState<Orders>()
  const [stateDel, setStateDel] = useState<state_delivery>("Error")
  const [load, setLoad] = useState(false)
  const [actualProducts, setActualProducts] = useState<Menu[]>()
  const UserStorage = useUserStorage()
  const navegate = useNavigate()
  useEffect(() => {
    const getDetailOrder = async () => {
      const [actualOrder] = OrderStorage.AllOrders.filter(order => order.delivery.code_following == UrlParams.get("id")
      )
      console.log(actualOrder.delivery.state.name_state)
      if (actualOrder.delivery.state.name_state == "nuevo") {
        setStateDel("new")
      } else if (actualOrder.delivery.state.name_state == "en preparacion") {
        setStateDel("preparacion")
      } else if (actualOrder.delivery.state.name_state == "enviado") {
        setStateDel("enviado")
      } else if (actualOrder.delivery.state.name_state == "finalizado") {
        setStateDel("finalizado")
      } else {
        setStateDel("cancel")
      }
      const urlProducts = import.meta.env.VITE_URL_API_ALL_PRODUCTS
      const response = await fetch(urlProducts)
      if (response.ok) {
        const AllProducts = await response.json() as Menu[]
        const AllPresetProducts = AllProducts.filter(product => {
          for (const iterator of actualOrder.sellers) {
            if (iterator.id_menu == product.Menu.id_menu) {
              return product
            }
          }
        })
        setActualProducts(AllPresetProducts)
        setActualOrder(actualOrder)
      }
      setLoad(false)
    }
    getDetailOrder()
  }, [])
  const hadleClickCancel = () => {
    const URL_CANCEL = `${import.meta.env.VITE_URL_ORDER_CANCEL}${ordenActual?.delivery.code_following}`
    const actualToken = localStorage.getItem(TOKEN)
    fetch(URL_CANCEL,
      {
        method: "PATCH",
        headers: {
          Authorization: `${UserStorage.typeToken} ${actualToken}`
        }
      }
    )
    navegate(PRIVATE_CLIENT_ROUTES.MY_PEDIDOS)
  }
  return (
    <Layout>
      <div className="w-4/5 py-6 mx-auto flex flex-col justify-center items-center gap-3">
        <h2 className="text-pretty text-3xl text-center font-mono">Detalles de la orden</h2>
        {
          load && <span>Loading...</span>
        }
        {
          (actualProducts != undefined && ordenActual != undefined) && (
            <div className="md:grid md:grid-cols-4 flex flex-col gap-3">
              {
                actualProducts.map(product => {
                  const [cantidad] = ordenActual.sellers.filter(seller => seller.id_menu == product.Menu.id_menu ? seller : null)
                  return <CardPedidoProduct cantidad={cantidad.numbers} descripcion={product.Menu.descripcion} img={product.Menu.img} nombre={product.Menu.nombre_producto} price={product.Menu.precio} key={product.Menu.id_menu} />
                })
              }
            </div>
          )
        }
        <div className="flex flex-col justify-center items-center">
          {
            stateDel == "Error" && <strong>Hubo un error en el servidor, regrese a la pagina anterior</strong>
          }
          {
            stateDel == "cancel" && <strong>El pedido fue cancelado</strong>
          }
          {
            stateDel == "finalizado" && <strong>El pedido ya fue realizado exitosamente</strong>
          }
          {
            stateDel == "enviado" && <strong>El pedido está en camino</strong>
          }
          {
            stateDel == "preparacion" && <strong>El pedido está siendo preparado</strong>
          }
          {
            stateDel == "new" && (<div className="flex flex-col gap-4 justify-center items-center">
            <span className="text-xl">Estado del pedido: <strong className="uppercase text-orange-500 "> {ordenActual?.delivery.state.name_state} </strong></span>
            <Button onClick={hadleClickCancel} className="bg-red-700 border-red-700">Cancelar pedido</Button>
            </div>)
          }
        </div>
      </div>
    </Layout>
  )
}