import type { ComponentProps } from "react";

interface WordMasterButtonProps extends ComponentProps<"button"> {
	children: string;
	color?: "green" | "red";
}

export default function WordMasterButton({
	children,
	color = "green",
	...props
}: WordMasterButtonProps) {
	return (
		<button
			className={`col-2 block transform cursor-pointer rounded ${color === "green" ? "border-green-900 bg-green-700 hover:bg-green-800 focus:bg-green-800" : "border-red-900 bg-red-600 hover:bg-red-800 focus:bg-red-700"} border-b-4 p-4 font-bold text-white transition duration-200 ease-in-out focus:translate-y-0 focus:border-b-0 `}
			{...props}
		>
			{children}
		</button>
	);
}
