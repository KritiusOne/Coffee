import { IconStarFilled } from '@tabler/icons-react'
import { CARD_TYPE } from '../../helpers/CardProductType'
interface Props extends React.HTMLAttributes<HTMLElement> {
  numStars?: number
  typeCard: string
}
export const Stars: React.FC<Props> = ({ numStars, typeCard, ...props }) => {
  const numFinalStars = numStars != undefined ? numStars : 0
  const isMsg = typeCard == CARD_TYPE.PRODUCT_GRID && numStars == undefined ? true : false
  return (
    <div {...props} className='flex flex-col'>
      <div  className={`flex flex-row gap-2 ${props.className}`}>
        {
          Array.from(Array(5), (_, i) => <IconStarFilled size={CARD_TYPE.PRODUCT_CART == typeCard ? 16 : 24} key={i} color={i < numFinalStars ? "#E0B531" : "#000"} />)
        }
      </div>
      {
        isMsg && <strong> Aun no ha recibido calificaciones </strong>
      }
    </div>
  )
}