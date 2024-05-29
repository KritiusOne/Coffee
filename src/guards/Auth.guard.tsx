import { Navigate, Outlet } from "react-router"
import { useUserStorage } from "../zustand/UserStorage"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"

export const AuthGuard: React.FC = () => {
  const token = useUserStorage(Storage => Storage.accesToken)
  return (
    token.length == 0 ? <Navigate replace to={PUBLIC_ROUTES.LOGIN} /> 
    : <Outlet /> 
  )
}