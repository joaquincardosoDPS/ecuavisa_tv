!function () {
  function r() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var t,
      n,
      o = "function" == typeof Symbol ? Symbol : {},
      a = o.iterator || "@@iterator",
      i = o.toStringTag || "@@toStringTag";
    function c(r, o, a, i) {
      var c = o && o.prototype instanceof s ? o : s,
        d = Object.create(c.prototype);
      return e(d, "_invoke", function (r, e, o) {
        var a,
          i,
          c,
          s = 0,
          d = o || [],
          f = !1,
          u = {
            p: 0,
            n: 0,
            v: t,
            a: g,
            f: g.bind(t, 4),
            d: function (r, e) {
              return a = r, i = 0, c = t, u.n = e, l;
            }
          };
        function g(r, e) {
          for (i = r, c = e, n = 0; !f && s && !o && n < d.length; n++) {
            var o,
              a = d[n],
              g = u.p,
              m = a[2];
            r > 3 ? (o = m === e) && (c = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = t) : a[0] <= g && ((o = r < 2 && g < a[1]) ? (i = 0, u.v = e, u.n = a[1]) : g < m && (o = r < 3 || a[0] > e || e > m) && (a[4] = r, a[5] = e, u.n = m, i = 0));
          }
          if (o || r > 1) return l;
          throw f = !0, e;
        }
        return function (o, d, m) {
          if (s > 1) throw TypeError("Generator is already running");
          for (f && 1 === d && g(d, m), i = d, c = m; (n = i < 2 ? t : c) || !f;) {
            a || (i ? i < 3 ? (i > 1 && (u.n = -1), g(i, c)) : u.n = c : u.v = c);
            try {
              if (s = 2, a) {
                if (i || (o = "next"), n = a[o]) {
                  if (!(n = n.call(a, c))) throw TypeError("iterator result is not an object");
                  if (!n.done) return n;
                  c = n.value, i < 2 && (i = 0);
                } else 1 === i && (n = a.return) && n.call(a), i < 2 && (c = TypeError("The iterator does not provide a '" + o + "' method"), i = 1);
                a = t;
              } else if ((n = (f = u.n < 0) ? c : r.call(e, u)) !== l) break;
            } catch (n) {
              a = t, i = 1, c = n;
            } finally {
              s = 1;
            }
          }
          return {
            value: n,
            done: f
          };
        };
      }(r, a, i), !0), d;
    }
    var l = {};
    function s() {}
    function d() {}
    function f() {}
    n = Object.getPrototypeOf;
    var u = [][a] ? n(n([][a]())) : (e(n = {}, a, function () {
        return this;
      }), n),
      g = f.prototype = s.prototype = Object.create(u);
    function m(r) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(r, f) : (r.__proto__ = f, e(r, i, "GeneratorFunction")), r.prototype = Object.create(g), r;
    }
    return d.prototype = f, e(g, "constructor", f), e(f, "constructor", d), d.displayName = "GeneratorFunction", e(f, i, "GeneratorFunction"), e(g), e(g, i, "Generator"), e(g, a, function () {
      return this;
    }), e(g, "toString", function () {
      return "[object Generator]";
    }), (r = function () {
      return {
        w: c,
        m: m
      };
    })();
  }
  function e(r, t, n, o) {
    var a = Object.defineProperty;
    try {
      a({}, "", {});
    } catch (r) {
      a = 0;
    }
    e = function (r, t, n, o) {
      function i(t, n) {
        e(r, t, function (r) {
          return this._invoke(t, n, r);
        });
      }
      t ? a ? a(r, t, {
        value: n,
        enumerable: !o,
        configurable: !o,
        writable: !o
      }) : r[t] = n : (i("next", 0), i("throw", 1), i("return", 2));
    }, e(r, t, n, o);
  }
  function t(r, e, t, n, o, a, i) {
    try {
      var c = r[a](i),
        l = c.value;
    } catch (r) {
      return void t(r);
    }
    c.done ? e(l) : Promise.resolve(l).then(n, o);
  }
  function n(r, e) {
    return function (r) {
      if (Array.isArray(r)) return r;
    }(r) || function (r, e) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var n,
          o,
          a,
          i,
          c = [],
          l = !0,
          s = !1;
        try {
          if (a = (t = t.call(r)).next, 0 === e) {
            if (Object(t) !== t) return;
            l = !1;
          } else for (; !(l = (n = a.call(t)).done) && (c.push(n.value), c.length !== e); l = !0);
        } catch (r) {
          s = !0, o = r;
        } finally {
          try {
            if (!l && null != t.return && (i = t.return(), Object(i) !== i)) return;
          } finally {
            if (s) throw o;
          }
        }
        return c;
      }
    }(r, e) || function (r, e) {
      if (r) {
        if ("string" == typeof r) return o(r, e);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? o(r, e) : void 0;
      }
    }(r, e) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function o(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function a(r) {
    return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (r) {
      return typeof r;
    } : function (r) {
      return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, a(r);
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./useFetchPaginated-legacy.js", "./catalogService-legacy.js", "./SelectBanner-legacy.js"], function (e, o) {
    var i, c, l, s, d, f, u, g, m, _, y, p, h, b, v, x, z, j;
    function k(r) {
      var e = r,
        t = function (r) {
          if (!r) return "";
          if ("string" == typeof r) return r;
          if (Array.isArray(r) && r.length > 0) {
            var e = r[0];
            if ("string" == typeof e) return e;
            if ("object" === a(e)) return e.big || e.normal || e.medium || e.default || e.small || "";
          }
          return "object" === a(r) && (r.big || r.normal || r.medium || r.default || r.small) || "";
        };
      return t(e.image_background) || t(e.image_slider) || t(e.image_land) || e.image || "";
    }
    function T() {
      var e,
        o = d().slug,
        a = n((0, v.useState)((null === (e = c().state) || void 0 === e ? void 0 : e.title) || ""), 2),
        i = a[0],
        l = a[1],
        s = n((0, v.useState)(null), 2),
        f = s[0],
        u = s[1],
        g = n((0, v.useState)(""), 2),
        m = g[0],
        _ = g[1],
        h = y(function () {
          var e,
            n = (e = r().m(function e(t, n) {
              var a, c;
              return r().w(function (r) {
                for (;;) switch (r.n) {
                  case 0:
                    return r.n = 1, p.searchPrograms({
                      category: o,
                      limit: n,
                      page: t
                    });
                  case 1:
                    return a = r.v, 1 === t && ((c = a.data || []).length > 0 && !i && l(c[0].name_category || o), c.length > 0 && (u(c[0]), _(k(c[0])))), r.a(2, a);
                }
              }, e);
            }), function () {
              var r = this,
                n = arguments;
              return new Promise(function (o, a) {
                var i = e.apply(r, n);
                function c(r) {
                  t(i, o, a, c, l, "next", r);
                }
                function l(r) {
                  t(i, o, a, c, l, "throw", r);
                }
                c(void 0);
              });
            });
          return function (r, e) {
            return n.apply(this, arguments);
          };
        }(), [o], {
          limit: x,
          enabled: !!o,
          hasMoreStrategy: "last_page"
        }),
        b = h.data,
        z = h.isLoading,
        j = h.isLoadingMore,
        T = h.isError,
        w = h.hasMore,
        S = h.loadMore;
      return {
        slug: o,
        categoryTitle: i,
        programs: b,
        isLoading: z,
        isLoadingMore: j,
        isError: T,
        hasMore: w,
        loadMore: S,
        selectedProgram: f,
        bannerImageUrl: m,
        setActiveBannerProgram: (0, v.useCallback)(function (r) {
          u(r), _(k(r));
        }, [])
      };
    }
    function w(r) {
      var e = r.program,
        t = r.focusKey,
        n = r.isFirstRow,
        o = r.onProgramFocus,
        i = r.onPress,
        c = function (r) {
          return (r.image_land && "object" === a(r.image_land) && !Array.isArray(r.image_land) ? r.image_land.small || r.image_land.normal || r.image_land.big || r.image_land.default : "") || r.image || "";
        }(e),
        l = function () {
          null == i || i(e);
        },
        s = g({
          focusKey: t,
          onEnterPress: l,
          onFocus: function () {
            null == o || o(e);
            var r = d.current;
            if (r) {
              var t = r.closest('[class*="container"]'),
                a = document.querySelector('[class*="stickyBanner"]');
              if (n) t && (t.scrollTop = 0);else if (t && a) {
                var i = a.getBoundingClientRect().height,
                  c = r.getBoundingClientRect(),
                  l = t.getBoundingClientRect(),
                  s = i + 10,
                  f = c.top - l.top - s;
                Math.abs(f) > 20 && (t.scrollTop += f);
              }
            }
          }
        }),
        d = s.ref,
        u = s.focused,
        m = [z.card, u && z.focused].filter(Boolean).join(" ");
      return (0, j.jsx)("div", {
        className: z.cardWrapper,
        children: (0, j.jsx)("div", {
          ref: d,
          className: m,
          "data-focuskey": t,
          onClick: l,
          onMouseEnter: function () {
            f(t), null == o || o(e);
          },
          children: c ? (0, j.jsx)("img", {
            src: c,
            alt: e.title,
            className: z.cardImage,
            draggable: !1,
            decoding: "async"
          }) : (0, j.jsx)("div", {
            className: z.cardFallback,
            children: (0, j.jsx)("span", {
              className: z.cardFallbackText,
              children: e.title
            })
          })
        })
      });
    }
    return e("default", function () {
      var r,
        e = T(),
        t = e.slug,
        n = e.categoryTitle,
        o = e.programs,
        a = e.isLoading,
        i = e.isLoadingMore,
        c = e.isError,
        d = e.hasMore,
        u = e.loadMore,
        m = e.selectedProgram,
        y = e.bannerImageUrl,
        p = e.setActiveBannerProgram,
        b = (r = s(), {
          goToProgram: function (e) {
            r("/programas/".concat(e.key), {
              state: {
                program: e
              }
            });
          }
        }).goToProgram,
        x = g({
          focusKey: "CATEGORY",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        k = x.ref,
        S = x.focusKey;
      (0, v.useEffect)(function () {
        !a && o.length > 0 && setTimeout(function () {
          return f("CAT-GRID-0");
        }, 150);
      }, [a, o.length]);
      var P = (0, v.useCallback)(function (r) {
        var e = r.currentTarget;
        e.scrollHeight - e.scrollTop - e.clientHeight < 300 && d && !i && u();
      }, [d, i, u]);
      return a ? (0, j.jsx)(_, {}) : c ? (0, j.jsx)("div", {
        className: z.container,
        children: (0, j.jsx)("p", {
          className: z.errorText,
          children: "Error al cargar los programas de esta categoría."
        })
      }) : (0, j.jsx)(l.Provider, {
        value: S,
        children: (0, j.jsxs)("div", {
          ref: k,
          className: z.container,
          onScroll: P,
          children: [(0, j.jsx)("div", {
            className: z.stickyBanner,
            children: (0, j.jsx)(h, {
              program: m,
              imageUrl: y
            })
          }), (0, j.jsx)("h1", {
            className: z.categoryTitle,
            children: n || t
          }), 0 === o.length ? (0, j.jsx)("p", {
            className: z.emptyText,
            children: "No hay programas en esta categoría."
          }) : (0, j.jsx)("div", {
            className: z.grid,
            children: o.map(function (r, e) {
              return (0, j.jsx)(w, {
                program: r,
                focusKey: "CAT-GRID-".concat(e),
                isFirstRow: e < 4,
                onProgramFocus: p,
                onPress: b
              }, r.id || r.key);
            })
          }), i && (0, j.jsx)("div", {
            className: z.loadingMore,
            children: (0, j.jsx)(_, {})
          })]
        })
      });
    }), {
      setters: [function (r) {
        i = r.$, c = r.H, l = r.K, s = r.U, d = r.W, f = r.X, u = r.Z, g = r.q, m = r.t;
      }, function (r) {
        _ = r.n;
      }, function (r) {
        y = r.t;
      }, function (r) {
        p = r.t;
      }, function (r) {
        h = r.t;
      }],
      execute: function () {
        (b = document.createElement("style")).textContent = '._container_1zf6d_6{scrollbar-width:none;box-sizing:border-box;scroll-behavior:auto;width:100%;height:100vh;padding:0;overflow-y:auto}._container_1zf6d_6::-webkit-scrollbar{display:none}._stickyBanner_1zf6d_21{z-index:10;background:var(--clr-primary);padding-top:1rem;padding-bottom:2rem;position:sticky;top:0}._header_1zf6d_31{flex-direction:row;align-items:center;margin-bottom:1.5rem;display:flex}._header_1zf6d_31>*+*{margin-left:1rem}._backButton_1zf6d_42{cursor:pointer;background:0 0;border:none;border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;width:48px;height:48px;display:flex}._backButton_1zf6d_42._focused_1zf6d_55,._backButton_1zf6d_42:hover{background-color:rgba(255,255,255,.15)}._backIcon_1zf6d_60{width:28px;height:28px}._categoryTitle_1zf6d_65{color:var(--clr-primary-text);text-transform:capitalize;margin-top:2rem;margin-bottom:2rem;font-family:Archia,Arial,Helvetica,sans-serif;font-size:2rem;font-weight:500}._grid_1zf6d_76{border-radius:2rem;flex-wrap:wrap;justify-content:flex-start;align-items:stretch;padding-bottom:50vh;display:flex}._cardWrapper_1zf6d_86{flex-direction:column;flex-shrink:0;margin-bottom:2rem;margin-right:20px;display:flex}._card_1zf6d_86{background-color:var(--clr-secondary);cursor:pointer;box-sizing:border-box;border-radius:2rem;width:20vw;height:21vh;transition:all .3s;position:relative;overflow:hidden}._cardImage_1zf6d_107{object-fit:cover;border-radius:inherit;box-sizing:border-box;background-color:var(--clr-secondary);width:100%;height:100%;display:block}._card_1zf6d_86:after{content:"";border-radius:inherit;pointer-events:none;z-index:5;box-sizing:border-box;border:.3rem solid transparent;transition:border-color .3s;position:absolute;top:0;bottom:0;left:0;right:0}._card_1zf6d_86._focused_1zf6d_55:after,._card_1zf6d_86:hover:after{border-color:var(--foc-primary)}._cardFallback_1zf6d_135{background-color:var(--clr-secondary);border-radius:3rem;justify-content:center;align-items:center;width:100%;height:100%;display:flex}._cardFallbackText_1zf6d_145{color:var(--clr-primary-text);font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.2rem;font-weight:500}._errorText_1zf6d_153{color:#ef4444;text-align:center;padding:5rem 0;font-size:1.2rem;font-weight:500}._emptyText_1zf6d_161{color:#fff;text-align:center;opacity:.6;padding:5rem 0;font-size:1.2rem}._loadingMore_1zf6d_170{justify-content:center;width:100%;padding:2rem 0;display:flex}\n/*$vite$:1*/', document.head.appendChild(b), v = i(u(), 1), x = 20, z = {
          container: "_container_1zf6d_6",
          stickyBanner: "_stickyBanner_1zf6d_21",
          header: "_header_1zf6d_31",
          backButton: "_backButton_1zf6d_42",
          focused: "_focused_1zf6d_55",
          backIcon: "_backIcon_1zf6d_60",
          categoryTitle: "_categoryTitle_1zf6d_65",
          grid: "_grid_1zf6d_76",
          cardWrapper: "_cardWrapper_1zf6d_86",
          card: "_card_1zf6d_86",
          cardImage: "_cardImage_1zf6d_107",
          cardFallback: "_cardFallback_1zf6d_135",
          cardFallbackText: "_cardFallbackText_1zf6d_145",
          errorText: "_errorText_1zf6d_153",
          emptyText: "_emptyText_1zf6d_161",
          loadingMore: "_loadingMore_1zf6d_170"
        }, j = m();
      }
    };
  });
}();