<script lang="ts">
	import { fallback, type Fallback } from '$lib/fallback';
	import { websocketStore } from '$lib/websocketStore2';
	import type { PageData } from './$types';

	export let data: PageData;
	type ts_feliz = Fallback['lower-third-display'];

	const lower_thirds = websocketStore('lower-third-items', data.initialState);
	const display = websocketStore<ts_feliz>('lower-third-display', fallback['lower-third-display']);
	const no_display = {
		id: '_none',
		layout: 'none',
		props: { top: '', bottom: '', duration: 0 }
	};
</script>

<main>
	<h1>editor gc</h1>
	<p>copiar tema do OBS etc</p>

	<section class="all-blocks">
		{#each $lower_thirds as lt}
			<div class="block">
				{#if lt.layout === 'default'}
					<input type="text" bind:value={lt.props.top} />
					<textarea bind:value={lt.props.bottom} />
				{:else}
					<p>{lt.layout}</p>
				{/if}

				{#if lt.id !== $display.id}
					<button on:click={() => ($display = lt)}>Mostar na tela</button>
				{:else}
					<button on:click={() => ($display = no_display)} class="click-to-disable">ih, sumiu</button>
				{/if}
			</div>
		{/each}
	</section>
</main>

<style lang="scss">
	@import "src/lib/yami.scss";
	
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.all-blocks {
		width: 100%;
		max-width: 600px;
		box-sizing: border-box;
		margin-bottom: 1em;
		padding: 1em 2em;
	}

	textarea {
		line-height: 1.2em;
		resize: vertical;
		min-height: 4em;
		max-height: 50vh;
	}

	.block {
		display: flex;
		flex-direction: column;
		margin-bottom: 2em;
	}
</style>
