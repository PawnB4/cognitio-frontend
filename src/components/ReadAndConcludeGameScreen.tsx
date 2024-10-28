
import { useState, useEffect } from "react";
import { CircleCheck, CircleX } from "lucide-react";


type Ejercicio = {
  texto: string;
  pregunta: string;
  opciones_correctas: string[];
  opciones_incorrectas: string[];
};

type ReadAndConcludeGameScreenProps = {
  ejercicios: Ejercicio[];
  incrementarCorrectas: () => void;
  incrementarIncorrectas: () => void;
  finalizarJuego: () => void;
};

type EjercicioStatus = "win" | "loose" | "inProgress"

export function ReadAndConcludeGameScreen({ ejercicios, incrementarCorrectas, incrementarIncorrectas, finalizarJuego }: ReadAndConcludeGameScreenProps) {
  const [ejercicioCounter, setEjercicioCounter] = useState(0);
  const [correctasCounter, setCorrectasCounter] = useState(0);
  const [ejercicioFlag, setEjercicioFlag] = useState<EjercicioStatus>("inProgress");
  const [opciones, setOpciones] = useState<string[]>([]);

  const ejercicioActual = ejercicios[ejercicioCounter];

  const opcionesCorrectas = ejercicioActual.opciones_correctas;
  const opcionesIncorrectas = ejercicioActual.opciones_incorrectas;

  useEffect(() => {
    const mezcladas = [...opcionesCorrectas, ...opcionesIncorrectas].sort(() => Math.random() - 0.5);
    setOpciones(mezcladas);
    setCorrectasCounter(0);
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
    if (opcionesIncorrectas.includes(opcion)) {
      incrementarIncorrectas()
      setEjercicioFlag("loose")
    } else {
      const newCorrectasCounter = correctasCounter + 1;
      setCorrectasCounter(newCorrectasCounter);

      if (newCorrectasCounter === opcionesCorrectas.length) {
        incrementarCorrectas()
        setEjercicioFlag("win")
      }
    }
  };

  if (ejercicioFlag === "inProgress") {

    return (
      <div className="flex relative justify-around items-center flex-col md:w-3/4 gap-5">
        <span
          className="md:absolute top-0 -right-12 text-md md:text-2xl text-white font-bold pt-2"
        >
          {ejercicioCounter + 1} / {ejercicios.length}
        </span>
        <h1 className="font-bold text-xl md:text-4xl text-white text-balance text-center">
          {ejercicioActual.texto}
        </h1>
        <div></div>
        <h2 className="font-extrabold w-full font-title 
        rounded-xl py-2 text-2xl md:text-4xl text-white text-balance text-center bg-[#9C34C2]">
          {ejercicioActual.pregunta}
        </h2>
        <div></div>
        {/* Renderizar las opciones de forma aleatoria */}
        <div className="w-full flex flex-col gap-4">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(opcion)}
              className={`w-full text-center p-2 md:p-4 text-white text-lg text-balance rounded-2xl md:text-2xl bg-[#7960EA]`}>
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

