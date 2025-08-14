import { connection } from "next/server";
import Instructions from "~/app/components/Instructions";
import Puzzle from "~/app/components/Puzzle";
import { db } from "~/server/db";

export default async function HomePage() {
	const wordCount = await db.solution.count();
	const solution = await db.solution.findFirstOrThrow({
		take: 1,
		skip: Math.floor(Math.random() * wordCount),
	});

	await connection();

	return (
		<main className="flex min-h-svh w-full flex-col items-center justify-between gap-y-2 bg-neutral-50 pb-2">
			<h1 className="font-extrabold text-[3rem]">Sanamestari</h1>
			<Instructions />
			<Puzzle solution={solution.name} />
		</main>
	);
}
