<script lang="ts">
	import { dev } from '$app/environment';
	export let data: any;
</script>

{#if dev}
	<pre class="debug">{JSON.stringify(data, null, 4)}</pre>
{/if}

<style lang="scss">
	pre.debug {
		position: fixed;
		background-color: rgba(black, 0.25);
		color: white;
		top: 20px;
		left: 20px;
		z-index: 1;
	}
</style>
