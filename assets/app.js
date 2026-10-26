(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const EMAIL = 'ChienDV.B23CE012@stu.ptit.edu.vn';
  const GH_USER = 'duahauhz';
  // Repos to show first in the GitHub section (exact repo names). Leave empty to rank by stars, then recency.
  const PINNED = [];

  // small DOM builder: el('a', {href}, 'text', child)
  function el(tag, props = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'className') n.className = v;
      else n.setAttribute(k, v);
    }
    kids.forEach((k) => n.append(k));
    return n;
  }

  /* ───────── content ───────── */
  const ITEMS = [
    {
      id: 'harvard', cats: ['award', 'research'], wide: true,
      date: '11 Apr 2026', title: 'Promising Award',
      sub: 'Harvard University Global Hackathon 2026 · Vietnam Hub',
      more: 'Small-lesion detection on X-ray images with YOLO.',
      desc: 'Organized by the Health Systems Innovation Lab, Harvard T.H. Chan School of Public Health. Our project detects small disease regions on X-ray images with YOLO.',
      imgs: [
        { src: 'img/harvard-award.jpg', pos: '50% 85%', alt: 'HAU holding the Promising Award certificate on stage at the Harvard Hackathon, Vietnam Hub' },
        { src: 'img/harvard-group.jpg', pos: '50% 50%', alt: 'Group photo of the awardees at the Harvard Hackathon, Vietnam Hub' },
      ],
    },
    {
      id: 'paper', cats: ['research'],
      date: 'Sep 2026', title: 'Paper accepted',
      sub: 'ASIANComNet 2026 · first author & presenter',
      more: 'SAM-assisted dataset generation, single-stage YOLO segmentation.',
      desc: 'SAM-Assisted Dataset Generation for Food Recognition and Calorie Estimation with Single-Stage YOLO Segmentation. Corresponding author: Nguyen Quang Huy. I am the one presenting it at the conference.',
      imgs: [
        { src: 'img/asiancomnet-presenting.jpg', pos: '50% 20%', alt: 'HAU presenting at ASIANComNet 2026' },
        { src: 'img/asiancomnet-email.jpg', pos: '50% 0%', alt: 'Acceptance notification from the 2026 ASIAN Conference on Communication and Networks' },
      ],
    },
    {
      id: 'olympic', cats: ['award'],
      date: '12 Oct 2025', title: 'Consolation Prize',
      sub: 'Olympic AI PTIT 2025',
      more: 'Posts and Telecommunications Institute of Technology, Hanoi.',
      desc: 'Consolation Prize at the Olympic AI contest held at PTIT, Hanoi, on 12 October 2025.',
      imgs: [{ src: 'img/olympic-ai.jpg', pos: '50% 30%', alt: 'HAU with flowers and the Olympic AI PTIT 2025 consolation prize board' }],
    },
    {
      id: 'young', cats: ['award', 'research'],
      date: 'Dec 2025', title: '3rd Prize + Most Favorite',
      sub: 'Young Creation 2025 · HUST',
      more: '2nd Prize, Most Favorite Product — AI for ethnic-minority languages.',
      desc: 'Final round of Young Creation 2025 at the Hanoi University of Science and Technology: 3rd Prize and 2nd Prize for Most Favorite Product, for an AI application for ethnic-minority languages.',
      imgs: [
        { src: 'img/young-creation-award.jpg', pos: '50% 35%', alt: 'HAU holding the prize boards at the Young Creation 2025 final' },
        { src: 'img/young-creation-stage.jpg', pos: '50% 50%', alt: 'Awardees on stage at the Young Creation 2025 final' },
      ],
    },
    {
      id: 'afl', cats: ['award', 'research'],
      date: '2025', title: '3rd Prize',
      sub: 'AI FOR LIFE 2025 · PTIT',
      more: 'Smart Traffic Light Management System.',
      desc: 'Awarded for the Smart Traffic Light Management System — the same project defended for the Samsung Artificial Intelligence Certificate, and where my research started.',
      imgs: [{ src: 'img/samsung-traffic.jpg', pos: '50% 28%', alt: 'Team and advisor in front of the Smart Traffic Light Management System slide' }],
    },
    {
      id: 'samsung', cats: ['learning'],
      date: '2025', title: 'Samsung AI Certificate',
      sub: 'Machine Learning & Deep Learning',
      more: 'Then: Samsung Professional Level and Fundamentals of Deep Learning.',
      desc: 'Samsung Artificial Intelligence Certificate (machine learning and deep learning), defended with the Smart Traffic Light Management System. In winter 2025 I also completed the Samsung Professional Level Certificate and Fundamentals of Deep Learning.',
      card: 'img/samsung-certificate-card.jpg',
      imgs: [{ src: 'img/samsung-certificate.jpg', pos: '50% 50%', alt: 'HAU holding the Samsung Innovation Campus certificate' }],
    },
    {
      id: 'scholar', cats: ['learning'], accent: true, big: '2×',
      date: '2025', title: 'PTIT scholarships',
      sub: 'Excellent · Good',
      more: 'Academic scholarships awarded by PTIT.',
      desc: 'Academic scholarships from PTIT: Excellent (7 April 2025) and Good (20 December 2025).',
      imgs: [],
    },
    {
      id: 'certs', cats: ['learning'], big: '+2',
      date: 'Winter 2025', title: 'More certificates',
      sub: 'Samsung Professional · Deep Learning',
      more: 'Completed alongside the Samsung AI Certificate.',
      desc: 'Samsung Professional Level Certificate and Fundamentals of Deep Learning, both completed in winter 2025.',
      imgs: [],
    },
    {
      id: 'intern', cats: ['experience'],
      date: 'Jul 2026', title: 'AI Research Intern',
      sub: 'Tri Thuc Moi',
      more: 'Software outsourcing for the Japanese market.',
      desc: 'Completed an AI Research internship at Tri Thuc Moi, a software outsourcing company serving the Japanese market.',
      link: { href: 'https://trithucmoi.co/', label: 'trithucmoi.co' },
      imgs: [{ src: 'img/internship-team.jpg', pos: '35% 40%', alt: 'The Tri Thuc Moi team having dinner together' }],
    },
    {
      id: 'startup', cats: ['experience'],
      date: '28 Mar 2026', title: 'Startup & Innovation Conference',
      sub: 'PTIT 2026 · one of 2 teams presenting',
      more: 'Later shown at the HN INNOVATION exhibition.',
      desc: 'Presented our product — the AI application for ethnic-minority languages — at the PTIT Startup & Innovation Conference 2026, as one of two teams on stage. It was later shown at the HN INNOVATION product exhibition (spring 2026).',
      imgs: [
        { src: 'img/startup-backdrop.jpg', pos: '70% 40%', alt: 'HAU in front of the conference backdrop' },
        { src: 'img/startup-hall.jpg', pos: '50% 50%', alt: 'The conference hall during the opening' },
      ],
    },
    {
      id: 'hn', cats: ['experience'], accent: true, big: '2026',
      date: 'Spring 2026', title: 'HN INNOVATION',
      sub: 'Product exhibition',
      more: 'AI for ethnic-minority languages, on show.',
      desc: 'Our product — the AI application for ethnic-minority languages — was exhibited at HN INNOVATION in spring 2026.',
      imgs: [],
    },
  ];

  const LANG = { Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6', 'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26', CSS: '#563d7c', 'C++': '#f34b7d', C: '#555555', Java: '#b07219', Shell: '#89e051', MATLAB: '#e16737', R: '#198CE7', TeX: '#3D6117' };

  /* ───────── theme ───────── */
  const themeBtn = $('#theme');
  function applyTheme(t, persist) {
    root.setAttribute('data-theme', t);
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    const m = $('meta[name="theme-color"]');
    if (m) m.content = t === 'dark' ? '#0f1013' : '#f4f0e8';
    if (persist) { try { localStorage.setItem('hau-theme', t); } catch (e) { /* storage blocked */ } }
  }
  applyTheme(root.getAttribute('data-theme') || 'light', false);
  themeBtn.addEventListener('click', () => applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));

  /* ───────── nav, progress, timeline (one rAF-throttled scroll handler) ───────── */
  const nav = $('#nav');
  const menu = $('#menu');
  const progress = $('#progress');
  const tl = $('#timeline');
  const tlItems = $$('li', tl);

  function updateTimeline() {
    const r = tl.getBoundingClientRect();
    const mid = innerHeight * 0.58;
    tl.style.setProperty('--p', clamp((mid - r.top) / r.height, 0, 1).toFixed(4));
    tlItems.forEach((li) => {
      const n = $('.node', li).getBoundingClientRect();
      li.classList.toggle('on', n.top + 12 < mid);
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const h = root.scrollHeight - innerHeight;
      nav.classList.toggle('scrolled', scrollY > 8);
      progress.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
      updateTimeline();
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  const navLinks = $$('.nav-links a');
  navLinks.forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));

  if ('IntersectionObserver' in window) {
    const byId = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((l) => l.classList.remove('active'));
      const l = byId.get(e.target.id);
      if (l) l.classList.add('active');
    }), { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ───────── reveal on scroll ───────── */
  $$('.r-grid .reveal').forEach((n, i) => n.style.setProperty('--d', (i * 0.08) + 's'));
  $$('.contact .reveal').forEach((n, i) => n.style.setProperty('--d', (i * 0.07) + 's'));
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    revealEls.forEach((n) => io.observe(n));
  } else {
    revealEls.forEach((n) => n.classList.add('in'));
  }

  /* ───────── counters ───────── */
  const counters = $$('[data-count]');
  function runCount(b) {
    const to = Number(b.dataset.count);
    if (reduce) { b.textContent = to; return; }
    const t0 = performance.now(), dur = 1300;
    b.textContent = '0';
    (function tick(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      b.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { counters.forEach(runCount); cio.disconnect(); }
    }), { threshold: 0.4 });
    cio.observe($('#stats'));
  }

  /* ───────── hero: rotating word, spotlight, parallax ───────── */
  const rot = $('#rotator');
  if (rot && !reduce) {
    const words = rot.dataset.words.split('|');
    let i = 0;
    setInterval(() => {
      rot.classList.add('out');
      setTimeout(() => { i = (i + 1) % words.length; rot.textContent = words[i]; rot.classList.remove('out'); }, 300);
    }, 2800);
  }

  const hero = $('.hero');
  const art = $('#hero-art');
  if (!reduce && matchMedia('(pointer: fine)').matches) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--gx', (e.clientX - r.left) + 'px');
        hero.style.setProperty('--gy', (e.clientY - r.top) + 'px');
        const a = art.getBoundingClientRect();
        art.style.setProperty('--mx', clamp((e.clientX - (a.left + a.width / 2)) / (innerWidth / 2), -1, 1).toFixed(3));
        art.style.setProperty('--my', clamp((e.clientY - (a.top + a.height / 2)) / (innerHeight / 2), -1, 1).toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', () => {
      art.style.setProperty('--mx', 0);
      art.style.setProperty('--my', 0);
    });
  }

  // marquee: duplicate the strip so the loop is seamless
  const track = $('#track');
  [...track.children].forEach((c) => track.appendChild(c.cloneNode(true)));

  /* ───────── honors grid + filters ───────── */
  const grid = $('#grid');
  const countEl = $('#count');

  function buildCard(it) {
    const tile = it.imgs.length === 0;
    const b = el('button', {
      className: 'card ' + (tile ? 'tile' + (it.accent ? ' accent' : '') : 'photo') + (it.wide ? ' wide' : ''),
      type: 'button',
      'aria-haspopup': 'dialog',
    });
    b.dataset.id = it.id;
    b.dataset.cats = it.cats.join(' ');
    if (tile) {
      b.append(el('span', { className: 'deco', 'aria-hidden': 'true' }), el('span', { className: 'big', 'aria-hidden': 'true' }, it.big || ''));
    } else {
      const img = el('img', { src: it.card || it.imgs[0].src, alt: '', loading: 'lazy', decoding: 'async' });
      img.style.objectPosition = it.imgs[0].pos || '50% 50%';
      b.append(img);
    }
    b.append(
      el('span', { className: 'pill mono' }, it.date),
      el('span', { className: 'go', 'aria-hidden': 'true' }, '↗'),
      el('span', { className: 'txt' },
        el('h3', {}, it.title),
        el('span', { className: 'sub', style: 'display:block' }, it.sub),
        el('span', { className: 'more', style: 'display:block' }, it.more),
      ),
    );
    return b;
  }

  ITEMS.forEach((it) => grid.append(buildCard(it)));

  function applyFilter(f) {
    let n = 0;
    $$('.card', grid).forEach((c) => {
      const show = f === 'all' || c.dataset.cats.split(' ').includes(f);
      c.hidden = !show;
      if (show) {
        c.style.animation = 'none';
        void c.offsetWidth; // restart the pop-in
        c.style.animation = '';
        c.style.animationDelay = (n * 0.05) + 's';
        n++;
      }
    });
    countEl.textContent = n + ' of ' + ITEMS.length;
  }
  $$('.chip').forEach((chip) => chip.addEventListener('click', () => {
    $$('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    applyFilter(chip.dataset.filter);
  }));
  applyFilter('all');

  /* ───────── lightbox ───────── */
  const lb = $('#lb');
  const lbPanel = $('.lb-panel', lb);
  const lbMedia = $('.lb-media', lb);
  const lbImg = $('#lb-img');
  const lbThumbs = $('#lb-thumbs');
  const lbPrev = $('#lb-prev');
  const lbNext = $('#lb-next');
  const lbLink = $('#lb-link');
  let cur = null, idx = 0, lastFocus = null;

  function fill() {
    $('#lb-date').textContent = cur.date;
    $('#lb-title').textContent = cur.title;
    $('#lb-sub').textContent = cur.sub;
    $('#lb-desc').textContent = cur.desc;
    if (cur.link) {
      lbLink.href = cur.link.href;
      lbLink.textContent = cur.link.label + ' ↗';
      lbLink.hidden = false;
    } else {
      lbLink.hidden = true;
    }
    const n = cur.imgs.length;
    lbPanel.classList.toggle('no-media', n === 0);
    lbMedia.hidden = n === 0;
    if (!n) return;
    lbImg.src = cur.imgs[idx].src;
    lbImg.alt = cur.imgs[idx].alt;
    lbPrev.hidden = lbNext.hidden = n < 2;
    lbThumbs.replaceChildren();
    if (n > 1) {
      cur.imgs.forEach((_, i) => {
        const d = el('button', { type: 'button', 'aria-label': 'Photo ' + (i + 1) + ' of ' + n });
        if (i === idx) d.setAttribute('aria-current', 'true');
        d.addEventListener('click', () => { idx = i; fill(); });
        lbThumbs.append(d);
      });
    }
  }
  function openItem(id) {
    const it = ITEMS.find((x) => x.id === id);
    if (!it) return;
    cur = it; idx = 0;
    lastFocus = document.activeElement;
    fill();
    lb.hidden = false;
    document.body.classList.add('lock');
    $('#lb-close').focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.classList.remove('lock');
    lbImg.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function step(d) {
    const n = cur.imgs.length;
    if (n < 2) return;
    idx = (idx + d + n) % n;
    fill();
  }
  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));
  $('#lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open], .card');
    if (!t) return;
    openItem(t.dataset.open || t.dataset.id);
  });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {
      const f = $$('button:not([hidden]), a[href]:not([hidden])', lb).filter((n) => n.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ───────── copy email ───────── */
  const toast = $('#toast');
  let toastTimer = 0;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      say('Email copied to clipboard');
    } catch (err) {
      const ta = el('textarea', { readonly: '', style: 'position:fixed;opacity:0' });
      ta.value = EMAIL;
      document.body.append(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
      ta.remove();
      say(ok ? 'Email copied to clipboard' : EMAIL);
    }
  }
  $$('[data-copy]').forEach((b) => b.addEventListener('click', copyEmail));

  /* ───────── live GitHub data (public API, no token) ───────── */
  async function loadGithub() {
    const box = $('#repos');
    const meta = $('#gh-meta');
    try {
      const [u, r] = await Promise.all([
        fetch('https://api.github.com/users/' + GH_USER),
        fetch('https://api.github.com/users/' + GH_USER + '/repos?per_page=100&sort=pushed'),
      ]);
      if (!u.ok || !r.ok) throw new Error('GitHub API ' + u.status + '/' + r.status);
      const user = await u.json();
      const all = (await r.json())
        .filter((x) => !x.fork && /^https:\/\/github\.com\//.test(x.html_url))
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at));
      const pinned = PINNED.map((n) => all.find((x) => x.name === n)).filter(Boolean);
      const repos = pinned.concat(all.filter((x) => !pinned.includes(x))).slice(0, 6);

      meta.textContent = user.public_repos + ' public repositories · ' + user.followers + ' followers · on GitHub since ' + new Date(user.created_at).getFullYear();
      box.replaceChildren();
      if (!repos.length) {
        box.append(el('div', { className: 'repo empty' }, el('h3', {}, 'No public repositories yet'), el('p', {}, 'Projects will show up here automatically once they are public.')));
      }
      repos.forEach((p) => {
        const a = el('a', { className: 'repo', href: p.html_url, target: '_blank', rel: 'noopener noreferrer' });
        a.append(el('h3', {}, p.name));
        if (p.description) a.append(el('p', {}, p.description));
        const m = el('div', { className: 'meta' });
        if (p.language) {
          const dot = el('i', { className: 'dot' });
          dot.style.background = LANG[p.language] || 'var(--accent)';
          m.append(el('span', {}, dot, p.language));
        }
        m.append(
          el('span', {}, '★ ' + p.stargazers_count),
          el('span', {}, 'Updated ' + new Date(p.pushed_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })),
        );
        a.append(m);
        box.append(a);
      });
    } catch (err) {
      meta.textContent = 'Live data is unavailable right now.';
      box.replaceChildren(el('div', { className: 'repo empty' }, el('h3', {}, 'Could not load repositories'), el('p', {}, 'GitHub rate-limits anonymous requests. Open the profile to see everything.')));
    } finally {
      box.setAttribute('aria-busy', 'false');
    }
  }
  loadGithub();
})();
