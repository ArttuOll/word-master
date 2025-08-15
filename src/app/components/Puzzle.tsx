"use client";

import { useRef, useState } from "react";
import { isFinnishWord } from "~/app/actions/isFinnishWord";
import AttemptRow from "~/app/components/AttemptRow";
import Dialog from "~/app/components/Dialog";
import StatusIndicator from "~/app/components/StatusIndicator";
import WordMasterButton from "~/app/components/WordMasterButton";
import { useLocalStorage } from "~/app/useLocalStorage";

export type Color = "green" | "yellow" | "gray" | "white";
export type Attempt = { character: string; color: Color }[];
export type Puzzle = [Attempt, Attempt, Attempt, Attempt, Attempt, Attempt];

export default function Puzzle({ solution }: { solution: string }) {
	const [puzzle, setPuzzle] = useLocalStorage<Puzzle>("puzzle", [
		[],
		[],
		[],
		[],
		[],
		[],
	]);

	const [attemptIndex, setAttemptIndex] = useLocalStorage<number>(
		"attemptIndex",
		0,
	);

	const [storedSolution] = useLocalStorage("solution", solution);

	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const successDialogRef = useRef<HTMLDialogElement>(null);

	const updatePuzzle = (newAttempt: Attempt) => {
		setPuzzle(
			(prevPuzzle) =>
				prevPuzzle.map((attempt, index) => {
					if (index === attemptIndex) {
						return [...newAttempt];
					}

					return attempt;
				}) as Puzzle,
		);
	};

	async function checkSolution(formData: FormData) {
		setError("");

		const word = constructWord(formData);

		if (!(await isFinnishWord(word))) {
			setError(`"${word}" ei ole suomenkielen sana.`);
			return;
		}

		const result = getColorsForWord(word, storedSolution);

		setPuzzle(
			(prevPuzzle) =>
				prevPuzzle.map((attempt, index) => {
					if (index === attemptIndex) {
						return attempt.map((char, charIndex) => ({
							character: char.character,
							color: result?.[charIndex],
						}));
					}

					return attempt;
				}) as Puzzle,
		);

		if (word === storedSolution) {
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
			<StatusIndicator error={error} />
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
					: `Hävisit pelin. Oikea sana oli "${storedSolution}".`}
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

function getColorsForWord(word: string, solution: string) {
	const result = ["white", "white", "white", "white", "white"];

	// On the first pass, we check exact matches and remove them from the characterPool
	const characterPool = solution.split("");
	for (let i = 0; i < word.length; i++) {
		const character = word[i]?.toLowerCase();

		if (character == null) {
			return;
		}

		if (character === solution[i]) {
			result[i] = "green";
			characterPool[i] = "";
		}
	}

	// On the second pass, we check for yellow and gray matches
	for (let i = 0; i < word.length; i++) {
		const character = word[i]?.toLowerCase();

		if (character == null) {
			return;
		}

		if (result[i] === "green") {
			continue;
		}

		const foundIndex = characterPool.indexOf(character);
		if (foundIndex !== -1) {
			result[i] = "yellow";
			characterPool[foundIndex] = "";
		} else {
			result[i] = "gray";
		}
	}

	return result;
}
