import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse, LoginUserOptions } from '@/api/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_BACKEND_URL;


export const Route = createFileRoute('/_auth/login')({
  component: LogIn,
});

const loginUser = async ({email,password}:LoginUserOptions):Promise<LoginResponse> => {
  const res = await fetch(`${baseURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  });
  const data = await res.json();
  return data;
};

function LogIn() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (value: LoginUserOptions) => {
      const res = await loginUser(value)
      return res
    },
  })
  
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      password: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const { access_token } = await mutation.mutateAsync(value)
        form.reset();
        Cookies.set('access_token', access_token)
        navigate({ to: "/dashboard" });
      } catch (error) {
        console.log(error)
        alert("Invalid username or password")
      }
  
    },
  });

  return (
    <div>
      <div className="flex w-full gap-12">

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <h2 className="text-center text-1xl mb-2 font-bold text-white">
            Ingresá tus datos para comenzar a aprender
          </h2>

          {/* Email Field */}
          <form.Field
            name="email"
            validators={{
              onChange: z.string().email(),
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Email: </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`border ${field.state.meta.isTouched && field.state.meta.errors.length
                    ? 'border-red-500'
                    : 'border-gray-300'
                    }`}
                />

                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <span className="text-sm text-red-500 block ">
                    {field.state.meta.errors.join(", ")}
                  </span>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          />

          {/* Password Field */}
          <form.Field
            name="password"
            validators={{
              onChange: z
                .string()
                .min(8, { message: "Tener al menos 8 caracteres" })
                .max(50, { message: "Tener menos de 50 caracteres" }),
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Contraseña: </Label>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`border ${field.state.meta.isTouched && field.state.meta.errors.length
                    ? 'border-red-500'
                    : 'border-gray-300'
                    }`}
                />

                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <span className="text-sm text-red-500 block ">
                    {field.state.meta.errors.join(", ")}
                  </span>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="font-bold">
                {isSubmitting ? '...' : 'Ingresar'}
              </Button>
            )}
          />
        </form>
      </div>

      <div className='div flex justify-center items-center mt-4 '>
        <p className="text-white">
          No tenes cuenta?
        </p>

        <Button asChild size="lg" variant="link" className="font-bold text-1xl">
          <Link to="/signup">Registrate</Link>
        </Button>
      </div>
    </div>
  );
}
