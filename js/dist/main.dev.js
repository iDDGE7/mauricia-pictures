"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jQuery(document).ready(function () {
  jQuery(window).scroll(function () {
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    animationSections(scrollY);
    animationClients(scrollY);
  });
});

function animationSections(scrollY) {
  var sections = jQuery(".container-section");

  if (sections.length > 0) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = sections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var section = _step.value;
        var currentSection = jQuery(section); // La seccion esta enfocada para mover los objetos

        var isScrollOnsection = scrollY >= currentSection.offset().top - window.innerHeight * 0.5 && scrollY <= currentSection.offset().top + window.innerHeight * 0.2;

        if (isScrollOnsection) {
          var translateStyle = "translate(0,".concat((scrollY - currentSection.offset().top) * -0.2, "px)");
          currentSection.find(".object-to-move").css({
            transform: translateStyle
          });
        } // La seccion esta enfocada para mover los hacer efecto scale


        var isScrollToScale = scrollY >= currentSection.offset().top - window.innerHeight * 0.4 && scrollY <= currentSection.offset().top + window.innerHeight * 0.4;

        if (isScrollToScale) {
          currentSection.css({
            transform: "scale(1)"
          });
        } else {
          currentSection.css({
            transform: "scale(0.9)"
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}

function animationClients(scrollY) {
  var containerClients = jQuery("#clients");
  var contentDataClients = jQuery("#contentDataClients");
  var titleClients = jQuery("#titleClients");

  if (containerClients.length > 0) {
    if (scrollY >= containerClients.offset().top - window.innerHeight * 0.5 && scrollY <= containerClients.offset().top + containerClients.innerHeight() - containerClients.innerHeight() * 0.1) {
      titleClients.css({
        transform: "translateY(0%)"
      });
      contentDataClients.css({
        opacity: "1"
      });
    } else {
      titleClients.css({
        transform: "translateY(100%)"
      });
      contentDataClients.css({
        opacity: "0"
      });
    }
  }
}

tailwind.config = {
  theme: {
    extend: _defineProperty({
      colors: {
        slateGray: "#617a99",
        indigo: "#274060",
        dark: "#353535",
        light: "#ffffff",
        lightSilver: "#d2d7df",
        burlywood: "#deb597",
        crimson: "#e31634",
        maximumGreen: "#638537",
        darkTransparent: "rgba(0, 0, 0, 0.50)"
      },
      backgroundImage: {
        gradientBlueLight: "linear-gradient(180deg, #DBE8EE 0%, rgba(219, 232, 238, 0) 77.08%)"
      },
      letterSpacing: {
        heroTitle: "0.5em"
      },
      boxShadow: {
        shadowLeft: "10px 10px 50px rgba(0, 0, 0, 0.5)",
        shadowFooter: "0px -4px 50px rgba(0, 0, 0, 0.2)"
      }
    }, "backgroundImage", {
      footerBG: " url(https://mauriciapictures.com/wp-content/uploads/2019/12/footer-image.png)"
    }),
    gridTemplateColumns: {
      mainSection: "3fr 4fr",
      customSection: "1fr 1fr",
      footerLayout: "400px 1fr",
      footerContent: "2fr 1fr 1fr"
    }
  }
};