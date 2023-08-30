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

		background-color: black; // mudar pra imagem aleatória 1920x1080;

		.title {
			font-family: 'Poppins Bold';
			color: $main-title-color;

			font-size: 8em;
			max-width: 50%;
		}

		.liturgia {
			text-align: center;
			max-width: 50%;

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
				// apply poppins
				font-family: 'Poppins Bold';
				color: $main-title-color;

				font-size: 5em;
				margin: 0px;
			}

			.descricao {
				font-family: 'Lora Italic';
				color: white;
				font-size: 3em;
			}
		}
	}
</style>
