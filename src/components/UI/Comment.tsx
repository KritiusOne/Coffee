import { CARD_TYPE } from "../../helpers/CardProductType"
import { Review } from "../../types/ReviewsTypes"
import { Stars } from "./Stars"

interface Props {
  comments: Review[]
  promStars: number
}
export const Comment: React.FC<Props> = ({comments, promStars})=>{
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Stars typeCard={CARD_TYPE.PRODUCT_GRID} numStars={promStars} />
      <div className="w-full flex flex-col justify-center items-center gap-2">
        {
          comments && comments.map(comment => {
            return (
              <article key={comment.id_usuario} className="flex flex-col justify-center items-center">
                <Stars typeCard={CARD_TYPE.PRODUCT_CART} numStars={comment.rate}  />
                <h5> {comment.description} </h5>
                <span> {comment.fecha_creacion.toLocaleString()} </span>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}