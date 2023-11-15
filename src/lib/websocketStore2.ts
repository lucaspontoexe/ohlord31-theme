// reimplementação da websocket store. 
// reescrita na mão, sem o "port gambiarra".


import { browser } from '$app/environment';
import { readable } from 'svelte/store';
const socketAddress = `ws://${browser ? location.hostname : 'localhost'}:3000/`;
let socket: WebSocket | undefined;

type subscriberCallback = ((value: any) => void);
const subscribersByKey = new Map<string, Set<subscriberCallback>>();
const localAppState = new Map<string, unknown>();

function createSocket() {
	if (socket?.readyState === WebSocket.CONNECTING || socket?.readyState === WebSocket.OPEN) return;
	
	try {
		socket = new WebSocket(socketAddress);
		console.log('mais um socket criado');

		socket.onerror = (event) => {
			handleError(event);
			return;
		};
		socket.onclose = () => setTimeout(createSocket, 5000);
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
				subscribersByKey.get(key)?.forEach((callback) => callback(value));
			});
			break;

		case 'set-state':
			const {scope: key, payload: value} = incomingData;

			localAppState.set(key, value);
			subscribersByKey.get(key)?.forEach((callback) => callback(value));
			break;

		default:
			console.warn('apareceu um evento desconhecido.', incomingData)
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
			if (!subscribersByKey.has(scope)) subscribersByKey.set(scope, new Set());
			subscribersByKey.get(scope)?.add(callback);

			return function unsubscribe() {
				subscribersByKey.get(scope)?.delete(callback);
				if (subscribersByKey.get(scope)?.size === 0) subscribersByKey.delete(scope);
				// if (subscribers.size === 0) endWSConnection
			};
		}
	};
}