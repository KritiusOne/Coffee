import { IconStarFilled } from '@tabler/icons-react'
import { CARD_TYPE } from '../../helpers/CardProductType'
interface Props extends React.HTMLAttributes<HTMLElement>{
  numStars: number
  typeCard: string
}
export const Stars: React.FC<Props> = ({numStars, typeCard,...props})=>{
  return (
    <div {...props} className={`flex flex-row gap-2 ${props.className}`}>
      {
        Array.from(Array(5), (_,i)=> <IconStarFilled size={CARD_TYPE.PRODUCT_CART == typeCard ? 16 : 24} key={i} color={i < numStars ? "#E0B531": "#000"} /> )
      }
    </div>
  )
}