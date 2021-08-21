import { LinearIssueWebhook } from "./types";
import {
    HexColorString,
    MessageEmbed,
    WebhookMessageOptions,
} from "discord.js";
import { linear } from "../linear";

export default async function getIssueData(
    webhook: LinearIssueWebhook,
    embed: MessageEmbed,
): Promise<WebhookMessageOptions> {
    embed.setTitle(embed.title + `: ${webhook.data.title}`);

    embed.setTitle(
        (embed.title as string).replace(
            "Issue",
            `Issue ${"team" in webhook.data ? webhook.data.team.key : "#"}${
                webhook.data.number
            }`,
        ),
    );

    embed.setDescription(webhook.data.description);

    // attributes
    let attributes = "";

    attributes += `**Priority**: ${webhook.data.priorityLabel}\n`;

    let stated = false;
    if (linear) {
        try {
            const state = await linear.workflowState(webhook.data.state.id);

            attributes += `**State**: ${state.name}\n`;
            embed.setColor(state.color as HexColorString);
            stated = true;
        } catch {
            stated = false;
        }
    }
    if (!stated) {
        embed.setColor(webhook.data.state.color as HexColorString);
        attributes += `**State**: ${webhook.data.state.name}\n`;
    }

    // people

    let people = "";

    let creatored = false;
    if (linear) {
        try {
            const creator = await linear.user(webhook.data.creatorId);

            people += `**Creator**: [${creator.name}](${creator.url})\n`;
            creatored = true;
        } catch {
            creatored = false;
        }
    }
    if (!creatored) people += `**Creator**: ||${webhook.data.creatorId}||\n`;

    let assigneed = false;
    if (linear) {
        try {
            const assignee = await linear.user(webhook.data.assignee.id);

            people += `**Assignee**: [${assignee.name}](${assignee.url})\n`;
            assigneed = true;
        } catch {
            assigneed = false;
        }
    }
    if (!assigneed) people += `**Assignee**: ${webhook.data.assignee.name}\n`;

    if (attributes !== "") embed.addField("Attributes", attributes, true);
    if (people !== "") embed.addField("People", people, true);

    return { embeds: [embed] };
}
