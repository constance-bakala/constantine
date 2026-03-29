const NAV_SECTIONS = ['#portfolio', '#about', '#contact'];
const NAV_OFFSET = 70;

export function setActiveLink(sectionId: string): void {
  document.querySelectorAll('.navbar-nav .nav-link[href^="#"]')
    .forEach((el) => el.classList.remove('active'));
  document.querySelector(`.navbar-nav .nav-link[href="${sectionId}"]`)
    ?.classList.add('active');
}

export function scrollToSection(sectionId: string): void {
  const el = document.querySelector(sectionId);
  if (el) {
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function updateActiveLink(): void {
  const scrollPos = window.scrollY + NAV_OFFSET + 10;
  const atBottom =
    window.scrollY > 10 &&
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

  let activeSection = NAV_SECTIONS[0];

  if (atBottom) {
    activeSection = NAV_SECTIONS[NAV_SECTIONS.length - 1];
  } else {
    NAV_SECTIONS.forEach((id) => {
      const el = document.querySelector(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPos) {
          activeSection = id;
        }
      }
    });
  }

  document.querySelectorAll('.navbar-nav .nav-link[href^="#"]')
    .forEach((el) => el.classList.remove('active'));
  document.querySelector(`.navbar-nav .nav-link[href="${activeSection}"]`)
    ?.classList.add('active');
}

export function initNavScroll(): () => void {
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  setTimeout(updateActiveLink, 100);
  return () => window.removeEventListener('scroll', updateActiveLink);
}
