import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/src/routes/index";
import { store } from "../redux/store";

const getAuthToken = () => {
  const token = store.getState().auth.token;
  return token ? `Bearer ${token}` : "";
};

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
      headers() {
        return {
          authorization: getAuthToken(),
        };
      },
    }),
  ],
});
