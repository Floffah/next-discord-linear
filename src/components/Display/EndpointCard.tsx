import { mdiContentCopy, mdiDelete } from "@mdi/js";
import Icon from "@mdi/react";
import { trpc } from "../../lib/api/util/trpc";

export interface Endpoint {
    id: string;
    hookToken: string;
    hookId: string;
    enabled: boolean;
}

export default function EndpointCard(p: { endpoint: Endpoint }) {
    const deleteEndpoint = trpc.useMutation("endpoint.delete");

    return (
        <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 mt-3 select-none">
            {p.endpoint.id}
            <Icon
                path={mdiDelete}
                className="inline-block align-top text-gray-500 float-right hover:bg-gray-200 rounded-full transition-all duration-200 cursor-pointer p-1 box-content"
                size={0.75}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onClick={() => {
                    deleteEndpoint.mutateAsync({ id: p.endpoint.id });
                }}
            />
            <Icon
                path={mdiContentCopy}
                className="inline-block align-top text-gray-500 float-right hover:bg-gray-200 rounded-full transition-all duration-200 cursor-pointer p-1 box-content"
                size={0.7}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onClick={() => {
                    navigator.clipboard.writeText(
                        process.env.VERCEL_URL
                            ? `https://${process.env.VERCEL_URL}/api/endpoints/${p.endpoint.id}`
                            : `http://localhost:3000/api/endpoints/${p.endpoint.id}`,
                    );
                }}
            />
        </div>
    );
}
