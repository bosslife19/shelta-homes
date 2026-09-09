// Shelta Homes & Properties — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header state */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    }));
  }

  /* Scroll reveal for sections and peg frames */
  const observed = document.querySelectorAll('.observe, .peg-frame');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    observed.forEach(el => io.observe(el));
  } else {
    observed.forEach(el => el.classList.add('in-view'));
  }

  /* Duplicate marquee content for seamless loop */
  document.querySelectorAll('.strip .track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* Inspection booking form (front-end demo) */
  const form = document.getElementById('inspection-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const success = document.getElementById('form-success');
      const nameSpot = document.getElementById('success-name');
      if (nameSpot) nameSpot.textContent = name ? name.split(' ')[0] : 'there';
      form.style.display = 'none';
      if (success) success.classList.add('show');
      window.scrollTo({ top: form.closest('.form-card').offsetTop - 140, behavior: 'smooth' });
    });
  }

  const resetBtn = document.getElementById('form-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const form = document.getElementById('inspection-form');
      const success = document.getElementById('form-success');
      if (form) { form.reset(); form.style.display = 'block'; }
      if (success) success.classList.remove('show');
    });
  }

});
