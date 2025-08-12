import type { Ref } from "react";
import WordMasterButton from "~/app/components/WordMasterButton";

export default function Dialog({
	ref,
	children,
}: {
	ref: Ref<HTMLDialogElement>;
	children?: string;
}) {
	return (
		<dialog
			ref={ref}
			className="self-center justify-self-center rounded-md p-4 align-center shadow-xl"
		>
			<div className="flex flex-col items-center justify-items-center gap-4 ">
				<p className="text-xl">{children}</p>
				<div className="flex w-full justify-center gap-4">
					<WordMasterButton
						type="button"
						autoFocus
						onClick={() => window.location.reload()}
					>
						Pelaa uudelleen
					</WordMasterButton>
				</div>
			</div>
		</dialog>
	);
}
