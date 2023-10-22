
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
