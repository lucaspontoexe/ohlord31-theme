<script lang="ts">
	import type { PageData } from './$types';
	import { websocketStore, fallback } from '$lib/websocketStore';

	export let data: PageData;
	const items = websocketStore('idle-screen-slides', fallback['idle-screen-slides']);
</script>

<main>

	<section class="tela-liturgia">
		<div class="title">
			1º Domingo do Tempo Legal
		</div>

		<div class="liturgia">
			<div class="nome">1ª Leitura</div>
			<div class="referencia">Lc 12,3-4</div>
			<div class="descricao">é salmo agora</div>
		</div>
	</section>

</main>

<pre class="debug">{JSON.stringify(data)}</pre>
<pre class="debug">{JSON.stringify($items, null, 4)}</pre>
