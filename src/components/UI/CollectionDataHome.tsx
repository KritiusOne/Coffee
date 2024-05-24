import { IconCoffee } from '@tabler/icons-react'
import { IconMenu } from '@tabler/icons-react'
import { IconCake } from '@tabler/icons-react'
import { IconBeer } from '@tabler/icons-react'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLUListElement> {

}
export const CollectionDataHome: React.FC<Props> = ({...props})=>{
  return (
    <ul {...props} className={`flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 justify-center items-center gap-5 font-serif ${props.className}`}>
      <article className="flex flex-col bg-white text-black justify-center items-center px-2 gap-4">
        <header className='bg-action p-2 rounded-full'>
          <IconCoffee height={64} width={64} color='#fff' />
        </header>
        <h3 className='text-3xl font-medium'>Café y comida</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione illo, veniam facere, amet sapiente exercitationem aliquam neque esse delectus molestiae obcaecati non ipsam consequatur laboriosam, tenetur officiis culpa. Consequuntur.</p>
      </article>
      <article className="flex flex-col bg-white text-black justify-center items-center px-2 gap-4">
        <header className='bg-action p-2 rounded-full'>
          <IconMenu  height={64} width={64} color='#fff' />
        </header>
        <h3 className='text-3xl font-medium'> Menu </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione illo, veniam facere, amet sapiente exercitationem aliquam neque esse delectus molestiae obcaecati non ipsam consequatur laboriosam, tenetur officiis culpa. Consequuntur.</p>
      </article>
      <article className="flex flex-col bg-white text-black justify-center items-center px-2 gap-4">
        <header className='bg-action p-2 rounded-full'>
          <IconCake  height={64} width={64} color='#fff'  />
        </header>
        <h3 className='text-3xl font-medium'> Pastelería y panadaería </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione illo, veniam facere, amet sapiente exercitationem aliquam neque esse delectus molestiae obcaecati non ipsam consequatur laboriosam, tenetur officiis culpa. Consequuntur.</p>
      </article>
      <article className="flex flex-col bg-white text-black justify-center items-center px-2 gap-4">
        <header className='bg-action p-2 rounded-full'>
          <IconBeer  height={64} width={64} color='#fff'  />
        </header>
        <h3 className='text-3xl font-medium'> Bebidas Alcoholicas </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ratione illo, veniam facere, amet sapiente exercitationem aliquam neque esse delectus molestiae obcaecati non ipsam consequatur laboriosam, tenetur officiis culpa. Consequuntur.</p>
      </article>

    </ul>
  )
}