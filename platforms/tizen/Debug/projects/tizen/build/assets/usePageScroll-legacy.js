System.register(["./jsx-runtime-legacy.js"], function (e, t) {
  var n, r, l;
  return e("t", function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.enableWheel,
      n = void 0 === t || t,
      r = e.onScroll,
      o = (0, l.useRef)(null),
      c = (0, l.useRef)(0),
      i = (0, l.useCallback)(function (e) {
        var t = o.current;
        if (t) {
          var n = window.innerHeight,
            l = Math.max(0, t.scrollHeight - n),
            i = Math.max(0, Math.min(e, l));
          c.current = i, t.style.transform = "translateY(-".concat(i, "px)"), null == r || r(-i);
        }
      }, [r]),
      a = (0, l.useCallback)(function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "center",
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        if (o.current && e) {
          var r = window.innerHeight,
            l = e.getBoundingClientRect(),
            a = c.current;
          if ("start" === t) {
            if (Math.abs(l.top - n) <= 20) return;
            i(l.top + a - n);
          } else {
            if (l.top >= 20 && l.bottom <= r - 20) return;
            i(l.top + a + l.height / 2 - .5 * r);
          }
        }
      }, [i]),
      u = (0, l.useCallback)(function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "center",
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          r = o.current;
        r && a(r.querySelector('[data-section="'.concat(e, '"]')), t, n);
      }, [a]),
      s = (0, l.useCallback)(function () {
        i(0);
      }, [i]);
    return (0, l.useEffect)(function () {
      var e;
      if (n) {
        var t = null === (e = o.current) || void 0 === e ? void 0 : e.parentElement;
        if (t) {
          var r = function (e) {
            e.preventDefault(), i(c.current + e.deltaY);
          };
          return t.addEventListener("wheel", r, {
            passive: !1
          }), function () {
            return t.removeEventListener("wheel", r);
          };
        }
      }
    }, [i, n]), {
      scrollRef: o,
      applyScroll: i,
      scrollToElement: a,
      scrollToSection: u,
      scrollToTop: s,
      currentScrollY: c
    };
  }), {
    setters: [function (e) {
      n = e.$, r = e.Z;
    }],
    execute: function () {
      l = n(r(), 1);
    }
  };
});