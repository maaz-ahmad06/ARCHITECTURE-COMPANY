/* ============================================================
   ARCHITECTURE COMPANY — script.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- LOADER ---------------- */
  const loader = document.getElementById('loader');
  const percentEl = document.getElementById('loaderPercent');
  let progress = 0;
  const duration = 2400; // ms
  const start = performance.now();

  function tick(now){
    const elapsed = now - start;
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    percentEl.textContent = String(progress).padStart(2,'0');
    if(elapsed < duration){
      requestAnimationFrame(tick);
    } else {
      finishLoad();
    }
  }
  requestAnimationFrame(tick);

  function finishLoad(){
    percentEl.textContent = '100';
    setTimeout(() => {
      loader.classList.add('done');
      document.body.style.overflow = '';
      setTimeout(() => loader.remove(), 1000);
    }, 200);
  }

  // Lock scroll while loading
  document.body.style.overflow = 'hidden';

  /* ---------------- HEADER SCROLL STATE ---------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if(window.scrollY > 40){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------------- MOBILE MENU ---------------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu(){
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- COUNTERS ---------------- */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCount(el){
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 1600;
    const startTime = performance.now();

    function update(now){
      const p = Math.min(1, (now - startTime) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val + suffix;
      if(p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ---------------- PROJECT FILTER ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const show = filter === 'all' || filter === cat;
        if(show){
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .5s ease, transform .5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ---------------- CONTACT FORM (demo only) ---------------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'Thank you — your enquiry has been noted. We will reply within two working days.';
      formNote.classList.add('sent');
      form.reset();
    });
  }

  /* ---------------- BACK TO TOP ---------------- */
  const toTop = document.getElementById('toTop');
  if(toTop){
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- FOOTER YEAR ---------------- */
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- SMOOTH ANCHOR SCROLL (offset for fixed header) ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if(id.length > 1){
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});