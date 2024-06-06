import { Link } from "react-router-dom"
import { Input } from "../components/UI/Input"
import { Layout } from "../components/UI/Layout"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"
import { ChangeEvent, useState } from "react"
import { validationName, validatorEmail } from "../helpers/Validations"
import { User } from "../types/UserTypes"
import { TypeMsg } from "../types/UtilsTypes"

export const SignIn: React.FC = () => {
  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    Addres: ""
  })
  const [msg, setMsg] = useState("")
  const [mostrarMsg, setMostrarMsg] = useState(false)
  const [typeMsg, setTypeMsg] = useState<TypeMsg>("Error")
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>)=>{
    if(validationName.test(e.target.value.trim())){
      setRegister( {...register, first_name: e.target.value.trim()})
      setMostrarMsg(false)
      setTypeMsg("Succes")
    }else{
      setMostrarMsg(true)
      setMsg("El Nombre contiene caracteres invalidos")
    }
  }
  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>)=>{
    if(validationName.test(e.target.value.trim())){
      setRegister( {...register, last_name: e.target.value.trim()})
      setMostrarMsg(false)
      setTypeMsg("Succes")
    }else{
      setMostrarMsg(true)
      setTypeMsg("Error")
      setMsg("El apellido contiene caracteres invalidos")
    }
  }
  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>)=>{
    if(validationName.test(e.target.value.trim())){
      setRegister( {...register, username: e.target.value.trim()})
      setMostrarMsg(false)
      setTypeMsg("Succes")
    }else{
      setMostrarMsg(true)
      setTypeMsg("Error")
      setMsg("El Nombre de usuario contiene caracteres invalidos")
    }
  }
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>)=>{
    if(validatorEmail.test(e.target.value.trim())){
      setRegister( {...register, email: e.target.value.trim()})
      setMostrarMsg(false)
      setTypeMsg("Succes")
    }else{
      setMostrarMsg(true)
      setTypeMsg("Error")
      setMsg("El email tiene un formato erroneo o contiene caracteres invalidos")
    }
  }
  const handleChangeTelefono = (e: ChangeEvent<HTMLInputElement>)=>{
    if(e.target.value.trim().length == 10){
      setMostrarMsg(false)
      setTypeMsg("Succes")
      setRegister({...register, phone: e.target.value.trim()})
    }else{
      setMostrarMsg(true)
      setTypeMsg("Error")
      setMsg("El formato del telefono no es el correcto, ingrese un telefono movil")
    }
  }
  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>)=>{
    setRegister({...register, Addres: e.target.value.trim()})
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>)=>{
    setRegister({...register, password: e.target.value.trim()})
  }
  const handleClickButton = () =>{
    const URL = import.meta.env.VITE_URL_API_SIGNIN
    if(typeMsg != "Succes"){
      setMostrarMsg(true)
      setTypeMsg("Error")
      setMsg("Alguno de los campos es invalido")
    }{
      fetch(URL, {
        method: "POST",
        body: JSON.stringify(register),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(response =>{
        const responseUser = response  as User
        setMostrarMsg(true)
        setMsg(`Haz sido registrado correctamente, ${responseUser.first_name}, dirigete a la pagina de iniciar sesion para poder logearte`)
        setTypeMsg("Succes")
      })
      .catch(e =>{
        setMostrarMsg(true)
        setMsg("Error en la solicitud, intenta otra vez")
        setTypeMsg("Error")
        console.log(e)
      })
    }
  }
  return (
    <Layout>
      <div className="flex flex-col justify-evenly items-center h-full w-7/12 mx-auto">
        <h1 className="font-medium text-3xl font-mono text-dark ">Registrarse</h1>
        <Input onChange={handleChangeName} typeInput="text" placeholder="Nombre" />
        <Input onChange={handleChangeLastName} typeInput="text" placeholder="Apellido" />
        <Input onChange={handleChangeUserName} typeInput="text" placeholder="Nombre de usuario" />
        <Input onChange={handleChangeEmail} typeInput="text" placeholder="Email" />
        <Input onChange={handleChangeTelefono} typeInput="text" placeholder="Telefono" />
        <Input onChange={handleChangeAddress} typeInput="text" placeholder="Direccion y descripcion" />
        <Input onChange={handleChangePassword} typeInput="password" placeholder="Password" />        
        <button onClick={handleClickButton} className="bg-action  hover:bg-white hover:text-dark text-white text-l px-2 py-1 rounded-md w-full hover:border-dark border-2 border-solid border-action">Registrarse</button>
        <Link to={PUBLIC_ROUTES.LOGIN} className="text-l hover:text-action" > ¿Ya está registrado? <strong>Iniciar sesión</strong></Link>
        {
          mostrarMsg && <span className={`text-xl ${typeMsg == "Error" ? "text-red-600" : "text-green-600"}`} > {msg} </span>
        }
      </div>
    </Layout>
  )
}