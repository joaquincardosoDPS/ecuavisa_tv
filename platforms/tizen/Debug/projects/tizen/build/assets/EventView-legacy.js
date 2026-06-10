!function () {
  function e(n) {
    return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, e(n);
  }
  function n() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
      r,
      o = "function" == typeof Symbol ? Symbol : {},
      a = o.iterator || "@@iterator",
      i = o.toStringTag || "@@toStringTag";
    function c(n, o, a, i) {
      var c = o && o.prototype instanceof l ? o : l,
        d = Object.create(c.prototype);
      return t(d, "_invoke", function (n, t, o) {
        var a,
          i,
          c,
          l = 0,
          d = o || [],
          u = !1,
          f = {
            p: 0,
            n: 0,
            v: e,
            a: v,
            f: v.bind(e, 4),
            d: function (n, t) {
              return a = n, i = 0, c = e, f.n = t, s;
            }
          };
        function v(n, t) {
          for (i = n, c = t, r = 0; !u && l && !o && r < d.length; r++) {
            var o,
              a = d[r],
              v = f.p,
              _ = a[2];
            n > 3 ? (o = _ === t) && (c = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = e) : a[0] <= v && ((o = n < 2 && v < a[1]) ? (i = 0, f.v = t, f.n = a[1]) : v < _ && (o = n < 3 || a[0] > t || t > _) && (a[4] = n, a[5] = t, f.n = _, i = 0));
          }
          if (o || n > 1) return s;
          throw u = !0, t;
        }
        return function (o, d, _) {
          if (l > 1) throw TypeError("Generator is already running");
          for (u && 1 === d && v(d, _), i = d, c = _; (r = i < 2 ? e : c) || !u;) {
            a || (i ? i < 3 ? (i > 1 && (f.n = -1), v(i, c)) : f.n = c : f.v = c);
            try {
              if (l = 2, a) {
                if (i || (o = "next"), r = a[o]) {
                  if (!(r = r.call(a, c))) throw TypeError("iterator result is not an object");
                  if (!r.done) return r;
                  c = r.value, i < 2 && (i = 0);
                } else 1 === i && (r = a.return) && r.call(a), i < 2 && (c = TypeError("The iterator does not provide a '" + o + "' method"), i = 1);
                a = e;
              } else if ((r = (u = f.n < 0) ? c : n.call(t, f)) !== s) break;
            } catch (r) {
              a = e, i = 1, c = r;
            } finally {
              l = 1;
            }
          }
          return {
            value: r,
            done: u
          };
        };
      }(n, a, i), !0), d;
    }
    var s = {};
    function l() {}
    function d() {}
    function u() {}
    r = Object.getPrototypeOf;
    var f = [][a] ? r(r([][a]())) : (t(r = {}, a, function () {
        return this;
      }), r),
      v = u.prototype = l.prototype = Object.create(f);
    function _(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, u) : (e.__proto__ = u, t(e, i, "GeneratorFunction")), e.prototype = Object.create(v), e;
    }
    return d.prototype = u, t(v, "constructor", u), t(u, "constructor", d), d.displayName = "GeneratorFunction", t(u, i, "GeneratorFunction"), t(v), t(v, i, "Generator"), t(v, a, function () {
      return this;
    }), t(v, "toString", function () {
      return "[object Generator]";
    }), (n = function () {
      return {
        w: c,
        m: _
      };
    })();
  }
  function t(e, n, r, o) {
    var a = Object.defineProperty;
    try {
      a({}, "", {});
    } catch (e) {
      a = 0;
    }
    t = function (e, n, r, o) {
      function i(n, r) {
        t(e, n, function (e) {
          return this._invoke(n, r, e);
        });
      }
      n ? a ? a(e, n, {
        value: r,
        enumerable: !o,
        configurable: !o,
        writable: !o
      }) : e[n] = r : (i("next", 0), i("throw", 1), i("return", 2));
    }, t(e, n, r, o);
  }
  function r(e, n) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      n && (r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })), t.push.apply(t, r);
    }
    return t;
  }
  function o(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = null != arguments[n] ? arguments[n] : {};
      n % 2 ? r(Object(t), !0).forEach(function (n) {
        a(e, n, t[n]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : r(Object(t)).forEach(function (n) {
        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
      });
    }
    return e;
  }
  function a(n, t, r) {
    return (t = function (n) {
      var t = function (n, t) {
        if ("object" != e(n) || !n) return n;
        var r = n[Symbol.toPrimitive];
        if (void 0 !== r) {
          var o = r.call(n, t || "default");
          if ("object" != e(o)) return o;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(n);
      }(n, "string");
      return "symbol" == e(t) ? t : t + "";
    }(t)) in n ? Object.defineProperty(n, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[t] = r, n;
  }
  function i(e, n, t, r, o, a, i) {
    try {
      var c = e[a](i),
        s = c.value;
    } catch (e) {
      return void t(e);
    }
    c.done ? n(s) : Promise.resolve(s).then(r, o);
  }
  function c(e) {
    return function () {
      var n = this,
        t = arguments;
      return new Promise(function (r, o) {
        var a = e.apply(n, t);
        function c(e) {
          i(a, r, o, c, s, "next", e);
        }
        function s(e) {
          i(a, r, o, c, s, "throw", e);
        }
        c(void 0);
      });
    };
  }
  function s(e, n) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, n) {
      var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != t) {
        var r,
          o,
          a,
          i,
          c = [],
          s = !0,
          l = !1;
        try {
          if (a = (t = t.call(e)).next, 0 === n) {
            if (Object(t) !== t) return;
            s = !1;
          } else for (; !(s = (r = a.call(t)).done) && (c.push(r.value), c.length !== n); s = !0);
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
    }(e, n) || function (e, n) {
      if (e) {
        if ("string" == typeof e) return l(e, n);
        var t = {}.toString.call(e).slice(8, -1);
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? l(e, n) : void 0;
      }
    }(e, n) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function l(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var t = 0, r = Array(n); t < n; t++) r[t] = e[t];
    return r;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./usePageScroll-legacy.js", "./eventStatus-legacy.js", "./Button-legacy.js"], function (e, t) {
    var r, a, i, l, d, u, f, v, _, p, g, m, y, b, h, x, w, j, C, T, k, S, N, E;
    function B(e) {
      var n,
        t,
        r = e.event,
        o = e.scrollOpacity,
        a = (null === (n = r.image_background) || void 0 === n ? void 0 : n.big) || (null === (t = r.image_land) || void 0 === t ? void 0 : t.big);
      return (0, E.jsxs)("div", {
        className: N.bannerBg,
        children: [a && (0, E.jsx)("div", {
          className: N.bannerBgImage,
          style: {
            backgroundImage: "url(".concat(a, ")")
          }
        }), (0, E.jsx)("div", {
          className: N.bannerOverlayLeft
        }), (0, E.jsx)("div", {
          className: N.bannerOverlayBottom
        }), (0, E.jsx)("div", {
          className: N.bannerScrollOverlay,
          style: {
            opacity: o
          }
        })]
      });
    }
    function O(e) {
      var n,
        t,
        r,
        o,
        a,
        i,
        c = e.event,
        s = e.onBannerFocused,
        l = e.onPlay,
        u = null === (n = c.category) || void 0 === n || null === (n = n.image_logo) || void 0 === n ? void 0 : n.default,
        f = null === (t = c.image_logo) || void 0 === t ? void 0 : t.default,
        v = c.classification,
        _ = Array.isArray(c.category) ? (null === (r = c.category[0]) || void 0 === r ? void 0 : r.name) || "" : (null === (o = c.category) || void 0 === o ? void 0 : o.name) || "",
        p = new Date((null === (a = c.gmt0_unlocked) || void 0 === a ? void 0 : a.replace(" ", "T")) + "Z"),
        g = new Date() < p ? "Próximamente · ".concat(p.toLocaleDateString("es-CL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }), ", ").concat(p.toLocaleTimeString("es-CL", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: !1
        })) : null !== (i = c.live_associated) && void 0 !== i && i.key ? "En vivo ahora" : null,
        m = (0, k.useCallback)(function () {
          null == l || l();
        }, [l]);
      return (0, E.jsxs)("div", {
        className: N.bannerContent,
        children: [g && (0, E.jsx)("span", {
          className: N.eventStatusBadge,
          children: g
        }), f && (0, E.jsx)("img", {
          src: f,
          alt: c.title,
          className: N.eventLogo,
          draggable: !1,
          decoding: "async"
        }), v && (0, E.jsx)("span", {
          className: N.classificationBadge,
          children: v
        }), (0, E.jsx)(C, {
          focusKey: "EVENT-PLAY",
          variant: "primary",
          showArrow: !0,
          onPress: m,
          onFocused: s,
          onArrowPress: function (e) {
            return "left" === e ? (d(b), !1) : "right" !== e && ("down" !== e || (d("EVENT-TAB-relacionados"), !1));
          },
          children: "Play"
        }), (0, E.jsxs)("div", {
          className: N.categoryRow,
          children: [u && (0, E.jsx)("img", {
            src: u,
            alt: "",
            className: N.categoryLogo,
            draggable: !1
          }), (0, E.jsx)("span", {
            className: N.categoryName,
            children: _
          })]
        }), (0, E.jsx)("h1", {
          className: N.eventTitle,
          children: c.title
        }), (0, E.jsx)("p", {
          className: N.eventDescription,
          children: c.description_short
        })]
      });
    }
    function P(e) {
      var n = e.label,
        t = e.tabKey,
        r = e.isActive,
        o = e.focusKey,
        a = e.onPress,
        i = p({
          focusKey: o,
          onEnterPress: function () {
            return a(t);
          },
          onFocus: function () {
            return a(t);
          },
          onArrowPress: function (e) {
            return "up" === e ? (d("EVENT-PLAY"), !1) : "down" !== e || (d("EVENT-CARD-0"), !1);
          }
        }),
        c = i.ref,
        s = i.focused;
      return (0, E.jsx)("button", {
        ref: c,
        className: [N.tabBtn, r && N.tabBtnActive, s && N.tabBtnFocused].filter(Boolean).join(" "),
        onClick: function () {
          return a(t);
        },
        "data-focuskey": o,
        children: n
      });
    }
    function A(e) {
      var n = e.activeTab,
        t = e.setActiveTab,
        r = e.onTabsFocused,
        o = p({
          focusKey: "EVENT-TABS",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function (e, n, t) {
            var o = null == t ? void 0 : t.event;
            (!o || "ArrowLeft" !== o.key && "ArrowRight" !== o.key && 37 !== o.keyCode && 39 !== o.keyCode && "ArrowUp" !== o.key && 38 !== o.keyCode) && (null == r || r());
          }
        }),
        i = o.ref,
        c = o.focusKey;
      return (0, E.jsx)("div", {
        "data-section": "content",
        className: N.tabsContainer,
        children: (0, E.jsx)(a.Provider, {
          value: c,
          children: (0, E.jsxs)("div", {
            ref: i,
            className: N.tabsInner,
            children: [(0, E.jsx)(P, {
              label: "Relacionados",
              tabKey: "relacionados",
              isActive: "relacionados" === n,
              focusKey: "EVENT-TAB-relacionados",
              onPress: t
            }), (0, E.jsx)(P, {
              label: "Detalles",
              tabKey: "detalles",
              isActive: "detalles" === n,
              focusKey: "EVENT-TAB-detalles",
              onPress: t
            })]
          })
        })
      });
    }
    function L(e) {
      var n,
        t,
        r = e.event,
        o = e.focusKey,
        a = e.onCardFocus,
        i = e.onPress,
        c = null === (n = r.image_land) || void 0 === n ? void 0 : n.small,
        s = j(r),
        l = function () {
          null == i || i(r.key);
        },
        d = p({
          focusKey: o,
          onEnterPress: l,
          onFocus: function () {
            return null == a ? void 0 : a();
          }
        }),
        u = d.ref,
        f = d.focused,
        v = null !== s && "Próximamente" === s.label;
      return (0, E.jsxs)("div", {
        className: N.eventCardWrapper,
        children: [(0, E.jsxs)("div", {
          ref: u,
          className: "".concat(N.eventCard, " ").concat(f ? N.eventCardFocused : ""),
          onClick: l,
          "data-focuskey": o,
          children: [s && (0, E.jsx)("span", {
            className: N.eventCardBadge,
            style: {
              backgroundColor: "var(".concat(s.colorVar, ")")
            },
            children: s.label
          }), c && (0, E.jsx)("img", {
            src: c,
            alt: r.title,
            className: N.eventCardImg,
            draggable: !1,
            decoding: "async"
          })]
        }), v && (0, E.jsxs)("div", {
          className: N.eventCardDateInfo,
          children: [(0, E.jsx)("span", {
            className: N.eventCardDateText,
            children: (t = new Date(r.gmt0_unlocked.replace(" ", "T") + "Z"), "".concat(t.toLocaleDateString("es-CL", {
              weekday: "short",
              day: "numeric",
              month: "long"
            }), ", ").concat(t.toLocaleTimeString("es-CL", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: !1
            }), " hrs"))
          }), (0, E.jsx)("span", {
            className: N.eventCardDateTitle,
            children: r.title
          })]
        })]
      });
    }
    return e("default", function () {
      var e,
        n,
        t,
        r = l().slug,
        o = s((0, k.useState)("relacionados"), 2),
        c = o[0],
        u = o[1],
        f = function (e) {
          var n,
            t,
            r,
            o = h(function () {
              return S.getEvent(e);
            }, [e], {
              enabled: !!e
            }),
            a = o.data,
            i = o.isLoading,
            c = null !== (n = null == a ? void 0 : a.data) && void 0 !== n ? n : null,
            s = null == c || null === (t = c.category) || void 0 === t ? void 0 : t.slug,
            l = h(function () {
              return S.getAll({
                slug_exclude: e || "",
                category: s
              });
            }, [e, s], {
              enabled: !!s
            }),
            d = l.data,
            u = l.isLoading;
          return {
            event: c,
            relatedEvents: null !== (r = null == d ? void 0 : d.data) && void 0 !== r ? r : [],
            isLoading: i || u
          };
        }(r),
        v = f.event,
        _ = f.relatedEvents,
        g = f.isLoading,
        b = (e = i(), {
          goToLive: n = function (n) {
            e("/live", {
              state: {
                signal: n
              }
            });
          },
          goToProgram: t = function (n) {
            e("/programas/".concat(n));
          },
          goToEvent: function (n) {
            e("/eventos/".concat(n));
          },
          goToEventPlay: function (e) {
            var r, o;
            null !== (r = e.live_associated) && void 0 !== r && r.key ? n(e.live_associated.key) : null !== (o = e.program_associated) && void 0 !== o && o.key && t(e.program_associated.key);
          },
          goBack: function () {
            e(-1);
          }
        }),
        j = b.goToEventPlay,
        C = b.goToEvent,
        T = b.goBack,
        P = p({
          focusKey: "EVENT-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        D = P.ref,
        F = P.focusKey,
        z = s((0, k.useState)(0), 2),
        I = z[0],
        K = z[1],
        V = x({
          onScroll: K
        }),
        R = V.scrollRef,
        W = V.scrollToTop,
        G = V.scrollToSection,
        $ = V.scrollToElement,
        M = w(),
        U = M.trackRef,
        Y = M.scrollToCard;
      (0, k.useEffect)(function () {
        !g && v && setTimeout(function () {
          return d("EVENT-PLAY");
        }, 300);
      }, [g, v]), (0, k.useEffect)(function () {
        var e = function (e) {
          m(e, "Back") && (e.preventDefault(), e.stopPropagation(), T());
        };
        return window.addEventListener("keydown", e), function () {
          return window.removeEventListener("keydown", e);
        };
      }, [T]);
      var Z = (0, k.useCallback)(function () {
          G("content", "start", .25 * window.innerHeight);
        }, [G]),
        q = (0, k.useCallback)(function (e) {
          Y(e);
          var n = R.current;
          n && $(n.querySelector('[data-focuskey="'.concat(e, '"]')));
        }, [Y, R, $]),
        H = (0, k.useCallback)(function () {
          v && j(v);
        }, [v, j]),
        X = v ? .85 * Math.min(Math.abs(I) / (window.innerHeight || 1080), 1) : 0;
      return (0, E.jsx)(a.Provider, {
        value: F,
        children: (0, E.jsx)("div", {
          ref: D,
          className: N.container,
          children: g || !v ? (0, E.jsx)(y, {}) : (0, E.jsxs)(E.Fragment, {
            children: [(0, E.jsx)(B, {
              event: v,
              scrollOpacity: X
            }), (0, E.jsxs)("div", {
              ref: R,
              className: N.scrollContainer,
              children: [(0, E.jsx)(O, {
                event: v,
                onBannerFocused: W,
                onPlay: H
              }), (0, E.jsx)(A, {
                activeTab: c,
                setActiveTab: u,
                onTabsFocused: Z
              }), (0, E.jsxs)("div", {
                className: N.contentArea,
                children: ["relacionados" === c && (_.length > 0 ? (0, E.jsx)("div", {
                  className: N.eventsWrapper,
                  children: (0, E.jsxs)("div", {
                    ref: U,
                    className: N.eventsTrack,
                    children: [_.map(function (e, n) {
                      var t = "EVENT-CARD-".concat(n);
                      return (0, E.jsx)(L, {
                        event: e,
                        focusKey: t,
                        onCardFocus: function () {
                          return q(t);
                        },
                        onPress: C
                      }, "".concat(e.key, "-").concat(n));
                    }), (0, E.jsx)("div", {
                      className: N.eventsEndSpacer
                    })]
                  })
                }) : (0, E.jsx)("p", {
                  className: N.emptyText,
                  children: "No hay eventos relacionados disponibles."
                })), "detalles" === c && (0, E.jsx)("div", {
                  className: N.detailContainer,
                  children: (0, E.jsxs)("div", {
                    children: [(0, E.jsx)("h3", {
                      className: N.detailSynopsisTitle,
                      children: "Sinopsis"
                    }), (0, E.jsx)("p", {
                      className: N.detailSynopsis,
                      children: v.description || v.description_short
                    })]
                  })
                })]
              })]
            })]
          })
        })
      });
    }), {
      setters: [function (e) {
        r = e.$, a = e.K, i = e.U, l = e.W, d = e.X, u = e.Z, f = e.c, v = e.l, _ = e.n, p = e.q, g = e.t;
      }, function (e) {
        m = e.l, y = e.n, b = e.s, h = e.t;
      }, function (e) {
        x = e.t;
      }, function (e) {
        w = e.n, j = e.t;
      }, function (e) {
        C = e.t;
      }],
      execute: function () {
        var e, t;
        (T = document.createElement("style")).textContent = "._container_1noa9_3{outline:none;width:100%;height:100vh;position:relative;overflow:hidden}._scrollContainer_1noa9_11{will-change:transform;width:100%;transition:transform .35s cubic-bezier(.4,0,.2,1)}._scrollContainer_1noa9_11::-webkit-scrollbar{display:none}._bannerBg_1noa9_23{z-index:-1;background:var(--clr-primary);position:fixed;top:0;bottom:0;left:0;right:0}._bannerBgImage_1noa9_30{background-position:top;background-repeat:no-repeat;background-size:100%;position:absolute;top:0;bottom:0;left:0;right:0}._bannerOverlayLeft_1noa9_38{background:linear-gradient(to right, var(--clr-primary), transparent);width:33%;position:absolute;top:0;bottom:0;left:0}._bannerOverlayBottom_1noa9_47{background:linear-gradient(to top, var(--clr-primary) 0%, transparent 100%);height:66%;position:absolute;bottom:0;left:0;right:0}._bannerScrollOverlay_1noa9_56{background:var(--clr-primary);transition:opacity .1s;position:absolute;top:0;bottom:0;left:0;right:0}._bannerContent_1noa9_63{z-index:10;flex-direction:column;align-items:flex-start;min-height:52vh;padding:6vh 3vw 0;display:flex;position:relative}._bannerContent_1noa9_63>*+*{margin-top:1.2rem}._eventStatusBadge_1noa9_78{text-transform:uppercase;letter-spacing:.5px;background:var(--foc-tertiary);color:var(--clr-secondary-subtitle);border-radius:8px;padding:6px 14px;font-size:1rem;font-weight:600}._eventLogo_1noa9_90{object-fit:contain;max-width:25vw;max-height:15vh}._classificationBadge_1noa9_97{text-transform:uppercase;letter-spacing:.5px;color:#fff;background:#31343c;border-radius:6px;padding:6px 14px;font-size:1rem;font-weight:600}._categoryRow_1noa9_109{flex-direction:row;align-items:center;height:8vh;display:flex}._categoryRow_1noa9_109>*+*{margin-left:1rem}._categoryLogo_1noa9_120{object-fit:contain;width:auto;height:6vh}._categoryName_1noa9_126{color:var(--clr-primary-text);font-size:1.4rem;font-weight:500}._eventTitle_1noa9_133{color:var(--clr-primary-title);margin:0;font-size:2rem;font-weight:700}._eventDescription_1noa9_140{color:var(--clr-primary-subtitle);opacity:.8;max-width:45vw;font-size:1.1rem;font-weight:500;line-height:1.5}._tabsContainer_1noa9_151{z-index:10;border-bottom:2px solid rgba(255,255,255,.15);padding:0 3vw;position:relative}._tabsInner_1noa9_158{flex-direction:row;display:flex}._tabsInner_1noa9_158>*+*{margin-left:2.5rem}._tabBtn_1noa9_167{color:var(--clr-secondary-text);cursor:pointer;background:0 0;border:none;border-bottom:4px solid transparent;outline:none;margin-bottom:-2px;padding:1rem .5rem;font-size:1.3rem;font-weight:500;transition:color .2s}._tabBtnActive_1noa9_181{color:#fff;border-bottom-color:#fff}._tabBtnFocused_1noa9_186{color:#fff;border-bottom-color:var(--foc-primary)}._contentArea_1noa9_193{z-index:5;min-height:100vh;padding:2.5rem 3vw 5rem;position:relative}._eventsWrapper_1noa9_202{width:100%;margin:-25px -20px;padding:25px 20px;position:relative;overflow:hidden}._eventsTrack_1noa9_210{will-change:transform;transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex}._eventsTrack_1noa9_210>*+*{margin-left:1.5rem}._eventCard_1noa9_220{cursor:pointer;background:#0a0a0a;border:3px solid transparent;border-radius:10px;outline:none;flex-shrink:0;width:22vw;height:12.375vw;transition:border-color .2s;position:relative;overflow:hidden}._eventCardFocused_1noa9_234{border-color:var(--foc-primary);z-index:10;box-shadow:0 0 20px rgba(255,19,118,.3)}._eventCardImg_1noa9_240{object-fit:cover;width:100%;height:100%}._eventCardBadge_1noa9_246{z-index:10;font-size:var(--font-size-caption);text-transform:uppercase;letter-spacing:.05em;color:#000;border-radius:8px;padding:.25rem .75rem;font-weight:600;position:absolute;top:8px;left:8px}._eventsEndSpacer_1noa9_260{flex-shrink:0;width:4rem}._eventCardWrapper_1noa9_266{flex-direction:column;flex-shrink:0;display:flex}._eventCardDateInfo_1noa9_272{flex-direction:column;padding:.5rem 0;display:flex}._eventCardDateText_1noa9_278{font-size:var(--font-size-caption);text-transform:uppercase;letter-spacing:.03em;color:var(--clr-secondary-text);font-weight:600}._eventCardDateTitle_1noa9_286{font-size:var(--font-size-caption);color:var(--clr-secondary-text);margin-top:.15rem;font-weight:500}._detailContainer_1noa9_295{flex-direction:row;display:flex}._detailSynopsisTitle_1noa9_300{color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem;font-size:1.4rem;font-weight:700}._detailSynopsis_1noa9_300{color:rgba(255,255,255,.6);max-width:50vw;font-size:1.2rem;font-weight:500;line-height:1.6}._emptyText_1noa9_319{color:var(--clr-primary-text);opacity:.6;font-size:1.2rem}\n/*$vite$:1*/", document.head.appendChild(T), k = r(u(), 1), S = {
          getAll: (t = c(n().m(function e(t) {
            var r, a;
            return n().w(function (e) {
              for (;;) switch (e.n) {
                case 0:
                  return e.n = 1, _.post(f, o({}, t));
                case 1:
                  return r = e.v, a = r.data, e.a(2, a);
              }
            }, e);
          })), function (e) {
            return t.apply(this, arguments);
          }),
          getEvent: (e = c(n().m(function e(t) {
            var r, o;
            return n().w(function (e) {
              for (;;) switch (e.n) {
                case 0:
                  return e.n = 1, _.post(v, {
                    event: t
                  });
                case 1:
                  return r = e.v, o = r.data, e.a(2, o);
              }
            }, e);
          })), function (n) {
            return e.apply(this, arguments);
          })
        }, N = {
          container: "_container_1noa9_3",
          scrollContainer: "_scrollContainer_1noa9_11",
          bannerBg: "_bannerBg_1noa9_23",
          bannerBgImage: "_bannerBgImage_1noa9_30",
          bannerOverlayLeft: "_bannerOverlayLeft_1noa9_38",
          bannerOverlayBottom: "_bannerOverlayBottom_1noa9_47",
          bannerScrollOverlay: "_bannerScrollOverlay_1noa9_56",
          bannerContent: "_bannerContent_1noa9_63",
          eventStatusBadge: "_eventStatusBadge_1noa9_78",
          eventLogo: "_eventLogo_1noa9_90",
          classificationBadge: "_classificationBadge_1noa9_97",
          categoryRow: "_categoryRow_1noa9_109",
          categoryLogo: "_categoryLogo_1noa9_120",
          categoryName: "_categoryName_1noa9_126",
          eventTitle: "_eventTitle_1noa9_133",
          eventDescription: "_eventDescription_1noa9_140",
          tabsContainer: "_tabsContainer_1noa9_151",
          tabsInner: "_tabsInner_1noa9_158",
          tabBtn: "_tabBtn_1noa9_167",
          tabBtnActive: "_tabBtnActive_1noa9_181",
          tabBtnFocused: "_tabBtnFocused_1noa9_186",
          contentArea: "_contentArea_1noa9_193",
          eventsWrapper: "_eventsWrapper_1noa9_202",
          eventsTrack: "_eventsTrack_1noa9_210",
          eventCard: "_eventCard_1noa9_220",
          eventCardFocused: "_eventCardFocused_1noa9_234",
          eventCardImg: "_eventCardImg_1noa9_240",
          eventCardBadge: "_eventCardBadge_1noa9_246",
          eventsEndSpacer: "_eventsEndSpacer_1noa9_260",
          eventCardWrapper: "_eventCardWrapper_1noa9_266",
          eventCardDateInfo: "_eventCardDateInfo_1noa9_272",
          eventCardDateText: "_eventCardDateText_1noa9_278",
          eventCardDateTitle: "_eventCardDateTitle_1noa9_286",
          detailContainer: "_detailContainer_1noa9_295",
          detailSynopsisTitle: "_detailSynopsisTitle_1noa9_300",
          detailSynopsis: "_detailSynopsis_1noa9_300",
          emptyText: "_emptyText_1noa9_319"
        }, E = g();
      }
    };
  });
}();