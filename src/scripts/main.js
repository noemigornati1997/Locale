(function () {
  "use strict";

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var riduciMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- dati dalla build (vedi src/config.mjs) ---------- */
  var SALUTO = document.body.dataset.saluto || "Ciao!";
  var NUMERO = (document.body.dataset.whatsapp || "").replace(/\D/g, "");
  function saluto() { return SALUTO; }
  function waUrl(testo) { return "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(testo); }

  // link social non ancora inseriti: non portano da nessuna parte
  $$("[data-segnaposto]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  /* ---------- header e menu mobile ---------- */
  var header = $(".header");
  var aggiornaHeader = function () { header.classList.toggle("ombra", window.scrollY > 10); };
  window.addEventListener("scroll", aggiornaHeader, { passive: true });
  aggiornaHeader();

  var hamburger = $(".hamburger");
  function chiudiMenu() {
    document.body.classList.remove("menu-aperto");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Apri il menu");
  }
  hamburger.addEventListener("click", function () {
    var aperto = document.body.classList.toggle("menu-aperto");
    hamburger.setAttribute("aria-expanded", String(aperto));
    hamburger.setAttribute("aria-label", aperto ? "Chiudi il menu" : "Apri il menu");
  });
  $$(".menu a").forEach(function (a) { a.addEventListener("click", chiudiMenu); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-aperto")) { chiudiMenu(); hamburger.focus(); }
  });

  /* ---------- selettore delle occasioni ---------- */
  var tabs = $$("[role=tab]");
  function mostraTab(tab, focus) {
    tabs.forEach(function (t) {
      var attivo = t === tab;
      t.setAttribute("aria-selected", String(attivo));
      t.tabIndex = attivo ? 0 : -1;
      var pannello = document.getElementById(t.getAttribute("aria-controls"));
      pannello.hidden = !attivo;
      if (attivo) {
        pannello.classList.remove("entra");
        void pannello.offsetWidth;
        pannello.classList.add("entra");
      }
    });
    if (focus) tab.focus();
    if (tab.scrollIntoView && window.innerWidth < 600) {
      tab.scrollIntoView({ block: "nearest", inline: "center", behavior: riduciMovimento ? "auto" : "smooth" });
    }
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { mostraTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var nuovo = null;
      if (e.key === "ArrowRight") nuovo = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") nuovo = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") nuovo = tabs[0];
      if (e.key === "End") nuovo = tabs[tabs.length - 1];
      if (nuovo) { e.preventDefault(); mostraTab(nuovo, true); }
    });
  });
  // le chip dell'hero aprono direttamente l'occasione scelta
  $$("[data-occasione]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var tab = document.getElementById("tab-" + chip.dataset.occasione);
      if (tab) mostraTab(tab);
    });
  });

  /* ---------- slider della galleria: frecce, barra di avanzamento, trascinamento col mouse ---------- */
  $$("[data-slider]").forEach(function (slider) {
    var track = $(".slider-track", slider);
    var frecce = $$(".slider-freccia", slider);
    var barra = $(".slider-barra span", slider);
    var passo = function () { var s = $(".slide", track); return s ? s.getBoundingClientRect().width + 16 : 300; };
    var aggiorna = function () {
      var max = track.scrollWidth - track.clientWidth;
      var visibile = track.clientWidth / track.scrollWidth;
      barra.style.width = Math.max(visibile * 100, 12) + "%";
      barra.style.transform = "translateX(" + (max > 0 ? (track.scrollLeft / max) * (100 / Math.max(visibile, .12) - 100) : 0) + "%)";
      frecce[0].disabled = track.scrollLeft <= 4;
      frecce[1].disabled = track.scrollLeft >= max - 4;
    };
    frecce.forEach(function (f) {
      f.addEventListener("click", function () { track.scrollBy({ left: passo() * Number(f.dataset.dir), behavior: riduciMovimento ? "auto" : "smooth" }); });
    });
    track.addEventListener("scroll", aggiorna, { passive: true });
    window.addEventListener("resize", aggiorna);
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: passo() }); }
      if (e.key === "ArrowLeft") { e.preventDefault(); track.scrollBy({ left: -passo() }); }
    });
    // trascinamento con il mouse (su telefono basta il dito)
    var inizioX = 0, inizioScroll = 0, premuto = false, trascinato = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      premuto = true; trascinato = false; inizioX = e.clientX; inizioScroll = track.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!premuto) return;
      var dx = e.clientX - inizioX;
      if (!trascinato && Math.abs(dx) > 6) { trascinato = true; track.classList.add("trascina"); }
      if (trascinato) track.scrollLeft = inizioScroll - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!premuto) return;
      premuto = false;
      if (trascinato) {
        track.classList.remove("trascina");
        // riallineo alla foto più vicina
        var p = passo();
        track.scrollTo({ left: Math.round(track.scrollLeft / p) * p, behavior: "smooth" });
      }
    });
    // dopo un trascinamento il clic non deve aprire la foto
    track.addEventListener("click", function (e) {
      if (trascinato) { e.preventDefault(); e.stopPropagation(); trascinato = false; }
    }, true);
    aggiorna();
  });

  /* ---------- galleria con lightbox ---------- */
  var lightbox = $(".lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    var voci = $$("[data-full]");
    var img = $("img", lightbox), didascalia = $("figcaption", lightbox), indice = 0, ultimoFocus = null;
    var mostra = function (i) {
      indice = (i + voci.length) % voci.length;
      var thumb = $("img", voci[indice]);
      img.src = voci[indice].dataset.full;
      img.alt = thumb.alt;
      didascalia.textContent = voci[indice].dataset.caption + " · " + (indice + 1) + " di " + voci.length;
    };
    voci.forEach(function (b, i) {
      b.addEventListener("click", function () {
        ultimoFocus = b;
        mostra(i);
        lightbox.showModal();
      });
    });
    $(".lb-prec", lightbox).addEventListener("click", function () { mostra(indice - 1); });
    $(".lb-succ", lightbox).addEventListener("click", function () { mostra(indice + 1); });
    $(".lb-chiudi", lightbox).addEventListener("click", function () { lightbox.close(); });
    lightbox.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") mostra(indice + 1);
      if (e.key === "ArrowLeft") mostra(indice - 1);
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-inner")) lightbox.close();
    });
    lightbox.addEventListener("close", function () { if (ultimoFocus) ultimoFocus.focus(); });
  }

  /* ---------- mappa: si carica solo al clic (più veloce e niente cookie Google prima) ---------- */
  var bottoneMappa = $("[data-carica-mappa]");
  if (bottoneMappa) {
    bottoneMappa.addEventListener("click", function () {
      var box = bottoneMappa.closest(".mappa");
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(bottoneMappa.dataset.caricaMappa || "Ossona") + "&output=embed";
      iframe.title = "Mappa: dove si trova lo spazio a Ossona";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      box.innerHTML = "";
      box.appendChild(iframe);
    });
  }

  /* ---------- form → messaggio WhatsApp ---------- */
  function dataLeggibile(v) {
    if (!v) return "";
    var d = new Date(v + "T12:00:00");
    return d.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
  }
  function valore(form, nome) {
    var el = form.elements[nome];
    if (!el) return "";
    return (el.value || "").trim();
  }
  var componi = {
    evento: function (f) {
      var righe = [saluto() + (valore(f, "nome") ? " Sono " + valore(f, "nome") + "." : "")];
      righe.push("Vorrei sapere se è libero lo spazio per: " + valore(f, "occasione").toLowerCase() + ".");
      if (valore(f, "data")) righe.push("Data: " + dataLeggibile(valore(f, "data")));
      if (valore(f, "fascia")) righe.push("Fascia: " + valore(f, "fascia").toLowerCase());
      if (valore(f, "persone")) righe.push("Persone: circa " + valore(f, "persone"));
      righe.push("Mi dite disponibilità e prezzi? Grazie!");
      return righe.join("\n");
    },
    corso: function (f) {
      var righe = [saluto() + (valore(f, "nome") ? " Sono " + valore(f, "nome") + "." : "")];
      righe.push("Vorrei affittare la sala per: " + (valore(f, "attivita") || "un corso o un’attività").toLowerCase() + ".");
      if (valore(f, "frequenza")) righe.push("Frequenza: " + valore(f, "frequenza").toLowerCase());
      if (valore(f, "momento")) righe.push("Momento preferito: " + valore(f, "momento").toLowerCase());
      if (valore(f, "persone")) righe.push("Partecipanti: circa " + valore(f, "persone"));
      righe.push("Mi dite disponibilità e prezzi? Grazie!");
      return righe.join("\n");
    }
  };
  $$("[data-wa-form]").forEach(function (form) {
    var tipo = form.dataset.waForm;
    var anteprima = $("[data-anteprima]", form);
    var dataInput = form.elements.data;
    if (dataInput) dataInput.min = new Date().toISOString().slice(0, 10);
    var aggiorna = function (e) {
      if (anteprima) anteprima.textContent = componi[tipo](form);
      // tolgo l'errore appena il campo viene compilato
      if (e && e.target.required && e.target.value.trim() !== "") {
        e.target.closest(".campo").classList.remove("non-valido");
        e.target.setAttribute("aria-invalid", "false");
      }
    };
    form.addEventListener("input", aggiorna);
    form.addEventListener("change", aggiorna);
    aggiorna();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var obbligatori = $$("[required]", form), primoErrore = null;
      obbligatori.forEach(function (el) {
        var campo = el.closest(".campo");
        var ok = el.value.trim() !== "";
        campo.classList.toggle("non-valido", !ok);
        el.setAttribute("aria-invalid", String(!ok));
        if (!ok && !primoErrore) primoErrore = el;
      });
      if (primoErrore) { primoErrore.focus(); return; }
      window.open(waUrl(componi[tipo](form)), "_blank", "noopener");
    });
  });

  /* ---------- pulsante WhatsApp fisso: si nasconde quando il form è visibile ---------- */
  var waFisso = $(".wa-fisso"), formContatti = $("[data-wa-form]");
  if (waFisso && formContatti && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      waFisso.classList.toggle("nascosto", entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(formContatti);
  }

  /* ---------- comparsa delle sezioni allo scroll ---------- */
  var animati = $$(".appare, .passo");
  if ("IntersectionObserver" in window && !riduciMovimento) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visibile"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    animati.forEach(function (el) { io.observe(el); });
  } else {
    animati.forEach(function (el) { el.classList.add("visibile"); });
  }
})();
