var elemSlide;
var elemChapters;
params = getParams(window.location.hash);

var onMounted = function () {
  // Re-read params at call time to ensure we have the current hash
  params = getParams(window.location.hash);

  // Read DOM elements here, after HTML is injected by jQuery .load()
  elemSlide = document.getElementById("coverItems");
  elemChapters = document.getElementById("chapters");

  printLoading(true);

  if ((params && params.key) === "catalogo") {
    // Flujo catálogo: obtener episodios del programa
    getDataCatalogoProgram(params.id)
      .then(function (episodes) {
        // La API retorna un array plano de episodios directamente
        if (!episodes || !Array.isArray(episodes) || episodes.length === 0) {
          printLoading(false);
          return;
        }

        // Normalizar episodios al formato interno
        var capitulos = episodes.map(function (v) {
          return {
            id: params.id,
            rudoId: v.id,
            key: v.source_url || v.key || String(v.id),
            title: v.title || v.titulo || "",
            image: v.image || "",
            m3u8: v.url_video || (v.source_url ? "https://rudo.video/vod/" + v.source_url : ""),
            source_url: v.source_url || "",
            duration: "",
            bloqueado: v.bloqueado,
            url_pago: v.url_pago || ""
          };
        });

        // Solo mostrar episodios desbloqueados en el slide
        var capitulsDesbloqueados = capitulos.filter(function(c) { return !c.bloqueado; });
        if (capitulsDesbloqueados.length >= 2) {
          printSlide(capitulsDesbloqueados);
        } else if (capitulsDesbloqueados.length === 1) {
          printSlideSimple(capitulsDesbloqueados[0]);
        }
        printChaptersCatalogo(capitulos);

        printLoading(false);

        if (typeof SpatialNavigation !== 'undefined') {
          SpatialNavigation.clear();
          SpatialNavigation.add({ selector: 'a, .focusable' });
          SpatialNavigation.makeFocusable();
        }
        setTimeout(function() {
          var firstChapter = document.querySelector('.page-program__chapters-item');
          if (firstChapter) firstChapter.focus();
        }, 100);
      })
      .catch(function (error) {
        printLoading("error");
        console.error("[program.js] catalogo", error);
      });
  } else {
    getDataVod(params && params.key)
      .then(function (array) {
        var program;
        if (array) {
          program = array.find(function (item) {
            return item.id === (params && params.id);
          });
        }

        // Prints
        if (program && program.capitulos) {
          printSlide(program.capitulos);
          printChapters(program.capitulos);
        }

        printLoading(false);

        if (typeof SpatialNavigation !== 'undefined') {
          SpatialNavigation.clear();
          SpatialNavigation.add({ selector: 'a, .focusable' });
          SpatialNavigation.makeFocusable();
        }
        setTimeout(function() {
          var firstChapter = document.querySelector('.page-program__chapters-item');
          if (firstChapter) firstChapter.focus();
        }, 100);
      })
      .catch(function (error) {
        printLoading("error");
        console.error("[program.js]", error);
      });
  }
};

window.onload = onMounted();

// Print slide
function printSlide(chapters) {
  var array = randomChapter(chapters);

  array.forEach(function (element) {
    element.id = params.id;
    element.rudoId = params.rudoId;
    var item =
      '<a href="' +
      printUrlVod(element) +
      '" tabindex="0" class="slide-item splide__slide slide focusable" style="background-image: url(' +
      element.image +
      ')">' +
      '<div class="slide-item__mask">' +
      '<div class="slide-item__content d-flex">' +
      '<h1 class="title">' +
      element.title +
      "</h1>" +
      '<p class="time">Duración: ' +
      element.duration +
      "</p>" +
      '<div><div class="button">Ver Último Capítulo</div></div>' +
      "</div>" +
      "</div>" +
      "</a>";

    printElements(elemSlide, item);
  });

  var elem = document.getElementById("slideCover");
  if (elem) {
    new Splide("#slideCover", {
      arrows: false,
      height: "60vh",
      perPage: 1,
      keyboard: true,
      speed: 10,
      omitEnd: true,
      waitForTransition: true,
    }).mount();
  }
}

