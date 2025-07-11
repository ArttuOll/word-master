import CharacterBox from "~/app/components/CharacterBox";
import type { Attempt } from "~/app/components/Puzzle";

export default function AttemptRow({ characters }: { characters: Attempt }) {
	return (
		<li className="list-none">
			<ul className="flex gap-1">
				<CharacterBox character={characters?.[0] ?? ""} />
				<CharacterBox character={characters?.[1] ?? ""} />
				<CharacterBox character={characters?.[2] ?? ""} />
				<CharacterBox character={characters?.[3] ?? ""} />
				<CharacterBox character={characters?.[4] ?? ""} />
			</ul>
		</li>
	);
}
