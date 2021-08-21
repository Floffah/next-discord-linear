import { CreateNextContextOptions } from "@trpc/server/dist/declarations/src/adapters/next";
import { config } from "../config";
import { inferAsyncReturnType, router, TRPCError } from "@trpc/server";

export async function createContext(c: CreateNextContextOptions) {
    if (
        c.req.headers.authorization &&
        c.req.headers.authorization !== config.admin_password
    )
        throw new TRPCError({
            message: "Authentication failed. Incorrect details.",
            code: "BAD_REQUEST",
        });

    return {
        authenticated: !!c.req.headers.authorization,
    };
}
export type APIContext = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
    return router<APIContext>();
}
