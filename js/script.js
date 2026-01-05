(function ($) {
  "use strict";

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($(".preloader").length) {
      $(".preloader").delay(200).fadeOut(500);
    }
  }

  //Update Header Style and Scroll to Top
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

  headerStyle();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header .navigation li.dropdown").append(
      '<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>'
    );

    //Dropdown Button
    $(".main-header .navigation li.dropdown .dropdown-btn").on(
      "click",
      function () {
        $(this).prev("ul").slideToggle(500);
      }
    );

    //Disable dropdown parent link
    //$('.main-header .navigation li.dropdown > a').on('click', function(e) {
    //e.preventDefault();
    //});
  }

  //Search Popup
  if ($("#search-popup").length) {
    //Show Popup
    $(".search-box-btn").on("click", function () {
      $("#search-popup").addClass("popup-visible");
    });
    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        $("#search-popup").removeClass("popup-visible");
      }
    });
    //Hide Popup
    $(".close-search,.search-popup .overlay-layer").on("click", function () {
      $("#search-popup").removeClass("popup-visible");
    });
  }

  //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    $(".mobile-menu .menu-box").mCustomScrollbar();

    var mobileMenuContent = $(
      ".main-header .nav-outer .main-menu .navigation"
    ).html();
    $(".mobile-menu .navigation").append(mobileMenuContent);
    $(".sticky-header .navigation").append(mobileMenuContent);
    $(".mobile-menu .close-btn").on("click", function () {
      $("body").removeClass("mobile-menu-visible");
    });
    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
      $(this).toggleClass("open");
      $(this).prev("ul").slideToggle(500);
    });
    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });
    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        $("body").removeClass("mobile-menu-visible");
      }
    });
    //Menu Toggle Btn
    $(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on(
      "click",
      function () {
        $("body").removeClass("mobile-menu-visible");
      }
    );
  }

  // Main Slider Carousel
  if ($(".banner-carousel").length) {
    $(".banner-carousel").owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      loop: true,
      margin: 0,
      nav: true,
      singleItem: true,
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 6000,
      navText: [
        '<span class="fas fa-angle-left"></span>',
        '<span class="fas fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1024: {
          items: 1,
        },
      },
    });
  }

  // Testimonial Carousel
  if ($(".testimonial-carousel").length) {
    $(".testimonial-carousel").owlCarousel({
      animateOut: "slideOutDown",
      animateIn: "fadeIn",
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoHeight: false,
      autoplay: true,
      autoplayTimeout: 10000,
      navText: [
        '<span class="fa fa-angle-left"></span>',
        '<span class="fa fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });
  }

  window.addEventListener("load", function () {
    setTimeout(function () {
      var p = document.querySelector(".preloader");
      if (p) p.style.display = "none";
    }, 1000);
  });

  //Product Tabs
  if ($(".project-tab").length) {
    $(".project-tab .project-tab-btns .p-tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).hasClass("actve-tab")) {
        return false;
      } else {
        $(".project-tab .project-tab-btns .p-tab-btn").removeClass(
          "active-btn"
        );
        $(this).addClass("active-btn");
        $(".project-tab .p-tabs-content .p-tab").removeClass("active-tab");
        $(target).addClass("active-tab");
      }
    });
  }

  //Product Carousel
  if ($(".project-carousel").length) {
    $(".project-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 5000,
      navText: [
        '<span class="fa fa-angle-left"></span>',
        '<span class="fa fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        800: {
          items: 2,
        },
        1024: {
          items: 3,
        },
        1200: {
          items: 4,
        },
        1400: {
          items: 4,
        },
      },
    });
  }

  // Fonction pour gérer le basculement du popup de recherche
  (function () {
    // 1. Sélection des éléments
    var searchButton = document.querySelector(".search-box-btn");
    var searchPopup = document.getElementById("search-popup-itc");
    var closeButton = document.querySelector(
      "#search-popup-itc .close-search-btn"
    );

    if (searchButton && searchPopup && closeButton) {
      // 2. Ouvrir le popup de recherche au clic sur le bouton de la navigation
      searchButton.addEventListener("click", function () {
        searchPopup.classList.add("visible");
        // Optionnel: Ajouter une classe au body pour bloquer le défilement
        document.body.classList.add("search-active");
      });

      // 3. Fermer le popup de recherche au clic sur le bouton 'X'
      closeButton.addEventListener("click", function () {
        searchPopup.classList.remove("visible");
        document.body.classList.remove("search-active");
      });

      // 4. Fermer le popup de recherche si on clique en dehors du formulaire (sur le fond)
      searchPopup.addEventListener("click", function (e) {
        // Vérifie si l'élément cliqué est bien le conteneur du popup lui-même
        if (e.target === searchPopup) {
          searchPopup.classList.remove("visible");
          document.body.classList.remove("search-active");
        }
      });

      // 5. Fermer le popup de recherche en appuyant sur la touche ESC
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && searchPopup.classList.contains("visible")) {
          searchPopup.classList.remove("visible");
          document.body.classList.remove("search-active");
        }
      });
    }
  })();

  //
  //====================================================================//
  // Sortable Masonary with Filters
  //====================================================================//
  //
  function sortableMasonry() {
    if ($(".sortable-masonry").length) {
      var winDow = $(window);
      // Needed variables
      var $container = $(".sortable-masonry .items-container");
      var $filter = $(".filter-btns");

      $container.isotope({
        filter: "*",
        masonry: {
          columnWidth: ".masonry-item.small-block",
        },
        animationOptions: {
          duration: 500,
          easing: "linear",
        },
      });
      // Isotope Filter
      $filter.find("li").on("click", function () {
        var selector = $(this).attr("data-filter");

        try {
          $container.isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false,
            },
          });
        } catch (err) {}
        return false;
      });

      winDow.on("resize", function () {
        var selector = $filter.find("li.active").attr("data-filter");

        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false,
          },
        });
      });

      var filterItemA = $(".filter-btns li");

      filterItemA.on("click", function () {
        var $this = $(this);
        if (!$this.hasClass("active")) {
          filterItemA.removeClass("active");
          $this.addClass("active");
        }
      });
    }
  }

  sortableMasonry();

  //Masonary
  function enableMasonry() {
    if ($(".masonry-items-container").length) {
      var winDow = $(window);
      // Needed variables
      var $container = $(".masonry-items-container");

      $container.isotope({
        itemSelector: ".masonry-item",
        masonry: {
          columnWidth: ".masonry-item.col-lg-4",
        },
        animationOptions: {
          duration: 500,
          easing: "linear",
        },
      });

      winDow.on("resize", function () {
        $container.isotope({
          itemSelector: ".masonry-item",
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false,
          },
        });
      });
    }
  }

  enableMasonry();

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    // --- ITC backend form handlers (AJAX fallback) ---
    // Intercepts forms that post to /api/newsletter or /api/contact and submits via fetch
    document.addEventListener(
      "submit",
      function (ev) {
        var form = ev.target;
        if (!form || !form.action) return;

        try {
          var url = new URL(form.action, window.location.href);
          // Determine backend base URL:
          // 1) use meta[name=backend-base-url] if present (allows easy per-deploy config)
          // 2) if page served via file:// assume local backend at localhost:3000
          // 3) otherwise use current origin so same-host deployments work without change
          (function () {
            var meta = document.querySelector('meta[name="backend-base-url"]');
            if (meta && meta.content) {
              window._itc_backend_base = meta.content.replace(/\/$/, "");
            } else if (window.location.protocol === "file:") {
              window._itc_backend_base = "http://localhost:3000";
            } else {
              window._itc_backend_base = window.location.origin;
            }
          })();
          var backendBaseUrl = window._itc_backend_base;
          // Only intercept local backend endpoints
          if (url.pathname === "/api/newsletter") {
            ev.preventDefault();
            var formData = new FormData(form);
            var email = formData.get("email");
            if (!email) {
              alert("Veuillez saisir votre adresse email.");
              return;
            }
            fetch(backendBaseUrl + "/api/newsletter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: String(email) }),
            })
              .then(function (r) {
                return r.json();
              })
              .then(function (json) {
                if (json && json.ok) {
                  alert(json.message || "Merci — inscription reçue.");
                  form.reset();
                } else {
                  alert((json && json.error) || "Erreur lors de l'envoi.");
                }
              })
              .catch(function (err) {
                console.error(err);
                alert("Erreur réseau.");
              });
          }

          if (url.pathname === "/api/contact") {
            ev.preventDefault();
            var data = new FormData(form);
            fetch(backendBaseUrl + "/api/contact", {
              method: "POST",
              body: data,
            })
              .then(function (r) {
                return r.json();
              })
              .then(function (json) {
                if (json && json.ok) {
                  alert(json.message || "Message envoyé. Merci.");
                  form.reset();
                } else {
                  alert(
                    (json && json.error) || "Erreur lors de l'envoi du message."
                  );
                }
              })
              .catch(function (err) {
                console.error(err);
                alert("Erreur réseau.");
              });
          }
        } catch (e) {
          // ignore invalid URLs
        }
      },
      false
    );
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate(
            {
              countNum: n,
            },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              },
            }
          );
        }
      },
      { accY: 0 }
    );
  }

  //Tabs Box
  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  //Gallery Filters
  if ($(".filter-list").length) {
    $(".filter-list").mixItUp({});
  }

  //Custom Seclect Box
  if ($(".custom-select-box").length) {
    $(".custom-select-box")
      .selectmenu()
      .selectmenu("menuWidget")
      .addClass("overflow");
  }

  //Jquery Spinner / Quantity Spinner
  if ($(".quantity-spinner").length) {
    $("input.quantity-spinner").TouchSpin({
      verticalbuttons: true,
    });
  }

  //LightBox / Fancybox
  if ($(".lightbox-image").length) {
    $(".lightbox-image").fancybox({
      openEffect: "fade",
      closeEffect: "fade",
      helpers: {
        media: {},
      },
    });
  }

  //Contact Form Validation
  if ($("#contact-form").length) {
    $("#contact-form").validate({
      rules: {
        username: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        subject: {
          required: true,
        },
        message: {
          required: true,
        },
      },
    });
  }

  // Scroll to a Specific Div
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1500
      );
    });
  }

  // Elements Animation
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  /* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

  $(window).on("scroll", function () {
    headerStyle();
  });

  /* ==========================================================================
   When document is loading, do
   ========================================================================== */

  $(window).on("load", function () {
    handlePreloader();
    sortableMasonry();
    enableMasonry();
  });
})(window.jQuery);
