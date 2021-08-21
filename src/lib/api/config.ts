import { resolve } from "path";
import { parse } from "jju";
import { readFileSync } from "fs";

export interface Config {
    admin_password: string;
    linear_apikey?: string;
    theme: {
        create: string;
        update: string;
        remove: string;
    };
}

export const configpath = resolve(__dirname, "../../../../../config.json");
export const config = parse(readFileSync(configpath, "utf-8")) as Config;

if (
    process.env.NODE_ENV !== "development" &&
    config.admin_password === "you need to change this"
)
    throw new Error("Admin password was not changed");
