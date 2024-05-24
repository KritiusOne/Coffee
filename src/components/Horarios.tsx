import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {

}
export const Horarios: React.FC<Props> = ({...props})=>{
  return (
    <div {...props} className={`bg-Horario bg-center w-full h-[60vh] bg-auto bg-no-repeat md:bg-cover flex justify-center items-center flex-col bg-black/[0.67] gap-4 ${props.className} font-mono`}>
      <h2 className="text-white text-3xl "> Horario de atención </h2>
      <div className="w-4/5 h-4/5 flex flex-col justify-evenly items-center border-white border-2 border-solid text-white">
        <div>
          <h6 className="text-xl font-bold"> Lunes - Sabado </h6>
          <span className="text-l">7:00 AM - 12:00 PM</span>
        </div>
        <div>
          <h6 className="text-xl font-bold"> Sabado </h6>
          <span className="text-l"> 24 Horas </span>
        </div>
        
      </div>
    </div>
  )
}