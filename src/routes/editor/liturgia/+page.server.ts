import type { Fallback } from '$lib/fallback.js';
import { loadState } from '$lib/loadState';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	return {
        initialState: await loadState('liturgia') as Fallback['liturgia']
	};
}

