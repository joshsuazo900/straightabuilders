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

// Contact form (front-end only — wire to backend later)
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const note = document.getElementById('form-note');
  if (note) {
    note.hidden = false;
  }
  form.reset();
  return false;
}
window.handleSubmit = handleSubmit;
