import { useCallback, useRef } from "react";
import CharacterBox from "~/app/components/CharacterBox";
import type { Attempt } from "~/app/components/Puzzle";

export default function AttemptRow({
	characters,
	updatePuzzle,
	disabled,
	index,
}: {
	characters: Attempt;
	updatePuzzle: (attempt: Attempt) => void;
	disabled: boolean;
	index: number;
}) {
	const refs = useRef<HTMLInputElement[]>([]);

	const onChange = useCallback(
		(index: number) => (newValue: string) => {
			let currentAttempt = characters;

			if (currentAttempt.length < 5) {
				currentAttempt = [...currentAttempt, newValue];

				refs.current[index + 1]?.focus();
				updatePuzzle(currentAttempt);
			}
		},
		[updatePuzzle, characters],
	);

	const onKeyDown = useCallback(
		(index: number) => (key: string) => {
			let currentAttempt = characters;

			if (currentAttempt.length > 0 && key === "Backspace") {
				currentAttempt = currentAttempt.slice(0, -1);

				refs.current[index - 1]?.focus();
				updatePuzzle(currentAttempt);
			}
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
					characterIndex={0}
					attemptIndex={index}
					onKeyDown={onKeyDown(0)}
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
					characterIndex={1}
					attemptIndex={index}
					onKeyDown={onKeyDown(1)}
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
					characterIndex={2}
					attemptIndex={index}
					onKeyDown={onKeyDown(2)}
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
					characterIndex={3}
					attemptIndex={index}
					onKeyDown={onKeyDown(3)}
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
					characterIndex={4}
					attemptIndex={index}
					onKeyDown={onKeyDown(4)}
				/>
			</ul>
		</li>
	);
}
