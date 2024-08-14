<script lang="ts">
	import { websocketStore } from '$lib/websocketStore2';
	import { fallback } from '$lib/fallback';
	import { onMount } from 'svelte';
	import { drawCanvas } from './drawThumbnail';
	import background from '$lib/canvas-background.webp';

	const liturgia = websocketStore('liturgia', fallback['liturgia']);
	// podia usar action? podia
	let canvas: HTMLCanvasElement;
	// TODO: copiar aquele código regex + salvar thumbnail + copiar pra clipboard

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
		const unsubscribe = liturgia.subscribe((newValue) => {
			drawCanvas(
				canvas,
				{ top: 'ih', main: newValue.nome, bottom: 'ala' },
				{ background: bg },
				false
			);
		});
		return unsubscribe;
	});
</script>

<main>
	<h1>thumbnail</h1>
	<p>aqui tem que copiar de volta o código de lá e deixar o estilo igual</p>
	<canvas width="1920" height="1080" bind:this={canvas} />

	<div class="details">
		{$liturgia.nome} | {new Date().toDateString()}
	</div>

	<input type="text" name="" id="a" bind:value={$liturgia.nome} />
</main>

<style>
	canvas {
		width: 960px;
		border: 1px solid gray;
		background-color: green;
	}
</style>
