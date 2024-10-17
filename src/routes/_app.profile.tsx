import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'



export const Route = createFileRoute('/_app/profile')({
  component: Profile,
})

async function getUserProfile() {
  // TODO API call Fetch the user
  // if (!res.ok) {
  //   throw new Error("server error")
  // }
  // const data = await res.json()
  // return data;
}


function Profile() {
  const navigate = useNavigate({ from: "/" })


  // const { isPending, error, data } = useQuery({ queryKey: ["get-user-profile"], queryFn: getUserProfile })

  return (
    <main>
      {/* <div className='p-12'>
        {isPending && <p>Loading...</p>}
        {error && <p>Server error</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div> */}
      <Button onClick={async () => {
        // TODO Log out
        // if (!res.ok) {
        //   throw new Error("server error")
        // }
        // const data = await res.json()
        // console.log(data)
        navigate({ to: "/" })
      }}>
        Cerrar Sesión
      </Button>
    </main>

  )
}