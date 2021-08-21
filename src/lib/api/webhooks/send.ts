import { Endpoint } from "@prisma/client";
import { LinearWebhook } from "./types";
import {
    HexColorString,
    MessageEmbed,
    WebhookMessageOptions,
} from "discord.js";
import { config } from "../config";
import { getOrCreateWebhook } from "./cache";
import linearappicon from "/public/linear-branding/Linear-app-icon.png";
import getIssueData from "./issue";

export default async function sendWebhook(
    endpoint: Endpoint,
    webhook: LinearWebhook,
) {
    const wclient = getOrCreateWebhook(endpoint.hookId, endpoint.hookToken);

    const embed = new MessageEmbed()
        .setTitle(`${webhook.type} ${webhook.action}d`)
        .setColor(config.theme[webhook.action] as HexColorString);

    if ("body" in webhook.data && webhook.data.body)
        embed.setDescription(webhook.data.body);

    embed.setURL(webhook.url);
    embed.setTimestamp(Date.parse(webhook.data.updatedAt));

    let webhookinfo: WebhookMessageOptions | undefined = undefined;

    if (webhook.type === "Issue")
        webhookinfo = await getIssueData(webhook, embed);

    if (!webhookinfo) throw new Error("Unsupported");

    await wclient.send({
        username: "Linear",
        avatarURL: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/${linearappicon}`
            : `https://i.imgur.com/yKOYVBp.png`,
        ...webhookinfo,
    });
}
