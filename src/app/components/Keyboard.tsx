import CharacterButton from "~/app/components/CharacterButton";

export default function Keyboard({
	onKeyPress,
}: {
	onKeyPress: (key: string) => void;
}) {
	return (
		<div className="col-span-full">
			<div className="flex grow gap-0.5">
				<CharacterButton character="Q" onClick={onKeyPress} />
				<CharacterButton character="W" onClick={onKeyPress} />
				<CharacterButton character="E" onClick={onKeyPress} />
				<CharacterButton character="R" onClick={onKeyPress} />
				<CharacterButton character="T" onClick={onKeyPress} />
				<CharacterButton character="Y" onClick={onKeyPress} />
				<CharacterButton character="U" onClick={onKeyPress} />
				<CharacterButton character="I" onClick={onKeyPress} />
				<CharacterButton character="O" onClick={onKeyPress} />
				<CharacterButton character="P" onClick={onKeyPress} />
				<CharacterButton character="Å" onClick={onKeyPress} />
			</div>
			<div className="flex grow gap-0.5">
				<CharacterButton character="A" onClick={onKeyPress} />
				<CharacterButton character="S" onClick={onKeyPress} />
				<CharacterButton character="D" onClick={onKeyPress} />
				<CharacterButton character="F" onClick={onKeyPress} />
				<CharacterButton character="G" onClick={onKeyPress} />
				<CharacterButton character="H" onClick={onKeyPress} />
				<CharacterButton character="J" onClick={onKeyPress} />
				<CharacterButton character="K" onClick={onKeyPress} />
				<CharacterButton character="L" onClick={onKeyPress} />
				<CharacterButton character="Ö" onClick={onKeyPress} />
				<CharacterButton character="Ä" onClick={onKeyPress} />
			</div>
			<div className="flex grow">
				<div className="flex gap-0.5">
					<CharacterButton character="Z" onClick={onKeyPress} />
					<CharacterButton character="X" onClick={onKeyPress} />
					<CharacterButton character="C" onClick={onKeyPress} />
					<CharacterButton character="V" onClick={onKeyPress} />
					<CharacterButton character="B" onClick={onKeyPress} />
					<CharacterButton character="N" onClick={onKeyPress} />
					<CharacterButton character="M" onClick={onKeyPress} />
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
