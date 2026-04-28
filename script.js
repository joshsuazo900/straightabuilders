// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  siteNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal-on-scroll
const revealTargets = document.querySelectorAll(
  '.section h2, .section .eyebrow, .service-card, .project-card, .location-card, .blueprint-card, .check-list, .hero-meta, .contact-form, .contact-list'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
revealTargets.forEach((el) => io.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Contact form — submits to Formspree via fetch, falls back to native POST without JS.
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const successNote = document.getElementById('form-note');
  const errorNote = document.getElementById('form-error');

  if (successNote) successNote.hidden = true;
  if (errorNote) errorNote.hidden = true;
  if (submitBtn) submitBtn.disabled = true;

  const data = new FormData(form);
  const firstName = String(data.get('name') || '').trim().split(/\s+/)[0];
  const project = String(data.get('project') || '').trim();

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      if (successNote) {
        const greeting = firstName ? `Thank you, ${firstName}` : 'Thank you';
        const projectClause = project ? ` about your ${project} project` : '';
        successNote.textContent = `${greeting} — we've received your inquiry${projectClause}. A member of the Straight A Builders team will follow up within one business day.`;
        successNote.hidden = false;
      }
      form.reset();
    } else {
      if (errorNote) errorNote.hidden = false;
    }
  } catch {
    if (errorNote) errorNote.hidden = false;
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
  return false;
}
window.handleSubmit = handleSubmit;
