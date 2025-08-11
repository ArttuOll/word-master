"use client";

import { useActionState, useCallback, useState } from "react";
import { isFinnishWord } from "~/app/actions/isFinnishWord";
import AttemptRow from "~/app/components/AttemptRow";

export type Attempt = string[];
export type Puzzle = [Attempt, Attempt, Attempt, Attempt, Attempt, Attempt];
export type AttemptIndex = 0 | 1 | 2 | 3 | 4 | 5;

export default function Puzzle({ solution }: { solution: string }) {
	const [puzzle, setPuzzle] = useState<Puzzle>([[], [], [], [], [], []]);
	const [attemptIndex, setAttemptIndex] = useState<AttemptIndex>(0);
	const [state, formAction] = useActionState(isFinnishWord, {
		error: null,
	});

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
		<form
			action={formAction}
			className="flex w-full flex-col items-center gap-y-2"
		>
			{state?.error && <p className="text-red-700">{state?.error}</p>}
			<div className="grid w-full grid-cols-[1fr_min-content_1fr] items-center justify-items-center gap-y-4">
				<ul className="col-2 flex list-none flex-col gap-2">
					<AttemptRow
						characters={puzzle[0]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 0}
						index={0}
					/>
					<AttemptRow
						characters={puzzle[1]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 1}
						index={1}
					/>
					<AttemptRow
						characters={puzzle[2]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 2}
						index={2}
					/>
					<AttemptRow
						characters={puzzle[3]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 3}
						index={3}
					/>
					<AttemptRow
						characters={puzzle[4]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 4}
						index={4}
					/>
					<AttemptRow
						characters={puzzle[5]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 5}
						index={5}
					/>
				</ul>
				<button
					type="submit"
					className="col-2 block transform cursor-pointer rounded border-green-900 border-b-4 bg-green-600 p-4 font-bold text-white transition duration-200 ease-in-out hover:bg-green-800 focus:translate-y-0 focus:border-b-0 focus:bg-green-700"
				>
					Tarkista
				</button>
			</div>
		</form>
	);
}
