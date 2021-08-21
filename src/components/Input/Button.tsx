import { forwardRef, HTMLAttributes } from "react";

const Button = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
    (p, ref) => (
        <button
            ref={ref}
            {...p}
            className={
                "py-2 px-6 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 flex-1 focus:ring-offset-blue:200 text-white w-full transition relative inline-block " +
                "ease-in duration-200 text-center text-base font-semibold shadow-md outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" +
                (p.className ? " " + p.className : "")
            }
        />
    ),
);
Button.displayName = "Button";

export default Button;
