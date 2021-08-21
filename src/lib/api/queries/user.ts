import { z } from "zod";
import { config } from "../config";
import { createRouter } from "../util/trpccontext";

export const userRouter = createRouter().mutation("validPassword", {
    input: z.string(),
    resolve: (a) => {
        return a.input === config.admin_password;
    },
});
