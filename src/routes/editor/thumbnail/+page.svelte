<script lang="ts">
	import { websocketStore, fallback } from '$lib/websocketStore';

	const liturgia = websocketStore('liturgia', fallback['liturgia']);
</script>


<main>
    <h1>thumbnail</h1>
    <canvas>
        
    </canvas>

    <div class="details">
        {$liturgia.nome} | {new Date().toDateString()}
    </div>
</main>