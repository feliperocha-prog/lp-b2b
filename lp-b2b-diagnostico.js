(function () {
  var sid = "-demo";

  function loadForm() {
    if (typeof hbspt === "undefined") {
      setTimeout(loadForm, 300);
      return;
    }
    hbspt.forms.create({
      region: "na1",
      portalId: "21708321",
      formId: "53602944-9ccd-46d1-a843-b1845d6a8d76",
      target: "#lp" + sid + "-hsform",
      onFormReady: function (form) {
        ["h1", "h2", "h3", "img", ".hs-richtext", ".hs-form-logo"].forEach(function (sel) {
          form.querySelectorAll(sel).forEach(function (el) {
            el.style.display = "none";
          });
        });
      },
      onFormSubmitted: function () {
        if (typeof fbq === "function") fbq("track", "Lead", { value: 2500, currency: "BRL" });
        var card = document.querySelector("#lp" + sid + "-hsform").closest(".fcard");
        if (card)
          card.innerHTML =
            '<div style="text-align:center;padding:52px 24px"><div style="font-size:2.8rem;margin-bottom:16px">✓</div><h3 style="font-size:1.3rem;font-weight:800;color:#1a1a1a;margin-bottom:12px">Orçamento solicitado!</h3><p style="color:#666;font-size:0.92rem">Nossa equipe entra em contato em até <strong>24h úteis</strong> com uma proposta personalizada.</p></div>';
      },
    });
  }

  function loadHS() {
    if (document.getElementById("hs-forms-v2")) {
      loadForm();
      return;
    }
    var s = document.createElement("script");
    s.id = "hs-forms-v2";
    s.src = "https://js.hsforms.net/forms/embed/v2.js";
    s.onload = loadForm;
    document.head.appendChild(s);
  }

  function initFAQ() {
    document.querySelectorAll(".lp-demo .faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      if (!q) return;
      q.addEventListener("click", function () {
        var wasOpen = item.classList.contains("open");
        document.querySelectorAll(".lp-demo .faq-item").forEach(function (i) {
          i.classList.remove("open");
          var btn = i.querySelector(".faq-q");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("open");
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initSlots() {
    var el = document.getElementById("lp" + sid + "-slots");
    if (el) el.textContent = Math.floor(Math.random() * 4 + 3) + " vagas";
  }

  function initScroll() {
    document.querySelectorAll('.lp-demo a[href="#formulario"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var t = document.getElementById("formulario");
        if (t) t.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initScrollAnimation() {
    var elements = document.querySelectorAll(".scroll-animate");
    if (!elements.length) return;
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach(function (el) { observer.observe(el); });
  }

  function init() {
    loadHS();
    initFAQ();
    initSlots();
    initScroll();
    initScrollAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
