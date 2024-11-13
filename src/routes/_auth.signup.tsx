import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { CircleUser, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { SignupUserOptions, SignupUserResponse } from "@/api/types";
import { useState } from "react";
import CharacterSelectionRegister from "@/components/CharacterSelectionRegister";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const Route = createFileRoute("/_auth/signup")({
  component: SignUp,
});

const signupUser = async ({
  username,
  email,
  image_url,
  password,
}: SignupUserOptions): Promise<SignupUserResponse> => {
  const res = await fetch(`${baseURL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      image_url,
      password,
    }),
  });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

function SignUp() {
  const navigate = useNavigate({ from: "/dashboard" });
  const [selectedCharacter, setSelectedCharacter] = useState("");

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: "",
      email: "",
      image_url: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      try {
        const data = await signupUser({
          username: value.username,
          email: value.email,
          image_url: value.image_url,
          password: value.password,
        });

        form.reset();
        setSelectedCharacter("");

        console.log("Data from server: ", data);

        navigate({ to: "/login" });
      } catch (error) {
        console.log(error);
        alert("Completa todos los campos y el formato que solicita");
      }
    },
  });

  const handleCharacterSelect = (imageUrl: string) => {
    setSelectedCharacter(imageUrl);
    form.setFieldValue("image_url", imageUrl);
  };

  return (
    <div>
      <div className="flex w-full gap-2 p-0 m-0">
        <div className="flex flex-col gap-2 p-2 items-center bg-slate-200 rounded-md sign-up-container">
          <p className="text-2xl text-balance">Elige tu personaje</p>
          <CharacterSelectionRegister
            onSelect={handleCharacterSelect}
            currentCharacter={selectedCharacter}
          />
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            validators={{
              onChange: z.string().email(),
            }}
            children={(field) => {
              return (
                <>
                  <form.Field
                    name="username"
                    validators={{
                      onChange: z
                        .string()
                        .min(3, { message: "Tener al menos 3 caracteres" })
                        .max(20, { message: "Tener menos de 20 caracteres" }),
                    }}
                    children={(field) => {
                      return (
                        <>
                          <Label className="p-0 m-0" htmlFor={field.name}>
                            Usuario:{" "}
                          </Label>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`"pl-12 rounded-md border border-gray-300 ${
                              field.state.meta.isTouched &&
                              field.state.meta.errors.length
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />

                          {field.state.meta.isTouched &&
                          field.state.meta.errors.length ? (
                            <span className="text-sm text-red-500 block p-0 m-0">
                              {field.state.meta.errors.join(", ")}
                            </span>
                          ) : null}
                          {field.state.meta.isValidating
                            ? "Validating..."
                            : null}
                        </>
                      );
                    }}
                  />
                  <Label className="p-0 m-0" htmlFor={field.name}>
                    Email:{" "}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`border ${
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <span className="text-sm text-red-500 block p-0 m-0">
                      {field.state.meta.errors.join(", ")}
                    </span>
                  ) : null}
                  {field.state.meta.isValidating ? "Validating..." : null}
                </>
              );
            }}
          />
          <form.Field
            name="password"
            validators={{
              onChange: z
                .string()
                .min(8, { message: "Tener al menos 8 caracteres" })
                .max(50, { message: "No tener mas de 50 caracteres" }),
            }}
            children={(field) => {
              return (
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
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <span className="text-sm text-red-500 block p-0 m-0">
                      {field.state.meta.errors.join(", ")}
                    </span>
                  ) : null}
                  {field.state.meta.isValidating ? "Validating..." : null}
                </>
              );
            }}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Registrar"}
              </Button>
            )}
          />
        </form>
      </div>
      <span className="">
        Ya tenes cuenta?
        <Button asChild size={"lg"} variant="link">
          <Link to="/login">Iniciar sesión</Link>
        </Button>
      </span>
    </div>
  );
}
