<script lang="ts">
	import Standard from './Standard.svelte';
	import Oferta from './Oferta.svelte';

	import { websocketStore, fallback } from '$lib/websocketStore';
	import { fade, fly } from 'svelte/transition';
	const lt_display = websocketStore('lower-third-display', fallback['lower-third-display']);
</script>

<main>
	<div class="debug">{JSON.stringify($lt_display, null, 4)}</div>

	{#if $lt_display.layout === 'default'}
		<Standard {...$lt_display.props} />
	{/if}

	{#if $lt_display.layout === 'ofertório'}
		<Oferta />
	{/if}

	{#if $lt_display.layout === 'comunhão'}
		<div class="comunhão" in:fly={{ x: -20, duration: 2000 }} out:fade={{ duration: 1000 }}>
			<header>
				<div class="headline">Comunhão Espiritual</div>
				<div class="description">
					As pessoas que não podem comungar,
					<br />façam agora a comunhão espiritual.
				</div>
			</header>

			<div class="text-wrapper">
				<div class="moving-text">
					<p>
						Oh meu Jesus, creio que estás verdadeiramente presente no Santíssimo Sacramento do
						altar.
					</p>
					<p>Amo-te acima de todas as coisas <br /> e desejo-te na minha alma.</p>

					<p>
						Dado que agora não te posso receber sacramentalmente, vem pelo menos espiritualmente ao
						meu coração.
					</p>

					<p>Como se estivesses já aqui, <br /> abraço-te e uno-me totalmente a ti.</p>
					<p>Nunca permitais que me separe de ti!</p>
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="scss">
	/* body já tá sem margin/padding */
	$font-shadow-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
	.debug {
		position: fixed;
		top: 0px;
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

	.comunhão {
		width: 50vw;
		height: 100vh;
		padding: 5vh;
		text-align: center;
		display: flex;
		flex-direction: column;

		background: linear-gradient(to right, var(--lowerthird-bg-color) 0%, rgba(0, 0, 0, 0) 100%);

		.headline {
			@include headline;
			font-size: 4em;
		}

		.description {
			@include subtitle;
			font-size: 2em;
		}

		p {
			font-family: 'Lora', serif;
			color: white;
			font-size: 4vh;
		}

		.text-wrapper {
			margin: auto;
		}

		.headline,
		.description,
		.text-wrapper {
			filter: $font-shadow-filter;
		}
	}
</style>
