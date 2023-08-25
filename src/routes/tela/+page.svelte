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
					{#if leitura.descricao} <div class="descricao">{leitura.descricao}</div> {/if}
				</div>
			{/each}

		</div>
	</section>

</main>

<pre class="debug">{JSON.stringify(data)}</pre>
<pre class="debug">{JSON.stringify($items, null, 4)}</pre>


<style lang="scss">
	.tela-liturgia {
		font-family: "Poppins Bold";
		display: flex;
	}
</style>