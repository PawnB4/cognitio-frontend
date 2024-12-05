/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleArrowLeft } from 'lucide-react';
//@ts-ignore
import Cookies from "js-cookie";
import { SpinningIndicator } from '@/components/SpinningIndicator';
import { useQuery } from '@tanstack/react-query';
import { Separator } from '@radix-ui/react-separator';

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

  const { data: estadisticas, isPending, error } = useQuery({
    queryKey: ["progress"],
    queryFn: () => getProgress(),
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
    <div className="col-span-full flex flex-col uppercase">
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
            VOLVER
          </span>
        </Link>
      </div>

      <div className="flex justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-7xl mt-6 progress-bg mb-9">
          <div className='flex flex-col justify-center items-center sm:flex-row pb-4 gap-2'>
            <div className='sm:w-[80%] sm:pl-8 flex flex-col justify-center gap-2 sm:gap-10'>
              <h1 className='text-4xl font-title font-bold text-center sm:text-left'>PROGRESO</h1>
              <h3 className='text-balance text-2xl text-center sm:text-left'>¡Mirá cómo te está yendo en cada juego!</h3>

            </div>
            <img
              src={"/trophy-svgrepo-com.svg"}
              alt="Trophy"
              className='object-cover w-[100px] sm:w-[200px] -order-1 sm:order-1'
            />
          </div>
          {isPending ? (
            <div className='w-full h-[340px] relative flex justify-center items-center '>
              <SpinningIndicator size={20} bgColor='#162535' />
            </div>
          ) : (
            <div className='flex flex-col gap-6'>
              {/* Lee y concluye */}
              <div className='bg-gray-200 flex gap-4 rounded-lg'>
                <img
                  src={"https://res.cloudinary.com/dr4iesryu/image/upload/v1731502128/Dise%C3%B1o_sin_t%C3%ADtulo_1_ceqx2d.svg"}
                  alt="Game Image"
                  className='object-cover hidden sm:block'
                />
                <div className='p-3 w-full flex flex-col gap-3'>
                  <h2 className='font-title font-bold text-3xl text-balance text-center sm:text-left'>Lee y Concluye</h2>
                  <Separator className="w-full bg-secondary h-[1.8px]" />
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 1)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 1)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 1)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-green-400 text-black text-center font-bold text-xl'>FACIL</h3>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 2)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 2)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 2)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-yellow-400 text-black text-center font-bold text-xl'>MEDIO</h3>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 3)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 3)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Lee y Concluye" && item.level === 3)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-red-400 text-black text-center font-bold text-xl'>DIFICIL</h3>
                    </div>
                  </div>
                </div>
              </div>
              {/* Contrarios y Compañeros */}
              <div className='bg-gray-200 flex gap-4 rounded-lg'>
                <img
                  src={"https://res.cloudinary.com/dr4iesryu/image/upload/v1731502189/Designer_4_1_pyyioc.svg"}
                  alt="Game Image"
                  className='object-cover hidden sm:block'
                />
                <div className='p-3 w-full flex flex-col gap-3'>
                  <h2 className='font-title font-bold text-3xl text-balance text-center sm:text-left'>Contrarios y Compañeros</h2>
                  <Separator className="w-full bg-secondary h-[1.8px]" />
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 1)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 1)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 1)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-green-400 text-black text-center font-bold text-xl'>FACIL</h3>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 2)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 2)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 2)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-yellow-400 text-black text-center font-bold text-xl'>MEDIO</h3>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 3)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 3)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "Contrarios y Compañeros" && item.level === 3)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-red-400 text-black text-center font-bold text-xl'>DIFICIL</h3>
                    </div>
                  </div>
                </div>
              </div>
              {/* ¿Quién fue? */}
              <div className='bg-gray-200 flex gap-4 rounded-lg'>
                <img
                  src={"https://res.cloudinary.com/dr4iesryu/image/upload/v1731502480/Designer_3_1_2_v2yfyo.svg"}
                  alt="Game Image"
                  className='object-cover hidden sm:block'
                />
                <div className='p-3 w-full flex flex-col gap-3'>
                  <h2 className='font-title font-bold text-3xl text-balance text-center sm:text-left'>¿Quién fue?</h2>
                  <Separator className="w-full bg-secondary h-[1.8px]" />
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 1)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 1)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 1)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-green-400 text-black text-center font-bold text-xl'>FACIL</h3>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 2)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 2)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 2)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-yellow-400 text-black text-center font-bold text-xl'>MEDIO</h3>
                    </div>
                    <div className='flex flex-col gap-2 bg-white rounded shadow-md'>
                      <div className='grid grid-cols-2 gap-y-2 justify-items-center items-center p-2'>
                        <h3 className='font-semibold text-lg text-center '>Veces jugado</h3>
                        <h3 className='font-semibold text-lg text-center '>Respuestas correctas</h3>
                        {/* @ts-ignore */}
                        <p className='font-semibold text-2xl text-center '>{estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 3)?.total / 5 || 0}</p>
                        <ProgressRing
                          percentage={calculatePercentage(
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 3)?.total || 0,
                            //@ts-ignore
                            estadisticas.find((item) => item.type === "¿Quién fue?" && item.level === 3)?.correct || 0
                          )}
                        />
                      </div>
                      <h3 className='bg-red-400 text-black text-center font-bold text-xl'>DIFICIL</h3>
                    </div>
                  </div>
                </div>
              </div>

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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-black bg-oran"
      >
        {percentage}%
      </div>
    </div>
  );
};