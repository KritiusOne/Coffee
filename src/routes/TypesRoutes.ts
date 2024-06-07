export const PUBLIC_ROUTES = {
  HOME: "/",
  PRODUCTS: "/search-products",
  LOGIN: "/login",
  SIGNIN: "/signin",
  PRODUCT_DETAILS: "/search-products/:product"
}
export const PRIVATE_CLIENT_ROUTES = {
  CART_BUY: "/cart/buy",
  MY_PEDIDOS: "/user/pedidos",
  DETAILS_PEDIDO_USER: "/user/pedidos/:id"
}
export const ADMIN_ROUTES = {
  CONTROL_PANEL: "/panel",
  DETAILS_PEDIDO: "/panel/pedido/:id"
}