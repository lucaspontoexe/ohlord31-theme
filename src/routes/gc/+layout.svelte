<script lang="ts">
	import { onMount } from 'svelte';
	import { websocketStore } from '$lib/websocketStore2';
	import { fallback } from '$lib/fallback';

	const store = websocketStore('liturgia', fallback.liturgia);

	// prettier-ignore
	const lowerThirdColors: Record<string,string> = {
	verde:      'rgb(47, 68,  0)',
	roxo:       'rgb(49, 47, 89)',
	vermelho:   'rgb(97, 43, 43)',
	branco:     'rgb(97, 87, 43)',
	rosa: 		'rgb(155, 105, 135)',
}

	onMount(() => {
		const unsubscribe = store.subscribe(({ cor }) =>
			globalThis.document?.documentElement.style.setProperty(
				'--lowerthird-bg-color',
				lowerThirdColors[cor.toLowerCase()] ?? cor
			)
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
