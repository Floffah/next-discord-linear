import { trpc } from "../../lib/api/util/trpc";
import { useRef } from "react";
import { AdminPasswordName } from "../../lib/names/localstorage";
import { useRouter } from "next/router";
import TextInput from "./TextInput";
import Button from "./Button";

export default function Login() {
    const validPassword = trpc.useMutation("user.validPassword");
    const router = useRouter();
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div className="absolute translate-center w-fit h-fit flex">
            <TextInput type="password" placeholder="Admin password" ref={ref} />
            <Button
                className="ml-1"
                onClick={async () => {
                    if (ref.current) {
                        await router.prefetch("/admin");
                        const result = await validPassword.mutateAsync(
                            ref.current.value,
                        );

                        if (!result) return alert("Incorrect password");

                        localStorage.setItem(
                            AdminPasswordName,
                            ref.current.value,
                        );
                        await router.push("/admin");
                    }
                }}
            >
                Login
            </Button>
        </div>
    );
}

/**
 *
 <button type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full
 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
 Valider
 </button>

 */
