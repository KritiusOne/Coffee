import { HTMLAttributes } from "react"
import { Stars } from "./Stars"

interface Props extends HTMLAttributes<HTMLElement>{
  image: string
  title: string
  stars: number
  price: number
}
export const CardProduct: React.FC<Props> = ({image, title, stars, price, ...props})=>{
  return (
    <article {...props} className={`flex flex-col justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-96 pb-4 ${props.className}`} >
      <header className="w-full h-3/5">
        <img src={image} alt={`Imagen del producto ${title}`} className="w-full h-full" />
      </header>
      <main className="flex flex-col justify-center items-center">
        <h3 className="font-semibold text-dark text-l"> {title} </h3>
        <Stars numStars={stars} />
        <strong className="text-xl text-dark"> ${price} </strong>
      </main>
      <button className="max-w-2/12 rounded-sm px-3 py-1 bg-action text-white text-xl">Agregar al Carrito</button>
    </article>
  )
}