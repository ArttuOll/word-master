import AttemptRow from "~/app/components/AttemptRow";

export default function AttemptGrid() {
	return (
		<ul className="col-2 flex list-none flex-col gap-2">
			<AttemptRow />
			<AttemptRow />
			<AttemptRow />
			<AttemptRow />
			<AttemptRow />
			<AttemptRow />
		</ul>
	);
}
