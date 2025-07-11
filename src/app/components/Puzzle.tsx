"use client";

import { useState } from "react";
import AttemptRow from "~/app/components/AttemptRow";
import Keyboard from "~/app/components/Keyboard";

export type Attempt = string[];
type Puzzle = [Attempt, Attempt, Attempt, Attempt, Attempt, Attempt];
type AttemptIndex = 0 | 1 | 2 | 3 | 4 | 5;

export default function Puzzle() {
	const [puzzle, setPuzzle] = useState<Puzzle>([[], [], [], [], [], []]);
	const [attemptIndex, setAttemptIndex] = useState<AttemptIndex>(0);

	function onKeyPress(key: string) {
		let currentAttempt = puzzle[attemptIndex];

		if (currentAttempt.length < 5) {
			currentAttempt = [...currentAttempt, key];
			setPuzzle((prevPuzzle) => {
				return prevPuzzle.map((attempt, index) => {
					if (index === attemptIndex) {
						return [...currentAttempt];
					}
					return attempt;
				}) as Puzzle;
			});
		}
	}

	return (
		<>
			<ul className="col-2 flex list-none flex-col gap-2">
				<AttemptRow characters={puzzle[0]} />
				<AttemptRow characters={puzzle[1]} />
				<AttemptRow characters={puzzle[2]} />
				<AttemptRow characters={puzzle[3]} />
				<AttemptRow characters={puzzle[4]} />
				<AttemptRow characters={puzzle[5]} />
			</ul>
			<Keyboard onKeyPress={onKeyPress} />
		</>
	);
}
