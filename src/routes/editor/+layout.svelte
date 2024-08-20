<script lang="ts">
    import { base } from "$app/paths";
</script>

<header>
	<nav>
        <a href="{base}/editor/liturgia">liturgia |</a>
        <a href="{base}/editor/gc">gc |</a>
        <a href="{base}/editor/thumbnail">thumbnail</a>
    </nav>
</header>

<slot></slot>

<style lang="scss">
    @import "src/lib/mixins.scss";

    :global(body) {
        @include reset-size();
    }
</style>