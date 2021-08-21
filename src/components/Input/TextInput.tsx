import { forwardRef, HTMLAttributes } from "react";

const TextInput = forwardRef<
    HTMLInputElement,
    HTMLAttributes<HTMLInputElement> & { type?: string; value?: string }
>((p, ref) => (
    <input
        ref={ref}
        {...p}
        className={
            "rounded-lg appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 outline-none relative " +
            "placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-200" +
            (p.className
                ? " " +
                  p.className +
                  " " +
                  (p.className.includes("w-") ? "" : "w-full")
                : "")
        }
    />
));
TextInput.displayName = "TextInput";

export default TextInput;
