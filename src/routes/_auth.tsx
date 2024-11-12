import { Separator } from '@/components/ui/separator'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  const {user} = Route.useRouteContext();
  const navigate = useNavigate()
  if (user) {
    navigate({ to: "/dashboard" })
  }
  return (
    <main className="flex justify-center gap-40 min-h-screen px-6 py-12 md:p-0 main-bg">
      <div className="flex flex-col gap-4 md:gap-6 md:mt-14 md:w-1/2 items-center">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center">
          <img
            src="https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728360182/khjw9l4n7s1ouvlva56u.png"
            alt="Astronaut"
            className="w-[100px] md:order-2"
          />
          <h1 className="text-6xl md:text-6xl font-title font-bold tracking-wide text-white">
            Cognitio
          </h1>
        </div>
        <Separator className="w-[60%] h-[1.8px]" />
        <div></div>
        <Outlet />
      </div>
    </main>
  )
}
