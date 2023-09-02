<script lang="ts">
	import Standard from './Standard.svelte';
	import Oferta from './Oferta.svelte';
	import Comunhão from './Comunhão.svelte';

	import { websocketStore, fallback } from '$lib/websocketStore';
	const lt_display = websocketStore('lower-third-display', fallback['lower-third-display']);
</script>

<main>
	<div class="debug">{JSON.stringify($lt_display, null, 4)}</div>

	{#if $lt_display.layout === 'default'}
		<Standard {...$lt_display.props} />
	{/if}

	{#if $lt_display.layout === 'ofertório'}
		<Oferta />
	{/if}

	{#if $lt_display.layout === 'comunhão'}
		<Comunhão />
	{/if}
</main>

<style lang="scss">
	/* body já tá sem margin/padding */
	$font-shadow-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
	.debug {
		position: fixed;
		top: 0px;
	}

	main {
		/* cor pro debug, apagar depois */
		// background-color: black;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
</style>
