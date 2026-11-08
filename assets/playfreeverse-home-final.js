(() => {
 const hero=document.querySelector('[data-pf-home-hero]');if(!hero)return;
 const slides=Array.from(hero.querySelectorAll('.pf-home-hero-slide'));
 const meta=document.querySelector('.pf-home-hero-meta');
 const dots=Array.from(hero.querySelectorAll('.pf-home-hero-dot'));
 const title=hero.querySelector('[data-hero-title]'),subtitle=hero.querySelector('[data-hero-subtitle]'),kicker=hero.querySelector('[data-hero-kicker]');
 const panelTitle=meta.querySelector('[data-panel-title]'),panelDesc=meta.querySelector('[data-panel-desc]');
 const page=meta.querySelector('[data-action="page"]'),section=meta.querySelector('[data-action="section"]');
 const prefersReducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let active=0,timer=null,startX=0;
 slides.forEach(slide=>{const im=slide.querySelector('img');if(!im)return;const check=()=>{slide.classList.toggle('is-lowres',im.naturalWidth>0&&im.naturalWidth<1000)};im.addEventListener('load',check);if(im.complete)check()});
 function show(index){active=(index+slides.length)%slides.length;const slide=slides[active],d=slide.dataset;
 slides.forEach((s,i)=>{const on=i===active;s.classList.toggle('is-active',on);s.setAttribute('aria-hidden',String(!on))});
 dots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===active);dot.setAttribute('aria-current',i===active?'true':'false')});
 title.textContent=d.title||'';subtitle.textContent=d.subtitle||'';kicker.textContent=d.kicker||'';panelTitle.textContent=d.title||'';panelDesc.textContent=d.panel||'';
 page.href=d.page||'#games';section.href=d.section||'#games';
 const unavailable=d.title==='Void Reign',officialChainTrace=d.title==='ChainTrace';
 meta.querySelectorAll('[data-platform]').forEach(p=>{
  const isMyket=p.dataset.platform==='myket';
  const canInstall=isMyket&&officialChainTrace;
  p.querySelector('small').textContent=canInstall?'دریافت بازی':unavailable?'هنوز منتشر نشده':'به‌زودی';
  if(isMyket){
   if(canInstall){p.setAttribute('href','https://myket.ir/app/com.playfreeverse.chaintrace');p.setAttribute('target','_blank');p.setAttribute('rel','noopener noreferrer');p.setAttribute('aria-label','دریافت رسمی ChainTrace از مایکت')}
   else{p.removeAttribute('href');p.removeAttribute('target');p.removeAttribute('rel');p.setAttribute('aria-label',unavailable?'مایکت — هنوز منتشر نشده':'مایکت — به‌زودی')}
  }
 });
 }
 function stop(){if(timer)clearInterval(timer);timer=null}
 function start(){stop();if(!prefersReducedMotion&&!document.hidden)timer=setInterval(()=>show(active+1),6500)}
 hero.querySelector('[data-hero-prev]')?.addEventListener('click',()=>{show(active-1);start()});hero.querySelector('[data-hero-next]')?.addEventListener('click',()=>{show(active+1);start()});
 dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);start()}));
 hero.addEventListener('mouseenter',stop);hero.addEventListener('mouseleave',start);hero.addEventListener('focusin',stop);hero.addEventListener('focusout',start);
 hero.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;stop()},{passive:true});hero.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>45)show(active+(delta<0?1:-1));start()},{passive:true});
 hero.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){show(active-1);start()}else if(e.key==='ArrowRight'){show(active+1);start()}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});show(0);start();
})();
