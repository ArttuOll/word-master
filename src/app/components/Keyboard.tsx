import CharacterButton from "~/app/components/CharacterButton";

export default function Keyboard() {
	return (
		<div className="col-span-full">
			<div className="flex grow gap-0.5">
				<CharacterButton character="Q" />
				<CharacterButton character="W" />
				<CharacterButton character="E" />
				<CharacterButton character="R" />
				<CharacterButton character="T" />
				<CharacterButton character="Y" />
				<CharacterButton character="U" />
				<CharacterButton character="I" />
				<CharacterButton character="O" />
				<CharacterButton character="P" />
				<CharacterButton character="Å" />
			</div>
			<div className="flex grow gap-0.5">
				<CharacterButton character="A" />
				<CharacterButton character="S" />
				<CharacterButton character="D" />
				<CharacterButton character="F" />
				<CharacterButton character="G" />
				<CharacterButton character="H" />
				<CharacterButton character="J" />
				<CharacterButton character="K" />
				<CharacterButton character="L" />
				<CharacterButton character="Ö" />
				<CharacterButton character="Ä" />
			</div>
			<div className="flex grow">
				<div className="flex gap-0.5">
					<CharacterButton character="Z" />
					<CharacterButton character="X" />
					<CharacterButton character="C" />
					<CharacterButton character="V" />
					<CharacterButton character="B" />
					<CharacterButton character="N" />
					<CharacterButton character="M" />
				</div>
				<div className="ml-auto">
					<button
						type="button"
						className=" hover:-translate-y-1 flex size-8 transform cursor-pointer items-center justify-center rounded border-neutral-400 border-b-4 bg-neutral-100 font-bold text-black transition duration-200 ease-in-out hover:scale-110 hover:bg-neutral-300 sm:size-10 md:size-16 lg:size-18"
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#1f1f1f"
						>
							<path d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
