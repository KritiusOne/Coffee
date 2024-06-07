import React from "react"

interface Props extends React.HTMLAttributes<HTMLElement> {
  img: string
  nombre: string
  cantidad: number
  descripcion: string
  price: number
}
export const CardPedidoProduct: React.FC<Props> = ({cantidad,descripcion,img, nombre, price, ...props}) => {
  return (
    <article {...props} className={`flex flex-col justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-mono max-w-96 ${props.className}`}>
      <div className="flex flex-row gap-3">
        <div className="h-full w-full">
          <img className="w-full h-full" src={img} alt={`Imagen de ${nombre}`} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-2">
        <h2 className="text-xl font-semibold text-dark text-pretty">
          {
            nombre
          }
        </h2>
        <p className="text-md text-balance">
          {
            descripcion
          }
        </p>
        <div className="p-4 flex flex-col">
          <span>Precio: <strong>${price} C/U </strong></span>
          <span>Cantidad: <strong> {cantidad} </strong></span>

        </div>
      </div>
    </article>
  )
}

