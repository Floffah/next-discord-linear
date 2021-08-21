import Login from "../components/Input/Login";
import { useIsAuthenticated } from "../lib/hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function IndexPage() {
    const isAuthed = useIsAuthenticated();
    const router = useRouter();

    useEffect(() => {
        if (isAuthed) router.push("/admin");
    }, [isAuthed, router]);

    return (
        <>
            <NextSeo title="Admin Login" />
            <Login />
        </>
    );
}
