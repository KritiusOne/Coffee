import { create } from "zustand"
import { User } from "../types/UserTypes"

interface IUserStorage {
  userInfo?: User
  typeToken: string
  requestLogin: (InfoUsuario: User, typeNewToken:string) => void
}
export const useUserStorage = create<IUserStorage>((set)=>({
  userInfo: undefined,
  typeToken: "",
  requestLogin: (InfoUsuario: User, typeNewToken:string)=>{
    set({userInfo: InfoUsuario, typeToken: typeNewToken})
  }
}))