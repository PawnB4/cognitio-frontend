import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/login')({
  component: LogIn,
});

function LogIn() {
  const navigate = useNavigate({ from: "/dashboard" });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      password: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      navigate({ to: "/dashboard" });
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
                  className={`border ${
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />

                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <span className="text-sm text-red-500 block">
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
                  className={`border ${
                    field.state.meta.isTouched && field.state.meta.errors.length
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />

                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <span className="text-sm text-red-500 block">
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

      <span className="text-white">
        No tenes cuenta?
        <Button asChild size="lg" variant="link" className="font-bold text-1xl mb-2">
          <Link to="/signup">Registrate</Link>
        </Button>
      </span>
    </div>
  );
}
