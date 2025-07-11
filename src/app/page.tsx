import AttemptGrid from "~/app/components/AttemptGrid";
import Instructions from "~/app/components/Instructions";
import Keyboard from "~/app/components/Keyboard";

export default function HomePage() {
	return (
		<main className="grid min-h-screen grid-cols-[1fr_min-content_1fr] items-center justify-items-center gap-y-2 bg-neutral-50">
			<h1 className="col-2 font-extrabold text-xl tracking-tight sm:text-[4rem]">
				Sanamestari
			</h1>
			<Instructions />
			<AttemptGrid />
			<Keyboard />
		</main>
	);
}
