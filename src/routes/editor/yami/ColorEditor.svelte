<script lang="ts">
    export let cor = "";
    import { lowerThirdColors } from "$lib/LowerThirdColors";
    const test1 = Object.keys(lowerThirdColors);
</script>

<div class="color-editor">
    {#each test1 as cor1}
        <input type="radio" name="cor" value="{cor1}" bind:group={cor}>
    {/each}
    <input type="color" name="cor" id="cl">
</div>
