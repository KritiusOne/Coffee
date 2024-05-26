import { create } from "zustand"

interface ThemeTypes {
  visibleMenuAside: boolean,
  viewCart: boolean, 
  setMenuAside: (actualVisibileMenu: boolean)=>void
  setViewCart: (actualViewCart: boolean)=>void
}
export const useThemeStorage = create<ThemeTypes>((set)=>({
  visibleMenuAside: false,
  viewCart: false,
  setMenuAside: (actualVisibileMenu)=>{
    const newVisibleMenuAside = !actualVisibileMenu
    set({visibleMenuAside: newVisibleMenuAside })
  },
  setViewCart: (actualViewCart)=>{
    const newViewCart = !actualViewCart
    set({viewCart: newViewCart })
  }
}))