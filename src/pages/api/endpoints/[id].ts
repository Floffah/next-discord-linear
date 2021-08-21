import { NextApiHandler } from "next";
import { db } from "../../../lib/api/db";
import sendWebhook from "../../../lib/api/webhooks/send";
import { parse } from "jju";
import { LinearWebhook } from "../../../lib/api/webhooks/types";

export default (async (req, res) => {
    const headerkeys = Object.keys(req.headers).map((k) => k.toLowerCase());

    if (
        req.method !== "POST" ||
        !req.socket.remoteAddress ||
        !req.query.id ||
        Array.isArray(req.query.id)
    ) {
        res.status(400).send({
            error: 400,
            message:
                "Bad request: Request was one of the following: not a post request, no remote address, no id, array id",
        });
        return;
    }

    if (
        process.env.NODE_ENV !== "development" &&
        (!headerkeys.includes("linear-delivery") ||
            !headerkeys.includes("linear-event") ||
            !headerkeys.includes("user-agent") ||
            req.headers["user-agent"] !== "Linear-Webhook" ||
            !["35.231.147.226", "35.243.134.228"].includes(
                req.socket.remoteAddress,
            ))
    ) {
        res.status(401).send({
            error: 401,
            message:
                "Unauthorized: incorrect header format or bad remote address",
        });
        return;
    }

    const endpoint = await db.endpoint.findUnique({
        where: {
            id: req.query.id,
        },
    });

    if (!endpoint) {
        res.status(400).send({
            error: 400,
            message: "Bad request: invalid endpoint id",
        });
        return;
    }

    const body = (
        typeof req.body === "string" ? parse(req.body) : req.body
    ) as LinearWebhook;

    await sendWebhook(endpoint, body);

    res.status(200).send({ endpoint });
}) as NextApiHandler;
