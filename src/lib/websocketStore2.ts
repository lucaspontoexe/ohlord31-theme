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

function createSocket() {
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
		setTimeout(createSocket, 5000);
	}
}

function handleMessage(event: MessageEvent) {
	// suponhamos que ninguém mande probleminha no json
	const incomingData = JSON.parse(event.data);

	console.log('acabou de aparecer o evento', incomingData.type);
	switch (incomingData.type) {
		case 'app-state':
			Object.entries(incomingData.payload).forEach(([key, value]) => {
				// save to local state
				localAppState.set(key, value);

				// rodar callback de subscription com os valores do appstate
				// em português: chegou app-state novo, é pra notificar todo mundo
				subscribers.get(key)?.forEach((callback) => callback(value));
			});
			break;

		case 'set-state':
			const {scope: key, payload: value} = incomingData;

			localAppState.set(key, value);
			subscribers.get(key)?.forEach((callback) => callback(value));
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
	createSocket();

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
				if (subscribers.get(scope)?.size === 0) subscribers.delete(scope);
				// if (subscribers.size === 0) endWSConnection
			};
		}
	};
}