"use client";

import { useCallback, useEffect, useState } from "react";
import AttemptRow from "~/app/components/AttemptRow";
import Keyboard from "~/app/components/Keyboard";
import { keysOfInterest } from "~/app/components/keysOfInterest";

export type Attempt = string[];
type Puzzle = [Attempt, Attempt, Attempt, Attempt, Attempt, Attempt];
type AttemptIndex = 0 | 1 | 2 | 3 | 4 | 5;

export default function Puzzle() {
	const [puzzle, setPuzzle] = useState<Puzzle>([[], [], [], [], [], []]);
	const [attemptIndex, setAttemptIndex] = useState<AttemptIndex>(0);

	const onKeyPress = useCallback(
		(key: string) => {
			let currentAttempt = puzzle[attemptIndex];

			if (currentAttempt.length > 0 && key === "BACKSPACE") {
				currentAttempt = currentAttempt.slice(0, -1);
			} else if (
				currentAttempt.length < 5 &&
				keysOfInterest.includes(key) &&
				key !== "BACKSPACE"
			) {
				currentAttempt = [...currentAttempt, key];
			}

			setPuzzle((prevPuzzle) => {
				return prevPuzzle.map((attempt, index) => {
					if (index === attemptIndex) {
						return [...currentAttempt];
					}
					return attempt;
				}) as Puzzle;
			});
		},
		[attemptIndex, puzzle[attemptIndex]],
	);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const key = event.key.toUpperCase();

			if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
				return;
			}

			onKeyPress(key);
		};

		window.addEventListener("keydown", onKeyDown);

		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onKeyPress]);

	return (
		<div className="col-2 flex flex-col items-center gap-4">
			<ul className="flex list-none flex-col gap-2">
				<AttemptRow characters={puzzle[0]} />
				<AttemptRow characters={puzzle[1]} />
				<AttemptRow characters={puzzle[2]} />
				<AttemptRow characters={puzzle[3]} />
				<AttemptRow characters={puzzle[4]} />
				<AttemptRow characters={puzzle[5]} />
			</ul>
			<button
				type="button"
				className="transform cursor-pointer rounded border-green-900 border-b-4 bg-green-600 p-4 font-bold text-white transition duration-200 ease-in-out hover:bg-green-800 focus:translate-y-0 focus:border-b-0 focus:bg-green-700"
			>
				Tarkista
			</button>
			<Keyboard onKeyPress={onKeyPress} />
		</div>
	);
}
