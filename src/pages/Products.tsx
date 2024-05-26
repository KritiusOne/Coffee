import { CardProduct } from "../components/UI/CardProduct"
import { Layout } from "../components/UI/Layout"

export const Products: React.FC = ()=>{
  return (
    <Layout>
      <h1 className="text-center text-3xl font-sans font-semibold mt-6">Productos</h1>
      <div className="grid grid-cols-2 my-6 gap-4">
        {
          Array.from(Array(6), (_, i)=>{
            return (
              <div className="flex justify-center items-center">
                <CardProduct key={i} image="/src/assets/descarga.jfif" price={4000} stars={3} title="Café expreso" />
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}