// Print slide (un solo elemento, sin randomChapter)
function printSlideSimple(element) {
  var item =
    '<a href="' +
    printUrlVod(element) +
    '" tabindex="0" class="slide-item splide__slide slide focusable" style="background-image: url(' +
    element.image +
    ')">' +
    '<div class="slide-item__mask">' +
    '<div class="slide-item__content d-flex">' +
    '<h1 class="title">' + element.title + "</h1>" +
    '<p class="time">Duración: ' + element.duration + "</p>" +
    '<div><div class="button">Ver Último Capítulo</div></div>' +
    "</div></div></a>";

  printElements(elemSlide, item);

  var elem = document.getElementById("slideCover");
  if (elem) {
    new Splide("#slideCover", {
      arrows: false,
      height: "60vh",
      perPage: 1,
      keyboard: true,
      speed: 10,
      omitEnd: true,
      waitForTransition: true,
    }).mount();
  }
}

// Print chapters
function printChapters(array) {
  array.forEach(function (element) {
    element.id = params.id;
    element.rudoId = params.rudoId;

    var item = '<div class="col">';
    item +=
      '<a id="' +
      element.key +
      '" href="' +
      printUrlVod(element) +
      '" tabindex="0" class="focusable page-program__chapters-item">' +
      '<div class="chapter-image"><img src="' +
      element.image +
      '" loading="lazy"/></div>' +
      '<div class="chapter-title d-flex">' +
      element.title +
      "</div>" +
      "</a><div></div>";
    item += "</div>";

    printElements(elemChapters, item);
  });

  var chapterSelected = localStorage.getItem("chapter");
  if (chapterSelected) {
    var chapterElem = document.getElementById(chapterSelected);
    if (chapterElem) chapterElem.focus();
  } else {
    var chapter = document.querySelector("#chapters .page-program__chapters-item");
    if (chapter) chapter.focus();
  }
}

