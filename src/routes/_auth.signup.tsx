import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { CircleUser, Pencil } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/signup')({
  component: SignUp,
})


function SignUp() {

  const navigate = useNavigate({ from: "/dashboard" })

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },

    onSubmit: async ({ value }) => {
      // TODO sign up the user
      // if (!res.ok) {
      //   throw new Error("server error")
      // }
      // form.reset();
      // const data = await res.json()
      // console.log("Data from server: ", data)
      console.log(value)
      navigate({ to: "/profile" })
    },
  })

  return (
    <div>
      <div className='flex w-full gap-12'>
        <div className='flex flex-col gap-6 p-8 items-center bg-slate-200 rounded-md'>
          <div></div>
          <p className='font-bold text-3xl text-balance'>Elige tu personaje</p>
          <CircleUser size={100} />
          <Pencil size={30} />
          <div></div>
          <div></div>
          <div></div>
        </div>
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
            name="username"
            validators={{
              onChange: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(20, { message: "Username must be no longer than 20 characters" }),
            }}
            children={(field) => {
              return (
                <>
                  <Label htmlFor={field.name}>Nombre de usuario: </Label>
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
                {isSubmitting ? '...' : 'Registrar'}
              </Button>
            )}
          />
        </form>

      </div>
      <span className="">
        Ya tienes cuenta?
        <Button asChild size={'lg'} variant="link">
          <Link to="/login">Iniciar sesión</Link>
        </Button>
      </span>
    </div>
  )
}