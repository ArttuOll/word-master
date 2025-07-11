import Instructions from "~/app/components/Instructions";
import Puzzle from "~/app/components/Puzzle";
import { db } from "~/server/db";

export default async function HomePage() {
	const wordCount = await db.word.count();
	const solution = await db.word.findFirstOrThrow({
		take: 1,
		skip: Math.floor(Math.random() * wordCount),
	});

	return (
		<main className="grid min-h-screen grid-cols-[1fr_min-content_1fr] items-center justify-items-center gap-y-2 bg-neutral-50">
			<h1 className="col-2 font-extrabold text-xl tracking-tight sm:text-[4rem]">
				Sanamestari
			</h1>
			<Instructions />
			<Puzzle solution={solution.name} />
		</main>
	);
}
