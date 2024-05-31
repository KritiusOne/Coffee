interface Props extends React.HTMLAttributes<HTMLElement>{
}
export const Modal: React.FC<Props> = ({children})=>{
  const handleAsideClick = (e: React.MouseEvent)=>{
    e.stopPropagation()
  }
  return (
    <section className='w-screen h-screen fixed top-0 left-0 bg- flex justify-center items-center md:justify-center bg-black/[0.5]'>
      <aside className='px-6 h-4/5 w-4/5 md:h-full md:w-8/12 bg-white text-dark z-[1000] flex flex-col justify-center items-center' onClick={handleAsideClick} >
        {
          children
        }
      </aside>
    </section>
  )
}