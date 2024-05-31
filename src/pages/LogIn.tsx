import { Link, useNavigate } from "react-router-dom"
import { Input } from "../components/UI/Input"
import { Layout } from "../components/UI/Layout"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"
import { ChangeEvent, useState } from "react"
import { useUserStorage } from "../zustand/UserStorage"
import { LoginResponse, User } from "../types/UserTypes"
import { validatorEmail } from "../helpers/Validations"
import { TypeMsg } from "../types/UtilsTypes"
import { TOKEN, TYPE_TOKEN, USER_INFO } from "../helpers/LocalStorageItems"

export const LogIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const UserStorage = useUserStorage()
  const navegate = useNavigate()
  const [msg, setMsg] = useState("")
  const [mostrarMsg, setMostrarMsg] = useState(false)
  const [typeMsg, setTypeMsg] = useState<TypeMsg>("Error")

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>)=>{
    if(validatorEmail.test(e.target.value.trim())){
      setEmail(e.target.value.trim())
      setMostrarMsg(false)
      setTypeMsg("Succes")
    }else{
      setEmail("ee")
      setMostrarMsg(true)
      setTypeMsg("Error")
      setMsg("El email tiene un formato erroneo o contiene caracteres invalidos")
    }
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value.trim())
    if(validatorEmail.test(email)){
      setMostrarMsg(false)
      setTypeMsg("Succes")
    }else{
      setMostrarMsg(true)
      setMsg("El Email es incorrecto")
      setTypeMsg("Error")
    }
  }
  const handleClickButton = ()=>{
    const URL:string = import.meta.env.VITE_URL_API_LOGIN
    if(typeMsg == "Succes"){
      fetch(URL, {
        method: "POST",
        body: JSON.stringify({email: email, password: password}),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if(res.ok){
          return res.json()
        }else{
          console.log(res)
        }
      })
      .then(response => {
        const newResponse = response as LoginResponse
        console.log(newResponse)
        const parts = newResponse.access_token.split(".")
        const decodePayload = atob(parts[1])
        const parsedPayload: User = JSON.parse(decodePayload)
        UserStorage.requestLogin(parsedPayload, newResponse.token_type)
        localStorage.setItem(USER_INFO, JSON.stringify(parsedPayload))
        localStorage.setItem(TOKEN, newResponse.access_token)
        localStorage.setItem(TYPE_TOKEN, newResponse.token_type)
        navegate(PUBLIC_ROUTES.HOME)
      })
      .catch(e =>{
        console.log(e)
        setMostrarMsg(true)
        setMsg("Error en la solicitud, intenta otra vez")
        setTypeMsg("Error")
      })
    }else{
      setMostrarMsg(true)
      setTypeMsg("Error")
      setMsg("Alguno de los campos es invalido")
    }
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
        {
          mostrarMsg && <span className={`text-xl ${typeMsg == "Error" ? "text-red-600" : "text-green-600"}`} > {msg} </span>
        }
      </div>
    </Layout>
  )
}