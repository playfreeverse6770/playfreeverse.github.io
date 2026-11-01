(() => {
  const hero = document.querySelector('[data-pf-hero]');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.hero-v3-slide'));
  const dots = Array.from(hero.querySelectorAll('.hero-v3-dot'));
  const prev = hero.querySelector('[data-hero-prev]');
  const next = hero.querySelector('[data-hero-next]');
  const title = hero.querySelector('[data-hero-title]');
  const kicker = hero.querySelector('[data-hero-kicker]');
  const desc = hero.querySelector('[data-hero-desc]');
  const anchor = hero.querySelector('[data-hero-anchor]');
  const detail = hero.querySelector('[data-hero-detail]');
  let current = 0;
  let timer = null;

  const titleMarkup = (value) => {
    if (!value) return '';
    if (value.includes(' ')) return value;
    return value.replace(/([a-z])([A-Z])/g, '$1<wbr>$2');
  };

  const apply = (index) => {
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

    title.innerHTML = titleMarkup(active.dataset.title || '');
    kicker.textContent = active.dataset.kicker || '';
    desc.textContent = active.dataset.description || '';

    const sectionHref = active.dataset.section || '#games';
    const pageHref = active.dataset.page || '#';
    const sectionLabel = active.dataset.anchorLabel || 'معرفی بازی';
    const pageLabel = active.dataset.detailLabel || 'اطلاعات بیشتر';

    anchor.href = sectionHref;
    anchor.textContent = sectionLabel;
    detail.href = pageHref;
    detail.textContent = pageLabel;
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
  };
  const start = () => {
    stop();
    timer = window.setInterval(() => apply(current + 1), 6500);
  };

  prev?.addEventListener('click', () => { apply(current - 1); start(); });
  next?.addEventListener('click', () => { apply(current + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { apply(i); start(); }));

  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);
  hero.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { apply(current + (document.dir === 'rtl' ? 1 : -1)); start(); }
    if (event.key === 'ArrowRight') { apply(current + (document.dir === 'rtl' ? -1 : 1)); start(); }
  });
  let touchStartX = 0;
  hero.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stop();
  }, { passive: true });
  hero.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) apply(current + (delta < 0 ? 1 : -1));
    start();
  }, { passive: true });

  apply(0);
  start();
})();
