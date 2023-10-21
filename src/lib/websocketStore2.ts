/**
 * 
 *antes de qualquer coisa:

 - é uma svelte store pra sincronizar via websocket
 - o objeto que retorna da função tem aqueles métodos pra virar store
 - uma única conexão por janela (mas se não tiver como, não tem problema)


 */

import { browser } from '$app/environment';
import { readable } from 'svelte/store';
const socketAddress = `ws://${browser ? location.hostname : 'localhost'}:3000/`;
let socket: WebSocket | undefined;

const subscribers = new Map<string, Set<any>>();
const localAppState = new Map<string, unknown>();

function createSocketAgoraVai() {
	if (socket?.readyState === WebSocket.CONNECTING || socket?.readyState === WebSocket.OPEN) return;
	console.log('mais um socket criado');

	try {
		socket = new WebSocket(socketAddress);

		socket.onerror = (event) => {
			handleError(event);
			return;
		};
		//socket.onclose => reopen
		socket.onmessage = handleMessage;
	} catch (error) {
		handleError(error);
		return;
	}

	function handleError(error: unknown) {
		console.error('ws error', error);
		socket = undefined;
		setTimeout(createSocketAgoraVai, 5000);
	}
}

function handleMessage(event: MessageEvent) {
	// suponhamos que ninguém mande probleminha no json
	const incomingData = JSON.parse(event.data);

	console.log('acabou de aparecer o evento', incomingData.type);
	switch (incomingData.type) {
		case 'app-state':
			Object.entries(incomingData.payload).forEach(([scope, value]) => {
				// save to local state
				localAppState.set(scope, value);

				// rodar callback de subscription com os valores do appstate
				// em português: chegou app-state novo, é pra notificar todo mundo
				subscribers.get(scope)?.forEach((callback) => callback(value));
			});
			break;

		case 'set-state':
			subscribers.get(incomingData.scope)?.forEach((callback) => callback(incomingData.payload));
			localAppState.set(incomingData.scope, incomingData.payload);
			break;

		default:
			break;
	}
}

function sendMessage(value: any) {
	const string = JSON.stringify(value);
	socket?.send(string);
	// if !socket,  reconnect or recreate connection. precisa?
}

export function websocketStore<InitialType>(scope: string, initialValue: InitialType) {
	if (!browser) return readable(initialValue);
	createSocketAgoraVai();

	return {
		set(value: InitialType) {
			sendMessage({ type: 'set-state', scope, payload: value });
		},

		subscribe(callback: (value: typeof initialValue) => void) {
			callback(initialValue);
			if (!subscribers.has(scope)) subscribers.set(scope, new Set());
			subscribers.get(scope)?.add(callback);

			return function unsubscribe() {
				subscribers.get(scope)?.delete(callback);
				if (subscribers.size === 0) subscribers.delete(scope);
			};
		}
	};
}

export const fallback = {
	liturgia: {
		nome: 'São João Maria Vianney - Memória',
		cor: 'Branco',
		leituras: [
			{ nome: '1ª Leitura', referencia: 'Lv 23,1.4-11.15-16.27.34b-37' },
			{
				nome: 'Salmo Responsorial',
				referencia: 'Sl 80',
				descricao: 'Exultai no Senhor, nossa força.'
			},
			{ nome: 'Evangelho', referencia: 'Mt 13,54-58' }
		],
		savedAt: 1691204445991
	},
	'lower-third-items': [
		{
			id: '7_o3qPjcN',
			layout: 'default',
			props: { top: '1ª Leitura', bottom: 'Lv 23,1.4-11.15-16.27.34b-37', duration: 0 }
		},
		{
			id: 'CKSXzlF5u5',
			layout: 'default',
			props: {
				top: 'Salmo Responsorial: Sl 80',
				bottom: 'Exultai no Senhor, nossa força.',
				duration: 0
			}
		},
		{
			id: '7IvnO9A5JO',
			layout: 'default',
			props: { top: 'Evangelho', bottom: 'Mt 13,54-58', duration: 0 }
		},
		{
			id: 'H3sR4DXiDA',
			layout: 'default',
			props: { top: 'Oração da Assembleia', bottom: 'funciona', duration: 0 }
		},
		{ id: 'ooXyGOADzw', layout: 'ofertório', props: { duration: 0 } },
		{ id: 'W56IHNTYGg', layout: 'comunhão', props: {} }
	],
	'idle-screen-slides': [
		{
			id: 'default_0',
			layout: 'title',
			props: {
				main: 'Já vamos começar!',
				bottom: 'A celebração terá início\nem instantes.',
				duration: 5000,
				background_url: '/background/panorama-altar.webp'
			}
		},
		{
			id: 'default_1',
			layout: 'liturgia',
			props: { duration: 10000, background_url: '/background/flor-do-lado.jpg' }
		}
	],
	'lower-third-display': {
		id: '_none',
		layout: 'none',
		props: { top: 'Oração da Assembleia', bottom: 'funciona', duration: 0 }
	}
};
