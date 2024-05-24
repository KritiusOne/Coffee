import { Hero } from "../components/Hero"
import { Horarios } from "../components/Horarios"
import { CardProduct } from "../components/UI/CardProduct"
import { CollectionDataHome } from "../components/UI/CollectionDataHome"
import { Layout } from "../components/UI/Layout"
export const Home: React.FC = ()=>{
  return (
    <Layout>
      <Hero />
      <div className="flex flex-col justify-center items-center">
        <CollectionDataHome className="mt-6" />
        <Horarios className="mt-6" />
      </div>
      <div className="my-6 w-full flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 justify-center items-center gap-2 px-4">
        <div className="flex justify-center items-center">
          <CardProduct image="/src/assets/descarga.jfif" price={4000} stars={3} title="Café expreso" />
        </div>
        <div className="flex justify-center items-center">
          <CardProduct image="/src/assets/descarga.jfif" price={4000} stars={3} title="Café expreso" />
        </div>
        <div className="flex justify-center items-center">
          <CardProduct image="/src/assets/descarga.jfif" price={4000} stars={3} title="Café expreso" />
        </div>
        <div className="flex justify-center items-center">
          <CardProduct image="/src/assets/descarga.jfif" price={4000} stars={3} title="Café expreso" />
        </div>
        <div className="flex justify-center items-center">
          <CardProduct image="/src/assets/descarga.jfif" price={4000} stars={3} title="Café expreso" />
        </div>
        <div className="flex justify-center items-center">
          <CardProduct image="/src/assets/descarga.jfif" price={4000} stars={3} title="Café expreso" />
        </div>
      </div>
    </Layout>
  )
}