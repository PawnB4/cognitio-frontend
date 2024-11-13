import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react";


export const Route = createFileRoute('/_app/progress')({
  component: Progress,
})


function Progress() {
    // Estado para almacenar la URL de la imagen del avatar
    const [avatarUrl, setAvatarUrl] = useState("");


  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token"); // Asegúrate de que el token esté en localStorage


      if (!token) {
        console.error("No hay token de autenticación");
        return;
      }


      const response = await fetch("/user/token/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Asegúrate de pasar el token en el encabezado
        },
      });


      // Si la respuesta es exitosa, extraemos la URL de la imagen
      if (response.ok) {
        const data = await response.json();
        setAvatarUrl(data.image_url); // Guarda la URL de la imagen en el estado
      } else {
        const errorText = await response.text();
        console.error("Error al obtener los datos del usuario:", errorText); // Muestra el error si no es 200
      }
    } catch (error) {
      console.error("Error de red:", error); // Manejo de errores en la conexión de red
    }
  };
 
    // Llama a la función fetchUserData cuando el componente se monta
    useEffect(() => {
      fetchUserData();
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


          {/* Adiviná la historia */}
          <div className="col-span-2 text-gray-600">
            Adiviná la historia
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg className="w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="text-gray-300"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="text-yellow-500"
                  strokeWidth="4"
                  strokeDasharray="126"
                  strokeDashoffset="39" // 69% logrado
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                69%
              </span>
            </div>
         
          </div>


          {/* Contrarios y compañeros */}
          <div className="col-span-2 text-gray-600">
            Contrarios y compañeros
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg className="w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="text-green-500"
                  strokeWidth="4"
                  fill="none"
                 
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="text-green-500"
                  strokeWidth="4"
                  strokeDasharray="126"
                  strokeDashoffset="0" // 100% logrado
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                100%
              </span>
            </div>
          </div>


          {/* ¿Quién Fue? */}
          <div className="col-span-2 text-gray-600">
            ¿Quién Fue?
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg className="w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="text-gray-300"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="text-yellow-500"
                  strokeWidth="4"
                  strokeDasharray="126"
                  strokeDashoffset="54" // 57% logrado
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                57%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


