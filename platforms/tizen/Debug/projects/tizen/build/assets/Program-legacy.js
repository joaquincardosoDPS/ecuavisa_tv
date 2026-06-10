!function () {
  function e(r) {
    return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, e(r);
  }
  function r(e) {
    return function (e) {
      if (Array.isArray(e)) return f(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    }(e) || p(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function t(e, r) {
    var t = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (!t) {
      if (Array.isArray(e) || (t = function (e, r) {
        if (e) {
          if ("string" == typeof e) return o(e, r);
          var t = {}.toString.call(e).slice(8, -1);
          return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? o(e, r) : void 0;
        }
      }(e)) || r && e && "number" == typeof e.length) {
        t && (e = t);
        var n = 0,
          a = function () {};
        return {
          s: a,
          n: function () {
            return n >= e.length ? {
              done: !0
            } : {
              done: !1,
              value: e[n++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: a
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var i,
      s = !0,
      l = !1;
    return {
      s: function () {
        t = t.call(e);
      },
      n: function () {
        var e = t.next();
        return s = e.done, e;
      },
      e: function (e) {
        l = !0, i = e;
      },
      f: function () {
        try {
          s || null == t.return || t.return();
        } finally {
          if (l) throw i;
        }
      }
    };
  }
  function o(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var t = 0, o = Array(r); t < r; t++) o[t] = e[t];
    return o;
  }
  function n(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function a(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? n(Object(t), !0).forEach(function (r) {
        i(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : n(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function i(r, t, o) {
    return (t = function (r) {
      var t = function (r, t) {
        if ("object" != e(r) || !r) return r;
        var o = r[Symbol.toPrimitive];
        if (void 0 !== o) {
          var n = o.call(r, t || "default");
          if ("object" != e(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(r);
      }(r, "string");
      return "symbol" == e(t) ? t : t + "";
    }(t)) in r ? Object.defineProperty(r, t, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : r[t] = o, r;
  }
  function s() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
      r,
      t = "function" == typeof Symbol ? Symbol : {},
      o = t.iterator || "@@iterator",
      n = t.toStringTag || "@@toStringTag";
    function a(t, o, n, a) {
      var s = o && o.prototype instanceof c ? o : c,
        u = Object.create(s.prototype);
      return l(u, "_invoke", function (t, o, n) {
        var a,
          s,
          l,
          c = 0,
          u = n || [],
          d = !1,
          p = {
            p: 0,
            n: 0,
            v: e,
            a: f,
            f: f.bind(e, 4),
            d: function (r, t) {
              return a = r, s = 0, l = e, p.n = t, i;
            }
          };
        function f(t, o) {
          for (s = t, l = o, r = 0; !d && c && !n && r < u.length; r++) {
            var n,
              a = u[r],
              f = p.p,
              g = a[2];
            t > 3 ? (n = g === o) && (l = a[(s = a[4]) ? 5 : (s = 3, 3)], a[4] = a[5] = e) : a[0] <= f && ((n = t < 2 && f < a[1]) ? (s = 0, p.v = o, p.n = a[1]) : f < g && (n = t < 3 || a[0] > o || o > g) && (a[4] = t, a[5] = o, p.n = g, s = 0));
          }
          if (n || t > 1) return i;
          throw d = !0, o;
        }
        return function (n, u, g) {
          if (c > 1) throw TypeError("Generator is already running");
          for (d && 1 === u && f(u, g), s = u, l = g; (r = s < 2 ? e : l) || !d;) {
            a || (s ? s < 3 ? (s > 1 && (p.n = -1), f(s, l)) : p.n = l : p.v = l);
            try {
              if (c = 2, a) {
                if (s || (n = "next"), r = a[n]) {
                  if (!(r = r.call(a, l))) throw TypeError("iterator result is not an object");
                  if (!r.done) return r;
                  l = r.value, s < 2 && (s = 0);
                } else 1 === s && (r = a.return) && r.call(a), s < 2 && (l = TypeError("The iterator does not provide a '" + n + "' method"), s = 1);
                a = e;
              } else if ((r = (d = p.n < 0) ? l : t.call(o, p)) !== i) break;
            } catch (r) {
              a = e, s = 1, l = r;
            } finally {
              c = 1;
            }
          }
          return {
            value: r,
            done: d
          };
        };
      }(t, n, a), !0), u;
    }
    var i = {};
    function c() {}
    function u() {}
    function d() {}
    r = Object.getPrototypeOf;
    var p = [][o] ? r(r([][o]())) : (l(r = {}, o, function () {
        return this;
      }), r),
      f = d.prototype = c.prototype = Object.create(p);
    function g(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, l(e, n, "GeneratorFunction")), e.prototype = Object.create(f), e;
    }
    return u.prototype = d, l(f, "constructor", d), l(d, "constructor", u), u.displayName = "GeneratorFunction", l(d, n, "GeneratorFunction"), l(f), l(f, n, "Generator"), l(f, o, function () {
      return this;
    }), l(f, "toString", function () {
      return "[object Generator]";
    }), (s = function () {
      return {
        w: a,
        m: g
      };
    })();
  }
  function l(e, r, t, o) {
    var n = Object.defineProperty;
    try {
      n({}, "", {});
    } catch (e) {
      n = 0;
    }
    l = function (e, r, t, o) {
      function a(r, t) {
        l(e, r, function (e) {
          return this._invoke(r, t, e);
        });
      }
      r ? n ? n(e, r, {
        value: t,
        enumerable: !o,
        configurable: !o,
        writable: !o
      }) : e[r] = t : (a("next", 0), a("throw", 1), a("return", 2));
    }, l(e, r, t, o);
  }
  function c(e, r, t, o, n, a, i) {
    try {
      var s = e[a](i),
        l = s.value;
    } catch (e) {
      return void t(e);
    }
    s.done ? r(l) : Promise.resolve(l).then(o, n);
  }
  function u(e) {
    return function () {
      var r = this,
        t = arguments;
      return new Promise(function (o, n) {
        var a = e.apply(r, t);
        function i(e) {
          c(a, o, n, i, s, "next", e);
        }
        function s(e) {
          c(a, o, n, i, s, "throw", e);
        }
        i(void 0);
      });
    };
  }
  function d(e, r) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, r) {
      var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != t) {
        var o,
          n,
          a,
          i,
          s = [],
          l = !0,
          c = !1;
        try {
          if (a = (t = t.call(e)).next, 0 === r) {
            if (Object(t) !== t) return;
            l = !1;
          } else for (; !(l = (o = a.call(t)).done) && (s.push(o.value), s.length !== r); l = !0);
        } catch (e) {
          c = !0, n = e;
        } finally {
          try {
            if (!l && null != t.return && (i = t.return(), Object(i) !== i)) return;
          } finally {
            if (c) throw n;
          }
        }
        return s;
      }
    }(e, r) || p(e, r) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function p(e, r) {
    if (e) {
      if ("string" == typeof e) return f(e, r);
      var t = {}.toString.call(e).slice(8, -1);
      return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? f(e, r) : void 0;
    }
  }
  function f(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var t = 0, o = Array(r); t < r; t++) o[t] = e[t];
    return o;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./catalogService-legacy.js", "./usePageScroll-legacy.js", "./historyService-legacy.js", "./favoritesService-legacy.js"], function (e, o) {
    var n, i, l, c, p, f, g, m, h, _, v, b, y, x, w, z, j, k, T, P, A, S, N, F;
    function C() {
      var e = l(),
        r = function (r, t, o, n, a) {
          e("/play/".concat(r, "/").concat(t, "/").concat(o, "/").concat(n), a ? {
            state: {
              resumeTime: a
            }
          } : void 0);
        },
        t = function (r, t) {
          e("/play/".concat(r, "/").concat(t.key_segment, "/").concat(t.season, "/").concat(t.chapter), {
            state: {
              resumeTime: t.time
            }
          });
        };
      return {
        goToPlayer: r,
        goToPlayerResume: t,
        goToPlayerFromBanner: function (e, o) {
          if (o) t(e.key, o);else {
            var n,
              a = null === (n = e.segments) || void 0 === n ? void 0 : n[0];
            if (a) {
              var i,
                s,
                l = null !== (i = null === (s = a.all_temp) || void 0 === s ? void 0 : s[0]) && void 0 !== i ? i : 1;
              r(e.key, a.key, l, 1);
            }
          }
        },
        goToPlayerFromBannerSingle: function (e, o, n) {
          n ? t(e.key, n) : o && r(e.key, o.key_segment, o.season, o.chapter);
        },
        goToProgram: function (r) {
          e("/programas/".concat(r));
        }
      };
    }
    function I(e) {
      var r = _(function (e) {
          return e.token;
        }),
        t = _(function (e) {
          return e.activeProfile;
        }),
        o = d((0, j.useState)(!1), 2),
        n = o[0],
        a = o[1],
        i = d((0, j.useState)(!1), 2),
        l = i[0],
        c = i[1],
        p = !!r && !!t;
      return (0, j.useEffect)(function () {
        if (p) {
          var o = !1,
            n = function () {
              var n = u(s().m(function n() {
                var i;
                return s().w(function (n) {
                  for (;;) switch (n.p = n.n) {
                    case 0:
                      return n.p = 0, n.n = 1, w.validate(r, t.id, e);
                    case 1:
                      i = n.v, o || a("ok" === i.status && i.data.length > 0), n.n = 3;
                      break;
                    case 2:
                      n.p = 2, n.v;
                    case 3:
                      return n.a(2);
                  }
                }, n, null, [[0, 2]]);
              }));
              return function () {
                return n.apply(this, arguments);
              };
            }();
          return n(), function () {
            o = !0;
          };
        }
      }, [r, null == t ? void 0 : t.id, e, p]), {
        isFavorited: n,
        isToggling: l,
        isEnabled: p,
        toggleFavorite: (0, j.useCallback)(u(s().m(function o() {
          var i;
          return s().w(function (o) {
            for (;;) switch (o.p = o.n) {
              case 0:
                if (r && t && !l) {
                  o.n = 1;
                  break;
                }
                return o.a(2);
              case 1:
                if (c(!0), o.p = 2, !n) {
                  o.n = 4;
                  break;
                }
                return o.n = 3, w.delete(r, t.id, e);
              case 3:
                a(!1), o.n = 6;
                break;
              case 4:
                return o.n = 5, w.add(r, t.id, e);
              case 5:
                a(!0);
              case 6:
                o.n = 8;
                break;
              case 7:
                o.p = 7, i = o.v, console.error("[useFavorite] Toggle error:", i);
              case 8:
                return o.p = 8, c(!1), o.f(8);
              case 9:
                return o.a(2);
            }
          }, o, null, [[2, 7, 8, 9]]);
        })), [r, t, e, n, l])
      };
    }
    function R(e) {
      var r = e.focusKey,
        t = e.isFavorited,
        o = e.isToggling,
        n = e.onPress,
        a = e.playFocusKey,
        i = void 0 === a ? "program-btn-play" : a,
        s = e.tabsFocusKey,
        l = void 0 === s ? "PROGRAM-TABS" : s,
        c = g({
          focusKey: r,
          onEnterPress: function () {
            o || n();
          },
          onArrowPress: function (e) {
            return "left" === e ? (p(i), !1) : "down" !== e || (p(l), !1);
          }
        }),
        u = c.ref,
        d = c.focused;
      return (0, A.jsx)("button", {
        ref: u,
        type: "button",
        className: [P.favoriteBtn, d && P.focused, t && P.active].filter(Boolean).join(" "),
        onClick: function () {
          o || n();
        },
        "data-focuskey": r,
        children: (0, A.jsx)("svg", {
          className: P.favoriteSvg,
          viewBox: "0 0 24 24",
          fill: t ? "currentColor" : "none",
          stroke: "currentColor",
          strokeWidth: 2,
          children: (0, A.jsx)("path", {
            d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          })
        })
      });
    }
    function B(e) {
      if (e <= 0) return "0min";
      var r = Math.floor(e / 3600),
        t = Math.ceil(e % 3600 / 60);
      return r > 0 ? "".concat(r, "h ").concat(t, "min") : "".concat(t, "min");
    }
    function E(e) {
      var r = e.duration,
        t = e.time,
        o = e.subtitle,
        n = r.split(":").map(Number),
        a = 3600 * (n[0] || 0) + 60 * (n[1] || 0) + (n[2] || 0);
      if (a <= 0) return null;
      var i = Math.min(t / a * 100, 100),
        s = Math.max(a - t, 0);
      return (0, A.jsxs)("div", {
        className: P.progressBarContainer,
        children: [(0, A.jsx)("div", {
          className: P.progressBarOuter,
          children: (0, A.jsx)("div", {
            className: P.progressBarInner,
            style: {
              width: "".concat(i, "%")
            }
          })
        }), (0, A.jsxs)("span", {
          className: P.progressRemaining,
          children: [B(s), " restantes", o ? " · ".concat(o) : ""]
        })]
      });
    }
    function O(e) {
      var r,
        t,
        o,
        n = e.program,
        a = e.onBannerFocused,
        s = e.continueWatchingItem,
        l = e.onPlay,
        c = I(n.key),
        u = c.isFavorited,
        d = c.isToggling,
        f = c.isEnabled,
        m = c.toggleFavorite,
        h = g({
          focusKey: "PROGRAM-BANNER-ACTIONS",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function () {
            return null == a ? void 0 : a();
          }
        }),
        _ = h.ref,
        v = h.focusKey,
        b = (0, j.useCallback)(function () {
          null == l || l();
        }, [l]),
        y = null == n || null === (r = n.image_logo) || void 0 === r ? void 0 : r.big,
        x = (null === (t = n.segments) || void 0 === t || null === (t = t[0]) || void 0 === t ? void 0 : t.max_temp) || 0,
        w = null === (o = n.genders) || void 0 === o ? void 0 : o.map(function (e) {
          return e.name;
        }).join(", "),
        z = g({
          focusKey: "program-btn-play",
          onEnterPress: b,
          onFocus: function () {
            return null == a ? void 0 : a();
          },
          onArrowPress: function (e) {
            return "right" === e && f ? (p("program-btn-favorite"), !1) : "down" !== e || (p("PROGRAM-TABS"), !1);
          }
        }),
        k = z.ref,
        T = z.focused;
      return (0, A.jsxs)("div", {
        className: P.infoBanner,
        children: [y ? (0, A.jsx)("div", {
          className: P.logoContainer,
          children: (0, A.jsx)("img", {
            src: y,
            alt: n.title,
            className: P.logoImg,
            draggable: !1
          })
        }) : (0, A.jsx)("h2", {
          className: P.titleFallback,
          children: n.title
        }), (0, A.jsxs)("div", {
          className: P.metaRow,
          children: [n.classification && (0, A.jsx)("span", {
            className: P.badge,
            children: n.classification
          }), (0, A.jsxs)("span", {
            className: P.metaText,
            children: [n.anio_production && "".concat(n.anio_production, " – "), x > 1 ? "".concat(x, " Temporadas") : "1 Temporada", w && " – ".concat(w)]
          }), (0, A.jsx)("p", {
            className: P.description,
            children: n.description_short
          })]
        }), (0, A.jsx)(i.Provider, {
          value: v,
          children: (0, A.jsxs)("div", {
            ref: _,
            className: P.actionRow,
            children: [(0, A.jsxs)("div", {
              ref: k,
              className: "".concat(P.playBtn, " ").concat(T ? P.focused : ""),
              onClick: b,
              onMouseEnter: function () {},
              children: [(0, A.jsx)("span", {
                className: P.playIcon,
                children: "▶"
              }), (0, A.jsx)("span", {
                className: P.playText,
                children: s ? "Reanudar" : n.single_episode ? "Reproducir" : "Capítulos"
              })]
            }), f && (0, A.jsx)(R, {
              focusKey: "program-btn-favorite",
              isFavorited: u,
              isToggling: d,
              onPress: m
            })]
          })
        }), s && (0, A.jsx)("div", {
          className: P.progressUnderAction,
          children: (0, A.jsx)(E, {
            duration: s.duration,
            time: s.time,
            subtitle: s.title_complete
          })
        })]
      });
    }
    function M(e, r, o) {
      var n = _(function (e) {
          return e.token;
        }),
        i = _(function (e) {
          return e.activeProfile;
        }),
        l = d((0, j.useState)([]), 2),
        c = l[0],
        p = l[1],
        f = d((0, j.useState)(!1), 2),
        g = f[0],
        m = f[1],
        h = !!n && !!i && !!e;
      return (0, j.useEffect)(function () {
        if (h) {
          var t = !1,
            l = function () {
              var l = u(s().m(function l() {
                var c;
                return s().w(function (s) {
                  for (;;) switch (s.p = s.n) {
                    case 0:
                      return m(!0), s.p = 1, s.n = 2, x.getAll(a(a(a({
                        token: n,
                        profile: i.id,
                        program: e
                      }, r ? {
                        segment: r
                      } : {}), null != o ? {
                        season: o
                      } : {}), {}, {
                        limit: 50
                      }));
                    case 2:
                      c = s.v, t || p(c.data || []), s.n = 4;
                      break;
                    case 3:
                      s.p = 3, s.v, t || p([]);
                    case 4:
                      return s.p = 4, t || m(!1), s.f(4);
                    case 5:
                      return s.a(2);
                  }
                }, l, null, [[1, 3, 4, 5]]);
              }));
              return function () {
                return l.apply(this, arguments);
              };
            }();
          return l(), function () {
            t = !0;
          };
        }
      }, [e, r, o, n, null == i ? void 0 : i.id, h]), {
        item: (0, j.useMemo)(function () {
          var e;
          return null !== (e = c.find(function (e) {
            return 0 === e.end;
          })) && void 0 !== e ? e : null;
        }, [c]),
        items: c,
        progressMap: (0, j.useMemo)(function () {
          var e,
            r = new Map(),
            o = t(c);
          try {
            for (o.s(); !(e = o.n()).done;) {
              var n = e.value;
              r.set(n.key, n);
            }
          } catch (a) {
            o.e(a);
          } finally {
            o.f();
          }
          return r;
        }, [c]),
        isLoading: g
      };
    }
    function K(e) {
      if (!e) return "";
      var r = e.split(":").map(Number);
      if (r.length < 2) return "";
      var t = r[0] || 0,
        o = r[1] || 0;
      return t > 0 && o > 0 ? "".concat(t, "h ").concat(o, "m") : t > 0 ? "".concat(t, "h") : o > 0 ? "".concat(o, "m") : "1m";
    }
    function L(e) {
      var r,
        t,
        o = e.program,
        n = e.chapter,
        a = e.onBannerFocused,
        s = e.onPlay,
        l = I(o.key),
        c = l.isFavorited,
        u = l.isToggling,
        d = l.isEnabled,
        f = l.toggleFavorite,
        m = M(o.key).item,
        h = g({
          focusKey: "PROGRAM-SINGLE-BANNER-ACTIONS",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function () {
            return null == a ? void 0 : a();
          }
        }),
        _ = h.ref,
        v = h.focusKey,
        b = (0, j.useCallback)(function () {
          null == s || s();
        }, [s]),
        y = null == o || null === (r = o.image_logo) || void 0 === r ? void 0 : r.big,
        x = null === (t = o.genders) || void 0 === t ? void 0 : t.map(function (e) {
          return e.name;
        }).join(", "),
        w = g({
          focusKey: "program-single-btn-play",
          onEnterPress: b,
          onFocus: function () {
            return null == a ? void 0 : a();
          },
          onArrowPress: function (e) {
            return "right" === e && d ? (p("program-single-btn-favorite"), !1) : "down" !== e || (p("PROGRAM-TABS-SINGLE"), !1);
          }
        }),
        z = w.ref,
        k = w.focused;
      return (0, A.jsxs)("div", {
        className: P.infoBanner,
        children: [y ? (0, A.jsx)("div", {
          className: P.logoContainer,
          children: (0, A.jsx)("img", {
            src: y,
            alt: o.title,
            className: P.logoImg,
            draggable: !1
          })
        }) : (0, A.jsx)("h2", {
          className: P.titleFallback,
          children: o.title
        }), (0, A.jsxs)("div", {
          className: P.metaRow,
          children: [o.classification && (0, A.jsx)("span", {
            className: P.badge,
            children: o.classification
          }), (0, A.jsxs)("span", {
            className: P.metaText,
            children: [o.anio_production && "".concat(o.anio_production), (null == n ? void 0 : n.duration) && " – ".concat(K(n.duration)), x && " – ".concat(x)]
          }), (0, A.jsx)("p", {
            className: P.description,
            children: o.description_short
          })]
        }), (0, A.jsxs)(i.Provider, {
          value: v,
          children: [(0, A.jsxs)("div", {
            ref: _,
            className: P.actionRow,
            children: [(0, A.jsxs)("div", {
              ref: z,
              className: "".concat(P.playBtn, " ").concat(k ? P.focused : ""),
              onClick: b,
              children: [(0, A.jsx)("span", {
                className: P.playIcon,
                children: "▶"
              }), (0, A.jsx)("span", {
                className: P.playText,
                children: m ? "Reanudar" : "Reproducir"
              })]
            }), d && (0, A.jsx)(R, {
              focusKey: "program-single-btn-favorite",
              isFavorited: c,
              isToggling: u,
              onPress: f,
              playFocusKey: "program-single-btn-play",
              tabsFocusKey: "PROGRAM-TABS-SINGLE"
            })]
          }), m && (0, A.jsx)("div", {
            className: P.progressUnderAction,
            children: (0, A.jsx)(E, {
              duration: m.duration,
              time: m.time
            })
          })]
        })]
      });
    }
    function G(e) {
      var r = e.program,
        t = e.scrollY,
        o = void 0 === t ? 0 : t,
        n = function (e) {
          if (!e) return "";
          for (var r = 0, t = ["big", "normal", "medium", "default", "small"]; r < t.length; r++) {
            var o,
              n = t[r];
            if (null !== (o = e[n]) && void 0 !== o && o.trim()) return e[n].trim();
          }
          return "";
        },
        a = n(null == r ? void 0 : r.image_slider) || n(null == r ? void 0 : r.image_land) || n(null == r ? void 0 : r.image_port) || "",
        i = "undefined" != typeof window ? window.innerHeight : 1080,
        s = .85 * Math.min(1, Math.abs(o) / i);
      return (0, A.jsxs)("div", {
        className: P.bannerWrapper,
        children: [a && (0, A.jsx)("div", {
          className: P.bannerImage,
          style: {
            backgroundImage: "url(".concat(a, ")")
          }
        }), (0, A.jsx)("div", {
          className: P.bannerOverlay,
          style: {
            opacity: s
          }
        })]
      });
    }
    function W(e) {
      var r = e.program,
        t = e.isSingle,
        o = void 0 !== t && t,
        n = e.chapter,
        a = e.onBannerFocused,
        i = e.continueWatchingItem,
        s = e.onPlay;
      return (0, A.jsx)(A.Fragment, {
        children: o ? (0, A.jsx)(L, {
          program: r,
          chapter: n,
          onBannerFocused: a,
          onPlay: s
        }) : (0, A.jsx)(O, {
          program: r,
          onBannerFocused: a,
          continueWatchingItem: i,
          onPlay: s
        })
      });
    }
    function D(e) {
      var r = e.label,
        t = e.focusKey,
        o = e.isActive,
        n = e.onPress,
        a = e.onTabFocus,
        i = e.onArrowDown,
        s = e.index,
        l = e.allFocusKeys,
        c = g({
          focusKey: t,
          onEnterPress: n,
          onFocus: function () {
            o || n(), null == a || a();
          },
          onArrowPress: function (e) {
            return "down" === e && i ? i() : "left" === e ? (s > 0 && p(l[s - 1]), !1) : "right" !== e || (s < l.length - 1 && p(l[s + 1]), !1);
          }
        }),
        u = c.ref,
        d = c.focused;
      return (0, A.jsx)("button", {
        ref: u,
        type: "button",
        className: [P.tabItem, o && P.tabItemActive, d && P.tabItemFocused].filter(Boolean).join(" "),
        onClick: n,
        "data-focuskey": t,
        children: r
      });
    }
    function H(e) {
      var r = e.activeTab,
        t = e.setActiveTab,
        o = e.onTabsFocused,
        n = (0, j.useRef)(null),
        a = g({
          focusKey: "PROGRAM-TABS-SINGLE",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function (e, r, t) {
            return null == o ? void 0 : o(t);
          }
        }),
        s = a.ref,
        l = a.focusKey,
        c = (0, j.useCallback)(function (e) {
          var r = n.current;
          if (r) {
            var t = r.parentElement;
            if (t) {
              var o = r.querySelector('[data-focuskey="'.concat(e, '"]'));
              if (o) {
                var a = t.offsetWidth,
                  i = o.offsetLeft - a / 2 + o.offsetWidth / 2,
                  s = Math.max(0, r.scrollWidth - a + 80),
                  l = Math.max(0, Math.min(i, s));
                r.style.transform = "translateX(-".concat(l, "px)");
              }
            }
          }
        }, []),
        u = (0, j.useCallback)(function () {
          return p("PROGRAM-RELATED"), !1;
        }, []),
        d = ["program-single-tab-related", "program-single-tab-details"];
      return (0, A.jsx)(i.Provider, {
        value: l,
        children: (0, A.jsx)("div", {
          ref: s,
          className: P.tabsWrapper,
          children: (0, A.jsxs)("div", {
            ref: n,
            className: P.tabsTrack,
            children: [(0, A.jsx)(D, {
              label: "Recomendados",
              focusKey: "program-single-tab-related",
              isActive: "related" === r,
              index: 0,
              allFocusKeys: d,
              onPress: function () {
                return t("related");
              },
              onTabFocus: function () {
                return c("program-single-tab-related");
              },
              onArrowDown: u
            }), (0, A.jsx)(D, {
              label: "Detalles",
              focusKey: "program-single-tab-details",
              isActive: "details" === r,
              index: 1,
              allFocusKeys: d,
              onPress: function () {
                return t("details");
              },
              onTabFocus: function () {
                return c("program-single-tab-details");
              }
            })]
          })
        })
      });
    }
    function U(e) {
      var r,
        t = e.programDetail,
        o = t.anio_production,
        n = (r = t.actors) ? "string" == typeof r ? r : Array.isArray(r) ? r.map(function (e) {
          return "string" == typeof e ? e : (null == e ? void 0 : e.name) || "";
        }).filter(Boolean).join(", ") : "" : "";
      return (0, A.jsxs)("div", {
        style: {
          marginTop: "2rem",
          marginLeft: "1rem"
        },
        children: [(0, A.jsx)("h3", {
          className: P.detailsHeading,
          children: "Sinopsis"
        }), (0, A.jsxs)("div", {
          className: P.detailsSection,
          children: [(0, A.jsx)("div", {
            className: P.detailsSynopsis,
            children: (0, A.jsx)("p", {
              className: P.detailsText,
              children: t.description || t.description_short || "Sinopsis no disponible."
            })
          }), (0, A.jsxs)("div", {
            className: P.detailsMeta,
            children: [o && (0, A.jsxs)("p", {
              className: P.detailsValue,
              children: ["Año: ", o, "."]
            }), n && (0, A.jsxs)("p", {
              className: P.detailsValue,
              style: {
                marginTop: "0.5rem"
              },
              children: ["Elenco: ", n, "."]
            })]
          })]
        })]
      });
    }
    function V(e) {
      var r,
        t = e.program,
        o = e.focusKey,
        n = e.onCardFocus,
        a = e.onPress,
        i = null === (r = t.image_land) || void 0 === r ? void 0 : r.small,
        s = function () {
          null == a || a(t.key);
        },
        l = g({
          focusKey: o,
          onEnterPress: s,
          onFocus: function () {
            return null == n ? void 0 : n();
          }
        }),
        c = l.ref,
        u = l.focused;
      return (0, A.jsx)("div", {
        ref: c,
        className: "".concat(P.relatedCard, " ").concat(u ? P.relatedCardFocused : ""),
        onClick: s,
        "data-focuskey": o,
        children: i ? (0, A.jsx)("img", {
          src: i,
          alt: t.title,
          className: P.relatedCardImg,
          draggable: !1,
          decoding: "async"
        }) : (0, A.jsx)("div", {
          className: P.relatedCardFallback,
          children: (0, A.jsx)("span", {
            className: P.relatedCardFallbackText,
            children: t.title
          })
        })
      });
    }
    function $(e) {
      var r = e.programs,
        t = e.isLoading,
        o = void 0 !== t && t,
        n = e.isFetchingNextPage,
        a = void 0 !== n && n,
        s = e.hasNextPage,
        l = void 0 !== s && s,
        c = e.fetchNextPage,
        u = e.onProgramPress,
        d = (0, j.useRef)(null),
        p = g({
          focusKey: "PROGRAM-RELATED",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1
        }),
        f = p.ref,
        m = p.focusKey,
        h = (0, j.useCallback)(function (e) {
          var t = d.current,
            o = null == t ? void 0 : t.parentElement;
          if (t && o) {
            var n = t.children;
            if (e >= 0 && e < n.length) {
              var a = n[e],
                i = o.getBoundingClientRect(),
                s = a.getBoundingClientRect(),
                u = s.bottom + 80 - i.bottom;
              u > 0 && (o.scrollTop += u);
              var p = i.top - s.top;
              p > 0 && (o.scrollTop -= p + 80);
            }
          }
          l && c && e >= r.length - S && c();
        }, [l, c, r.length]);
      return o ? (0, A.jsx)("p", {
        className: P.statusText,
        children: "Cargando programas relacionados..."
      }) : 0 === r.length ? (0, A.jsx)("p", {
        className: P.emptyText,
        children: "No hay sugerencias disponibles."
      }) : (0, A.jsx)(i.Provider, {
        value: m,
        children: (0, A.jsx)("div", {
          ref: f,
          className: P.relatedGrid,
          children: (0, A.jsxs)("div", {
            ref: d,
            className: P.relatedGridInner,
            children: [r.map(function (e, r) {
              return (0, A.jsx)(V, {
                program: e,
                focusKey: "PROGRAM-RELATED-".concat(e.id, "-").concat(r),
                onCardFocus: function () {
                  return h(r);
                },
                onPress: u
              }, e.id);
            }), a && (0, A.jsx)("p", {
              className: P.statusText,
              children: "Cargando más..."
            })]
          })
        })
      });
    }
    function q(e) {
      var r,
        t,
        o,
        n = e.program,
        a = e.setIsLoading,
        s = v(function () {
          return b.getChapters({
            program: n.key,
            page: 1,
            limit: 1
          });
        }, [n.key], {
          enabled: !!n.key
        }),
        l = s.data,
        c = s.isLoading,
        u = T(n.key, (null === (r = n.category) || void 0 === r ? void 0 : r.slug) || n.name_category),
        f = u.programs,
        m = u.isLoading,
        h = u.isFetchingNextPage,
        _ = u.hasNextPage,
        x = u.fetchNextPage,
        w = null !== (t = null == l || null === (o = l.data) || void 0 === o ? void 0 : o[0]) && void 0 !== t ? t : null,
        z = d((0, j.useState)("related"), 2),
        k = z[0],
        S = z[1],
        N = C(),
        F = N.goToPlayerFromBannerSingle,
        I = N.goToProgram,
        R = g({
          focusKey: "PROGRAM-SINGLE-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          autoRestoreFocus: !0
        }),
        B = R.ref,
        E = R.focusKey;
      (0, j.useEffect)(function () {
        p("program-single-btn-play");
      }, []);
      var O = d((0, j.useState)(0), 2),
        M = O[0],
        K = O[1],
        L = y({
          onScroll: K
        }),
        D = L.scrollRef,
        V = L.scrollToTop,
        q = L.scrollToSection,
        X = (0, j.useCallback)(function (e) {
          S(e);
        }, []);
      (0, j.useEffect)(function () {
        c || m || a(!1);
      }, [c, m, a]);
      var Y = (0, j.useCallback)(function () {
        F(n, null != w ? w : void 0);
      }, [F, n, w]);
      return (0, A.jsx)(i.Provider, {
        value: E,
        children: (0, A.jsxs)("div", {
          ref: B,
          className: P.pageWrapper,
          children: [(0, A.jsx)(G, {
            program: n,
            scrollY: M
          }), (0, A.jsxs)("div", {
            ref: D,
            className: P.pageScroller,
            children: [(0, A.jsx)(W, {
              program: n,
              isSingle: !0,
              chapter: null != w ? w : void 0,
              onBannerFocused: V,
              onPlay: Y
            }), (0, A.jsxs)("div", {
              "data-section": "tabs",
              className: P.mainContent,
              children: [(0, A.jsx)(H, {
                segments: [],
                activeTab: k,
                setActiveTab: X,
                onTabsFocused: function (e) {
                  var r = null == e ? void 0 : e.event;
                  (!r || "ArrowUp" !== r.key && 38 !== r.keyCode) && q("tabs", "start", 60);
                }
              }), (0, A.jsx)("div", {
                className: P.contentArea,
                children: "details" === k ? (0, A.jsx)(U, {
                  programDetail: n
                }) : (0, A.jsx)($, {
                  programs: f,
                  isLoading: m,
                  isFetchingNextPage: h,
                  hasNextPage: _,
                  fetchNextPage: x,
                  onProgramPress: I
                })
              })]
            })]
          })]
        })
      });
    }
    function X(e) {
      var r = e.label,
        t = e.focusKey,
        o = e.isActive,
        n = e.onPress,
        a = e.onTabFocus,
        i = e.onArrowDown,
        s = e.index,
        l = e.allFocusKeys,
        c = g({
          focusKey: t,
          onEnterPress: n,
          onFocus: function () {
            o || n(), null == a || a();
          },
          onArrowPress: function (e) {
            return "down" === e && i ? i() : "left" === e ? (s > 0 && p(l[s - 1]), !1) : "right" !== e || (s < l.length - 1 && p(l[s + 1]), !1);
          }
        }),
        u = c.ref,
        d = c.focused;
      return (0, A.jsx)("button", {
        ref: u,
        type: "button",
        className: [P.tabItem, o && P.tabItemActive, d && P.tabItemFocused].filter(Boolean).join(" "),
        onClick: n,
        "data-focuskey": t,
        children: r
      });
    }
    function Y(e) {
      var t,
        o = e.validSegments,
        n = e.activeSegment,
        a = e.setActiveSegment,
        s = e.showDetails,
        l = e.setShowDetails,
        c = e.showRelated,
        u = e.setShowRelated,
        d = e.onTabsFocused,
        f = (0, j.useRef)(null),
        m = g({
          focusKey: "PROGRAM-TABS",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function (e, r, t) {
            return null == d ? void 0 : d(t);
          }
        }),
        h = m.ref,
        _ = m.focusKey,
        v = (0, j.useCallback)(function (e) {
          var r = f.current;
          if (r) {
            var t = r.parentElement;
            if (t) {
              var o = r.querySelector('[data-focuskey="'.concat(e, '"]'));
              if (o) {
                var n = t.offsetWidth,
                  a = o.offsetLeft - n / 2 + o.offsetWidth / 2,
                  i = Math.max(0, r.scrollWidth - n + 80),
                  s = Math.max(0, Math.min(a, i));
                r.style.transform = "translateX(-".concat(s, "px)");
              }
            }
          }
        }, []),
        b = (0, j.useCallback)(function () {
          return !!(n && n.all_temp.length > 1 || s || c) || (p("PROGRAM-CHAPTERS"), !1);
        }, [n, s, c]),
        y = (0, j.useCallback)(function () {
          return p("PROGRAM-RELATED"), !1;
        }, []);
      return (0, A.jsx)(i.Provider, {
        value: _,
        children: (0, A.jsx)("div", {
          ref: h,
          className: P.tabsWrapper,
          children: (0, A.jsx)("div", {
            ref: f,
            className: P.tabsTrack,
            children: (t = [].concat(r(o.map(function (e) {
              return "program-tab-".concat(e.key);
            })), ["program-tab-related", "program-tab-details"]), (0, A.jsxs)(A.Fragment, {
              children: [o.map(function (e, r) {
                var o = !s && !c && (null == n ? void 0 : n.id) === e.id,
                  i = "program-tab-".concat(e.key);
                return (0, A.jsx)(X, {
                  label: e.name,
                  focusKey: i,
                  isActive: o,
                  index: r,
                  allFocusKeys: t,
                  onPress: function () {
                    a(e), l(!1), u(!1);
                  },
                  onTabFocus: function () {
                    return v(i);
                  },
                  onArrowDown: b
                }, e.key);
              }), (0, A.jsx)(X, {
                label: "Recomendados",
                focusKey: "program-tab-related",
                isActive: c,
                index: o.length,
                allFocusKeys: t,
                onPress: function () {
                  u(!0), l(!1);
                },
                onTabFocus: function () {
                  return v("program-tab-related");
                },
                onArrowDown: y
              }), (0, A.jsx)(X, {
                label: "Detalles",
                focusKey: "program-tab-details",
                isActive: s,
                index: o.length + 1,
                allFocusKeys: t,
                onPress: function () {
                  l(!0), u(!1);
                },
                onTabFocus: function () {
                  return v("program-tab-details");
                }
              })]
            }))
          })
        })
      });
    }
    function Z(e) {
      var r,
        t,
        o = e.chapter,
        n = e.focusKey,
        a = e.showChapter,
        i = void 0 === a || a,
        s = e.onCardFocus,
        l = e.resumeTime,
        c = e.onPress,
        u = d((0, j.useState)(!1), 2),
        p = u[0],
        f = u[1],
        m = function () {
          null == c || c(o, l);
        },
        h = g({
          focusKey: n,
          onEnterPress: m,
          onFocus: function () {
            return null == s ? void 0 : s();
          }
        }),
        _ = h.ref,
        v = h.focused,
        b = (null === (r = o.image_land) || void 0 === r ? void 0 : r.normal) || (null === (t = o.image_land) || void 0 === t ? void 0 : t.default) || o.image,
        y = function (e) {
          if (!e) return "--";
          var r = String(e).split(":");
          return 3 === r.length ? Math.round(60 * parseInt(r[0], 10) + parseInt(r[1], 10) + parseInt(r[2], 10) / 60).toString() : 2 === r.length ? Math.round(parseInt(r[0], 10) + parseInt(r[1], 10) / 60).toString() : r[0] || "--";
        }(o.duration),
        x = o.duration_seg && o.time,
        w = i && o.chapter ? "".concat(o.chapter, " - ").concat(o.title) : o.title || "";
      return (0, A.jsxs)("div", {
        ref: _,
        className: P.chapterCard,
        "data-focuskey": n,
        onClick: m,
        onMouseEnter: function () {
          return f(!0);
        },
        onMouseLeave: function () {
          return f(!1);
        },
        children: [(0, A.jsxs)("div", {
          className: "".concat(P.chapterThumb, " ").concat(v || p ? P.focused : ""),
          children: [b ? (0, A.jsx)("img", {
            src: b,
            alt: o.title,
            className: P.chapterThumbImg,
            draggable: !1,
            decoding: "async"
          }) : (0, A.jsx)("div", {
            className: P.chapterThumbPlaceholder
          }), x && (0, A.jsx)("div", {
            className: P.chapterTimeBar,
            style: {
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%"
            },
            children: (0, A.jsx)("div", {
              className: P.chapterTimeBarInner,
              children: (0, A.jsx)("div", {
                className: P.chapterTimeBarFill,
                style: {
                  width: "".concat(Math.min(100, o.time / o.duration_seg * 100), "%")
                }
              })
            })
          })]
        }), (0, A.jsxs)("div", {
          className: P.chapterInfo,
          children: [(0, A.jsxs)("div", {
            style: {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2
            },
            children: [(0, A.jsx)("p", {
              className: P.chapterNumber,
              children: w
            }), (0, A.jsxs)("span", {
              className: P.chapterDuration,
              children: [y, " min"]
            })]
          }), (0, A.jsx)("p", {
            className: P.chapterTitle,
            children: o.description || "Descripción no disponible"
          })]
        })]
      });
    }
    function J(e) {
      var r = e.season,
        t = e.focusKey,
        o = e.isActive,
        n = e.onPress,
        a = e.onFocused,
        i = e.onArrowDown,
        s = g({
          focusKey: t,
          onEnterPress: n,
          onArrowPress: function (e) {
            return "down" !== e || !i || i();
          },
          onFocus: function () {
            n(), null == a || a(), l.current && l.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
          }
        }),
        l = s.ref,
        c = s.focused;
      return (0, A.jsxs)("button", {
        ref: l,
        type: "button",
        className: [P.seasonItem, o && P.seasonItemActive, c && P.seasonItemFocused].filter(Boolean).join(" "),
        onClick: n,
        "data-focuskey": t,
        children: ["Temporada ", r]
      });
    }
    function Q(e) {
      var r = e.seasons,
        t = e.activeSeason,
        o = e.setActiveSeason,
        n = g({
          focusKey: "PROGRAM-SEASONS",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1
        }),
        a = n.ref,
        s = n.focusKey;
      return (0, A.jsx)(i.Provider, {
        value: s,
        children: (0, A.jsx)("div", {
          ref: a,
          className: P.seasonsRow,
          children: r.map(function (e, n) {
            var a = "program-season-".concat(e),
              i = n === r.length - 1;
            return (0, A.jsx)(J, {
              season: e,
              focusKey: a,
              isActive: t === e,
              onPress: function () {
                return o(e);
              },
              onArrowDown: i ? function () {
                return !1;
              } : void 0
            }, e);
          })
        })
      });
    }
    function ee(e) {
      var r,
        t = e.slug,
        o = e.activeSegment,
        n = e.activeSeason,
        s = e.setActiveSeason,
        l = e.onLoaded,
        c = e.showChapter,
        u = void 0 === c || c,
        d = e.onContentFocused,
        p = e.progressMap,
        f = e.onChapterPress,
        m = (0, j.useRef)(null),
        h = N(t, n, (null == o ? void 0 : o.key) || null, 12),
        _ = h.chapters,
        v = h.isLoading,
        b = h.fetchNextPage,
        y = h.hasNextPage,
        x = h.isFetchingNextPage,
        w = (null == _ || null === (r = _.pages) || void 0 === r ? void 0 : r.flatMap(function (e) {
          return (null == e ? void 0 : e.data) || [];
        })) || [];
      (0, j.useEffect)(function () {
        !v && l && l();
      }, [v]);
      var z = g({
          focusKey: "PROGRAM-CHAPTERS",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function () {
            return null == d ? void 0 : d();
          }
        }),
        k = z.ref,
        T = z.focusKey,
        S = (0, j.useCallback)(function (e) {
          var r = m.current;
          if (r) {
            var t = r.children;
            e < 0 || e >= t.length || t[e].scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
          }
        }, []),
        C = (0, j.useCallback)(function (e, r) {
          S(r), y && !x && r >= w.length - F && b();
        }, [S, y, x, w.length, b]);
      return (0, A.jsx)(i.Provider, {
        value: T,
        children: (0, A.jsxs)("div", {
          ref: k,
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
          },
          children: [o && o.all_temp.length >= 1 && (0, A.jsx)(Q, {
            seasons: o.all_temp,
            activeSeason: n,
            setActiveSeason: s
          }), v ? (0, A.jsx)("p", {
            className: P.statusText,
            children: "Cargando capítulos..."
          }) : w.length > 0 ? (0, A.jsx)("div", {
            className: P.chaptersWrapper,
            children: (0, A.jsx)("div", {
              ref: m,
              className: P.chaptersTrack,
              children: w.map(function (e, r) {
                var t = "PROGRAM-CHAPTERS-".concat(e.key, "-").concat(r),
                  o = null == p ? void 0 : p.get(e.key);
                return (0, A.jsx)(Z, {
                  chapter: o ? a(a({}, e), {}, {
                    time: o.time,
                    duration_seg: o.duration_seg
                  }) : e,
                  index: r + 1,
                  focusKey: t,
                  showChapter: u,
                  onCardFocus: function () {
                    return C(t, r);
                  },
                  resumeTime: 0 === (null == o ? void 0 : o.end) ? o.time : void 0,
                  onPress: f
                }, t);
              })
            })
          }) : (0, A.jsx)("p", {
            className: P.emptyText,
            children: "No hay capítulos disponibles para esta temporada."
          })]
        })
      });
    }
    function re(e) {
      var r,
        t,
        o,
        n,
        a = e.program,
        s = e.slug,
        l = e.setIsLoading,
        c = (0, j.useMemo)(function () {
          var e;
          return (null !== (e = null == a ? void 0 : a.segments) && void 0 !== e ? e : []).filter(function (e) {
            return e.all_temp && e.all_temp.length > 0;
          });
        }, [null == a ? void 0 : a.segments]),
        u = null !== (r = c[0]) && void 0 !== r ? r : null,
        f = d((0, j.useState)(u), 2),
        m = f[0],
        h = f[1],
        _ = d((0, j.useState)(null !== (t = null == u || null === (o = u.all_temp) || void 0 === o ? void 0 : o[0]) && void 0 !== t ? t : null), 2),
        v = _[0],
        b = _[1],
        x = d((0, j.useState)(!u), 2),
        w = x[0],
        z = x[1],
        k = d((0, j.useState)(!1), 2),
        S = k[0],
        N = k[1],
        F = T(a.key, (null === (n = a.category) || void 0 === n ? void 0 : n.slug) || a.name_category),
        I = F.programs,
        R = F.isLoading,
        B = F.isFetchingNextPage,
        E = F.hasNextPage,
        O = F.fetchNextPage,
        K = M(a.key).item,
        L = M(a.key, null == m ? void 0 : m.key, v).progressMap,
        D = C(),
        H = D.goToPlayerFromBanner,
        V = D.goToPlayer,
        q = D.goToProgram,
        X = g({
          focusKey: "PROGRAM-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          autoRestoreFocus: !0
        }),
        Z = X.ref,
        J = X.focusKey;
      (0, j.useEffect)(function () {
        p("program-btn-play");
      }, []);
      var Q = d((0, j.useState)(0), 2),
        re = Q[0],
        te = Q[1],
        oe = y({
          onScroll: te
        }),
        ne = oe.scrollRef,
        ae = oe.scrollToTop,
        ie = oe.scrollToSection,
        se = (0, j.useCallback)(function (e) {
          h(e), e.all_temp && e.all_temp.length > 0 && b(e.all_temp[0]);
        }, []),
        le = (0, j.useCallback)(function () {
          l(!1);
        }, [l]),
        ce = (0, j.useCallback)(function () {
          H(a, K);
        }, [H, a, K]),
        ue = (0, j.useCallback)(function (e, r) {
          V(a.key, e.key_segment, e.season, e.chapter, r);
        }, [V, a.key]);
      return (0, A.jsx)(i.Provider, {
        value: J,
        children: (0, A.jsxs)("div", {
          ref: Z,
          className: P.pageWrapper,
          children: [(0, A.jsx)(G, {
            program: a,
            scrollY: re
          }), (0, A.jsxs)("div", {
            ref: ne,
            className: P.pageScroller,
            children: [(0, A.jsx)(W, {
              program: a,
              onBannerFocused: ae,
              continueWatchingItem: K,
              onPlay: ce
            }), (0, A.jsxs)("div", {
              "data-section": "tabs",
              className: P.mainContent,
              children: [(0, A.jsx)(Y, {
                program: a,
                validSegments: c,
                activeSegment: m,
                setActiveSegment: se,
                showDetails: w,
                setShowDetails: z,
                showRelated: S,
                setShowRelated: N,
                onTabsFocused: function (e) {
                  var r = null == e ? void 0 : e.event;
                  (!r || "ArrowUp" !== r.key && 38 !== r.keyCode) && ie("tabs", "start", 60);
                }
              }), (0, A.jsx)("div", {
                className: P.contentArea,
                children: S ? (0, A.jsx)($, {
                  programs: I,
                  isLoading: R,
                  isFetchingNextPage: B,
                  hasNextPage: E,
                  fetchNextPage: O,
                  onProgramPress: q
                }) : w ? (0, A.jsx)(U, {
                  programDetail: a
                }) : (0, A.jsx)(ee, {
                  slug: s || "",
                  activeSegment: m,
                  activeSeason: v,
                  setActiveSeason: b,
                  onLoaded: le,
                  showChapter: a.active_number,
                  progressMap: L,
                  onChapterPress: ue
                })
              })]
            })]
          })]
        })
      });
    }
    return e("default", function () {
      var e = c().slug,
        r = d((0, j.useState)(!0), 2),
        t = r[0],
        o = r[1],
        n = k(e || ""),
        a = n.data,
        i = n.isLoading,
        s = n.isError,
        l = i || t;
      return i ? (0, A.jsx)(h, {}) : s || !a ? (0, A.jsx)("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "#ef4444",
          fontSize: "var(--font-size-subtitle)"
        },
        children: "Error al cargar el programa"
      }) : (0, A.jsxs)(A.Fragment, {
        children: [l && (0, A.jsx)(h, {}), (0, A.jsx)("div", {
          style: {
            visibility: l ? "hidden" : "visible"
          },
          children: !0 === a.single_episode ? (0, A.jsx)(q, {
            program: a,
            setIsLoading: o
          }) : (0, A.jsx)(re, {
            program: a,
            slug: e || "",
            setIsLoading: o
          })
        })]
      });
    }), {
      setters: [function (e) {
        n = e.$, i = e.K, l = e.U, c = e.W, p = e.X, f = e.Z, g = e.q, m = e.t;
      }, function (e) {
        h = e.n, _ = e.o, v = e.t;
      }, function (e) {
        b = e.t;
      }, function (e) {
        y = e.t;
      }, function (e) {
        x = e.t;
      }, function (e) {
        w = e.t;
      }],
      execute: function () {
        (z = document.createElement("style")).textContent = "._bannerWrapper_1gzop_2{z-index:-1;background-color:rgba(0,0,0,.8);height:100vh;position:fixed;top:0;left:0;right:0;overflow:hidden}._bannerImage_1gzop_13{background-position:50%;background-repeat:no-repeat;background-size:cover;position:absolute;top:0;bottom:0;left:0;right:0}._bannerGradientLeft_1gzop_24{background:linear-gradient(90deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,.4) 50%,transparent 100%);width:33.35%;position:absolute;top:0;bottom:0;left:0}._bannerGradientBottom_1gzop_36{background:linear-gradient(transparent 0%,rgba(0,0,0,.4) 50%,rgba(0,0,0,.8) 100%);height:50%;position:absolute;bottom:0;left:0;right:0}._bannerOverlay_1gzop_48{background-color:rgba(0,0,0,.8);position:absolute;top:0;bottom:0;left:0;right:0}._infoBanner_1gzop_58{flex-direction:column;justify-content:flex-start;width:100%;min-height:940px;display:flex;position:relative}._logoContainer_1gzop_68{max-width:15vw;max-height:20vw;position:absolute;top:7vw;left:3vw;overflow:hidden}._logoImg_1gzop_77{object-fit:cover;filter:drop-shadow(0 2px 8px rgba(0,0,0,.7));border-radius:10px;max-width:15vw;max-height:20vw}._titleFallback_1gzop_85{color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.5);font-family:Archia,Arial,Helvetica,sans-serif;font-size:2.5rem;font-weight:700;position:absolute;top:7vw;left:3vw}._metaRow_1gzop_97{flex-direction:column;max-width:30vw;display:flex;position:absolute;top:25vw;left:3vw}._badge_1gzop_106{color:#fff;text-transform:capitalize;background-color:#00ad86;border-radius:10px;width:fit-content;margin-bottom:.5rem;padding:10px;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.2rem;font-weight:500;display:inline-block}._metaText_1gzop_120{color:#fff;white-space:nowrap;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.3rem;font-weight:500}._description_1gzop_129{color:#fff;word-break:break-word;max-width:30vw;margin-top:1rem;margin-bottom:1rem;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:500}._actionRow_1gzop_141{align-items:center;display:flex;position:absolute;bottom:6vw;left:2vw}._actionRow_1gzop_141>*+*{margin-left:1rem}._playBtn_1gzop_154{cursor:pointer;background-color:rgba(0,0,0,.6);border:4px solid transparent;border-radius:5rem;justify-content:center;align-items:center;width:12vw;height:8vh;font-family:Archia,Arial,Helvetica,sans-serif;transition:all .2s;display:flex}._playBtn_1gzop_154._focused_1gzop_168,._playBtn_1gzop_154:hover{border-color:#ffe500}._playIcon_1gzop_173{color:#ffe500;margin-right:.5rem;font-size:2.5rem}._playText_1gzop_179{color:#fff;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:600}._progressUnderAction_1gzop_187{position:absolute;bottom:3vw;left:2vw}._progressTitle_1gzop_193{color:var(--clr-primary-text);opacity:.85;white-space:nowrap;margin:0 0 .3vh;font-size:.85rem}._progressBarContainer_1gzop_201{align-items:center;margin-bottom:1vh;display:flex}._progressBarContainer_1gzop_201>*+*{margin-left:.8rem}._progressBarOuter_1gzop_211{background-color:rgba(255,255,255,.2);border-radius:2px;flex-shrink:0;width:12vw;height:4px;overflow:hidden}._progressBarInner_1gzop_220{background-color:#ffe500;border-radius:2px;height:100%}._progressLabel_1gzop_226{font-size:var(--font-size-subtext);color:rgba(255,255,255,.5);margin-top:.3rem}._progressRemaining_1gzop_232{color:rgba(255,255,255,.7);white-space:nowrap;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1rem;font-weight:500}._tabsWrapper_1gzop_241{border-bottom:1px solid rgba(255,255,255,.12);padding:0 2rem;overflow:hidden}._tabsTrack_1gzop_247{will-change:transform;height:60px;padding-right:4rem;transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex}._tabItem_1gzop_255{color:#fff;cursor:pointer;white-space:nowrap;background:0 0;border:none;border-bottom:.3rem solid transparent;border-top-left-radius:20px;border-top-right-radius:20px;outline:none;flex-shrink:0;align-items:center;margin-bottom:-1px;padding:8px 40px;font-family:inherit;font-size:1.3rem;font-weight:400;transition:all .2s;display:flex;position:relative}._tabItemActive_1gzop_278{border-bottom-color:#ffe500;font-weight:500}._tabItemFocused_1gzop_284,._tabItem_1gzop_255:hover{background-color:rgba(255,255,255,.1);border-bottom-color:#ffe500}._mainContent_1gzop_291{position:relative}._contentArea_1gzop_296{padding:0 2rem 6vh}._seasonsRow_1gzop_301{scrollbar-width:none;scroll-behavior:smooth;flex-direction:column;flex-shrink:0;min-width:220px;max-width:260px;max-height:calc(100vh - 120px);margin-top:40px;margin-right:176px;padding-right:8px;display:flex;overflow-x:hidden;overflow-y:auto}._seasonsRow_1gzop_301>*+*{margin-top:16px}._seasonsRow_1gzop_301::-webkit-scrollbar{display:none}._seasonItem_1gzop_325{color:#fff;text-transform:capitalize;text-align:center;cursor:pointer;background:0 0;border:none;border-radius:24px;justify-content:center;align-items:center;min-width:210px;min-height:60px;margin-bottom:0;padding:8px 1rem;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.2rem;font-weight:700;transition:background .2s;display:flex}._seasonItemActive_1gzop_346{background-color:rgba(0,0,0,.6)}._seasonItemFocused_1gzop_350,._seasonItem_1gzop_325:hover{color:#ffe500;background-color:rgba(0,0,0,.6)}._chaptersWrapper_1gzop_357{scrollbar-width:none;scroll-behavior:smooth;flex:1;max-height:calc(100vh - 120px);margin-top:40px;overflow-x:hidden;overflow-y:auto}._chaptersWrapper_1gzop_357::-webkit-scrollbar{display:none}._chaptersTrack_1gzop_371{flex-direction:column;display:flex}._chapterCard_1gzop_377{cursor:pointer;background:0 0;border-radius:24px;outline:none;flex-direction:row;flex-shrink:0;align-items:flex-start;width:100%;margin-bottom:12px;transition:transform .2s;display:flex}._chapterThumb_1gzop_391{background-color:#0a0a0a;border:2px solid transparent;border-radius:25px;flex-shrink:0;width:18vw;height:18vh;margin-right:16px;transition:border-color .2s;position:relative;overflow:hidden}._chapterThumb_1gzop_391._focused_1gzop_168,._chapterThumb_1gzop_391:hover{z-index:10;border-color:#ffe500}._chapterThumbImg_1gzop_411{object-fit:cover;object-position:center;border-radius:inherit;width:100%;height:100%;position:absolute;top:0;left:0}._chapterThumbPlaceholder_1gzop_422{background-color:#111;width:100%;height:100%;position:absolute;top:0;left:0}._chapterInfo_1gzop_431{flex-direction:column;flex:1;justify-content:center;min-width:0;padding:0;display:flex}._chapterNumber_1gzop_440{color:#fff;margin:0;font-size:22.5px;font-weight:700;transition:color .2s}._chapterDuration_1gzop_448{color:#fff;white-space:nowrap;margin-right:25px;font-size:20px;font-weight:400}._chapterTitle_1gzop_456{color:#fff;opacity:.85;margin:2px 0 0;font-size:20px;font-weight:400}._loadMoreWrapper_1gzop_465{flex-shrink:0;justify-content:center;align-items:center;padding:0 2rem;display:flex}._chaptersEndSpacer_1gzop_474{flex-shrink:0;width:4rem}._detailsSection_1gzop_480{min-height:44vh;display:flex}._detailsSynopsis_1gzop_485{flex:0 0 45%;padding-right:4vw}._detailsMeta_1gzop_490{flex:0 0 45%}._detailsHeading_1gzop_494{color:#fff;text-transform:capitalize;margin-bottom:1vh;font-family:Archia,Arial,Helvetica,sans-serif;font-size:2.5rem;font-weight:500}._detailsText_1gzop_503{color:#fff;text-align:justify;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400;line-height:1.7}._detailsMetaItem_1gzop_512{margin-bottom:1.5vh}._detailsLabel_1gzop_516{color:rgba(255,255,255,.5);margin-bottom:.3vh;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:600}._detailsValue_1gzop_524{color:#fff;text-transform:capitalize;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400}._statusText_1gzop_533{color:#fff;font-size:var(--font-size-caption);opacity:.7;font-weight:500}._emptyText_1gzop_540{color:rgba(255,255,255,.5);font-size:var(--font-size-caption);font-weight:500}._relatedGrid_1gzop_547{scrollbar-width:none;scroll-behavior:smooth;max-height:calc(100vh - 120px);margin-top:1rem;padding-bottom:6vh;overflow-x:hidden;overflow-y:auto}._relatedGrid_1gzop_547::-webkit-scrollbar{display:none}._relatedGridInner_1gzop_561{flex-wrap:wrap;padding:.5rem .5rem 6vh;display:flex}._relatedGridInner_1gzop_561>*{margin-bottom:20px;margin-right:20px}._relatedCard_1gzop_572{cursor:pointer;background-color:#00604e;border:3px solid transparent;border-radius:3rem;flex-shrink:0;width:20vw;height:21vh;transition:border-color .2s,transform .2s;overflow:hidden}._relatedCard_1gzop_572:hover{border-color:#ffe500}._relatedCardFocused_1gzop_588{border-color:#ffe500;transform:scale(1.02)}._relatedCardImg_1gzop_593{object-fit:cover;border-radius:3rem;width:100%;height:100%}._relatedCardFallback_1gzop_600{text-align:center;justify-content:center;align-items:center;width:100%;height:100%;padding:1rem;display:flex}._relatedCardFallbackText_1gzop_610{color:#fff;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1rem;font-weight:500}._pageWrapper_1gzop_618{width:100%;height:100vh;overflow:hidden}._pageScroller_1gzop_625{will-change:transform;transition:transform .35s cubic-bezier(.4,0,.2,1)}._favoriteBtn_1gzop_631{cursor:pointer;color:#fff;background-color:rgba(255,255,255,.15);border:2px solid transparent;border-radius:50%;justify-content:center;align-items:center;width:3.5rem;height:3.5rem;display:flex}._favoriteBtn_1gzop_631._focused_1gzop_168,._favoriteBtn_1gzop_631:hover{background-color:rgba(255,255,255,.3);border-color:#ffe500;box-shadow:0 0 12px rgba(255,229,0,.3)}._favoriteBtn_1gzop_631._active_1gzop_651{color:#ffe500}._favoriteSvg_1gzop_655{width:1.5rem;height:1.5rem}._chapterTimeBar_1gzop_661{width:100%}._chapterTimeBarInner_1gzop_665{background-color:rgba(0,0,0,.5);width:100%;height:4px;overflow:hidden}._chapterTimeBarFill_1gzop_672{background-color:#ffe500;border-radius:2px;height:100%}\n/*$vite$:1*/", document.head.appendChild(z), j = n(f(), 1), k = function (e) {
          var r,
            t = v(function () {
              return b.getProgramDetail(e);
            }, [e], {
              enabled: !!e
            });
          return {
            data: null === (r = t.data) || void 0 === r ? void 0 : r.data,
            isLoading: t.isLoading,
            isError: t.isError
          };
        }, T = function (e, t) {
          var o = d((0, j.useState)([]), 2),
            n = o[0],
            a = o[1],
            i = d((0, j.useState)(!1), 2),
            l = i[0],
            c = i[1],
            p = d((0, j.useState)(!1), 2),
            f = p[0],
            g = p[1],
            m = d((0, j.useState)(!1), 2),
            h = m[0],
            _ = m[1],
            v = d((0, j.useState)(1), 2),
            y = v[0],
            x = v[1],
            w = !!e;
          return (0, j.useEffect)(function () {
            if (w) {
              var r = !1,
                o = function () {
                  var o = u(s().m(function o() {
                    var n, i;
                    return s().w(function (o) {
                      for (;;) switch (o.p = o.n) {
                        case 0:
                          return c(!0), a([]), x(1), o.p = 1, o.n = 2, b.searchPrograms({
                            slug_exclude: e,
                            category: t,
                            page: 1,
                            limit: 8
                          });
                        case 2:
                          n = o.v, r || (a(null !== (i = n.data) && void 0 !== i ? i : []), _(1 < (n.last_page || 0))), o.n = 4;
                          break;
                        case 3:
                          o.p = 3, o.v;
                        case 4:
                          return o.p = 4, r || c(!1), o.f(4);
                        case 5:
                          return o.a(2);
                      }
                    }, o, null, [[1, 3, 4, 5]]);
                  }));
                  return function () {
                    return o.apply(this, arguments);
                  };
                }();
              return o(), function () {
                r = !0;
              };
            }
          }, [e, t, w]), {
            programs: n,
            isLoading: l,
            isFetchingNextPage: f,
            hasNextPage: h,
            fetchNextPage: (0, j.useCallback)(u(s().m(function o() {
              var n, i;
              return s().w(function (o) {
                for (;;) switch (o.p = o.n) {
                  case 0:
                    if (w && h && !f) {
                      o.n = 1;
                      break;
                    }
                    return o.a(2);
                  case 1:
                    return g(!0), n = y + 1, o.p = 2, o.n = 3, b.searchPrograms({
                      slug_exclude: e,
                      category: t,
                      page: n,
                      limit: 8
                    });
                  case 3:
                    i = o.v, a(function (e) {
                      var t;
                      return [].concat(r(e), r(null !== (t = i.data) && void 0 !== t ? t : []));
                    }), x(n), _(n < (i.last_page || 0)), o.n = 5;
                    break;
                  case 4:
                    o.p = 4, o.v;
                  case 5:
                    return o.p = 5, g(!1), o.f(5);
                  case 6:
                    return o.a(2);
                }
              }, o, null, [[2, 4, 5, 6]]);
            })), [w, h, f, y, e, t])
          };
        }, P = {
          bannerWrapper: "_bannerWrapper_1gzop_2",
          bannerImage: "_bannerImage_1gzop_13",
          bannerGradientLeft: "_bannerGradientLeft_1gzop_24",
          bannerGradientBottom: "_bannerGradientBottom_1gzop_36",
          bannerOverlay: "_bannerOverlay_1gzop_48",
          infoBanner: "_infoBanner_1gzop_58",
          logoContainer: "_logoContainer_1gzop_68",
          logoImg: "_logoImg_1gzop_77",
          titleFallback: "_titleFallback_1gzop_85",
          metaRow: "_metaRow_1gzop_97",
          badge: "_badge_1gzop_106",
          metaText: "_metaText_1gzop_120",
          description: "_description_1gzop_129",
          actionRow: "_actionRow_1gzop_141",
          playBtn: "_playBtn_1gzop_154",
          focused: "_focused_1gzop_168",
          playIcon: "_playIcon_1gzop_173",
          playText: "_playText_1gzop_179",
          progressUnderAction: "_progressUnderAction_1gzop_187",
          progressTitle: "_progressTitle_1gzop_193",
          progressBarContainer: "_progressBarContainer_1gzop_201",
          progressBarOuter: "_progressBarOuter_1gzop_211",
          progressBarInner: "_progressBarInner_1gzop_220",
          progressLabel: "_progressLabel_1gzop_226",
          progressRemaining: "_progressRemaining_1gzop_232",
          tabsWrapper: "_tabsWrapper_1gzop_241",
          tabsTrack: "_tabsTrack_1gzop_247",
          tabItem: "_tabItem_1gzop_255",
          tabItemActive: "_tabItemActive_1gzop_278",
          tabItemFocused: "_tabItemFocused_1gzop_284",
          mainContent: "_mainContent_1gzop_291",
          contentArea: "_contentArea_1gzop_296",
          seasonsRow: "_seasonsRow_1gzop_301",
          seasonItem: "_seasonItem_1gzop_325",
          seasonItemActive: "_seasonItemActive_1gzop_346",
          seasonItemFocused: "_seasonItemFocused_1gzop_350",
          chaptersWrapper: "_chaptersWrapper_1gzop_357",
          chaptersTrack: "_chaptersTrack_1gzop_371",
          chapterCard: "_chapterCard_1gzop_377",
          chapterThumb: "_chapterThumb_1gzop_391",
          chapterThumbImg: "_chapterThumbImg_1gzop_411",
          chapterThumbPlaceholder: "_chapterThumbPlaceholder_1gzop_422",
          chapterInfo: "_chapterInfo_1gzop_431",
          chapterNumber: "_chapterNumber_1gzop_440",
          chapterDuration: "_chapterDuration_1gzop_448",
          chapterTitle: "_chapterTitle_1gzop_456",
          loadMoreWrapper: "_loadMoreWrapper_1gzop_465",
          chaptersEndSpacer: "_chaptersEndSpacer_1gzop_474",
          detailsSection: "_detailsSection_1gzop_480",
          detailsSynopsis: "_detailsSynopsis_1gzop_485",
          detailsMeta: "_detailsMeta_1gzop_490",
          detailsHeading: "_detailsHeading_1gzop_494",
          detailsText: "_detailsText_1gzop_503",
          detailsMetaItem: "_detailsMetaItem_1gzop_512",
          detailsLabel: "_detailsLabel_1gzop_516",
          detailsValue: "_detailsValue_1gzop_524",
          statusText: "_statusText_1gzop_533",
          emptyText: "_emptyText_1gzop_540",
          relatedGrid: "_relatedGrid_1gzop_547",
          relatedGridInner: "_relatedGridInner_1gzop_561",
          relatedCard: "_relatedCard_1gzop_572",
          relatedCardFocused: "_relatedCardFocused_1gzop_588",
          relatedCardImg: "_relatedCardImg_1gzop_593",
          relatedCardFallback: "_relatedCardFallback_1gzop_600",
          relatedCardFallbackText: "_relatedCardFallbackText_1gzop_610",
          pageWrapper: "_pageWrapper_1gzop_618",
          pageScroller: "_pageScroller_1gzop_625",
          favoriteBtn: "_favoriteBtn_1gzop_631",
          active: "_active_1gzop_651",
          favoriteSvg: "_favoriteSvg_1gzop_655",
          chapterTimeBar: "_chapterTimeBar_1gzop_661",
          chapterTimeBarInner: "_chapterTimeBarInner_1gzop_665",
          chapterTimeBarFill: "_chapterTimeBarFill_1gzop_672"
        }, A = m(), S = 3, N = function (e, t, o) {
          var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 20,
            a = d((0, j.useState)([]), 2),
            i = a[0],
            l = a[1],
            c = d((0, j.useState)(!1), 2),
            p = c[0],
            f = c[1],
            g = d((0, j.useState)(!1), 2),
            m = g[0],
            h = g[1],
            _ = d((0, j.useState)(1), 2),
            v = _[0],
            y = _[1],
            x = d((0, j.useState)(!1), 2),
            w = x[0],
            z = x[1],
            k = d((0, j.useState)(!1), 2),
            T = k[0],
            P = k[1],
            A = !!e && null !== t && !!o;
          (0, j.useEffect)(function () {
            if (A) {
              var r = !1,
                a = function () {
                  var a = u(s().m(function a() {
                    var i;
                    return s().w(function (a) {
                      for (;;) switch (a.p = a.n) {
                        case 0:
                          return f(!0), h(!1), l([]), y(1), a.p = 1, a.n = 2, b.getChapters({
                            program: e,
                            season: t,
                            segment: o,
                            page: 1,
                            limit: n
                          });
                        case 2:
                          i = a.v, r || (l([i]), z(1 < (i.last_page || 0))), a.n = 4;
                          break;
                        case 3:
                          a.p = 3, a.v, r || h(!0);
                        case 4:
                          return a.p = 4, r || f(!1), a.f(4);
                        case 5:
                          return a.a(2);
                      }
                    }, a, null, [[1, 3, 4, 5]]);
                  }));
                  return function () {
                    return a.apply(this, arguments);
                  };
                }();
              return a(), function () {
                r = !0;
              };
            }
          }, [e, t, o, A, n]);
          var S = (0, j.useCallback)(u(s().m(function a() {
            var i, c;
            return s().w(function (a) {
              for (;;) switch (a.p = a.n) {
                case 0:
                  if (A && w && !T) {
                    a.n = 1;
                    break;
                  }
                  return a.a(2);
                case 1:
                  return P(!0), i = v + 1, a.p = 2, a.n = 3, b.getChapters({
                    program: e,
                    season: t,
                    segment: o,
                    page: i,
                    limit: n
                  });
                case 3:
                  c = a.v, l(function (e) {
                    return [].concat(r(e), [c]);
                  }), y(i), z(i < (c.last_page || 0)), a.n = 5;
                  break;
                case 4:
                  a.p = 4, a.v, h(!0);
                case 5:
                  return a.p = 5, P(!1), a.f(5);
                case 6:
                  return a.a(2);
              }
            }, a, null, [[2, 4, 5, 6]]);
          })), [A, w, T, v, e, t, o, n]);
          return {
            chapters: i.length > 0 ? {
              pages: i
            } : void 0,
            fetchNextPage: S,
            hasNextPage: w,
            isFetchingNextPage: T,
            isLoading: p,
            isError: m
          };
        }, F = 3;
      }
    };
  });
}();