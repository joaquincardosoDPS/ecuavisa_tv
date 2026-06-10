!function () {
  function n(n, r) {
    return function (n) {
      if (Array.isArray(n)) return n;
    }(n) || function (n, e) {
      var r = null == n ? null : "undefined" != typeof Symbol && n[Symbol.iterator] || n["@@iterator"];
      if (null != r) {
        var t,
          i,
          a,
          o,
          l = [],
          u = !0,
          f = !1;
        try {
          if (a = (r = r.call(n)).next, 0 === e) {
            if (Object(r) !== r) return;
            u = !1;
          } else for (; !(u = (t = a.call(r)).done) && (l.push(t.value), l.length !== e); u = !0);
        } catch (n) {
          f = !0, i = n;
        } finally {
          try {
            if (!u && null != r.return && (o = r.return(), Object(o) !== o)) return;
          } finally {
            if (f) throw i;
          }
        }
        return l;
      }
    }(n, r) || function (n, r) {
      if (n) {
        if ("string" == typeof n) return e(n, r);
        var t = {}.toString.call(n).slice(8, -1);
        return "Object" === t && n.constructor && (t = n.constructor.name), "Map" === t || "Set" === t ? Array.from(n) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? e(n, r) : void 0;
      }
    }(n, r) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function e(n, e) {
    (null == e || e > n.length) && (e = n.length);
    for (var r = 0, t = Array(e); r < e; r++) t[r] = n[r];
    return t;
  }
  function r(n) {
    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
      return typeof n;
    } : function (n) {
      return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
    }, r(n);
  }
  function t(n, e) {
    var r = "undefined" != typeof Symbol && n[Symbol.iterator] || n["@@iterator"];
    if (!r) {
      if (Array.isArray(n) || (r = function (n, e) {
        if (n) {
          if ("string" == typeof n) return i(n, e);
          var r = {}.toString.call(n).slice(8, -1);
          return "Object" === r && n.constructor && (r = n.constructor.name), "Map" === r || "Set" === r ? Array.from(n) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? i(n, e) : void 0;
        }
      }(n)) || e && n && "number" == typeof n.length) {
        r && (n = r);
        var t = 0,
          a = function () {};
        return {
          s: a,
          n: function () {
            return t >= n.length ? {
              done: !0
            } : {
              done: !1,
              value: n[t++]
            };
          },
          e: function (n) {
            throw n;
          },
          f: a
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      l = !0,
      u = !1;
    return {
      s: function () {
        r = r.call(n);
      },
      n: function () {
        var n = r.next();
        return l = n.done, n;
      },
      e: function (n) {
        u = !0, o = n;
      },
      f: function () {
        try {
          l || null == r.return || r.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function i(n, e) {
    (null == e || e > n.length) && (e = n.length);
    for (var r = 0, t = Array(e); r < e; r++) t[r] = n[r];
    return t;
  }
  System.register(["./jsx-runtime-legacy.js"], function (e, i) {
    var a, o, l, u, f, c, s;
    function d(n) {
      if (!n) return "";
      if ("string" == typeof n) return n;
      if (Array.isArray(n)) {
        var e,
          i = t(n);
        try {
          for (i.s(); !(e = i.n()).done;) {
            var a = d(e.value);
            if (a) return a;
          }
        } catch (f) {
          i.e(f);
        } finally {
          i.f();
        }
        return "";
      }
      if ("object" === r(n)) {
        var o,
          l = t(["big", "normal", "medium", "default", "small"]);
        try {
          for (l.s(); !(o = l.n()).done;) {
            var u = o.value;
            if (n[u] && "string" == typeof n[u]) return n[u];
          }
        } catch (f) {
          l.e(f);
        } finally {
          l.f();
        }
      }
      return "";
    }
    return e("t", function (e) {
      var i = e.program,
        a = e.imageUrl,
        o = n((0, f.useState)(!1), 2),
        l = o[0],
        u = o[1],
        b = (0, f.useRef)(""),
        m = a || function (n) {
          return n && (d(n.image_land) || d(n.image_slider) || d(n.image_port) || n.image) || "";
        }(i),
        g = function (n) {
          if (!n) return "";
          var e = n.image_logo;
          if (!e) return "";
          var i = function (n) {
            if (!n) return "";
            if ("string" == typeof n) return n;
            for (var e = 0, r = ["big", "medium", "normal", "default", "small"]; e < r.length; e++) {
              var t = r[e];
              if (n[t] && "string" == typeof n[t]) return n[t];
            }
            return "";
          };
          if (Array.isArray(e)) {
            var a,
              o = t(e);
            try {
              for (o.s(); !(a = o.n()).done;) {
                var l = i(a.value);
                if (l) return l;
              }
            } catch (u) {
              o.e(u);
            } finally {
              o.f();
            }
            return "";
          }
          return "object" === r(e) ? i(e) : "string" == typeof e ? e : "";
        }(i);
      return m !== b.current && (b.current = m, l && u(!1)), (0, s.jsxs)("div", {
        className: c.banner,
        children: [m && (0, s.jsx)("img", {
          src: m,
          alt: (null == i ? void 0 : i.title) || "background",
          onLoad: function () {
            return u(!0);
          },
          className: "".concat(c.bannerImage, " ").concat(l ? c.bannerImageVisible : c.bannerImageHidden),
          draggable: !1
        }), (0, s.jsx)("div", {
          className: c.bannerGradient
        }), g && (0, s.jsx)("img", {
          src: g,
          alt: (null == i ? void 0 : i.title) || "logo",
          className: c.bannerLogo,
          draggable: !1
        }), (0, s.jsx)("p", {
          className: c.bannerDescription,
          style: {
            top: g ? "250px" : "200px"
          },
          children: (null == i ? void 0 : i.description_short) || ""
        })]
      });
    }), {
      setters: [function (n) {
        a = n.$, o = n.Z, l = n.t;
      }],
      execute: function () {
        (u = document.createElement("style")).textContent = "._banner_19l52_3{background-color:var(--clr-secondary);will-change:transform;backface-visibility:hidden;border-radius:4.5rem;justify-content:flex-start;align-items:flex-end;width:97%;height:51vh;margin:0;display:flex;position:relative;overflow:hidden;transform:translateZ(0)}._bannerImage_19l52_20{object-fit:cover;border-radius:inherit;pointer-events:none;z-index:1;width:100%;height:100%;transition:opacity .15s ease-in;position:absolute;top:0;left:0}._bannerImageHidden_19l52_33{opacity:0}._bannerImageVisible_19l52_37{opacity:1}._bannerGradient_19l52_42{border-radius:inherit;pointer-events:none;z-index:2;background:linear-gradient(90deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,.4) 50%,transparent 100%);width:100%;height:100%;position:absolute;top:0;left:0}._bannerLogo_19l52_55{object-fit:contain;z-index:3;pointer-events:none;width:auto;height:auto;max-height:200px;position:absolute;top:30px;left:30px}._bannerDescription_19l52_68{z-index:3;color:var(--clr-primary-text);width:35%;margin-top:0;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.8rem;font-weight:400;line-height:1.3;position:absolute;left:30px}\n/*$vite$:1*/", document.head.appendChild(u), f = a(o(), 1), c = {
          banner: "_banner_19l52_3",
          bannerImage: "_bannerImage_19l52_20",
          bannerImageHidden: "_bannerImageHidden_19l52_33",
          bannerImageVisible: "_bannerImageVisible_19l52_37",
          bannerGradient: "_bannerGradient_19l52_42",
          bannerLogo: "_bannerLogo_19l52_55",
          bannerDescription: "_bannerDescription_19l52_68"
        }, s = l();
      }
    };
  });
}();