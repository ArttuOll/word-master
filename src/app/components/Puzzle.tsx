"use client";

import { useCallback, useState } from "react";
import AttemptRow from "~/app/components/AttemptRow";

export type Attempt = string[];
export type Puzzle = [Attempt, Attempt, Attempt, Attempt, Attempt, Attempt];
export type AttemptIndex = 0 | 1 | 2 | 3 | 4 | 5;

export default function Puzzle({ solution }: { solution: string }) {
	const [puzzle, setPuzzle] = useState<Puzzle>([[], [], [], [], [], []]);
	const [attemptIndex, setAttemptIndex] = useState<AttemptIndex>(0);

	const updatePuzzle = useCallback(
		(newAttempt: Attempt) => {
			setPuzzle(
				(prevPuzzle) =>
					prevPuzzle.map((attempt, index) => {
						if (index === attemptIndex) {
							return [...newAttempt];
						}

						return attempt;
					}) as Puzzle,
			);
		},
		[attemptIndex],
	);

	return (
		<div className="grid w-full grid-cols-[1fr_min-content_1fr] items-center justify-items-center gap-y-4">
			<ul className="col-2 flex list-none flex-col gap-2">
				<AttemptRow characters={puzzle[0]} updatePuzzle={updatePuzzle} />
				<AttemptRow characters={puzzle[1]} updatePuzzle={updatePuzzle} />
				<AttemptRow characters={puzzle[2]} updatePuzzle={updatePuzzle} />
				<AttemptRow characters={puzzle[3]} updatePuzzle={updatePuzzle} />
				<AttemptRow characters={puzzle[4]} updatePuzzle={updatePuzzle} />
				<AttemptRow characters={puzzle[5]} updatePuzzle={updatePuzzle} />
			</ul>
			<button
				type="button"
				className="col-2 block transform cursor-pointer rounded border-green-900 border-b-4 bg-green-600 p-4 font-bold text-white transition duration-200 ease-in-out hover:bg-green-800 focus:translate-y-0 focus:border-b-0 focus:bg-green-700"
			>
				Tarkista
			</button>
		</div>
	);
}
