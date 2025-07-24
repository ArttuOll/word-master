import { useCallback, useRef } from "react";
import CharacterBox from "~/app/components/CharacterBox";
import type { Attempt } from "~/app/components/Puzzle";

export default function AttemptRow({
	characters,
	updatePuzzle,
	disabled,
}: {
	characters: Attempt;
	updatePuzzle: (attempt: Attempt) => void;
	disabled: boolean;
}) {
	const refs = useRef<HTMLInputElement[]>([]);

	const onChange = useCallback(
		(index: number) => (newValue: string) => {
			let currentAttempt = characters;

			if (currentAttempt.length > 0 && newValue === "") {
				currentAttempt = currentAttempt.slice(0, -1);
				refs.current[index - 1]?.focus();
			} else if (currentAttempt.length < 5) {
				currentAttempt = [...currentAttempt, newValue];
				refs.current[index + 1]?.focus();
			}

			updatePuzzle(currentAttempt);
		},
		[updatePuzzle, characters],
	);

	return (
		<li className="list-none">
			<ul className="flex gap-1">
				<CharacterBox
					character={characters?.[0] ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[0] = component;
						}
					}}
					onChange={onChange(0)}
					disabled={disabled}
				/>
				<CharacterBox
					character={characters?.[1] ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[1] = component;
						}
					}}
					onChange={onChange(1)}
					disabled={disabled}
				/>
				<CharacterBox
					character={characters?.[2] ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[2] = component;
						}
					}}
					onChange={onChange(2)}
					disabled={disabled}
				/>
				<CharacterBox
					character={characters?.[3] ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[3] = component;
						}
					}}
					onChange={onChange(3)}
					disabled={disabled}
				/>
				<CharacterBox
					character={characters?.[4] ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[4] = component;
						}
					}}
					onChange={onChange(4)}
					disabled={disabled}
				/>
			</ul>
		</li>
	);
}
