<script lang="ts">
	import { websocketStore } from '$lib/websocketStore2';
	import type { PageData } from './$types';
	export let data: PageData;
	const liturgia = websocketStore('liturgia', data.initialState);
	const leitura = { nome: '', referencia: '', descricao: '' };

	function adcLeitura(index: number) {
		$liturgia.leituras = [
			...$liturgia.leituras.slice(0, index),
			leitura,
			...$liturgia.leituras.slice(index)
		];
	}
</script>

<main>
	<h1>liturgia</h1>

	<h2>alterar data</h2>
	<section class="blocks">
		<input type="date" name="data" id="data">
		<button>aaaa</button>
	</section>

	<h2>título / cor</h2>
	<header class="blocks">
		<label>
			Nome
			<input type="text" bind:value={$liturgia.nome} />
		</label>

		<label>
			Cor
			<input type="text" bind:value={$liturgia.cor} />
		</label>
	</header>

	<h2>leituras</h2>
	<section class="blocks">
		{#each $liturgia.leituras as leitura, index}
			<div class="block">
				<label>
					Nome
					<input type="text" bind:value={leitura.nome} />
				</label>

				<label>
					Referência
					<input type="text" bind:value={leitura.referencia} />
				</label>
				<label>
					Descrição (Refrão Salmo)
					<textarea bind:value={leitura.descricao} />
				</label>
				<div class="addremove">(adicionar item/remover acima)</div>
			</div>
			<button class="plsadd" on:click={() => adcLeitura(index +1)}>adicionar aqui no meio</button>
		{/each}

		<p>edições salvas automaticamente</p>

		<button>aplicar isso nos GCs [noop]</button>
	</section>

	<button hidden class="click-to-disable hide-css-warning">sai warning</button>
</main>

<style lang="scss">
	@import './style.scss';
	.addremove {
		font-style: italic;
		color: gray;
	}
</style>
