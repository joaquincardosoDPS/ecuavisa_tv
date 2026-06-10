!function () {
  function e(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, r) {
      var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != t) {
        var n,
          o,
          a,
          i,
          c = [],
          s = !0,
          l = !1;
        try {
          if (a = (t = t.call(e)).next, 0 === r) {
            if (Object(t) !== t) return;
            s = !1;
          } else for (; !(s = (n = a.call(t)).done) && (c.push(n.value), c.length !== r); s = !0);
        } catch (e) {
          l = !0, o = e;
        } finally {
          try {
            if (!s && null != t.return && (i = t.return(), Object(i) !== i)) return;
          } finally {
            if (l) throw o;
          }
        }
        return c;
      }
    }(e, t) || function (e, t) {
      if (e) {
        if ("string" == typeof e) return r(e, t);
        var n = {}.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0;
      }
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function r(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
    return n;
  }
  function t(e) {
    return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, t(e);
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./useFetchPaginated-legacy.js", "./catalogService-legacy.js", "./SelectBanner-legacy.js", "./HomeCardCarrousel-legacy.js"], function (r, n) {
    var o, a, i, c, s, l, f, u, g, d, m, h, y, p, _, v, x, b;
    function j(e) {
      var r = e,
        n = function (e) {
          if (!e) return "";
          if ("string" == typeof e) return e;
          if (Array.isArray(e) && e.length > 0) {
            var r = e[0];
            if ("string" == typeof r) return r;
            if ("object" === t(r)) return r.big || r.normal || r.medium || r.default || r.small || "";
          }
          return "object" === t(e) && (e.big || e.normal || e.medium || e.default || e.small) || "";
        };
      return n(r.image_background) || n(r.image_slider) || n(r.image_land) || r.image || "";
    }
    return r("default", function () {
      var e,
        r = (0, p.useRef)(null),
        t = (0, p.useRef)(!1),
        n = _(),
        o = n.filteredCategories,
        s = n.activeProgram,
        f = n.bannerImageUrl,
        g = n.setActiveBannerProgram,
        d = n.isLoading,
        y = n.isError,
        j = n.fetchNextPage,
        C = n.hasNextPage,
        w = n.isFetchingNextPage,
        P = (e = i(), {
          goToProgramOrEvent: function (r, t) {
            if ("event" === t) {
              var n,
                o = r;
              o.skip_view && null !== (n = o.program_associated) && void 0 !== n && n.key ? e("/programas/".concat(o.program_associated.key)) : e("/eventos/".concat(o.key));
            } else e("/programas/".concat(r.key));
          },
          goToCategory: function (r, t) {
            e("/categoria/".concat(r), {
              state: {
                title: t
              }
            });
          }
        }),
        S = P.goToProgramOrEvent,
        k = P.goToCategory,
        T = l({
          focusKey: "PROGRAMS",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          autoRestoreFocus: !0
        }),
        N = T.ref,
        A = T.focusKey;
      (0, p.useEffect)(function () {
        if (!t.current && o.length > 0) {
          var e,
            r = o[0],
            n = null === (e = r.programs[0]) || void 0 === e ? void 0 : e.id;
          n && (setTimeout(function () {
            c("programs-".concat(r.key, "-").concat(n));
          }, 200), t.current = !0);
        }
      }, [o]);
      var F = (0, p.useCallback)(function (e, t) {
        var n = r.current;
        if (n) {
          var a = n.querySelector('[data-section="'.concat(e, '"]'));
          if (a) {
            var i = .53 * window.innerHeight,
              c = a.getBoundingClientRect(),
              s = window.innerHeight;
            if (c.top < i || c.bottom > s) {
              var l = a.offsetTop - i + n.offsetTop;
              n.scrollTop = Math.max(0, l);
            }
            C && !w && t >= o.length - b && j();
          }
        }
      }, [C, w, o.length, j]);
      return (0, x.jsx)(a.Provider, {
        value: A,
        children: (0, x.jsx)("div", {
          ref: N,
          className: v.container,
          children: d ? (0, x.jsx)(u, {}) : y ? (0, x.jsx)("div", {
            className: v.errorContainer,
            children: (0, x.jsx)("p", {
              className: v.errorText,
              children: "Error al cargar los programas."
            })
          }) : (0, x.jsxs)(x.Fragment, {
            children: [(0, x.jsx)("div", {
              className: v.bannerFixed,
              children: (0, x.jsx)("div", {
                className: v.bannerInner,
                children: (0, x.jsx)(m, {
                  program: s,
                  imageUrl: f
                })
              })
            }), (0, x.jsx)("div", {
              ref: r,
              className: v.scrollContainer,
              children: (0, x.jsxs)("div", {
                className: v.carouselsWrapper,
                children: [o.map(function (e, r) {
                  var t = "programs-".concat(e.key);
                  return (0, x.jsxs)("div", {
                    "data-section": t,
                    className: v.section,
                    children: [(0, x.jsx)("h2", {
                      className: v.sectionTitle,
                      children: e.title
                    }), (0, x.jsx)(h, {
                      programs: e.programs,
                      orientation: "horizontal",
                      categorySlug: e.key,
                      focusKeyPrefix: t,
                      onRowFocused: function () {
                        return F(t, r);
                      },
                      onProgramFocused: function (e) {
                        e && g(e);
                      },
                      onProgramPress: S,
                      onViewMorePress: function () {
                        return k(e.key, e.title);
                      }
                    })]
                  }, e.key);
                }), w && (0, x.jsx)("div", {
                  className: v.loadingMore,
                  children: (0, x.jsx)(u, {})
                })]
              })
            })]
          })
        })
      });
    }), {
      setters: [function (e) {
        o = e.$, a = e.K, i = e.U, c = e.X, s = e.Z, l = e.q, f = e.t;
      }, function (e) {
        u = e.n;
      }, function (e) {
        g = e.t;
      }, function (e) {
        d = e.t;
      }, function (e) {
        m = e.t;
      }, function (e) {
        h = e.t;
      }],
      execute: function () {
        (y = document.createElement("style")).textContent = "._container_1occf_3{width:100%;height:100vh;overflow:hidden}._bannerFixed_1occf_10{z-index:8;box-sizing:border-box;isolation:isolate;backface-visibility:hidden;background:#00453a;width:91vw;max-width:100%;position:fixed;top:0;left:9vw;right:0;transform:translateZ(0)}._bannerInner_1occf_25{width:100%;height:51vh}._scrollContainer_1occf_31{scrollbar-width:none;scroll-behavior:auto;contain:layout style;min-width:100%;height:100vh;padding-top:0;overflow-y:auto}._scrollContainer_1occf_31::-webkit-scrollbar{display:none}._carouselsWrapper_1occf_46{flex-direction:column;margin-top:53vh;margin-bottom:32px;padding-bottom:50vh;padding-right:32px;display:flex}._carouselsWrapper_1occf_46>*+*{margin-top:32px}._section_1occf_59{flex-direction:column;display:flex}._sectionTitle_1occf_64{color:#fff;text-transform:capitalize;font-size:24px;font-weight:700;font-family:Archia, var(--font-family-category), Arial, Helvetica, sans-serif;margin-bottom:.5rem;padding-left:16px}._errorContainer_1occf_75{color:#fff;justify-content:center;align-items:center;min-height:50vh;display:flex}._errorText_1occf_83{color:#ef4444;font-family:var(--font-family-title);font-size:var(--font-size-text)}\n/*$vite$:1*/", document.head.appendChild(y), p = o(s(), 1), _ = function () {
          var r = g(function (e, r) {
              return d.getCategories({
                page: e,
                limit: r
              });
            }, [], {
              limit: 10,
              hasMoreStrategy: "last_page"
            }),
            t = r.data,
            n = r.isLoading,
            o = r.isLoadingMore,
            a = r.isError,
            i = r.hasMore,
            c = r.loadMore,
            s = (0, p.useMemo)(function () {
              return t.filter(function (e) {
                return e.programs && e.programs.length > 0;
              });
            }, [t]),
            l = e((0, p.useState)(null), 2),
            f = l[0],
            u = l[1],
            m = e((0, p.useState)(""), 2),
            h = m[0],
            y = m[1];
          return (0, p.useEffect)(function () {
            if (!f && s.length > 0) {
              var e = s[0].programs[0];
              u(e), y(j(e));
            }
          }, [s, f]), {
            filteredCategories: s,
            activeProgram: f,
            bannerImageUrl: h,
            setActiveBannerProgram: (0, p.useCallback)(function (e) {
              u(e), y(j(e));
            }, []),
            isLoading: n,
            isError: a,
            fetchNextPage: c,
            hasNextPage: i,
            isFetchingNextPage: o
          };
        }, v = {
          container: "_container_1occf_3",
          bannerFixed: "_bannerFixed_1occf_10",
          bannerInner: "_bannerInner_1occf_25",
          scrollContainer: "_scrollContainer_1occf_31",
          carouselsWrapper: "_carouselsWrapper_1occf_46",
          section: "_section_1occf_59",
          sectionTitle: "_sectionTitle_1occf_64",
          errorContainer: "_errorContainer_1occf_75",
          errorText: "_errorText_1occf_83"
        }, x = f(), b = 2;
      }
    };
  });
}();