(() => {
  const files = window.FILES;
  const P = window.PROFILE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // ‹cls|text› or ‹a|label|url› -> spans / links
  const markup = (line) =>
    esc(line).replace(/‹(\w+)\|([^‹›]*?)(?:\|([^‹›]*))?›/g, (_, cls, text, url) =>
      cls === "a" ? `<a href="${url}" target="_blank" rel="noopener">${text}</a>` : `<span class="${cls}">${text}</span>`
    );
  const plain = (s) => s.replace(/‹a\|([^|›]*)\|[^›]*›/g, "$1").replace(/‹\w+\|([^›]*)›/g, "$1");

  let open = [files[0].name];
  let current = files[0].name;

  function renderExplorer() {
    $("files").innerHTML = files
      .map((f) => `<li><button data-f="${f.name}" aria-current="${f.name === current}"><span class="ico">${f.icon}</span>${f.name}</button></li>`)
      .join("");
  }
  function renderTabs() {
    $("tabs").innerHTML = files
      .map((f) => `<button role="tab" data-f="${f.name}" aria-selected="${f.name === current}">${f.icon} ${f.name}</button>`)
      .join("");
  }
  function renderCode() {
    const f = files.find((x) => x.name === current);
    const lines = f.body.split("\n");
    $("code").innerHTML =
      lines.map((l, i) => `<div class="ln" data-n="${i + 1}"><span>${markup(l) || " "}</span></div>`).join("") +
      `<div class="ln" data-n="${lines.length + 1}"><span><span class="cursor">&nbsp;</span></span></div>`;
    $("code").scrollTop = 0;
    $("status-file").textContent = f.name;
    $("status-lang").textContent = f.lang;
  }
  function openFile(name) {
    if (!files.some((f) => f.name === name)) return false;
    current = name;
    if (!open.includes(name)) open.push(name);
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
    renderExplorer(); renderTabs(); renderCode();
    return true;
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]");
    if (b) openFile(b.dataset.f);
  });

  // theme
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
  $("theme").onclick = () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  };

  // terminal
  const out = $("term-out");
  const print = (html) => { const d = document.createElement("div"); d.innerHTML = html; out.appendChild(d); $("term").scrollTop = 1e9; };
  const history_ = []; let hi = 0;

  const cmds = {
    help: () => [
      "commands:",
      "  ls                 list files",
      "  cat &lt;file&gt;         print a file here",
      "  open &lt;file&gt;        open a file in the editor",
      "  whoami             who is this",
      "  skills             areas of work",
      "  github             open GitHub profile",
      "  theme              toggle light / dark",
      "  clear              clear the terminal",
    ].join("\n"),
    ls: () => files.map((f) => `<span class="s">${f.name}</span>`).join("  "),
    whoami: () => `${P.name} · AI, ML, network control, quantum mechanics, energy analysers`,
    skills: () => ["ai", "ml", "network-control", "quantum-mechanics", "energy-analysers"].map((s) => `<span class="h">${s}</span>`).join("  "),
    github: () => { window.open(P.github, "_blank", "noopener"); return `opening ${P.github}`; },
    theme: () => { $("theme").click(); return "theme toggled"; },
    clear: () => { out.innerHTML = ""; return null; },
    cat: (a) => {
      const f = files.find((x) => x.name === a);
      return f ? esc(plain(f.body)) : `cat: ${esc(a || "")}: No such file`;
    },
    open: (a) => (openFile(a) ? `opened ${esc(a)}` : `open: ${esc(a || "")}: No such file`),
    sudo: () => "nice try.",
  };

  $("term-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = $("term-in").value.trim();
    $("term-in").value = "";
    print(`<span class="ps1">soleiman@arebi:~$</span> ${esc(raw)}`);
    if (!raw) return;
    history_.push(raw); hi = history_.length;
    const [c, ...rest] = raw.split(/\s+/);
    const fn = cmds[c.toLowerCase()];
    const res = fn ? fn(rest.join(" ")) : `${esc(c)}: command not found. try <b>help</b>`;
    if (res) print(res);
  });
  $("term-in").addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hi > 0) { $("term-in").value = history_[--hi]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hi = Math.min(history_.length, hi + 1); $("term-in").value = history_[hi] || ""; }
    if (e.key === "Tab") {
      e.preventDefault();
      const [c, a = ""] = $("term-in").value.split(/\s+/);
      const m = files.find((f) => a && f.name.startsWith(a));
      if (m) $("term-in").value = `${c} ${m.name}`;
    }
  });
  $("term").addEventListener("click", (e) => { if (!e.target.closest("a")) $("term-in").focus({ preventScroll: true }); });

  // boot
  print(`<span class="c">Last login: ${new Date().toDateString()} on ttys000</span>`);
  print(`Welcome. Type <b>help</b> to see commands, or click a file above.`);
  openFile(decodeURIComponent(location.hash.slice(1))) || openFile(files[0].name);
})();
