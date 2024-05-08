<script>
	import { fallback } from '$lib/fallback';
	import { websocketStore } from '$lib/websocketStore2';

	const lower_thirds = websocketStore('lower-third-items', fallback['lower-third-items']);
</script>

<main>
	<h1>editor gc</h1>
	<p>copiar tema do OBS etc</p>

	<div class="blocks">
		{#each $lower_thirds as theThing}
			<div class="thething">
				{#if theThing.layout === 'default'}
					<input type="text" bind:value={theThing.props.top} />
					<textarea bind:value={theThing.props.bottom} />
				{:else}
					<p>{theThing.layout}</p>
				{/if}
                <button>Mostar na tela</button>
			</div>
		{/each}
	</div>
</main>

<style>
	.thething {
		display: flex;
		flex-direction: column;
	}
</style>
