/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 771:
/***/ (function() {

document.addEventListener('DOMContentLoaded', () => {
  const playPauseButton = document.getElementById('play-pause');
  const progressSlider = document.getElementById('progress');
  const closeButton = document.getElementById('close');
  const playIcon = playPauseButton.querySelector('.cta__icon--play');
  const pauseIcon = playPauseButton.querySelector('.cta__icon--pause');
  const audioPlayer = document.getElementById('audio-player');
  const progressFill = document.querySelector('.progress-fill');
  const audioTitle = document.querySelector('.audio-player__title');
  const audioDetails = document.querySelector('.audio-player__details');
  let audio = null;
  let isPlaying = false;
  const createAudioElement = src => {
    if (audio) {
      audio.pause();
      audio.remove();
    }
    audio = document.createElement('audio');
    audio.src = src;
    audio.preload = 'auto';
    audioPlayer.appendChild(audio);
    audio.addEventListener('play', () => {
      isPlaying = true;
      playIcon.classList.add('d-none');
      pauseIcon.classList.remove('d-none');
    });
    audio.addEventListener('pause', () => {
      isPlaying = false;
      playIcon.classList.remove('d-none');
      pauseIcon.classList.add('d-none');
    });
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const progress = audio.currentTime / audio.duration * 100;
        progressSlider.value = progress;
        progressFill.style.width = `${progress}%`;
      }
    });
    progressSlider.addEventListener('input', e => {
      if (audio.duration) {
        const seekTime = e.target.value / 100 * audio.duration;
        audio.currentTime = seekTime;
      }
    });
    audio.addEventListener('loadeddata', () => {
      console.log('Audio loaded:', audio.src);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    });
    audio.addEventListener('error', e => {
      console.error('Audio error:', e);
      console.error('Audio source:', audio.src);
      audioPlayer.classList.remove('show');
    });
  };
  playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  });
  closeButton.addEventListener('click', () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    audioPlayer.classList.remove('show');
  });
  function handlePlayEvent(element) {
    const audioSrc = element.getAttribute('data-audio-src');
    const title = element.getAttribute('data-title');
    const details = element.getAttribute('data-details');
    if (audioSrc) {
      console.log('Setting audio source to:', audioSrc);
      createAudioElement(audioSrc);
      audioTitle.textContent = title;
      audioDetails.textContent = details;
      audioPlayer.classList.add('show');
      playPauseButton.focus();
    } else {
      console.error('No audio source found for this button.');
    }
  }

  // Function to find the closest ancestor with the 'btn-play' class
  function findAncestorWithClass(element, className) {
    while (element && !element.classList.contains(className)) {
      console.log('element', element);
      element = element.parentElement;
    }
    return element;
  }

  // click listener for the featured section (loaded at page load)
  document.querySelector('.featured-episode').addEventListener('click', function (e) {
    console.log('CLICKED', e.target);

    // Find the closest ancestor with the 'btn-play' class
    const btnPlayElement = findAncestorWithClass(e.target, 'btn-play');
    if (btnPlayElement && btnPlayElement.closest('.featured-episode')) {
      console.log('Featured Episode button clicked : ', btnPlayElement);
      handlePlayEvent(btnPlayElement);
    }
    e.stopImmediatePropagation();
  });

  // click listener for sections that are loaded dynamically
  // move the click listner to the container, not to individual epiosde card to avoid multiple event listeners
  document.getElementById('episodes_cards').addEventListener('click', function (e) {
    console.log('CLICKED', e.target);

    // Find the closest ancestor with the 'btn-play' class
    const btnPlayElement = findAncestorWithClass(e.target, 'btn-play');
    if (btnPlayElement) {
      console.log('Dynamic Button clicked : ', btnPlayElement);
      handlePlayEvent(btnPlayElement);
    }
    e.stopImmediatePropagation();
  });
});

/***/ }),

