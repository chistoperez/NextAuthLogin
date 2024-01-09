"use client";

import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/functions";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const emailValue = email.current?.value ?? "";
    const passwordValue = password.current?.value ?? "";
    const emailError = validateEmail(emailValue);
    const passwordError = validatePassword(passwordValue);

    if (emailError) {
      setErrors((errors) => [...errors, emailError]);
    }

    if (passwordError) {
      setErrors((errors) => [...errors, passwordError]);
    }

    if (!emailError && !passwordError) {
      const responseNextAuth = await signIn("credentials", {
        email: emailValue,
        password: passwordValue,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
      }

      router.push("/");
    }
  };

  return (
    <section className="px-4 py-2 space-y-4">
      <h1 className=" text-2xl font-bold">Credentials</h1>

      <form
        onSubmit={handleSubmit}
        className="flex-col flex gap-x-4 max-w-sm gap-y-2"
      >
        <h2 className="text-xl font-bold">Email</h2>
        <input
          type="email"
          placeholder="user@email.com"
          name="email"
          className="border border-gray-400 rounded-md px-4 py-2 mb-2"
          ref={email}
        />
        <h2 className="text-xl font-bold">Password</h2>
        <input
          type="password"
          placeholder="password"
          name="password"
          className="border border-gray-400 rounded-md px-4 py-2 mb-2"
          ref={password}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      </form>

      {errors.length > 0 && (
        <div className="mt-2 bg-red-500 text-white p-2 rounded-md  max-w-sm">
          <ul className="mb-0 space-y-2">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
export default LoginPage;
