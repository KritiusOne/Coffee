import { useNavigate } from "react-router"
import { ADMIN_ROUTES } from "../../routes/TypesRoutes"
import { useEffect, useState } from "react"

interface Props {
  idUser: number
  fechaPedido: Date
  totalPrice: number
  codeFollowing: string
  ultimaMoficacion: Date | null
  estado: string
}
export const OrderCard: React.FC<Props> = ({  idUser, fechaPedido, totalPrice, codeFollowing, ultimaMoficacion, estado})=>{
  const navegate = useNavigate()
  const [nombre, setNombre] = useState("")
  useEffect(()=>{
    setNombre(codeFollowing)
  }, [])
  const handleClickCard = ()=>{
    const UrlParams = new URLSearchParams();
    UrlParams.set("id", codeFollowing)
    const baseURL = ADMIN_ROUTES.DETAILS_PEDIDO.split(":")
    const finalURL = `${baseURL[0]}${baseURL[1]}?${UrlParams.toString()}`
    navegate(finalURL)
    console.log(finalURL)
    console.log(idUser)
  }
  return (
    <article onClick={handleClickCard} className="flex flex-col justify-center items-start cursor-pointer border-2 border-solid border-dark px-2 py-3 font-sans hover:bg-action hover:text-white">
      <h5 className="text-xl">
        {
          nombre
        }
      </h5>
      <strong> Total: {totalPrice} </strong>
      <span className="text-l capitalize"> Estado actual: {estado} </span>
      <div className="text-sm">
        <span> Fecha de Creacion: <strong> {fechaPedido.toLocaleString()} </strong> </span>
        <span> { ultimaMoficacion != null? "- Ultima modificacion: " + ultimaMoficacion.toLocaleString() : ""} </span>
      </div>
    </article>
  )
}