import { NavbarAvatar } from '@/components/NavbarAvatar'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link, Outlet, redirect, useNavigate } from '@tanstack/react-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Cookies from 'js-cookie'
import { useQueryClient } from '@tanstack/react-query'
import { SignupUserResponse } from '@/api/types'

const baseURL = import.meta.env.VITE_BACKEND_URL;


const getUser = async ():Promise<SignupUserResponse> => {
  const accessToken = await Cookies.get("access_token")
  const res = await fetch(`${baseURL}/user/token/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "bearer-token": `${accessToken}`
    },
  });
  if(!res.ok){
    throw new Error
  }
  const data = await res.json();
  return data;
};

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    try {
      const user = await queryClient.fetchQuery({ queryKey: ["get-current-user"], queryFn: () => getUser(), staleTime: Infinity })
      console.log("user middleware: ", user)
      return { user }
    } catch (e) {
      console.log("Error: ",e)
      throw redirect({ to: "/login", replace: true })
    }
  },
  component: AppLayout,
})


function AppLayout() {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const logout = async () => {
      await Cookies.remove("access_token")
      await queryClient.invalidateQueries({
          queryKey: ['get-current-user'],
      })
      navigate({ to: "/login" })
  }
  return (
    <>
      <nav className="bg-secondary flex py-4 px-4 md:px-8 items-center justify-between">
        <Link to='/dashboard' className='flex gap-4 justify-center items-center' >
          <img
            src="https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728360182/khjw9l4n7s1ouvlva56u.png"
            alt="Astronaut"
            className='w-10 md:w-[80px]'
          />
          <h1
            className="text-4xl font-title font-bold tracking-wide text-secondary-foreground hidden md:block"
          >
            Cognitio
          </h1>
        </Link>
        <Button variant={'link'} className='hidden md:block text-secondary-foreground text-xl' onClick={logout}>
          Cerrar sesión
        </Button>
        <NavbarAvatar />
      </nav>
      <div className="grid main-bg flex-grow">
        <Outlet />
      </div>
    </>
  )
}
