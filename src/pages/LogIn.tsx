import { Link } from "react-router-dom"
import { Input } from "../components/UI/Input"
import { Layout } from "../components/UI/Layout"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"

export const LogIn: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-evenly items-center h-full w-7/12 mx-auto">
        <h1 className="font-medium text-3xl font-mono text-dark ">Iniciar sesion</h1>
        <Input typeInput="text" placeholder="Email" />
        <Input typeInput="password" placeholder="Password" />
        <span className="text-dark text-xl">¿Perdiste tu contraseña?</span>
        <button className="bg-action  hover:bg-white hover:text-dark text-white text-l px-2 py-1 rounded-md w-full hover:border-dark border-2 border-solid border-action">Iniciar sesión</button>
        <div className="flex flex-row-reverse gap-4 justify-center w-full">
          <span className="text-l text-dark ">Recordarme</span>
          <input type="checkbox" placeholder="Recordarme" />
        </div>
        <Link to={PUBLIC_ROUTES.SIGNIN} className="text-l hover:text-action">¿No estás registrado? <strong>Registrate</strong></Link>
      </div>
    </Layout>
  )
}