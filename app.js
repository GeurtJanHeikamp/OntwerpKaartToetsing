/* Ontwerpkaart Digitaal Toetsen — app.js
   Vanilla JS, volledig client-side (geschikt voor GitHub Pages). */
(function () {
  "use strict";
  const root = document.getElementById("app");
  const ids = DIMENSIES.map((d) => d.id);
  const state = { sturing: null, niveau: null, groep: null, functie: null, toonZwak: false };

  /* ---- keuzes laden/delen via URL-hash: #k=docent,begrijpen,individueel,beslis ---- */
  (function loadHash() {
    const m = window.location.hash.match(/^#k=(.*)$/);
    if (!m) return;
    m[1].split(",").forEach((v, i) => {
      const dim = DIMENSIES[i];
      if (dim && dim.opties.some((o) => o.id === v)) state[dim.id] = v;
    });
  })();

  function syncHash() {
    const chosen = ids.map((id) => state[id] || "");
    const h = chosen.some(Boolean) ? "#k=" + chosen.join(",") : "";
    history.replaceState(null, "", window.location.pathname + h);
  }

  /* ---- matching ---- */
  function dimMatch(sc, dimId, choice) {
    if (!choice) return null; // niet gekozen
    const vals = sc[dimId];
    if (vals.includes(choice)) return true;
    /* een scenario voor 'beide' dient zowel leer- als beslisfunctie */
    if (dimId === "functie" && vals.includes("beide") && choice !== "beide") return true;
    return false;
  }

  function scoreAll() {
    const gekozen = ids.filter((id) => state[id]);
    return SCENARIOS.map((sc, idx) => {
      const per = {};
      let score = 0;
      ids.forEach((id) => {
        per[id] = dimMatch(sc, id, state[id]);
        if (per[id]) score++;
      });
      return { sc, idx, per, score, totaal: gekozen.length };
    })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.idx - b.idx);
  }

  /* ---- helpers ---- */
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function label(dimId, optId) {
    const d = DIMENSIES.find((x) => x.id === dimId);
    return d.opties.find((o) => o.id === optId).label;
  }

  /* ---- render ---- */
  function render() {
    root.innerHTML = "";
    root.appendChild(renderHeader());
    root.appendChild(renderHero());
    root.appendChild(renderPicker());
    root.appendChild(renderResults());
    root.appendChild(el("p", "source-note",
      "Bron: ontwerpkaart voor toetsing (dimensies, combinaties en toetsscenario's). Een scenario met functie 'Beide' telt mee bij zowel leer- als beslisfunctie."));
  }

  function renderHeader() {
    const h = el("header", "app-header");
    const brand = el("div", "brand",
      '<span class="brand-mark"><img src="assets/npuls-mark.png" alt="" onerror="this.style.display=\'none\'" /></span>' +
      '<span class="brand-text">Npuls<strong>Ontwerpkaart Digitaal Toetsen</strong></span>');
    h.appendChild(brand);
    return h;
  }

  function renderHero() {
    const hero = el("section", "hero");
    hero.innerHTML =
      "<h1>Welke toetsvorm past bij uw situatie?</h1>" +
      '<p class="lede">Kies hieronder per dimensie één optie. Direct daaronder verschijnen de toetsscenario’s en toetsvormen die het best aansluiten, met per scenario hoeveel dimensies overeenkomen.</p>';
    return hero;
  }

  function renderPicker() {
    const wrap = el("section", "picker");
    DIMENSIES.forEach((d, i) => {
      const box = el("div", "dim");
      box.style.setProperty("--dim-color", d.kleur);
      box.setAttribute("role", "group");
      box.setAttribute("aria-label", d.naam);
      box.appendChild(el("h2", "dim-title", '<span class="dim-num">' + (i + 1) + "</span>" + d.naam));
      const opts = el("div", "dim-options");
      d.opties.forEach((o) => {
        const on = state[d.id] === o.id;
        const b = el("button", "opt" + (on ? " on" : ""), o.label);
        b.setAttribute("aria-pressed", on);
        b.addEventListener("click", () => {
          state[d.id] = on ? null : o.id;
          syncHash();
          render();
          keepPickerInView();
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      wrap.appendChild(box);
    });
    return wrap;
  }

  function keepPickerInView() {
    const r = document.getElementById("results");
    if (r && r.getBoundingClientRect().top > window.innerHeight) return;
  }

  function renderResults() {
    const sec = el("section", "results");
    sec.id = "results";
    const gekozen = ids.filter((id) => state[id]);

    /* samenvatting van de keuzes */
    const bar = el("div", "summary");
    const chips = el("div", "summary-chips");
    DIMENSIES.forEach((d) => {
      const c = el("span", "chip" + (state[d.id] ? " chip-fill" : " chip-empty"),
        state[d.id] ? label(d.id, state[d.id]) : d.naam + ": nog geen keuze");
      c.style.setProperty("--dim-color", d.kleur);
      chips.appendChild(c);
    });
    bar.appendChild(chips);
    const acts = el("div", "summary-actions");
    if (gekozen.length) {
      const share = el("button", "btn btn-ghost", "Kopieer link");
      share.addEventListener("click", () => {
        const url = window.location.href;
        (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
          .then(() => { share.textContent = "Link gekopieerd ✓"; setTimeout(() => (share.textContent = "Kopieer link"), 2000); })
          .catch(() => prompt("Kopieer deze link:", url));
      });
      acts.appendChild(share);
      const print = el("button", "btn btn-ghost", "Bewaar als PDF");
      print.addEventListener("click", () => window.print());
      acts.appendChild(print);
      const reset = el("button", "btn btn-text", "Wis keuzes");
      reset.addEventListener("click", () => {
        ids.forEach((id) => (state[id] = null));
        state.toonZwak = false;
        syncHash();
        render();
      });
      acts.appendChild(reset);
    }
    bar.appendChild(acts);
    sec.appendChild(bar);

    if (!gekozen.length) {
      sec.appendChild(el("p", "empty", "Maak een keuze bij minstens één dimensie om scenario’s te zien."));
      return sec;
    }

    const all = scoreAll();
    const sterk = all.filter((r) => r.score >= Math.min(gekozen.length, 3) && r.score >= Math.ceil(gekozen.length * 0.75));
    const zwak = all.filter((r) => !sterk.includes(r));

    const volledig = all.filter((r) => r.score === gekozen.length).length;
    sec.appendChild(el("h2", "results-title",
      volledig
        ? volledig + (volledig === 1 ? " scenario past" : " scenario’s passen") + " volledig bij uw keuzes"
        : "Geen scenario past volledig; dit zijn de dichtstbijzijnde"));

    if (!all.length) {
      sec.appendChild(el("p", "empty", "Geen enkel scenario komt overeen met deze keuzes. Pas een of meer keuzes aan."));
      return sec;
    }

    const list = el("div", "scenario-list");
    (sterk.length ? sterk : all.slice(0, 3)).forEach((r) => list.appendChild(renderScenario(r, gekozen.length)));
    sec.appendChild(list);

    const rest = sterk.length ? zwak : all.slice(3);
    if (rest.length) {
      const t = el("button", "btn btn-ghost toggle-weak",
        state.toonZwak ? "Verberg zwakkere matches" : "Toon ook zwakkere matches (" + rest.length + ")");
      t.addEventListener("click", () => { state.toonZwak = !state.toonZwak; render(); });
      sec.appendChild(t);
      if (state.toonZwak) {
        const l2 = el("div", "scenario-list weak");
        rest.forEach((r) => l2.appendChild(renderScenario(r, gekozen.length)));
        sec.appendChild(l2);
      }
    }
    return sec;
  }

  function renderScenario(r, aantalGekozen) {
    const card = el("article", "scenario" + (r.score === aantalGekozen ? " full" : ""));
    const meter = el("div", "meter");
    DIMENSIES.forEach((d) => {
      const m = el("span", "pip" + (r.per[d.id] ? " pip-on" : ""));
      m.style.setProperty("--dim-color", d.kleur);
      m.title = d.naam + (r.per[d.id] === null ? ": niet gekozen" : r.per[d.id] ? ": komt overeen" : ": wijkt af");
      if (r.per[d.id] === null) m.classList.add("pip-skip");
      meter.appendChild(m);
    });

    const head = el("div", "scenario-head");
    head.appendChild(el("div", "", '<p class="theme">' + r.sc.thema + "</p><h3>" + r.sc.naam + "</h3>"));
    const score = el("div", "score");
    score.appendChild(meter);
    score.appendChild(el("span", "score-text", r.score + " van " + aantalGekozen + " dimensies"));
    head.appendChild(score);
    card.appendChild(head);

    const dims = el("div", "scenario-dims");
    DIMENSIES.forEach((d) => {
      const row = el("div", "dimrow");
      row.style.setProperty("--dim-color", d.kleur);
      row.appendChild(el("span", "dimrow-name", d.naam));
      r.sc[d.id].forEach((v) => {
        const hit = state[d.id] && (v === state[d.id] || (d.id === "functie" && v === "beide" && state[d.id] !== "beide"));
        row.appendChild(el("span", "chip small" + (hit ? " chip-fill" : ""), label(d.id, v)));
      });
      dims.appendChild(row);
    });
    card.appendChild(dims);

    const vormen = el("div", "forms");
    vormen.appendChild(el("p", "forms-title", "Passende toetsvormen"));
    const ul = el("ul", "forms-list");
    r.sc.vormen.forEach((v) => ul.appendChild(el("li", "", v)));
    vormen.appendChild(ul);
    card.appendChild(vormen);
    return card;
  }

  render();
})();
