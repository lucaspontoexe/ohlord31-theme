<script lang="ts">
	import { fade } from "svelte/transition";
	import websocketStore from "$lib/websocketStore";

	let toggle = false;

	let fallback = {"id":"Rjo1970Iz","layout":"_none","props":{"top":"1ª Leitura","bottom":"Zc 9,9-10","duration":0}};

	const store = websocketStore('lower-third-display', fallback);
	$: toggle = $store.layout === "default";
</script>

<main>
	<div class="debug"><input type="checkbox" name="alo" id="alo" bind:checked={toggle}></div>
	{#if toggle}
	<div class="lowerthird" transition:fade={{duration: 1000, delay: 200}}>
		<div class="title-top">{$store.props.top}</div>
		<div class="line" />   <!-- ---------------- -->
		<div class="title-bottom">{$store.props.bottom}</div>
	</div>
	{/if}

</main>

<style lang="scss">
    /* body já tá sem margin/padding */
	$font-shadow-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));

	@keyframes ala {
		from {
			transform: translateY(10px) scale(0.96);
			filter: $font-shadow-filter blur(5px);
		}
		to {
			transform: translateY(0px) scale(1);
			filter: $font-shadow-filter blur(0px);
		}
	}

	@keyframes line {
		from {clip-path: inset(0 50% 0 50%);}
		to {clip-path: inset(0);}
	}

	main {
        /* cor pro debug, apagar depois */
		// background-color: black;
		width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
	}

	.lowerthird {
        /* a gente usa a linha dos 90% como margem */
		padding-left: 5vw;
		padding-right: 5vw;
		padding-bottom: 7vh;
		padding-top: 5em;

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
		gap: 10px;

		text-align: center;

        background: linear-gradient(to bottom, rgba(47, 68, 0, 0) 0%,rgba(47, 68, 0, 100%))
	}

	.title-top {
		font-family: "Lora Italic";
		font-size: 48px;
		filter: $font-shadow-filter;
		color: white;
	}

    .line {
        height: 2px;
        /* a gente tem que ver como vai calcular/animar isso. 80% do título? quantidade de caracteres? Talvez JS neles. */
        width: 60%; 

        background-color: white;
		animation: line 2s;
    }

	.title-bottom {
		font-family: "Poppins Bold";
		font-size: 72px; // em, etc.
		white-space: pre-line;
		line-height: 1.2;
		color: $main-title-color;
		filter: $font-shadow-filter blur(0px);
		animation: ala 2s;

		will-change: contents;
	}

	.debug {
		position: fixed;
		top: 0px;
	}
</style>
