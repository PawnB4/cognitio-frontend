import { createFileRoute } from '@tanstack/react-router'
import { ProfileAside } from '@/components/ProfileAside'
import { GameCard } from '@/components/GameCard'


export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})


function Dashboard() {
  const {user} = Route.useRouteContext();

  return (
    <>
      <aside className="hidden md:block md:col-span-4 lg:col-span-2 bg-[#395274] pt-16">
        <ProfileAside user={user}/>
      </aside>
      <div className="col-span-full md:col-start-5 md:col-end-13 lg:col-start-3 main-bg flex flex-col lg:flex-row justify-center items-center gap-8 p-4 md:px-16"
      >
        <GameCard 
        imgUrl={"https://res.cloudinary.com/dr4iesryu/image/upload/v1731502128/Dise%C3%B1o_sin_t%C3%ADtulo_1_ceqx2d.svg"} 
        title={"Lee y Concluye"} 
        description={"Lee el texto con atención y selecciona la respuesta correcta según lo que entiendas del párrafo."}
        game='read-and-conclude'
        />
        <GameCard 
        imgUrl={"https://res.cloudinary.com/dr4iesryu/image/upload/v1731502189/Designer_4_1_pyyioc.svg"} 
        title={"Contrarios y Compañeros"} 
        description={"Algunas palabras significan lo mismo y otras todo lo contrario. ¿Podrás descubrir cuál es cuál? "}
        game='syn-ant'
        />
        <GameCard  
        imgUrl={"https://res.cloudinary.com/dr4iesryu/image/upload/v1731502480/Designer_3_1_2_v2yfyo.svg"} 
        title={"¿Quién fue?"}
        description={"Responde quién fue el que realizó la acción. ¡Usa tu comprensión para encontrar la respuesta correcta!"}
        game='who-was-it'
        isThirdCard={true}
        />
      </div>
    </>

  )
}