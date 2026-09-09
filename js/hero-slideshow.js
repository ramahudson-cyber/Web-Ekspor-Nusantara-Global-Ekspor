/* ==========================================================================
   Nusantara Global Export - hero-slideshow.js
   Controller slideshow hero: 6 slide, autoplay 5.5 detik, Ken Burns zoom
   dari CSS. Tanpa dependensi, hormati prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  var INTERVAL_MS = 5500;
  var SWIPE_THRESHOLD = 50;

  function init() {
    var slideshow = document.querySelector(".hero__slideshow");
    var track = document.querySelector(".hero__slideshow-track");
    if (!track || !slideshow) {
      return;
    }

    var slides = track.querySelectorAll(".hero__slide");
    var dots = document.querySelectorAll(".hero__dot");
    if (slides.length < 2) {
      return;
    }

    var current = 0;
    var timer = null;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function goTo(idx) {
      var next = (idx + slides.length) % slides.length;
      if (next === current) {
        return;
      }
      var prev = current;
      current = next;

      slides[prev].classList.remove("is-active");
      slides[prev].setAttribute("aria-hidden", "true");
      if (dots[prev]) {
        dots[prev].classList.remove("is-active");
        dots[prev].setAttribute("aria-selected", "false");
      }

      slides[current].classList.add("is-active");
      slides[current].removeAttribute("aria-hidden");
      if (dots[current]) {
        dots[current].classList.add("is-active");
        dots[current].setAttribute("aria-selected", "true");
      }
    }

    function next() {
      goTo(current + 1);
    }

    function start() {
      if (reduceMotion) {
        return;
      }
      stop();
      timer = window.setInterval(next, INTERVAL_MS);
    }

    function stop() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        start();
      });
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    slideshow.addEventListener("mouseenter", stop);
    slideshow.addEventListener("mouseleave", start);

    slideshow.addEventListener("focusin", stop);
    slideshow.addEventListener("focusout", start);

    var startX = 0;
    slideshow.addEventListener("touchstart", function (event) {
      if (event.touches.length !== 1) {
        return;
      }
      startX = event.touches[0].clientX;
      stop();
    }, { passive: true });

    slideshow.addEventListener("touchend", function (event) {
      var changed = event.changedTouches[0];
      if (!changed) {
        start();
        return;
      }
      var dx = changed.clientX - startX;
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx < 0) {
          next();
        } else {
          goTo(current - 1);
        }
      }
      start();
    }, { passive: true });

    document.addEventListener("keydown", function (event) {
      if (!slideshow.contains(document.activeElement)) {
        return;
      }
      if (event.key === "ArrowRight") {
        next();
        start();
      } else if (event.key === "ArrowLeft") {
        goTo(current - 1);
        start();
      }
    });

    start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
