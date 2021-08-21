import { LinearClient } from "@linear/sdk";
import { config } from "./config";

let linear: LinearClient | undefined = undefined;

if (
    config.linear_apikey &&
    config.linear_apikey !== "linear api key, remove to disable"
)
    linear = new LinearClient({ apiKey: config.linear_apikey });

export { linear };
