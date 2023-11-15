<script lang="ts">	
	import { onMount } from 'svelte';
	import { colors } from '$lib/GCBackgroundColor';
	import { websocketStore } from '$lib/websocketStore2';
	import { fallback } from '$lib/fallback';

	const store = websocketStore('liturgia', fallback.liturgia);

	onMount(() => {
		const unsubscribe = store.subscribe(({ cor }) =>
			globalThis.document?.documentElement.style.setProperty('--lowerthird-bg-color', colors[cor.toLowerCase()] ?? cor)
		);
		return unsubscribe;
	});
</script>

<slot />

<style>
	:global(body) {
		margin: 0px;
		padding: 0px;
	}

	:root {
		--lowerthird-bg-color: rgb(97, 87, 43);
	}
</style>
