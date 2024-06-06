import { create } from "zustand";
import { Orders } from "../types/OrdersType";

interface OrderTypes{
  AllOrders: Orders[]
  setAllOrders: (newOrders: Orders[])=>void
}
export const useOrderStorage = create<OrderTypes>((set)=>({
  AllOrders: [],
  setAllOrders: (newOrders)=>{
    set({AllOrders: [...newOrders]})
  }
}))