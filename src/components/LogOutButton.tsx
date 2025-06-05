"use client";
import React from "react";
import { useActionState, useEffect } from "react";
import { logOutUser } from "@/actions/auth.action";
import { toast } from "sonner";
import { userAgent } from "next/server";

const LogOutButton = () => {
  const initialState = {
    success: false,
    message: "",
  };
  const [state, formAction, isPending] = useActionState(
    logOutUser,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Logout success");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
};

export default LogOutButton;
