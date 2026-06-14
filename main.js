/* ============================================================
   LANGOŠE — PORTFOLIO  |  main.js
   Shared across every page: navbar, mobile menu, scroll reveal,
   and data-driven rendering from data.json
   ============================================================ */

/* ---------------------------------------------------------------
   SVG ICON MAP  — used when rendering service cards / rows
--------------------------------------------------------------- */
var ICONS = {
  palette: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>',
  share:   '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  globe:   '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>'
};

var CHECK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';

function svgIcon(key) {
  return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' + (ICONS[key] || '') + '</svg>';
}

/* ---------------------------------------------------------------
   RENDERERS
--------------------------------------------------------------- */

function renderPortfolioGrid(items, container, limit) {
  var list = limit ? items.slice(0, limit) : items;
  container.innerHTML = list.map(function(item, i) {
    var delay = (i % 3) * 0.08;
    return '<div class="portfolio-item reveal" style="transition-delay:' + delay + 's;">'
      + '<div class="portfolio-item-img-wrap">'
      + '<img src="' + item.image + '" alt="' + item.title + '" />'
      + '<div class="portfolio-item-hover"></div>'
      + '</div>'
      + '<span class="portfolio-item-cat">' + item.category + '</span>'
      + '<h3>' + item.title + '</h3>'
      + (item.description ? '<p>' + item.description + '</p>' : '')
      + '</div>';
  }).join('');
}

function renderServiceCards(services, container) {
  container.innerHTML = services.map(function(svc, i) {
    var delay = i * 0.1;
    var items = svc.included.map(function(it, index) {
      var item = typeof it === 'string' ? { text: it } : it;
      var helpId = 'svc-help-' + i + '-' + index;
      var helpButton = item.help ? '<button type="button" class="included-help-btn" aria-expanded="false" aria-controls="' + helpId + '" title="Zobrazit vysvětlení">?</button>' : '';
      var helpText = item.help ? '<div class="included-help" id="' + helpId + '">' + item.help + '</div>' : '';
      return '<li class="included-item' + (item.help ? ' has-help' : '') + '">'
        + (item.help
          ? '<div class="included-row">'
            + '<span class="included-text">' + CHECK_SVG + '<span>' + item.text + '</span></span>'
            + helpButton
            + '</div>'
            + helpText
          : '<span class="included-text">' + CHECK_SVG + '<span>' + item.text + '</span></span>')
        + '</li>';
    }).join('');
    return '<div class="svc-card reveal" style="transition-delay:' + delay + 's;">'
      + '<div class="icon">' + svgIcon(svc.icon) + '</div>'
      + '<h2>' + svc.title + '</h2>'
      + '<p>' + svc.description + '</p>'
      + '<p class="included-label">Co je zahrnuto</p>'
      + '<ul class="included-list">' + items + '</ul>'
      + '<div class="svc-card-footer">'
      + (function() {
        var price = typeof svc.price === 'string' ? { text: svc.price } : svc.price;
        var priceHelpId = 'svc-price-help-' + i;
        var priceHelpButton = price.help ? '<button type="button" class="price-help-btn" aria-expanded="false" aria-controls="' + priceHelpId + '" title="Zobrazit vysvětlení">?</button>' : '';
        var priceHelpText = price.help ? '<div class="price-help" id="' + priceHelpId + '">' + price.help + '</div>' : '';
        return '<div class="price-wrap">'
          + '<div class="price-row">'
          + '<span class="price">' + price.text + '</span>'
          + priceHelpButton
          + '</div>'
          + priceHelpText
          + '</div>';
      })()
      + '<a href="kontakt.html" class="btn-poptat">Poptat</a>'
      + '</div>'
      + '</div>';
  }).join('');
}

function renderServiceRows(services, container) {
  container.innerHTML = services.map(function(svc) {
    return '<div class="service-row">'
      + '<div class="icon">' + svgIcon(svc.icon) + '</div>'
      + '<div>'
      + '<h3>' + svc.title + '</h3>'
      + '<p>' + svc.description + '</p>'
      + '</div>'
      + '</div>';
  }).join('');
}

