<script lang="ts">
  // @ts-nocheck
  import { onMount } from "svelte";
  import { drawCanvas } from './drawThumbnail';
	import background from '$lib/canvas-background.webp';
  import FontLoader from "$lib/FontLoader.svelte";
  const serverAddress = import.meta.env.DEV? 'http://192.168.0.10:9999':location.origin;

  let loaded = false;
  let canvas: HTMLCanvasElement;

  let streamTitle = "Evento | DD/MM/AAAA";

  let title = {
    top: "",
    main: "Título",
    bottom: getDate(),
  };

  let images: Record<string, HTMLImageElement> = {};

  function getDate() {
    // port direto da ohlord2. vamo nessa.
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
    }).format(now);

    // ainda vale a pena tirar o ano?
    // 0: dia, 1: "de", 2: mês, 3: "de", 4: ano;
    const splitDate = formatted.split(" ").slice(0, 3);

    // zero antes da data menor que 10
    splitDate[0] = splitDate[0].padStart(2, "0");

    return splitDate.join(" ");
  }

  function loadImage(source: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = source;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  async function saveCanvasAsImage() {
    drawCanvas(canvas, title, images);
    const blob = await new Promise<Blob>(resolve => canvas.toBlob(resolve, "image/jpeg"));
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `thumbnail ${new Date().toLocaleDateString("en-CA")}.jpg`;
    link.click();
  }

  const copyTitle = () => navigator.clipboard.writeText(streamTitle);

  onMount(async () => {
    // puxa o nome do evento
    const { nome } = await fetch(serverAddress + "/api/state/liturgia").then(r => r.json());
    // regex: após "do", "da", "de" ou vírgula, seguidos de espaço, adiciona uma quebra de linha
    title.main = (nome as string).replace(/(\bd[oae]s?|,) /, m => m + "\n");

    // formata ele direitinho
    const date = new Intl.DateTimeFormat("pt-BR").format(new Date());
    streamTitle = nome + " | " + date;

    // load fonts & background
    const poppins = new FontFace(
      "PoppinsBold",
      'local("Poppins"), url("/fonts/Poppins/Poppins-Bold.ttf")'
    );
    const loraItalic = new FontFace(
      "Lora",
      'local("Lora"), url("/fonts/Lora/Lora-Italic-VariableFont_wght.ttf")'
    );
    await Promise.all([poppins.load(), loraItalic.load()]);
    images.background = await loadImage(background);

    // poupe vários redraws
    loaded = true;
  });

  $: loaded && drawCanvas(canvas, title, images);
</script>

<svelte:head>
  <title>gerador de thumbnails</title>
</svelte:head>

<main>
  <FontLoader/>
  <canvas width="1920" height="1080" bind:this={canvas} />

  <section class="config">
    <div class="block">
      <h2>Parte de cima</h2>
      <input bind:value={title.top} placeholder="parte de cima" type="text" name="top" />
    </div>
    <div class="block">
      <h2>Título principal</h2>
      <textarea
        bind:value={title.main}
        placeholder="título principal"
        name="main"
        cols="16"
        rows="3"
      />
    </div>
    <div class="block">
      <h2>Parte de baixo</h2>
      <input bind:value={title.bottom} placeholder="parte de baixo" type="text" name="bottom" />
    </div>

    <div class="block">
      <h2>Imagem</h2>
      <button on:click={saveCanvasAsImage}>salvar imagem</button>
    </div>

    <div class="block">
      <h2>Título:</h2>
      <span>{streamTitle}</span>
      <br />
      <button on:click={copyTitle}> copiar título </button>
    </div>
  </section>
</main>

<style>
  main {
    display: flex;
  }

  canvas {
    border: 1px solid gray;
    width: 960px;
    margin-right: 20px;
  }

  section.config {
    display: flex;
    flex-direction: column;
  }

  input,
  textarea {
    display: block;
    font-size: 1em;
    font-family: sans-serif;
  }

  .block {
    margin-bottom: 1em;
  }

  h2 {
    margin: 0.1em 0em;
    font-size: 1.2em;
  }
</style>
