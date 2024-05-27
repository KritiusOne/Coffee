import { create } from "zustand";
import { CartProductsInfo, ProductMock } from "../types/ProductType";

interface CartType {
  CartProducts: CartProductsInfo[]
  parcialPrice: number
  setCartProduct: (ProductToAdd: ProductMock, quantity?: number) => void
  setDeleteProduct: (ProductToDelete: ProductMock)=>void
}
export const useCartStorage = create<CartType>((set, get) => ({
  CartProducts: [],
  parcialPrice: 0,
  setCartProduct: (ProductToAdd, quantity) => {
    const actualProdutsCart = get()
    const toAddQuantity = quantity != null ? quantity : 1
    const newCartProducts = actualProdutsCart.CartProducts.find((product)=> product.Product.id == ProductToAdd.id)
    if(newCartProducts == undefined){
      const newProduct:CartProductsInfo = {
        Product: ProductToAdd,
        stockSolicitado: toAddQuantity
      }
      set({
        CartProducts: [...actualProdutsCart.CartProducts, newProduct],
        parcialPrice: actualProdutsCart.parcialPrice + ProductToAdd.price*toAddQuantity
      })
    }
  },
  setDeleteProduct: (ProductToDelete)=>{
    const cartStorage = get()
    const newCartProducts = cartStorage.CartProducts.filter((Product)=> ProductToDelete.id != Product.Product.id)
    const [productoEliminado] = cartStorage.CartProducts.filter((Product)=> ProductToDelete.id == Product.Product.id)
    const newParcialPrice = cartStorage.parcialPrice - ProductToDelete.price * productoEliminado.stockSolicitado
    set({CartProducts: [...newCartProducts], parcialPrice: newParcialPrice})
  }
}))