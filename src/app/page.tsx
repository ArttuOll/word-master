import AttemptGrid from "~/app/components/AttemptGrid";
import Instructions from "~/app/components/Instructions";
import Keyboard from "~/app/components/Keyboard";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-neutral-50">
			<h1 className="font-extrabold text-xl tracking-tight sm:text-[4rem]">
				Sanamestari
			</h1>
			<div className="container flex flex-col items-center gap-4 px-6">
				<Instructions />
				<AttemptGrid />
			</div>
			<Keyboard />
		</main>
	);
}
