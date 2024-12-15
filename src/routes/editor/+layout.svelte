<script lang="ts">
	import { base } from '$app/paths';
</script>

<nav>
	<a href="{base}/editor/liturgia">liturgia</a> |
	<a href="{base}/editor/gc">gc</a> |
	<a href="{base}/editor/thumbnail">thumbnail</a>
</nav>

<slot />

<style lang="scss">
	@import 'src/lib/mixins.scss';

	:global(body) {
		@include reset-size();
	}

	nav {
		display: flex;
		width: 100%;
		text-align: center;
		min-height: 2em;
		line-height: 2em;
		font-size: 1em;

		background-color: $obs-primaryDark;
		color-scheme: dark;
		color: white;
		font-family: $obs-font;

		a {
			flex: 1;
			text-decoration: none;
			color: inherit;
			transition: background-color .2s;

			&:hover {
				background-color: $obs-primaryLight;
			}
		}
	}
</style>
