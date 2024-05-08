import { fallback } from '$lib/fallback';

// função usada no server pra carregar a página com o state pronto

export async function loadState(scope: string): Promise<any> {
	let data;
	try {
		data = await fetch('http://localhost:3000/api/state/' + scope).then(r => r.json());
		return data;
	} catch (error) {
		console.error(error);
		return (fallback[scope]) || undefined;
	}
}
