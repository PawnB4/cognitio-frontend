import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SpinningIndicator } from '@/components/SpinningIndicator'
import { ReadAndConcludeGameScreen } from '@/components/ReadAndConcludeGameScreen'
import { Exercise, ReadAndConcludeExercise } from '@/api/types'
import { ApiError } from '@/api/client'

export const Route = createFileRoute('/_app/game/read-and-conclude')({
  component: ReadAndConcludeGame,
})

type GameStatus = 'unstarted' | 'inProgress' | 'finished'

const dificultades = ['facil', 'medio', 'dificil']

const preguntas = [
  {
    texto:
      'El reciclaje es un proceso que ayuda a convertir materiales usados en nuevos productos. Esto es importante para reducir la cantidad de basura que se acumula en vertederos y para ahorrar energía. Reciclar también disminuye la necesidad de extraer nuevas materias primas, como el metal o la madera, lo que ayuda a proteger los recursos naturales. Muchas personas separan el papel, el vidrio y el plástico en sus casas para que sean reciclados, y algunas ciudades tienen programas especiales para recoger estos materiales y llevarlos a plantas de reciclaje.',
    pregunta: '¿Por qué es importante reciclar?',
    opciones_correctas: [
      'Porque reduce la basura y protege los recursos naturales',
    ],
    opciones_incorrectas: [
      'Porque permite crear productos nuevos',
      'Porque ayuda a que haya más vertederos',
      'Porque todos lo hacen en sus casas',
    ],
  },
  {
    texto:
      'Las abejas son insectos muy importantes para el medio ambiente porque polinizan las flores. La polinización permite que las plantas produzcan frutos y semillas, lo que ayuda a que las plantas se reproduzcan. Sin las abejas, muchas plantas tendrían dificultades para crecer y dar frutos, lo que afectaría a los animales y a las personas que dependen de ellas para alimentarse.',
    pregunta: '¿Por qué son importantes las abejas?',
    opciones_correctas: [
      'Porque polinizan las flores y ayudan a que las plantas crezcan',
    ],
    opciones_incorrectas: [
      'Porque producen miel',
      'Porque viven en colmenas',
      'Porque vuelan rápido',
    ],
  },
  {
    texto:
      'El agua es un recurso esencial para la vida. Todos los seres vivos necesitan agua para sobrevivir, y sin ella, no podrían vivir. Además, el agua es utilizada para muchas actividades humanas, como la agricultura, la industria y la generación de energía. Cuidar el agua es fundamental, ya que en algunos lugares del mundo hay escasez y no todas las personas tienen acceso a agua limpia.',
    pregunta: '¿Por qué es importante cuidar el agua?',
    opciones_correctas: ['Porque es esencial para la vida'],
    opciones_incorrectas: [
      'Porque se usa para limpiar',
      'Porque se encuentra en ríos y mares',
      'Porque se puede beber',
    ],
  },
  {
    texto:
      'Los deportes son una forma divertida de mantenerse activo y saludable. Hacer ejercicio regularmente ayuda a fortalecer los músculos y el corazón. Además, los deportes también son una oportunidad para socializar y hacer amigos, ya que muchas actividades deportivas se realizan en equipo. Participar en deportes ayuda a desarrollar habilidades como el trabajo en equipo y la disciplina',
    pregunta: '¿Cuál es un beneficio de practicar deportes?',
    opciones_correctas: ['Ayuda a fortalecer los músculos y el corazón'],
    opciones_incorrectas: [
      'Se puede hacer solo',
      'Se puede hacer en cualquier momento del día',
      'Es una actividad difícil',
    ],
  },
  {
    texto:
      'Los árboles son fundamentales para la Tierra. No solo producen oxígeno, que es necesario para respirar, sino que también ofrecen sombra y hogar a muchos animales. Además, los árboles ayudan a reducir la contaminación del aire, ya que absorben dióxido de carbono y liberan oxígeno durante la fotosíntesis. Plantar árboles y cuidarlos es una forma de proteger nuestro planeta.',
    pregunta: '¿Cuál es uno de los beneficios de los árboles?',
    opciones_correctas: [
      'Producen oxígeno y ayudan a reducir la contaminación del aire',
    ],
    opciones_incorrectas: [
      'Crecen muy lentamente',
      'Sirven para construir casas',
      'Se encuentran en bosques y parques',
    ],
  },
]

const fakeGameRequest = async () => {
  return preguntas
}

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
    // await generateProgressRequest({ correct: cantidadCorrectas, incorrect: cantidadIncorrectas, level: difficultyLevel, type: "who_was_it" })
  }

  const { data: ejercicios = [], isPending, error, refetch } = useQuery<Exercise[], ApiError>({
    queryKey: ["syn-ant-game", difficultyLevel],
    // queryFn: () => generateGameRequest({ difficulty: difficultyLevel, game_number: 2, number_excercises: 5 }),
    queryFn: () => fakeGameRequest(),
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
    <div className="col-span-full flex flex-col gap-14">
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
        <div className="bg-[#3B1F83] rounded-lg flex flex-col md:flex-row gap-8 px-4 py-8 
        w-full min-h-[450px] md:w-[800px] md:min-h-[500px] lg:w-[1200px] lg:min-h-[750px]
         justify-center items-center md:items-stretch md:justify-around">
          {gameStatus === 'unstarted' && (
            <>
              <img
                src="https://images.pexels.com/photos/5258145/pexels-photo-5258145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Game Image"
                className="hidden md:block rounded-lg"
              />
              <div className="flex flex-col items-center justify-around gap-8">
                <div></div>
                <h1 className="font-extrabold font-title text-4xl text-white text-balance text-center ">
                  LEE Y CONCLUYE
                </h1>
                <div className='hidden md:block'></div>
                <p className="text-white text-2xl text-balance text-center">
                  Lee la historia con atención y selecciona la persona correcta
                  que realizó la acción indicada en la pregunta.
                </p>
                <p className="text-white text-3xl text-balance text-center">
                  Selecciona la <strong>DIFICULTAD</strong>
                </p>
                <div className="flex w-full justify-evenly gap-2 ">
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
                  className="w-3/4 text-xl font-bold"
                  onClick={() => {
                    // Ejecutar query
                    refetch()
                    setGameStatus('inProgress')
                  }}
                >
                  COMENZAR
                </Button>
                <div></div>
              </div>
            </>
          )}
          {gameStatus === 'inProgress' ? (
            !isPending ? (
              <ReadAndConcludeGameScreen
                ejercicios={ejercicios as ReadAndConcludeExercise[]}
                incrementarCorrectas={incrementarCorrectas}
                incrementarIncorrectas={incrementarIncorrectas}
                finalizarJuego={finalizarJuego}
              />
            ) : (
              <div className="w-full h-full relative flex justify-center items-center ">
                <h1 className="absolute top-0 md:top-10 font-extrabold text-4xl text-white text-balance text-center ">
                  CARGANDO...
                </h1>
                <SpinningIndicator size={20} />
              </div>
            )
          ) : null}
          {gameStatus === 'finished' && (
            <div className="flex flex-col justify-center gap-8 py-8">
              <h1 className="font-extrabold text-2xl  md:text-7xl text-white text-balance text-center">
                HAS FINALIZADO
              </h1>
              <div className="hidden md:block"></div>
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
              <Button
                asChild
                size={'lg'}
                className="text-xl font-bold"
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
