(function () {
  'use strict';

  var STRINGS = {
    es: {
      'meta.title': 'Luis Bizarro Ortiz — Portafolio',
      'meta.description': 'Portafolio de Luis Bizarro Ortiz: aplicaciones web en producción, desplegadas desde GitHub en Vercel.',
      'a11y.skip': 'Saltar al contenido',
      'hero.lede': 'Construyo aplicaciones web y las pongo a funcionar. Cada placa de esta hoja es un sitio real, desplegado desde GitHub en Vercel.',
      'specs.role': 'rol',
      'specs.roleValue': 'full-stack independiente',
      'specs.sites': 'sitios',
      'work.title': 'Sitios en producción',
      'plate1.no': 'placa 01',
      'plate1.alt': 'Portada de Norioma, academia preuniversitaria',
      'plate2.no': 'placa 02',
      'plate2.alt': 'Portal de acceso de Atelier Senda, sistema de gestión comercial',
      'plate3.no': 'placa 03',
      'plate3.alt': 'Portada de Lumbre, café de tueste propio en Barranco',
      'common.open': 'Abrir sitio',
      'common.newTab': ' (abre en una pestaña nueva)',
      'contact.title': 'contacto',
      'contact.cta': 'Escríbeme por LinkedIn',
      'contact.availability': 'Disponible para proyectos nuevos.',
      'contact.updated': 'actualizado'
    },
    en: {
      'meta.title': 'Luis Bizarro Ortiz — Portfolio',
      'meta.description': "Luis Bizarro Ortiz's portfolio: web applications in production, deployed from GitHub on Vercel.",
      'a11y.skip': 'Skip to content',
      'hero.lede': "I build web applications and get them running. Every plate on this sheet is a real site, deployed from GitHub on Vercel.",
      'specs.role': 'role',
      'specs.roleValue': 'independent full-stack developer',
      'specs.sites': 'sites',
      'work.title': 'Sites in production',
      'plate1.no': 'plate 01',
      'plate1.alt': 'Norioma home page, a pre-university academy',
      'plate2.no': 'plate 02',
      'plate2.alt': 'Atelier Senda sign-in page, a retail management system',
      'plate3.no': 'plate 03',
      'plate3.alt': 'Lumbre home page, a coffee roastery in Barranco',
      'common.open': 'Open site',
      'common.newTab': ' (opens in a new tab)',
      'contact.title': 'contact',
      'contact.cta': 'Message me on LinkedIn',
      'contact.availability': 'Available for new projects.',
      'contact.updated': 'updated'
    }
  };

  var root = document.documentElement;
  var buttons = document.querySelectorAll('.lang__btn');
  var description = document.querySelector('meta[name="description"]');

  function queryAll(attr) {
    return document.querySelectorAll('[' + attr + ']');
  }

  function applyLang(lang) {
    var dict = STRINGS[lang] || STRINGS.es;

    root.lang = lang;
    root.setAttribute('data-lang', lang);

    queryAll('data-i18n').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) { el.textContent = dict[key]; }
    });

    queryAll('data-i18n-alt').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (dict[key]) { el.setAttribute('alt', dict[key]); }
    });

    if (dict['meta.title']) { document.title = dict['meta.title']; }
    if (description && dict['meta.description']) {
      description.setAttribute('content', dict['meta.description']);
    }

    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function remember(lang) {
    try { localStorage.setItem('plano-lang', lang); } catch (error) { /* modo privado o file:// */ }
  }

  function storedLang() {
    try { return localStorage.getItem('plano-lang'); } catch (error) { return null; }
  }

  var saved = storedLang();
  var preferred = saved || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');

  applyLang(preferred);

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var lang = button.getAttribute('data-lang');
      applyLang(lang);
      remember(lang);
    });
  });

  // Un solo gesto al cargar: los márgenes y la cota se trazan.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('is-ready');
    });
  });

  // Marca la placa en vista; atenúa las cotas del resto.
  var plates = document.querySelectorAll('.plate');
  var platesRoot = document.querySelector('.plates');

  if (platesRoot && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-active', '');
        } else {
          entry.target.removeAttribute('data-active');
        }
      });

      var anyActive = false;
      plates.forEach(function (plate) {
        if (plate.hasAttribute('data-active')) { anyActive = true; }
      });
      platesRoot.toggleAttribute('data-any', anyActive);
    }, { threshold: 0.45 });

    plates.forEach(function (plate) { observer.observe(plate); });
  }
})();
