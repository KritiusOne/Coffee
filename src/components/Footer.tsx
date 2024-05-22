import { IconBrandFacebookFilled } from '@tabler/icons-react';
import { IconBrandTwitterFilled } from '@tabler/icons-react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
}

export const Footer: React.FC<Props> = ({...props})=>{
  return (
    <footer {...props} className={`w-full h-28 flex justify-evenly items-center bg-dark text-white ${props.className}`}>
      <div className='flex flex-col justify-center items-center'>
        <strong >Siguenos en las redes sociales</strong>
        <div className='flex flex-row'>
          <IconBrandFacebookFilled className='text-[#3B5998]' />
          <IconBrandTwitterFilled />
          <IconBrandInstagram />
        </div>
      </div>
      <div className='flex flex-col'>
        <span><strong>Telefono:</strong> 300123456</span>
        <span><strong>Email:</strong> Coffe-shop@gmail.com</span>
      </div>
    </footer>
  )
}