"use client";

import { useCallback, useRef, useState } from "react";
import { isFinnishWord } from "~/app/actions/isFinnishWord";
import AttemptRow from "~/app/components/AttemptRow";
import Dialog from "~/app/components/Dialog";
import WordMasterButton from "~/app/components/WordMasterButton";

export type Color = "green" | "yellow" | "gray" | "white";
export type Attempt = { character: string; color: Color }[];
export type Puzzle = [Attempt, Attempt, Attempt, Attempt, Attempt, Attempt];

export default function Puzzle({ solution }: { solution: string }) {
	const [puzzle, setPuzzle] = useState<Puzzle>([[], [], [], [], [], []]);
	const [attemptIndex, setAttemptIndex] = useState<number>(0);

	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const successDialogRef = useRef<HTMLDialogElement>(null);

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

		const word = constructWord(formData);

		if (!(await isFinnishWord(word))) {
			setError(`"${word}" ei ole suomenkielen sana.`);
			return;
		}

		const result = ["white", "white", "white", "white", "white"];

		let checkWord = solution;
		for (let i = 0; i < word.length; i++) {
			const character = word[i]?.toLowerCase();

			if (character == null) {
				return;
			}

			if (character === solution[i]) {
				result[i] = "green";
				checkWord = `${checkWord.slice(0, i)} ${checkWord.slice(i + 1)}`;
			}
		}

		for (let i = 0; i < word.length; i++) {
			const character = word[i]?.toLowerCase();

			if (character == null) {
				return;
			}

			if (result[i] === "green") {
				continue;
			}

			if (checkWord.includes(character)) {
				const foundIndex = checkWord.indexOf(character);
				result[i] = "yellow";
				checkWord = `${checkWord.slice(0, foundIndex)} ${checkWord.slice(foundIndex + 1)}`;
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

		if (word === solution) {
			setSuccess(true);
			successDialogRef.current?.showModal();
			return;
		}

		setAttemptIndex((prevIndex) => prevIndex + 1);
	}

	if (attemptIndex === 6) {
		successDialogRef.current?.showModal();
	}

	const submitButtonDisabled = success || attemptIndex === 6;

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
				<WordMasterButton type="submit" disabled={submitButtonDisabled}>
					Tarkista
				</WordMasterButton>
			</div>
			<Dialog ref={successDialogRef}>
				{success
					? "Onneksi olkoon! Voitit pelin!"
					: `Hävisit pelin. Oikea sana oli "${solution}".`}
			</Dialog>
		</form>
	);
}

function constructWord(formData: FormData) {
	let word = "";
	formData.forEach((value, key) => {
		if (key.startsWith("character")) {
			word = word.concat(value.toString().toLowerCase());
		}
	});

	return word;
}
