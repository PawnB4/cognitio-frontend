import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SynAntGameScreen } from '@/components/SynAntGameScreen'

export const Route = createFileRoute('/_app/game/syn-ant')({
  component: SynAntGame,
})


type GameStatus = "unstarted" | "inProgress" | "finished"

const generateGame = async (difficultyLevel: number) => {
  const res = await fetch("https://cognitio-back-production.up.railway.app/game/generate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      game_number: 1,
      difficulty: difficultyLevel,
      number_excercises: 5,
    }),
  });
  const data = await res.json();
  return data.ejercicios;
};

// const generateProgress = async (correct: number, incorrect: number) => {
//   await fetch("https://cognitio-back-production.up.railway.app/progress/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZ3VzQGV4YW1wbGUuY29tIiwiZXhwIjoxNzI5ODI3MjQzfQ.6BTeEM6GmfYEz6bdEEyr7RFi5O8qc80Ln2OniKgg7Mo`
//     },
//     body: JSON.stringify({
//       level: 1,
//       type: "syn_ant",
//       correct,
//       incorrect
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
    queryClient.invalidateQueries({ queryKey: ["generate-game", difficultyLevel] })
    // TODO: Generar progreso
    // await generateProgress(cantidadCorrectas, cantidadIncorrectas)
  }

  const { data: ejercicios, isPending, error } = useQuery({ queryKey: ["generate-game", difficultyLevel], queryFn: () => generateGame(difficultyLevel), })

  if (error) {
    return (
      <div className='col-span-full flex justify-center items-center'>
        <h1 className='p-12  bg-white w-full text-center text-2xl'>
          Algo salió mal. Por favor intena nuevamente.
        </h1>
      </div>
    )
  }

  return (
    <div className="col-span-full flex flex-col gap-14">
      <div></div>
      <div className='md:flex w-11/12 mx-auto hidden'>
        <Link to="/dashboard" className="flex select-none items-center gap-4 cursor-pointer">
          <CircleArrowLeft fill='#4ABC96' stroke='white' size={60} strokeWidth={1} />
          <span className='text-2xl font-bold text-white tracking-wide'>Volver</span>
        </Link>
      </div>
      <div className='flex justify-center p-4'>
        <div className='bg-[#3B1F83] rounded-lg flex flex-col md:flex-row gap-8 px-4 py-8 w-full lg:w-[1200px] lg:h-[750px] md:w-[800px] md:h-[500px] justify-center items-center md:items-stretch md:justify-around'>
          {gameStatus === "unstarted" &&
            <>
              <img
                src="https://images.pexels.com/photos/5258145/pexels-photo-5258145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Game Image"
                className="hidden md:block rounded-lg"
              />
              <div className='flex flex-col items-center justify-around gap-8'>
                <div></div>
                <h1 className='font-extrabold font-title text-4xl text-white text-balance text-center '>COMPAÑEROS Y CONTRARIOS</h1>
                <div></div>
                <p
                  className='text-white text-2xl text-balance text-center'
                >Tendrás que leer las palabras y elegir sus <strong>sinónimos</strong> (compañeros) o <strong>antónimos</strong> (contrarios).</p>
                <p
                  className='text-white text-3xl text-balance text-center'
                >Seleccione la  <strong>DIFICULTAD</strong></p>
                <div
                  className='flex w-full justify-evenly gap-2 '
                >
                  {dificultades.map((dificultad) => {
                    return (
                      <Button
                        key={dificultades.indexOf(dificultad)}
                        className={`text-xl w-full font-bold 
                          ${difficultyLevel === dificultades.indexOf(dificultad) + 1 && "bg-rose-300 border-rose-300"}`}
                        variant={'outline'}
                        disabled={isPending}
                        onClick={() => setDifficultyLevel(dificultades.indexOf(dificultad) + 1)}
                      >{dificultad.toUpperCase()}</Button>
                    )
                  })}
                </div>

                <Button
                  size={'lg'}
                  className='w-3/4 text-xl font-bold'
                  disabled={isPending}
                  onClick={() => setGameStatus("inProgress")}
                >{isPending ? "..." : "COMENZAR"}</Button>
                <div></div>
              </div>
            </>
          }
          {
            gameStatus === "inProgress" &&
            <SynAntGameScreen ejercicios={ejercicios} incrementarCorrectas={incrementarCorrectas} incrementarIncorrectas={incrementarIncorrectas} finalizarJuego={finalizarJuego} />
          }
          {gameStatus === "finished" &&
            <div
              className='flex flex-col justify-center gap-8 py-8'
            >
              <h1 className="font-extrabold font-title text-2xl  md:text-7xl text-white text-balance text-center">
                HAS FINALIZADO
              </h1>
              <div className='hidden md:block'></div>
              <div></div>
              <h3 className="font-extrabold font-title text-lg md:text-5xl text-green-500 text-balance text-center">
                RESPUESTAS CORRECTAS
              </h3>
              <h4 className="font-extrabold font-title text-2xl  md:text-7xl text-white text-balance text-center">
                {cantidadCorrectas} / {ejercicios.length}
              </h4>
              <div></div>
              <h3 className="font-extrabold font-title text-lg md:text-5xl text-red-500 text-balance text-center">
                RESPUESTAS INCORRECTAS
              </h3>
              <h4 className="font-extrabold font-title text-2xl  md:text-7xl text-white text-balance text-center">
                {cantidadIncorrectas} / {ejercicios.length}
              </h4>
              <Button asChild
                size={'lg'}
                className='text-xl font-bold'
                disabled={isPending}
                onClick={() => setGameStatus("inProgress")}
              >
                <Link to='/dashboard'>
                  VOLVER AL INICIO
                </Link>
              </Button>
            </div>
          }

        </div>
      </div>
    </div>
  )
}
