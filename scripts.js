// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Counter animation =====
function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const duration = parseInt(el.dataset.duration || '1500', 10);
  const prefix = el.dataset.prefix || '';
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const v = Math.floor(eased * target);
    el.textContent = prefix + v.toLocaleString('es-MX');
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target.toLocaleString('es-MX');
  }
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

// ===== Story tabs (Pizzería / Restaurante / Abogado / Doctor) =====
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

// ===== Business type tabs (Pizzería / Restaurante / Abogado / Doctor / Negocio Local) =====
const BUSINESS_DATA = {
  pizza: {
    title: 'Tu pizzería en el top de Google, generando pedidos a diario',
    desc: 'En tu ciudad hay cientos de personas buscando "pizza a domicilio cerca de mí" cada día. Asegúrate de que te encuentren a ti primero.',
    searches: '800+',
    growth: '3X',
    days: '45 días',
    quality: '100%'
  },
  resto: {
    title: 'Tu restaurante lleno de clientes, especialmente en fin de semana',
    desc: 'Cientos de personas buscan "restaurante bueno cerca de mí" cada semana. Posiciónate como la mejor opción de tu zona.',
    searches: '600+',
    growth: '4X',
    days: '60 días',
    quality: '100%'
  },
  abogado: {
    title: 'Tu despacho llenado de consultas desde Google',
    desc: 'Miles de búsquedas mensuales de personas que necesitan un abogado en tu zona. Aparece justo cuando más lo necesitan.',
    searches: '1,200+',
    growth: '5X',
    days: '45 días',
    quality: '100%'
  },
  doctor: {
    title: 'Tu consultorio lleno de pacientes nuevos',
    desc: 'Las personas buscan especialistas confiables en su zona. Posiciónate como el doctor preferido de tu ciudad.',
    searches: '800+',
    growth: '3X',
    days: '60 días',
    quality: '100%'
  },
  local: {
    title: 'Tu negocio visible en Google para toda tu zona',
    desc: 'Sea cual sea tu giro, hay personas buscando exactamente lo que ofreces. Aparece cuando te busquen.',
    searches: '500+',
    growth: '2X',
    days: '45 días',
    quality: '100%'
  }
};

document.querySelectorAll('.business-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.business-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const biz = tab.dataset.biz;
    const data = BUSINESS_DATA[biz];

    const titleEl = document.getElementById('biz-title');
    const descEl = document.getElementById('biz-desc');
    const searchesEl = document.getElementById('biz-searches');
    const growthEl = document.getElementById('biz-growth');
    const daysEl = document.getElementById('biz-days');
    const qualityEl = document.getElementById('biz-quality');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (searchesEl) searchesEl.textContent = data.searches;
    if (growthEl) growthEl.textContent = data.growth;
    if (daysEl) daysEl.textContent = data.days;
    if (qualityEl) qualityEl.textContent = data.quality;
  });
});

// ===== FAQ accordion =====
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

// ===== Diagnosis Form -> WhatsApp =====
const diagnosisForm = document.querySelector('#diagnosis-form');
if (diagnosisForm) {
  diagnosisForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bizName = document.getElementById('biz-name').value || '';
    const bizCity = document.getElementById('biz-city').value || '';
    const msg = `Hola, quiero hacer un diagnóstico gratuito. Mi negocio: ${bizName} · ${bizCity}. ¿Cuántos clientes puedo atraer en Google?`;
    const url = `https://wa.me/525665817161?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    diagnosisForm.reset();
  });
}

// ===== Lead Form -> WhatsApp (si existe) =====
const form = document.getElementById('lead-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const nombre = fd.get('nombre') || '';
    const puesto = fd.get('puesto') || '';
    const ciudad = fd.get('ciudad') || '';
    const especialidad = fd.get('especialidad') || '';
    let msg = `Hola, me interesa generar más clientes con Google.%0A%0ANombre: ${nombre}%0APuesto: ${puesto}%0AUbicación: ${ciudad}`;
    if (especialidad) msg += `%0AEspecialidad: ${especialidad}`;
    window.open(`https://wa.me/525665817161?text=${msg}`, '_blank');
    form.reset();
  });
}
