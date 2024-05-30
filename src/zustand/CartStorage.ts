import { create } from "zustand";
import { CartProductsInfo, Menu } from "../types/ProductType";

interface CartType {
  CartProducts: CartProductsInfo[]
  parcialPrice: number
  setCartProduct: (ProductToAdd: Menu, quantity?: number) => void
  setDeleteProduct: (ProductToDelete: Menu)=>void
  setCantidad: (id:number,quantity:number)=>void
}
export const useCartStorage = create<CartType>((set, get) => ({
  CartProducts: [],
  parcialPrice: 0,
  setCartProduct: (ProductToAdd, quantity) => {
    const actualProdutsCart = get()
    const toAddQuantity = quantity != null ? quantity : 1
    const newCartProducts = actualProdutsCart.CartProducts.find((product)=> product.Product.Menu.id_menu == ProductToAdd.Menu.id_menu)
    if(newCartProducts == undefined){
      const newProduct:CartProductsInfo = {
        Product: ProductToAdd,
        stockSolicitado: toAddQuantity
      }
      set({
        CartProducts: [...actualProdutsCart.CartProducts, newProduct],
        parcialPrice: actualProdutsCart.parcialPrice + ProductToAdd.Menu.precio*toAddQuantity
      })
    }
  },
  setDeleteProduct: (ProductToDelete)=>{
    const cartStorage = get()
    const newCartProducts = cartStorage.CartProducts.filter((Product)=> ProductToDelete.Menu.id_menu != Product.Product.Menu.id_menu)
    const [productoEliminado] = cartStorage.CartProducts.filter((Product)=> ProductToDelete.Menu.id_menu == Product.Product.Menu.id_menu)
    const newParcialPrice = cartStorage.parcialPrice - ProductToDelete.Menu.precio * productoEliminado.stockSolicitado
    set({CartProducts: [...newCartProducts], parcialPrice: newParcialPrice})
  },
  setCantidad: (id:number,quantity:number)=>{
    const actualCart = get()
    const newCart = actualCart.CartProducts.map(product => {
      if(product.Product.Menu.id_menu == id){
        product.stockSolicitado = quantity
        return product
      }else return product
    })
    const newParcialPrice = newCart.reduce((acumulador, currentValue)=> acumulador+ currentValue.Product.Menu.precio * currentValue.stockSolicitado, 0)
    set({CartProducts: [...newCart], parcialPrice: newParcialPrice})
  }
}))