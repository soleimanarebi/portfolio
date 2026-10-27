(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  $("year").textContent = new Date().getFullYear();

  // mobile menu
  const nav = $("nav");
  $("menu-btn").onclick = () => {
    const open = nav.classList.toggle("open");
    $("menu-btn").setAttribute("aria-expanded", open);
  };
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });

  // highlight the nav link for the section in view
  const links = [...nav.querySelectorAll("a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.hash === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  // gallery lightbox
  const lb = $("lightbox");
  $("gallery-grid").addEventListener("click", (e) => {
    const fig = e.target.closest("figure");
    if (!fig) return;
    const cap = fig.querySelector("figcaption").textContent;
    lb.querySelector("img").src = fig.querySelector("img").src;
    lb.querySelector("img").alt = cap;
    lb.querySelector(".lightbox-cap").textContent = cap;
    lb.hidden = false;
  });
  lb.addEventListener("click", (e) => { if (e.target.tagName !== "IMG") lb.hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });

  // terminal
  const out = $("term-out");
  const input = $("term-in");
  const print = (html) => { const d = document.createElement("div"); d.innerHTML = html; out.appendChild(d); $("term").scrollTop = 1e9; };
  const hist = []; let hi = 0;

  const cmds = {
    help: () => [
      "<b>whoami</b>       short bio",
      "<b>research</b>     research areas",
      "<b>papers</b>       selected publications",
      "<b>skills</b>       tools and methods",
      "<b>contact</b>      how to reach me",
      "<b>cd</b> &lt;section&gt;  about · research · publications · experience · gallery",
      "<b>clear</b>        clear the screen",
    ].join("\n"),
    whoami: () => "Soleiman Arebi, PhD, CEng MIMechE\nControl theorist working on oversight of multi-agent AI systems.",
    research: () => [
      "ai.ml             verifier placement in LLM agent networks",
      "network.control   pinning control, controllability, SDRE",
      "energy.analyser   building energy, solar CFD, thermal modelling",
      "mechatronics      MEMS navigation, robotics, testbeds",
    ].join("\n"),
    papers: () => [
      "[2016] Pinning control for synchronization of nonlinear complex",
      "       dynamical networks with suboptimal SDRE controllers.",
      '       Nonlinear Dynamics 83. <a href="https://doi.org/10.1007/s11071-015-2383-8" target="_blank" rel="noopener">doi</a>',
      "[2026] Controllability of LLM agent networks (in preparation)",
      '       <a href="https://github.com/soleimanarebi/llm-agent-controllability" target="_blank" rel="noopener">code</a>',
    ].join("\n"),
    skills: () => "python numpy scipy networkx anthropic-sdk\nmatlab simulink sdre lqr lyapunov\nfluent star-ccm+ abaqus solidworks latex",
    contact: () => '<a href="mailto:soleiman.arebi@gmail.com">soleiman.arebi@gmail.com</a>\n<a href="https://www.linkedin.com/in/soleiman-arebi-0ba898103" target="_blank" rel="noopener">linkedin</a> · <a href="https://github.com/soleimanarebi" target="_blank" rel="noopener">github</a>',
    ls: () => "about  research  publications  experience  gallery  contact",
    cd: (a) => {
      const el = a && document.getElementById(a);
      if (!el || el.tagName !== "SECTION") return `cd: ${esc(a || "")}: no such section`;
      el.scrollIntoView();
      return `→ ${esc(a)}`;
    },
    clear: () => { out.innerHTML = ""; return null; },
    sudo: () => "nice try.",
  };

  $("term-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    input.value = "";
    print(`<b>$</b> ${esc(raw)}`);
    if (!raw) return;
    hist.push(raw); hi = hist.length;
    const [c, ...rest] = raw.split(/\s+/);
    const fn = cmds[c.toLowerCase()];
    const res = fn ? fn(rest.join(" ")) : `${esc(c)}: command not found. try <b>help</b>`;
    if (res) print(res);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hi > 0) { input.value = hist[--hi]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ""; }
  });
  $("term").addEventListener("click", (e) => { if (!e.target.closest("a")) input.focus({ preventScroll: true }); });

  print('<span class="dim">Welcome. Type <b>help</b> to explore.</span>');
  print("<b>$</b> whoami");
  print(cmds.whoami());
})();
