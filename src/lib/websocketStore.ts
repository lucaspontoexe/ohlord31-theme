// vale o lembrete: isso aqui é um port bem gambiarra da versão anterior do projeto

// import type {RequestNames, SocketEvents} from '$types/Events';

import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const reopenTimeouts = [2000, 5000, 10000, 15000, 30000, 45000, 60000];

interface Subscription {
	interestedScope: string;
	subscription: any;
}

interface ServerResponse {
	type: string;
	scope: string;
	payload: any;
}

interface AppStateResponse extends ServerResponse {
	type: 'app-state';
	payload: Record<string, unknown>;
}

const socketAddress = `ws://${location.hostname}:3000/`;

// dexar o socket aqui por fora garante um instância por janela,
// não importa quantos objetos estejam usando
let socket: WebSocket | undefined;

try {
	socket = new WebSocket(socketAddress);
} catch (error) {
	console.warn('tem que iniciar o servidor, né?');
}

// subscriptions fica por fora também:
// agora a lib funciona do jeito que tem que ser.
const subscriptions = new Set<Subscription>();

let localAppState = new Map<string, unknown>();

export function websocketStore<InitialType>(scope: string, initialValue: InitialType) {
	let openPromise: Promise<void> | undefined,
		reopenTimeoutHandler: ReturnType<typeof setTimeout> | undefined;
	let reopenCount = 0;

	if (!browser) return readable(initialValue);

	function reopenTimeout() {
		const n = reopenCount;
		reopenCount++;
		return reopenTimeouts[n >= reopenTimeouts.length - 1 ? reopenTimeouts.length - 1 : n];
	}

	function close() {
		if (reopenTimeoutHandler) {
			clearTimeout(reopenTimeoutHandler);
		}

		if (socket) {
			socket.close();
			socket = undefined;
		}
	}

	function reopen() {
		close();
		if (subscriptions.size > 0) {
			reopenTimeoutHandler = setTimeout(() => open(), reopenTimeout());
		}
	}

	async function open() {
		if (!socket) socket = new WebSocket(socketAddress);
		if (socket.readyState === WebSocket.OPEN) return;

		if (reopenTimeoutHandler) {
			clearTimeout(reopenTimeoutHandler);
			reopenTimeoutHandler = undefined;
		}

		// we are still in the opening phase
		if (openPromise) {
			return openPromise;
		}

		socket.onmessage = (event) => {
			// initialValue = JSON.parse(event.data);
			const incomingData: ServerResponse = JSON.parse(event.data);

			console.log('chegou evento', incomingData.type);
			// por exemplo: switch data.type; set-seate:
			switch (incomingData.type) {
				// update value for every subscriber that matches the scope
				case 'set-state':
					subscriptions.forEach((item) => {
						item.interestedScope === incomingData.scope && item.subscription(incomingData.payload);
					});
					// save to local app state
					localAppState.set(incomingData.scope, incomingData.payload);
					break;

				case 'app-state':
					// only overwrite the initial value if it's present in appState
					subscriptions.forEach((item) => {
						item.interestedScope in (incomingData as AppStateResponse).payload &&
							item.subscription(incomingData.payload[item.interestedScope]);
					});

					// save app state locally

					incomingData.payload;
					break;

				case 'response':
					// faz nada, deixa acontecer
					break;

				default:
					console.warn('got unexpected type. data is:', incomingData);
					break;
			}
		};

		socket.onclose = () => reopen();

		openPromise = new Promise<void>((resolve, reject) => {
			socket!.onerror = (error) => {
				reject(error);
				openPromise = undefined;
			};
			socket!.onopen = () => {
				reopenCount = 0;
				resolve();
				openPromise = undefined;
			};
		});
		return openPromise;
	}

	return {
		// acho que vale a pena reforçar pra não fazer a gambiarra de mudar o tipo inicial do objeto
		set(value: typeof initialValue) {
			const send = () => socket?.send(JSON.stringify({ type: 'set-state', scope, payload: value }));
			open().then(send);
		},
		update(callback: (arg0: {} | InitialType) => any) {
			const newValue = callback(localAppState.get(scope) ?? initialValue);
			this.set(newValue);
		},
		subscribe(subscription: (value: typeof initialValue) => void) {
			open();
			subscription(
				localAppState.has(scope) ? (localAppState.get(scope) as InitialType) : initialValue
			);
			const newSubscription: Subscription = { interestedScope: scope, subscription };
			subscriptions.add(newSubscription);
			// console.log('now we have', subscriptions.size, 'subscribers');
			return () => {
				subscriptions.delete(newSubscription);
				if (subscriptions.size === 0) {
					close();
				}
			};
		}
	};
}

export default websocketStore;

// fallback enquanto a conexão não é feita e os dados de verdade vêm do server
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
		id: 'H3sR4DXiDA',
		layout: 'default',
		props: { top: 'Oração da Assembleia', bottom: 'funciona', duration: 0 }
	}
};