// Print chapters para catálogo (con soporte de bloqueado)
function printChaptersCatalogo(array) {
  array.forEach(function (element) {
    var item = '<div class="col">';

    if (element.bloqueado) {
      item +=
        '<div id="' + element.key + '" data-url-pago="' + (element.url_pago || '') + '" tabindex="0" class="focusable page-program__chapters-item page-program__chapters-item--locked">' +
        '<div class="chapter-image"><img src="' + element.image + '" loading="lazy"/>' +
        '<div class="chapter-lock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1448 1715.6" style="width:2.5rem;height:2.5rem;"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><g><g id="Capa_1"><path class="cls-1" d="M1164.5,694.1h-13.4v-148.1c0-222-181.6-403.6-403.6-403.6s-403.6,181.6-403.6,403.6v148.1h-13.4c-61.6,0-112.1,50.4-112.1,112.1v634c0,61.6,50.4,112.1,112.1,112.1h834c61.6,0,112.1-50.4,112.1-112.1v-634c0-61.6-50.4-112.1-112.1-112.1ZM493.9,546c0-139.5,114.1-253.6,253.6-253.6s253.6,114.1,253.6,253.6v148.1h-507.2v-148.1ZM815.9,1116.3v142.5c0,37.6-30.8,68.3-68.3,68.3h0c-37.6,0-68.3-30.8-68.3-68.3v-142.5c-25.6-20.2-42-51.5-42-86.7,0-60.9,49.4-110.4,110.4-110.4s110.4,49.4,110.4,110.4-16.4,66.4-42,86.7Z"/></g></g></svg></div>' +
        '</div>' +
        '<div class="chapter-title d-flex">' + element.title + '</div>' +
        '</div><div></div>';
    } else {
      item +=
        '<div id="' + element.key + '" data-video-id="' + element.rudoId + '" data-catalogo-id="' + params.id + '" data-source-url="' + (element.source_url || '') + '" data-title="' + encodeURIComponent(element.title) + '" data-url-pago="' + (element.url_pago || '') + '" tabindex="0" class="focusable page-program__chapters-item">' +
        '<div class="chapter-image"><img src="' + element.image + '" loading="lazy"/></div>' +
        '<div class="chapter-title d-flex">' + element.title + '</div>' +
        '</div><div></div>';
    }

    item += '</div>';
    printElements(elemChapters, item);
  });

  var chapterSelected = localStorage.getItem("chapter");
  if (chapterSelected) {
    var chapterElem = document.getElementById(chapterSelected);
    if (chapterElem) chapterElem.focus();
  } else {
    var chapter = document.querySelector("#chapters .page-program__chapters-item");
    if (chapter) chapter.focus();
  }

  // Bind click/enter en episodios desbloqueados
  var free = document.querySelectorAll(".page-program__chapters-item:not(.page-program__chapters-item--locked)");
  for (var i = 0; i < free.length; i++) {
    (function(el) {
      function playChapter() {
        // Gate: verificar que el usuario tiene sesión activa
        var userData = null;
        try { userData = JSON.parse(localStorage.getItem('ecuavisa_user')); } catch(x) {}
        if (!userData) {
          window.location.hash = "#/login";
          return;
        }

        var videoId    = el.getAttribute("data-video-id");
        var catalogoId = el.getAttribute("data-catalogo-id");
        var title      = decodeURIComponent(el.getAttribute("data-title") || "");
        var urlPago    = el.getAttribute("data-url-pago") || "";
        printLoading(true);
        getProtectedVideoUrl(videoId, catalogoId)
          .then(function(m3u8) {
            printLoading(false);
            if (!m3u8) {
              // Backend negó acceso: mostrar paywall si hay URL de pago
              if (urlPago) { showPaywallDialog(urlPago); }
              else { console.error("[program.js] no se obtuvo m3u8 y sin url_pago"); }
              return;
            }
            var url = "#/player?type=vod&id=" + catalogoId + "&rudoId=" + videoId + "&name=" + encodeURIComponent(title) + "&m3u8=" + encodeURIComponent(m3u8) + "&key=catalogo";
            window.location.hash = url;
          })
          .catch(function(err) {
            printLoading(false);
            if (urlPago) { showPaywallDialog(urlPago); }
            else { console.error("[program.js] getProtectedVideoUrl error:", err); }
          });
      }
      el.addEventListener("click", function(e) { e.preventDefault(); playChapter(); });
      el.addEventListener("keydown", function(e) {
        if (e.keyCode === 13 || e.keyCode === 32) { e.preventDefault(); playChapter(); }
      });
    })(free[i]);
  }

  // Bind click/enter en episodios bloqueados
  var locked = document.querySelectorAll(".page-program__chapters-item--locked");
  for (var j = 0; j < locked.length; j++) {
    (function(el) {
      var urlPago = el.getAttribute("data-url-pago");
      el.addEventListener("click", function(e) { e.preventDefault(); e.stopPropagation(); showPaywallDialog(urlPago); });
      el.addEventListener("keydown", function(e) {
        if (e.keyCode === 13 || e.keyCode === 32) { e.preventDefault(); e.stopPropagation(); showPaywallDialog(urlPago); }
      });
    })(locked[j]);
  }
}

// Obtiene la URL m3u8 firmada
function getProtectedVideoUrl(videoId, catalogoId) {
  var token = '3CUAVISaNhWVCRNPofjXtWMk1D99LOoFzMf6LfoNlkiN8dGDkd';
  var userId = '';
  try {
    var userData = JSON.parse(localStorage.getItem('ecuavisa_user'));
    if (userData) userId = userData.userId || userData.user_id || userData.id || userData.sub || '';
  } catch(e) {}

  var url = "https://vod-api.vercel.app/app/protected-video/" + videoId +
    "?videoId=" + videoId +
    "&IdCatalogo=" + catalogoId +
    (userId ? "&userId=" + userId : '');
  return axios.get(url, {
    headers: { Authorization: "Bearer " + token }
  }).then(function(response) {
    var d = response.data;
    if (!d || !d.st) return null;
    var el = document.querySelector('[data-video-id="' + videoId + '"]');
    var sourceUrl = el ? el.getAttribute("data-source-url") : null;
    if (!sourceUrl) return null;
    return "https://rudo.video/vod/" + sourceUrl + "?st=" + d.st + "&ts=" + d.ts + "&e=" + d.e;
  });
}

