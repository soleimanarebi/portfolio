// Site content. Each file is a tab in the editor.
// Inline markup: ‹k|keyword› ‹f|function› ‹s|string› ‹n|number› ‹c|comment›
// ‹t|type› ‹h|heading› ‹todo|placeholder› ‹a|label|url›
window.PROFILE = {
  name: "Soleiman Arebi",
  handle: "soleiman",
  github: "https://github.com/soleimanarebi",
  linkedin: "https://www.linkedin.com/in/soleiman-arebi-0ba898103",
};

window.FILES = [
  {
    name: "about.md", icon: "📄", lang: "Markdown",
    body: `‹h|# Soleiman Arebi›
‹c|PhD · CEng MIMechE · Kingston upon Thames, UK›

Control theorist working on oversight of multi-agent AI systems.

My PhD developed pinning control and controllability methods for
nonlinear complex dynamical networks: which nodes to drive, how many,
and with what controller. I now apply this to teams of language-model
agents, treating verifiers as control inputs and the communication
graph as the network.

18 years of modelling, simulation and data-driven control across
research and industry: robotics and mechatronics, solar energy,
building energy and HVAC control, and façade engineering.

‹h|## Focus›
- ‹s|AI & ML›            oversight of LLM agent networks, digital twins
- ‹s|Network control›    pinning control, controllability, consensus
- ‹s|Quantum mechanics›  ‹todo|what you'd like to show here›
- ‹s|Energy analysers›   building energy, solar collectors, CFD, HVAC

‹h|## Now›
Mechanical & Façade Engineer, Glass and Façade Solutions Ltd (2022–)
Board Member, IMechE Construction & Building Services Division (2022–)
Independent research on controllability of LLM agent networks (2026)

‹c|<!-- open the other tabs, or type "help" in the terminal below -->›`,
  },
  {
    name: "ai_ml.py", icon: "🐍", lang: "Python",
    body: `‹c|"""AI and machine learning."""›

‹k|class› ‹t|LLMAgentControllability›:
    ‹s|"""Which agents to verify, and how many.›
    ‹s|Treat a group of LLM agents as a networked dynamical system and›
    ‹s|choose the minimum number of verifier (driver) agents for a›
    ‹s|target settling time."""›
    status    = ‹s|"manuscript in preparation, 2026"›
    pilot     = {‹s|"claude_agents"›: ‹n|30›, ‹s|"runs"›: ‹n|84›, ‹s|"model_calls"›: ‹n|50_400›}
    placement = [‹s|"betweenness"›, ‹s|"closeness"›, ‹s|"eigenvector"›, ‹s|"random"›]
    extras    = [‹s|"bounded-influence and runaway agents"›, ‹s|"SDRE oversight"›,
                 ‹s|"capture by compromised verifiers"›]
    code      = ‹a|"github.com/soleimanarebi/llm-agent-controllability"|https://github.com/soleimanarebi/llm-agent-controllability›

    ‹k|def› ‹f|results›(self):
        ‹k|return› {
            ‹s|"betweenness vs random placement"›: ‹s|"13-17 pts lower final error (p = 0.001)"›,
            ‹s|"linear consensus model, held-out graphs"›: ‹s|"r = 0.92"›,
        }

‹k|class› ‹t|LLMAgentCollectives›:
    ‹s|"""Network topology, verifier placement and coordination dynamics.›
    ‹s|Multi-agent LLM debate as a networked dynamical system."""›
    benchmarks = [‹s|"GSM8K"›, ‹s|"AIME"›]
    status     = ‹s|"manuscript in preparation"›

‹k|class› ‹t|HVACDigitalTwin›:   ‹c|# Leaftech, Germany, 2021-2022›
    ‹s|"""Data-driven HVAC control using an AI/ML digital twin of the building."""›

earlier = [‹s|"genetic-algorithm parameter identification"›, ‹s|"AHS fuzzy modelling"›]

stack = [‹s|"Python"›, ‹s|"NumPy"›, ‹s|"SciPy"›, ‹s|"NetworkX"›, ‹s|"asyncio"›, ‹s|"Anthropic SDK"›,
         ‹s|"bootstrap / Wilcoxon / held-out validation"›, ‹s|"AWS Machine Learning"›]`,
  },
  {
    name: "network_control.m", icon: "📐", lang: "MATLAB",
    body: `‹c|% Network control: steering complex dynamical networks›
‹c|% through a small set of pinned (driver) nodes.›
‹c|% PhD, Mechanical Engineering, K. N. Toosi University of Technology, 2010-2016›

‹c|% closed-loop node dynamics›
‹c|%   dx_i/dt = f(x_i) + c * sum_j a_ij * Gamma * x_j + u_i›
‹c|%   u_i = -K_i(x_i) * (x_i - s)   only for pinned nodes›
‹c|%   K_i(x) from a suboptimal SDRE controller›

‹k|function› D = ‹f|choose_drivers›(A, k)
    L = ‹f|diag›(‹f|sum›(A, ‹n|2›)) - A;        ‹c|% graph Laplacian›
    [~, idx] = ‹f|sort›(‹f|centrality›(A), ‹s|'descend'›);
    D = idx(‹n|1›:k);                  ‹c|% drive the most central nodes›
‹k|end›

research = {
    ‹s|'pinning control and synchronization of nonlinear complex networks'›
    ‹s|'driver-node selection by network centrality'›
    ‹s|'pinning consensus of nonlinearly diffusively coupled multi-agent systems'›
    ‹s|'suboptimal SDRE controllers'›
};

testbeds = {                       ‹c|% KNTU Mechatronics Research Group, 2006-2016›
    ‹s|'quadrotor hardware-in-the-loop flight rig'›
    ‹s|'ground-air formation control setup'›
    ‹s|'servomotor synchronization platform'›
    ‹s|'MEMS gyro-free inertial navigation calibrators'›
    ‹s|'7-DOF manipulator for a bending cell'›
};

theory = {‹s|'Lyapunov'›, ‹s|'SDRE'›, ‹s|'LQR'›, ‹s|'graph theory'›, ‹s|'system identification'›};`,
  },
  {
    name: "quantum.jl", icon: "⚛️", lang: "Julia",
    body: `‹c|# Quantum mechanics›

‹c|# Schrödinger equation:  iħ ∂ψ/∂t = Ĥψ›
‹c|# a quantum system is a controlled dynamical system too›

‹k|module› ‹t|Quantum›

work = [
    ‹todo|"quantum mechanics work or interest to add"›,
]

‹k|end›`,
  },
  {
    name: "energy_analyser.c", icon: "⚡", lang: "C",
    body: `‹c|/* Energy analysis: buildings, solar and wind. */›

‹k|typedef struct› {
    ‹k|const char› *what;
    ‹k|const char› *where;
} ‹t|work_t›;

‹k|const› ‹t|work_t› energy[] = {
    { ‹s|"building energy assessment: heating, cooling, lighting"›, ‹s|"Glass and Façade Solutions, 2022-"› },
    { ‹s|"façade thermal modelling: U-values, thermal bridges, condensation risk"›, ‹s|"Brent Cross and others"› },
    { ‹s|"data-driven HVAC control with an AI/ML digital twin"›, ‹s|"Leaftech, 2021-2022"› },
    { ‹s|"wind engineering for sensor placement on automatic shading"›, ‹s|"Leaftech, 2021"› },
    { ‹s|"CFD team lead, parabolic solar collectors"›, ‹s|"MAPNA, Yazd solar power plant"› },
    { ‹s|"parabolic solar collector design: structure, bearings, control, hydraulics"›, ‹s|"MAPNA"› },
};

‹c|/* papers */›
‹k|const char› *solar[] = {
    ‹s|"Thermal modelling of parabolic solar water heaters (Osaka, 2011)"›,
    ‹s|"GA design of parabolic solar water heaters (ISES Solar World Congress, Kassel, 2011)"›,
    ‹s|"Collector model with tracking error, GA identification (ISME, 2010)"›,
    ‹s|"Turbulent wind flow over parabolic collector arrays (ISME, 2006)"›,
};

‹c|/* tools: ANSYS Fluent, STAR-CCM+, Abaqus, Design Builder, IES, Physibel */›`,
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
    ‹s|"what"›: ‹s|"Checks natural stone cladding panels against BS 8298-2 and BS 8298-4, in 3D"›,
    ‹s|"repo"›: ‹a|"soleimanarebi/stone-designer"|https://github.com/soleimanarebi/stone-designer›
  },
  ‹s|"patents"›: [
    ‹s|"Solar parabolic trough collector water heater (No. 61054)"›,
    ‹s|"MEMS active calibrator mechanism (No. 85931)"›
  ]
}`,
  },
  {
    name: "publications.bib", icon: "📚", lang: "BibTeX",
    body: `‹k|@article›{‹t|ghaffari2016pinning›,
  author  = {‹s|A. Ghaffari and S. Arebi›},
  title   = {‹s|Pinning control for synchronization of nonlinear complex›
             ‹s|dynamical networks with suboptimal SDRE controllers›},
  journal = {‹s|Nonlinear Dynamics›}, volume = {‹n|83›}, pages = {‹n|1003--1013›}, year = {‹n|2016›},
  doi     = {‹a|10.1007/s11071-015-2383-8|https://doi.org/10.1007/s11071-015-2383-8›}
}

‹k|@article›{‹t|ghaffari2016controllability›,
  author  = {‹s|A. Ghaffari and S. Arebi›},
  title   = {‹s|Pinning controllability of dynamical networks based on›
             ‹s|synchronized motion performance›},
  journal = {‹s|Modares Mechanical Engineering›}, volume = {‹n|15›}, number = {‹n|11›},
  pages   = {‹n|75--83›}, year = {‹n|2016›}, note = {‹s|in Persian›}
}

‹k|@unpublished›{‹t|arebi2026controllability›,
  title = {‹s|Controllability of LLM Agent Networks: Which Agents to Verify, and How Many›},
  note  = {‹s|Manuscript in preparation›}, year = {‹n|2026›}
}

‹k|@unpublished›{‹t|arebi2026collectives›,
  title = {‹s|Controlling LLM Agent Collectives: Network Topology, Verifier›
           ‹s|Placement, and Coordination Dynamics›},
  note  = {‹s|Manuscript in preparation›}
}

‹c|% conferences: ISME 2016 · ICEE 2016 · CSICC 2016 · Facade Tectonics, LA 2018 ·›
‹c|% ISES Solar World Congress 2011 · TTC14 2015 · ISME 2010, 2006›
‹c|% reviewer: IEEE TNNLS · Physics Letters A · Elsevier · Springer›
‹c|% all papers:› ‹a|Google Scholar|https://scholar.google.com/citations?user=eqObDC4AAAAJ&hl=en›`,
  },
  {
    name: "cv.yaml", icon: "🎓", lang: "YAML",
    body: `‹t|experience›:
  - ‹k|role›: ‹s|Mechanical & Façade Engineer›
    ‹k|at›: ‹s|Glass and Façade Solutions Ltd, UK›
    ‹k|when›: ‹s|2022 – present›
    ‹k|did›: ‹s|FEM and CFD thermal and structural modelling, scripted analysis pipelines›
  - ‹k|role›: ‹s|Engineer›
    ‹k|at›: ‹s|Leaftech, Germany›
    ‹k|when›: ‹s|2021 – 2022›
    ‹k|did›: ‹s|AI/ML digital-twin HVAC control, wind engineering›
  - ‹k|role›: ‹s|Researcher, Mechatronics & Robotics and Control›
    ‹k|at›: ‹s|K. N. Toosi University of Technology, Tehran›
    ‹k|when›: ‹s|2006 – 2016›
  - ‹k|role›: ‹s|R&D and engineering›
    ‹k|at›: ‹s|Cabiran · Arvin Uzman · Kianit · MAPNA (solar CFD lead)›
    ‹k|when›: ‹s|2007 – 2021›

‹t|education›:
  - ‹s|PhD, Mechanical Engineering (control of dynamical networks), KNTU, 2016›
  - ‹s|MSc, Façade Engineering, University of the West of England, 2022›
  - ‹s|MSc, Mechanical Engineering, KNTU, 2009›
  - ‹s|BSc, Mechanical Engineering, Shiraz University, 2005›

‹t|memberships›: [‹s|CEng MIMechE›, ‹s|IMechE CBSD Board›, ‹s|MSFE›, ‹s|MCIBSE›, ‹s|CWCT›]`,
  },
  {
    name: "contact.sh", icon: "✉️", lang: "Shell",
    body: `‹c|#!/usr/bin/env bash›
‹c|# get in touch›

EMAIL=‹a|"soleiman.arebi@gmail.com"|mailto:soleiman.arebi@gmail.com›
LINKEDIN=‹a|"linkedin.com/in/soleiman-arebi-0ba898103"|https://www.linkedin.com/in/soleiman-arebi-0ba898103›
GITHUB=‹a|"github.com/soleimanarebi"|https://github.com/soleimanarebi›
SCHOLAR=‹a|"Google Scholar"|https://scholar.google.com/citations?user=eqObDC4AAAAJ&hl=en›

‹f|echo› ‹s|"Open to research collaborations on AI oversight, network control and energy systems."›`,
  },
];
