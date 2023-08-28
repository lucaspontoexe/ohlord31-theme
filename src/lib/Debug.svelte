<script lang="ts">
	export let data: any;
</script>

<pre class="debug">{JSON.stringify(data, null, 4)}</pre>

<style lang="scss">
	pre.debug {
		position: fixed;
		background-color: rgba(black, 0.25);
		color: white;
		top: 20px;
		left: 20px;
	}
</style>
