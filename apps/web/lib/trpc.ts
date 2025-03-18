import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/routers/index"; // Adjust the path to where your AppRouter is located

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});
