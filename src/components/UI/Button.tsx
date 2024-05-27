interface Props extends React.HTMLAttributes<HTMLButtonElement>{
  children: JSX.Element | JSX.Element[] | string 
}
export const Button: React.FC<Props> = ({children, ...props})=>{
  return(
    <button {...props} className={`bg-action text-md text-white px-1 py-1 rounded-sm font-mono  border-2 border-solid border-action hover:border-dark hover:text-dark hover:bg-white ${props.className}`} >
      {
        children
      }
    </button>
  )
}