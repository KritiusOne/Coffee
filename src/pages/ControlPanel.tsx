import { useEffect, useState } from "react"
import { Layout } from "../components/UI/Layout"
import { useUserStorage } from "../zustand/UserStorage"
import { TOKEN } from "../helpers/LocalStorageItems"
import { Orders } from "../types/OrdersType"
import { useOrderStorage } from "../zustand/OrderStorage"
import { TypeInfoOrders } from "../types/UtilsTypes"
import { Button } from "../components/UI/Button"
import { OrderCard } from "../components/UI/OrderCard"

export const ControlPanel: React.FC = () => {
  const UserStorage = useUserStorage()
  const OrderStorage = useOrderStorage()
  const [load, setLoad] = useState(false)
  const [typeInfo, setTypeInfo] = useState<TypeInfoOrders>("Today")
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const fechaExpiracion = new Date((UserStorage.userInfo?.exp as number) * 1000)
        const fechaActual = new Date()
        if (fechaActual < fechaExpiracion) {
          setLoad(true)
          const URL_ALL_ORDERS = import.meta.env.VITE_URL_API_ALL_ORDERS
          const actualToken = localStorage.getItem(TOKEN)
          const actualHeaders = {
            Authorization: `${UserStorage.typeToken} ${actualToken}`
          }
          const res = await fetch(URL_ALL_ORDERS, {
            headers: actualHeaders
          })
          if (res.ok) {
            const response = await res.json() as Orders[]
            response.sort((a, b)=> a.fecha_orden <= b.fecha_orden ? 1 : -1)
            OrderStorage.setAllOrders(response)
            setLoad(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllOrders()
  }, [])
  const handleClickChangeTypeInfo = (e: React.MouseEvent) => {
    const whoButton = e.currentTarget.id.trim() as TypeInfoOrders
    if (whoButton == "Today") {
      setTypeInfo("Today")
    }
    if (whoButton == "Historial") {
      setTypeInfo("Historial")
    }
  }
  return (
    <Layout>
      <main className="flex flex-col w-4/5 h-full justify-start items-center font-mono mx-auto py-8 gap-4 text-dark">
        <header className="flex flex-col gap-1 justify-center items-center">
          <h2 className="font-light text-3xl capitalize">Panel de control</h2>
          <strong className="text-xl ">
            {
              typeInfo == "Today" ? "Realizados hoy" : "Todos los pedidos"
            }
          </strong>
        </header>
        <div className="flex flex-row w-full justify-evenly items-center">
          <Button id="Today" onClick={handleClickChangeTypeInfo}>Mas recientes</Button>
          <Button id="Historial" onClick={handleClickChangeTypeInfo}>Historial</Button>
        </div>
        <div className="w-full flex flex-col md:grid md:grid-cols-4 justify-center items-center gap-4">
          {
            load ? "Loading..." : OrderStorage.AllOrders.length > 0 && OrderStorage.AllOrders.map(order => {
              if(typeInfo == "Today"){
                const today = new Date()
                const año = today.getFullYear();
                const mes = (today.getMonth() + 1).toString().padStart(2, '0'); 
                const día = today.getDate().toString().padStart(2, '0');
                const resetFecha = `${año}-${mes}-${día}`;
                if(resetFecha == order.fecha_orden.toString()){
                  return (
                    <OrderCard key={order.id_order} codeFollowing={order.delivery.code_following} estado={order.delivery.state.name_state} fechaPedido={order.fecha_orden} nombreUsuario={order.usuario.first_name + " " + order.usuario.last_name} totalPrice={order.total_price} ultimaMoficacion={order.delivery.fecha_modificacion}/>
                  )
                }
              }else{
                return (
                  <OrderCard key={order.id_order} codeFollowing={order.delivery.code_following} estado={order.delivery.state.name_state} fechaPedido={order.fecha_orden} nombreUsuario={order.usuario.first_name + " " + order.usuario.last_name} totalPrice={order.total_price} ultimaMoficacion={order.delivery.fecha_modificacion}/>
                )
              }
              
            })
          }
        </div>
      </main>
    </Layout>
  )
}