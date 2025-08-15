import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useSyncExternalStore,
} from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
	const getSnapshot = () => getLocalStorageItem(key);

	const store = useSyncExternalStore(
		useLocalStorageSubscribe,
		getSnapshot,
		getLocalStorageServerSnapshot,
	);

	const setState: Dispatch<SetStateAction<T>> = (v) => {
		try {
			const nextState = v instanceof Function ? v(JSON.parse(store ?? "")) : v;

			if (nextState === undefined || nextState === null) {
				removeLocalStorageItem(key);
			} else {
				setLocalStorageItem(key, nextState);
			}
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(() => {
		if (
			getLocalStorageItem(key) === null &&
			typeof initialValue !== "undefined"
		) {
			setLocalStorageItem(key, initialValue);
		}
	}, [key, initialValue]);

	return [store ? JSON.parse(store) : initialValue, setState];
}

function dispatchStorageEvent<T>(key: string, newValue: T) {
	window.dispatchEvent(
		new StorageEvent("storage", { key, newValue: JSON.stringify(newValue) }),
	);
}

function setLocalStorageItem<T>(key: string, value: T) {
	const stringifiedValue = JSON.stringify(value);
	window.localStorage.setItem(key, stringifiedValue);
	dispatchStorageEvent(key, stringifiedValue);
}

function removeLocalStorageItem(key: string) {
	window.localStorage.removeItem(key);
	dispatchStorageEvent(key, null);
}

function getLocalStorageItem(key: string) {
	return window.localStorage.getItem(key);
}

function useLocalStorageSubscribe(callback: () => void) {
	window.addEventListener("storage", callback);
	return () => window.removeEventListener("storage", callback);
}

function getLocalStorageServerSnapshot() {
	return null;
}
