/**
 * Loads Cubism core first, then glasses-viewer.js (fixes first-visit race).
 */
(function () {
  var MAX_WAIT_MS = 30000;
  var started = Date.now();

  function statusEl() {
    return document.getElementById("glasses-status");
  }

  var initial = statusEl();
  if (initial) initial.textContent = "Loading TomoView…";

  function fail(message) {
    var el = statusEl();
    if (el) {
      el.textContent = message;
      el.classList.add("glasses-status--error");
    }
  }

  function bootViewer() {
    if (!window.Live2DCubismCore) {
      if (Date.now() - started > MAX_WAIT_MS) {
        fail("Engine did not load. Refresh to try again.");
        return;
      }
      setTimeout(bootViewer, 50);
      return;
    }

    import("/glasses-viewer.js").catch(function (err) {
      fail((err && err.message) || "Viewer failed to load");
    });
  }

  if (window.Live2DCubismCore) {
    bootViewer();
    return;
  }

  var script = document.createElement("script");
  script.src = "/live2dcubismcore.min.js";
  script.async = false;
  script.onload = bootViewer;
  script.onerror = function () {
    fail("Engine failed to load");
  };
  (document.head || document.documentElement).appendChild(script);
})();
