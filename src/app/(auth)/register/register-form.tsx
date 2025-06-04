"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth.action";
import { useActionState, useEffect } from "react";
const RegisterForm = () => {
  const initialState = {
    success: false,
    message: "",
  };
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Registration successful!");
      router.push("/tickets");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Register
        </h1>
        <form action={formAction} className="space-y-4 text-gray-700 ">
          <input
            type="text"
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
          />

          <input
            type="email"
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your email"
            name="email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="password"
            name="password"
            required
            autoComplete="new-password"
          />
          <button
            className="w-full bg-blue-400 text-white p-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
            type="submit"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
