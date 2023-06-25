<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;
</script>

<main>
	<div class="lowerthird">
		<div class="title-top">topo do rolê</div>
		<div class="line" />
		<div class="title-bottom">
			parte de baixo
			com linha dupla
		</div>
	</div>
</main>

<style lang="scss">
    /* body já tá sem margin/padding */
	$font-shadow-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));

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
		padding-bottom: 5vh;
		padding-top: 5em;

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;

		text-align: center;

        background: linear-gradient(to bottom, rgba(49, 47, 89, 0) 0%,rgba(49, 47, 89, 1) 100%);
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
    }

	.title-bottom {
		font-family: "Poppins Bold";
		font-size: 72px; // em, etc.
		white-space: pre-line;
		line-height: 1.2;
		color: $main-title-color;
		filter: $font-shadow-filter;
		// letter-spacing: 0px; //pra animação etc.
	}
</style>
