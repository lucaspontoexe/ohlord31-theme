import { loadState } from '$lib/loadState.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	return {
        initialState: await loadState('lower-third-items')
	};
}