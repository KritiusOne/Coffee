import { Input } from "../components/UI/Input"
import { Layout } from "../components/UI/Layout"

export const LogIn: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-evenly items-center h-full w-7/12 mx-auto">
        <h1 className="font-medium text-3xl font-mono text-dark ">Iniciar sesion</h1>
        <Input typeInput="text" placeholder="Email" />
        <Input typeInput="password" placeholder="Password" />
        <span className="text-dark text-xl">¿Perdiste tu contraseña?</span>
        <button className="bg-action text-white text-xl px-2 py-3 rounded-md w-full">Iniciar sesión</button>
        <div className="flex flex-row-reverse gap-4 justify-center w-full">
          <span className="text-l text-dark ">Recordarme</span>
          <input type="checkbox" placeholder="Recordarme" />
        </div>
      </div>
    </Layout>
  )
}