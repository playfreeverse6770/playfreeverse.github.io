(() => {
  const hero = document.querySelector('[data-pf-home-hero]');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.pf-home-hero-slide'));
  const dots = Array.from(hero.querySelectorAll('.pf-home-hero-dot'));
  const prev = hero.querySelector('[data-hero-prev]');
  const next = hero.querySelector('[data-hero-next]');
  const title = hero.querySelector('[data-hero-title]');
  const subtitle = hero.querySelector('[data-hero-subtitle]');
  const kicker = hero.querySelector('[data-hero-kicker]');
  const panelTitle = hero.querySelector('[data-panel-title]');
  const panelDesc = hero.querySelector('[data-panel-desc]');
  const sectionLink = hero.querySelector('[data-link-section]');
  const pageLink = hero.querySelector('[data-link-page]');
  const downloadLink = hero.querySelector('[data-link-download]');
  let current = 0;
  let timer = null;

  const titleMarkup = (value) => value ? value.replace(/([a-z])([A-Z])/g, '$1<wbr>$2') : '';

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    const active = slides[current];

    slides.forEach((slide, i) => {
      const on = i === current;
      slide.classList.toggle('is-active', on);
      slide.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      const on = i === current;
      dot.classList.toggle('is-active', on);
      dot.setAttribute('aria-current', on ? 'true' : 'false');
    });

    const data = active.dataset;
    title.innerHTML = titleMarkup(data.title || '');
    subtitle.textContent = data.subtitle || '';
    kicker.textContent = data.kicker || '';
    panelTitle.textContent = data.title || '';
    panelDesc.textContent = data.panel || data.subtitle || '';

    sectionLink.href = data.section || '#games';
    pageLink.href = data.page || '#';
    downloadLink.href = data.download || data.page || '#';
  };

  const stop = () => timer && clearInterval(timer);
  const start = () => {
    stop();
    timer = setInterval(() => show(current + 1), 6500);
  };

  prev?.addEventListener('click', () => { show(current - 1); start(); });
  next?.addEventListener('click', () => { show(current + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));

  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);

  let touchStartX = 0;
  hero.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stop();
  }, { passive: true });
  hero.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) show(current + (delta < 0 ? 1 : -1));
    start();
  }, { passive: true });

  hero.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { show(current + (document.dir === 'rtl' ? 1 : -1)); start(); }
    if (event.key === 'ArrowRight') { show(current + (document.dir === 'rtl' ? -1 : 1)); start(); }
  });

  show(0);
  start();
})();
