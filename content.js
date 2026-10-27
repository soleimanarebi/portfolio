// Site content. Each file is a tab in the editor.
// Inline markup: ‹k|keyword› ‹f|function› ‹s|string› ‹n|number› ‹c|comment›
// ‹t|type› ‹h|heading› ‹todo|placeholder to replace from the CV› ‹a|label|url›
window.PROFILE = {
  name: "Soleiman Arebi",
  handle: "soleiman",
  github: "https://github.com/soleimanarebi",
};

window.FILES = [
  {
    name: "about.md", icon: "📄", lang: "Markdown",
    body: `‹h|# Soleiman Arebi›

‹c|> AI · machine learning · network control · quantum mechanics · energy analysers›

I work where control theory meets learning systems: how networks of
agents, machines and physical devices can be steered, verified and
measured.

‹h|## Focus›
- ‹s|AI & ML›           agent collectives, verification, learned models
- ‹s|Network control›   pinning control, controllability of complex networks
- ‹s|Quantum mechanics› ‹todo|area of work from CV›
- ‹s|Energy analysers›  ‹todo|instruments / products from CV›

‹h|## Now›
Writing ‹t|"Controllability of LLM Agent Networks"›: which agents to verify,
and how many, for a group of language-model agents to reach a verified
answer.

‹h|## Background›
‹todo|Current role · organisation · location›
‹todo|Degrees and institutions›

‹c|<!-- open the other tabs, or type "help" in the terminal below -->›`,
  },
  {
    name: "ai_ml.py", icon: "🐍", lang: "Python",
    body: `‹c|"""AI and machine learning work."""›

‹k|from› agentnet ‹k|import› Network, pinning_set

‹k|class› ‹t|LLMAgentControllability›:
    ‹s|"""›
    ‹s|Treat a group of LLM agents as a networked dynamical system.›
    ‹s|Ask which agents should receive a verifier's correction, and how›
    ‹s|few are enough for the group to reach the verified answer within›
    ‹s|a given number of rounds.›
    ‹s|"""›
    paper  = ‹s|"Controllability of LLM Agent Networks: Which Agents to Verify, and How Many"›
    status = ‹s|"manuscript in preparation, 2026"›
    pilot  = {‹s|"agents"›: ‹n|30›, ‹s|"runs"›: ‹n|84›, ‹s|"model_calls"›: ‹n|50_400›}
    placement = [‹s|"betweenness"›, ‹s|"eigenvector"›, ‹s|"random"›]
    methods = [‹s|"Laplacian / influence matrices"›, ‹s|"minimum driver agents"›,
               ‹s|"SDRE oversight"›, ‹s|"paired bootstrap, Wilcoxon"›]
    code = ‹a|"github.com/soleimanarebi/llm-agent-controllability"|https://github.com/soleimanarebi/llm-agent-controllability›

‹k|def› ‹f|other_ml_work›():
    ‹k|return› [
        ‹todo|"ML project or role from CV"›,
        ‹todo|"ML project or role from CV"›,
    ]

skills = [‹s|"Python"›, ‹s|"NumPy / SciPy"›, ‹s|"NetworkX"›, ‹s|"LLM agents"›, ‹todo|"more from CV"›]`,
  },
  {
    name: "network_control.m", icon: "📐", lang: "MATLAB",
    body: `‹c|% Network control: steering complex dynamical networks›
‹c|% through a small set of pinned (driver) nodes.›

‹c|% --- pinning control of complex dynamical networks ---›
paper.authors = ‹s|'Ghaffari & Arebi'›;
paper.journal = ‹s|'Nonlinear Dynamics'›;
paper.ref     = ‹s|'83:1003-1013'›;
paper.year    = ‹n|2016›;

‹c|% closed-loop node dynamics›
‹c|%   dx_i/dt = f(x_i) + c * sum_j a_ij * Gamma * x_j - d_i * (x_i - s)›
‹c|% only pinned nodes have d_i > 0›

‹k|function› D = ‹f|choose_drivers›(A, budget)
    L = ‹f|diag›(‹f|sum›(A, ‹n|2›)) - A;      ‹c|% graph Laplacian›
    [~, idx] = ‹f|sort›(‹f|centrality›(A), ‹s|'descend'›);
    D = idx(‹n|1›:budget);
‹k|end›

‹c|% applied since: LLM agent networks (see ai_ml.py)›
projects = { ‹todo|'control project from CV'›, ‹todo|'control project from CV'› };`,
  },
  {
    name: "quantum.jl", icon: "⚛️", lang: "Julia",
    body: `‹c|# Quantum mechanics›

‹k|module› ‹t|Quantum›

‹c|# Schrödinger equation:  iħ ∂ψ/∂t = Ĥψ›
‹k|struct› ‹t|Research›
    topic::‹t|String›
    detail::‹t|String›
‹k|end›

work = [
    ‹t|Research›(‹todo|"topic from CV"›, ‹todo|"one-line summary"›),
    ‹t|Research›(‹todo|"topic from CV"›, ‹todo|"one-line summary"›),
]

‹c|# link to control: quantum systems as controlled dynamical systems›
‹k|end›`,
  },
  {
    name: "energy_analyser.c", icon: "⚡", lang: "C",
    body: `‹c|/* Energy analysers: measuring power, quality and consumption. */›

‹k|#include› ‹s|<stdint.h>›

‹k|typedef struct› {
    ‹t|float› v_rms, i_rms;      ‹c|/* voltage, current        */›
    ‹t|float› p_active, q_react; ‹c|/* W, var                   */›
    ‹t|float› pf, thd;           ‹c|/* power factor, distortion */›
} ‹t|reading_t›;

‹t|float› ‹f|active_power›(‹k|const› ‹t|float› *v, ‹k|const› ‹t|float› *i, ‹t|int› n) {
    ‹t|float› p = ‹n|0›;
    ‹k|for› (‹t|int› k = ‹n|0›; k < n; k++) p += v[k] * i[k];
    ‹k|return› p / n;
}

‹c|/* projects */›
‹k|const char› *work[] = {
    ‹todo|"energy analyser product / project from CV"›,
    ‹todo|"energy analyser product / project from CV"›,
};`,
  },
  {
    name: "projects.json", icon: "🧩", lang: "JSON",
    body: `{
  ‹s|"llm-agent-controllability"›: {
    ‹s|"what"›: ‹s|"Which agents to verify, and how many, in LLM agent networks"›,
    ‹s|"repo"›: ‹a|"soleimanarebi/llm-agent-controllability"|https://github.com/soleimanarebi/llm-agent-controllability›
  },
  ‹s|"glass-designer"›: {
    ‹s|"what"›: ‹s|"Checks glass panes, laminates, IGUs and balustrades against BS EN 16612, IStructE and BS 6180, in 3D"›,
    ‹s|"repo"›: ‹a|"soleimanarebi/glass-designer"|https://github.com/soleimanarebi/glass-designer›
  },
  ‹s|"stone-designer"›: {
    ‹s|"what"›: ‹s|"Checks natural stone cladding panels against BS 8298-2 and BS 8298-4"›,
    ‹s|"repo"›: ‹a|"soleimanarebi/stone-designer"|https://github.com/soleimanarebi/stone-designer›
  },
  ‹s|"more"›: ‹todo|"other projects from CV"›
}`,
  },
  {
    name: "publications.bib", icon: "📚", lang: "BibTeX",
    body: `‹k|@article›{‹t|ghaffari2016pinning›,
  author  = {‹s|Ghaffari and Arebi›},
  title   = {‹todo|exact title from CV›},
  journal = {‹s|Nonlinear Dynamics›},
  volume  = {‹n|83›},
  pages   = {‹n|1003--1013›},
  year    = {‹n|2016›}
}

‹k|@unpublished›{‹t|arebi2026controllability›,
  author = {‹s|S. Arebi›},
  title  = {‹s|Controllability of LLM Agent Networks: Which Agents to Verify, and How Many›},
  note   = {‹s|Manuscript in preparation›},
  year   = {‹n|2026›}
}

‹c|% more from CV›
‹todo|@article{...}›`,
  },
  {
    name: "contact.sh", icon: "✉️", lang: "Shell",
    body: `‹c|#!/usr/bin/env bash›
‹c|# get in touch›

EMAIL=‹todo|"email you want public"›
GITHUB=‹a|"github.com/soleimanarebi"|https://github.com/soleimanarebi›
LINKEDIN=‹todo|"linkedin url from CV"›
SCHOLAR=‹todo|"google scholar url"›

‹f|echo› ‹s|"Open to research collaborations in AI, control and energy systems."›`,
  },
];
