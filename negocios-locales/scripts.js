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

// ===== Story tabs =====
const stories = {
  abogado: { name: 'Carlos', text: '<span class="name">Carlos</span> tenía un despacho de abogados… pero <strong>nadie lo encontraba en Google</strong> y los casos llegaban solo por recomendación. Después de optimizar su perfil y posicionamiento local, ahora <strong>recibe +18 consultas diarias desde internet</strong>. ¿Cuántos clientes estaba perdiendo antes?', who: '<strong>Carlos H.</strong> · Despacho Hernández y Asoc. · Querétaro' },
  divorcios: { name: 'Lucía', text: '<span class="name">Lucía</span> es abogada de familia… pero <strong>su despacho no aparecía</strong> cuando alguien buscaba "abogado de divorcios". Tras optimizar Google Business y reseñas, ahora <strong>cierra +12 nuevos casos al mes</strong> que llegan directo desde el mapa.', who: '<strong>Lucía P.</strong> · Bufete Familiar · CDMX' },
  fiscal: { name: 'Roberto', text: '<span class="name">Roberto</span> es abogado fiscalista… <strong>nadie lo encontraba</strong> a pesar de tener 15 años de experiencia. Hoy es el <strong>#1 en Google Maps</strong> para "abogado fiscal" en su zona y atiende empresas grandes que antes ni lo conocían.', who: '<strong>Roberto M.</strong> · Asesoría Fiscal MR · Monterrey' },
  laboral: { name: 'Adriana', text: '<span class="name">Adriana</span> lleva casos laborales… pero <strong>solo le llegaban referidos</strong>. Ahora <strong>aparece en el top 3</strong> cuando alguien busca "abogado laboral cerca de mí" y duplicó su facturación en 5 meses sin gastar en publicidad.', who: '<strong>Adriana V.</strong> · Vega Abogados · Guadalajara' },
};
document.querySelectorAll('.story-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.story-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.key;
    const story = stories[key];
    if (story) {
      const card = tab.closest('.story-card');
      card.querySelector('.story-text').innerHTML = story.text;
      card.querySelector('.name-foot').innerHTML = story.who;
    }
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

// ===== Form -> WhatsApp =====
const form = document.getElementById('lead-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get('nombre');
    const puesto = data.get('puesto');
    const ciudad = data.get('ciudad');
    const especialidad = data.get('especialidad') || '';
    const msg = `Hola, me interesa el diagnóstico gratis para mi despacho de abogados.%0A%0ANombre: ${nombre}%0APuesto: ${puesto}%0AEspecialidad: ${especialidad}%0AUbicación: ${ciudad}`;
    window.open(`https://wa.me/525665817161?text=${msg}`, '_blank');
  });
}
