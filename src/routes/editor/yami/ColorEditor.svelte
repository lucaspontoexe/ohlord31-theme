<script lang="ts">
	export let cor = '';
	import { lowerThirdColors } from '$lib/LowerThirdColors';
	const test1 = Object.keys(lowerThirdColors);
</script>

<div class="color-editor">
	{#each test1 as cor1}
		<input type="radio" name="cor" value={cor1} bind:group={cor} />
	{/each}
	<input type="color" name="cor" id="cl" />
</div>

<div class="test2">
	{#each Object.values(lowerThirdColors) as cor2}
		<div class="cor2" style="background-color: {cor2};">aaaa</div>
	{/each}
</div>

<div class="test3a">
	<label class="test3b">
		<input type="radio" name="test3" id="test3" /> <span>olha lá</span>
	</label>
    <label class="test3b">
		<input type="radio" name="test3" id="test3" /> <span>olha lá</span>
	</label>
</div>

<style>

    .test3b {
        box-sizing: border-box;
        background-color: blue;
        margin: 0.5em;
        padding: 1em;
    }
</style>