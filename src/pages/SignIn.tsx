import { Link } from "react-router-dom"
import { Input } from "../components/UI/Input"
import { Layout } from "../components/UI/Layout"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"

export const SignIn: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-evenly items-center h-full w-7/12 mx-auto">
        <h1 className="font-medium text-3xl font-mono text-dark ">Registrarse</h1>
        <Input typeInput="text" placeholder="Nombre" />
        <Input typeInput="text" placeholder="Apellido" />
        <Input typeInput="text" placeholder="Nombre de usuario" />
        <Input typeInput="text" placeholder="Email" />
        <Input typeInput="password" placeholder="Password" />        
        <button className="bg-action  hover:bg-white hover:text-dark text-white text-l px-2 py-1 rounded-md w-full hover:border-dark border-2 border-solid border-action">Registrarse</button>
        <Link to={PUBLIC_ROUTES.LOGIN} className="text-l hover:text-action" > ¿Ya está registrado? <strong>Iniciar sesión</strong></Link>
      </div>
    </Layout>
  )
}