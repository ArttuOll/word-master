"use client";

import { useEffect } from "react";
import { useLocalStorage } from "~/app/useLocalStorage";

export function useTimer(stop = false) {
	const [seconds, setSeconds] = useLocalStorage("seconds", 0);
	const [minutes, setMinutes] = useLocalStorage("minutes", 0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prevSeconds) => {
				if (prevSeconds === 59) {
					setMinutes((prevMinutes) => prevMinutes + 1);
					return 0;
				}
				return prevSeconds + 1;
			});
		}, 1000);

		if (stop) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [setMinutes, setSeconds, stop]);

	const secondsString = seconds.toLocaleString("fi-FI", {
		style: "unit",
		unit: "second",
	});
	const minutesString = minutes.toLocaleString("fi-FI", {
		style: "unit",
		unit: "minute",
	});

	return [secondsString, minutesString] as const;
}
