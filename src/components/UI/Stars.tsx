import { IconStarFilled } from '@tabler/icons-react'
interface Props {
  numStars: number
}
export const Stars: React.FC<Props> = ({numStars})=>{
  return (
    <div className='flex flex-row gap-2'>
      {
        Array.from(Array(5), (_,i)=> <IconStarFilled key={i} color={i < numStars ? "#E0B531": "#000"} /> )
      }
    </div>
  )
}