<script lang="ts">
	import type { PageData } from './$types';
	import { websocketStore, fallback } from '$lib/websocketStore';

	export let data: PageData;
	const items = websocketStore('idle-screen-slides', fallback['idle-screen-slides']);
</script>

<main />

<pre class="debug">{JSON.stringify(data)}</pre>
<pre class="debug">{JSON.stringify($items, null, 4)}</pre>
