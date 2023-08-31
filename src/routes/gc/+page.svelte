<script lang="ts">
	import Standard from './Standard.svelte';
	import qr_pix from '$lib/qr_pix.png';

	import { websocketStore, fallback } from '$lib/websocketStore';

	const lt_display = websocketStore('lower-third-display', fallback['lower-third-display']);
</script>

<main>
	<div class="debug">{JSON.stringify($lt_display, null, 4)}</div>

	{#if $lt_display.layout === 'default'}
		<Standard {...$lt_display.props} />
	{/if}

	{#if $lt_display.layout === 'ofertório'}
		<div class="pix">
			<!-- por que não só colocar a imagem png aqui? -->
			<div class="qrcode-container">
				<img src="{qr_pix}" alt="código qr" />
			</div>
			<div class="text">
				<div class="headline">Faça sua oferta!</div>
				<div class="line">linha 2</div>
				<div class="line">linha 3</div>
			</div>
		</div>
	{/if}

	{#if $lt_display.layout === 'comunhão'}
		<div class="comunhão">(comunhão espiritual placeholder)</div>
	{/if}
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

	.pix {
		display: flex;
		flex-direction: row;
		
		padding-left: 5vw;
		padding-bottom: 5vh;
		padding-top: 7em;
		gap: 2em;
		
		background: linear-gradient(4deg, #000000 -5%, rgba(0, 0, 0, 0) 60%);
		filter: $font-shadow-filter;

		.headline {
			@include headline;
			font-size: 3em;
		}

		img {
			border-radius: 5px;
		}

		.line {
			color: white;
			font-family: 'Lora';
			font-size: 2em;
		}
	}

	.debug {
		position: fixed;
		top: 0px;
	}
</style>
