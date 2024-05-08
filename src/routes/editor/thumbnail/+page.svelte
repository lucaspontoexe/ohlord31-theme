<script lang="ts">
	import { websocketStore, fallback } from '$lib/websocketStore';
	import { onMount } from 'svelte';
	import { drawCanvas } from './drawThumbnail';

	const liturgia = websocketStore('liturgia', fallback['liturgia']);
	// podia usar action? podia
	let canvas: HTMLCanvasElement;
	const theTitle = { top: 'aaaa', main: 'bbb', bottom: 'cccc' };
	onMount(() => {
		drawCanvas(canvas, theTitle, { background: new Image() }, true);
	});
</script>

<main>
	<h1>thumbnail</h1>
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
