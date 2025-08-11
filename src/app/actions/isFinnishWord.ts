"use server";

import { db } from "~/server/db";

export async function isFinnishWord(
	_prevState: { error: string | null },
	formData: FormData,
) {
	"use server";

	let word = "";
	formData.forEach((value, key) => {
		if (key.startsWith("character")) {
			word = word.concat(value.toString());
		}
	});

	const exists = await db.word.findFirst({
		where: {
			name: word.toLowerCase(),
		},
	});

	if (exists == null) {
		return {
			error: `"${word}" ei ole suomenkielen sana.`,
		};
	}

	return {
		error: null,
	};
}
