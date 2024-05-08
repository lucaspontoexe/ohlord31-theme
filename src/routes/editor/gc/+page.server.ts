
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	return {
        initialState: await fetch('http://localhost:3000/api/state/lower-third-items').then(r => r.json())
	};
}