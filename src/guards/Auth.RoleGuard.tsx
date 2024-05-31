import { Navigate, Outlet } from "react-router"
import { useUserStorage } from "../zustand/UserStorage"
import { PUBLIC_ROUTES } from "../routes/TypesRoutes"

export const AuthRoleGuard: React.FC = ()=>{
  const UserData = useUserStorage(Storage => Storage.userInfo)
  return (
    UserData && UserData.role_name == "administrador" ? <Outlet /> : <Navigate replace to={PUBLIC_ROUTES.LOGIN} />
  )
}