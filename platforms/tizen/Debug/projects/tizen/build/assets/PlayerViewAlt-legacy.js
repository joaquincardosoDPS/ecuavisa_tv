!function () {
  function e(t) {
    return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, e(t);
  }
  function t(e) {
    return function (e) {
      if (Array.isArray(e)) return u(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    }(e) || c(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function n(e, t) {
    for (var n = 0; n < t.length; n++) {
      var o = t[n];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, r(o.key), o);
    }
  }
  function r(t) {
    var n = function (t, n) {
      if ("object" != e(t) || !t) return t;
      var r = t[Symbol.toPrimitive];
      if (void 0 !== r) {
        var o = r.call(t, n || "default");
        if ("object" != e(o)) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === n ? String : Number)(t);
    }(t, "string");
    return "symbol" == e(n) ? n : n + "";
  }
  function o() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
      t,
      n = "function" == typeof Symbol ? Symbol : {},
      r = n.iterator || "@@iterator",
      a = n.toStringTag || "@@toStringTag";
    function s(n, r, o, a) {
      var s = r && r.prototype instanceof c ? r : c,
        u = Object.create(s.prototype);
      return i(u, "_invoke", function (n, r, o) {
        var i,
          a,
          s,
          c = 0,
          u = o || [],
          d = !1,
          f = {
            p: 0,
            n: 0,
            v: e,
            a: p,
            f: p.bind(e, 4),
            d: function (t, n) {
              return i = t, a = 0, s = e, f.n = n, l;
            }
          };
        function p(n, r) {
          for (a = n, s = r, t = 0; !d && c && !o && t < u.length; t++) {
            var o,
              i = u[t],
              p = f.p,
              v = i[2];
            n > 3 ? (o = v === r) && (s = i[(a = i[4]) ? 5 : (a = 3, 3)], i[4] = i[5] = e) : i[0] <= p && ((o = n < 2 && p < i[1]) ? (a = 0, f.v = r, f.n = i[1]) : p < v && (o = n < 3 || i[0] > r || r > v) && (i[4] = n, i[5] = r, f.n = v, a = 0));
          }
          if (o || n > 1) return l;
          throw d = !0, r;
        }
        return function (o, u, v) {
          if (c > 1) throw TypeError("Generator is already running");
          for (d && 1 === u && p(u, v), a = u, s = v; (t = a < 2 ? e : s) || !d;) {
            i || (a ? a < 3 ? (a > 1 && (f.n = -1), p(a, s)) : f.n = s : f.v = s);
            try {
              if (c = 2, i) {
                if (a || (o = "next"), t = i[o]) {
                  if (!(t = t.call(i, s))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  s = t.value, a < 2 && (a = 0);
                } else 1 === a && (t = i.return) && t.call(i), a < 2 && (s = TypeError("The iterator does not provide a '" + o + "' method"), a = 1);
                i = e;
              } else if ((t = (d = f.n < 0) ? s : n.call(r, f)) !== l) break;
            } catch (t) {
              i = e, a = 1, s = t;
            } finally {
              c = 1;
            }
          }
          return {
            value: t,
            done: d
          };
        };
      }(n, o, a), !0), u;
    }
    var l = {};
    function c() {}
    function u() {}
    function d() {}
    t = Object.getPrototypeOf;
    var f = [][r] ? t(t([][r]())) : (i(t = {}, r, function () {
        return this;
      }), t),
      p = d.prototype = c.prototype = Object.create(f);
    function v(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, i(e, a, "GeneratorFunction")), e.prototype = Object.create(p), e;
    }
    return u.prototype = d, i(p, "constructor", d), i(d, "constructor", u), u.displayName = "GeneratorFunction", i(d, a, "GeneratorFunction"), i(p), i(p, a, "Generator"), i(p, r, function () {
      return this;
    }), i(p, "toString", function () {
      return "[object Generator]";
    }), (o = function () {
      return {
        w: s,
        m: v
      };
    })();
  }
  function i(e, t, n, r) {
    var o = Object.defineProperty;
    try {
      o({}, "", {});
    } catch (e) {
      o = 0;
    }
    i = function (e, t, n, r) {
      function a(t, n) {
        i(e, t, function (e) {
          return this._invoke(t, n, e);
        });
      }
      t ? o ? o(e, t, {
        value: n,
        enumerable: !r,
        configurable: !r,
        writable: !r
      }) : e[t] = n : (a("next", 0), a("throw", 1), a("return", 2));
    }, i(e, t, n, r);
  }
  function a(e, t, n, r, o, i, a) {
    try {
      var s = e[i](a),
        l = s.value;
    } catch (e) {
      return void n(e);
    }
    s.done ? t(l) : Promise.resolve(l).then(r, o);
  }
  function s(e) {
    return function () {
      var t = this,
        n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);
        function s(e) {
          a(i, r, o, s, l, "next", e);
        }
        function l(e) {
          a(i, r, o, s, l, "throw", e);
        }
        s(void 0);
      });
    };
  }
  function l(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != n) {
        var r,
          o,
          i,
          a,
          s = [],
          l = !0,
          c = !1;
        try {
          if (i = (n = n.call(e)).next, 0 === t) {
            if (Object(n) !== n) return;
            l = !1;
          } else for (; !(l = (r = i.call(n)).done) && (s.push(r.value), s.length !== t); l = !0);
        } catch (e) {
          c = !0, o = e;
        } finally {
          try {
            if (!l && null != n.return && (a = n.return(), Object(a) !== a)) return;
          } finally {
            if (c) throw o;
          }
        }
        return s;
      }
    }(e, t) || c(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function c(e, t) {
    if (e) {
      if ("string" == typeof e) return u(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0;
    }
  }
  function u(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./catalogService-legacy.js", "./historyService-legacy.js", "./VastPlayer-legacy.js"], function (e, r) {
    var i, a, c, u, d, f, p, v, m, h, g, y, C, b, x, w, k, _, S, E, A, P, j, T, L, R, I, M, B, N, F, V, U, K, O, Y, z, H, W, Z, X, D, G, q, $, Q, J, ee, te, ne, re;
    function oe(e) {
      return {
        chapter: e.chapter,
        date_create: e.date_create,
        date_update: e.date_update,
        description: e.description,
        duration: e.duration,
        image: e.image,
        image_land: e.image_land,
        key: e.key,
        key_segment: e.key_segment,
        m3u8: e.m3u8,
        name_program: e.name_program,
        name_segment: e.name_segment,
        restriction: e.restriction,
        season: e.season,
        slug: e.slug,
        title: e.title,
        title_complete: e.title_complete
      };
    }
    return e("default", function () {
      var e,
        t = (e = u(), {
          goToEpisode: function (t, n, r) {
            e("/play/".concat(t, "/").concat(n.key_segment || r || "", "/").concat(n.season, "/").concat(n.chapter));
          }
        }).goToEpisode,
        n = function () {
          var e = d(),
            t = e.program,
            n = e.segment,
            r = e.season,
            i = e.chapter,
            a = u(),
            c = b(function (e) {
              return e.token;
            }),
            f = b(function (e) {
              return e.activeProfile;
            }),
            p = l((0, j.useState)(!0), 2),
            v = p[0],
            m = p[1],
            h = l((0, j.useState)(null), 2),
            g = h[0],
            y = h[1],
            C = l((0, j.useState)(""), 2),
            x = C[0],
            _ = C[1],
            S = l((0, j.useState)(""), 2),
            E = S[0],
            A = S[1],
            P = l((0, j.useState)(""), 2),
            T = P[0],
            I = P[1],
            M = l((0, j.useState)(""), 2),
            B = M[0],
            N = M[1],
            F = l((0, j.useState)(""), 2),
            V = F[0],
            U = F[1],
            K = l((0, j.useState)(""), 2),
            O = K[0],
            Y = K[1],
            z = l((0, j.useState)(""), 2),
            H = z[0],
            W = z[1],
            Z = l((0, j.useState)(void 0), 2),
            X = Z[0],
            D = Z[1],
            G = l((0, j.useState)(void 0), 2),
            q = G[0],
            $ = G[1],
            Q = l((0, j.useState)(null), 2),
            J = Q[0],
            ee = Q[1],
            te = l((0, j.useState)([]), 2),
            ne = te[0],
            re = te[1],
            oe = l((0, j.useState)(!1), 2),
            ie = oe[0],
            ae = oe[1],
            se = l((0, j.useState)(R), 2),
            le = se[0],
            ce = se[1],
            ue = (0, j.useRef)(!1),
            de = (0, j.useRef)(!1),
            fe = (0, j.useRef)(!1),
            pe = (0, j.useRef)(null);
          return pe.current = J, (0, j.useEffect)(function () {
            var e = !1,
              a = function () {
                var a = s(o().m(function a() {
                  var l, u, d, p, v, h, g, C, b, x, S, E, P, j, T, R, M;
                  return o().w(function (a) {
                    for (;;) switch (a.p = a.n) {
                      case 0:
                        if (a.p = 0, m(!0), y(null), n && r && i) {
                          a.n = 1;
                          break;
                        }
                        return y("Parámetros de ruta incompletos"), m(!1), a.a(2);
                      case 1:
                        if (v = parseInt(r, 10), h = parseInt(i, 10), !(g = 0 === v && 0 === h)) {
                          a.n = 7;
                          break;
                        }
                        return a.n = 2, w.getChapters({
                          program: t,
                          page: 1,
                          limit: 1
                        });
                      case 2:
                        if (P = l = a.v, E = null === P) {
                          a.n = 3;
                          break;
                        }
                        E = void 0 === l;
                      case 3:
                        if (S = E) {
                          a.n = 4;
                          break;
                        }
                        S = null === (l = l.data) || void 0 === l;
                      case 4:
                        if (!S) {
                          a.n = 5;
                          break;
                        }
                        j = void 0, a.n = 6;
                        break;
                      case 5:
                        j = l[0];
                      case 6:
                        C = j, a.n = 12;
                        break;
                      case 7:
                        return a.n = 8, w.getChapterBySlug({
                          program: t,
                          segment: n,
                          season: v,
                          chapter: h
                        });
                      case 8:
                        if (R = u = a.v, T = null === R) {
                          a.n = 9;
                          break;
                        }
                        T = void 0 === u;
                      case 9:
                        if (!T) {
                          a.n = 10;
                          break;
                        }
                        M = void 0, a.n = 11;
                        break;
                      case 10:
                        M = u.data;
                      case 11:
                        C = M;
                      case 12:
                        if (null !== (d = C) && void 0 !== d && d.key) {
                          a.n = 13;
                          break;
                        }
                        return e || (y("Capítulo no encontrado"), m(!1)), a.a(2);
                      case 13:
                        if (!e) {
                          a.n = 14;
                          break;
                        }
                        return a.a(2);
                      case 14:
                        return _(C.key), A(C.name_program || C.title || ""), I(g ? "" : "T".concat(C.season, ":E").concat(C.chapter)), N(C.slug), W(C.m3u8), U((null === (p = C.image_land) || void 0 === p ? void 0 : p.big) || ""), Y(C.key_program || ""), a.p = 15, a.n = 16, L.getVodAds(C.key);
                      case 16:
                        b = a.v, !e && b && D(L.getPrerollVastUrl(b)), a.n = 18;
                        break;
                      case 17:
                        a.p = 17, a.v;
                      case 18:
                        if (!e) {
                          a.n = 19;
                          break;
                        }
                        return a.a(2);
                      case 19:
                        return m(!1), x = [], c && f && x.push(s(o().m(function t() {
                          var n, r, i, a, s;
                          return o().w(function (t) {
                            for (;;) switch (t.p = t.n) {
                              case 0:
                                return t.p = 0, t.n = 1, k.getTimeline(c, f.id, [C.slug]);
                              case 1:
                                if (a = n = t.v.data, i = null === a) {
                                  t.n = 2;
                                  break;
                                }
                                i = void 0 === n;
                              case 2:
                                if (!i) {
                                  t.n = 3;
                                  break;
                                }
                                s = void 0, t.n = 4;
                                break;
                              case 3:
                                s = n[0];
                              case 4:
                                r = s, !e && r && 0 === r.end && r.time > 0 && $(r.time), t.n = 6;
                                break;
                              case 5:
                                t.p = 5, t.v;
                              case 6:
                                return t.a(2);
                            }
                          }, t, null, [[0, 5]]);
                        }))()), g ? e || ee(null) : (x.push(s(o().m(function r() {
                          var i, a;
                          return o().w(function (r) {
                            for (;;) switch (r.p = r.n) {
                              case 0:
                                return r.p = 0, r.n = 1, w.getChapterBySlug({
                                  program: t,
                                  segment: n,
                                  season: v,
                                  chapter: h + 1
                                });
                              case 1:
                                a = r.v, !e && null != a && null !== (i = a.data) && void 0 !== i && i.key ? ee(a.data) : e || ee(null), r.n = 3;
                                break;
                              case 2:
                                r.p = 2, r.v, e || ee(null);
                              case 3:
                                return r.a(2);
                            }
                          }, r, null, [[0, 2]]);
                        }))()), x.push(s(o().m(function r() {
                          var i;
                          return o().w(function (r) {
                            for (;;) switch (r.p = r.n) {
                              case 0:
                                return r.p = 0, r.n = 1, w.getChapters({
                                  program: t,
                                  segment: n,
                                  season: v,
                                  limit: 50
                                });
                              case 1:
                                i = r.v, !e && null != i && i.data && re(i.data), r.n = 3;
                                break;
                              case 2:
                                r.p = 2, r.v;
                              case 3:
                                return r.a(2);
                            }
                          }, r, null, [[0, 2]]);
                        }))())), a.n = 20, Promise.all(x);
                      case 20:
                        a.n = 22;
                        break;
                      case 21:
                        a.p = 21, a.v, e || (y("Error al cargar el episodio"), m(!1));
                      case 22:
                        return a.a(2);
                    }
                  }, a, null, [[15, 17], [0, 21]]);
                }));
                return function () {
                  return a.apply(this, arguments);
                };
              }();
            return a(), function () {
              e = !0;
            };
          }, [t, n, r, i, c, f]), (0, j.useEffect)(function () {
            ae(!1), ue.current = !1, de.current = !1, fe.current = !1, ee(null), ce(R), $(void 0);
          }, [n, r, i]), {
            loading: v,
            error: g,
            currentKey: x,
            episodeTitle: E,
            programTitle: T,
            vodSlug: B,
            chapterImage: V,
            initialSeconds: q,
            nextChapter: J,
            episodes: ne,
            m3u8: H,
            vastUrl: X,
            segment: n,
            isShrunk: ie,
            remainingSeconds: le,
            expandPlayer: function () {
              ae(!1), ue.current = !1, de.current = !0, fe.current = !0;
            },
            handleTimeUpdate: function (e, r) {
              if (r > 0) {
                var o = r - e;
                if (o > R && de.current && (de.current = !1), o <= R && o > 0 && !ue.current && !de.current && (ue.current = !0, ae(!0)), ue.current && pe.current) {
                  var i = Math.max(0, Math.ceil(o));
                  ce(i), i <= 1 && !fe.current && n && (fe.current = !0, a("/play/".concat(t, "/").concat(n, "/").concat(pe.current.season, "/").concat(pe.current.chapter)));
                }
              }
            },
            token: c,
            activeProfile: f,
            playNext: function () {
              J && n && t && a("/play/".concat(t, "/").concat(n, "/").concat(J.season, "/").concat(J.chapter));
            },
            goBack: function () {
              a("/programas/".concat(O || t));
            },
            goToEpisodes: function () {
              var e = O || t;
              e && a("/programas/".concat(e));
            },
            programKey: O
          };
        }(),
        r = n.loading,
        i = n.error,
        a = n.currentKey,
        p = n.episodeTitle,
        v = n.programTitle,
        h = n.vodSlug,
        g = n.m3u8,
        y = n.vastUrl,
        x = n.initialSeconds,
        _ = n.episodes,
        S = n.goBack,
        E = n.token,
        A = n.activeProfile,
        P = n.programKey,
        T = n.segment,
        M = l((0, j.useState)(!1), 2),
        B = M[0],
        N = M[1],
        F = l((0, j.useState)(null), 2),
        V = F[0],
        U = F[1],
        K = l((0, j.useState)(re), 2),
        O = K[0],
        Y = K[1],
        z = (0, j.useRef)(!1),
        H = (0, j.useRef)(!1),
        W = m({
          focusKey: "PLAYER-PAGE",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        Z = W.ref,
        X = W.focusKey;
      (0, j.useEffect)(function () {
        z.current = !1, H.current = !1, N(!1), U(null), Y(re);
      }, [a]), (0, j.useEffect)(function () {
        r || i || f("PLAYER-VIEW");
      }, [r, i]), (0, j.useEffect)(function () {
        if (r || i) {
          var e = function (e) {
            "Escape" !== e.key && "GoBack" !== e.key && "XF86Back" !== e.key && 10009 !== e.keyCode && 461 !== e.keyCode && 27 !== e.keyCode || (e.preventDefault(), e.stopPropagation(), S());
          };
          return window.addEventListener("keydown", e), function () {
            return window.removeEventListener("keydown", e);
          };
        }
      }, [r, i, S]);
      var D = _.map(oe),
        G = (0, j.useCallback)(function (e) {
          N(!1), t(P || "", e, T);
        }, [t, P, T]),
        q = (0, j.useCallback)(function () {
          H.current || (H.current = !0, V ? G(V) : S());
        }, [V, G, S]),
        $ = (0, j.useCallback)(function (e, t) {
          if (!(t <= 0)) {
            var n = t - e;
            if (n <= re && n >= -1) {
              if (!z.current) {
                z.current = !0;
                var r = null;
                if (D.length > 0 && a) {
                  var o = D.find(function (e) {
                    return e.key === a;
                  });
                  if (o) {
                    var i = D.find(function (e) {
                      return e.season === o.season && e.chapter === o.chapter + 1;
                    });
                    i && (r = i);
                  }
                }
                r && (U(r), N(!0), setTimeout(function () {
                  f("CARD-NEXT-EP");
                }, 200));
              }
              Y(Math.max(0, Math.ceil(n))), n <= 0 && q();
            } else z.current && n > re && (z.current = !1, H.current = !1, N(!1), U(null));
          }
        }, [D, a, q]),
        J = (0, j.useCallback)(function () {
          q();
        }, [q]);
      return r ? (0, I.jsx)("div", {
        className: ne.playerPage,
        children: (0, I.jsx)(C, {})
      }) : !i && a && g ? (0, I.jsx)(c.Provider, {
        value: X,
        children: (0, I.jsxs)("div", {
          ref: Z,
          className: ne.playerPage,
          children: [(0, I.jsx)(Q, {
            src: g,
            title: p,
            description: v,
            rudoKey: a,
            vastUrl: y,
            autoplay: !0,
            onBack: S,
            pipMode: !1,
            forceControlsVisible: B,
            onTimeUpdate: $,
            onEnded: J,
            initialSeconds: x,
            vodSlug: h,
            userToken: E || void 0,
            userProfile: (null == A ? void 0 : A.id) || void 0
          }), B && V && (0, I.jsx)(te, {
            episode: V,
            countdown: O,
            threshold: re,
            onNextEpisode: G
          })]
        })
      }) : (0, I.jsx)("div", {
        className: ne.playerPage,
        children: (0, I.jsx)("div", {
          className: ne.errorContainer,
          children: (0, I.jsx)("p", {
            className: ne.errorText,
            children: i || "No se pudo cargar el episodio"
          })
        })
      });
    }), {
      setters: [function (e) {
        i = e.$, a = e.I, c = e.K, u = e.U, d = e.W, f = e.X, p = e.Z, v = e.i, m = e.q, h = e.t, g = e.w;
      }, function (e) {
        y = e.c, C = e.n, b = e.o, x = e.r;
      }, function (e) {
        w = e.t;
      }, function (e) {
        k = e.t;
      }, function (e) {
        _ = e.i, S = e.n, E = e.r, A = e.t;
      }],
      execute: function () {
        var e;
        (P = document.createElement("style")).textContent = ".video-player-container{background-color:#000;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:relative;overflow:hidden}.video-player-container.pip-active{background-color:transparent}#hls-video-player{object-fit:contain;transform-origin:100% 100%;width:100vw;max-width:100%;height:auto;max-height:100%;transition:transform .6s ease-out,border-color .2s ease-out,box-shadow .2s ease-out;display:block}#hls-video-player.hidden{display:none}#hls-video-player.pip-mode{z-index:10;cursor:pointer;box-sizing:border-box;border:.6vw solid transparent;border-radius:12px;transition:transform .6s ease-out,border-color .2s ease-out,box-shadow .2s ease-out;position:relative;transform:scale(.25)translate(-15%,-15%)}#hls-video-player.pip-mode.focused{border-color:var(--foc-primary);box-shadow:0 0 3vw var(--foc-primary)}.video-player-spinner{z-index:10;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}@keyframes pipBgFadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}._card_1ms2a_3{z-index:1000;box-sizing:border-box;cursor:pointer;opacity:0;background:rgba(10,10,10,.92);border:.15vw solid rgba(255,255,255,.08);border-radius:.8vw;flex-direction:column;width:28vw;padding:1vw;transition:border-color .2s ease-out,box-shadow .2s ease-out;animation:.5s ease-out forwards _cardSlideIn_1ms2a_1;display:flex;position:fixed;bottom:9vw;right:3vw;transform:translateY(2vw)}._card_1ms2a_3._focused_1ms2a_26,._card_1ms2a_3:hover{border-color:var(--foc-primary);box-shadow:0 0 1.5vw var(--foc-primary)}@keyframes _cardSlideIn_1ms2a_1{0%{opacity:0;transform:translateY(2vw)}to{opacity:1;transform:translateY(0)}}._header_1ms2a_45{color:var(--clr-primary);letter-spacing:.05vw;text-transform:uppercase;margin-bottom:.6vw;font-family:Roboto,sans-serif;font-size:.8vw;font-weight:700}._body_1ms2a_56{flex-direction:row;align-items:center;margin-bottom:.6vw;display:flex}._thumbnailWrapper_1ms2a_64{aspect-ratio:16/9;border-radius:.4vw;flex-shrink:0;width:14vw;position:relative;overflow:hidden}._thumbnail_1ms2a_64{object-fit:cover;width:100%;height:100%;display:block}._countdownOverlay_1ms2a_81{text-align:center;color:#fff;background:linear-gradient(transparent 0%,rgba(0,0,0,.9) 100%);padding:1.2vw .4vw .3vw;font-family:Roboto,sans-serif;font-size:.75vw;font-weight:700;position:absolute;bottom:0;left:0;right:0}._countdownNumber_1ms2a_95{text-align:center;font-variant-numeric:tabular-nums;min-width:2ch;color:var(--clr-primary);display:inline-block}._episodeTitle_1ms2a_104{color:var(--clr-primary-text,#fff);-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-left:.8vw;font-family:Roboto,sans-serif;font-size:.85vw;font-weight:600;line-height:1.3;display:-webkit-box;overflow:hidden}._progressBar_1ms2a_118{background:rgba(255,255,255,.1);border-radius:.1vw;width:100%;height:.15vw;overflow:hidden}._progressFill_1ms2a_126{background:var(--clr-primary);border-radius:.1vw;height:100%;transition:width 1s linear}._playerPage_xphv0_1{z-index:100;background:#000;width:100vw;height:100vh;position:fixed;top:0;bottom:0;left:0;right:0;overflow:hidden}._errorContainer_xphv0_11{justify-content:center;align-items:center;width:100%;height:100%;display:flex}._errorText_xphv0_19{color:var(--clr-primary-text);font-size:1.2rem}\n/*$vite$:1*/", document.head.appendChild(P), j = i(p(), 1), T = function () {
          return e = function e() {
            !function (e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }(this, e);
          }, r = [{
            key: "parseVmapXml",
            value: function (e) {
              try {
                var t = new DOMParser().parseFromString(e, "text/xml"),
                  n = t.querySelector("parsererror");
                if (n) throw new Error("Error parsing XML: " + n.textContent);
                var r = t.querySelectorAll("vmap\\:AdBreak, AdBreak"),
                  o = [];
                r.forEach(function (e) {
                  var t = e.getAttribute("timeOffset") || "",
                    n = e.getAttribute("breakType") || "",
                    r = e.getAttribute("breakId") || "",
                    i = e.querySelector("vmap\\:AdSource, AdSource");
                  if (i) {
                    var a = i.querySelector("vmap\\:AdTagURI, AdTagURI");
                    if (a) {
                      var s,
                        l = (null === (s = a.textContent) || void 0 === s ? void 0 : s.trim()) || "";
                      o.push({
                        timeOffset: t,
                        breakType: n,
                        breakId: r,
                        adSource: {
                          id: i.getAttribute("id") || "",
                          allowMultipleAds: "true" === i.getAttribute("allowMultipleAds"),
                          followRedirects: "true" === i.getAttribute("followRedirects"),
                          adTagUri: l
                        }
                      });
                    }
                  }
                });
                var i = o.filter(function (e) {
                    return "start" === e.timeOffset;
                  }),
                  a = o.filter(function (e) {
                    return "end" === e.timeOffset;
                  }),
                  s = o.filter(function (e) {
                    return "start" !== e.timeOffset && "end" !== e.timeOffset;
                  });
                return {
                  hasAds: o.length > 0,
                  totalAdBreaks: o.length,
                  adBreaks: o,
                  prerollAds: i,
                  midrollAds: s,
                  postrollAds: a
                };
              } catch (l) {
                return console.warn("[VmapParser] Error parseando VMAP:", l), {
                  hasAds: !1,
                  totalAdBreaks: 0,
                  adBreaks: [],
                  prerollAds: [],
                  midrollAds: [],
                  postrollAds: []
                };
              }
            }
          }], (t = null) && n(e.prototype, t), r && n(e, r), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
          var e, t, r;
        }(), L = {
          getVodAds: (e = s(o().m(function e(t) {
            var n, r, i, s;
            return o().w(function (e) {
              for (;;) switch (e.p = e.n) {
                case 0:
                  return n = "".concat(g, "/").concat(t, "?client=").concat(v), e.p = 1, console.log("[AdsService] Consultando VMAP:", n), e.n = 2, a.get(n);
                case 2:
                  return r = e.v, i = T.parseVmapXml(r.data), console.log("[AdsService] VMAP parseado:", {
                    hasAds: i.hasAds,
                    prerolls: i.prerollAds.length,
                    midrolls: i.midrollAds.length,
                    postrolls: i.postrollAds.length
                  }), e.a(2, i);
                case 3:
                  return e.p = 3, s = e.v, console.warn("[AdsService] Error obteniendo ads:", s), e.a(2, null);
              }
            }, e, null, [[1, 3]]);
          })), function (t) {
            return e.apply(this, arguments);
          }),
          getPrerollVastUrl: function (e) {
            if (e.hasAds && 0 !== e.prerollAds.length) return e.prerollAds[0].adSource.adTagUri || void 0;
          }
        }, R = 30, I = h(), M = function (e) {
          var t = e.title,
            n = e.description,
            r = e.isVisible,
            o = (e.isLive, e.onBackClick),
            i = m({
              focusKey: "PLAYER-BTN-BACK",
              onEnterPress: function () {
                return null == o ? void 0 : o();
              },
              onArrowPress: function (e) {
                return "up" !== e && "left" !== e && "right" !== e && ("down" !== e || (f("PLAYER-BTN-PLAYPAUSE"), !1));
              }
            }),
            a = i.ref,
            s = i.focused;
          return (0, I.jsx)("div", {
            style: {
              position: "fixed",
              top: 44,
              left: 40,
              right: 40,
              zIndex: 2001,
              visibility: r ? "visible" : "hidden",
              pointerEvents: r ? "auto" : "none",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              color: "var(--clr-primary-text)"
            },
            children: (0, I.jsxs)("div", {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "20px"
              },
              children: [(0, I.jsx)("button", {
                ref: a,
                onClick: o,
                style: {
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  outline: "none",
                  padding: 0,
                  flexShrink: 0,
                  background: "none",
                  border: "none",
                  color: s ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
                  transition: "color 0.15s ease",
                  borderRadius: "50%"
                },
                children: (0, I.jsx)("span", {
                  style: {
                    display: "inline-flex",
                    width: 28,
                    height: 28
                  },
                  dangerouslySetInnerHTML: {
                    __html: '<svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M15.3882 0.616323C15.7799 1.01107 16 1.5464 16 2.10458C16 2.66275 15.7799 3.19808 15.3882 3.59283L5.04411 14.0127L15.3882 24.4326C15.7688 24.8296 15.9795 25.3613 15.9747 25.9133C15.9699 26.4652 15.7502 26.9932 15.3627 27.3835C14.9753 27.7737 14.4511 27.9951 13.9032 27.9999C13.3553 28.0047 12.8274 27.7925 12.4333 27.4091L0.611839 15.501C0.220079 15.1062 9.53674e-07 14.5709 9.53674e-07 14.0127C9.53674e-07 13.4545 0.220079 12.9192 0.611839 12.5245L12.4333 0.616323C12.8252 0.221692 13.3566 0 13.9107 0C14.4649 0 14.9963 0.221692 15.3882 0.616323Z" fill="currentColor"/>\n</svg>\n'.replace(/width="[^"]*"/, 'width="28"').replace(/height="[^"]*"/, 'height="28"')
                  }
                })
              }), (0, I.jsxs)("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "none",
                  maxWidth: "60vw",
                  marginLeft: "10px"
                },
                children: [(0, I.jsx)("h1", {
                  style: {
                    margin: 0,
                    fontWeight: 500,
                    fontSize: "1.8rem",
                    lineHeight: 1
                  },
                  children: t
                }), n && (0, I.jsx)("h2", {
                  style: {
                    fontWeight: 500,
                    fontSize: "1.3rem",
                    opacity: .9
                  },
                  children: n
                })]
              })]
            })
          });
        }, B = j.memo(M), N = function (e) {
          var t = e.episode,
            n = e.isCurrent,
            r = e.onSelect,
            o = e.onCloseAll,
            i = e.currentEpisodeKey;
          return (0, I.jsx)("div", {
            onClick: function () {
              t.key !== i ? r(t) : o();
            },
            style: {
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              cursor: "pointer",
              borderRadius: "8px",
              transition: "background-color 0.2s ease"
            },
            children: (0, I.jsx)("span", {
              style: {
                color: n ? "#ff3c00" : "#fff",
                fontWeight: "bold",
                fontSize: "1.4rem",
                lineHeight: 1.3,
                flex: 1
              },
              children: t.title
            })
          });
        }, F = j.memo(N), V = function (e) {
          var t = e.episodes,
            n = void 0 === t ? [] : t,
            r = e.currentEpisodeKey,
            o = e.visible,
            i = e.onClose,
            a = e.onCloseAll,
            s = e.onEpisodeSelect;
          return (0, I.jsxs)(I.Fragment, {
            children: [(0, I.jsx)("div", {
              onClick: i,
              style: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                opacity: o ? 1 : 0,
                visibility: o ? "visible" : "hidden",
                transition: "opacity 0.3s ease, visibility 0.3s ease",
                zIndex: 2001
              }
            }), (0, I.jsx)("div", {
              onClick: function (e) {
                return e.stopPropagation();
              },
              style: {
                position: "fixed",
                top: 0,
                right: 0,
                width: "350px",
                height: "100vh",
                backgroundColor: "transparent",
                transform: o ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.3s ease",
                zIndex: 2002,
                display: "block",
                padding: "32px 16px",
                overflowY: "auto"
              },
              children: (0, I.jsx)("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: "50vh",
                  paddingTop: "50vh"
                },
                children: n.map(function (e, t) {
                  return (0, I.jsx)(F, {
                    episode: e,
                    isCurrent: e.key === r,
                    onSelect: s,
                    onCloseAll: a,
                    currentEpisodeKey: r
                  }, e.key || t);
                })
              })
            })]
          });
        }, U = j.memo(V), K = function (e, t) {
          return e.replace(/width="[^"]*"/, 'width="'.concat(t, '"')).replace(/height="[^"]*"/, 'height="'.concat(t, '"'));
        }, O = function (e) {
          var t = e.seconds,
            n = e.onClick,
            r = t > 0,
            o = r ? "Avanzar ".concat(Math.abs(t), " segundos") : "Retroceder ".concat(Math.abs(t), " segundos"),
            i = m({
              focusKey: "PLAYER-BTN-SKIP-".concat(r ? "FWD" : "REW"),
              onEnterPress: function () {
                return null == n ? void 0 : n();
              },
              onArrowPress: function (e) {
                return "down" === e ? (f("PLAYER-SEEKBAR-THUMB"), !1) : "up" !== e || (f("PLAYER-BTN-BACK"), !1);
              }
            }),
            a = i.ref,
            s = i.focused;
          return (0, I.jsx)("button", {
            ref: a,
            onClick: n,
            style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: s ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
              outline: "none",
              transition: "color 0.15s ease"
            },
            title: o,
            children: (0, I.jsx)("span", {
              style: {
                display: "inline-flex",
                width: 32,
                height: 32
              },
              dangerouslySetInnerHTML: {
                __html: K(r ? '<svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M15.6362 34.0886C13.4767 34.0886 11.4535 33.68 9.56641 32.8626C7.67936 32.0553 6.01937 30.9352 4.58643 29.5022C3.15348 28.0693 2.02832 26.4093 1.21094 24.5222C0.403646 22.6352 0 20.6119 0 18.4524C0 16.5553 0.317871 14.7591 0.953613 13.0637C1.58936 11.3684 2.47233 9.83962 3.60254 8.47732C4.74284 7.10492 6.06982 5.95958 7.5835 5.04128C9.10726 4.12299 10.7572 3.48725 12.5332 3.13406V1.10574C12.5332 0.732365 12.6139 0.454858 12.7754 0.273218C12.9368 0.081486 13.1488 -0.00933431 13.4111 0.000756836C13.6735 0.000756836 13.946 0.101668 14.2285 0.303491L19.1177 3.83035C19.4608 4.07253 19.6273 4.36013 19.6172 4.69314C19.6172 5.02615 19.4507 5.31375 19.1177 5.55593L14.2134 9.06765C13.9308 9.26947 13.6584 9.37543 13.396 9.38552C13.1437 9.38552 12.9368 9.2947 12.7754 9.11306C12.6139 8.92133 12.5332 8.64382 12.5332 8.28054V6.29763C11.181 6.65082 9.92969 7.20583 8.7793 7.96267C7.62891 8.70942 6.62988 9.61762 5.78223 10.6873C4.93457 11.7569 4.2736 12.9527 3.79932 14.2747C3.32503 15.5865 3.08789 16.9791 3.08789 18.4524C3.08789 20.1881 3.41081 21.8128 4.05664 23.3264C4.71256 24.8401 5.61572 26.1721 6.76611 27.3225C7.9165 28.4729 9.24854 29.371 10.7622 30.0169C12.286 30.6728 13.9106 31.0008 15.6362 31.0008C17.3719 31.0008 18.9966 30.6728 20.5103 30.0169C22.0239 29.371 23.356 28.4729 24.5063 27.3225C25.6668 26.1721 26.57 24.8401 27.2158 23.3264C27.8617 21.8128 28.1846 20.1881 28.1846 18.4524C28.1846 17.0901 27.9827 15.8035 27.5791 14.5926C27.1755 13.3715 26.6053 12.2514 25.8687 11.2322C25.1421 10.2029 24.2793 9.30984 23.2803 8.553C22.9271 8.25027 22.7051 7.89708 22.6143 7.49343C22.5234 7.08979 22.6092 6.69623 22.8716 6.31277C23.1239 5.96967 23.472 5.77289 23.916 5.72244C24.36 5.66189 24.7788 5.80317 25.1724 6.14626C26.4237 7.10492 27.5034 8.22504 28.4116 9.50662C29.3299 10.7882 30.0363 12.1858 30.5308 13.6995C31.0353 15.2132 31.2876 16.7975 31.2876 18.4524C31.2876 20.6119 30.8789 22.6352 30.0615 24.5222C29.2542 26.4093 28.1341 28.0693 26.7012 29.5022C25.2682 30.9352 23.6032 32.0553 21.7061 32.8626C19.819 33.68 17.7957 34.0886 15.6362 34.0886ZM11.6401 24.5828C11.2869 24.5828 11.0094 24.4718 10.8076 24.2498C10.6058 24.0177 10.5049 23.725 10.5049 23.3719V15.1526H10.4595L9.09717 16.1819C8.99626 16.2425 8.90039 16.2929 8.80957 16.3333C8.72884 16.3736 8.62793 16.3938 8.50684 16.3938C8.28483 16.3938 8.09814 16.3181 7.94678 16.1668C7.79541 16.0053 7.71973 15.8035 7.71973 15.5613C7.71973 15.2182 7.88623 14.9205 8.21924 14.6682L9.80859 13.5027C10.071 13.3009 10.3283 13.1394 10.5806 13.0183C10.8429 12.8872 11.1356 12.8216 11.4585 12.8216C11.8722 12.8216 12.1951 12.9326 12.4272 13.1546C12.6694 13.3766 12.7905 13.6944 12.7905 14.1082V23.3719C12.7905 23.715 12.6896 24.0025 12.4878 24.2346C12.286 24.4667 12.0034 24.5828 11.6401 24.5828ZM19.269 24.6736C18.2801 24.6736 17.488 24.386 16.8926 23.8108C16.2972 23.2255 15.8683 22.4737 15.606 21.5554C15.3436 20.6371 15.2124 19.6785 15.2124 18.6795C15.2124 17.9327 15.283 17.2062 15.4243 16.4998C15.5656 15.7934 15.7926 15.1526 16.1055 14.5774C16.4284 14.0022 16.8472 13.5481 17.3618 13.2151C17.8866 12.872 18.5223 12.7005 19.269 12.7005C20.258 12.7005 21.0501 12.9931 21.6455 13.5784C22.2409 14.1536 22.6698 14.9003 22.9321 15.8186C23.1945 16.7268 23.3257 17.6804 23.3257 18.6795C23.3257 19.4262 23.255 20.1578 23.1138 20.8743C22.9725 21.5908 22.7404 22.2366 22.4175 22.8118C22.1047 23.3769 21.6859 23.831 21.1611 24.1741C20.6465 24.5071 20.0158 24.6736 19.269 24.6736ZM19.269 22.8421C19.6525 22.8421 19.9754 22.6655 20.2378 22.3123C20.5002 21.949 20.6919 21.4545 20.813 20.8289C20.9442 20.2032 21.0098 19.4868 21.0098 18.6795C21.0098 17.8823 20.9442 17.1759 20.813 16.5603C20.6818 15.9347 20.485 15.4453 20.2227 15.0921C19.9704 14.7389 19.6525 14.5623 19.269 14.5623C18.8755 14.5623 18.5526 14.7389 18.3003 15.0921C18.048 15.4352 17.8563 15.9195 17.7251 16.5452C17.5939 17.1708 17.5283 17.8823 17.5283 18.6795C17.5283 19.4868 17.5939 20.2032 17.7251 20.8289C17.8563 21.4545 18.048 21.949 18.3003 22.3123C18.5526 22.6655 18.8755 22.8421 19.269 22.8421Z" fill="currentColor"/>\n</svg>\n' : '<svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M15.6362 34.0886C13.4767 34.0886 11.4535 33.68 9.56641 32.8626C7.67936 32.0553 6.01937 30.9352 4.58643 29.5022C3.15348 28.0693 2.02832 26.4093 1.21094 24.5222C0.403646 22.6352 0 20.6119 0 18.4524C0 16.7975 0.247233 15.2132 0.741699 13.6995C1.23617 12.1858 1.9375 10.7882 2.8457 9.50662C3.764 8.22504 4.8488 7.10492 6.1001 6.14626C6.49365 5.80317 6.91244 5.66189 7.35645 5.72244C7.80046 5.77289 8.1486 5.96967 8.40088 6.31277C8.67334 6.69623 8.76416 7.08979 8.67334 7.49343C8.58252 7.89708 8.35547 8.25027 7.99219 8.553C7.00326 9.30984 6.14046 10.2029 5.40381 11.2322C4.66715 12.2514 4.09701 13.3715 3.69336 14.5926C3.28971 15.8035 3.08789 17.0901 3.08789 18.4524C3.08789 20.1881 3.41081 21.8128 4.05664 23.3264C4.71256 24.8401 5.61572 26.1721 6.76611 27.3225C7.9165 28.4729 9.24854 29.371 10.7622 30.0169C12.286 30.6728 13.9106 31.0008 15.6362 31.0008C17.3719 31.0008 18.9966 30.6728 20.5103 30.0169C22.0239 29.371 23.356 28.4729 24.5063 27.3225C25.6668 26.1721 26.57 24.8401 27.2158 23.3264C27.8617 21.8128 28.1846 20.1881 28.1846 18.4524C28.1846 16.9791 27.9474 15.5865 27.4731 14.2747C27.009 12.9527 26.348 11.7569 25.4902 10.6873C24.6426 9.61762 23.6436 8.70942 22.4932 7.96267C21.3529 7.20583 20.1066 6.65082 18.7544 6.29763V8.28054C18.7544 8.64382 18.6686 8.92133 18.4971 9.11306C18.3356 9.2947 18.1237 9.38552 17.8613 9.38552C17.609 9.37543 17.3416 9.26947 17.0591 9.06765L12.1699 5.55593C11.8268 5.31375 11.6502 5.02615 11.6401 4.69314C11.6401 4.36013 11.8167 4.07253 12.1699 3.83035L17.0439 0.303491C17.3366 0.101668 17.609 0.000756836 17.8613 0.000756836C18.1237 -0.00933431 18.3356 0.081486 18.4971 0.273218C18.6686 0.454858 18.7544 0.732365 18.7544 1.10574V3.13406C20.5203 3.48725 22.1652 4.12299 23.689 5.04128C25.2127 5.95958 26.5448 7.10492 27.6851 8.47732C28.8254 9.83962 29.7083 11.3684 30.334 13.0637C30.9697 14.7591 31.2876 16.5553 31.2876 18.4524C31.2876 20.6119 30.8789 22.6352 30.0615 24.5222C29.2542 26.4093 28.1341 28.0693 26.7012 29.5022C25.2682 30.9352 23.6032 32.0553 21.7061 32.8626C19.819 33.68 17.7957 34.0886 15.6362 34.0886ZM11.6401 24.5828C11.2869 24.5828 11.0094 24.4718 10.8076 24.2498C10.6058 24.0177 10.5049 23.725 10.5049 23.3719V15.1526H10.4595L9.09717 16.1819C8.99626 16.2425 8.90039 16.2929 8.80957 16.3333C8.72884 16.3736 8.62793 16.3938 8.50684 16.3938C8.28483 16.3938 8.09814 16.3181 7.94678 16.1668C7.79541 16.0053 7.71973 15.8035 7.71973 15.5613C7.71973 15.2182 7.88623 14.9205 8.21924 14.6682L9.80859 13.5027C10.071 13.3009 10.3283 13.1394 10.5806 13.0183C10.8429 12.8872 11.1356 12.8216 11.4585 12.8216C11.8722 12.8216 12.1951 12.9326 12.4272 13.1546C12.6694 13.3766 12.7905 13.6944 12.7905 14.1082V23.3719C12.7905 23.715 12.6896 24.0025 12.4878 24.2346C12.286 24.4667 12.0034 24.5828 11.6401 24.5828ZM19.269 24.6736C18.2801 24.6736 17.488 24.386 16.8926 23.8108C16.2972 23.2255 15.8683 22.4737 15.606 21.5554C15.3436 20.6371 15.2124 19.6785 15.2124 18.6795C15.2124 17.9327 15.283 17.2062 15.4243 16.4998C15.5656 15.7934 15.7926 15.1526 16.1055 14.5774C16.4284 14.0022 16.8472 13.5481 17.3618 13.2151C17.8866 12.872 18.5223 12.7005 19.269 12.7005C20.258 12.7005 21.0501 12.9931 21.6455 13.5784C22.2409 14.1536 22.6698 14.9003 22.9321 15.8186C23.1945 16.7268 23.3257 17.6804 23.3257 18.6795C23.3257 19.4262 23.255 20.1578 23.1138 20.8743C22.9725 21.5908 22.7404 22.2366 22.4175 22.8118C22.1047 23.3769 21.6859 23.831 21.1611 24.1741C20.6465 24.5071 20.0158 24.6736 19.269 24.6736ZM19.269 22.8421C19.6525 22.8421 19.9754 22.6655 20.2378 22.3123C20.5002 21.949 20.6919 21.4545 20.813 20.8289C20.9442 20.2032 21.0098 19.4868 21.0098 18.6795C21.0098 17.8823 20.9442 17.1759 20.813 16.5603C20.6818 15.9347 20.485 15.4453 20.2227 15.0921C19.9704 14.7389 19.6525 14.5623 19.269 14.5623C18.8755 14.5623 18.5526 14.7389 18.3003 15.0921C18.048 15.4352 17.8563 15.9195 17.7251 16.5452C17.5939 17.1708 17.5283 17.8823 17.5283 18.6795C17.5283 19.4868 17.5939 20.2032 17.7251 20.8289C17.8563 21.4545 18.048 21.949 18.3003 22.3123C18.5526 22.6655 18.8755 22.8421 19.269 22.8421Z" fill="currentColor"/>\n</svg>\n', 32)
              }
            })
          });
        }, Y = j.memo(O), z = function (e, t) {
          return e.replace(/width="[^"]*"/, 'width="'.concat(t, '"')).replace(/height="[^"]*"/, 'height="'.concat(t, '"'));
        }, H = function (e) {
          var t = e.playing,
            n = void 0 !== t && t,
            r = e.onClick,
            o = m({
              focusKey: "PLAYER-BTN-PLAYPAUSE",
              onEnterPress: function () {
                return null == r ? void 0 : r();
              },
              onArrowPress: function (e) {
                return "down" === e ? (f("PLAYER-SEEKBAR-THUMB"), !1) : "up" !== e || (f("PLAYER-BTN-BACK"), !1);
              }
            }),
            i = o.ref,
            a = o.focused;
          return (0, I.jsx)("button", {
            ref: i,
            onClick: r,
            style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              color: a ? "var(--foc-primary)" : "var(--clr-text-primary-button)",
              outline: "none",
              transition: "color 0.15s ease"
            },
            title: n ? "Pausar" : "Reproducir",
            children: (0, I.jsx)("span", {
              style: {
                display: "inline-flex",
                width: 28,
                height: 28
              },
              dangerouslySetInnerHTML: {
                __html: z(n ? '<svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.24 0 0 2.24 0 5V35C0 37.76 2.24 40 5 40C7.76 40 10 37.76 10 35V5C10 2.24 7.76 0 5 0ZM30 5V35C30 37.76 27.76 40 25 40C22.24 40 20 37.76 20 35V5C20 2.24 22.24 0 25 0C27.76 0 30 2.24 30 5Z" fill="currentColor"/>\n</svg>\n' : '<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M14.5069 12.335C16.4982 11.0454 16.4971 8.95392 14.5069 7.66503L3.60552 0.605085C1.61424 -0.684496 0 0.155193 0 2.47779V17.5223C0 19.8461 1.61532 20.6838 3.60552 19.395L14.5069 12.335Z" fill="currentColor"/>\n</svg>\n', 28)
              }
            })
          });
        }, W = j.memo(H), Z = function (e) {
          if (!e || isNaN(e)) return "00:00";
          var t = Math.floor(e / 3600),
            n = Math.floor(e % 3600 / 60),
            r = Math.floor(e % 60);
          return t > 0 ? "".concat(t.toString().padStart(2, "0"), ":").concat(n.toString().padStart(2, "0"), ":").concat(r.toString().padStart(2, "0")) : "".concat(n.toString().padStart(2, "0"), ":").concat(r.toString().padStart(2, "0"));
        }, X = function (e) {
          var t = e.seekTime,
            n = void 0 === t ? 0 : t,
            r = e.previewSeekTime,
            o = void 0 === r ? null : r,
            i = e.loadedTime,
            a = void 0 === i ? 0 : i,
            s = e.duration,
            c = void 0 === s ? 0 : s,
            u = e.isLive,
            d = void 0 !== u && u,
            p = e.playing,
            v = void 0 !== p && p,
            h = e.onSeek,
            g = e.onPlayPause,
            y = e.onSkip,
            C = l((0, j.useState)(0), 2),
            b = C[0],
            x = C[1],
            w = l((0, j.useState)(!1), 2),
            k = w[0],
            _ = w[1],
            S = l((0, j.useState)(!1), 2),
            E = S[0],
            A = S[1],
            P = (0, j.useRef)(null),
            T = (0, j.useRef)(null),
            L = (0, j.useRef)(0),
            R = (0, j.useRef)(null),
            M = (0, j.useRef)(0),
            B = (0, j.useCallback)(function (e) {
              T.current = e, h && h(e), _(!1), setTimeout(function () {
                T.current = null;
              }, 2e3);
            }, [h]),
            N = (0, j.useCallback)(function (e) {
              if (!P.current || c <= 0) return 0;
              var t = P.current.getBoundingClientRect();
              return Math.max(0, Math.min(1, (e - t.left) / t.width)) * c;
            }, [c]),
            F = (0, j.useCallback)(function (e) {
              if (!(d || c <= 0 || E)) {
                var t = N(e.clientX);
                x(t), B(t);
              }
            }, [d, c, E, N, B]),
            V = (0, j.useCallback)(function (e) {
              var t = N(e);
              L.current = t, x(t);
            }, [N]),
            U = (0, j.useCallback)(function () {
              A(!1), _(!1), B(L.current);
            }, [B]),
            K = (0, j.useCallback)(function (e) {
              return V(e.clientX);
            }, [V]),
            O = (0, j.useCallback)(function () {
              return U();
            }, [U]),
            z = (0, j.useCallback)(function (e) {
              e.touches.length > 0 && V(e.touches[0].clientX);
            }, [V]),
            H = (0, j.useCallback)(function () {
              return U();
            }, [U]);
          (0, j.useEffect)(function () {
            if (E) return document.addEventListener("mousemove", K), document.addEventListener("mouseup", O), document.addEventListener("touchmove", z, {
              passive: !0
            }), document.addEventListener("touchend", H), function () {
              document.removeEventListener("mousemove", K), document.removeEventListener("mouseup", O), document.removeEventListener("touchmove", z), document.removeEventListener("touchend", H);
            };
          }, [E, K, O, z, H]);
          var X = (0, j.useCallback)(function (e) {
              d || c <= 0 || (e.preventDefault(), e.stopPropagation(), A(!0), _(!0), L.current = b);
            }, [d, c, b]),
            D = (0, j.useCallback)(function (e) {
              d || c <= 0 || (e.stopPropagation(), A(!0), _(!0), L.current = b);
            }, [d, c, b]);
          (0, j.useEffect)(function () {
            null == o ? k || E || (null !== T.current ? Math.abs(n - T.current) < 5 && (T.current = null, x(n)) : x(n)) : x(o);
          }, [n, o, k, E]);
          var G = (0, j.useCallback)(function (e) {
              M.current = e, x(function (t) {
                return Math.max(0, Math.min(c, t + 10 * e));
              }), _(!0), R.current || (R.current = setInterval(function () {
                x(function (e) {
                  return Math.max(0, Math.min(c, e + 10 * M.current));
                });
              }, 150));
            }, [c]),
            q = (0, j.useCallback)(function () {
              R.current && (clearInterval(R.current), R.current = null), x(function (e) {
                return B(e), e;
              });
            }, [B]);
          (0, j.useEffect)(function () {
            return function () {
              R.current && clearInterval(R.current);
            };
          }, []);
          var $ = m({
              focusKey: "PLAYER-SEEKBAR-THUMB",
              onArrowPress: function (e) {
                return "left" === e || "right" === e ? (G("left" === e ? -1 : 1), !1) : "up" === e ? (q(), f("PLAYER-BTN-PLAYPAUSE"), !1) : "down" !== e;
              },
              onEnterPress: function () {
                null == g || g();
              }
            }),
            Q = $.ref,
            J = $.focused;
          (0, j.useEffect)(function () {
            !J && R.current && q();
          }, [J, q]), (0, j.useEffect)(function () {
            var e = function (e) {
              37 !== e.keyCode && 39 !== e.keyCode || !R.current || q();
            };
            return window.addEventListener("keyup", e), function () {
              return window.removeEventListener("keyup", e);
            };
          }, [q]);
          var ee = d ? 0 : c > 0 ? b / c * 100 : 0,
            te = d ? 0 : c > 0 ? a / c * 100 : 0,
            ne = d ? "#888888" : "#FFFFFF";
          return (0, I.jsx)("div", {
            className: "seekbar-wrapper",
            style: {
              width: "100%"
            },
            children: !d && (0, I.jsxs)(I.Fragment, {
              children: [(0, I.jsxs)("div", {
                style: {
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "10px",
                  color: "var(--clr-primary-text)",
                  minHeight: "48px"
                },
                children: [(0, I.jsxs)("div", {
                  style: {
                    display: "flex",
                    fontWeight: "normal"
                  },
                  children: [(0, I.jsx)("div", {
                    style: {
                      textAlign: "start"
                    },
                    children: Z(c)
                  }), (0, I.jsx)("span", {
                    style: {
                      marginLeft: "0.5rem"
                    },
                    children: " / "
                  }), (0, I.jsx)("div", {
                    style: {
                      textAlign: "right",
                      marginLeft: "0.5rem"
                    },
                    children: Z(b)
                  })]
                }), (0, I.jsxs)("div", {
                  style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center"
                  },
                  children: [(0, I.jsx)(Y, {
                    seconds: -10,
                    onClick: function () {
                      return y && y(-10);
                    }
                  }), (0, I.jsx)(W, {
                    playing: v,
                    onClick: g
                  }), (0, I.jsx)(Y, {
                    seconds: 10,
                    onClick: function () {
                      return y && y(10);
                    }
                  })]
                })]
              }), (0, I.jsxs)("div", {
                ref: P,
                className: "seekbar-track",
                onClick: F,
                style: {
                  width: "100%",
                  height: "3px",
                  backgroundColor: "#525252",
                  borderRadius: "999px",
                  position: "relative",
                  transition: "outline 0.2s ease",
                  opacity: 1,
                  marginBottom: "10px",
                  cursor: "pointer"
                },
                children: [(0, I.jsx)("div", {
                  className: "seekbar-loaded",
                  style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "".concat(te, "%"),
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "999px",
                    transition: "width 0.2s linear"
                  }
                }), (0, I.jsx)("div", {
                  className: "seekbar-fill",
                  style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "".concat(ee, "%"),
                    backgroundColor: ne,
                    borderRadius: "999px",
                    transition: k || E ? "none" : "width 0.2s linear"
                  }
                }), (0, I.jsx)("div", {
                  ref: Q,
                  className: "seekbar-thumb",
                  onMouseDown: X,
                  onTouchStart: D,
                  style: {
                    position: "absolute",
                    left: "".concat(ee, "%"),
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: J ? "20px" : "15px",
                    height: J ? "20px" : "15px",
                    backgroundColor: J ? "var(--foc-primary, #FF1376)" : "#FFFFFF",
                    border: J ? "3px solid var(--foc-primary, #FF1376)" : "3px solid #FFFFFF",
                    borderRadius: "50%",
                    cursor: E ? "grabbing" : "grab",
                    transition: E ? "none" : "all 0.15s ease",
                    touchAction: "none",
                    boxShadow: J ? "0 0 16px rgba(255,19,118,0.6)" : "none",
                    outline: "none"
                  }
                })]
              })]
            })
          });
        }, D = j.memo(X), G = function (e) {
          var t = e.seekTime,
            n = void 0 === t ? 0 : t,
            r = e.previewSeekTime,
            o = void 0 === r ? null : r,
            i = e.loadedTime,
            a = void 0 === i ? 0 : i,
            s = e.duration,
            c = void 0 === s ? 0 : s,
            u = e.playing,
            d = e.visible,
            f = e.isLive,
            p = void 0 !== f && f,
            v = e.volume,
            m = void 0 === v ? 1 : v,
            h = e.muted,
            g = void 0 !== h && h,
            y = e.episodes,
            C = void 0 === y ? [] : y,
            b = e.currentEpisodeKey,
            x = e.onPlayButtonClick,
            w = e.onSeek,
            k = e.onSkip,
            _ = e.onVolumeChange,
            S = e.onMuteToggle,
            E = e.onFullscreen,
            A = e.onEpisodeSelect,
            P = e.onHideControls,
            T = e.onSidebarVisibilityChange,
            L = l((0, j.useState)(!1), 2),
            R = L[0],
            M = L[1];
          return (0, j.useEffect)(function () {
            !d && R && M(!1);
          }, [d, R]), (0, j.useEffect)(function () {
            T && T(R);
          }, [R, T]), (0, I.jsxs)("div", {
            style: {
              position: "fixed",
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              backgroundColor: "transparent",
              visibility: d ? "visible" : "hidden",
              zIndex: 998,
              pointerEvents: d ? "auto" : "none"
            },
            children: [(0, I.jsxs)("div", {
              style: {
                position: "absolute",
                bottom: p ? "40px" : "50px",
                left: 0,
                right: 0,
                padding: "0 55px",
                pointerEvents: d ? "auto" : "none"
              },
              children: [(0, I.jsx)("div", {
                style: {
                  display: "flex",
                  width: "100%",
                  backgroundColor: "transparent",
                  minHeight: p ? "auto" : "94px",
                  transition: "opacity 0.3s ease"
                },
                children: (0, I.jsx)(D, {
                  seekTime: n,
                  previewSeekTime: o,
                  loadedTime: a,
                  duration: c,
                  isLive: p,
                  playing: u,
                  volume: m,
                  muted: g,
                  onSeek: w,
                  onPlayPause: x,
                  onSkip: k,
                  onVolumeChange: _,
                  onMuteToggle: S,
                  onFullscreen: E
                })
              }), (0, I.jsx)("div", {
                style: {
                  position: "absolute",
                  right: "55px",
                  bottom: "140px",
                  display: "flex",
                  alignItems: "center",
                  zIndex: 2e3
                }
              })]
            }), C.length > 0 && (0, I.jsx)(U, {
              episodes: C,
              currentEpisodeKey: b,
              visible: R,
              onClose: function () {
                return M(!1);
              },
              onCloseAll: function () {
                M(!1), P && P();
              },
              onEpisodeSelect: function (e) {
                M(!1), e.key !== b && A ? A(e) : P && P();
              }
            })]
          });
        }, q = j.memo(G), $ = function (e) {
          var n = e.src,
            r = e.title,
            o = e.description,
            i = e.isLive,
            a = void 0 !== i && i,
            s = e.vastUrl,
            u = e.livetoken,
            d = (e.rudoKey, e.autoplay),
            p = void 0 === d || d,
            v = e.onBack,
            h = e.hideUI,
            g = void 0 !== h && h,
            C = e.onQualitiesChange,
            b = e.onAdsPlaying,
            w = e.onAdsFinished,
            P = e.onTimeUpdate,
            T = e.onEnded,
            L = e.pipMode,
            R = void 0 !== L && L,
            M = e.forceControlsVisible,
            N = void 0 !== M && M,
            F = e.initialSeconds,
            V = e.vodSlug,
            U = e.userToken,
            K = e.userProfile,
            O = m({
              focusKey: "PLAYER-VIEW",
              saveLastFocusedChild: !0,
              trackChildren: !0,
              isFocusBoundary: !0
            }),
            Y = O.ref,
            z = O.focusKey;
          (0, j.useEffect)(function () {
            return y(!0), function () {
              y(!1);
            };
          }, []);
          var H = function (e) {
              var t = e.vastUrl,
                n = !!t && "none" !== t && "" !== t.trim();
              return {
                shouldPlayAds: n,
                effectiveVastUrl: n ? t : void 0,
                evaluated: !0
              };
            }({
              vastUrl: s
            }),
            W = H.shouldPlayAds,
            Z = H.effectiveVastUrl,
            X = l((0, j.useState)(W), 2),
            D = X[0],
            G = X[1];
          (0, j.useEffect)(function () {
            W && Z && !D && G(!0);
          }, [W, Z]);
          var $ = l((0, j.useState)(!1), 2),
            Q = $[0],
            J = $[1],
            ee = S({
              preventHide: Q || N
            }),
            te = ee.isUIVisible,
            ne = ee.setIsUIVisible,
            re = ee.resetUIVisibility,
            oe = l((0, j.useState)(null), 2),
            ie = oe[0],
            ae = oe[1],
            se = (0, j.useRef)(null),
            le = (0, j.useRef)(null),
            ce = (0, j.useRef)(null),
            ue = _({
              videoRef: ce,
              src: n,
              autoplay: p && !W,
              isLive: a,
              livetoken: u,
              initialSeconds: F
            }),
            de = ue.levels,
            fe = ue.isPlaying,
            pe = ue.isLoading,
            ve = ue.currentTime,
            me = ue.duration,
            he = ue.loadedTime,
            ge = ue.play,
            ye = ue.pause;
          (0, j.useEffect)(function () {
            if (!D) {
              var e = setTimeout(function () {
                f("PLAYER-BTN-PLAYPAUSE");
              }, 300);
              return function () {
                return clearTimeout(e);
              };
            }
          }, [D]), (0, j.useEffect)(function () {
            D && ce.current && (ce.current.pause(), ce.current.muted = !0);
          }, [D]), E({
            onBack: v || function () {},
            isUIVisible: te,
            showUI: re,
            isLive: a,
            playingAds: D,
            pipMode: R,
            isPlaying: fe,
            pause: ye
          }), (0, j.useEffect)(function () {
            de && de.length > 0 && C && C([{
              value: "auto",
              label: "Auto"
            }].concat(t(de.map(function (e) {
              return {
                value: e.height.toString(),
                label: 0 === e.height ? "Audio" : "".concat(e.height, "p")
              };
            }).filter(function (e, t, n) {
              return n.findIndex(function (t) {
                return t.value === e.value;
              }) === t;
            }).reverse())));
          }, [de, C]);
          var Ce = {
              onPlaybackProgress: function (e, t) {},
              onAdStarted: function () {},
              onAdCompleted: function () {}
            },
            be = function (e) {
              var t = e.vodSlug,
                n = e.currentTime,
                r = e.duration,
                o = e.isPlaying,
                i = e.isLive,
                a = void 0 !== i && i,
                s = e.playingAds,
                l = void 0 !== s && s,
                c = e.token,
                u = e.profile,
                d = (0, j.useRef)(null),
                f = (0, j.useRef)(0),
                p = (0, j.useRef)(n),
                v = (0, j.useRef)(r);
              p.current = n, v.current = r;
              var m = !(!t || !c || !u || a),
                h = (0, j.useCallback)(function (e) {
                  if (m && t && c && u) {
                    var n = p.current;
                    void 0 === e && Math.abs(n - f.current) < 2 || (f.current = n, console.log("[WatchHistory] Saving progress: vod=".concat(t, ", time=").concat(Math.floor(n), "s").concat(void 0 !== e ? ", end=".concat(e) : "")), k.saveProgress({
                      token: c,
                      profile: u,
                      vod: t,
                      time: n,
                      end: e
                    }));
                  }
                }, [m, t, c, u]);
              return (0, j.useEffect)(function () {
                if (m && o && !l && !(r <= 0)) {
                  var e = 1e3 * function (e) {
                    return e <= 180 ? 30 : e < 600 ? 45 : 60;
                  }(r);
                  return console.log("[WatchHistory] Starting periodic save every ".concat(e / 1e3, "s (duration: ").concat(Math.floor(r), "s)")), d.current = setInterval(function () {
                    h();
                  }, e), function () {
                    d.current && (clearInterval(d.current), d.current = null);
                  };
                }
                d.current && (clearInterval(d.current), d.current = null);
              }, [m, o, l, r, h]), (0, j.useEffect)(function () {
                m && !a && !o && n > 0 && !l && h(0);
              }, [o, m, a, n, l, h]), (0, j.useEffect)(function () {
                if (m) return function () {
                  if (p.current > 0) {
                    var e = v.current > 0 && v.current - p.current < 5;
                    k.saveProgress({
                      token: c,
                      profile: u,
                      vod: t,
                      time: p.current,
                      end: e ? 1 : 0
                    });
                  }
                };
              }, [m, t, c, u]), {
                saveProgress: h
              };
            }({
              vodSlug: V,
              currentTime: ve,
              duration: me,
              isPlaying: fe,
              isLive: a,
              playingAds: D,
              token: U,
              profile: K
            }),
            xe = be.saveProgress;
          (0, j.useEffect)(function () {
            null === le.current || null === ie || se.current || Math.abs(ve - le.current) < 3 && (le.current = null, ae(null));
          }, [ve, ie]), (0, j.useEffect)(function () {
            !a && !D && ve > 0 && me > 0 && (Ce.onPlaybackProgress(ve, me), P && P(ve, me));
          }, [ve, me, D, a, Ce, P]), (0, j.useEffect)(function () {
            ue.isEnded && (xe(1), T && T());
          }, [ue.isEnded, xe, T]);
          var we = (0, j.useCallback)(function () {
              Ce.onAdStarted(), b && b();
            }, [Ce, b]),
            ke = (0, j.useCallback)(function () {
              var e;
              G(!1);
              var t = ce.current;
              t && (t.muted = !1);
              var n = null === (e = ue.hlsRef) || void 0 === e ? void 0 : e.current;
              if (n) try {
                n.startLoad(-1);
              } catch (o) {}
              if (t) if (t.readyState >= 2) t.play().catch(function (e) {
                return console.warn("[VideoPlayer] Post-ad play error:", e);
              });else {
                var r = function () {
                  t.play().catch(function (e) {
                    return console.warn("[VideoPlayer] Post-ad play error (canplay):", e);
                  });
                };
                t.addEventListener("canplay", r, {
                  once: !0
                }), setTimeout(function () {
                  t.removeEventListener("canplay", r), t.play().catch(function (e) {
                    return console.warn("[VideoPlayer] Post-ad play error (timeout):", e);
                  });
                }, 5e3);
              }
              Ce.onAdCompleted(), w && w();
            }, [ue.hlsRef, Ce, w]),
            _e = (0, j.useCallback)(function (e) {
              e.target.closest('button, .seekbar-track, .seekbar-wrapper, [role="button"]') || R || D || (fe ? ye() : ge());
            }, [fe, ge, ye, R, D]),
            Se = (0, j.useCallback)(function (e) {
              if (ce.current && me > 0) {
                var t = Math.max(0, Math.min(me, ce.current.currentTime + e));
                ce.current.currentTime = t;
              }
            }, [me]);
          return (0, I.jsx)(c.Provider, {
            value: z,
            children: (0, I.jsxs)("div", {
              ref: Y,
              className: "video-player-container".concat(R ? " pip-active" : ""),
              onClick: _e,
              children: [D && Z && (0, I.jsx)(A, {
                url: Z,
                onAdsPlaying: we,
                onAdsFinished: ke
              }), (0, I.jsx)("video", {
                id: "hls-video-player",
                ref: ce,
                className: "".concat(D ? "hidden" : "", " ").concat(R && !D ? "pip-mode" : ""),
                playsInline: !0,
                autoPlay: p && !D,
                controls: !1,
                muted: D,
                tabIndex: -1
              }), !D && !g && (!R || N) && (0, I.jsxs)(I.Fragment, {
                children: [(0, I.jsx)(B, {
                  title: r,
                  description: o,
                  isVisible: te,
                  isLive: a,
                  onBackClick: v
                }), (0, I.jsx)(q, {
                  playing: fe,
                  visible: te,
                  isLive: a,
                  duration: me,
                  seekTime: ve,
                  previewSeekTime: ie,
                  loadedTime: he,
                  onPlayButtonClick: fe ? ye : ge,
                  onSeek: function (e) {
                    ce.current && (ce.current.currentTime = e);
                  },
                  onSkip: Se,
                  onHideControls: function () {
                    return ne(!1);
                  },
                  onSidebarVisibilityChange: J
                })]
              }), pe && !D && (0, I.jsx)("div", {
                className: "video-player-spinner",
                children: (0, I.jsx)(x, {})
              })]
            })
          });
        }, Q = j.memo($), J = {
          card: "_card_1ms2a_3",
          cardSlideIn: "_cardSlideIn_1ms2a_1",
          focused: "_focused_1ms2a_26",
          header: "_header_1ms2a_45",
          body: "_body_1ms2a_56",
          thumbnailWrapper: "_thumbnailWrapper_1ms2a_64",
          thumbnail: "_thumbnail_1ms2a_64",
          countdownOverlay: "_countdownOverlay_1ms2a_81",
          countdownNumber: "_countdownNumber_1ms2a_95",
          episodeTitle: "_episodeTitle_1ms2a_104",
          progressBar: "_progressBar_1ms2a_118",
          progressFill: "_progressFill_1ms2a_126"
        }, ee = function (e) {
          var t,
            n,
            r,
            o = e.episode,
            i = e.countdown,
            a = e.threshold,
            s = e.onNextEpisode,
            l = (0, j.useCallback)(function () {
              s(o);
            }, [s, o]),
            c = m({
              focusKey: "CARD-NEXT-EP",
              onEnterPress: l,
              onArrowPress: function (e) {
                return "down" === e || "up" !== e && "left" !== e && "right" !== e;
              }
            }),
            u = c.ref,
            d = c.focused,
            f = a > 0 ? i / a * 100 : 0,
            p = (null === (t = o.image_land) || void 0 === t ? void 0 : t.big) || (null === (n = o.image_land) || void 0 === n ? void 0 : n.normal) || (null === (r = o.image_land) || void 0 === r ? void 0 : r.default) || o.image || "";
          return (0, I.jsxs)("div", {
            ref: u,
            className: "".concat(J.card, " ").concat(d ? J.focused : ""),
            onClick: l,
            children: [(0, I.jsx)("div", {
              className: J.header,
              children: "A continuación"
            }), (0, I.jsxs)("div", {
              className: J.body,
              children: [(0, I.jsxs)("div", {
                className: J.thumbnailWrapper,
                children: [(0, I.jsx)("img", {
                  src: p,
                  alt: o.title,
                  className: J.thumbnail,
                  loading: "lazy"
                }), i > 0 && (0, I.jsxs)("div", {
                  className: J.countdownOverlay,
                  children: ["En ", (0, I.jsx)("span", {
                    className: J.countdownNumber,
                    children: i
                  }), "s"]
                })]
              }), (0, I.jsx)("div", {
                className: J.episodeTitle,
                children: o.title
              })]
            }), (0, I.jsx)("div", {
              className: J.progressBar,
              children: (0, I.jsx)("div", {
                className: J.progressFill,
                style: {
                  width: "".concat(f, "%")
                }
              })
            })]
          });
        }, te = (0, j.memo)(ee), ne = {
          playerPage: "_playerPage_xphv0_1",
          errorContainer: "_errorContainer_xphv0_11",
          errorText: "_errorText_xphv0_19"
        }, re = 30;
      }
    };
  });
}();