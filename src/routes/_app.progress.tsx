import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/_app/progress')({
  component: Progress,
})

// Función para obtener el token desde las cookies
function getTokenFromCookie() {
  const cookies = document.cookie;
  const match = cookies.match(/(?:^|;\s*)access_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

type GameType = 'Contrarios y Compañeros' | 'Quién Fue' | 'Lee y Concluye';

const baseURL = import.meta.env.VITE_BACKEND_URL;

// Definir el tipo de la respuesta para cada juego
interface ProgressData {
  type: GameType;
  correct: number;
  incorrect: number;
}

// Estado para manejar el progreso de los juegos
interface ProgressState {
  contrariosYCompañeros: number;
  quienFue: number;
  leeYConcluye: number;
}

function Progress() {
  const { user } = Route.useRouteContext();
  const avatarUrl = user?.image_url;

  // Estado para almacenar los datos de progreso
  const [progress, setProgress] = useState<ProgressState>({
    contrariosYCompañeros: 0,
    quienFue: 0,
    leeYConcluye: 0,
  });

  useEffect(() => {
    // Función para obtener el progreso de todos los juegos en una sola llamada
    const fetchProgress = async () => {
      try {
        const token = getTokenFromCookie();
        if (!token) {
          console.error('Token no encontrado en las cookies.');
          return;
        }

         // Imprimir el token en la consola
        console.log('Token obtenido:', token);

        const res = await fetch(`${baseURL}/progress/`, {
          method: 'GET',
          headers: {
            'bearer-token': token,
          },
        });

        const data = await res.json();


        // Imprimir la respuesta en la consola
        console.log('Respuesta del GET a /progress:', data);



        if (res.ok) {
          // Mapeamos la respuesta para extraer el progreso
          const updatedProgress: ProgressState = data.reduce((acc: ProgressState, { type, correct, incorrect }: ProgressData) => {
            const progress = (correct / (correct + incorrect)) * 100 || 0;
            switch (type) {
              case 'Contrarios y Compañeros':
                acc.contrariosYCompañeros = progress;
                break;
              case 'Quién Fue':
                acc.quienFue = progress;
                break;
              case 'Lee y Concluye':
                acc.leeYConcluye = progress;
                break;
            }
            return acc;
          }, {
            contrariosYCompañeros: 0,
            quienFue: 0,
            leeYConcluye: 0,
          });

          setProgress(updatedProgress);
        } else {
          console.error('Error al obtener el progreso');
        }
      } catch (error) {
        console.error('Error al obtener el progreso:', error);
      }
    };

    fetchProgress();
  }, []);


  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Tarjeta de Progreso */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        {/* Avatar y Título */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={avatarUrl} // Muestra la imagen del usuario o una imagen por defecto
            alt="Avatar"
            className="w-20 h-20 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">Mi progreso</h2>
        </div>

        {/* Tabla de Progreso */}
        <div className="grid grid-cols-3 gap-4 text-center text-gray-700">
          <div className="col-span-2 font-semibold">Estadísticas</div>
          <div className="font-semibold">Logro Alcanzado</div>

        {/* Contrarios y compañeros */}
        <div className="col-span-2 text-gray-600">Contrarios y Compañeros</div>
          <ProgressCircle value={progress.contrariosYCompañeros} />

          {/* Quien fue */}
          <div className="col-span-2 text-gray-600">¿Quién fue?</div>
          <ProgressCircle value={progress.quienFue} />

          {/* ¿Quién Fue? */}
          <div className="col-span-2 text-gray-600">Lee y concluye</div>
          <ProgressCircle value={progress.leeYConcluye} />
        </div>
      </div>
    </div>
  );
}


// Componente de círculo de progreso
function ProgressCircle({ value }: { value: number }) {
  const strokeDashoffset = 126 - (value * 1.26);  // Cálculo para el progreso del círculo
  let color;

  // Definimos los colores en función del valor
  if (value === 0) {
    color = 'text-gray-300';  // Gris para 0%
  } else if (value === 100) {
    color = 'text-green-500'; // Verde para 100%
  } else {
    color = 'text-yellow-500'; // Amarillo para otros valores
  }

  return (
    <div className="relative">
      {/* Círculo gris de fondo */}
      <svg className="w-12 h-12">
        <circle
          cx="24"
          cy="24"
          r="20"
          className="text-gray-300"  // Siempre visible en gris
          strokeWidth="4"
          fill="none"
        />
        {/* Círculo de progreso */}
        <circle
          cx="24"
          cy="24"
          r="20"
          className={color}  // Color dependiendo del valor
          strokeWidth="4"
          strokeDasharray="126"
          strokeDashoffset={strokeDashoffset}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      {/* Texto del porcentaje dentro del círculo */}
      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {Math.round(value)}%
      </span>
    </div>
  );
}




export default Progress;