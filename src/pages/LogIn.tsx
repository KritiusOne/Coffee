import { Link, useNavigate } from "react-router-dom"
import { Input } from "../components/UI/Input"
import { Layout } from "../components/UI/Layout"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"
import { ChangeEvent, useState } from "react"
import { useUserStorage } from "../zustand/UserStorage"
import { LoginResponse, User } from "../types/UserTypes"

export const LogIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const UserStorage = useUserStorage()
  const navegate = useNavigate()
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value.trim())
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value.trim())
  }
  const handleClickButton = ()=>{
    const URL:string = import.meta.env.VITE_URL_API_LOGIN
    const formData = new FormData()
    formData.append("username", email)
    formData.append("password", password)
    fetch(URL, {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      const newResponse = response as LoginResponse
      const parts = newResponse.access_token.split(".")
      const decodePayload = atob(parts[1])
      const parsedPayload: User = JSON.parse(decodePayload)
      UserStorage.requestLogin(parsedPayload, newResponse.token_type)
      navegate(PUBLIC_ROUTES.HOME)
    })
    .catch(e =>{
      console.log(e)
    })
  }
  return (
    <Layout>
      <div className="flex flex-col justify-evenly items-center h-full w-7/12 mx-auto">
        <h1 className="font-medium text-3xl font-mono text-dark ">Iniciar sesion</h1>
        <Input onChange={handleChangeEmail} typeInput="text" placeholder="Email" />
        <Input onChange={handleChangePassword} typeInput="password" placeholder="Password" />
        <span className="text-dark text-xl">¿Perdiste tu contraseña?</span>
        <button onClick={handleClickButton} className="bg-action  hover:bg-white hover:text-dark text-white text-l px-2 py-1 rounded-md w-full hover:border-dark border-2 border-solid border-action">Iniciar sesión</button>
        <div className="flex flex-row-reverse gap-4 justify-center w-full">
          <span className="text-l text-dark ">Recordarme</span>
          <input type="checkbox" placeholder="Recordarme" />
        </div>
        <Link to={PUBLIC_ROUTES.SIGNIN} className="text-l hover:text-action">¿No estás registrado? <strong>Registrate</strong></Link>
      </div>
    </Layout>
  )
}