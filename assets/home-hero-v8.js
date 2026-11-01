(() => {
  const slides = document.querySelectorAll('.pf-home-hero-slide');
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    const src = img.getAttribute('src');
    if (!src) return;
    slide.style.backgroundImage = `url("${src}")`;
    slide.classList.add('pf-v8-image-ready');
  });
})();
