<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	const dispatch = createEventDispatcher();
	
	onMount(() => {
		const handle = setTimeout(() => dispatch('end'), 36_000);
		return () => clearTimeout(handle);
	});
</script>

<div class="comunhão" in:fly={{ x: -20, duration: 2000 }} out:fade={{ duration: 1000 }}>
	<header>
		<div class="headline">Comunhão Espiritual</div>
		<div class="line" />
		<div class="description">
			As pessoas que não podem comungar,
			<br />façam agora a comunhão espiritual.
		</div>
	</header>

	<div class="text-wrapper">
		<div class="moving-text">
			<p>
				Oh meu Jesus, creio que estás verdadeiramente presente no Santíssimo Sacramento do altar.
			</p>
			<p>Amo-te acima de todas as coisas <br /> e desejo-te na minha alma.</p>

			<p>
				Dado que agora não te posso receber sacramentalmente, vem pelo menos espiritualmente ao meu
				coração.
			</p>

			<p>Como se estivesses já aqui, <br /> abraço-te e uno-me totalmente a ti.</p>
			<p>Nunca permitais que me separe de ti!</p>
		</div>
	</div>
</div>

<style lang="scss">
	/* body já tá sem margin/padding */
	$font-shadow-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));

	.comunhão {
		width: 50vw;
		height: 100vh;
		padding: 4vh;
		padding-right: 20vw;
		text-align: center;
		display: flex;
		flex-direction: column;
		// box-sizing: border-box;
		overflow-y: hidden;

		background: linear-gradient(to right, var(--lowerthird-bg-color) 0%, rgba(0, 0, 0, 0) 100%);

		.headline {
			@include headline;
			font-size: 6vh;
		}

		.description {
			@include subtitle;
			font-size: 3vh;
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

		.line {
			min-height: 2px;
			width: 75%;
			margin: 0px auto;

			background-color: white;
			// animation: line 2s;
		}
	}
</style>
