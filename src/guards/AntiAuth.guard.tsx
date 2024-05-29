import { Navigate, Outlet } from "react-router"
import { useUserStorage } from "../zustand/UserStorage"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"

export const AntiAuthGuard = ()=>{
  const token = useUserStorage(Storage => Storage.accesToken)
  return (
    token.length == 0 ? <Outlet /> : <Navigate replace to={PUBLIC_ROUTES.HOME} />
  )
}