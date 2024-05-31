import { create } from "zustand";
import { Orders } from "../types/OrdersType";
import {  UserByGetAll } from "../types/UserTypes";

interface OrderTypes{
  AllOrders: Orders[],
  AllUsers: UserByGetAll[]
  setAllOrders: (newOrders: Orders[], newUsers: UserByGetAll[])=>void
}
export const useOrderStorage = create<OrderTypes>((set)=>({
  AllOrders: [],
  AllUsers: [],
  setAllOrders: (newOrders, UsersByGetAll)=>{
    set({AllOrders: [...newOrders], AllUsers: [...UsersByGetAll]})
  }
}))