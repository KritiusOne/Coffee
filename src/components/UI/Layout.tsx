import { Footer } from "../Footer"
import { Header } from "../Header"
import "./ConfigLayout.css"

interface Props {
  children: JSX.Element | JSX.Element[] | string  
}

export const Layout: React.FC<Props> = ({children})=>{
  return (
    <div className="Layout">
      <Header className="Header" />
      <aside className="aside">
        Menu aside
      </aside>
      <main className="main">
        {
          children
        }
      </main>
      <Footer className="Footer"/>
    </div>
  )
}