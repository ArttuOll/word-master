﻿export default function Instructions() {
	return (
		<>
			<h2 className="font-bold text-md">Arvaa, mikä sana on kyseessä!</h2>
			<ul className="list-disc px-2">
				<li>Kirjoita sana riville ja paina tarkista.</li>
				<li>
					<span className="rounded bg-neutral-500 p-0.25 text-white">
						Harmaa
					</span>
					väri tarkoittaa, että kirjain on väärä.
				</li>
				<li>
					<span className="rounded bg-green-700 p-0.25 text-white">Vihreä</span>{" "}
					tarkoittaa, että kirjain on oikeassa kohdassa sanaa.
				</li>
				<li>
					<span className="rounded bg-yellow-500 p-0.25 text-black">
						Keltainen
					</span>
					tarkoittaa, että kirjain on sanassa, mutta väärässä kohdassa.
				</li>
			</ul>
		</>
	);
}
