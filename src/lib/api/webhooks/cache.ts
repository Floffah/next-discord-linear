import { WebhookClient } from "discord.js";

export const webhookCache: Map<`${string}/${string}`, WebhookClient> =
    new Map(); // `id/token`: WebhookClient

export function getOrCreateWebhook(id: string, token: string) {
    if (webhookCache.has(`${id}/${token}`))
        return webhookCache.get(`${id}/${token}`) as WebhookClient;

    const client = new WebhookClient({ id, token });
    webhookCache.set(`${id}/${token}`, client);
    return client;
}
