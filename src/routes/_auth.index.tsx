import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { LandingCarousel } from '@/components/LandingCarousel'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  component: Index,
})

function Index() {
  return (
    <div className='md:w-2/3 flex flex-col gap-6 md:gap-6'>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Button asChild size={'lg'} className="font-bold text-md md:text-xl">
          <Link to="/dashboard">JUGAR</Link>
          {/* <ChevronRight /> */}
        </Button>
        <Button asChild size={'lg'} className="font-bold text-md md:text-xl">
          <Link to="/signup">REGISTRARSE</Link>
          {/* <ChevronRight /> */}
        </Button>
      </div>
      <div className='hidden md:block'></div>
      <LandingCarousel />
    </div>
  )
}
