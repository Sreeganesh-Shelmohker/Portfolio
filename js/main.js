/* ============================================================
   main.js — Portfolio: Sreeganesh Shelmohker
   ============================================================
   Stage 2 additions
     - Footer year (auto-updates)
     - Mobile nav toggle (open/close, Escape, outside-click)
     - Active nav link highlighting on scroll (IntersectionObserver)
   Animations and entrance effects are added in Stage 5.
   ============================================================ */


/* ── Footer year ──────────────────────────────────────────── */
const yearEl = document.getElementById('footer-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ── Mobile nav toggle ────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('#nav-menu');

if (navToggle && navMenu) {

  /**
   * Opens or closes the mobile menu.
   * Keeps the DOM, aria attributes, and button label in sync.
   *
   * @param {boolean} open - true to open, false to close
   */
  function setMenuOpen(open) {
    navMenu.classList.toggle('nav-menu--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute(
      'aria-label',
      open ? 'Close navigation menu' : 'Open navigation menu'
    );
  }

  /* Button click — flip the current state */
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('nav-menu--open');
    setMenuOpen(!isOpen);
  });

  /* Link click — close after navigating to a section */
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  /* Outside click — close if the user clicks away */
  document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  /* Escape key — close and return focus to the trigger button */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('nav-menu--open')) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });

}


/* ── Active nav link on scroll ────────────────────────────── */
/*
  IntersectionObserver watches every <section id="..."> in <main>.
  When a section enters the "activation band" (the middle strip of
  the viewport defined by rootMargin), its nav link receives
  aria-current="page", which the CSS uses to draw the blue underline.

  rootMargin: '-30% 0px -60% 0px'
    → top edge fires at 30% from the top of the viewport
    → bottom edge fires at 60% from the bottom (i.e. 40% from top)
    This creates a narrow band around the upper-third of the screen,
    so the active link updates as the user scrolls down naturally.
*/
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNavLink(sectionId) {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNavLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(section => sectionObserver.observe(section));
}
