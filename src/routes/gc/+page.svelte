<script lang="ts">
	import Standard from './Standard.svelte';
	import Oferta from './Oferta.svelte';
	import Comunhão from './Comunhão.svelte';
	import Debug from '$lib/Debug.svelte';

	import { websocketStore, fallback } from '$lib/websocketStore';
	const lt_display = websocketStore('lower-third-display', fallback['lower-third-display']);

	function clearLowerThird() {
		$lt_display = { id: '_none', layout: 'none', props: { top: '', bottom: '', duration: 0 } };
	}
</script>

<main>
	<Debug data={$lt_display} />

	{#if $lt_display.layout === 'default'}
		<Standard {...$lt_display.props} />
	{/if}

	{#if $lt_display.layout === 'ofertório'}
		<Oferta />
	{/if}

	{#if $lt_display.layout === 'comunhão'}
		<Comunhão on:end={clearLowerThird} />
	{/if}
</main>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
</style>
