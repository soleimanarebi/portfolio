// Animated agent network: agents (dots) hold a value shown as colour, talk along
// edges (moving sparks) and drift toward consensus; verifiers (ringed) are pinned
// to the verified answer and pull the group toward it. Restarts every cycle.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // value 0 -> violet, 1 -> teal
  const lerp = (a, b, t) => a + (b - a) * t;
  const colour = (v, a = 1) => {
    const t = Math.max(0, Math.min(1, v));
    const r = Math.round(lerp(167, 94, t)), g = Math.round(lerp(139, 234, t)), b = Math.round(lerp(250, 212, t));
    return `rgba(${r},${g},${b},${a})`;
  };

  function build(n, w, h) {
    // preferential attachment on points scattered over the canvas, so hubs emerge
    const nodes = [];
    for (let i = 0; i < n; i++) {
      nodes.push({
        x: w * (0.06 + 0.88 * Math.random()), y: h * (0.1 + 0.8 * Math.random()),
        vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.08,
        v: Math.random() * 0.3, deg: 0, pin: false,
      });
    }
    const edges = [];
    const has = new Set();
    const add = (i, j) => {
      const k = i < j ? i + "-" + j : j + "-" + i;
      if (i === j || has.has(k)) return;
      has.add(k); edges.push([i, j]); nodes[i].deg++; nodes[j].deg++;
    };
    for (let i = 1; i < n; i++) {
      // link to nearby nodes, favouring well-connected ones
      const cand = nodes.slice(0, i).map((m, j) => {
        const d = Math.hypot(m.x - nodes[i].x, m.y - nodes[i].y);
        return { j, s: (m.deg + 1) / (d + 40) };
      }).sort((a, b) => b.s - a.s);
      add(i, cand[0].j);
      if (cand[1] && Math.random() < 0.7) add(i, cand[1].j);
    }
    // verifiers: the best-connected agents
    const k = Math.max(2, Math.round(n / 12));
    [...nodes.keys()].sort((a, b) => nodes[b].deg - nodes[a].deg).slice(0, k).forEach((i) => { nodes[i].pin = true; nodes[i].v = 1; });
    const nbr = nodes.map(() => []);
    edges.forEach(([i, j]) => { nbr[i].push(j); nbr[j].push(i); });
    return { nodes, edges, nbr };
  }

  function start(canvas) {
    const ctx = canvas.getContext("2d");
    const n = +canvas.dataset.agents || 46;
    let w, h, dpr, net, sparks, t0, raf;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      reset();
    };
    const reset = () => { net = build(n, w, h); sparks = []; t0 = performance.now(); };

    function step(now) {
      const { nodes, edges, nbr } = net;
      const age = (now - t0) / 1000;
      if (age > 14) reset();

      // consensus with pinning: dv = c * sum(v_j - v_i) + pin * (1 - v_i)
      const c = 0.0035, pin = 0.02;
      const dv = nodes.map((m, i) => m.pin ? 0 : c * nbr[i].reduce((s, j) => s + nodes[j].v - m.v, 0));
      nodes.forEach((m, i) => {
        if (m.pin) m.v += pin * (1 - m.v); else m.v += dv[i];
        m.x += m.vx; m.y += m.vy;
        if (m.x < 8 || m.x > w - 8) m.vx *= -1;
        if (m.y < 8 || m.y > h - 8) m.vy *= -1;
      });

      // spawn messages along random edges
      for (let s = 0; s < 2; s++) {
        const [i, j] = edges[(Math.random() * edges.length) | 0];
        const fwd = Math.random() < 0.5;
        sparks.push({ a: fwd ? i : j, b: fwd ? j : i, p: 0 });
      }
      sparks = sparks.filter((s) => (s.p += 0.025) < 1);

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      edges.forEach(([i, j]) => {
        const a = nodes[i], b = nodes[j];
        const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, colour(a.v, 0.28)); g.addColorStop(1, colour(b.v, 0.28));
        ctx.strokeStyle = g;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      sparks.forEach((s) => {
        const a = nodes[s.a], b = nodes[s.b];
        const x = lerp(a.x, b.x, s.p), y = lerp(a.y, b.y, s.p);
        ctx.fillStyle = colour(a.v, 0.9 * Math.sin(Math.PI * s.p));
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 7); ctx.fill();
      });
      nodes.forEach((m) => {
        const r = 2.6 + Math.sqrt(m.deg) * 1.3;
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r * 4);
        glow.addColorStop(0, colour(m.v, m.pin ? 0.45 : 0.22)); glow.addColorStop(1, colour(m.v, 0));
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(m.x, m.y, r * 4, 0, 7); ctx.fill();
        ctx.fillStyle = colour(m.v); ctx.beginPath(); ctx.arc(m.x, m.y, r, 0, 7); ctx.fill();
        if (m.pin) {
          const pulse = 1 + 0.25 * Math.sin(now / 300);
          ctx.strokeStyle = "rgba(226,232,240,.85)"; ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.arc(m.x, m.y, r + 4 * pulse, 0, 7); ctx.stroke();
          ctx.lineWidth = 1;
        }
      });
    }

    const loop = (now) => { step(now); raf = requestAnimationFrame(loop); };
    resize();
    if (reduce) { for (let i = 0; i < 260; i++) step(t0 + i * 16); return; }
    new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(loop);
    }).observe(canvas);
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  }

  document.querySelectorAll("canvas[data-network]").forEach(start);
})();
