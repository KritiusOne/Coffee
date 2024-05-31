import React from "react";
import { useCartStorage } from "../zustand/CartStorage";

export const ProductsTextInfo: React.FC = () => {
  const ProductsCart = useCartStorage()
  return (
    <div className="w-full flex flex-col items-center justify-evenly text-xl">
      {
        ProductsCart.CartProducts && ProductsCart.CartProducts.map(producto => {
          return (
            <article className="w-full flex flex-row justify-between">
              <span> {producto.Product.Menu.nombre_producto} x {producto.stockSolicitado} </span>
              <strong> ${producto.Product.Menu.precio * producto.stockSolicitado} </strong>
            </article>
          )
        })
      }
      <article className="w-full flex flex-row justify-between">
        <span> Total </span>
        <strong> ${ProductsCart.parcialPrice} </strong>
      </article>
    </div>
  )
}