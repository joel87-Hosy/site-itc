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

  // 4. LOGIQUE DE RECHERCHE INTELLIGENTE (CORRIGÉE)
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

  // SÉCURITÉ : On ne lance l'écouteur que si les éléments existent sur la page
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

    // Fermer les suggestions si on clique ailleurs
    document.addEventListener("click", (e) => {
      if (e.target !== searchInput) suggestionsList.style.display = "none";
    });
  }

  // 5. Gestion du Popup de Recherche (Toggle)
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
      searchPopup.addEventListener("click", function (e) {
        if (e.target === searchPopup) {
          searchPopup.classList.remove("visible");
          document.body.classList.remove("search-active");
        }
      });
    }
  })();

  // 6. Carrousels (Sliders)
  if ($(".banner-carousel").length) {
    $(".banner-carousel").owlCarousel({
      loop: true,
      margin: 0,
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

  if ($(".testimonial-carousel").length) {
    $(".testimonial-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      autoplay: true,
      navText: [
        '<span class="fa fa-angle-left"></span>',
        '<span class="fa fa-angle-right"></span>',
      ],
      responsive: { 0: { items: 1 }, 800: { items: 2 } },
    });
  }

  // 7. Masonry (Filtres Réalisations)
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

  // 8. Animations WOW
  if ($(".wow").length) {
    var wow = new WOW({ mobile: false });
    wow.init();
  }

  // --- Événements Window ---
  $(window).on("scroll", function () {
    headerStyle();
  });

  $(window).on("load", function () {
    handlePreloader();
    sortableMasonry();
  });
})(window.jQuery);
