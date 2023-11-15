<script lang="ts">
	import { websocketStore, fallback } from '$lib/websocketStore';
	import Debug from '$lib/Debug.svelte';
	import background from '$lib/festa-sjt-bg-only.png';

	const items = websocketStore('idle-screen-slides', fallback['idle-screen-slides']);
	const liturgia = websocketStore('liturgia', fallback['liturgia']);
</script>

<main>
	<section class="tela-liturgia">
		<div class="title">
			{$liturgia.nome}
		</div>

		<div class="liturgia">
			{#each $liturgia.leituras as leitura}
				<div class="leitura">
					<div class="nome">{leitura.nome}</div>
					<div class="referencia">{leitura.referencia}</div>
					{#if leitura.descricao} <div class="descricao">{leitura.descricao}</div> {/if}
				</div>
			{/each}
		</div>
	</section>
</main>

<Debug data={$items} />	

<style lang="scss">
	@import './fonts.scss';
	.tela-liturgia {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 4vw;
		gap: 20px;
		height: 100vh;
		// filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6));

		.title {
			font-family: 'Clicker Script';
			color: #d7ae20;

			font-size: 10em;
			max-width: 50%;
		}

		.liturgia {
			text-align: center;
			min-width: 40%;
			max-width: 50%;
			max-height: 100vh;

			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			.leitura {
				margin: 1em 0px;
			}

			.nome {
				font-family: 'Clicker Script';
				color: #d7ae20;
				font-size: 4em;
			}

			.referencia {
				font-family: 'Lora';
				color: black;

				font-size: 5em;
				margin: 0px;
			}

			.descricao {
				font-family: 'Clicker Script';
				color: black;
				font-weight: 600;

				font-size: 4em;
				white-space: pre-line;
			}
		}
	}
</style>
