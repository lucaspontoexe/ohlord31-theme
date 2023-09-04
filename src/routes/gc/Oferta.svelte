<script lang="ts">
	import qr_pix from '$lib/qr_pix.png';
	import { fade, fly } from 'svelte/transition';
</script>

<div class="pix" transition:fade={{ duration: 1000 }}>
	<div class="qrcode-container">
		<img src={qr_pix} alt="código qr" />
	</div>
	<div class="text">
		<div class="headline" in:fly={{ x: -20, delay: 200, duration: 600 }}>Faça sua oferta!</div>
		<div class="line" in:fly={{ x: -20, delay: 400, duration: 600 }}>Use o nosso CNPJ como chave Pix:</div>
		<div class="line" in:fly={{ x: -20, delay: 600, duration: 600 }}>(cnpj aqui)</div>
	</div>
</div>

<style lang="scss">
	/* body já tá sem margin/padding */
	$font-shadow-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));

	.pix {
		display: flex;
		flex-direction: row;

		padding-left: 5vw;
		padding-bottom: 5vh;
		padding-top: 7em;
		gap: 2em;

		background: linear-gradient(4deg, var(--lowerthird-bg-color) -5%, rgba(0, 0, 0, 0) 60%);
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
</style>
