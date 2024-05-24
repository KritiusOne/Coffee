import { create } from "zustand"

interface ThemeTypes {
  visibleMenuAside: boolean,
  setMenuAside: (actualVisibileMenu: boolean)=>void
}
export const useThemeStorage = create<ThemeTypes>((set)=>({
  visibleMenuAside: false,
  setMenuAside: (actualVisibileMenu)=>{
    const newVisibleMenuAside = !actualVisibileMenu
    set({visibleMenuAside: newVisibleMenuAside })
  }
}))