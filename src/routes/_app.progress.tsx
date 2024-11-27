/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleArrowLeft } from 'lucide-react';
//@ts-ignore
import Cookies from "js-cookie";
import { SpinningIndicator } from '@/components/SpinningIndicator';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_app/progress')({
  component: Progress,
})

const baseURL = import.meta.env.VITE_BACKEND_URL;

const getProgress = async () => {
  const accessToken = await Cookies.get("access_token");
  const res = await fetch(`${baseURL}/progress/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "bearer-token": `${accessToken}`,
    },
  });
  if (res.status !== 404 && !res.ok) {
    throw new Error
  }
  const data = await res.json();
  return data;
};

function calculatePercentage(total: number, correct: number) {
  if (total === 0) return 0;
  const percentage = (correct / total) * 100;
  return percentage % 1 === 0
    ? percentage
    : Number(percentage.toFixed(1));
}


function Progress() {
  const { user } = Route.useRouteContext();
  const avatarUrl = user?.image_url;

  const { data: estadisticas, isPending, error } = useQuery({
    queryKey: ["progress"],
    queryFn: () => getProgress(),
  })

  console.log(estadisticas)

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
    <div className="col-span-full flex flex-col ">
      <div className="w-11/12 mx-auto mt-12 hidden md:block">
        <Link
          to="/dashboard"
          className="flex select-none items-center gap-4 cursor-pointer group"
        >
          <CircleArrowLeft
            fill="#4ABC96"
            stroke="white"
            size={60}
            strokeWidth={1}
            className="group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-bold text-white tracking-wide">
            Volver
          </span>
        </Link>
      </div>

      <div className="flex justify-center px-4">

        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mt-6 sm:flex">
          {/* Avatar y Título */}
          <div className="flex flex-col items-center mb-6 gap-3 justify-center">
            <img
              src={avatarUrl} // Muestra la imagen del usuario o una imagen por defecto
              alt="Avatar"
              className="w-24 h-2w-24 rounded-full"
            />
            <h2 className="text-3xl font-bold text-gray-800 bg">Mi progreso</h2>
            <h1 className='text-center text-balance'>Acá podés consultar tu porcentaje de respuestas correctas para cada juego</h1>
          </div>


          {isPending ? (
            <div className='w-full h-[340px] relative flex justify-center items-center '>
              <SpinningIndicator size={20} bgColor='#162535' />
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-3 justify-items-center'>
              <h1 className='font-title font-bold text-xl'>Juego</h1>
              <h1 className='font-title font-bold text-xl'>Estadísticas</h1>
              <p className='self-center text-center text-balance'>Lee y Concluye</p>
              <ProgressRing
                percentage={calculatePercentage(
                  //@ts-ignore
                  estadisticas.find((item) => item.type === "Lee y Concluye")?.total || 0,
                  //@ts-ignore
                  estadisticas.find((item) => item.type === "Lee y Concluye")?.correct || 0
                )}
              />

              <p className='self-center text-center text-balance'>Contrarios y Compañeros</p>
              <ProgressRing
                percentage={calculatePercentage(
                  //@ts-ignore
                  estadisticas.find((item) => item.type === "Contrarios y Compañeros")?.total || 0,
                  //@ts-ignore
                  estadisticas.find((item) => item.type === "Contrarios y Compañeros")?.correct || 0
                )}
              />

              <p className='self-center text-center text-balance'>¿Quién fue?</p>
              <ProgressRing
                percentage={calculatePercentage(
                  //@ts-ignore
                  estadisticas.find((item) => item.type === "¿Quién fue?")?.total || 0,
                  //@ts-ignore
                  estadisticas.find((item) => item.type === "¿Quién fue?")?.correct || 0
                )}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  )
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const ProgressRing = ({ percentage, size = 80 }) => {
  // Determine color based on percentage
  const getColor = () => {
    if (percentage === 100) return 'stroke-green-500';
    if (percentage < 25) return 'stroke-red-500';
    if (percentage < 75) return 'stroke-orange-300';
    return 'stroke-green-500';
  };

  // Calculate stroke dash offset
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="10"
          className="stroke-gray-200"
        />

        {/* Progress ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth="10"
          className={`${getColor()} transition-all duration-500 ease-in-out`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Percentage text */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-black bg-oran"
      >
        {percentage}%
      </div>
    </div>
  );
};