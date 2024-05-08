<script lang="ts">
	import { fallback } from '$lib/fallback';
	import { websocketStore } from '$lib/websocketStore2';
	import type { PageData } from './$types';

    export let data: PageData;

	const lower_thirds = websocketStore('lower-third-items', data.initialState);
	const display = websocketStore('lower-third-display', fallback['lower-third-display']);
    const no_display = {
		id: '_none',
		layout: 'none',
		props: { top: '', bottom: '', duration: 0 }
	}

    function setDisplay(toDisplay: any) {
        $display = toDisplay;
    }
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
                <button on:click={() => setDisplay(theThing)}>Mostar na tela</button>
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
