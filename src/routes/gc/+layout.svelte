<script lang="ts">	
	import { onMount } from 'svelte';
	import { colors } from '$lib/GCBackgroundColor';
	import { websocketStore as websocketStore2, fallback } from '$lib/websocketStore2';

	const store = websocketStore2('liturgia', fallback.liturgia);

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
