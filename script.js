(() => {
  const $ = (s) => document.querySelector(s),
    reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  // theme
  $("#theme").onclick = () => {
    const r = document.documentElement,
      t = r.dataset.theme === "dark" ? "light" : "dark";
    r.dataset.theme = t;
    try {
      localStorage.setItem("rk-theme", t);
    } catch (e) {}
  };
  // hero letters
  const h = $("#name");
  let i = 0;
  h.querySelectorAll(".ln").forEach((l) => {
    const t = l.textContent;
    l.textContent = "";
    [...t].forEach((c) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.style.setProperty("--i", i++);
      s.textContent = c;
      s.setAttribute("aria-hidden", "true");
      l.append(s);
    });
  });
  requestAnimationFrame(() => document.body.classList.add("ready"));
  const chars = [...h.querySelectorAll(".ch")];
  addEventListener("pointermove", (e) => {
    document.body.style.setProperty("--mx", e.clientX + "px");
    document.body.style.setProperty("--my", e.clientY + "px");
    if (reduce) return;
    chars.forEach((c) => {
      const b = c.getBoundingClientRect(),
        dx = e.clientX - (b.left + b.width / 2),
        dy = e.clientY - (b.top + b.height / 2),
        d = Math.hypot(dx, dy),
        f = Math.max(0, 1 - d / 240);
      c.style.transform = f
        ? `translate(${(-dx / d) * f * 26}px,${(-dy / d) * f * 26}px)`
        : "";
      c.classList.toggle("hot", f > 0.45);
    });
  });
  // work
  // Each entry: [title, type, client, summary, delivered, outcome, optional image path]
  // To show a real image for a project, add a 7th item, e.g. "images/kalpa-agro.jpg"
  const W = [
    [
      "Kotdanda Valley View",
      "Brand identity system",
      "Kotdanda Valley View Restaurant Pvt. Ltd.",
      "A complete brand identity system for a valley-view restaurant, designed to stay consistent across signage, menus, packaging and social media.",
      "Logo and variations, colour palette, typography, brand guidelines, mockups.",
      "A cohesive, recognisable identity ready for launch and everyday use.",
      "images/projects/kotdanda.png",
    ],
    [
      "Kalpa Agro",
      "Brand identity system",
      "Kalpa Agro Pvt. Ltd. (Diwakar Golchha Organisation)",
      "A complete logo and brand system for an agricultural company, built to flex across print, digital and packaging.",
      "Primary and reversed logos, usage system, colour palette, typography, mockups.",
      "A consistent brand kit the company uses across products and marketing.",
      "images/projects/kalpaagro.png",
    ],
    [
      "Zamac Nepal",
      "Event marketing design",
      "Nepalese Scale Model Collectors Community",
      "Posters and social creatives for collector meet-ups and exhibitions, balancing excitement with a recognisable look.",
      "Event posters, social promotions, event branding system.",
      "Stronger brand presence and higher engagement in the collector community.",
      "images/projects/zamacnepal.png",
    ],
    [
      "Healing Beyond the Screen",
      "Event branding and photography",
      "Counseling Psychology Nepal",
      "Calm, empathetic visuals for an event on digital abuse. I led the pre-event visual strategy and photographed the day.",
      "Pre-event creatives, announcements, on-ground photography.",
      "A welcoming, professional identity that matched the theme.",
      "images/projects/cpn.png",
    ],
    [
      "King Chilli",
      "Logo and packaging",
      "KingChilliNp",
      "A bold logo and premium doy pack for a Bhut Jolokia chilli product line.",
      "Logo set (primary, reversed, landscape, single-line), doy pack design.",
      "Premium shelf presence and stronger brand recognition.",
      "images/projects/kingchilli.png",
    ],
    [
      "Danfe Students Council",
      "Branding system",
      "Danfe Students Council",
      "A scalable logo system for a council and its sub-clubs, each with its own identity under one framework.",
      "Council logo, sub-club logo system.",
      "Consistent representation across departments and student initiatives.",
      "images/projects/danfeclub.png",
    ],
    [
      "Green Harvest and Aries Kalpa",
      "Sack packaging",
      "Kalpa Agro",
      "Differentiated packaging for organic and chemical fertiliser, using colour, type and layout to separate the categories.",
      "Two sack designs with print-ready layouts.",
      "Clearer shelves and a more credible brand.",
      "images/projects/kalpaagro-sack.png",
    ],
    [
      "IEEE ICTP 2026",
      "Event visual design",
      "IEEE International Conference on ICT & Photonics",
      "Visuals for an international conference across two phases: call for papers, then event communication.",
      "Promotional designs, event materials, IEEE-aligned assets, banners and standees.",
      "Clear, professional communication with participants worldwide.",
      "images/projects/ieee.png",
    ],
    [
      "AayuTech",
      "Logo and identity sheet",
      "AayuTech",
      "A bilingual Nepali and English identity with minimal colour and clear typography.",
      "Logo variations, light and dark versions, HEX/RGB/CMYK palette, type guidelines, one-page style guide.",
      "A single reference for consistent branding across media.",
      "images/projects/aayutech.png",
    ],
    [
      "S.R. Smiles Dental",
      "Social media design",
      "S.R. Smiles Dental Clinic",
      "Posts, campaigns and reels that explain dental services and promote awareness.",
      "16+ post designs, campaign creatives, templates, 6+ edited short videos.",
      "A cohesive feed that improved consistency and communicated services clearly.",
      "images/projects/srsmiles.png",
    ],
    [
      "NEX",
      "Logo and luxury box pack",
      "NEX, product subsidiary of Nexora Lift",
      "A gold-on-green identity and top-and-bottom box for a luxury products retailer ahead of launch.",
      "Custom logo, box dieline, mockups, print-ready files.",
      "A polished, launch-ready luxury identity.",
    ],
  ];
  const list = $("#list"),
    det = $("#detail");
  function show(n) {
    [...list.children].forEach((li, k) =>
      li.firstChild.setAttribute("aria-current", k === n),
    );
    const p = W[n];
    const cover = p[6]
      ? `<img class="cover" src="${p[6]}" alt="${p[0]}: ${p[1]}" loading="lazy">`
      : `<div class="cover p${n % 4}"></div>`;
    det.innerHTML = `${cover}<div class="dbody"><h3>${p[0]}</h3><p class="role">${p[1]} for ${p[2]}</p><p>${p[3]}</p><p><b>Delivered:</b> ${p[4]}</p><p><b>Outcome:</b> ${p[5]}</p></div>`;
  }
  W.forEach((p, n) => {
    const li = document.createElement("li"),
      b = document.createElement("button");
    b.innerHTML = `${p[0]}<span>${p[1]}</span>`;
    b.onmouseenter = b.onfocus = b.onclick = () => show(n);
    li.append(b);
    list.append(li);
  });
  show(0);
  // experience
  const E = [
    [
      "Apr–Jul 2026",
      "Creative Lead (contract)",
      "Aayu Technologies",
      "UI/UX, logos and a full brand kit for in-house products.",
    ],
    [
      "Oct 2025–Mar 2026",
      "Creative Lead",
      "Nexora Lift",
      "Creative direction for in-house and client brands, Meta ad creatives, motion and video.",
    ],
    [
      "Jul 2023–Oct 2025",
      "Creative Associate",
      "BitsKraft",
      "Identities for Koili IPN, MikhaAI, Taxule and DigiVersity; ran brand presence at CAN Infotech, the ABA Conference and Nepal Fintech Festival.",
    ],
    [
      "Sep 2022–Sep 2023",
      "Lead Graphic Designer",
      "Bridgewater Education Foundation",
      "Grew social reach 70%, set a brand style guide, shot and edited Seekshya.com courses.",
    ],
    [
      "Mar 2022–May 2023",
      "IT Officer (parallel role)",
      "Bridgewater Education Foundation",
      "Built and ran Seekshya.com on Graphy; streamlined creative and IT workflows.",
    ],
    [
      "Jan 2021–Sep 2024",
      "Freelance Graphic Designer",
      "Independent",
      "Logos, packaging, ads, brochures and brand kits for clients in Nepal and abroad.",
    ],
  ];
  $("#tl").innerHTML = E.map(
    (e) =>
      `<li><time>${e[0]}</time><div><h3>${e[1]}</h3><p class="co">${e[2]}</p><p>${e[3]}</p></div></li>`,
  ).join("");
  // testimonials
  // Each entry: [quote, person, role and company, optional photo path]
  // REPLACE THESE PLACEHOLDERS with real words from real clients before publishing.
  // Ask past clients for 2–3 sentences; a LinkedIn recommendation works too (ask permission to quote it).
  const T = [
    [
      "[Client quote: what was the problem, what did Rabin do, what changed for the business?]",
      "[Client name]",
      "[Role], Kotdanda Valley View Restaurant",
    ],
    [
      "[Client quote: how was working with Rabin, and what result did the brand or packaging bring?]",
      "[Client name]",
      "[Role], Kalpa Agro",
    ],
    [
      "[Manager or colleague quote: what was Rabin like to work with as a creative lead?]",
      "[Name]",
      "[Role], Nexora Lift",
    ],
  ];
  let q = 0;
  const qEl = $("#quote");
  function quote(n) {
    q = (n + T.length) % T.length;
    const [text, who, role, img] = T[q],
      initials = who.replace(/[^A-Za-z ]/g, "").split(" ").map((w) => w[0]).join("").slice(0, 2) || "★",
      av = img ? `<img src="${img}" alt="">` : initials;
    qEl.innerHTML = `<blockquote>${text}</blockquote><figcaption><span class="av" aria-hidden="true">${av}</span><div><b>${who}</b><span>${role}</span></div></figcaption>`;
    $("#qcount").textContent = `${String(q + 1).padStart(2, "0")} / ${String(T.length).padStart(2, "0")}`;
  }
  $("#qprev").onclick = () => quote(q - 1);
  $("#qnext").onclick = () => quote(q + 1);
  if (T.length < 2) $(".qnav").hidden = true;
  quote(0);
  // playground
  const bd = $("#board"),
    G = ["✕", "◐", "▲", "●", "✦", "◼", "↑", "+", "◍", "◢", "✳", "▬"];
  function add(x, y) {
    const g = document.createElement("div");
    g.className = "g";
    g.textContent = G[(Math.random() * G.length) | 0];
    g.style.left = x + "px";
    g.style.top = y + "px";
    g.style.fontSize = 2 + Math.random() * 3.5 + "rem";
    g.onpointerdown = (e) => {
      e.stopPropagation();
      g.setPointerCapture(e.pointerId);
      g.classList.add("drag");
      const ox = e.clientX - g.offsetLeft,
        oy = e.clientY - g.offsetTop;
      g.onpointermove = (m) => {
        g.style.left = m.clientX - ox + "px";
        g.style.top = m.clientY - oy + "px";
      };
      g.onpointerup = () => {
        g.classList.remove("drag");
        g.onpointermove = null;
      };
    };
    bd.append(g);
  }
  function scatter() {
    bd.querySelectorAll(".g").forEach((g) => {
      g.style.left = Math.random() * (bd.clientWidth - 70) + "px";
      g.style.top = Math.random() * (bd.clientHeight - 70) + "px";
      g.style.transform = `rotate(${(Math.random() * 180 - 90) | 0}deg)`;
    });
  }
  for (let k = 0; k < 14; k++) add(0, 0);
  scatter();
  bd.onpointerdown = (e) => {
    const r = bd.getBoundingClientRect();
    add(e.clientX - r.left - 25, e.clientY - r.top - 25);
  };
  $("#scatter").onclick = scatter;
  $("#clear").onclick = () =>
    bd.querySelectorAll(".g").forEach((g) => g.remove());
})();