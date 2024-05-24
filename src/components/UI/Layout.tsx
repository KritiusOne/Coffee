import { useThemeStorage } from "../../zustand/Theme"
import { Footer } from "../Footer"
import { Header } from "../Header"
import "./ConfigLayout.css"
import { MenuAside } from "./MenuAside"

interface Props {
  children: JSX.Element | JSX.Element[] | string  
}

export const Layout: React.FC<Props> = ({children})=>{
  const viewAsideMenu = useThemeStorage(Theme => Theme.visibleMenuAside)

  return (
    <div className="Layout">
      <Header className="Header" />
      <div className="main">
        {
          viewAsideMenu && <MenuAside />
        }
        <main >
          {
            children
          }
        </main>
      </div>
      <Footer className="Footer"/>
    </div>
  )
}