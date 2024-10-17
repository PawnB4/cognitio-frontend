import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'


export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})



function Dashboard() {

  return (
    <div className='flex flex-col gap-14 w-96'>
      <h1>Dashboard</h1>
      <Button asChild size={'lg'} className="font-bold text-md md:text-xl">
          <Link to="/profile">Perfil</Link>
        </Button>
    </div>

  )
}