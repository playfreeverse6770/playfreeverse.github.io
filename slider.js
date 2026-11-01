(() => {
  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dots = Array.from(slider.querySelectorAll('.slider-dot'));
    const previous = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    let current = 0;
    let timer;
    let touchStartX = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const links = slides.map(s => s.querySelector('a'));

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === current);
        slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
        if (links[i]) links[i].tabIndex = i === current ? 0 : -1;
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    };

    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (!prefersReducedMotion && slides.length > 1 && !document.hidden) timer = window.setInterval(() => show(current + 1), 6500);
    };

    previous?.addEventListener('click', () => { show(current - 1); start(); });
    next?.addEventListener('click', () => { show(current + 1); start(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);
    slider.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
      stop();
    }, { passive: true });
    slider.addEventListener('touchend', (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1));
      start();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
    slider.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { show(current - 1); stop(); } if (event.key === 'ArrowRight') { show(current + 1); stop(); } });
    show(0);
    start();
  });
})();


// PF HERO COPY V2 — active slide controls accessible, static HTML hero copy.
(() => {
  const slider = document.getElementById('showcase-carousel');
  const title = document.getElementById('hero-game-title');
  const description = document.getElementById('hero-game-description');
  const anchor = document.getElementById('hero-game-anchor');
  const details = document.getElementById('hero-game-details');
  if (!slider || !title || !description || !anchor || !details) return;
  const games = [
    { name: 'Freeverse', text: 'شهر، شغل، اقتصاد، کسب‌وکار و انتخاب‌هایی که مسیر زندگی تو را شکل می‌دهند.', target: 'games/freeverse.html', section: 'games', sectionName: 'معرفی بازی Freeverse' },
    { name: 'FlyFootball', text: 'رقابت سرگرم‌کننده قورباغه‌ها با مگس‌ها، زبان، مگس‌کش و مسابقات متنوع.', target: 'games/flyfootball.html', section: 'flyfootball', sectionName: 'معرفی بازی FlyFootball' },
    { name: 'GeometricStrategy', text: 'فرماندهی ارتش هندسی، توسعه قلمرو و نبردهای استراتژیک.', target: 'games/geometric-strategy.html', section: 'geometric-strategy', sectionName: 'معرفی بازی GeometricStrategy' },
    { name: 'ChainTrace', text: 'چالش‌های فکری و معماهای اتصال زنجیر با مراحل متعدد.', target: 'games/chaintrace.html', section: 'chaintrace', sectionName: 'معرفی بازی ChainTrace' }
  ];
  const slides = Array.from(slider.querySelectorAll('.slide'));
  function refresh() {
    const index = slides.findIndex(s => s.classList.contains('is-active'));
    const game = games[index] || games[0];
    title.textContent = game.name;
    description.textContent = game.text;
    anchor.textContent = game.sectionName;
    anchor.href = '#' + game.section;
    details.textContent = 'اطلاعات بیشتر ' + game.name;
    details.href = game.target;
  }
  const observer = new MutationObserver(refresh);
  slides.forEach(slide => observer.observe(slide, {attributes: true, attributeFilter: ['class']}));
  refresh();
})();
