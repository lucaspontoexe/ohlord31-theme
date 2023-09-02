<script lang="ts">
	import { cor } from '$lib/GCBackgroundColor';

	$: {
		globalThis.document?.documentElement.style.setProperty('--bg-color', $cor);
	}
</script>

<slot />

<style>
	:global(body) {
		margin: 0px;
		padding: 0px;
	}

	:root {
		--bg-color: rgb(97, 87, 43);
	}
</style>
