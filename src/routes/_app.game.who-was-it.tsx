import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { WhoWasItGameScreen } from '@/components/WhoWasItGameScreen'
import { SpinningIndicator } from '@/components/SpinningIndicator'

export const Route = createFileRoute('/_app/game/who-was-it')({
  component: WhoWasItGame,
})

type GameStatus = "unstarted" | "inProgress" | "finished"

const dificultades = ["facil", "medio", "dificil"]

const preguntas = [
  {
    texto: "El perro de Luis corrió detrás del gato que había saltado sobre la cerca. Mientras tanto, su hermano intentaba llamar a ambos, pero ninguno le prestaba atención. Al final, él decidió dejar que se calmaran por sí mismos.",
    pregunta: "¿Quién decidió dejar que el perro y el gato se calmaran?",
    opciones_correctas: ["El hermano de Luis"],
    opciones_incorrectas: ["Luis"]
  },
  {
    texto: "Martina y Santiago estaban preparando la cena. Mientras ella cortaba los vegetales, él buscaba los condimentos. Por otro lado, Pedro pasaba la escoba por el comedor. Martina le pidió a éste último que ponga la mesa. Al terminar, todos se sentaron a comer sin decir una palabra.",
    pregunta: "¿Quién puso la mesa?",
    opciones_correctas: ["Pedro"],
    opciones_incorrectas: ["Martina", "Santiago"]
  },
  {
    texto: "El pájaro azul volaba de árbol en árbol, mientras el rojo lo seguía de cerca. Cuando llegó a la cima del árbol más alto, este último se detuvo y decidió descansar, pero el otro continuó su vuelo.",
    pregunta: "¿Quién decidió descansar?",
    opciones_correctas: ["El pájaro rojo"],
    opciones_incorrectas: ["El pájaro azul"]
  },
  {
    texto: "Jorge y su amigo caminaban por la playa cuando vieron a dos niños construir un castillo de arena. Él comentó lo grande que era, pero su amigo no estaba tan impresionado. Sin embargo, al acercarse, el que lo había construido sonrió orgulloso.",
    pregunta: "¿Quién sonrió al ver que Jorge se acercaba al castillo?",
    opciones_correctas: ["Uno de los niños"],
    opciones_incorrectas: ["El amigo de Jorge", "Jorge"]
  },
  {
    texto: "Durante el partido, Lucas pasó la pelota a Juan, quien corrió hacia la portería, pero justo cuando iba a patear, este último fue interceptado por otro jugador. Él gritó pidiendo falta, pero el árbitro no lo escuchó.",
    pregunta: "¿Quién gritó pidiendo falta?",
    opciones_correctas: ["Juan"],
    opciones_incorrectas: ["Lucas", "El otro jugador"]
  }
];


const fakeGameRequest = async () =>{
  return preguntas
}

function WhoWasItGame() {
  const [gameStatus, setGameStatus] = useState<GameStatus>("unstarted");
  const [cantidadCorrectas, setCantidadCorrectas] = useState(0)
  const [cantidadIncorrectas, setCantidadIncorrectas] = useState(0)
  const [difficultyLevel, setDifficultyLevel] = useState(1)

  const queryClient = useQueryClient()

  const incrementarCorrectas = () => setCantidadCorrectas(cantidadCorrectas + 1)
  const incrementarIncorrectas = () => setCantidadIncorrectas(cantidadIncorrectas + 1)

  const finalizarJuego = async () => {
    setGameStatus("finished")
    queryClient.invalidateQueries({ queryKey: ["who-was-it-game", difficultyLevel] })
    // await generateProgressRequest({ correct: cantidadCorrectas, incorrect: cantidadIncorrectas, level: difficultyLevel, type: "who_was_it" })
  }

  const { data: ejercicios, isPending, error, refetch } = useQuery({
    queryKey: ["who-was-it-game", difficultyLevel],
    // queryFn: () => generateGameRequest({ difficulty: difficultyLevel, game_number: 2, number_excercises: 5 }),
    queryFn: () => fakeGameRequest(),
    enabled: false
  })
  console.log(ejercicios)

  if (error) {
    return (
      <div className='col-span-full flex justify-center items-center'>
        <h1 className='p-12 bg-white w-full text-center text-2xl'>
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
        <div className='bg-[#3B1F83] rounded-lg flex flex-col md:flex-row gap-8 px-4 py-8 w-full min-h-[450px] lg:w-[1200px] lg:h-[750px] md:w-[800px] md:h-[500px] justify-center items-center md:items-stretch md:justify-around'>
          {gameStatus === "unstarted" &&
            <>
              <img
                src="https://images.pexels.com/photos/5258145/pexels-photo-5258145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Game Image"
                className="hidden md:block rounded-lg"
              />
              <div className='flex flex-col items-center justify-around gap-8'>
                <div></div>
                <h1 className='font-extrabold font-title text-4xl text-white text-balance text-center '>¿QUIÉN FUE?</h1>
                <div></div>
                <p
                  className='text-white text-2xl text-balance text-center'
                >Lee la historia con atención y selecciona la persona correcta que realizó la acción indicada en la pregunta</p>
                <p
                  className='text-white text-3xl text-balance text-center'
                >Selecciona la <strong>DIFICULTAD</strong></p>
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
                <WhoWasItGameScreen
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
          {gameStatus === "finished" &&
            <div
              className='flex flex-col justify-center gap-8 py-8'
            >
              <h1 className="font-extrabold text-2xl  md:text-7xl text-white text-balance text-center">
                HAS FINALIZADO
              </h1>
              <div className='hidden md:block'></div>
              <div></div>
              <h3 className="font-extrabold text-lg md:text-5xl text-green-500 text-balance text-center">
                RESPUESTAS CORRECTAS
              </h3>
              <h4 className="font-extrabold text-2xl  md:text-7xl text-white text-balance text-center">
                {cantidadCorrectas} / {ejercicios && ejercicios.length}
              </h4>
              <div></div>
              <h3 className="font-extrabold text-lg md:text-5xl text-red-500 text-balance text-center">
                RESPUESTAS INCORRECTAS
              </h3>
              <h4 className="font-extrabold text-2xl  md:text-7xl text-white text-balance text-center">
                {cantidadIncorrectas} / {ejercicios && ejercicios.length}
              </h4>
              <Button asChild
                size={'lg'}
                className='text-xl font-bold'
                disabled={isPending}
                onClick={() => setGameStatus("unstarted")}
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
