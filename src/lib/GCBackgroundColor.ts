// foi bom, mas esse arquivo tá sem uso. tá tudo no arquivo /routes/gc/+layout.svelte
import { readable } from 'svelte/store';
import { websocketStore } from '$lib/websocketStore2';
import { fallback } from './fallback';

const store = websocketStore('liturgia', fallback.liturgia);

// prettier-ignore
export const gradients: Record<string,string> = {
	verde:      'background: linear-gradient(to bottom, rgba(47, 68,  0, 0) 0%, rgba(47, 68,  0, 1) 100%)',
	roxo:       'background: linear-gradient(to bottom, rgba(49, 47, 89, 0) 0%, rgba(49, 47, 89, 1) 100%)',
	vermelho:   'background: linear-gradient(to bottom, rgba(97, 43, 43, 0) 0%, rgba(97, 43, 43, 1) 100%)',
	branco:     'background: linear-gradient(to bottom, rgba(97, 87, 43, 0) 0%, rgba(97, 84, 43, 1) 100%)'
};

// prettier-ignore
export const colors: Record<string,string> = {
	verde:      'rgb(47, 68,  0)',
	roxo:       'rgb(49, 47, 89)',
	vermelho:   'rgb(97, 43, 43)',
	branco:     'rgb(97, 87, 43)'
}

export const cor = readable('rgb(97, 87, 43)', function start(set) {
	const unsubscribe = store.subscribe(({ cor }) => set(colors[cor.toLowerCase()] ?? cor));
	return unsubscribe;
});

export const cssBackground = readable('Branco', function start(set) {
	const unsubscribe = store.subscribe(({ cor }) => set(gradients[cor.toLowerCase()] ?? cor));
	return unsubscribe;
});
