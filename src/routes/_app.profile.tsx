import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'


export const Route = createFileRoute('/_app/profile')({
  component: Profile,
})



function Profile() {
  return (
    <div className='col-span-full flex flex-col gap-24'>
      <div></div>
      <div>
        <Button asChild variant={'link'}>
        <Link to='/dashboard' className='text-red-400'>
          VOLVER
        </Link>

        </Button>
      </div>
      <div>
        <p>Profile</p>
      </div>
    </div>


  )
}