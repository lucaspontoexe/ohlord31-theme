type obj_title = {top: string, main: string, bottom: string}
type img_object = {background: HTMLImageElement}

export function drawCanvas(canvas: HTMLCanvasElement, title: obj_title, images: img_object, drawDebugLines = false) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const lines = title.main
        .split('\n')
        .map((k) => k.trim()),
      i = 100,
      p = canvas.width - 200,
      w = 96,
      z = 40,
      titleMargin = 40,
      titleLineHeight = 144,
      h1_lineHeight = titleLineHeight + titleMargin,
      titleHeight = h1_lineHeight * lines.length,
      totalHeight = titleHeight + (w * 2 + z);
    let availableHeight = canvas.height - (lines.length > 2 ? 136 : 0);
    title.top || (availableHeight -= w);
    const v = (availableHeight - totalHeight) / 2,
      m = v + w + z,
      u = m + titleHeight;
    ctx.save(),
      images.background && ctx.drawImage(images.background, 0, 0),
      (ctx.font = "italic 96px Lora"),
      (ctx.textBaseline = "top"),
      (ctx.textAlign = "center"),
      (ctx.fillStyle = "white"),
      ctx.fillText(title.top, 960, v),
      ctx.fillText(title.bottom, 960, u),
      (ctx.font = "144px PoppinsBold"),
      (ctx.fillStyle = "#F6D084"),
      (ctx.shadowBlur = 12),
      (ctx.shadowOffsetY = 12),
      (ctx.shadowColor = "rgba(0, 0, 0, 0.25)"),
      lines.forEach((line, index) => {
        ctx.fillText(line, 960, m + h1_lineHeight * index);
      }),
      ctx.restore(),
      drawDebugLines &&
        (lines.forEach((_line, index) => {
          ctx.strokeRect(i, m + h1_lineHeight * index, p, titleLineHeight);
        }),
        ctx.strokeRect(i, v, p, w),
        ctx.strokeRect(i, u, p, w),
        ctx.strokeRect(0, availableHeight, 1920, 1080),
        (ctx.strokeStyle = "red"),
        ctx.strokeRect(i, v, p, totalHeight),
        console.log("total height:", totalHeight),
        console.log("available height:", availableHeight)); // tem descrição disso no PC da igreja
  }