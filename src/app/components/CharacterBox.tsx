export default function CharacterBox({ character }: { character: string }) {
	return (
		<li className="flex h-12 w-12 items-center justify-center rounded-md border border-neutral-300 bg-white font-bold text-2xl text-neutral-900 shadow-md md:h-24 md:w-24">
			{character}
		</li>
	);
}
