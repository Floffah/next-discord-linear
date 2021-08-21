import { AppProps } from "next/app";

import "../styles/common.css";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[...trpc]";
import { AdminPasswordName } from "../lib/names/localstorage";
import ErrorBoundary from "../components/util/ErrorBoundary";
import { DefaultSeo } from "next-seo";

function App(p: AppProps) {
    return (
        <>
            <DefaultSeo
                titleTemplate="%s | Next-Discord-Linear"
                defaultTitle="Next-Discord-Linear"
            />
            <p.Component {...p.pageProps} />
        </>
    );
}

const TRPCApp = withTRPC<AppRouter>({
    config: (_c) => {
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : "http://localhost:3000/api/trpc";

        let pswd: string | undefined = undefined;

        if (
            typeof localStorage !== "undefined" &&
            localStorage.getItem(AdminPasswordName)
        )
            pswd = localStorage.getItem(AdminPasswordName) as string;

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

export default function BoundariedApp(p: AppProps) {
    return (
        <ErrorBoundary>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TRPCApp {...p} />
        </ErrorBoundary>
    );
}
