import PageStructure from "../../components/util/PageStructure";
import TextInput from "../../components/Input/TextInput";
import { useRef, useState } from "react";
import Button from "../../components/Input/Button";
import { trpc } from "../../lib/api/util/trpc";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

export default function CreatePage() {
    const router = useRouter();

    const nameRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const tokenRef = useRef<HTMLInputElement>(null);

    const [idValue, setIdValue] = useState<string>("");
    const [tokenValue, setTokenValue] = useState<string>("");

    const createEndpoint = trpc.useMutation("endpoint.create");

    return (
        <>
            <PageStructure title="Create Endpoint">
                <div className="relative w-fit mx-auto">
                    <TextInput
                        placeholder="Endpoint ID (leave blank to auto generate)"
                        ref={nameRef}
                        className="w-112 block mt-3"
                    />
                    <TextInput
                        placeholder="Discord Webhook ID (paste url to autocomplete)"
                        ref={idRef}
                        value={idValue}
                        className="w-112 block mt-3"
                        onChange={(e) =>
                            setIdValue((e.target as HTMLInputElement).value)
                        }
                        onPaste={(p) => {
                            const data = p.clipboardData.getData("text");

                            if (data.startsWith("https://")) {
                                const [id, token] = data
                                    .replace(
                                        /https:\/\/(canary.|ptb.)?discord.com\/api\/webhooks\//,
                                        "",
                                    )
                                    .split("/");

                                setTokenValue(token);
                                idRef.current?.blur();
                                setIdValue(id);
                            }
                        }}
                    />
                    <TextInput
                        placeholder="Discord Webhook token"
                        ref={tokenRef}
                        value={tokenValue}
                        onChange={(e) =>
                            setTokenValue((e.target as HTMLInputElement).value)
                        }
                        className="w-112 block mt-3"
                    />
                    <Button
                        className="mt-3"
                        onClick={async () => {
                            const name =
                                (nameRef.current
                                    ? /^\s*$/.test(nameRef.current.value)
                                        ? undefined
                                        : nameRef.current.value
                                    : undefined) ?? nanoid(21);
                            nameRef.current?.setAttribute("value", name);

                            const id = idRef.current?.value;
                            const token = tokenRef.current?.value;
                            if (!id || !token) return;

                            await createEndpoint.mutateAsync({
                                id: name,
                                hookId: id,
                                hookToken: token,
                                initiallyDisabled: false,
                            });

                            router.push("/");
                        }}
                    >
                        Create
                    </Button>
                </div>
            </PageStructure>
        </>
    );
}
