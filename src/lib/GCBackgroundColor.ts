import { readable } from 'svelte/store';
import websocketStore, { fallback } from './websocketStore';

const store = websocketStore('liturgia', fallback.liturgia);

const gradients: Record<string,string> = {
	Verde:      'background: linear-gradient(to bottom, rgba(47, 68,  0, 0) 0%, rgba(47, 68,  0, 1) 100%);',
	Roxo:       'background: linear-gradient(to bottom, rgba(49, 47, 89, 0) 0%, rgba(49, 47, 89, 1) 100%);',
	Vermelho:   'background: linear-gradient(to bottom, rgba(97, 43, 43, 0) 0%, rgba(97, 43, 43, 1) 100%);',
	Branco:     'background: linear-gradient(to bottom, rgba(97, 87, 43, 0) 0%, rgba(97, 84, 43, 1) 100%);'
};

export const cor = readable('Branco', function start(set) {
	const unsubscribe = store.subscribe(({ cor }) => set(cor.toLowerCase()));
	return unsubscribe;
});

export const cssBackground = readable('Branco', function start(set) {
	const unsubscribe = store.subscribe(({ cor }) => set(gradients[cor] ?? cor));
	return unsubscribe;
});
