import { useFormStatus } from "react-dom";

export default function StatusIndicator({ error }: { error?: string }) {
	const { pending } = useFormStatus();

	return (
		<>
			{pending && <p aria-live="polite">Tarkistetaan vastausta...</p>}
			{error && (
				<p aria-live="polite" className="text-red-700">
					{error}
				</p>
			)}
		</>
	);
}
