import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { useRouter } from "next/router";
import PageStructure from "../../components/util/PageStructure";
import { trpc } from "../../lib/api/util/trpc";
import EndpointCard from "../../components/Display/EndpointCard";
import { Fragment, useEffect } from "react";

export default function AdminPage() {
    const router = useRouter();

    const endpoints = trpc.useInfiniteQuery(["endpoint.list", { limit: 10 }], {
        getNextPageParam: (last) => last.nextCursor,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            endpoints.refetch();
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <>
            <PageStructure title="Admin">
                <div
                    className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 mt-3 select-none cursor-pointer hover:bg-gray-200 transition-all duration-200"
                    onClick={() => router.push("/admin/create")}
                >
                    <p>
                        Create a new webhook endpoint{" "}
                        <Icon
                            path={mdiChevronRight}
                            className="inline-block align-top text-gray-500 float-right"
                            size={1}
                        />
                    </p>
                </div>
                <div className="mt-6 relative">
                    {!endpoints.data ? (
                        <p>Fetching...</p>
                    ) : (
                        [...endpoints.data.pages].map((p, id) => (
                            <Fragment key={id}>
                                {p.endpoints.map((e) => (
                                    <EndpointCard endpoint={e} key={e.id} />
                                ))}
                            </Fragment>
                        ))
                    )}
                </div>
            </PageStructure>
        </>
    );
}
