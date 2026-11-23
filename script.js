// شريط تقدم القراءة
const bar = document.getElementById('progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
});

// الظهور عند التمرير + العدادات
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  const t = e.target; setTimeout(() => t.style.transitionDelay = '0ms', 1300);
  e.target.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count, t0 = performance.now();
    (function f(t) { const p = Math.min((t - t0) / 1600, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
  });
  io.unobserve(e.target);
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 110 + 'ms'; io.observe(el); });

// فلترة الأعمال
const buttons = document.querySelectorAll('.filters button');
const works = document.querySelectorAll('.work');
buttons.forEach(b => b.addEventListener('click', () => {
  buttons.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const f = b.dataset.filter;
  works.forEach(w => {
    const show = f === 'all' || w.dataset.cat === f;
    w.classList.toggle('hide', !show);
    if (show) { w.style.opacity = 0; requestAnimationFrame(() => { w.style.opacity = 1; }); }
  });
}));

// عرض العمل مكبّرًا
const lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img'), lbTxt = lb.querySelector('p');
works.forEach(w => w.addEventListener('click', () => {
  const img = w.querySelector('img');
  lbImg.src = img.src; lbImg.alt = img.alt; lbTxt.textContent = w.querySelector('h3').textContent;
  lb.classList.add('open');
}));
const close = () => lb.classList.remove('open');
lb.addEventListener('click', e => { if (e.target !== lbImg) close(); });
addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

document.getElementById('year').textContent = new Date().getFullYear();
