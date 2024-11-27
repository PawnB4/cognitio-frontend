import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SpinningIndicator } from '@/components/SpinningIndicator'
import { ReadAndConcludeGameScreen } from '@/components/ReadAndConcludeGameScreen'
import { ReadAndConcludeExercise } from '@/api/types'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Cookies from "js-cookie";

export const Route = createFileRoute('/_app/game/read-and-conclude')({
  component: ReadAndConcludeGame,
})

type GameStatus = 'unstarted' | 'inProgress' | 'finished'

const dificultades = ['facil', 'medio', 'dificil']

const baseURL = import.meta.env.VITE_BACKEND_URL;

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
  if (!res.ok) {
    throw new Error
  }
  const data = await res.json();
  return data.ejercicios;
};

const generateProgress = async (amountCorrect: number, amountIncorrect: number, difficultyLevel: number,) => {
  const accessToken = await Cookies.get("access_token");
  const res = await fetch(`${baseURL}/progress/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "bearer-token": `${accessToken}`,
    },
    body: JSON.stringify({
      level: difficultyLevel,
      correct: amountCorrect,
      incorrect: amountIncorrect,
      type: "Lee y Concluye"
    }),
  });
  if (!res.ok) {
    throw new Error
  }
};


function ReadAndConcludeGame() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('unstarted')
  const [cantidadCorrectas, setCantidadCorrectas] = useState(0)
  const [cantidadIncorrectas, setCantidadIncorrectas] = useState(0)
  const [difficultyLevel, setDifficultyLevel] = useState(1)

  const queryClient = useQueryClient()

  const incrementarCorrectas = () => setCantidadCorrectas(cantidadCorrectas + 1)
  const incrementarIncorrectas = () =>
    setCantidadIncorrectas(cantidadIncorrectas + 1)

  const finalizarJuego = async () => {
    setGameStatus('finished')
    queryClient.invalidateQueries({
      queryKey: ['read-and-conclude-game', difficultyLevel],
    })
    await generateProgress(cantidadCorrectas, cantidadIncorrectas, difficultyLevel)
    await queryClient.invalidateQueries({
      queryKey: ['progress'],
    })
  }

  const { data: ejercicios = [], isPending, error, refetch } = useQuery<ReadAndConcludeExercise[]>({
    queryKey: ["syn-ant-game", difficultyLevel],
    queryFn: () => generateGame(2, difficultyLevel, 5),
    enabled: false
  })

  if (error) {
    return (
      <div className="col-span-full flex justify-center items-center">
        <h1 className="p-12 bg-white w-full text-center text-2xl">
          Algo salió mal. Por favor intena nuevamente.
        </h1>
      </div>
    )
  }

  return (
    <div className="col-span-full flex flex-col gap-4 ">
      <div></div>
      <div className="md:flex w-11/12 mx-auto hidden">
        <Link
          to="/dashboard"
          className="flex select-none items-center gap-4 cursor-pointer"
        >
          <CircleArrowLeft
            fill="#4ABC96"
            stroke="white"
            size={60}
            strokeWidth={1}
          />
          <span className="text-2xl font-bold text-white tracking-wide">
            Volver
          </span>
        </Link>
      </div>
      <div className="flex justify-center p-4">
        <div className="bg-[#3B1F83] rounded-lg flex flex-col md:flex-row gap-8 md:p-8 p-4 
        w-full xl:w-[1200px] justify-center items-center md:items-stretch md:justify-around">
          {gameStatus === 'unstarted' && (
            <>
              <div className='hidden md:block md:w-3/5'>
                <img
                  src="https://res.cloudinary.com/dr4iesryu/image/upload/v1731502128/Dise%C3%B1o_sin_t%C3%ADtulo_1_ceqx2d.svg"
                  alt="Game Image"
                  className="hidden md:block rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col items-center justify-around gap-4">
                <h1 className="font-extrabold font-title text-4xl text-white text-balance text-center ">
                  LEE Y CONCLUYE
                </h1>
                <p className="text-white text-2xl text-balance text-center">
                  Lee la historia con atención y selecciona la persona correcta
                  que realizó la acción indicada en la pregunta.
                </p>
                <p className="text-white text-3xl text-balance text-center">
                  Selecciona la <strong>DIFICULTAD</strong>
                </p>
                <div className="flex flex-col md:flex-row w-full justify-evenly gap-2">
                  {dificultades.map((dificultad) => {
                    return (
                      <Button
                        key={dificultades.indexOf(dificultad)}
                        className={`text-xl w-full font-bold 
                          ${difficultyLevel === dificultades.indexOf(dificultad) + 1 && 'bg-rose-300 border-rose-300'}`}
                        variant={'outline'}
                        onClick={() =>
                          setDifficultyLevel(
                            dificultades.indexOf(dificultad) + 1,
                          )
                        }
                      >
                        {dificultad.toUpperCase()}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  size={'lg'}
                  className="w-full text-xl font-bold "
                  onClick={() => {
                    // Ejecutar query
                    refetch()
                    setGameStatus('inProgress')
                  }}
                >
                  COMENZAR
                </Button>
              </div>
            </>
          )}
          {gameStatus === 'inProgress' ? (
            !isPending ? (
              <ReadAndConcludeGameScreen
                ejercicios={ejercicios}
                incrementarCorrectas={incrementarCorrectas}
                incrementarIncorrectas={incrementarIncorrectas}
                finalizarJuego={finalizarJuego}
              />
            ) : (
              <div className='w-full h-96 relative flex justify-center items-center '>
                <h1 className='absolute top-0 md:top-10 font-extrabold text-4xl text-white text-balance text-center'>CARGANDO...</h1>
                <SpinningIndicator
                  size={20}
                />
              </div>
            )
          ) : null}
          {gameStatus === 'finished' && (
            <div className="flex flex-col justify-center gap-4 py-4">
              <h1 className="font-extrabold text-2xl  md:text-7xl text-white text-balance text-center">
                HAS FINALIZADO
              </h1>
              <div className="hidden md:block"></div>
              <div></div>
              <h3 className="font-extrabold text-lg md:text-4xl text-green-500 text-balance text-center">
                RESPUESTAS CORRECTAS
              </h3>
              <h4 className="font-extrabold text-2xl  md:text-6xl text-white text-balance text-center">
                {cantidadCorrectas} / {ejercicios && ejercicios.length}
              </h4>
              <div></div>
              <h3 className="font-extrabold text-lg md:text-4xl text-red-500 text-balance text-center">
                RESPUESTAS INCORRECTAS
              </h3>
              <h4 className="font-extrabold text-2xl  md:text-6xl text-white text-balance text-center">
                {cantidadIncorrectas} / {ejercicios && ejercicios.length}
              </h4>
              <div></div>
              <Button
                asChild
                size={'lg'}
                className="text-sm md:text-xl font-bold"
                disabled={isPending}
                onClick={() => setGameStatus('unstarted')}
              >
                <Link to="/dashboard">VOLVER AL INICIO</Link>
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
