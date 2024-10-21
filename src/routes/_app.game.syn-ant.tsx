import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_app/game/syn-ant')({
  component: SynAntGame,
})

function SynAntGame() {
  return (
    <div className="col-span-full flex flex-col gap-14">
      <div></div>
      <div className='flex w-11/12 mx-auto'>
        <Link to="/dashboard" className="flex select-none items-center gap-4 cursor-pointer">
          <CircleArrowLeft fill='#4ABC96' stroke='white' size={60} strokeWidth={1} />
          <span className='text-2xl font-bold text-white tracking-wide'>Volver</span>
        </Link>
      </div>
      <div className='flex justify-center'>
        <div className='bg-[#3B1F83] rounded-lg flex gap-8 p-4 lg:w-[1200px] lg:h-[750px] w-[800px] h-[500px] justify-around'>
          <img
            src="https://images.pexels.com/photos/5258145/pexels-photo-5258145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Game Image"
            className="rounded-lg"
          />
          <div className='flex flex-col items-center justify-around gap-8'>
            <div></div>
            <h1 className='font-extrabold font-title text-4xl text-white text-balance text-center '>COMPAÑEROS Y CONTRARIOS</h1>
            <div></div>
            <p
            className='text-white text-2xl text-balance text-center'
            >Tendrás que leer las palabras y elegir sus <strong>sinónimos</strong> (compañeros) o <strong>antónimos</strong> (contrarios).</p>
            <div></div>
            <Button
            size={'lg'}
            className='w-3/4 text-xl font-bold'
            >COMENZAR</Button>
            <div></div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
