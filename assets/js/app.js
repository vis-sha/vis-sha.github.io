/**
 * Renders the entire site from SITE_CONTENT (content.js) and
 * wires up nav, scroll-reveal, and the scroll-to-top button.
 */

const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  location: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.3 2.5 3.3 4.5 5.8 5.8l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z"/></svg>',
};

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.html !== undefined) node.innerHTML = opts.html;
  if (opts.text !== undefined) node.textContent = opts.text;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  children.forEach((c) => c && node.appendChild(c));
  return node;
}

function socialLinks(links, size = '') {
  const wrap = el('div', { class: `social-row ${size}` });
  links.forEach((link) => {
    const a = el('a', {
      html: ICONS[link.icon] || '',
      attrs: {
        href: link.url,
        'aria-label': link.label,
        target: link.url.startsWith('http') ? '_blank' : '_self',
        rel: 'noopener noreferrer',
      },
    });
    wrap.appendChild(a);
  });
  return wrap;
}

/* ---------------- Section builders ---------------- */

function buildOrchestration(pipeline) {
  const panel = el('div', { class: 'orchestration' });

  const header = el('div', { class: 'orch-header' });
  header.appendChild(el('span', { text: 'agent_trace.log' }));
  const status = el('span', { class: 'status' }, [el('span', { class: 'dot' }), el('span', { text: 'live' })]);
  header.appendChild(status);
  panel.appendChild(header);

  panel.appendChild(el('div', { class: 'orch-supervisor' }, [
    document.createTextNode(pipeline.supervisor),
    el('span', { class: 'badge', text: 'orchestrator' }),
  ]));

  const tree = el('div', { class: 'orch-tree' });
  pipeline.agents.forEach((agent, i) => {
    const node = el('a', {
      class: 'orch-agent',
      attrs: { href: `#${agent.targetId}`, 'data-agent-index': String(i) },
    });
    node.appendChild(el('span', { class: 'agent-id mono', text: `A${i + 1}` }));
    node.appendChild(el('span', { class: 'agent-name', text: agent.label }));
    node.appendChild(el('span', { class: 'agent-task mono', text: agent.task }));
    node.appendChild(el('span', { class: 'agent-state mono', text: 'queued' }));
    tree.appendChild(node);
  });
  panel.appendChild(tree);

  return panel;
}

function animateOrchestration(panel) {
  const nodes = Array.from(panel.querySelectorAll('.orch-agent'));
  let i = 0;

  function step() {
    if (i > 0) {
      const prev = nodes[i - 1];
      prev.classList.remove('is-active');
      prev.classList.add('is-done');
      prev.querySelector('.agent-state').textContent = 'done';
    }
    if (i < nodes.length) {
      const current = nodes[i];
      current.classList.add('is-active');
      current.querySelector('.agent-state').textContent = 'running';
      i++;
      setTimeout(step, 900);
    }
  }
  setTimeout(step, 600);
}

function buildHero(data, pipeline) {
  const section = el('section', { class: 'hero', attrs: { id: 'hero' } });
  const bg = el('img', {
    class: 'hero-bg',
    attrs: { src: data.backgroundImage, alt: '' },
  });

  const eyebrow = el('div', { class: 'hero-eyebrow', text: "Hi, I'm" });
  const h1 = el('h1', { text: data.name });
  const roleLine = el('div', { class: 'hero-role' });
  const tagline = el('p', { class: 'hero-tagline', text: data.tagline });

  const actions = el('div', { class: 'hero-actions' });
  const resumeBtn = el('a', {
    class: 'btn btn-primary',
    text: 'Download Resume',
    attrs: { href: data.resumeFile, download: '' },
  });
  actions.appendChild(resumeBtn);
  actions.appendChild(socialLinks(data.socialLinks));

  const introCol = el('div', { class: 'hero-intro' }, [eyebrow, h1, roleLine, tagline, actions]);
  const orchPanel = buildOrchestration(pipeline);

  const grid = el('div', { class: 'hero-grid' }, [introCol, orchPanel]);
  const container = el('div', { class: 'hero-container' }, [grid]);
  section.appendChild(bg);
  section.appendChild(container);

  typeRoles(roleLine, data.roles);
  animateOrchestration(orchPanel);
  return section;
}

