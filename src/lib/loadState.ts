import { fallback, type Fallback } from '$lib/fallback';
// type ValueOf<T> = T[keyof T];

// função usada no server pra carregar a página com o state pronto
export async function loadState(scope: keyof Fallback) {
	let data = fallback[scope];
	try {
		data = await fetch('http://localhost:3000/api/state/' + scope).then((r) => r.json());
		return data;
	} catch (error) {
		console.error(error);
		return fallback[scope] || undefined;
	}
}
