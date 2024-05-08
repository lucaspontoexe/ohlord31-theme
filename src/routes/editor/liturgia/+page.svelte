<script lang="ts">
	import { websocketStore, fallback } from '$lib/websocketStore';

	const liturgia = websocketStore('liturgia', fallback['liturgia']);
</script>


<main>
    <h1>liturgia</h1>
    <p>amém</p>

    <header>
        <p>{$liturgia.nome}</p>
        <p>cor: {$liturgia.cor}</p>
    </header>

    <h2>leituras</h2>
    <div class="blocks">
        {#each $liturgia.leituras as leitura}
            <div>{leitura.nome}</div>
            <div>{leitura.referencia}</div>
            {#if leitura.descricao}
                <div>{leitura.descricao}</div>
            {/if}
        {/each}
    </div>
</main>