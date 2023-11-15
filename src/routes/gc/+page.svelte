<script lang="ts">
	import Standard from './Standard.svelte';
	import Oferta from './Oferta.svelte';
	import Comunhão from './Comunhão.svelte';
	// import Debug from '$lib/Debug.svelte';
	import logoColor from '$lib/logo-color-png-crop.png';
	// import logoCinza from '$lib/logo-png-square-crop.png';
	import { websocketStore } from '$lib/websocketStore2'	
	import { fallback } from '$lib/fallback';
	
	import { onMount } from "svelte";

	import { fade } from 'svelte/transition';
	const lt_display = websocketStore('lower-third-display', fallback['lower-third-display']);

	function clearLowerThird() {
		$lt_display = { id: '_none', layout: 'none', props: { top: '', bottom: '', duration: 0 } };
	}

	// debug que deixaria macgyver de queixo caído
	onMount(() => {setTimeout(() => console.log(lt_display), 15000)});
</script>

<main>
	<!-- <Debug data={$lt_display} /> -->

	{#if $lt_display.layout === 'default'}
		<Standard {...$lt_display.props} />
	{/if}

	{#if $lt_display.layout === 'ofertório'}
		<Oferta />
	{/if}

	{#if $lt_display.layout === 'comunhão'}
		<Comunhão on:end={clearLowerThird} />
	{/if}

	{#if $lt_display.layout === 'socials'}
		<img src={logoColor} alt="logo colorida" class="logo" transition:fade />
	{/if}

	<!-- essa logo poderia facilmente ser uma source no OBS -->
	<!-- <img src={logoCinza} alt="logo cinza" class="logo" /> -->
</main>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.logo {
		position: fixed;
		right: 5vw;
		bottom: 5vh;
	}
</style>
