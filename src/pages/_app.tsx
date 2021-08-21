import { AppProps } from "next/app";

import "../styles/common.css";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[...trpc]";

function App(p: AppProps) {
    return (
        <>
            <p.Component {...p.pageProps} />
        </>
    );
}

export default withTRPC<AppRouter>({
    config: (_c) => {
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : "http://localhost:3000/api/trpc";

        let pswd: string | undefined = undefined;

        if (
            typeof localStorage !== "undefined" &&
            localStorage.getItem("ADMINPSWD")
        )
            pswd = localStorage.getItem("ADMINPSWD") as string;

        return {
            url,
            headers: pswd
                ? {
                      AUTHORIZATION: pswd,
                  }
                : {},
        };
    },
    ssr: true,
})(App);
