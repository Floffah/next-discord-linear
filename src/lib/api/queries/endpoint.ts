import { z } from "zod";
import { createRouter } from "../util/trpccontext";
import { TRPCError } from "@trpc/server";
import { db } from "../db";
import { nanoid } from "nanoid";

export const endpointRouter = createRouter()
    .middleware(async (c) => {
        if (!c.ctx.authenticated)
            throw new TRPCError({
                message: "Must be authenticated",
                code: "UNAUTHORIZED",
            });
        return c.next();
    })
    .mutation("create", {
        input: z.object({
            id: z.string().nullish(),
            initiallyDisabled: z.boolean().nullish(),
            hookId: z.string(),
            hookToken: z.string(),
        }),
        resolve: async (a) => {
            const created = await db.endpoint.create({
                data: {
                    id:
                        (a.input.id &&
                        a.input.id !== "" &&
                        !/^\s*$/.test(a.input.id)
                            ? a.input.id
                            : undefined) ?? nanoid(21),
                    enabled: !a.input.initiallyDisabled,
                    hookId: a.input.hookId,
                    hookToken: a.input.hookToken,
                },
            });

            return {
                id: created.id,
                enabled: created.enabled,
            };
        },
    })
    .query("list", {
        input: z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: z.string().nullish(),
        }),
        resolve: async (c) => {
            const limit = c.input.limit ?? 50;
            const cursor = c.input.cursor;

            const endpoints = await db.endpoint.findMany({
                take: limit + 1,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    id: "asc",
                },
            });

            let nextCursor: typeof cursor | null = null;
            if (endpoints.length > limit) {
                const nextEndpoint = endpoints.pop();
                nextCursor = nextEndpoint?.id;
            }

            return {
                endpoints,
                nextCursor,
            };
        },
    });
