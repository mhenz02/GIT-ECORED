(function () {
  const ASSETS = "public/assets/";
  const terms = {
    AEM: "Anion Exchange Membrane: membrana per trasporto di anioni nelle celle elettrochimiche.",
    MEA: "Membrane Electrode Assembly: assemblaggio membrana-elettrodi in architetture zero-gap.",
    GDE: "Gas Diffusion Electrode: elettrodo che porta CO2 gassosa verso il catalizzatore.",
    FTO: "Freedom to operate: verifica che prodotto, processo e componenti non violino brevetti di terzi.",
    TRL: "Technology Readiness Level: scala di maturita tecnologica dal laboratorio al mercato.",
    FE_CO: "Efficienza faradica verso CO: quota di corrente che produce monossido di carbonio."
  };

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function enhanceHeader() {
    const topbar = document.querySelector(".topbar");
    if (!topbar || topbar.querySelector(".brand-lockup")) return;
    topbar.insertAdjacentHTML("afterbegin", `
      <div class="brand-lockup">
        <div class="brand-mark"><span class="brand-symbol">E+</span><span>ECO-RED</span></div>
        <div class="brand-meta">CO2 electrolysis intelligence platform</div>
      </div>
    `);
  }

  function enhanceHome() {
    const page = document.getElementById("page-home");
    if (!page || page.querySelector(".premium-home-hero")) return;
    page.insertAdjacentHTML("afterbegin", `
      <section class="premium-home-hero">
        <div>
          <div class="eyebrow">Investor-grade deep-tech intelligence</div>
          <h2>From CO2 waste to CO value.</h2>
          <p>
            ECO-RED is framed as a low-temperature electrochemical route for converting captured CO2 into industrial CO.
            This platform connects startup positioning, scientific frontier, patent defensibility and market readiness.
          </p>
          <div class="premium-cta-row">
            <button class="btn primary" data-premium-go="technology">Explore IP landscape</button>
            <button class="btn ghost" data-premium-go="integrated">Science/IP matrix</button>
            <button class="btn ghost" data-premium-go="strategy">Investment readiness</button>
          </div>
        </div>
        <div class="premium-visual-card">
          <img src="${ASSETS}eco_red_value_proposition.png" alt="ECO-RED value proposition flow">
        </div>
      </section>
      <div class="story-rail">
        <div class="story-node"><b>1. Problem</b><span>Industrial CO is fossil-dependent.</span></div>
        <div class="story-node"><b>2. Technology</b><span>AEM/MEA CO2 electrolysis.</span></div>
        <div class="story-node"><b>3. Science</b><span>Publication frontier and KPI signals.</span></div>
        <div class="story-node"><b>4. IP</b><span>Patents, assignees, citations.</span></div>
        <div class="story-node"><b>5. Market</b><span>Hard-to-abate demand and policy.</span></div>
        <div class="story-node"><b>6. Strategy</b><span>Risks, FTO, roadmap.</span></div>
        <div class="story-node"><b>7. Data room</b><span>Evidence and limits.</span></div>
      </div>
    `);
    page.querySelectorAll("[data-premium-go]").forEach(btn => {
      btn.addEventListener("click", () => {
        const nav = document.querySelector(`#mainNav [data-page="${btn.dataset.premiumGo}"]`);
        if (nav) nav.click();
      });
    });
  }

  function enhanceProfile() {
    const page = document.getElementById("page-profile");
    if (!page || page.querySelector(".visual-band")) return;
    const head = page.querySelector(".section-head");
    if (!head) return;
    head.insertAdjacentHTML("afterend", `
      <div class="visual-band">
        <img src="${ASSETS}eco_red_product.png" alt="ECO-RED electrolyzer visual">
        <div class="card spotlight-card">
          <h3>How to read ECO-RED</h3>
          <p>
            The startup should be evaluated as an integrated system: catalyst, MEA/GDE architecture,
            stack engineering, FTO, safety, market pull and investor readiness.
          </p>
          <div class="detail-row"><b>Strategic lens</b>Not only a catalyst story, but a route from CO2 to industrial CO.</div>
          <div class="detail-row"><b>Critical proof</b>Durability, current density, FE_CO, purity and full-cell repeatability.</div>
        </div>
      </div>
    `);
  }

  function enhanceGlossary() {
    if (document.querySelector(".floating-glossary")) return;
    const btn = document.createElement("button");
    btn.className = "floating-glossary";
    btn.innerHTML = "<span>?</span> Glossary";
    btn.addEventListener("click", openGlossary);
    document.body.appendChild(btn);
  }

  function openGlossary() {
    const drawer = document.getElementById("drawer");
    const backdrop = document.getElementById("drawerBackdrop");
    const title = document.getElementById("drawerTitle");
    const eyebrow = document.getElementById("drawerEyebrow");
    const body = document.getElementById("drawerBody");
    if (!drawer || !body) return;
    eyebrow.textContent = "Technical glossary";
    title.textContent = "Key terms for non-specialists";
    body.innerHTML = Object.entries(terms).map(([k, v]) => `
      <div class="detail-row"><b>${k}</b>${v}</div>
    `).join("") + `
      <div class="card spotlight-card">
        <h3>Reading rule</h3>
        <p>Every metric must be read together: FE_CO, current density and stability are not interchangeable.</p>
      </div>
    `;
    drawer.classList.add("show");
    backdrop.classList.add("show");
  }

  function annotateTerms() {
    const activePage = document.querySelector(".page.active");
    if (!activePage || activePage.dataset.annotated === "1") return;
    activePage.dataset.annotated = "1";
    const walker = document.createTreeWalker(activePage, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || node.parentElement.closest("script,style,button,input,select,.tech-term")) {
          return NodeFilter.FILTER_REJECT;
        }
        return Object.keys(terms).some(t => node.nodeValue.includes(t)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.slice(0, 24).forEach(node => {
      let html = node.nodeValue;
      Object.entries(terms).forEach(([term, def]) => {
        html = html.replaceAll(term, `<span class="tech-term" title="${def}">${term}</span>`);
      });
      const span = document.createElement("span");
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    });
  }

  function enhanceActivePage() {
    enhanceHeader();
    enhanceHome();
    enhanceProfile();
    enhanceGlossary();
    annotateTerms();
  }

  ready(() => {
    enhanceActivePage();
    const observer = new MutationObserver(() => enhanceActivePage());
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(enhanceActivePage, 500);
    setTimeout(enhanceActivePage, 1500);
  });
})();
