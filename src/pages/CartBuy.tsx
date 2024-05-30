import { Button } from "../components/UI/Button"
import { Layout } from "../components/UI/Layout"
import { ProductCart } from "../components/UI/ProductCart"
import { useCartStorage } from "../zustand/CartStorage"

export const CartBuy:React.FC = ()=>{
  const Storage = useCartStorage()
  return (
    <Layout>
      <div className="flex flex-col w-full justify-between h-full">
        <main className="w-3/5 mx-auto mt-8 flex flex-col gap-2">
          {
            Storage.CartProducts && Storage.CartProducts.map(product => <ProductCart key={product.Product.id} product={product}  />)
          }
        </main>
        <footer className="w-3/5 mx-auto my-8 flex flex-col justify-center items-end gap-3 font-mono font-semibold capitalize">
          <div className="flex flex-row w-2/5 justify-between items-center">
            <h1>Total a pagar: </h1>
            <span> ${Storage.parcialPrice} </span>
          </div>
          <Button> Realizar Compra </Button>
        </footer>
      </div>
    </Layout>
  )
}