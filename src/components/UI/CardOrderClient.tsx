import React from "react";
import { PRIVATE_CLIENT_ROUTES } from "../../routes/TypesRoutes";
import { useUserStorage } from "../../zustand/UserStorage";
import { useNavigate } from "react-router";

interface Props {
  fechaPedido: Date
  totalPrice: number
  codeFollowing: string
  ultimaMoficacion: Date | null
  estado: string
}
export const CardOrderClient: React.FC<Props> = ({ codeFollowing, estado, fechaPedido, totalPrice, ultimaMoficacion }) => {
  const UserId = useUserStorage(Storage => Storage.userInfo?.id_usuario)
  const navegate = useNavigate()
  const handleClickCard = ()=>{
    const UrlParams = new URLSearchParams()
    UrlParams.set("id", codeFollowing)
    UrlParams.set("userId", (UserId?.toString()) as string)
    const baseURL = PRIVATE_CLIENT_ROUTES.DETAILS_PEDIDO_USER.split(":")
    console.log(UrlParams.toString())
    const finalURL = `${baseURL[0]}${baseURL[1]}?${UrlParams.toString()}`
    navegate(finalURL)
  }
  return (
    <article onClick={handleClickCard} className="flex flex-col justify-center items-start cursor-pointer border-2 border-solid border-dark px-2 py-3 font-sans hover:bg-action hover:text-white">
      <h5 className="text-xl">
        Orden #{
          codeFollowing
        }
      </h5>
      <strong> Total: {totalPrice} </strong>
      <span className="text-l capitalize"> Estado actual: {estado} </span>
      <div className="text-sm flex flex-col">
        <span> Fecha de Creacion: <strong> {fechaPedido.toLocaleString()} </strong> </span>
        <span> {ultimaMoficacion != null ? "Ultima modificacion: " + ultimaMoficacion.toLocaleString() : ""} </span>
      </div>
    </article>
  )
}