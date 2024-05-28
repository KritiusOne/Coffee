import { Route, Routes } from "react-router"
import { PUBLIC_ROUTES } from "./TypesRoutes"
import { Home } from "../pages/Home"
import { LogIn } from "../pages/LogIn"
import { SignIn } from "../pages/SignIn"
import { Products } from "../pages/Products"
import { ProductDetails } from "../pages/ProductDetails"

export const MyRoutes: React.FC = ()=>{
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LogIn />} />
      <Route path={PUBLIC_ROUTES.SIGNIN} element={<SignIn />} />
      <Route path={PUBLIC_ROUTES.PRODUCTS} element={<Products />} />
      <Route path={PUBLIC_ROUTES.PRODUCT_DETAILS} element={<ProductDetails />}  />
    </Routes>
  )
}