function typeRoles(target, roles) {
  const textSpan = el('span');
  const cursor = el('span', { class: 'cursor', html: '&nbsp;' });
  target.appendChild(textSpan);
  target.appendChild(cursor);

  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      textSpan.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      textSpan.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

function buildAbout(data) {
  const section = el('section', { class: 'about', attrs: { id: 'about' } });
  const container = el('div', { class: 'container reveal' });
  container.appendChild(el('div', { class: 'section-title', text: 'About' }));

  const grid = el('div', { class: 'about-grid' });
  grid.appendChild(el('img', { class: 'about-photo', attrs: { src: data.profileImage, alt: 'Profile photo' } }));

  const body = el('div', { class: 'about-body' });
  body.appendChild(el('h2', { class: 'about-role', text: data.heading }));
  body.appendChild(el('p', { class: 'about-org', text: data.subheading }));
  data.paragraphs.forEach((p) => body.appendChild(el('p', { text: p })));
  grid.appendChild(body);

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

function buildSkills(data) {
  const section = el('section', { class: 'skills-section', attrs: { id: 'skills' } });
  const container = el('div', { class: 'container-wide reveal' });
  container.appendChild(el('div', { class: 'section-title', text: 'Skills' }));
  container.appendChild(el('h2', { class: 'section-heading', text: 'What I work with' }));

  const grid = el('div', { class: 'skills-grid' });
  data.groups.forEach((group) => {
    const card = el('div', { class: 'skill-card' });
    card.appendChild(el('h4', { text: group.title }));
    const tags = el('ul', { class: 'skill-tags' });
    group.items.forEach((item) => tags.appendChild(el('li', { text: item })));
    card.appendChild(tags);
    grid.appendChild(card);
  });
  container.appendChild(grid);

  if (data.certifications && data.certifications.length) {
    const certs = el('div', { class: 'certs' });
    certs.appendChild(el('strong', { text: 'Certifications: ' }));
    certs.appendChild(document.createTextNode(data.certifications.join(', ')));
    container.appendChild(certs);
  }

  section.appendChild(container);
  return section;
}

function resumeItem({ title, period, place, points }) {
  const item = el('div', { class: 'resume-item' });
  item.appendChild(el('h4', { text: title }));
  if (period) item.appendChild(el('div', { class: 'period', text: period }));
  if (place) item.appendChild(el('div', { class: 'place', text: place }));
  if (points && points.length) {
    const ul = el('ul');
    points.forEach((p) => ul.appendChild(el('li', { text: p })));
    item.appendChild(ul);
  }
  return item;
}

function buildResume(data) {
  const section = el('section', { class: 'resume', attrs: { id: 'resume' } });
  const container = el('div', { class: 'container reveal' });
  container.appendChild(el('div', { class: 'section-title', text: 'Resume' }));
  container.appendChild(el('h2', { class: 'section-heading', text: 'Experience & Education' }));

  const stack = el('div', { class: 'resume-stack' });

  const expBlock = el('div', { class: 'resume-block' });
  expBlock.appendChild(el('h3', { text: 'Professional Experience' }));
  data.experience.forEach((exp) => expBlock.appendChild(resumeItem({ title: exp.role, period: exp.period, place: exp.place, points: exp.points })));
  stack.appendChild(expBlock);

  const eduBlock = el('div', { class: 'resume-block' });
  eduBlock.appendChild(el('h3', { text: 'Education' }));
  data.education.forEach((ed) => eduBlock.appendChild(resumeItem({ title: ed.degree, period: ed.period, place: ed.place })));
  stack.appendChild(eduBlock);

  container.appendChild(stack);
  section.appendChild(container);
  return section;
}

function projectCard(project) {
  const card = el('div', { class: 'project-card is-collapsed', attrs: { tabindex: '0', role: 'button', 'aria-expanded': 'false' } });
  const head = el('div', { class: 'project-head' });
  const titleWrap = el('div', { class: 'project-title-wrap' });
  titleWrap.appendChild(el('h3', { text: project.title }));
  if (project.role) titleWrap.appendChild(el('span', { class: 'project-role', text: project.role }));
  head.appendChild(titleWrap);
  head.appendChild(el('span', { class: 'project-chevron', html: '&#9662;' }));
  card.appendChild(head);

  const body = el('div', { class: 'project-body' });
  const inner = el('div', { class: 'project-body-inner' });

  (project.description || []).forEach((p) => inner.appendChild(el('p', { text: p })));

  if (project.features && project.features.length) {
    inner.appendChild(el('h5', { text: 'Key Features' }));
    const ul = el('ul');
    project.features.forEach((f) => ul.appendChild(el('li', { text: f })));
    inner.appendChild(ul);
  }

  if (project.technologies && project.technologies.length) {
    inner.appendChild(el('h5', { text: 'Technologies' }));
    const tags = el('ul', { class: 'tech-tags' });
    project.technologies.forEach((t) => tags.appendChild(el('li', { text: t })));
    inner.appendChild(tags);
  }

  if (project.achievements && project.achievements.length) {
    inner.appendChild(el('h5', { text: 'Achievements' }));
    const ul = el('ul');
    project.achievements.forEach((a) => ul.appendChild(el('li', { text: a })));
    inner.appendChild(ul);
  }

  if (project.link) {
    const linkEl = el('a', {
      class: 'btn btn-project-link',
      text: project.linkLabel || 'View',
      attrs: { href: project.link, target: '_blank', rel: 'noopener noreferrer' },
    });
    linkEl.addEventListener('click', (e) => e.stopPropagation());
    inner.appendChild(linkEl);
  }

  body.appendChild(inner);
  card.appendChild(body);

  function toggle() {
    const collapsed = card.classList.toggle('is-collapsed');
    card.setAttribute('aria-expanded', String(!collapsed));
  }

  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });

  return card;
}

