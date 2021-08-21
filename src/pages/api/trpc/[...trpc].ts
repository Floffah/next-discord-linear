import { createNextApiHandler } from "@trpc/server/adapters/next";
import { endpointRouter } from "../../../lib/api/queries/endpoint";
import { userRouter } from "../../../lib/api/queries/user";
import { createContext, createRouter } from "../../../lib/api/util/trpccontext";

const appRouter = createRouter()
    .merge("endpoint.", endpointRouter)
    .merge("user.", userRouter);

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
    router: appRouter,
    createContext,
});
