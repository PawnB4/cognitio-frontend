
import { useState, useEffect } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { WhoWasItExercise } from "@/api/types";
import { Button } from "./ui/button";


type WhoWasItGameScreenProps = {
  ejercicios: WhoWasItExercise[];
  incrementarCorrectas: () => void;
  incrementarIncorrectas: () => void;
  finalizarJuego: () => void;
};

type EjercicioStatus = "win" | "loose" | "inProgress"

export function WhoWasItGameScreen({ ejercicios, incrementarCorrectas, incrementarIncorrectas, finalizarJuego }: WhoWasItGameScreenProps) {
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
    if (ejercicioFlag !== "win") return;
    const feedbackScreenDisplay = async () => {
      await new Promise((r) => setTimeout(r, 2000))
      if (ejercicioCounter === ejercicios.length - 1) {
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
      <div className="flex relative justify-around items-center flex-col w-full py-2 gap-3 md:gap-6">
        <span
          className="md:absolute -top-6 -right-5 bg-green-300 rounded-sm px-2 py-0.5 text-black font-bold"
        >
          {ejercicioCounter + 1} / {ejercicios.length}
        </span>
        <h1 className="font-bold text-xl  text-white text-balance md:text-center md:pt-2">
          {ejercicioActual.texto.toUpperCase()}
        </h1>
        <h2 className="font-extrabold w-full font-title 
        rounded-xl py-2 text-2xl md:text-3xl text-white text-balance text-center bg-[#9C34C2]">
          {ejercicioActual.pregunta.toUpperCase()}
        </h2>

        {/* Renderizar las opciones de forma aleatoria */}
        <div className="w-full flex flex-col gap-3">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(opcion)}
              className={`w-full text-center p-2 md:p-4 text-white text-lg text-balance rounded-2xl bg-[#7960EA]`}>
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
      <div className="flex justify-center items-center flex-col md:w-3/4 gap-4">
        <div>
          <CircleX className="w-[100px] h-[100px]  md:w-[250px] md:h-[250px]" stroke="white" strokeWidth={0.5} fill="#d80707 " />
        </div>
        <h1 className="font-extrabold font-title text-3xl md:text-5xl text-white text-balance text-center">
          ¡INCORRECTO!
        </h1>
        <div></div>
        <div></div>
        <h1 className="font-extrabold font-title text-3xl md:text-3xl text-white text-balance text-center">
          RESPUESTA CORRECTA:
        </h1>
        {
          opcionesCorrectas.map((opcion,index) => {
            return (
              <p 
              key={index}
              className="w-full font-bold text-center py-4 px-2 md:p-4 text-black text-2xl md:text-3xl rounded-2xl bg-green-400">
                {opcion.toUpperCase()}
              </p>
            )
          })
        }
        <div></div>
        <Button
          size={'lg'}
          className='w-full md:w-3/4 text-xl font-bold'
          onClick={() => {
            if (ejercicioCounter === ejercicios.length - 1) {
              finalizarJuego()
            } else {
              setEjercicioCounter((prev) => prev + 1);
              setEjercicioFlag("inProgress")
            }
          }}
        >CONTINUAR</Button>
      </div>
    )
  }
}