function renderFaq(faq, container) {
  container.innerHTML = faq.map(function(item) {
    return '<div class="faq-item">'
      + '<button class="faq-btn">'
      + '<span>' + item.question + '</span>'
      + '<span class="faq-toggle">'
      + '<svg class="icon-plus" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
      + '<svg class="icon-minus" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="display:none"><line x1="5" y1="12" x2="19" y2="12"/></svg>'
      + '</span>'
      + '</button>'
      + '<div class="faq-answer"><div class="faq-answer-inner"><p>' + item.answer + '</p></div></div>'
      + '</div>';
  }).join('');

  attachFaqListeners(container);
}

function attachFaqListeners(container) {
  container.querySelectorAll('.faq-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      container.querySelectorAll('.faq-item.open').forEach(function(el) {
        el.classList.remove('open');
        el.querySelector('.icon-plus').style.display  = 'block';
        el.querySelector('.icon-minus').style.display = 'none';
      });
      if (!wasOpen) {
        item.classList.add('open');
        item.querySelector('.icon-plus').style.display  = 'none';
        item.querySelector('.icon-minus').style.display = 'block';
      }
    });
  });
}

function attachIncludedHelpListeners(container) {
  container.querySelectorAll('.included-help-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.included-item');
      var expanded = item.classList.toggle('help-open');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
}

function attachPriceHelpListeners(container) {
  container.querySelectorAll('.price-help-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var wrap = btn.closest('.price-wrap');
      var expanded = wrap.classList.toggle('help-open');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });
}

/* ---------------------------------------------------------------
   MAIN INIT
--------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------------------------------
  // NAVBAR
  // -------------------------------------------------------
  var navbar     = document.getElementById('navbar');
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var iconMenu   = document.getElementById('icon-menu');
  var iconClose  = document.getElementById('icon-close');
  var isHome     = document.body.classList.contains('page-home');

  function updateNavbar() {
    var scrolled = window.scrollY > 80;
    if (isHome && scrolled) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    if (scrolled) {
      navbar.classList.add('nav-scrolled');
      navbar.classList.remove('nav-transparent');
    } else {
      navbar.classList.remove('nav-scrolled');
      navbar.classList.add('nav-transparent');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      iconMenu.style.display  = isOpen ? 'none'  : 'block';
      iconClose.style.display = isOpen ? 'block' : 'none';
    });
  }

  document.querySelectorAll('#mobile-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      iconMenu.style.display  = 'block';
      iconClose.style.display = 'none';
    });
  });

  // -------------------------------------------------------
  // SCROLL REVEAL  (re-run after dynamic rendering)
  // -------------------------------------------------------
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio >= 0.12) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: [0, 0.12] });

  function observeRevealEls() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
      observer.observe(el);
    });
  }

  observeRevealEls();

  // -------------------------------------------------------
  // LOAD DATA & RENDER
  // -------------------------------------------------------
  var portfolioGrid        = document.getElementById('portfolio-grid');
  var portfolioPreviewGrid = document.getElementById('portfolio-preview-grid');
  var serviceRowList       = document.getElementById('service-row-list');
  var servicesGrid         = document.getElementById('services-grid');
  var faqList              = document.getElementById('faq-list');

  var needsData = portfolioGrid || portfolioPreviewGrid || serviceRowList || servicesGrid || faqList;

  if (needsData) {
    fetch('data.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {

        if (portfolioGrid) {
          renderPortfolioGrid(data.portfolio, portfolioGrid, null);
          observeRevealEls();
        }

        if (portfolioPreviewGrid) {
          renderPortfolioGrid(data.portfolio, portfolioPreviewGrid, 3);
          observeRevealEls();
        }

        if (serviceRowList) {
          renderServiceRows(data.sluzby, serviceRowList);
        }

        if (servicesGrid) {
          renderServiceCards(data.sluzby, servicesGrid);
          attachIncludedHelpListeners(servicesGrid);
          attachPriceHelpListeners(servicesGrid);
          observeRevealEls();
        }

        if (faqList) {
          renderFaq(data.faq, faqList);
          observeRevealEls();
        }

      })
      .catch(function(err) {
        console.error('Chyba při načítání data.json:', err);
      });
  }

});
