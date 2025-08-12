"use client";

import { useCallback, useState } from "react";
import { isFinnishWord } from "~/app/actions/isFinnishWord";
import AttemptRow from "~/app/components/AttemptRow";

export type Color = "green" | "yellow" | "gray";
export type Attempt = { character: string; color: Color }[];
export type Puzzle = [Attempt, Attempt, Attempt, Attempt, Attempt, Attempt];
export type AttemptIndex = 0 | 1 | 2 | 3 | 4 | 5;

export default function Puzzle({ solution }: { solution: string }) {
	const [puzzle, setPuzzle] = useState<Puzzle>([[], [], [], [], [], []]);
	const [attemptIndex, setAttemptIndex] = useState<AttemptIndex>(0);

	const [error, setError] = useState("");

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

	async function checkSolution(formData: FormData) {
		setError("");
		const result = ["gray", "gray", "gray", "gray", "gray"];

		const word = constructWord(formData);

		if (!(await isFinnishWord(word))) {
			setError(`"${word}" ei ole suomenkielen sana.`);
			return;
		}

		for (let i = 0; i < word.length; i++) {
			const character = word[i]?.toLowerCase();

			if (character == null) {
				return;
			}

			if (character === solution[i]) {
				result[i] = "green";
			} else if (solution.includes(character)) {
				result[i] = "yellow";
			} else {
				result[i] = "gray";
			}
		}

		setPuzzle(
			(prevPuzzle) =>
				prevPuzzle.map((attempt, index) => {
					if (index === attemptIndex) {
						return attempt.map((char, charIndex) => ({
							character: char.character,
							color: result[charIndex],
						}));
					}

					return attempt;
				}) as Puzzle,
		);
	}

	return (
		<form
			className="flex w-full flex-col items-center gap-y-2"
			action={checkSolution}
		>
			{error && (
				<p aria-live="polite" className="text-red-700">
					{error}
				</p>
			)}
			<div className="grid w-full grid-cols-[1fr_min-content_1fr] items-center justify-items-center gap-y-4">
				<ul className="col-2 flex list-none flex-col gap-2">
					<AttemptRow
						attempt={puzzle[0]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 0}
						index={0}
					/>
					<AttemptRow
						attempt={puzzle[1]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 1}
						index={1}
					/>
					<AttemptRow
						attempt={puzzle[2]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 2}
						index={2}
					/>
					<AttemptRow
						attempt={puzzle[3]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 3}
						index={3}
					/>
					<AttemptRow
						attempt={puzzle[4]}
						updatePuzzle={updatePuzzle}
						disabled={attemptIndex !== 4}
						index={4}
					/>
					<AttemptRow
						attempt={puzzle[5]}
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

function constructWord(formData: FormData) {
	let word = "";
	formData.forEach((value, key) => {
		if (key.startsWith("character")) {
			word = word.concat(value.toString());
		}
	});

	return word;
}
