import { Link } from "react-router-dom"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"

export const Hero: React.FC = ()=>{
  return (
    <div className="bg-Hero w-full h-screen bg-auto bg-no-repeat md:bg-cover flex justify-center items-center flex-col bg-black/[0.67] gap-4">
      <h1 className="text-4xl font-bolder text-white font-mono">Café y Comida</h1>
      <span className="text-xl text-white">Busca lo que necesites</span>
      <Link to={PUBLIC_ROUTES.PRODUCTS} className="bg-action text-xl text-white px-3 py-1 rounded-sm font-mono" >Ir a comprar</Link>
    </div>
  )
}