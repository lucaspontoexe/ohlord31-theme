<script lang="ts">
	import { fade } from "svelte/transition";
	import {websocketStore, fallback} from "$lib/websocketStore";

	export let top = "";
    export let bottom = "";
    // tem que ver como a gente vai como a gente vai controlar esse timing.
    // export let duration = 0; 
	const liturgia = websocketStore('liturgia', fallback.liturgia);
</script>

	<div class="lowerthird cl-{$liturgia.cor?.toLowerCase()}" transition:fade={{duration: 1000, delay: 200}}>
		<div class="title-top">{top}</div>
		<div class="line" />   <!-- ---------------- -->
		<div class="title-bottom">{bottom}</div>
	</div>

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

        // background: linear-gradient(to bottom, rgba(47, 68, 0, 0) 0%,rgba(47, 68, 0, 100%))
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
</style>

