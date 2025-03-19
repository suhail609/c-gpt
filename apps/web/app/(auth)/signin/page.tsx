"use client";

import { useState } from "react";
import { trpc } from "../../../lib/trpc";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../../redux/authSlice";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const mutation = trpc.auth.signin;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await mutation.mutate({ email, password });
      dispatch(
        setAuthState({
          isAuthenticated: true,
          user: { email: email },
          token: data,
        })
      );
      router.push("/chat");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="border p-10 rounded max-w-md bg-white shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
