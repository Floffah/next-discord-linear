import Link from "next/link";
import { PropsWithChildren } from "react";
import { NextSeo } from "next-seo";

export default function PageStructure(p: PropsWithChildren<{ title: string }>) {
    return (
        <>
            <NextSeo title={p.title} />
            <div className="translate-center-x absolute h-fit w-fit">
                <h1 className="text-2xl mt-3 text-gray-400">
                    <Link href="/admin">Next Discord Linear</Link> | {p.title}
                </h1>
                {p.children}
            </div>
        </>
    );
}
