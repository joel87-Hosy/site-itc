(function ($) {
  "use strict";

  // 1. Masquer le Preloader
  function handlePreloader() {
    if ($(".preloader").length) {
      $(".preloader").delay(200).fadeOut(500);
    }
  }

  // 2. Gestion du Header Fixe et Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $(".main-header");
      var HeaderHeight = $(".main-header").height();
      var scrollLink = $(".scroll-to-top");
      if (windowpos > HeaderHeight) {
        siteHeader.addClass("fixed-header");
        scrollLink.fadeIn(300);
      } else {
        siteHeader.removeClass("fixed-header");
        scrollLink.fadeOut(300);
      }
    }
  }

  // 3. Menu Mobile et Dropdowns
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header .navigation li.dropdown").append(
      '<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>',
    );
    $(".main-header .navigation li.dropdown .dropdown-btn").on(
      "click",
      function () {
        $(this).prev("ul").slideToggle(500);
      },
    );
  }

  if ($(".mobile-menu").length) {
    var mobileMenuContent = $(
      ".main-header .nav-outer .main-menu .navigation",
    ).html();
    $(".mobile-menu .navigation").append(mobileMenuContent);
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });
    $(".mobile-menu .close-btn, .mobile-menu .menu-backdrop").on(
      "click",
      function () {
        $("body").removeClass("mobile-menu-visible");
      },
    );
    $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
      $(this).toggleClass("open");
      $(this).prev("ul").slideToggle(500);
    });
  }

  // 4. LOGIQUE DE RECHERCHE INTELLIGENTE
  const servicesITC = [
    { name: "Fibre Optique", url: "residental-interior.html" },
    { name: "Déploiement Réseau", url: "deplacement-reseau.html" },
    { name: "Maintenance Informatique", url: "office-interior.html" },
    { name: "Étude et Audit", url: "etude.html" },
    { name: "Installation Télécom", url: "service-installation.html" },
    { name: "Contact & Devis", url: "contact.html" },
  ];

  const searchInput = document.getElementById("search-input");
  const suggestionsList = document.getElementById("search-suggestions");

  if (searchInput && suggestionsList) {
    searchInput.addEventListener("input", function () {
      const val = this.value.toLowerCase().trim();
      suggestionsList.innerHTML = "";
      if (val.length < 2) {
        suggestionsList.style.display = "none";
        return;
      }
      const matches = servicesITC.filter((s) =>
        s.name.toLowerCase().includes(val),
      );
      if (matches.length > 0) {
        matches.forEach((match) => {
          const div = document.createElement("div");
          div.classList.add("suggestion-item");
          div.textContent = match.name;
          div.onclick = () => (window.location.href = match.url);
          suggestionsList.appendChild(div);
        });
        suggestionsList.style.display = "block";
      } else {
        suggestionsList.style.display = "none";
      }
    });
    document.addEventListener("click", (e) => {
      if (e.target !== searchInput) suggestionsList.style.display = "none";
    });
  }

  // 5. Gestion du Popup de Recherche
  (function () {
    var searchButton = document.querySelector(".search-box-btn");
    var searchPopup = document.getElementById("search-popup-itc");
    var closeButton = document.querySelector(
      "#search-popup-itc .close-search-btn",
    );
    if (searchButton && searchPopup && closeButton) {
      searchButton.addEventListener("click", function () {
        searchPopup.classList.add("visible");
        document.body.classList.add("search-active");
      });
      closeButton.addEventListener("click", function () {
        searchPopup.classList.remove("visible");
        document.body.classList.remove("search-active");
      });
    }
  })();

  // 6. --- GESTION UNIFIÉE DES FORMULAIRES (NEWSLETTER & CONTACT) ---

  // Formulaire Newsletter
  $(document).on("submit", "#itc-newsletter-form", async function (e) {
    e.preventDefault();
    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const email = $form.find('input[name="email"]').val();
    const originalText = $submitBtn.html();
    $submitBtn.html("<span>...</span>").prop("disabled", true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("✅ Succès : " + (result.message || "Vous êtes abonné !"));
        $form[0].reset();
      } else {
        alert("❌ Erreur : " + (result.error || "Échec de l'abonnement."));
      }
    } catch (error) {
      alert("❌ Le serveur ne répond pas.");
    } finally {
      $submitBtn.html(originalText).prop("disabled", false);
    }
  });

  // Formulaire de Contact
  $(document).on("submit", "#contact-form", async function (e) {
    e.preventDefault();
    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const formData = new FormData($form[0]);
    const originalText = $submitBtn.html();
    $submitBtn.html("<span>Envoi en cours...</span>").prop("disabled", true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert("✅ Message envoyé avec succès à l'équipe ITC !");
        $form[0].reset();
      } else {
        alert("❌ Erreur : " + (result.error || "Échec de l'envoi."));
      }
    } catch (error) {
      alert("❌ Impossible de contacter le serveur.");
    } finally {
      $submitBtn.html(originalText).prop("disabled", false);
    }
  });

  // 7. Carrousels & Sliders
  if ($(".banner-carousel").length) {
    $(".banner-carousel").owlCarousel({
      loop: true,
      nav: true,
      smartSpeed: 500,
      autoplay: true,
      navText: [
        '<span class="fas fa-angle-left"></span>',
        '<span class="fas fa-angle-right"></span>',
      ],
      responsive: { 0: { items: 1 }, 1024: { items: 1 } },
    });
  }

  // 8. Masonry & WOW
  function sortableMasonry() {
    if ($(".sortable-masonry").length) {
      var $container = $(".sortable-masonry .items-container");
      $container.isotope({ filter: "*" });
      $(".filter-btns li").on("click", function () {
        var selector = $(this).attr("data-filter");
        $container.isotope({ filter: selector });
        $(".filter-btns li").removeClass("active");
        $(this).addClass("active");
      });
    }
  }

  if ($(".wow").length) {
    new WOW({ mobile: false }).init();
  }

  $(window).on("scroll", headerStyle);
  $(window).on("load", function () {
    handlePreloader();
    sortableMasonry();
  });
})(window.jQuery);
