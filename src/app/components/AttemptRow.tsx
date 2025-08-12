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
		(newValue: string, characterIndex: number) => {
			console.log(newValue);
			const currentAttempt = [...attempt];

			currentAttempt[characterIndex] = {
				character: newValue,
				color: "white",
			};

			refs.current[characterIndex + 1]?.focus();
			updatePuzzle(currentAttempt);
		},
		[updatePuzzle, attempt],
	);

	const onKeyDown = useCallback(
		(key: string, characterIndex: number) => {
			const currentAttempt = [...attempt];

			if (key === "Backspace") {
				currentAttempt[characterIndex] = { character: "", color: "white" };

				refs.current[characterIndex - 1]?.focus();
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
					onChange={onChange}
					disabled={disabled}
					characterIndex={0}
					attemptIndex={index}
					onKeyDown={onKeyDown}
					color={attempt[0]?.color ?? "white"}
				/>
				<CharacterBox
					character={attempt?.[1]?.character ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[1] = component;
						}
					}}
					onChange={onChange}
					disabled={disabled}
					characterIndex={1}
					attemptIndex={index}
					onKeyDown={onKeyDown}
					color={attempt[1]?.color ?? "white"}
				/>
				<CharacterBox
					character={attempt?.[2]?.character ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[2] = component;
						}
					}}
					onChange={onChange}
					disabled={disabled}
					characterIndex={2}
					attemptIndex={index}
					onKeyDown={onKeyDown}
					color={attempt[2]?.color ?? "white"}
				/>
				<CharacterBox
					character={attempt?.[3]?.character ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[3] = component;
						}
					}}
					onChange={onChange}
					disabled={disabled}
					characterIndex={3}
					attemptIndex={index}
					onKeyDown={onKeyDown}
					color={attempt[3]?.color ?? "white"}
				/>
				<CharacterBox
					character={attempt?.[4]?.character ?? ""}
					ref={(component) => {
						if (component != null) {
							refs.current[4] = component;
						}
					}}
					onChange={onChange}
					disabled={disabled}
					characterIndex={4}
					attemptIndex={index}
					onKeyDown={onKeyDown}
					color={attempt[4]?.color ?? "white"}
				/>
			</ul>
		</li>
	);
}
