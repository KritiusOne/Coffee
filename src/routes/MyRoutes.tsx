import { Route, Routes } from "react-router"
import { ADMIN_ROUTES, PRIVATE_CLIENT_ROUTES, PUBLIC_ROUTES } from "./TypesRoutes"
import { Home } from "../pages/Home"
import { LogIn } from "../pages/LogIn"
import { SignIn } from "../pages/SignIn"
import { Products } from "../pages/Products"
import { ProductDetails } from "../pages/ProductDetails"
import { AuthGuard } from "../guards/Auth.guard"
import { CartBuy } from "../pages/CartBuy"
import { AntiAuthGuard } from "../guards/AntiAuth.guard"
import { AuthRoleGuard } from "../guards/Auth.RoleGuard"
import { ControlPanel } from "../pages/ControlPanel"
import { DetailsPedido } from "../pages/DetailsPedido"
import { MisPedidos } from "../pages/MisPedidos"
import { PedidoDetailsUser } from "../pages/PedidoDetailsUser"

export const MyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
      <Route path={PUBLIC_ROUTES.PRODUCTS} element={<Products />} />
      <Route path={PUBLIC_ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
      <Route element={<AntiAuthGuard />}>
        <Route path={PUBLIC_ROUTES.SIGNIN} element={<SignIn />} />
      </Route>
      <Route element={<AntiAuthGuard />}>
        <Route path={PUBLIC_ROUTES.LOGIN} element={<LogIn />} />
      </Route>
      <Route element={<AuthGuard />}>
        <Route path={PRIVATE_CLIENT_ROUTES.CART_BUY} element={<CartBuy />} />
      </Route>
      <Route element={<AuthGuard />}>
        <Route path={PRIVATE_CLIENT_ROUTES.MY_PEDIDOS} element={<MisPedidos />} />
      </Route>
      <Route element={<AuthRoleGuard />}>
        <Route path={ADMIN_ROUTES.CONTROL_PANEL} element={<ControlPanel />} />
      </Route>
      <Route element={<AuthRoleGuard />}>
        <Route path={ADMIN_ROUTES.DETAILS_PEDIDO} element={<DetailsPedido />} />
      </Route>
      <Route path={PRIVATE_CLIENT_ROUTES.DETAILS_PEDIDO_USER} element={<PedidoDetailsUser />} />

    </Routes>
  )
}