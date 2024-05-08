
// @ts-nocheck
import {
  S as SvelteComponent,
  i as N,
  s as Q,
  e as r,
  b as n,
  c as V,
  n as U,
  d as W,
  v as $,
  a as h,
  t as tt,
  x as et,
  h as e,
  $ as I,
  Z as A,
  j as nt,
  E as at,
  B as st,
  C as ot,
  a0 as lt,
  X as it,
  r as rt,
  u as ct,
} from "./index.19093c3f.js";
import { b as liturgia } from "./fallback.f4407548.js";
import { g as axiosFetch } from "./rest.11473f5b.js";
const backgroundImage = "/assets/canvas-background-3.b2c4a865.webp";

function drawCanvas(canvas, title, imageObject, drawDebugLines = false) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
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
    imageObject.background && ctx.drawImage(imageObject.background, 0, 0),
    (ctx.font = "italic 96px Lora"),
    (ctx.textBaseline = "top"),
    (ctx.textAlign = "center"),
    (ctx.fillStyle = "white"),
    ctx.fillText(title.top, 960, v),
    ctx.fillText(title.bottom, 960, u),
    (ctx.font = "144px Poppins"),
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
function ft(s) {
  let a;
  return {
    c() {
      (a = r("div")),
        (a.innerHTML = `<span class="poppins svelte-1dnrwf1">.</span> 
    <span class="lora svelte-1dnrwf1">.</span>`),
        n(a, "class", "font_loader svelte-1dnrwf1");
    },
    m(o, _) {
      V(o, a, _);
    },
    p: U,
    i: U,
    o: U,
    d(o) {
      o && W(a);
    },
  };
}
class ht extends SvelteComponent {
  constructor(a) {
    super(), N(this, a, null, ft, Q, {});
  }
}
function _t(s) {
  let a,
    o,
    _,
    t,
    g,
    i,
    p,
    w,
    z,
    d,
    C,
    b,
    x,
    j,
    l,
    v,
    m,
    u,
    k,
    c,
    T,
    D,
    B,
    q,
    L,
    H,
    y,
    F,
    X,
    P,
    M,
    Y,
    Z,
    G,
    E,
    S,
    O,
    J;
  return (
    (o = new ht({})),
    {
      c() {
        (a = r("main")),
          $(o.$$.fragment),
          (_ = h()),
          (t = r("canvas")),
          (g = h()),
          (i = r("section")),
          (p = r("div")),
          (w = r("h2")),
          (w.textContent = "Parte de cima"),
          (z = h()),
          (d = r("input")),
          (C = h()),
          (b = r("div")),
          (x = r("h2")),
          (x.textContent = "T\xEDtulo principal"),
          (j = h()),
          (l = r("textarea")),
          (v = h()),
          (m = r("div")),
          (u = r("h2")),
          (u.textContent = "Parte de baixo"),
          (k = h()),
          (c = r("input")),
          (T = h()),
          (D = r("div")),
          (B = r("h2")),
          (B.textContent = "Imagem"),
          (q = h()),
          (L = r("button")),
          (L.textContent = "Salvar Imagem"),
          (H = h()),
          (y = r("div")),
          (F = r("h2")),
          (F.textContent = "T\xEDtulo:"),
          (X = h()),
          (P = r("span")),
          (M = tt(s[2])),
          (Y = h()),
          (Z = r("br")),
          (G = h()),
          (E = r("button")),
          (E.textContent = "Copiar T\xEDtulo"),
          n(t, "width", "1920"),
          n(t, "height", "1080"),
          n(t, "class", "svelte-1w4zjyk"),
          n(w, "class", "svelte-1w4zjyk"),
          n(d, "placeholder", "parte de cima"),
          n(d, "type", "text"),
          n(d, "name", "top"),
          n(d, "class", "svelte-1w4zjyk"),
          n(p, "class", "block svelte-1w4zjyk"),
          n(x, "class", "svelte-1w4zjyk"),
          n(l, "placeholder", "t\xEDtulo principal"),
          n(l, "name", "main"),
          n(l, "cols", "16"),
          n(l, "rows", "3"),
          n(l, "class", "svelte-1w4zjyk"),
          n(b, "class", "block svelte-1w4zjyk"),
          n(u, "class", "svelte-1w4zjyk"),
          n(c, "placeholder", "parte de baixo"),
          n(c, "type", "text"),
          n(c, "name", "bottom"),
          n(c, "class", "svelte-1w4zjyk"),
          n(m, "class", "block svelte-1w4zjyk"),
          n(B, "class", "svelte-1w4zjyk"),
          n(D, "class", "block svelte-1w4zjyk"),
          n(F, "class", "svelte-1w4zjyk"),
          n(P, "class", "svelte-1w4zjyk"),
          n(y, "class", "block svelte-1w4zjyk"),
          n(i, "class", "config svelte-1w4zjyk"),
          n(a, "class", "svelte-1w4zjyk");
      },
      m(f, R) {
        V(f, a, R),
          et(o, a, null),
          e(a, _),
          e(a, t),
          s[7](t),
          e(a, g),
          e(a, i),
          e(i, p),
          e(p, w),
          e(p, z),
          e(p, d),
          I(d, s[1].top),
          e(i, C),
          e(i, b),
          e(b, x),
          e(b, j),
          e(b, l),
          I(l, s[1].main),
          e(i, v),
          e(i, m),
          e(m, u),
          e(m, k),
          e(m, c),
          I(c, s[1].bottom),
          e(i, T),
          e(i, D),
          e(D, B),
          e(D, q),
          e(D, L),
          e(i, H),
          e(i, y),
          e(y, F),
          e(y, X),
          e(y, P),
          e(P, M),
          e(y, Y),
          e(y, Z),
          e(y, G),
          e(y, E),
          (S = !0),
          O ||
            ((J = [
              A(d, "input", s[8]),
              A(l, "input", s[9]),
              A(c, "input", s[10]),
              A(L, "click", s[3]),
              A(E, "click", s[4]),
            ]),
            (O = !0));
      },
      p(f, [R]) {
        R & 2 && d.value !== f[1].top && I(d, f[1].top),
          R & 2 && I(l, f[1].main),
          R & 2 && c.value !== f[1].bottom && I(c, f[1].bottom),
          (!S || R & 4) && nt(M, f[2]);
      },
      i(f) {
        S || (at(o.$$.fragment, f), (S = !0));
      },
      o(f) {
        st(o.$$.fragment, f), (S = !1);
      },
      d(f) {
        f && W(a), ot(o), s[7](null), (O = !1), lt(J);
      },
    }
  );
}
function gt(s, a, o) {
  it.title = "editor das thumbnails";
  let canvasElement,
    title = { top: "", main: "", bottom: "" },
    g = {},
    textToCopy = liturgia.nome + " | DD/MM/AAAA",
    p = !1;
  async function w() {
    const blob = await new Promise((u) => canvasElement.toBlob(u, "image/jpeg")),
      objectURL = URL.createObjectURL(blob),
      linkElement = document.createElement("a");
    (linkElement.href = objectURL),
      (linkElement.download = `thumbnail ${new Date().toLocaleDateString("en-CA")}.jpg`),
      linkElement.click();
  }
  const z = () => navigator.clipboard.writeText(textToCopy);
  async function d() {
    function l() {
      const u = new Date(),
        c = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" })
          .format(u)
          .split(" ")
          .slice(0, 3);
      return (c[0] = c[0].padStart(2, "0")), c.join(" ");
    }
    function v(u) {
      return new Promise((k, c) => {
        const T = new Image();
        (T.src = u), (T.onload = () => k(T)), (T.onerror = c);
      });
    }
    const { nome: nome } = await axiosFetch("/state/liturgia");
    o(
      1,
      (title.main = nome.replace(
        /(\bd[oae]s?|,) /,
        (u) =>
          u +
          `
`
      )),
      title
    ),
      o(1, (title.bottom = l()), title),
      o(2, (textToCopy = nome + " | " + new Intl.DateTimeFormat("pt-BR").format(new Date()))),
      o(5, (g.background = await v(backgroundImage)), g),
      await document.fonts.ready,
      o(6, (p = !0));
  }
  rt(d);
  function C(l) {
    ct[l ? "unshift" : "push"](() => {
      (canvasElement = l), o(0, canvasElement);
    });
  }
  function b() {
    (title.top = this.value), o(1, title);
  }
  function x() {
    (title.main = this.value), o(1, title);
  }
  function j() {
    (title.bottom = this.value), o(1, title);
  }
  return (
    (s.$$.update = () => {
      s.$$.dirty & 99 && p && drawCanvas(canvasElement, title, g);
    }),
    [canvasElement, title, textToCopy, w, z, g, p, C, b, x, j]
  );
}
class kt extends SvelteComponent {
  constructor(a) {
    super(), N(this, a, gt, _t, Q, {});
  }
}
export { kt as default };
