<script lang="ts">
	import { websocketStore } from '$lib/websocketStore2';
	import {fallback} from '$lib/fallback';
	import { onMount } from 'svelte';
	import { drawCanvas } from './drawThumbnail';

	const liturgia = websocketStore('liturgia', fallback['liturgia']);
	// podia usar action? podia
	let canvas: HTMLCanvasElement;
	const theTitle = { top: 'aaaa', main: 'bbb', bottom: 'cccc' };
	// TODO: copiar aquele código regex + salvar thumbnail + copiar pra clipboard
	onMount(() => {
		drawCanvas(canvas, theTitle, { background: new Image() }, true);
		const unsubscribe = liturgia.subscribe(newValue => {
			drawCanvas(canvas, {top: 'ih', main: newValue.nome, bottom: 'ala'}, { background: new Image() }, true);
		})
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