/***/ 445:
/***/ (function() {

(() => {
  'use strict';

  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = theme => localStorage.setItem('theme', theme);
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };
  const showActiveTheme = (theme, focus = false) => {
    const themeToggle = document.querySelector('#theme-toggle');
    if (!themeToggle) {
      return;
    }
    themeToggle.checked = theme === 'dark';
    if (focus) {
      themeToggle.focus();
    }
  };
  setTheme(getPreferredTheme());
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme());
    }
  });
  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme());
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const theme = themeToggle.checked ? 'dark' : 'light';
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    }
  });
})();

/***/ }),

/***/ 263:
/***/ (function() {

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
/*jslint browser: true */
/*global XDomainRequest, MutationObserver, window */
(function () {
    "use strict";
    if (typeof window !== "undefined" && window.addEventListener) {
        var cache = Object.create(null); // holds xhr objects to prevent multiple requests
        var checkUseElems;
        var tid; // timeout id
        var debouncedCheck = function () {
            clearTimeout(tid);
            tid = setTimeout(checkUseElems, 100);
        };
        var unobserveChanges = function () {
            return;
        };
        var observeChanges = function () {
            var observer;
            window.addEventListener("resize", debouncedCheck, false);
            window.addEventListener("orientationchange", debouncedCheck, false);
            if (window.MutationObserver) {
                observer = new MutationObserver(debouncedCheck);
                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
                unobserveChanges = function () {
                    try {
                        observer.disconnect();
                        window.removeEventListener("resize", debouncedCheck, false);
                        window.removeEventListener("orientationchange", debouncedCheck, false);
                    } catch (ignore) {}
                };
            } else {
                document.documentElement.addEventListener("DOMSubtreeModified", debouncedCheck, false);
                unobserveChanges = function () {
                    document.documentElement.removeEventListener("DOMSubtreeModified", debouncedCheck, false);
                    window.removeEventListener("resize", debouncedCheck, false);
                    window.removeEventListener("orientationchange", debouncedCheck, false);
                };
            }
        };
        var createRequest = function (url) {
            // In IE 9, cross origin requests can only be sent using XDomainRequest.
            // XDomainRequest would fail if CORS headers are not set.
            // Therefore, XDomainRequest should only be used with cross origin requests.
            function getOrigin(loc) {
                var a;
                if (loc.protocol !== undefined) {
                    a = loc;
                } else {
                    a = document.createElement("a");
                    a.href = loc;
                }
                return a.protocol.replace(/:/g, "") + a.host;
            }
            var Request;
            var origin;
            var origin2;
            if (window.XMLHttpRequest) {
                Request = new XMLHttpRequest();
                origin = getOrigin(location);
                origin2 = getOrigin(url);
                if (Request.withCredentials === undefined && origin2 !== "" && origin2 !== origin) {
                    Request = XDomainRequest || undefined;
                } else {
                    Request = XMLHttpRequest;
                }
            }
            return Request;
        };
        var xlinkNS = "http://www.w3.org/1999/xlink";
        checkUseElems = function () {
            var base;
            var bcr;
            var fallback = ""; // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
            var hash;
            var href;
            var i;
            var inProgressCount = 0;
            var isHidden;
            var Request;
            var url;
            var uses;
            var xhr;
            function observeIfDone() {
                // If done with making changes, start watching for chagnes in DOM again
                inProgressCount -= 1;
                if (inProgressCount === 0) { // if all xhrs were resolved
                    unobserveChanges(); // make sure to remove old handlers
                    observeChanges(); // watch for changes to DOM
                }
            }
            function attrUpdateFunc(spec) {
                return function () {
                    if (cache[spec.base] !== true) {
                        spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);
                        if (spec.useEl.hasAttribute("href")) {
                            spec.useEl.setAttribute("href", "#" + spec.hash);
                        }
                    }
                };
            }
            function onloadFunc(xhr) {
                return function () {
                    var body = document.body;
                    var x = document.createElement("x");
                    var svg;
                    xhr.onload = null;
                    x.innerHTML = xhr.responseText;
                    svg = x.getElementsByTagName("svg")[0];
                    if (svg) {
                        svg.setAttribute("aria-hidden", "true");
                        svg.style.position = "absolute";
                        svg.style.width = 0;
                        svg.style.height = 0;
                        svg.style.overflow = "hidden";
                        body.insertBefore(svg, body.firstChild);
                    }
                    observeIfDone();
                };
            }
            function onErrorTimeout(xhr) {
                return function () {
                    xhr.onerror = null;
                    xhr.ontimeout = null;
                    observeIfDone();
                };
            }
            unobserveChanges(); // stop watching for changes to DOM
            // find all use elements
            uses = document.getElementsByTagName("use");
            for (i = 0; i < uses.length; i += 1) {
                try {
                    bcr = uses[i].getBoundingClientRect();
                } catch (ignore) {
                    // failed to get bounding rectangle of the use element
                    bcr = false;
                }
                href = uses[i].getAttribute("href")
                        || uses[i].getAttributeNS(xlinkNS, "href")
                        || uses[i].getAttribute("xlink:href");
                if (href && href.split) {
                    url = href.split("#");
                } else {
                    url = ["", ""];
                }
                base = url[0];
                hash = url[1];
                isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
                if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
                    // the use element is empty
                    // if there is a reference to an external SVG, try to fetch it
                    // use the optional fallback URL if there is no reference to an external SVG
                    if (fallback && !base.length && hash && !document.getElementById(hash)) {
                        base = fallback;
                    }
                    if (uses[i].hasAttribute("href")) {
                        uses[i].setAttributeNS(xlinkNS, "xlink:href", href);
                    }
                    if (base.length) {
                        // schedule updating xlink:href
                        xhr = cache[base];
                        if (xhr !== true) {
                            // true signifies that prepending the SVG was not required
                            setTimeout(attrUpdateFunc({
                                useEl: uses[i],
                                base: base,
                                hash: hash
                            }), 0);
                        }
                        if (xhr === undefined) {
                            Request = createRequest(base);
                            if (Request !== undefined) {
                                xhr = new Request();
                                cache[base] = xhr;
                                xhr.onload = onloadFunc(xhr);
                                xhr.onerror = onErrorTimeout(xhr);
                                xhr.ontimeout = onErrorTimeout(xhr);
                                xhr.open("GET", base);
                                xhr.send();
                                inProgressCount += 1;
                            }
                        }
                    }
                } else {
                    if (!isHidden) {
                        if (cache[base] === undefined) {
                            // remember this URL if the use element was not empty and no request was sent
                            cache[base] = true;
                        } else if (cache[base].onload) {
                            // if it turns out that prepending the SVG is not necessary,
                            // abort the in-progress xhr.
                            cache[base].abort();
                            delete cache[base].onload;
                            cache[base] = true;
                        }
                    } else if (base.length && cache[base]) {
                        setTimeout(attrUpdateFunc({
                            useEl: uses[i],
                            base: base,
                            hash: hash
                        }), 0);
                    }
                }
            }
            uses = "";
            inProgressCount += 1;
            observeIfDone();
        };
        var winLoad;
        winLoad = function () {
            window.removeEventListener("load", winLoad, false); // to prevent memory leaks
            tid = setTimeout(checkUseElems, 0);
        };
        if (document.readyState !== "complete") {
            // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
            window.addEventListener("load", winLoad, false);
        } else {
            // No need to add a listener if the document is already loaded, initialize immediately.
            winLoad();
        }
    }
}());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/* harmony import */ var _themeToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(445);
/* harmony import */ var _themeToggle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_themeToggle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _audioPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(771);
/* harmony import */ var _audioPlayer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_audioPlayer__WEBPACK_IMPORTED_MODULE_1__);



__webpack_require__(263);
}();
/******/ })()
;