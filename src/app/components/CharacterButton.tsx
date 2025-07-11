export default function CharacterButton({ character }: { character: string }) {
	return (
		<button
			type="button"
			className="hover:-translate-y-1 size-8 transform cursor-pointer rounded border-neutral-400 border-b-4 bg-neutral-100 font-bold text-black transition duration-200 ease-in-out hover:scale-110 hover:bg-neutral-300 focus:translate-y-0 focus:border-b-0 focus:bg-neutral-200 sm:size-10 md:size-16 lg:size-18"
		>
			{character}
		</button>
	);
}
