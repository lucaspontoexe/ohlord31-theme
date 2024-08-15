<script lang="ts">
	import { websocketStore } from '$lib/websocketStore2';
	import type { PageData } from './$types';
	export let data: PageData;
	const liturgia = websocketStore('liturgia', data.initialState);
</script>

<main>
	<h1>liturgia</h1>
	<p>amém</p>
	<p>tem que decidir essa UX da edição</p>

	<h2>título / cor</h2>
	<header>
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
	<div class="blocks">
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
					Descrição / Refrão Salmo
					<textarea bind:value={leitura.descricao} />
				</label>
				<div class="addremove">(adicionar item/remover acima)</div>
			</div>
			<div class="plsadd">
				adicionar aqui no meio
			</div>
		{/each}
	</div>

	<button>aplicar isso nos GCs</button>
</main>

<style>
	label {
		display: flex;
		flex-direction: column;
	}
	.block, .plsadd {
		margin-bottom: 1em;
	}
</style>
