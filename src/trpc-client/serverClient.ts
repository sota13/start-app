import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server/routers";
import { absoluteUrl } from "@/lib/utils";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: absoluteUrl('/api/trpc'),
    }),
  ],
});
