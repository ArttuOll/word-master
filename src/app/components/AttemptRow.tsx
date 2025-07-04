import CharacterBox from "~/app/components/CharacterBox";

export default function AttemptRow() {
	return (
		<li className="list-none">
			<ul className="flex gap-1">
				<CharacterBox />
				<CharacterBox />
				<CharacterBox />
				<CharacterBox />
				<CharacterBox />
			</ul>
		</li>
	);
}
