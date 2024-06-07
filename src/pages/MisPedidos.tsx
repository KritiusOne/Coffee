import React, { useEffect, useState } from "react";
import { Layout } from "../components/UI/Layout";
import { useOrderStorage } from "../zustand/OrderStorage";
import { useUserStorage } from "../zustand/UserStorage";
import { TOKEN } from "../helpers/LocalStorageItems";
import { Orders } from "../types/OrdersType";
import { Button } from "../components/UI/Button";
import { CardOrderClient } from "../components/UI/CardOrderClient";

export const MisPedidos: React.FC = () => {
  const OrderStorage = useOrderStorage()
  const UserStorage = useUserStorage()
  const [ordersView, setOrdersView] = useState<Orders[] | undefined>( undefined )
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const URL_ALL_ORDERS = import.meta.env.VITE_URL_API_ALL_ORDERS
        const actualToken = localStorage.getItem(TOKEN)
        const actualHeaders = {
          Authorization: `${UserStorage.typeToken} ${actualToken}`
        }
        const allOrders = await fetch(URL_ALL_ORDERS, {
          method: "GET",
          headers: actualHeaders
        })
        if (allOrders.ok) {
          const res = await allOrders.json() as Orders[]
          res.sort((a, b)=> a.fecha_orden <= b.fecha_orden ? 1 : -1)
          OrderStorage.setAllOrders(res)
          const actuales = res.filter(orden =>{
            return  orden.delivery.state.name_state != "finalizado" && orden.delivery.state.name_state != "cancelado" ? orden : null
          })
          setOrdersView(actuales.length != 0 ? actuales : undefined)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllOrders()
  },[])
  const handleClickButtonViewOrders = (e: React.MouseEvent)=>{
    if(e.currentTarget.textContent == "Ver Todos"){
      setOrdersView(OrderStorage.AllOrders)
    }else{
      const actuales = OrderStorage.AllOrders.filter(orden =>{
        return  orden.delivery.state.name_state != "finalizado" && orden.delivery.state.name_state != "cancelado" ? orden : null
      })
      setOrdersView(actuales.length != 0 ? actuales : undefined)
    }
  }
  return (
    <Layout>
      <main className="flex flex-col justify-center items-center w-full mt-4 gap-4 px-4 py-3">
        <h2 className="text-3xl">Pedidos de {UserStorage.userInfo?.username} </h2>
        <div className="w-full flex md:flex-row flex-col justify-evenly items-center gap-3 ">
          <Button onClick={handleClickButtonViewOrders}>Ver actuales</Button>
          <Button onClick={handleClickButtonViewOrders}>Ver Todos</Button>
        </div>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-4">
          {
            ordersView != undefined && ordersView.map(order=> <CardOrderClient key={order.id_order} codeFollowing={order.delivery.code_following} estado={order.delivery.state.name_state} fechaPedido={order.fecha_orden} totalPrice={order.total_price} ultimaMoficacion={order.delivery.fecha_modificacion}/>)
          }
        </div>
        <div className="w-full text-center">
          {
            ordersView == undefined && 
            <span className="text-balance text-center text-xl">Actualmente no hay ningun pedido pendiente</span>
          }
        </div>
      </main>
    </Layout>
  )
}