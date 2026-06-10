System.register(["./jsx-runtime-legacy.js"], function (t, e) {
  var r, a, n;
  return t({
    n: function () {
      var t = (0, n.useRef)(null);
      return {
        trackRef: t,
        scrollToCard: (0, n.useCallback)(function (e) {
          var r = t.current;
          if (r) {
            var a = r.parentElement;
            if (a) {
              var n = r.querySelector('[data-focuskey="'.concat(e, '"]'));
              if (n) {
                var o = a.offsetWidth,
                  c = n.offsetLeft - o / 2 + n.offsetWidth / 2,
                  l = r.scrollWidth - o,
                  i = Math.max(0, Math.min(c, l));
                r.style.transform = "translateX(-".concat(i, "px)");
              }
            }
          }
        }, [])
      };
    },
    t: function (t) {
      var e,
        r = !(null === (e = t.live_associated) || void 0 === e || !e.key);
      return t.is_unlocked ? r ? {
        label: "En vivo",
        colorVar: "--foc-primary"
      } : null : {
        label: "Próximamente",
        colorVar: "--foc-tertiary"
      };
    }
  }), {
    setters: [function (t) {
      r = t.$, a = t.Z;
    }],
    execute: function () {
      n = r(a(), 1);
    }
  };
});