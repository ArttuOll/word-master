import { useCallback, useRef } from "react";
import CharacterBox from "~/app/components/CharacterBox";
import type { Attempt } from "~/app/components/Puzzle";

export default function AttemptRow({
	attempt,
	updatePuzzle,
	disabled,
	index,
}: {
	attempt: Attempt;
	updatePuzzle: (attempt: Attempt) => void;
	disabled: boolean;
	index: number;
}) {
	const refs = useRef<HTMLInputElement[]>([]);

	const onChange = useCallback(
		(index: number) => (newValue: string) => {
			let currentAttempt = attempt;

			if (currentAttempt.length < 5) {
				currentAttempt = [
					...currentAttempt,
					{ character: newValue, color: "gray" },
				];

				refs.current[index + 1]?.focus();
				updatePuzzle(currentAttempt);
			}
		},
		[updatePuzzle, attempt],
	);

	const onKeyDown = useCallback(
		(index: number) => (key: string) => {
			let currentAttempt = attempt;

			if (currentAttempt.length > 0 && key === "Backspace") {
				currentAttempt = currentAttempt.slice(0, -1);

				refs.current[index - 1]?.focus();
				updatePuzzle(currentAttempt);
			}
		},
		[updatePuzzle, attempt],
	);

	return (
		<li className="list-none">
			<ul className="flex gap-1">
				<CharacterBox
					character={attempt?.[0]?.character ?? ""}
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
					color={attempt[0]?.color ?? "gray"}
				/>
				<CharacterBox
					character={attempt?.[1]?.character ?? ""}
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
					color={attempt[1]?.color ?? "gray"}
				/>
				<CharacterBox
					character={attempt?.[2]?.character ?? ""}
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
					color={attempt[2]?.color ?? "gray"}
				/>
				<CharacterBox
					character={attempt?.[3]?.character ?? ""}
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
					color={attempt[3]?.color ?? "gray"}
				/>
				<CharacterBox
					character={attempt?.[4]?.character ?? ""}
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
					color={attempt[4]?.color ?? "gray"}
				/>
			</ul>
		</li>
	);
}
