<script lang="ts">
	import { websocketStore } from '$lib/websocketStore2';
	import { onMount } from 'svelte';
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

	function handleFormPost(event:SubmitEvent) {
		const fd = new FormData(event.target as HTMLFormElement);
		const date = (fd.get("date")?.toString());
		console.log(date);
		fetch(`http://${location.hostname}:3000/api/reset_state?date=${date}&keepLowerThirds=false`, {method: "POST"})
	}

	onMount(() => {
		// workaround 
		// não tem um campo indicando qual é o dia da liturgia,
		// então a gente deixa a data do formulário como a de hoje
		// na maioria das vezes é isso mesmo
		const inputDate = document.querySelector("input#date") as HTMLInputElement;
		inputDate.value = new Date().toISOString().split("T")[0];
	})
</script>

<main>
	<h1>liturgia</h1>

	<h2>alterar data</h2>
	<section class="blocks">
		<form action="javascript:" on:submit={handleFormPost}>
			<input type="date" name="date" id="date" />
			<button type="submit">Alterar</button>
		</form>
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
				<div class="addremove">(adicionar item/remover acima) (noop)</div>
			</div>
			<button hidden class="plsadd" on:click={() => adcLeitura(index +1)}>adicionar aqui no meio</button>
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
