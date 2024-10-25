
import { useState, useMemo, useEffect } from "react";
import { CircleCheck, CircleX } from "lucide-react";


type Ejercicio = {
  palabra: string;
  sinonimos: string[];
  antonimos: string[];
};

type SynAntGameScreenProps = {
  ejercicios: Ejercicio[];
  incrementarCorrectas: () => void;
  incrementarIncorrectas: () => void;
  finalizarJuego: () => void;
};

type EjercicioStatus = "win" | "loose" | "inProgress"

export function SynAntGameScreen({ ejercicios, incrementarCorrectas, incrementarIncorrectas, finalizarJuego }: SynAntGameScreenProps) {
  const [ejercicioCounter, setEjercicioCounter] = useState(0);
  const [correctasCounter, setCorrectasCounter] = useState(0);
  const [ejercicioFlag, setEjercicioFlag] = useState<EjercicioStatus>("inProgress");
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [opciones, setOpciones] = useState<string[]>([]);

  // Determinar de forma aleatoria si se deben elegir sinónimos o antónimos
  const randomBoolean = useMemo(() => Math.random() < 0.5, [ejercicioCounter]);

  const ejercicioActual = ejercicios[ejercicioCounter];

  // Seleccionar de forma aleatoria entre 1 y 3 opciones correctas
  const numCorrectas = useMemo(() => Math.floor(Math.random() * 3) + 1, [ejercicioCounter]);

  // Obtener las opciones correctas e incorrectas para mostrar
  const opcionesCorrectas = ejercicioActual.sinonimos.slice(0, numCorrectas);
  const opcionesIncorrectas = ejercicioActual.antonimos.slice(0, 4 - numCorrectas);

  // Combinar y mezclar las opciones solo al inicio de cada nivel
  useEffect(() => {
    const mezcladas = [...opcionesCorrectas, ...opcionesIncorrectas].sort(() => Math.random() - 0.5);
    setOpciones(mezcladas);
    setSeleccionadas([]); // Reiniciar las seleccionadas al cambiar de ejercicio
    setCorrectasCounter(0); // Reiniciar el contador de correctas al cambiar de ejercicio
  }, [ejercicioCounter]);

  useEffect(() => {
    if (ejercicioFlag === "inProgress") return;
    const feedbackScreenDisplay = async () => {
      await new Promise((r) => setTimeout(r, 1250))
      if (ejercicioCounter === ejercicios.length -1) {
        finalizarJuego()
      } else {
        setEjercicioCounter((prev) => prev + 1);
        setEjercicioFlag("inProgress")
      }
    }
    feedbackScreenDisplay()
  }, [ejercicioFlag])

  const handleOptionClick = (opcion: string) => {
    // Si la opción ya ha sido seleccionada, no hacer nada
    if (seleccionadas.includes(opcion)) return;

    // Marcar la opción como seleccionada
    setSeleccionadas((prev) => [...prev, opcion]);

    const esIncorrecta = randomBoolean ? opcionesIncorrectas.includes(opcion) : !opcionesIncorrectas.includes(opcion);

    const cantidadOpciones = randomBoolean ? opcionesCorrectas.length : opcionesIncorrectas.length

    if (esIncorrecta) {
      incrementarIncorrectas()
      setEjercicioFlag("loose")
    } else {
      const newCorrectasCounter = correctasCounter + 1;
      setCorrectasCounter(newCorrectasCounter);

      if (newCorrectasCounter === cantidadOpciones) {
        incrementarCorrectas()
        setEjercicioFlag("win")
      }
    }
  };

  if (ejercicioFlag === "inProgress") {

    return (
      <div className="flex relative justify-around items-center flex-col md:w-3/4 gap-4">
        <span
          className="md:absolute top-0 right-0 text-md md:text-2xl text-white font-bold pt-2"
        >
          {ejercicioCounter + 1} / {ejercicios.length}
        </span>
        <h1 className="font-extrabold font-title text-4xl md:text-7xl text-white text-balance text-center">
          {ejercicioActual.palabra.toUpperCase()}
        </h1>
        {/* Mostrar el mensaje de sinónimos o antónimos */}
        {randomBoolean ? (
          <h2 className="w-full text-center py-4 px-2 md:p-4 bg-[#2F00FF] text-white text-xl md:text-3xl rounded-2xl">
            Elige los <strong>sinónimos</strong> (compañeros)
          </h2>
        ) : (
          <h2 className="w-full text-center py-4 px-2 md:p-4 bg-[#FD3C4F] text-white text-xl md:text-3xl rounded-2xl">
            Elige los <strong>antónimos</strong> (contrarios)
          </h2>
        )}

        {/* Renderizar las opciones de forma aleatoria */}
        <div className="w-full flex flex-col gap-4">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(opcion)}
              disabled={seleccionadas.includes(opcion)} // Deshabilitar si ya fue seleccionada
              className={`w-full text-center py-4 px-2 md:p-4 text-white text-2xl md:text-3xl rounded-2xl ${seleccionadas.includes(opcion) ? 'bg-green-400' : 'bg-[#7960EA]'
                }`}
            >
              {opcion.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (ejercicioFlag === "win") {
    return (
      <div className="flex justify-center items-center flex-col w-3/4 gap-4">
          <CircleCheck  className="w-[200px] h-[200px]  md:w-[450px] md:h-[450px]" stroke="white" strokeWidth={0.5} fill="#4ade80 " />
        <h1 className="font-extrabold font-title text-3xl md:text-7xl text-white text-balance text-center">
          ¡CORRECTO!
        </h1>
      </div>
    )
  }
  if (ejercicioFlag === "loose") {
    return (
      <div className="flex justify-center items-center flex-col w-3/4 gap-4">
        <div>
          <CircleX className="w-[200px] h-[200px]  md:w-[450px] md:h-[450px]" stroke="white" strokeWidth={0.5} fill="#d80707 " />
        </div>
        <h1 className="font-extrabold font-title text-3xl md:text-7xl text-white text-balance text-center">
          ¡INCORRECTO!
        </h1>
      </div>
    )
  }
}

