<script lang="ts">
	import { fallback } from '$lib/fallback';
	import { onMount } from 'svelte';
	import { drawCanvas } from './drawThumbnail';
	import background from '$lib/canvas-background.webp';
	import FontLoader from '$lib/FontLoader.svelte';

	const serverAddress = `http://${location.hostname}:3000/api/`;

	// podia usar action? podia
	let canvas: HTMLCanvasElement;

	let streamTitle = 'Evento | DD/MM/AAAA';
	let title = {
		top: '',
		main: 'Título',
		bottom: getDate()
	};
	let isLoaded = false;

	function getDate() {
		// conseguimos encontrar o código da versão antiva
		const now = new Date();
		const formatted = new Intl.DateTimeFormat('pt-BR', {
			dateStyle: 'long'
		}).format(now);

		// ainda vale a pena tirar o ano?
		// 0: dia, 1: "de", 2: mês, 3: "de", 4: ano;
		const splitDate = formatted.split(' ');

		// zero antes da data menor que 10
		splitDate[0] = splitDate[0].padStart(2, '0');

		return splitDate.join(' ');
	}

	function loadImage(url: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			(img.src = url), (img.onload = () => resolve(img)), (img.onerror = reject);
		});
	}

	// tem como usar await que eu tô ligado
	let bg: HTMLImageElement;
	loadImage(background).then((image) => (bg = image));

	onMount(() => {
		init().then(() => isLoaded = true);
	});

	$: isLoaded && drawCanvas(canvas, title, {background: bg});

	async function init() {
		const { nome }: (typeof fallback)['liturgia'] = await fetch(
			serverAddress + 'state/liturgia'
		).then((r) => r.json());
		// regex: após "do", "da", "de" ou vírgula,
		// seguidos de espaço, adiciona uma quebra de linha
		title.main = nome.replace(/(\bd[oae]s?|,) /, (m) => m + '\n');

		// set stream title
		const date = new Intl.DateTimeFormat('pt-BR').format(new Date());
		streamTitle = nome + ' | ' + date;

		const poppins = new FontFace(
			'PoppinsBold',
			'local("Poppins"), url("/fonts/Poppins/Poppins-Bold.ttf")'
		);
		const loraItalic = new FontFace(
			'Lora',
			'local("Lora"), url("/fonts/Lora/Lora-Italic-VariableFont_wght.ttf")'
		);
		await Promise.all([poppins.load(), loraItalic.load()]);
	}

	async function saveCanvasAsImage() {
		drawCanvas(canvas, title, { background: bg });
		const blob = await new Promise((resolve: BlobCallback) => canvas.toBlob(resolve, 'image/jpeg'));
		if (!blob) return;
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `thumbnail ${new Date().toISOString().split('T')[0]}.jpg`;
		link.click();
	}

	const copyTitle = () => navigator.clipboard.writeText(streamTitle);
</script>

<main>
	<FontLoader />
	<canvas width="1920" height="1080" bind:this={canvas} />

	<section class="config">
		<div class="block">
			<h2>Parte de cima</h2>
			<input bind:value={title.top} placeholder="parte de cima" type="text" name="top" />
		</div>
		<div class="block">
			<h2>Título principal</h2>
			<textarea
				bind:value={title.main}
				placeholder="título principal"
				name="main"
				cols="16"
				rows="3"
			/>
		</div>
		<div class="block">
			<h2>Parte de baixo</h2>
			<input bind:value={title.bottom} placeholder="parte de baixo" type="text" name="bottom" />
		</div>

		<div class="block">
			<h2>Imagem</h2>
			<button on:click={saveCanvasAsImage}>salvar imagem</button>
		</div>

		<div class="block">
			<h2>Título:</h2>
			<span>{streamTitle}</span>
			<br />
			<button on:click={copyTitle}> copiar título </button>
		</div>
	</section>
</main>

<style>
	main {
		display: flex;
		font-family: sans-serif;
		flex-wrap: wrap;
		margin: 20px;
		gap: 20px;
	}

	canvas {
		border: 1px solid gray;
		width: min(960px, 100%);
		align-self: center;
	}

	section.config {
		display: flex;
		flex-direction: column;
	}

	input,
	textarea {
		display: block;
		font-size: 1em;
		font-family: sans-serif;
		width: 100%;
	}

	.block {
		margin-bottom: 1em;
	}

	h2 {
		margin: 0.1em 0em;
		font-size: 1.2em;
	}
</style>
