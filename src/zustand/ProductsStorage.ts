import { create } from "zustand";
import { Menu } from "../types/ProductType";

interface ProductsStorageTypes {
  AllProducts: Menu[]
  setAllProducts: (newProducts: Menu[])=>void
}
export const useProductsStorage = create<ProductsStorageTypes>((set) => ({
  AllProducts: [],
  setAllProducts: (newProducts) => {
    const newAllProducts = newProducts
    set({ AllProducts: [...newAllProducts] });
  }
}));