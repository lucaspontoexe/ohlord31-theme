<script lang="ts">
	import ColorEditor from "./ColorEditor.svelte";

</script>

<main>
	<header>
		<h1>temp yami</h1>
		<p>parágrafo</p>
	</header>

	<div class="block">
		<p>bloco</p>
	</div>

	<div class="block">
		<input type="text" />
		<textarea name="" id="" />
	</div>

	<div class="block">
		<button>botão</button>
	</div>

	<div class="block">
		<button class="click-to-disable">botão</button>
	</div>

	<div class="block">
		<ColorEditor></ColorEditor>
	</div>

</main>

<style lang="scss">
	@import '$lib/yami.scss';
</style>
