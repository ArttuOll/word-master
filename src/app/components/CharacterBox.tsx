import type { ChangeEvent, Ref } from "react";

export default function CharacterBox({
	character,
	ref,
	onChange,
}: {
	character: string;
	ref: Ref<HTMLInputElement>;
	onChange: (newValue: string) => void;
}) {
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value.toUpperCase());
	}

	return (
		<input
			type="text"
			value={character}
			ref={ref}
			className="flex h-12 w-12 items-center justify-center rounded-md border border-neutral-300 bg-white text-center font-bold text-2xl text-neutral-900 shadow-md md:h-24 md:w-24"
			max={1}
			onChange={handleChange}
		/>
	);
}
