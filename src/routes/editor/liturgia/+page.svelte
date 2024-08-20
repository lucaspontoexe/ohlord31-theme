<script lang="ts">
	import { websocketStore } from '$lib/websocketStore2';
	import type { PageData } from './$types';
	export let data: PageData;
	const liturgia = websocketStore('liturgia', data.initialState);
</script>

<main>
	<h1>liturgia</h1>
	<p>edições salvas automaticamente</p>


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
		{#each $liturgia.leituras as leitura}
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
			<div class="plsadd" hidden>adicionar aqui no meio</div>
		{/each}

		<button>aplicar isso nos GCs [noop]</button>
	</section>

	<button hidden class="click-to-disable hide-css-warning">sai warning</button>
</main>

<style lang="scss">
	@import "./style.scss";
	.addremove {
		font-style: italic;
		color: gray;
	}
</style>