// Function random
function randomChapter(array) {
  if (!array || array.length === 0) return [];
  if (array.length === 1) return [array[0]];

  var indice1 = Math.floor(Math.random() * array.length);
  var indice2 = Math.floor(Math.random() * array.length);

  while (indice2 === indice1) {
    indice2 = Math.floor(Math.random() * array.length);
  }

  var objeto1 = array.slice(indice1, indice1 + 1)[0];
  var objeto2 = array.slice(indice2, indice2 + 1)[0];

  return [objeto1, objeto2];
}

// Paywall dialog
function showPaywallDialog(url) {
  var existing = document.getElementById('paywall-dialog');
  if (existing) existing.remove();

  var dialog = document.createElement('div');
  dialog.id = 'paywall-dialog';
  dialog.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;';
  dialog.innerHTML =
    '<div style="background:#1a1a2e;border-radius:16px;padding:40px;text-align:center;max-width:480px;width:90%;color:#fff;">' +
    '<h2 style="margin:0 0 12px;font-size:1.4em;">Contenido exclusivo</h2>' +
    '<p style="margin:0 0 24px;color:#aaa;font-size:0.95em;">Suscríbete para ver este episodio.<br>Escanea el código QR desde tu celular.</p>' +
    '<div id="paywall-qr" style="display:inline-block;background:#fff;padding:12px;border-radius:8px;margin-bottom:24px;"></div>' +
    '<br>' +
    '<a id="paywall-close" href="javascript:void(0)" tabindex="0" class="focusable" style="display:inline-block;padding:12px 32px;background:#e63946;border-radius:8px;color:#fff;text-decoration:none;font-size:1em;">Cerrar</a>' +
    '</div>';

  document.body.appendChild(dialog);
  document.body.style.overflow = 'hidden';

  if (url && typeof QRCode !== 'undefined') {
    new QRCode(document.getElementById('paywall-qr'), {
      text: url,
      width: 200,
      height: 200,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  setTimeout(function() {
    var closeBtn = document.getElementById('paywall-close');
    if (closeBtn) {
      closeBtn.focus();
      closeBtn.addEventListener('click', function(e) { e.preventDefault(); closePaywallDialog(); });
    }
  }, 50);

  if (typeof SpatialNavigation !== 'undefined') {
    SpatialNavigation.clear();
    SpatialNavigation.add({ id: 'paywall', selector: '#paywall-close' });
    SpatialNavigation.makeFocusable();
  }

  dialog._keyHandler = function(e) {
    if (e.keyCode === 461 || e.keyCode === 27) { closePaywallDialog(); return; }
    if ((e.keyCode === 13 || e.keyCode === 32) && document.activeElement && document.activeElement.id === 'paywall-close') {
      closePaywallDialog(); e.preventDefault(); return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  document.addEventListener('keydown', dialog._keyHandler, true);
}

function closePaywallDialog() {
  var dialog = document.getElementById('paywall-dialog');
  if (dialog) {
    if (dialog._keyHandler) document.removeEventListener('keydown', dialog._keyHandler, true);
    dialog.remove();
  }
  document.body.style.overflow = '';
  if (typeof SpatialNavigation !== 'undefined') {
    SpatialNavigation.clear();
    SpatialNavigation.add({ selector: 'a, .focusable' });
    SpatialNavigation.makeFocusable();
  }
  setTimeout(function() {
    var focused = document.querySelector('.page-program__chapters-item--locked');
    if (focused) focused.focus();
  }, 50);
}



