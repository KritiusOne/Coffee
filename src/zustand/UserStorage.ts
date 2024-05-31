import { create } from "zustand"
import { User } from "../types/UserTypes"
import { TOKEN, TYPE_TOKEN, USER_INFO } from "../helpers/LocalStorageItems"

interface IUserStorage {
  userInfo?: User
  typeToken: string
  requestLogin: (InfoUsuario: User, typeNewToken:string) => void
  logOut: ()=> void
  haveUserInfo: ()=>void
}
export const useUserStorage = create<IUserStorage>((set, get)=>({
  userInfo: undefined,
  typeToken: "",
  requestLogin: (InfoUsuario: User, typeNewToken:string)=>{
    set({userInfo: InfoUsuario, typeToken: typeNewToken})
  },
  logOut: ()=>{
    localStorage.removeItem(USER_INFO)
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(TYPE_TOKEN)
    set({userInfo: undefined, typeToken: ""})
  },
  haveUserInfo: ()=>{
    const actualInfo = get()
    if(actualInfo.userInfo == undefined){
      const oldInfoUser = localStorage.getItem(USER_INFO)
      if(oldInfoUser != null){
        const infoUser:User = JSON.parse(oldInfoUser)
        const fechaExpiracion = new Date((infoUser.exp as number) * 1000)
        const fechaActual = new Date()
        console.log(fechaActual.toLocaleString())
        console.log(fechaExpiracion.toLocaleString())
        if(fechaActual < fechaExpiracion){
          set({userInfo: infoUser, typeToken: "bearer"})
        }
      }
    }
  }
}))