# Portfolio

Personal site for Soleiman Arebi: a two-column dark layout covering AI oversight, nonlinear dynamics and complex networks.

- `index.html`: home page (about, research, experience, publications)
- `research/`: one page per manuscript with its abstract and result figures (`research/img/`)
- `network.js`: the animated agent-network canvas used on the home and research pages
- `style.css`: layout and theme for every page
- `app.js`: cursor spotlight and active nav highlighting; `research/paper.js`: figure lightbox and result bars

No build step. Netlify publishes the repo root (`netlify.toml`) on every push to `main`.
