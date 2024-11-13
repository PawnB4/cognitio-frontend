/* eslint-disable @typescript-eslint/no-unused-vars */
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SynAntGameScreen } from '@/components/SynAntGameScreen'
import { SpinningIndicator } from '@/components/SpinningIndicator'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Cookies from 'js-cookie'
import { SynonymAntonymExercise } from '@/api/types'

type GameStatus = "unstarted" | "inProgress" | "finished"

const baseURL = import.meta.env.VITE_BACKEND_URL;


export const Route = createFileRoute('/_app/game/syn-ant')({
  component: SynAntGame,
})

const generateGame = async (gameNumber: number, difficultyLevel: number, exercisesAmount: number) => {
  const res = await fetch(`${baseURL}/game/generate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      game_number: gameNumber,
      difficulty: difficultyLevel,
      number_excercises: exercisesAmount,
    }),
  });
  if(!res.ok){
    throw new Error
  }
  const data = await res.json();
  return data.ejercicios;
};

// const generateProgress = async (cantidadCorrectas: number, cantidadIncorrectas: number, difficultyLevel:number ) => {
//   const accessToken = await Cookies.get("access_token")
//   await fetch(`${baseURL}/progress`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "bearer-token": `${accessToken}`
//     },
//     body: JSON.stringify({
//       level: difficultyLevel,
//       type: "syn_ant",
//       correct: cantidadCorrectas,
//       incorrect: cantidadIncorrectas
//     }),
//   });
// }


const dificultades = ["facil", "medio", "dificil"]

function SynAntGame() {
  const [gameStatus, setGameStatus] = useState<GameStatus>("unstarted");
  const [cantidadCorrectas, setCantidadCorrectas] = useState(0)
  const [cantidadIncorrectas, setCantidadIncorrectas] = useState(0)
  const [difficultyLevel, setDifficultyLevel] = useState(1)

  const queryClient = useQueryClient()

  const incrementarCorrectas = () => setCantidadCorrectas(cantidadCorrectas + 1)
  const incrementarIncorrectas = () => setCantidadIncorrectas(cantidadIncorrectas + 1)

  const finalizarJuego = async () => {
    setGameStatus("finished")
    queryClient.invalidateQueries({ queryKey: ["syn-ant-game", difficultyLevel] })
    // await generateProgress(cantidadCorrectas, cantidadIncorrectas, difficultyLevel)
  }

  const { data: ejercicios = [], isPending, error, refetch } = useQuery<SynonymAntonymExercise[]>({
    queryKey: ["syn-ant-game", difficultyLevel],
    queryFn: () => generateGame(1, difficultyLevel, 5),
    enabled: false
  })


  if (error) {
    return (
      <div className='col-span-full flex justify-center items-center'>
        <h1 className='p-12 bg-white w-full text-center text-xl'>
          Algo salió mal. Por favor intena nuevamente.
        </h1>
      </div>
    )
  }

  return (
      <div className="col-span-full flex flex-col gap-8 text-sm mt-0">
      <div></div>
      <div className='md:flex w-11/12 mx-auto hidden'>
      <Link to="/dashboard" className="flex select-none items-center gap-4 cursor-pointer">
          <CircleArrowLeft fill='#4ABC96' stroke='white' size={60} strokeWidth={1} />
          <span className='text-xl font-bold text-white'>Volver</span> 
        </Link>
      </div>
      <div className="flex justify-center p-0"> 
      <div className='bg-[#3B1F83] rounded-lg flex flex-col md:flex-row gap-4 px-4 py-6 w-full min-h-[300px] lg:w-[800px] lg:h-[500px] md:w-[600px] md:h-[400px] items-center m-0 p-0'>
          {gameStatus === "unstarted" &&
            <>
              <img
                src="https://images.pexels.com/photos/5258145/pexels-photo-5258145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Game Image"
                className="hidden md:block rounded-lg w-1/3 h-auto max-h-48"
              />
              <div className='flex flex-col items-center justify-around gap-8'>
                <div></div>
                <h1 className='font-bold text-3xl text-white text-center'>COMPAÑEROS Y CONTRARIOS</h1>
                <div></div>
                <p className='text-white text-base text-center'
                >Tendrás que leer las palabras y elegir sus <strong>sinónimos</strong> (compañeros) o <strong>antónimos</strong> (contrarios).</p>
                <p
                  className='text-white text-lg text-center'
                >Selecciona la  <strong>DIFICULTAD</strong></p>
                <div
                  className='flex w-full justify-evenly gap-2 '
                >
                  {dificultades.map((dificultad) => {
                    return (
                      <Button
                        key={dificultades.indexOf(dificultad)}
                        className={`w-2/3 text-lg font-bold 
                          ${difficultyLevel === dificultades.indexOf(dificultad) + 1 && "bg-rose-300 border-rose-300"}`}
                        variant={'outline'}
                        onClick={() => setDifficultyLevel(dificultades.indexOf(dificultad) + 1)}
                      >{dificultad.toUpperCase()}</Button>
                    )
                  })}
                </div>

                <Button
                  size={'lg'}
                  className='w-3/4 text-xl font-bold'
                  onClick={() => {
                    // Ejecutar query
                    refetch()
                    setGameStatus("inProgress")
                  }}
                >COMENZAR</Button>
                <div></div>   
              </div>
            </>
          }
          {
            gameStatus === "inProgress" ? (
              !isPending ? (
                <SynAntGameScreen
                  ejercicios={ejercicios}
                  incrementarCorrectas={incrementarCorrectas}
                  incrementarIncorrectas={incrementarIncorrectas}
                  finalizarJuego={finalizarJuego}
                />
              ) : (

                <div className='w-full h-full relative flex justify-center items-center '>
                  <h1 className='absolute top-0 md:top-10 font-extrabold text-4xl text-white text-balance text-center '>CARGANDO...</h1>
                  <SpinningIndicator
                    size={20}
                  />
                </div>
              )
            ) : null
          } 
          {gameStatus === "finished" && (
            <div className="flex relative justify-center items-center w-full h-full">
            <div className='flex flex-col justify-center gap-8 py-8'>
              <h1 className="font-extrabold text-sm md:text-2xl text-white text-balance text-center">
                HAS FINALIZADO
              </h1>
              <div className='hidden md:block'></div>
              <div></div>
              <h3 className="font-extrabold text-sm md:text-xl text-green-500 text-balance text-center">
                RESPUESTAS CORRECTAS
              </h3>
              <h4 className="font-extrabold text-sm md:text-2xl text-white text-balance text-center">
                {cantidadCorrectas} / {ejercicios.length}
              </h4>
              <div></div>
              <h3 className="font-extrabold text-sm md:text-xl text-red-500 text-balance text-center">
                RESPUESTAS INCORRECTAS
              </h3>
              <h4 className="font-extrabold text-sm md:text-2xl text-white text-balance text-center">
                {cantidadIncorrectas} / {ejercicios.length}
              </h4>
              <Button asChild
                size={'lg'}
                className='text-sm font-bold'
                disabled={isPending}
                onClick={() => setGameStatus("unstarted")}
              >
                <Link to='/dashboard'>
                  VOLVER AL INICIO
                </Link>
              </Button>
            </div>
            </div>
          )}

        </div>
      </div>
          <div></div>
    </div>
  )
}
