import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";

export interface Endpoint {
    id: string;
    hookToken: string;
    hookId: string;
    enabled: boolean;
}

export default function EndpointCard(p: { endpoint: Endpoint }) {
    return (
        <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 mt-3 select-none cursor-pointer hover:bg-gray-200 transition-all duration-200">
            {p.endpoint.id}
            <Icon
                path={mdiChevronRight}
                className="inline-block align-top text-gray-500 float-right"
                size={1}
            />
        </div>
    );
}