function buildProjects(projects) {
  const section = el('section', { class: 'projects-section', attrs: { id: 'projects' } });
  const container = el('div', { class: 'container reveal' });
  container.appendChild(el('div', { class: 'section-title', text: 'Projects' }));
  container.appendChild(el('h2', { class: 'section-heading', text: 'Selected work' }));
  projects.forEach((p) => container.appendChild(projectCard(p)));
  section.appendChild(container);
  return section;
}

function buildContact(data) {
  const section = el('section', { class: 'contact', attrs: { id: 'contact' } });
  const container = el('div', { class: 'container reveal' });
  container.appendChild(el('div', { class: 'section-title', text: 'Contact' }));
  container.appendChild(el('h2', { class: 'section-heading', text: "Let's connect" }));

  const grid = el('div', { class: 'contact-grid' });

  const items = [
    { icon: 'location', label: 'Address', value: data.address, href: null },
    { icon: 'phone', label: 'Call', value: data.phone, href: `tel:${data.phone.replace(/\s+/g, '')}` },
    { icon: 'email', label: 'Email', value: data.email, href: `mailto:${data.email}` },
  ];

  items.forEach((item) => {
    const card = el('div', { class: 'contact-card' });
    card.appendChild(el('div', { class: 'icon', html: ICONS[item.icon] }));
    card.appendChild(el('h3', { text: item.label }));
    if (item.href) {
      card.appendChild(el('p', {}, [el('a', { text: item.value, attrs: { href: item.href } })]));
    } else {
      card.appendChild(el('p', { text: item.value }));
    }
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

function buildFooter(data, socials) {
  const footer = document.getElementById('footer');
  const container = el('div', { class: 'container' });
  container.appendChild(el('h3', { text: data.name }));
  container.appendChild(el('p', { text: data.tagline }));
  container.appendChild(socialLinks(socials));
  container.appendChild(el('div', {
    class: 'footer-bottom',
    text: `© ${new Date().getFullYear()} ${data.name}. All rights reserved.`,
  }));
  footer.appendChild(container);
}

/* ---------------- Nav ---------------- */

function buildTopbarNav(navItems, brandName) {
  document.getElementById('topbar-brand').textContent = brandName;
  const nav = document.getElementById('topbar-nav');
  navItems.forEach((item) => {
    nav.appendChild(el('a', { text: item.label, attrs: { href: `#${item.id}` } }));
  });
}

function wireScrollBehavior(navItems) {
  const topbar = document.getElementById('topbar');
  const scrollTopBtn = document.getElementById('scroll-top');
  const hero = document.getElementById('hero');
  const navLinks = Array.from(document.querySelectorAll('.topbar-nav a'));
  const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);

  function onScroll() {
    const heroHeight = hero ? hero.offsetHeight : 400;
    const show = window.scrollY > heroHeight * 0.7;
    topbar.classList.toggle('visible', show);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);

    let activeId = sections[0] && sections[0].id;
    const probe = window.scrollY + 100;
    sections.forEach((sec) => {
      if (sec.offsetTop <= probe) activeId = sec.id;
    });
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function wireMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('topbar-nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

function wireReveal() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((t) => observer.observe(t));
}

/* ---------------- Init ---------------- */

function init() {
  const data = SITE_CONTENT;
  document.title = data.meta.title;
  document.querySelector('meta[name="description"]').setAttribute('content', data.meta.description);
  document.getElementById('favicon').setAttribute('href', data.meta.favicon);

  buildTopbarNav(data.nav, data.hero.name);

  const main = document.getElementById('main');
  main.appendChild(buildHero(data.hero, data.pipeline));
  main.appendChild(buildAbout(data.about));
  main.appendChild(buildSkills(data.skills));
  main.appendChild(buildResume(data.resume));
  main.appendChild(buildProjects(data.projects));
  main.appendChild(buildContact(data.contact));

  buildFooter(data.footer, data.hero.socialLinks);

  wireScrollBehavior(data.nav);
  wireMobileNav();
  wireReveal();
}

document.addEventListener('DOMContentLoaded', init);
