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

	<div class="block">
		{#each $lower_thirds as lt}
			<div class="thething">
				{#if lt.layout === 'default'}
					<input type="text" bind:value={lt.props.top} />
					<textarea bind:value={lt.props.bottom} />
				{:else}
					<p>{lt.layout}</p>
				{/if}

				{#if lt.id !== $display.id}
					<button on:click={() => ($display = lt)}>Mostar na tela</button>
				{:else}
					<button on:click={() => ($display = no_display)}>ih, sumiu</button>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.block {
		width: 100%;
		max-width: 600px;
		box-sizing: border-box;
		margin-bottom: 1em;
	}

	textarea {
		line-height: 1.2em;
		resize: vertical;
		min-height: 3.2em;
		max-height: 50vh;
	}

	.thething {
		display: flex;
		flex-direction: column;
		margin-bottom: 1em;
	}
</style>
