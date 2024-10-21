import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {z} from 'zod'


export const Route = createFileRoute('/_auth/login')({
  component: LogIn,
})

function LogIn() {

  const navigate = useNavigate({ from: "/dashboard" })

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      password: '',
      email: '',
    },
  
    onSubmit: async ({ value }) => {
      // TODO API call to Log in
      // if (!res.ok) {
      //   alert("Invalid username or password")
      // }
      // form.reset();
      // const data = await res.json()
      // console.log("Data from server: ", data)
      console.log(value)
      navigate({to:"/profile"})
    },
  })

  return (
    <div>
      <div className='flex w-full gap-12'>
        <form
          className='flex flex-col gap-5'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >

          <form.Field
            name="email"
            validators={{
              onChange: z.string().email()
            }}
            children={(field) => {
              return (
                <>
                  <Label htmlFor={field.name}>Dirección de correo electrónico: </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                  {field.state.meta.isValidating ? 'Validating...' : null}
                </>
              )
            }}
          />
          <form.Field
            name="password"
            validators={{
              onChange: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50, { message: "Password must be no longer than 50 characters" })
            }}
            children={(field) => {
              return (
                <>
                  <Label htmlFor={field.name}>Contraseña: </Label>
                  <Input
                    type='password'
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <em>{field.state.meta.errors.join(", ")}</em>
                  ) : null}
                  {field.state.meta.isValidating ? 'Validating...' : null}
                </>
              )
            }}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Iniciar sesión'}
              </Button>
            )}
          />
        </form>

      </div>
      <span className="">
        No tienes cuenta?
        <Button asChild size={'lg'} variant="link">
          <Link to="/signup">Registrate</Link>
        </Button>
      </span>
    </div>
  )
}
