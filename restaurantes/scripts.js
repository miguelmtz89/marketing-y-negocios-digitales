// ===== Story tabs (Pizzería / Restaurante / etc.)
const STORIES = {
  pizza: {
    text: '<span class="name">Juan</span> tenía una pizzería… pero <strong>nadie la encontraba en Google</strong> y los pedidos online eran cero. Después de optimizar su perfil y posicionamiento local, ahora <strong>recibe +30 pedidos diarios desde internet</strong>. ¿Cuánto dinero estaba perdiendo antes?',
    name: 'Juan M.',
    biz: 'Pizzería D\'Forno · Querétaro'
  },
  resto: {
    text: '<span class="name">María</span> tenía dos sucursales pero <strong>las reservaciones se desplomaban</strong> los lunes a jueves. En 4 meses pasó de 14 a <strong>62 reservaciones por semana</strong> sin invertir un peso más en publicidad pagada.',
    name: 'María R.',
    biz: 'Trattoria Mariana · CDMX'
  },
  abogado: {
    text: '<span class="name">Lic. Hernández</span> dependía de recomendaciones boca a boca. Hoy <strong>llegan 8-12 consultas calificadas al mes</strong> desde Google, todas de personas que ya buscaban un abogado en su ciudad.',
    name: 'Lic. Hernández',
    biz: 'Despacho Legal · Monterrey'
  },
  doctor: {
    text: '<span class="name">Dra. Rivas</span> abrió su consultorio sin agenda. En 90 días el perfil de Google le trajo <strong>+45 pacientes nuevos</strong> y reseñas de 4.9★ que la posicionan como referente en pediatría.',
    name: 'Dra. Rivas',
    biz: 'Pediatría Integral · Puebla'
  }
};

document.querySelectorAll('.story-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.story-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const k = tab.dataset.key;
    const data = STORIES[k];
    const story = document.querySelector('.story-text');
    const nameFoot = document.querySelector('.story-foot .name-foot');
    if (story) story.innerHTML = data.text;
    if (nameFoot) nameFoot.innerHTML = `<strong>${data.name}</strong> · ${data.biz}`;
  });
});

// ===== FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ===== Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || prefersReduced) {
  reveals.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => io.observe(el));

  // Safety net: after a short delay, reveal anything already in/above the viewport.
  // Some browsers don't fire IO immediately for elements visible at load.
  requestAnimationFrame(() => {
    setTimeout(() => {
      reveals.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, 80);
  });
}

// ===== Counter animation (hero big number)
const counters = document.querySelectorAll('[data-counter]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.counter, 10);
    const dur = parseInt(el.dataset.duration || '1400', 10);
    const start = performance.now();
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(target * eased);
      el.textContent = prefix + v.toLocaleString('es-MX') + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => cio.observe(c));

// ===== Form -> WhatsApp
const form = document.querySelector('#lead-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const nombre = fd.get('nombre') || '';
    const puesto = fd.get('puesto') || '';
    const ciudad = fd.get('ciudad') || '';
    const msg = `Hola, soy ${nombre} (${puesto}) de ${ciudad}. Me interesa generar más clientes para mi negocio con Google.`;
    const url = `https://wa.me/525665817161?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
}
