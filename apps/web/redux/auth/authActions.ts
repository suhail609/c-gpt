import { useDispatch } from "react-redux";
import { setAuthState } from "./authSlice";
import { trpc } from "../../lib/trpc";

export const useAuthActions = () => {
  const dispatch = useDispatch();

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const mutation = trpc.auth.signin;
      const token = await mutation.mutate({ email, password });
      dispatch(
        setAuthState({
          isAuthenticated: true,
          user: { email: email },
          token: token,
        })
      );
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  const signup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const mutation = trpc.auth.signup;
      const token = await mutation.mutate({ email, password });

      dispatch(
        setAuthState({
          isAuthenticated: true,
          user: { email: email },
          token: token,
        })
      );
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const signout = () => {
    dispatch(setAuthState({ isAuthenticated: false, user: null, token: null }));
  };

  return { signin, signup, signout };
};
