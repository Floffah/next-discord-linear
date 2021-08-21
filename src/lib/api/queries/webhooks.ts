import { router } from "@trpc/server";
import { z } from "zod";

export const webhooksRouter = router().mutation("create", {
    input: z.object({
        id: z.string(),
    }),
    resolve: (a) => {
        return {
            id: a.input.id,
        };
    },
});
