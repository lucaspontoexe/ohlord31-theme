import type { Fallback } from '$lib/fallback.js';
import { loadState } from '$lib/loadState.js';

export async function load({ params, fetch }) {
	return {
        initialState: await loadState('lower-third-items') as Fallback['lower-third-items']
	};
}