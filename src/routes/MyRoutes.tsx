import { Route, Routes } from "react-router"
import { PRIVATE_CLIENT_ROUTES, PUBLIC_ROUTES } from "./TypesRoutes"
import { Home } from "../pages/Home"
import { LogIn } from "../pages/LogIn"
import { SignIn } from "../pages/SignIn"
import { Products } from "../pages/Products"
import { ProductDetails } from "../pages/ProductDetails"
import { AuthGuard } from "../guards/Auth.guard"
import { CartBuy } from "../pages/CartBuy"

export const MyRoutes: React.FC = ()=>{
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LogIn />} />
      <Route path={PUBLIC_ROUTES.SIGNIN} element={<SignIn />} />
      <Route path={PUBLIC_ROUTES.PRODUCTS} element={<Products />} />
      <Route path={PUBLIC_ROUTES.PRODUCT_DETAILS} element={<ProductDetails />}  />
      <Route element={<AuthGuard/>}>
        <Route path={PRIVATE_CLIENT_ROUTES.CART_BUY} element={<CartBuy />} />
      </Route>
    </Routes>
  )
}