import type { ChangeEvent, KeyboardEvent, Ref } from "react";
import type { Color } from "~/app/components/Puzzle";

export default function CharacterBox({
	character,
	ref,
	onChange,
	disabled,
	attemptIndex,
	characterIndex,
	onKeyDown,
	color,
}: {
	character: string;
	ref: Ref<HTMLInputElement>;
	onChange: (newValue: string) => void;
	disabled: boolean;
	attemptIndex: number;
	characterIndex: number;
	onKeyDown: (key: string) => void;
	color: Color;
}) {
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 0) {
			onChange(event.target.value.toUpperCase());
		}
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		onKeyDown(event.key);
	}

	function getStatusColorClass() {
		switch (color) {
			case "green":
				return "bg-green-500 text-neutral-900";
			case "yellow":
				return "bg-yellow-500 text-neutral-900";
			case "gray":
				return "bg-neutral-500 text-neutral-100";
			default:
				return "bg-white text-neutral-900";
		}
	}

	return (
		<input
			id={`${attemptIndex}-${characterIndex}`}
			name={`character-${attemptIndex}-${characterIndex}`}
			autoComplete="off"
			disabled={disabled}
			type="text"
			value={character}
			ref={ref}
			className={`flex h-12 w-12 items-center justify-center rounded-md border border-neutral-300 ${getStatusColorClass()} text-center font-bold text-2xl shadow-md md:h-24 md:w-24`}
			maxLength={1}
			minLength={1}
			required
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			pattern="[a-öA-Ö]"
		/>
	);
}
