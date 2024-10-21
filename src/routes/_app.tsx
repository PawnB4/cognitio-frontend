import { NavbarAvatar } from '@/components/NavbarAvatar'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <>
      <nav className="bg-secondary flex py-4 px-4 md:px-8 items-center justify-between">
        <div className='flex gap-4 justify-center items-center'>
          <img
            src="https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728360182/khjw9l4n7s1ouvlva56u.png"
            alt="Astronaut"
            className='w-10 md:w-[80px]'
          />
          <Link to='/dashboard' className="text-4xl font-title font-bold tracking-wide text-secondary-foreground hidden md:block">
            Cognitio
          </Link>
        </div>
        <Button variant={'link'} className='hidden md:block text-secondary-foreground text-xl'>
          Cerrar sesión
        </Button>
        <NavbarAvatar/>
      </nav>
      <div className="grid grid-cols-12 main-bg flex-grow">
        <Outlet />
      </div>
    </>
  )
}
