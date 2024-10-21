import { createFileRoute } from '@tanstack/react-router'
import { ProfileAside } from '@/components/ProfileAside'
import { GameCard } from '@/components/GameCard'


export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})


function Dashboard() {

  return (
    <>
      <aside className="hidden md:block md:col-span-4 lg:col-span-2 bg-[#395274] pt-16">
        <ProfileAside />
      </aside>
      <div className="col-span-full md:col-start-5 md:col-end-13 lg:col-start-3 main-bg flex flex-col lg:flex-row justify-center items-center gap-8 p-4 md:px-16"
      >
        <GameCard 
        imgUrl={"https://images.pexels.com/photos/39896/space-station-moon-landing-apollo-15-james-irwin-39896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
        title={"Adivina la historia"} 
        description={"Lee una historia y descubrí las pistas adivinando lo que pasa después."}
        game='guess'
        />
        <GameCard 
        imgUrl={"https://images.pexels.com/photos/946071/pexels-photo-946071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
        title={"Contrarios y Compañeros"} 
        description={"Algunas palabras significan lo mismo y otras todo lo contrario. ¿Podrás descubrir cuál es cuál? "}
        game='syn-ant'
        />
        <GameCard  
        imgUrl={"https://images.pexels.com/photos/26556161/pexels-photo-26556161/free-photo-of-valley-in-summer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
        title={"¿Quién fue?"}
        description={"Responde quién fue el que realizó la acción. ¡Usa tu comprensión para encontrar la respuesta correcta!"}
        game='who-was-it'
        />
      </div>
    </>

  )
}