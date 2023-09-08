<script lang="ts">
	import { websocketStore, fallback } from '$lib/websocketStore';
	import Debug from '$lib/Debug.svelte';

	const items = websocketStore('idle-screen-slides', fallback['idle-screen-slides']);
	// cortar pra quando a gente componentizar esse
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
	.tela-liturgia {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 4vw;
		gap: 20px;
		height: 100vh;
		filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6));

		// background-color: black; // mudar pra imagem aleatória 1920x1080;

		.title {
			@include headline;

			font-size: 8em;
			max-width: 50%;
		}

		.liturgia {
			text-align: center;
			min-width: 40%;
			max-width: 50%;

			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			.leitura {
				margin: 2em 0px;

				// hr {
				// 	width: 80%;
				// 	border-style: solid;
				// 	margin: 0px auto;
				// }
			}

			.nome {
				font-family: 'Lora';
				color: white;
				font-size: 3em;
			}

			.referencia {
				@include headline;

				font-size: 5em;
				margin: 0px;
			}

			.descricao {
				@include subtitle;
				font-size: 2.4em;
				white-space: pre-line;
			}
		}
	}
</style>
