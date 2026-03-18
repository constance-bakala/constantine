declare const $: any;

const NAV_SECTIONS = ['#portfolio', '#about', '#contact'];
const NAV_OFFSET = 81;

function updateActiveLink(): void {
  const scrollPos = window.scrollY + NAV_OFFSET;
  let activeSection = NAV_SECTIONS[0];

  NAV_SECTIONS.forEach((id) => {
    const el = document.querySelector(id);
    if (el && (el as HTMLElement).offsetTop <= scrollPos) {
      activeSection = id;
    }
  });

  document
    .querySelectorAll('.navbar-nav .nav-link')
    .forEach((el) => el.classList.remove('active'));
  document
    .querySelector(`.navbar-nav .nav-link[href="${activeSection}"]`)
    ?.classList.add('active');
}

export function initNavScroll(): () => void {
  // Neutralise les ancres "#/route" (hash-routing Angular) pour éviter les crashs querySelector
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#/"]')
    .forEach((a) => a.setAttribute('href', '#'));

  const hasInPageAnchors = !!document.querySelector(
    'a[href^="#"]:not([href="#"]):not([href^="#/"])'
  );

  if (hasInPageAnchors) {
    window.addEventListener('scroll', updateActiveLink);
    setTimeout(updateActiveLink, 0);

    document
      .querySelectorAll<HTMLAnchorElement>(
        'a.js-scroll-trigger[href^="#"]:not([href="#"]):not([href^="#/"])'
      )
      .forEach((a) => {
        a.addEventListener('click', (event) => {
          const targetHash = (event.currentTarget as HTMLAnchorElement).getAttribute('href');
          if (!targetHash) return;

          const targetEl = document.querySelector(targetHash);
          if (targetEl) {
            event.preventDefault();
            const top = (targetEl as HTMLElement).offsetTop - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }

          // Ferme le menu responsive (Bootstrap jQuery plugin)
          $('.navbar-collapse').collapse('hide');
        });
      });
  } else {
    document.querySelectorAll('.js-scroll-trigger').forEach((el) => {
      el.addEventListener('click', () => {
        $('.navbar-collapse').collapse('hide');
      });
    });
  }

  return () => window.removeEventListener('scroll', updateActiveLink);
}
