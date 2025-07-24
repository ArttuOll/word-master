import type { ChangeEvent, KeyboardEvent, Ref } from "react";

export default function CharacterBox({
	character,
	ref,
	onChange,
	disabled,
	attemptIndex,
	characterIndex,
	onKeyDown,
}: {
	character: string;
	ref: Ref<HTMLInputElement>;
	onChange: (newValue: string) => void;
	disabled: boolean;
	attemptIndex: number;
	characterIndex: number;
	onKeyDown: (key: string) => void;
}) {
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 0) {
			onChange(event.target.value.toUpperCase());
		}
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		onKeyDown(event.key);
	}

	return (
		<input
			id={`${attemptIndex}-${characterIndex}`}
			autoComplete="off"
			disabled={disabled}
			type="text"
			value={character}
			ref={ref}
			className="flex h-12 w-12 items-center justify-center rounded-md border border-neutral-300 bg-white text-center font-bold text-2xl text-neutral-900 shadow-md md:h-24 md:w-24"
			maxLength={1}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	);
}
