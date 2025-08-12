"use server";

import { db } from "~/server/db";

export async function isFinnishWord(word: string) {
	"use server";

	const exists = await db.word.findFirst({
		where: {
			name: word.toLowerCase(),
		},
	});

	return exists != null;
}
