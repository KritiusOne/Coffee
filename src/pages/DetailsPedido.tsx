import { useLocation, useNavigate } from "react-router"
import { Layout } from "../components/UI/Layout"
import { useProductsStorage } from "../zustand/ProductsStorage"
import { useOrderStorage } from "../zustand/OrderStorage"
import  { useEffect, useState } from "react"
import { Menu } from "../types/ProductType"
import { Orders } from "../types/OrdersType"
import { CardPedidoProduct } from "../components/UI/CardPedidoProduct"
import { Button } from "../components/UI/Button"
import { useUserStorage } from "../zustand/UserStorage"
import { TOKEN } from "../helpers/LocalStorageItems"
import { ADMIN_ROUTES } from "../routes/TypesRoutes"

type state_delivery = "new" | "preparacion" | "enviado" | "finalizado" | "cancel" | "Error"
export const DetailsPedido = () => {
  const location = useLocation()
  const UrlParams = new URLSearchParams(location.search)
  const ProductStorage = useProductsStorage()
  const OrderStorage = useOrderStorage()
  const [actualProducts, setactualProducts] = useState<Menu[]>([])
  const [newOrder, setActualOrder] = useState<Orders>()
  const [stateDel, setStateDel] = useState<state_delivery>("Error")
  const UserStorage = useUserStorage()
  const navegate = useNavigate()
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const API_ALL_PRODUCTS = import.meta.env.VITE_URL_API_ALL_PRODUCTS
        const response = await fetch(API_ALL_PRODUCTS)
        if (response.ok) {
          const AllProducts: Menu[] = await response.json()
          const actualOrder = OrderStorage.AllOrders.find(order => order.delivery.code_following == UrlParams.get("id")) as Orders
          if(actualOrder.delivery.state.name_state == "nuevo"){
            setStateDel("new")
          }else if(actualOrder.delivery.state.name_state == "en preparacion"){
            setStateDel("preparacion")
          }else if(actualOrder.delivery.state.name_state == "enviado"){
            setStateDel("enviado")
          }else if(actualOrder.delivery.state.name_state == "finalizado"){
            setStateDel("finalizado")
          }else{
            setStateDel("cancel")
          }
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
  const handleClickChangeDelivery = ()=>{
    const URL_BASE = import.meta.env.VITE_URL_API_PATCH_STATE_DELIVERI
    const URL = `${URL_BASE}${newOrder?.delivery.code_following}`
    const actualToken = localStorage.getItem(TOKEN)
    fetch(URL,
      {
        method: "PATCH",
        headers:{
          Authorization: `${UserStorage.typeToken} ${actualToken}`
        }
      }
    )
    navegate(ADMIN_ROUTES.CONTROL_PANEL)
  }
  const hadleClickCancel = () => {
    const URL_CANCEL = `${import.meta.env.VITE_URL_ORDER_CANCEL}${newOrder?.delivery.code_following}`
    const actualToken = localStorage.getItem(TOKEN)
    fetch(URL_CANCEL,
      {
        method: "PATCH",
        headers: {
          Authorization: `${UserStorage.typeToken} ${actualToken}`
        }
      }
    )
    navegate(ADMIN_ROUTES.CONTROL_PANEL)
  }
  return (
    <Layout>
      <div className="flex flex-col justify-start py-8 items-center w-4/5 mx-auto">
        <h2 className="text-3xl font-bold"> Pedido #{UrlParams.get("id")} </h2>
        <header className="flex flex-row justify-evenly items-center gap-4 mt-4 w-full">
          <div className="flex flex-col gap-2">
            <h3> {newOrder?.usuario.first_name}  {newOrder?.usuario.last_name}</h3>
            <span className="flex flex-col md:flex-row md:gap-2"><strong> Telefono: </strong> {newOrder?.usuario.phone}</span>
            <span className="flex flex-col md:flex-row md:gap-2 capitalize"><strong> Estado actual del pedido: </strong> {newOrder?.delivery.state.name_state}</span>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-1 md:gap-3">
            <strong> Ciudad: </strong> {newOrder?.usuario.address.city}
            <strong> Departamento: </strong> {newOrder?.usuario.address.state}
            <strong> Pais: </strong> {newOrder?.usuario.address.country}
            <p>
              {newOrder?.usuario.address.description}
            </p>
          </div>
        </header>
        <main className="w-3/5 md:w-4/5 mx-auto mt-8 flex flex-col md:grid md:grid-cols-3 gap-2">
          {
            (actualProducts && newOrder) && actualProducts.map(product =>{
              const [cantidad] = newOrder.sellers.filter(seller=> seller.id_menu == product.Menu.id_menu ? seller : null)
              return <CardPedidoProduct cantidad={cantidad.numbers} descripcion={product.Menu.descripcion} img={product.Menu.img} nombre={product.Menu.nombre_producto} price={product.Menu.precio} key={product.Menu.id_menu} />
            })
          }
        </main>
        <footer className="mt-6 flex flex-row justify-center items-center gap-3">
          {
            stateDel == "new" && (<>
            <Button onClick={handleClickChangeDelivery}> Aceptar orden </Button>
            <Button onClick={hadleClickCancel} className="bg-red-700 border-red-700">Cancelar pedido</Button>
          </>)
          }
          {
            stateDel == "preparacion" && (<>
            <Button onClick={handleClickChangeDelivery}> Enviar Pedido </Button>
            <Button onClick={hadleClickCancel} className="bg-red-700 border-red-700">Cancelar pedido</Button>
          </>)
          }
          {
            stateDel == "enviado" && (<>
            <Button onClick={handleClickChangeDelivery}> Finalizar orden </Button>
            <Button onClick={hadleClickCancel} className="bg-red-700 border-red-700">Cancelar pedido</Button>
          </>)
          }
          {
            stateDel == "finalizado" && (<>
            <strong>Este pedido ya fue realizado</strong>
          </>)
          }
          {
            stateDel == "cancel" && (<>
            <strong>Este pedido fue cancelado</strong>
          </>)
          }
          {
            stateDel == "Error" && (<>
            <strong>Hubo un error con el servidor</strong>
          </>)
          }
        </footer>
      </div>
    </Layout>
  )
}