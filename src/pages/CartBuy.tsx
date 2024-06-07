import { useState } from "react"
import { Button } from "../components/UI/Button"
import { Layout } from "../components/UI/Layout"
import { ProductCart } from "../components/UI/ProductCart"
import { TOKEN } from "../helpers/LocalStorageItems"
import { CreateOrder, Item } from "../types/OrdersType"
import { useCartStorage } from "../zustand/CartStorage"
import { useUserStorage } from "../zustand/UserStorage"
import { Modal } from "../components/Modal"
import { useNavigate } from "react-router"
import { PRIVATE_CLIENT_ROUTES } from "../routes/TypesRoutes"

export const CartBuy:React.FC = ()=>{
  const Storage = useCartStorage()
  const UserStorage = useUserStorage()
  const [modal, setModal] = useState(false)
  const navegate = useNavigate()

  const handleClickPostOrder = ()=>{
    const URL_POST = import.meta.env.VITE_URL_API_POST_ORDER
    const actualToken = localStorage.getItem(TOKEN)
    const actualHeaders = {
      Authorization: `${UserStorage.typeToken} ${actualToken}`,
      "Content-Type": 'application/json'
    }
    const ItemsOrder:Item[] = []
    for (const iterator of Storage.CartProducts) {
      ItemsOrder.push({
        id_menu: iterator.Product.Menu.id_menu,
        numbers: iterator.stockSolicitado,
        price: iterator.Product.Menu.precio
      })
    }
    const bodyOrder:CreateOrder = {
      items: ItemsOrder,
      total_price: Storage.parcialPrice
    }
    console.log(bodyOrder)
    fetch(URL_POST, {
      method: "POST",
      headers: actualHeaders,
      body: JSON.stringify(bodyOrder)
    })
    .then(res => res.json())
    .then(response => {
      setModal(true)
      console.log(response)
      setTimeout(()=>{
        navegate(PRIVATE_CLIENT_ROUTES.MY_PEDIDOS)
        Storage.deleteAllProducts()
      }, 3000)
    })
    .catch(e => console.log(e))
  }
  return (
    <Layout>
      <div className="flex flex-col w-full justify-between h-full">
        <main className="w-3/5 mx-auto mt-8 flex flex-col gap-2">
          {
            Storage.CartProducts && Storage.CartProducts.map(product => <ProductCart key={product.Product.Menu.id_menu} product={product}  />)
          }
        </main>
        <footer className="w-3/5 mx-auto my-8 flex flex-col justify-center items-end gap-3 font-mono font-semibold capitalize">
          <div className="flex flex-row w-2/5 justify-between items-center">
            <h1>Total a pagar: </h1>
            <span> ${Storage.parcialPrice} </span>
          </div>
          <Button onClick={handleClickPostOrder}> Realizar Compra </Button>
        </footer>
        {
          modal && <Modal>
            <h1 className="text-3xl text-dark font-bold font-mono">Felicidades!</h1>
            <p className="text-md font-light">Ya realizaste tu pedido, te redirigiremos en breve</p>
          </Modal>
        }
      </div>
    </Layout>
  )
}