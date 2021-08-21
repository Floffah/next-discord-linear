import { router } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { webhooksRouter } from "../../../lib/api/queries/webhooks";
import { config } from "../../../lib/api/config";

const appRouter = router().merge("webhooks.", webhooksRouter);

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
    router: appRouter,
    createContext: async (c) => {
        if (
            !c.req.headers.AUTHORIZATION ||
            c.req.headers.AUTHORIZATION !== config.admin_password
        )
            throw "Incorrect authentication";

        return {
            authenticated: true,
        };
    },
});
