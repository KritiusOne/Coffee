import { create } from "zustand";
import { ProductMock } from "../types/ProductType";

interface ProductsStorageTypes {
  AllProducts: ProductMock[]
  setAllProducts: (newProducts: ProductMock[])=>void
}
export const useProductsStorage = create<ProductsStorageTypes>((set) => ({
  AllProducts: [],
  setAllProducts: (newProducts) => {
    const newAllProducts = newProducts
    set({ AllProducts: newAllProducts });
  }
}));