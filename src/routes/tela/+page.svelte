<script lang="ts">
	import type { PageData } from './$types';
	import { websocketStore, fallback } from '$lib/websocketStore';

	export let data: PageData;
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
					{#if leitura.descricao} <div class="descricao">{leitura.descricao} </div> {/if}
				</div>
			{/each}
		</div>
	</section>
</main>

<pre class="debug">{JSON.stringify(data)} {'\n\n'} {JSON.stringify($items, null, 4)}</pre>

<style lang="scss">
	.tela-liturgia {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 4vw;
		gap: 20px;
		height: 100vh;

		.title {
			max-width: 50%;
			font-family: 'Poppins Bold';
			font-size: 8em;
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
				font-size: 3em;
			}

			.referencia {
				// apply poppins
				font-family: 'Poppins Bold';
				font-size: 5em;
				margin: 0px;
			}

			.descricao {
				font-family: 'Lora Italic';
				font-size: 3em;
			}
		}
	}

	.debug {
		position: fixed;
		background-color: rgba(black, 0.25);
		color: white;
		top: 20px;
		left: 20px;
	}
</style>
