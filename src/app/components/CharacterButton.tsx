export default function CharacterButton({
	character,
	onClick,
}: {
	character: string;
	onClick: (character: string) => void;
}) {
	return (
		<button
			onClick={() => onClick(character)}
			type="button"
			className="size-8 transform cursor-pointer rounded border-neutral-400 border-b-4 bg-neutral-100 font-bold text-black text-xl transition duration-200 ease-in-out hover:bg-neutral-300 focus:translate-y-0 focus:border-b-0 focus:bg-neutral-200 sm:size-10 md:size-16 lg:size-18"
		>
			{character}
		</button>
	);
}
