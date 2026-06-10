!function () {
  function e() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,
      t,
      i = "function" == typeof Symbol ? Symbol : {},
      o = i.iterator || "@@iterator",
      a = i.toStringTag || "@@toStringTag";
    function s(e, i, o, a) {
      var s = i && i.prototype instanceof c ? i : c,
        u = Object.create(s.prototype);
      return n(u, "_invoke", function (e, n, i) {
        var o,
          a,
          s,
          c = 0,
          u = i || [],
          d = !1,
          f = {
            p: 0,
            n: 0,
            v: r,
            a: _,
            f: _.bind(r, 4),
            d: function (e, n) {
              return o = e, a = 0, s = r, f.n = n, l;
            }
          };
        function _(e, n) {
          for (a = e, s = n, t = 0; !d && c && !i && t < u.length; t++) {
            var i,
              o = u[t],
              _ = f.p,
              p = o[2];
            e > 3 ? (i = p === n) && (s = o[(a = o[4]) ? 5 : (a = 3, 3)], o[4] = o[5] = r) : o[0] <= _ && ((i = e < 2 && _ < o[1]) ? (a = 0, f.v = n, f.n = o[1]) : _ < p && (i = e < 3 || o[0] > n || n > p) && (o[4] = e, o[5] = n, f.n = p, a = 0));
          }
          if (i || e > 1) return l;
          throw d = !0, n;
        }
        return function (i, u, p) {
          if (c > 1) throw TypeError("Generator is already running");
          for (d && 1 === u && _(u, p), a = u, s = p; (t = a < 2 ? r : s) || !d;) {
            o || (a ? a < 3 ? (a > 1 && (f.n = -1), _(a, s)) : f.n = s : f.v = s);
            try {
              if (c = 2, o) {
                if (a || (i = "next"), t = o[i]) {
                  if (!(t = t.call(o, s))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  s = t.value, a < 2 && (a = 0);
                } else 1 === a && (t = o.return) && t.call(o), a < 2 && (s = TypeError("The iterator does not provide a '" + i + "' method"), a = 1);
                o = r;
              } else if ((t = (d = f.n < 0) ? s : e.call(n, f)) !== l) break;
            } catch (t) {
              o = r, a = 1, s = t;
            } finally {
              c = 1;
            }
          }
          return {
            value: t,
            done: d
          };
        };
      }(e, o, a), !0), u;
    }
    var l = {};
    function c() {}
    function u() {}
    function d() {}
    t = Object.getPrototypeOf;
    var f = [][o] ? t(t([][o]())) : (n(t = {}, o, function () {
        return this;
      }), t),
      _ = d.prototype = c.prototype = Object.create(f);
    function p(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, n(e, a, "GeneratorFunction")), e.prototype = Object.create(_), e;
    }
    return u.prototype = d, n(_, "constructor", d), n(d, "constructor", u), u.displayName = "GeneratorFunction", n(d, a, "GeneratorFunction"), n(_), n(_, a, "Generator"), n(_, o, function () {
      return this;
    }), n(_, "toString", function () {
      return "[object Generator]";
    }), (e = function () {
      return {
        w: s,
        m: p
      };
    })();
  }
  function n(e, r, t, i) {
    var o = Object.defineProperty;
    try {
      o({}, "", {});
    } catch (e) {
      o = 0;
    }
    n = function (e, r, t, i) {
      function a(r, t) {
        n(e, r, function (e) {
          return this._invoke(r, t, e);
        });
      }
      r ? o ? o(e, r, {
        value: t,
        enumerable: !i,
        configurable: !i,
        writable: !i
      }) : e[r] = t : (a("next", 0), a("throw", 1), a("return", 2));
    }, n(e, r, t, i);
  }
  function r(e, n) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, n) {
      var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != r) {
        var t,
          i,
          o,
          a,
          s = [],
          l = !0,
          c = !1;
        try {
          if (o = (r = r.call(e)).next, 0 === n) {
            if (Object(r) !== r) return;
            l = !1;
          } else for (; !(l = (t = o.call(r)).done) && (s.push(t.value), s.length !== n); l = !0);
        } catch (e) {
          c = !0, i = e;
        } finally {
          try {
            if (!l && null != r.return && (a = r.return(), Object(a) !== a)) return;
          } finally {
            if (c) throw i;
          }
        }
        return s;
      }
    }(e, n) || function (e, n) {
      if (e) {
        if ("string" == typeof e) return t(e, n);
        var r = {}.toString.call(e).slice(8, -1);
        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? t(e, n) : void 0;
      }
    }(e, n) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function t(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var r = 0, t = Array(n); r < n; r++) t[r] = e[r];
    return t;
  }
  function i(e, n, r, t, i, o, a) {
    try {
      var s = e[o](a),
        l = s.value;
    } catch (e) {
      return void r(e);
    }
    s.done ? n(l) : Promise.resolve(l).then(t, i);
  }
  function o(e) {
    return function () {
      var n = this,
        r = arguments;
      return new Promise(function (t, o) {
        var a = e.apply(n, r);
        function s(e) {
          i(a, t, o, s, l, "next", e);
        }
        function l(e) {
          i(a, t, o, s, l, "throw", e);
        }
        s(void 0);
      });
    };
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./catalogService-legacy.js", "./VastPlayer-legacy.js"], function (n, t) {
    var i, a, s, l, c, u, d, f, _, p, v, m, g, h, y, x, k, w, b, L, P, S;
    function B() {
      return C.apply(this, arguments);
    }
    function C() {
      return (C = o(e().m(function n() {
        var r, t, i, o;
        return e().w(function (e) {
          for (;;) if (0 === e.n) return r = "dps_session_dpssid", t = j(""), i = localStorage.getItem(r), o = "0", i || (i = j(""), localStorage.setItem(r, i), o = "1"), e.a(2, {
            dpssid: i,
            ndvc: o,
            sid: t
          });
        }, n);
      }))).apply(this, arguments);
    }
    function j() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        n = new Uint8Array(16);
      if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(n);else for (var r = 0; r < 16; r++) n[r] = Math.floor(256 * Math.random());
      return e + Array.from(n).map(function (e) {
        return e.toString(16).padStart(2, "0");
      }).join("");
    }
    function E(n) {
      var t = n.streamSrc,
        i = n.assetKey,
        a = n.vastUrl,
        c = n.signalName,
        d = n.currentEvent,
        _ = n.isFullscreen,
        p = void 0 !== _ && _,
        v = n.onBack,
        x = (0, k.useRef)(null),
        w = (0, k.useRef)(null),
        S = (0, k.useRef)(null),
        C = r((0, k.useState)(null), 2),
        j = C[0],
        E = C[1],
        T = r((0, k.useState)(!1), 2),
        A = T[0],
        z = T[1],
        I = u({
          focusKey: "LIVE-PLAYER-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: p
        }),
        F = I.ref,
        N = I.focusKey,
        D = u({
          focusKey: "LIVE-BTN-BACK",
          focusable: p,
          onEnterPress: function () {
            v && v();
          },
          onArrowPress: function (e) {
            return "up" !== e && "left" !== e && ("right" !== e || (l("LIVE-BTN-PLAYPAUSE"), !1));
          }
        }),
        R = D.ref,
        V = D.focused,
        O = u({
          focusKey: "LIVE-BTN-PLAYPAUSE",
          focusable: p,
          onEnterPress: function () {
            return Z();
          },
          onArrowPress: function (e) {
            return "up" !== e && ("left" !== e || (l("LIVE-BTN-BACK"), !1));
          }
        }),
        K = O.ref,
        U = O.focused;
      (0, k.useEffect)(function () {
        return f(!0), function () {
          f(!1);
        };
      }, []);
      var M = (0, k.useMemo)(function () {
          if (j) return function (e, n) {
            if (-1 !== n.indexOf(".ts") && -1 === n.indexOf("dai.google.com")) {
              var r = function (e, n) {
                if (!e || "undefined" === e || "null" === e) return e;
                try {
                  var r = new URL(e.startsWith("http") ? e : window.location.origin + (e.startsWith("/") ? "" : "/") + e);
                  return r.searchParams.set("dpssid", n.dpssid), r.searchParams.set("ndvc", n.ndvc), r.searchParams.set("sid", n.sid), e.startsWith("http") ? r.toString() : r.pathname + r.search;
                } catch (i) {
                  var t = e;
                  return ["dpssid=".concat(n.dpssid), "ndvc=".concat(n.ndvc), "sid=".concat(n.sid)].forEach(function (e) {
                    var n = e.split("=")[0],
                      r = new RegExp("([?&])".concat(n, "=([^&]*)"), "i");
                    t.match(r) ? t = t.replace(r, "$1".concat(e)) : t += (t.indexOf("?") > -1 ? "&" : "?") + e;
                  }), t;
                }
              }(n, j);
              e.open("GET", r, !0);
            }
          };
        }, [j]),
        H = function (n) {
          var t = n.streamSrc,
            i = n.assetKey,
            a = n.vastUrl,
            s = n.videoRef,
            l = n.adUiRef,
            c = n.onSessionParamsReady,
            u = (0, k.useRef)(null),
            d = r((0, k.useState)(!1), 2),
            f = d[0],
            _ = d[1],
            p = r((0, k.useState)("content"), 2),
            v = p[0],
            m = p[1],
            g = r((0, k.useState)(""), 2),
            h = g[0],
            y = g[1],
            x = (0, k.useRef)(i),
            w = (0, k.useRef)(t);
          x.current = i, w.current = t;
          var b = (0, k.useRef)(f);
          b.current = f;
          var L = (0, k.useRef)(0),
            P = (0, k.useRef)(null),
            S = !(!a || "" === a.trim() || "none" === a),
            C = "vast" === v,
            j = (0, k.useCallback)(function () {
              if (u.current) {
                try {
                  "function" == typeof u.current.destroy ? u.current.destroy() : "function" == typeof u.current.reset && u.current.reset();
                } catch (e) {
                  console.warn("[Live] Error cleaning StreamManager", e);
                }
                u.current = null;
              }
            }, []),
            E = (0, k.useCallback)(function () {
              null !== P.current && (clearTimeout(P.current), P.current = null);
            }, []),
            T = (0, k.useCallback)(o(e().m(function n() {
              var r, t, i, o, a, d, f, p, v, g, h;
              return e().w(function (e) {
                for (;;) switch (e.p = e.n) {
                  case 0:
                    if (r = s.current) {
                      e.n = 1;
                      break;
                    }
                    return e.a(2);
                  case 1:
                    return t = L.current, i = x.current, o = w.current, j(), y(""), a = null, e.p = 2, e.n = 3, B();
                  case 3:
                    a = e.v, console.log("[Live] Session params obtenidos:", a), e.n = 5;
                    break;
                  case 4:
                    e.p = 4, h = e.v, console.warn("[Live] No se pudieron obtener session params:", h);
                  case 5:
                    if (L.current === t) {
                      e.n = 6;
                      break;
                    }
                    return console.warn("[Live] Generación cambió durante getHlsSessionParams, abortando"), e.a(2);
                  case 6:
                    if (a && c && c(a), d = function (e) {
                      L.current === t ? e ? (console.log("[Live] Resolved stream URL:", e), y(e)) : console.error("[Live] No URL provided to loadUrl") : console.warn("[Live] Stale loadUrl call ignored");
                    }, i && l && l.current && "undefined" != typeof google && google && google.ima && google.ima.dai) {
                      console.log("[Live] Inicializando Google IMA DAI para:", i);
                      try {
                        f = new google.ima.dai.api.StreamManager(r, l.current), u.current = f, f.addEventListener(google.ima.dai.api.StreamEvent.Type.LOADED, function (e) {
                          if (L.current === t) {
                            console.log("[Live] DAI Stream loaded");
                            var n = e.getStreamData().url;
                            m("content"), d(n);
                          }
                        }, !1), f.addEventListener(google.ima.dai.api.StreamEvent.Type.ERROR, function (e) {
                          L.current === t && (console.error("[Live] DAI Error, playing backup stream.", e), m("content"), d(o));
                        }, !1), f.addEventListener(google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED, function () {
                          L.current === t && (console.log("[Live] Ad Break Started"), _(!0), r.controls = !1, l.current && (l.current.style.display = "block"));
                        }, !1), f.addEventListener(google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED, function () {
                          L.current === t && (console.log("[Live] Ad Break Ended"), _(!1), r.controls = !1, l.current && (l.current.style.display = "none"));
                        }, !1), f.addEventListener(google.ima.dai.api.StreamEvent.Type.AD_PROGRESS, function (e) {
                          if (L.current === t) {
                            var n = e.getStreamData().adProgressData;
                            n && console.log("[Live] Ad ".concat(n.adPosition, "/").concat(n.totalAds, " ").concat(Math.floor(n.duration - n.currentTime), "s remaining"));
                          }
                        }, !1), p = function () {
                          b.current && l.current && (l.current.style.display = "none");
                        }, v = function () {
                          b.current && l.current && (l.current.style.display = "block");
                        }, r.addEventListener("pause", p), r.addEventListener("play", v), (g = new google.ima.dai.api.LiveStreamRequest()).assetKey = i, f.requestStream(g), console.log("[Live] DAI LiveStreamRequest enviado con assetKey:", i);
                      } catch (n) {
                        console.error("[Live] Error initializing IMA DAI:", n), m("content"), d(o);
                      }
                    } else i && console.log("[Live] IMA SDK no disponible. Reproduciendo HLS estándar."), m("content"), d(o);
                  case 7:
                    return e.a(2);
                }
              }, n, null, [[2, 4]]);
            })), [s, l, j, c]),
            A = (0, k.useCallback)(function () {
              console.log("[Live] VAST preroll terminado, iniciando DAI/HLS..."), m("dai"), T();
            }, [T]),
            z = (0, k.useRef)(-1),
            I = (0, k.useCallback)(function (e) {
              if (u.current) for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.pts !== z.current && (z.current = r.pts, u.current.processMetadata("ID3", r.data, r.pts));
              }
            }, []);
          return (0, k.useEffect)(function () {
            if (s.current && t) {
              L.current++;
              var e = L.current;
              return console.log("[Live] Nueva señal, generación:", e, "src:", t), E(), j(), y(""), _(!1), z.current = -1, S ? (console.log("[Live] Señal con VAST preroll, mostrando preroll..."), m("vast")) : (console.log("[Live] Sin VAST preroll, iniciando DAI/HLS directo..."), m("dai"), P.current = setTimeout(function () {
                P.current = null, L.current === e ? T() : console.warn("[Live] setTimeout stale, generación cambió durante delay");
              }, 50)), function () {
                E(), j(), y(""), _(!1), m("content");
              };
            }
          }, [t, i, a]), {
            isAdPlaying: f,
            showVastPreroll: C,
            vastAdUrl: S ? a : null,
            onVastFinished: A,
            processMetadata: I,
            adPhase: v,
            resolvedStreamUrl: h
          };
        }({
          streamSrc: t,
          assetKey: i,
          vastUrl: a,
          videoRef: x,
          adUiRef: w,
          onSessionParamsReady: E
        }),
        G = m({
          videoRef: x,
          src: H.resolvedStreamUrl,
          autoplay: !0,
          isLive: !0,
          hlsConfig: P,
          xhrSetup: M,
          onMetadata: H.processMetadata
        }),
        X = g({
          autoHideMs: 4e3
        }),
        W = X.isUIVisible,
        Y = X.resetUIVisibility;
      h({
        onBack: v || function () {},
        isUIVisible: W,
        showUI: Y,
        isLive: !0,
        playingAds: H.isAdPlaying || H.showVastPreroll,
        isPlaying: !A,
        pause: G.pause,
        enabled: p,
        focusKeys: {
          playPause: "LIVE-BTN-PLAYPAUSE"
        }
      });
      var Z = (0, k.useCallback)(function () {
        var e = x.current;
        e && (e.paused ? (e.play(), z(!1)) : (e.pause(), z(!0)));
      }, []);
      (0, k.useEffect)(function () {
        var e = x.current;
        if (e) {
          var n = function () {
              return z(!1);
            },
            r = function () {
              return z(!0);
            };
          return e.addEventListener("play", n), e.addEventListener("pause", r), function () {
            e.removeEventListener("play", n), e.removeEventListener("pause", r);
          };
        }
      }, [t]);
      var $ = r((0, k.useState)(!0), 2),
        q = $[0],
        J = $[1];
      (0, k.useEffect)(function () {
        var e = x.current;
        if (e) {
          J(!0);
          var n = function () {
              return J(!1);
            },
            r = function () {
              return J(!0);
            };
          return e.addEventListener("playing", n), e.addEventListener("waiting", r), function () {
            e.removeEventListener("playing", n), e.removeEventListener("waiting", r);
          };
        }
      }, [t]), (0, k.useEffect)(function () {
        p && !H.showVastPreroll && setTimeout(function () {
          return l("LIVE-BTN-PLAYPAUSE");
        }, 200);
      }, [H.showVastPreroll, p]);
      var Q = "".concat(b.livePlayerContainer).concat(p ? " ".concat(b.livePlayerContainerFullscreen) : "");
      return (0, L.jsx)(s.Provider, {
        value: N,
        children: (0, L.jsxs)("div", {
          ref: function (e) {
            F.current = e, S.current = e;
          },
          className: Q,
          children: [(0, L.jsx)("video", {
            ref: x,
            className: b.videoElement,
            autoPlay: !0,
            muted: !0,
            playsInline: !0,
            controls: !1,
            tabIndex: -1
          }), !p && (0, L.jsx)("div", {
            className: b.videoGradient
          }), (0, L.jsx)("div", {
            ref: w,
            className: b.adUiOverlay
          }), q && !H.showVastPreroll && (0, L.jsx)("div", {
            className: b.videoLoading,
            children: (0, L.jsx)("div", {
              className: b.spinner
            })
          }), H.showVastPreroll && H.vastAdUrl && (0, L.jsx)(y, {
            url: H.vastAdUrl,
            portalTarget: S.current,
            onAdsFinished: H.onVastFinished
          }), p && W && (0, L.jsxs)("div", {
            className: b.fullscreenOverlay,
            children: [(0, L.jsxs)("div", {
              className: b.fullscreenTopBar,
              children: [(0, L.jsx)("button", {
                ref: R,
                className: "".concat(b.fullscreenBackBtn, " ").concat(V ? b.fullscreenBackBtnFocused : ""),
                onClick: function () {
                  v && v();
                },
                children: (0, L.jsx)("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 16 28",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: (0, L.jsx)("path", {
                    d: "M15.3882 0.616323C15.7799 1.01107 16 1.5464 16 2.10458C16 2.66275 15.7799 3.19808 15.3882 3.59283L5.04411 14.0127L15.3882 24.4326C15.7688 24.8296 15.9795 25.3613 15.9747 25.9133C15.9699 26.4652 15.7502 26.9932 15.3627 27.3835C14.9753 27.7737 14.4511 27.9951 13.9032 27.9999C13.3553 28.0047 12.8274 27.7925 12.4333 27.4091L0.611839 15.501C0.220079 15.1062 9.53674e-07 14.5709 9.53674e-07 14.0127C9.53674e-07 13.4545 0.220079 12.9192 0.611839 12.5245L12.4333 0.616323C12.8252 0.221692 13.3566 0 13.9107 0C14.4649 0 14.9963 0.221692 15.3882 0.616323Z",
                    fill: "currentColor"
                  })
                })
              }), !H.showVastPreroll && (0, L.jsx)("button", {
                ref: K,
                className: "".concat(b.fullscreenPlayPauseBtn, " ").concat(U ? b.fullscreenPlayPauseBtnFocused : ""),
                onClick: Z,
                children: A ? (0, L.jsx)("svg", {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 16 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: (0, L.jsx)("path", {
                    d: "M14.5069 12.335C16.4982 11.0454 16.4971 8.95392 14.5069 7.66503L3.60552 0.605085C1.61424 -0.684496 0 0.155193 0 2.47779V17.5223C0 19.8461 1.61532 20.6838 3.60552 19.395L14.5069 12.335Z",
                    fill: "currentColor"
                  })
                }) : (0, L.jsx)("svg", {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 30 40",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: (0, L.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M5 0C2.24 0 0 2.24 0 5V35C0 37.76 2.24 40 5 40C7.76 40 10 37.76 10 35V5C10 2.24 7.76 0 5 0ZM30 5V35C30 37.76 27.76 40 25 40C22.24 40 20 37.76 20 35V5C20 2.24 22.24 0 25 0C27.76 0 30 2.24 30 5Z",
                    fill: "currentColor"
                  })
                })
              }), (0, L.jsx)("span", {
                className: b.fullscreenTitle,
                children: c
              })]
            }), (0, L.jsx)("div", {
              className: b.fullscreenBottomBar,
              children: (0, L.jsxs)("div", {
                className: b.fullscreenLiveBadge,
                children: [(0, L.jsx)("span", {
                  className: b.liveDot
                }), "EN VIVO", d && (0, L.jsx)("span", {
                  style: {
                    marginLeft: "12px",
                    opacity: .7
                  },
                  children: d.title
                })]
              })
            })]
          })]
        })
      });
    }
    function T(e) {
      var n,
        r,
        t = e.epg,
        i = e.selectedKeyLive,
        o = (0, k.useMemo)(function () {
          if (!i) return {
            first: null,
            second: null,
            highlight: !1
          };
          var e = t.find(function (e) {
            return e.key_live === i;
          });
          if (!e) return {
            first: null,
            second: null,
            highlight: !1
          };
          var n = new Date(),
            r = e.events.filter(function (e) {
              return new Date(e.endTime) > n;
            }).sort(function (e, n) {
              return new Date(e.beginTime).getTime() - new Date(n.beginTime).getTime();
            });
          if (0 === r.length) return {
            first: null,
            second: null,
            highlight: !1
          };
          var o = r[0];
          return new Date(o.beginTime) <= n && new Date(o.endTime) > n ? {
            first: "Ahora",
            second: r.length > 1 ? "A Continuación" : null,
            highlight: !1
          } : {
            first: "A CONTINUACIÓN",
            second: null,
            highlight: !0
          };
        }, [t, i]);
      return (0, L.jsxs)("div", {
        className: S.statusBar,
        children: [(0, L.jsx)("div", {
          className: S.statusLogoSpacer
        }), (0, L.jsx)("span", {
          className: S.statusLabel,
          children: null !== (n = o.first) && void 0 !== n ? n : "Ahora"
        }), (0, L.jsx)("span", {
          className: S.statusLabel,
          children: null !== (r = o.second) && void 0 !== r ? r : "A Continuación"
        })]
      });
    }
    function A(e) {
      return e.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      });
    }
    function z(e) {
      var n = e.event,
        r = e.now,
        t = e.focusKey,
        i = e.onSelect,
        o = e.onCardFocus,
        a = e.isPlaceholder,
        s = void 0 !== a && a,
        l = e.channelName,
        c = e.isLast,
        d = void 0 !== c && c,
        f = u({
          focusKey: t,
          onEnterPress: i,
          onFocus: function () {
            return null == o ? void 0 : o();
          },
          onArrowPress: function (e) {
            return "right" !== e || !d;
          }
        }),
        _ = f.ref,
        p = f.focused;
      (0, k.useEffect)(function () {
        p && _.current && _.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      }, [p, _]);
      var v = new Date(n.beginTime),
        m = new Date(n.endTime),
        g = 0;
      if (v <= r && m > r) {
        var h = r.getTime() - v.getTime(),
          y = m.getTime() - v.getTime();
        g = y > 0 ? Math.min(100, h / y * 100) : 0;
      }
      return (0, L.jsxs)("div", {
        ref: _,
        className: [S.itemCard, p && S.itemCardFocused, s && S.itemCardPlaceholder].filter(Boolean).join(" "),
        onClick: i,
        onMouseEnter: function () {
          return null == o ? void 0 : o();
        },
        children: [(0, L.jsx)("p", {
          className: S.itemTitle,
          children: n.title || l || "Sin información"
        }), n.episodeTitle && (0, L.jsx)("p", {
          className: S.itemEpisode,
          children: n.episodeTitle
        }), (0, L.jsxs)("p", {
          className: S.itemTime,
          children: [A(v), " - ", A(m)]
        }), (0, L.jsx)("div", {
          className: S.progressBar,
          children: (0, L.jsx)("div", {
            className: S.progressFill,
            style: {
              width: "".concat(g, "%")
            }
          })
        })]
      });
    }
    function I(e) {
      var n = e.signal,
        r = e.epg,
        t = e.now,
        i = e.rowIndex,
        o = e.onSelectSignal,
        a = e.onCardFocus,
        s = (0, k.useMemo)(function () {
          var e = r.find(function (e) {
            return e.key_live === n.key_live || e.key_live === n.key;
          });
          return e ? e.events.filter(function (e) {
            return new Date(e.endTime) > t;
          }).sort(function (e, n) {
            return new Date(e.beginTime).getTime() - new Date(n.beginTime).getTime();
          }).slice(0, 5) : [];
        }, [r, n, t]),
        l = "0" !== n.restriction && "" !== n.restriction,
        c = [S.channelLogo, l && S.channelLogoRestricted].filter(Boolean).join(" ");
      return (0, L.jsxs)("div", {
        className: S.gridRow,
        id: "live-row-".concat(i),
        children: [(0, L.jsxs)("div", {
          className: c,
          children: [n.logo ? (0, L.jsx)("img", {
            src: n.logo,
            alt: n.name_live,
            className: S.channelLogoImg,
            draggable: !1,
            decoding: "async"
          }) : (0, L.jsx)("span", {
            className: S.channelLogoText,
            children: n.name_live
          }), l && (0, L.jsx)("svg", {
            className: S.lockIcon,
            viewBox: "0 0 24 24",
            fill: "currentColor",
            children: (0, L.jsx)("path", {
              d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
            })
          })]
        }), (0, L.jsx)("div", {
          className: S.cardsStrip,
          children: s.length > 0 ? s.map(function (e, r) {
            return (0, L.jsx)(z, {
              event: e,
              now: t,
              focusKey: "live-card-".concat(i, "-").concat(r),
              onSelect: function () {
                return o(n.key_live);
              },
              onCardFocus: function () {
                return a(n.key_live);
              },
              channelName: n.name_live,
              isLast: r === s.length - 1
            }, e.id);
          }) : (0, L.jsx)(z, {
            event: {
              id: "placeholder-".concat(n.key_live),
              programId: "",
              beginTime: t.toISOString(),
              endTime: new Date(t.getTime() + 36e5).toISOString(),
              title: n.name_live,
              synopsis: "",
              genre: null,
              episodeTitle: "",
              pictures: {
                photo: "",
                poster: "",
                cover: "",
                background: ""
              },
              rating: ""
            },
            now: t,
            focusKey: "live-card-".concat(i, "-0"),
            onSelect: function () {
              return o(n.key_live);
            },
            onCardFocus: function () {
              return a(n.key_live);
            },
            isPlaceholder: !0,
            channelName: n.name_live,
            isLast: !0
          })
        })]
      });
    }
    function F(e) {
      var n = e.playlistPremium,
        r = e.epg,
        t = e.now,
        i = e.isFullscreen,
        o = e.isLoading,
        a = e.onSelectSignal,
        c = e.onRowFocus,
        d = u({
          focusKey: "LIVE-GRID",
          focusable: !i,
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        f = d.ref,
        _ = d.focusKey;
      if ((0, k.useEffect)(function () {
        !o && n.length > 0 && !i && setTimeout(function () {
          return l("LIVE-GRID");
        }, 300);
      }, [o, n.length]), o) return null;
      var p = i;
      return (0, L.jsx)(s.Provider, {
        value: _,
        children: (0, L.jsx)("div", {
          ref: f,
          className: S.gridContainer,
          id: "live-grid-container",
          style: p ? {
            display: "none"
          } : void 0,
          children: n.filter(function (e) {
            return e.active;
          }).map(function (e, n) {
            return (0, L.jsx)(I, {
              signal: e,
              epg: r,
              now: t,
              rowIndex: n,
              onSelectSignal: a,
              onCardFocus: c
            }, e.key_live);
          })
        })
      });
    }
    return n("default", function () {
      var e,
        n = w(),
        t = n.playlistPremium,
        i = n.epg,
        o = n.isLoading,
        a = n.selectedSignal,
        c = n.selectedKeyLive,
        d = n.currentEvent,
        f = n.now,
        p = n.selectSignal,
        v = n.setSelectedKeyLive,
        m = r((0, k.useState)(!1), 2),
        g = m[0],
        h = m[1],
        y = u({
          focusKey: "LIVE-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        x = y.ref,
        b = y.focusKey,
        P = (0, k.useCallback)(function (e) {
          p(e), h(!0), setTimeout(function () {
            return l("LIVE-BTN-BACK");
          }, 200);
        }, [p]),
        B = (0, k.useCallback)(function () {
          h(!1), setTimeout(function () {
            return l("LIVE-GRID");
          }, 100);
        }, []);
      return (0, k.useEffect)(function () {
        if (g) {
          var e = function (e) {
            var n = e.keyCode;
            27 !== n && 8 !== n && 10009 !== n && 461 !== n || (e.preventDefault(), e.stopPropagation(), B());
          };
          return window.addEventListener("keydown", e, !0), function () {
            return window.removeEventListener("keydown", e, !0);
          };
        }
      }, [g, B]), (0, L.jsx)(s.Provider, {
        value: b,
        children: (0, L.jsxs)("div", {
          ref: x,
          className: S.liveContainer,
          children: [o && (0, L.jsx)(_, {}), (0, L.jsxs)("div", {
            className: "".concat(S.topSection, " ").concat(o ? S.topSectionHidden : "", " ").concat(g ? S.topSectionFullscreen : ""),
            children: [(0, L.jsx)("div", {
              className: "".concat(S.videoPreview, " ").concat(g ? S.videoPreviewFullscreen : ""),
              children: a && (0, L.jsx)(E, {
                streamSrc: null !== (e = a.m3u8) && void 0 !== e ? e : "",
                assetKey: a.DPSDAIAssetKey || null,
                vastUrl: a.vast || null,
                signalName: a.name_live,
                currentEvent: d,
                isFullscreen: g,
                onBack: B
              })
            }), !g && a && (0, L.jsxs)("div", {
              className: S.channelInfo,
              children: [(0, L.jsx)("h2", {
                className: S.channelName,
                children: a.name_live
              }), d && (0, L.jsxs)(L.Fragment, {
                children: [(0, L.jsx)("p", {
                  className: S.channelProgram,
                  children: d.title
                }), d.synopsis && (0, L.jsx)("p", {
                  className: S.channelDescription,
                  children: d.synopsis
                })]
              })]
            })]
          }), !g && !o && (0, L.jsx)(T, {
            epg: i,
            selectedKeyLive: c
          }), (0, L.jsx)(F, {
            playlistPremium: t,
            epg: i,
            now: f,
            isFullscreen: g,
            isLoading: o,
            onSelectSignal: P,
            onRowFocus: v
          })]
        })
      });
    }), {
      setters: [function (e) {
        i = e.$, a = e.H, s = e.K, l = e.X, c = e.Z, u = e.q, d = e.t;
      }, function (e) {
        f = e.c, _ = e.n, p = e.t;
      }, function (e) {
        v = e.t;
      }, function (e) {
        m = e.i, g = e.n, h = e.r, y = e.t;
      }],
      execute: function () {
        (x = document.createElement("style")).textContent = '._livePlayerContainer_mrzp7_6{background:#000;width:100%;height:100%;position:relative;overflow:hidden}._livePlayerContainerFullscreen_mrzp7_14{z-index:100;border-radius:0;width:100vw;height:100vh;position:fixed;top:0;left:0}._livePlayerContainerFullscreen_mrzp7_14 ._videoElement_mrzp7_24{object-fit:contain}._videoElement_mrzp7_24{object-fit:cover;width:100%;height:100%}._videoGradient_mrzp7_36{pointer-events:none;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.5) 0%,transparent 50%);position:absolute;top:0;bottom:0;left:0;right:0}._videoLoading_mrzp7_45{z-index:3;justify-content:center;align-items:center;display:flex;position:absolute;top:0;bottom:0;left:0;right:0}._spinner_mrzp7_54{border:4px solid transparent;border-top-color:var(--foc-primary);border-radius:50%;width:50px;height:50px;animation:.8s linear infinite _spin_mrzp7_54}@keyframes _spin_mrzp7_54{to{transform:rotate(360deg)}}._adUiOverlay_mrzp7_68{pointer-events:none;width:100%;height:100%;position:absolute;top:0;left:0}._fullscreenOverlay_mrzp7_78{z-index:102;pointer-events:none;flex-direction:column;justify-content:space-between;display:flex;position:absolute;top:0;bottom:0;left:0;right:0}._fullscreenTopBar_mrzp7_89{pointer-events:auto;align-items:center;padding:40px 50px;display:flex}._fullscreenTopBar_mrzp7_89>*+*{margin-left:12px}._fullscreenBackBtn_mrzp7_101{cursor:pointer;width:56px;height:56px;color:var(--clr-text-primary-button);background:0 0;border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;transition:color .15s;display:flex}._fullscreenBackBtnFocused_mrzp7_116{color:var(--foc-primary)}._fullscreenPlayPauseBtn_mrzp7_121{cursor:pointer;width:56px;height:56px;color:var(--clr-text-primary-button);background:0 0;border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;transition:color .15s,transform .15s;display:flex}._fullscreenPlayPauseBtn_mrzp7_121:hover{color:var(--foc-primary)}._fullscreenPlayPauseBtnFocused_mrzp7_140{color:var(--foc-primary);transform:scale(1.15)}._fullscreenTitle_mrzp7_146{color:var(--clr-primary-text);font-size:1.6rem;font-weight:500}._fullscreenBottomBar_mrzp7_153{pointer-events:auto;padding:0 50px 40px}._fullscreenLiveBadge_mrzp7_159{color:var(--clr-primary-text);letter-spacing:.5px;align-items:center;font-size:1.1rem;font-weight:600;display:inline-flex}._fullscreenLiveBadge_mrzp7_159>*+*{margin-left:6px}._liveDot_mrzp7_172{background:var(--foc-primary);border-radius:50%;width:8px;height:8px;margin-right:8px;animation:1.5s ease-in-out infinite _livePulse_mrzp7_1}@keyframes _livePulse_mrzp7_1{0%,to{opacity:1}50%{opacity:.3}}._liveContainer_17cks_5{background:var(--clr-primary);flex-direction:column;width:100%;height:100vh;display:flex;overflow:hidden}._topSection_17cks_15{flex-direction:row;flex-shrink:0;width:100%;height:43vh;padding:16px 16px 0;transition:height .3s,opacity .3s;display:flex}._topSectionHidden_17cks_25{opacity:0;height:0;margin:0;padding:0;overflow:hidden}._topSectionFullscreen_17cks_33{z-index:100;background:#000;width:100vw;height:100vh;padding:0;position:fixed;top:0;left:0;overflow:hidden}._videoPreviewFullscreen_17cks_45{border-radius:0!important;width:100%!important;height:100%!important}._videoPreviewFullscreen_17cks_45 video{object-fit:contain!important}._videoPreview_17cks_45{border-radius:3rem;flex-shrink:0;width:calc(76.4444vh - 28.4444px);height:100%;display:inline-block;position:relative;overflow:hidden}._videoPreview_17cks_45 video{object-fit:cover;width:100%;height:100%}._videoGradient_17cks_72{pointer-events:none;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.5) 0%,transparent 50%);position:absolute;top:0;bottom:0;left:0;right:0}._videoLoading_17cks_80{z-index:3;justify-content:center;align-items:center;display:flex;position:absolute;top:0;bottom:0;left:0;right:0}._spinner_17cks_89{border:4px solid transparent;border-top-color:var(--foc-primary);border-radius:50%;width:50px;height:50px;animation:.8s linear infinite _spin_17cks_89}@keyframes _spin_17cks_89{to{transform:rotate(360deg)}}._channelInfo_17cks_103{flex-direction:column;flex:1;justify-content:center;padding:0 16px;display:flex}._channelInfo_17cks_103>*+*{margin-top:16px}._channelName_17cks_115{color:var(--clr-primary-title);margin:0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:2rem;font-weight:700}._channelDescription_17cks_123{color:var(--clr-primary-text);opacity:.8;-webkit-line-clamp:3;-webkit-box-orient:vertical;margin:0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.1rem;font-weight:400;line-height:1.4;display:-webkit-box;overflow:hidden}._channelProgram_17cks_137{color:var(--clr-primary-subtitle);margin:0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.4rem;font-weight:500}._statusBar_17cks_146{align-items:center;padding:8px 0;display:flex}._statusBar_17cks_146>*+*{margin-left:20px}._statusLogoSpacer_17cks_157{flex-shrink:0;width:186px}._statusLabel_17cks_162{color:#fff;letter-spacing:.5px;white-space:nowrap;flex-shrink:0;width:25vw;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1rem;font-weight:700}._statusLabelHighlight_17cks_173{color:var(--foc-primary)}._gridContainer_17cks_178{scrollbar-width:none;scroll-behavior:smooth;border-top-left-radius:10px;flex:1;padding:8px 0;overflow-x:hidden;overflow-y:auto}._gridContainer_17cks_178::-webkit-scrollbar{display:none}._gridRow_17cks_193{width:100%;min-height:120px;margin-bottom:20px;padding-left:16px;padding-right:16px;display:flex;overflow:visible}._channelLogo_17cks_204{background-color:var(--clr-secondary);z-index:2;border-radius:2rem;flex-shrink:0;justify-content:center;align-items:center;width:150px;min-width:150px;height:150px;margin-right:20px;display:flex;position:relative;overflow:hidden}._channelLogoImg_17cks_220{object-fit:contain;width:93px;height:auto}._channelLogoText_17cks_226{color:#fff;text-align:center;padding:4px;font-size:.9rem}._channelLogoRestricted_17cks_234:after{content:"";background:rgba(0,0,0,.7);border-radius:2rem;position:absolute;top:0;bottom:0;left:0;right:0}._lockIcon_17cks_242{z-index:2;color:#fff;opacity:.8;width:32px;height:32px;position:absolute}._cardsStrip_17cks_252{flex-direction:row;flex-grow:1;display:flex;overflow:hidden}._cardsStrip_17cks_252>*+*{margin-left:20px}._itemCard_17cks_264{background-color:var(--clr-secondary);cursor:pointer;z-index:1;border-radius:2rem;flex-direction:column;flex-shrink:0;width:25vw;padding:16px 20px;transition:background-color .2s,transform .2s;display:flex;position:relative;overflow:hidden}._itemCard_17cks_264:hover{background-color:var(--foc-primary)}._itemCard_17cks_264:hover *{color:#000!important}._itemCardFocused_17cks_287{background-color:var(--foc-primary)}._itemCardFocused_17cks_287 *{color:#000!important}._itemCardPlaceholder_17cks_296{width:100%}._itemTitle_17cks_300{color:#fff;white-space:nowrap;text-overflow:ellipsis;margin:0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:700;overflow:hidden}._itemEpisode_17cks_311{color:#fff;white-space:nowrap;text-overflow:ellipsis;margin:4px 0 0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.2rem;font-weight:400;overflow:hidden}._itemTime_17cks_322{color:#fff;flex-grow:1;margin:4px 0 0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.2rem;font-weight:400}._progressBar_17cks_332{background:#00453a;border-radius:3px;width:100%;height:6px;margin-top:auto;overflow:hidden}._progressFill_17cks_341{background:#00705a;border-radius:3px;height:100%;transition:width .3s}._playerFullscreen_17cks_349{z-index:101;pointer-events:none;background:0 0;width:100vw;height:100vh;position:fixed;top:0;bottom:0;left:0;right:0;overflow:hidden}._playerFullscreen_17cks_349 video{object-fit:contain;width:100%;height:100%}._fullscreenOverlay_17cks_366{z-index:102;pointer-events:none;flex-direction:column;justify-content:space-between;display:flex;position:absolute;top:0;bottom:0;left:0;right:0}._fullscreenTopBar_17cks_376{pointer-events:auto;align-items:center;padding:40px 50px;display:flex}._fullscreenTopBar_17cks_376>*+*{margin-left:12px}._fullscreenBackBtn_17cks_387{cursor:pointer;width:56px;height:56px;color:var(--clr-text-primary-button);background:0 0;border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;transition:color .15s;display:flex}._fullscreenBackBtnFocused_17cks_402{color:var(--foc-primary)}._fullscreenPlayPauseBtn_17cks_406{cursor:pointer;width:56px;height:56px;color:var(--clr-text-primary-button);background:0 0;border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;transition:color .15s,transform .15s;display:flex}._fullscreenPlayPauseBtn_17cks_406:hover{color:var(--foc-primary)}._fullscreenPlayPauseBtnFocused_17cks_425{color:var(--foc-primary);transform:scale(1.15)}._fullscreenTitle_17cks_430{color:var(--clr-primary-text);font-size:1.6rem;font-weight:500}._fullscreenBottomBar_17cks_436{pointer-events:auto;padding:0 50px 40px}._fullscreenLiveBadge_17cks_441{color:var(--clr-primary-text);letter-spacing:.5px;align-items:center;font-size:1.1rem;font-weight:600;display:inline-flex}._fullscreenLiveBadge_17cks_441>*+*{margin-left:6px}._liveDot_17cks_455{background:var(--foc-primary);border-radius:50%;width:8px;height:8px;margin-right:8px;animation:1.5s ease-in-out infinite _livePulse_17cks_1}@keyframes _livePulse_17cks_1{0%,to{opacity:1}50%{opacity:.3}}._adUiOverlay_17cks_470{pointer-events:none;width:100%;height:100%;position:absolute;top:0;left:0}\n/*$vite$:1*/', document.head.appendChild(x), k = i(c(), 1), w = function () {
          var e,
            n,
            t = a(),
            i = p(function () {
              return v.getPlaylistPremium();
            }, []),
            o = p(function () {
              return v.getChannelList();
            }, []),
            s = (null === (e = i.data) || void 0 === e ? void 0 : e.data) || [],
            l = o.data || [],
            c = i.isLoading || o.isLoading,
            u = i.isError || o.isError,
            d = r((0, k.useState)((null === (n = t.state) || void 0 === n ? void 0 : n.selectedKeyLive) || null), 2),
            f = d[0],
            _ = d[1];
          (0, k.useEffect)(function () {
            if (s.length > 0 && !f) {
              var e = s.find(function (e) {
                return e.active;
              });
              e && _(e.key_live);
            }
          }, [s, f]);
          var m = (0, k.useMemo)(function () {
            var e, n;
            return null !== (e = null !== (n = s.find(function (e) {
              return e.key_live === f;
            })) && void 0 !== n ? n : s.find(function (e) {
              return e.active;
            })) && void 0 !== e ? e : null;
          }, [s, f]);
          return {
            playlistPremium: s,
            epg: l,
            isLoading: c,
            isError: u,
            selectedSignal: m,
            selectedKeyLive: f,
            currentEvent: (0, k.useMemo)(function () {
              return function (e, n) {
                var r;
                if (!e) return null;
                var t = n.find(function (n) {
                  return n.key_live === e.key_live;
                });
                if (!t) return null;
                var i = new Date();
                return null !== (r = t.events.find(function (e) {
                  var n = new Date(e.beginTime),
                    r = new Date(e.endTime);
                  return n <= i && r > i;
                })) && void 0 !== r ? r : null;
              }(m, l);
            }, [m, l]),
            now: (0, k.useMemo)(function () {
              return new Date();
            }, [l]),
            selectSignal: (0, k.useCallback)(function (e) {
              _(e);
            }, []),
            setSelectedKeyLive: _
          };
        }, b = {
          livePlayerContainer: "_livePlayerContainer_mrzp7_6",
          livePlayerContainerFullscreen: "_livePlayerContainerFullscreen_mrzp7_14",
          videoElement: "_videoElement_mrzp7_24",
          videoGradient: "_videoGradient_mrzp7_36",
          videoLoading: "_videoLoading_mrzp7_45",
          spinner: "_spinner_mrzp7_54",
          spin: "_spin_mrzp7_54",
          adUiOverlay: "_adUiOverlay_mrzp7_68",
          fullscreenOverlay: "_fullscreenOverlay_mrzp7_78",
          fullscreenTopBar: "_fullscreenTopBar_mrzp7_89",
          fullscreenBackBtn: "_fullscreenBackBtn_mrzp7_101",
          fullscreenBackBtnFocused: "_fullscreenBackBtnFocused_mrzp7_116",
          fullscreenPlayPauseBtn: "_fullscreenPlayPauseBtn_mrzp7_121",
          fullscreenPlayPauseBtnFocused: "_fullscreenPlayPauseBtnFocused_mrzp7_140",
          fullscreenTitle: "_fullscreenTitle_mrzp7_146",
          fullscreenBottomBar: "_fullscreenBottomBar_mrzp7_153",
          fullscreenLiveBadge: "_fullscreenLiveBadge_mrzp7_159",
          liveDot: "_liveDot_mrzp7_172",
          livePulse: "_livePulse_mrzp7_1"
        }, L = d(), P = {
          lowLatencyMode: !1,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 10,
          liveDurationInfinity: !0,
          backBufferLength: 30,
          maxBufferLength: 30,
          maxMaxBufferLength: 60
        }, S = {
          liveContainer: "_liveContainer_17cks_5",
          topSection: "_topSection_17cks_15",
          topSectionHidden: "_topSectionHidden_17cks_25",
          topSectionFullscreen: "_topSectionFullscreen_17cks_33",
          videoPreviewFullscreen: "_videoPreviewFullscreen_17cks_45",
          videoPreview: "_videoPreview_17cks_45",
          videoGradient: "_videoGradient_17cks_72",
          videoLoading: "_videoLoading_17cks_80",
          spinner: "_spinner_17cks_89",
          spin: "_spin_17cks_89",
          channelInfo: "_channelInfo_17cks_103",
          channelName: "_channelName_17cks_115",
          channelDescription: "_channelDescription_17cks_123",
          channelProgram: "_channelProgram_17cks_137",
          statusBar: "_statusBar_17cks_146",
          statusLogoSpacer: "_statusLogoSpacer_17cks_157",
          statusLabel: "_statusLabel_17cks_162",
          statusLabelHighlight: "_statusLabelHighlight_17cks_173",
          gridContainer: "_gridContainer_17cks_178",
          gridRow: "_gridRow_17cks_193",
          channelLogo: "_channelLogo_17cks_204",
          channelLogoImg: "_channelLogoImg_17cks_220",
          channelLogoText: "_channelLogoText_17cks_226",
          channelLogoRestricted: "_channelLogoRestricted_17cks_234",
          lockIcon: "_lockIcon_17cks_242",
          cardsStrip: "_cardsStrip_17cks_252",
          itemCard: "_itemCard_17cks_264",
          itemCardFocused: "_itemCardFocused_17cks_287",
          itemCardPlaceholder: "_itemCardPlaceholder_17cks_296",
          itemTitle: "_itemTitle_17cks_300",
          itemEpisode: "_itemEpisode_17cks_311",
          itemTime: "_itemTime_17cks_322",
          progressBar: "_progressBar_17cks_332",
          progressFill: "_progressFill_17cks_341",
          playerFullscreen: "_playerFullscreen_17cks_349",
          fullscreenOverlay: "_fullscreenOverlay_17cks_366",
          fullscreenTopBar: "_fullscreenTopBar_17cks_376",
          fullscreenBackBtn: "_fullscreenBackBtn_17cks_387",
          fullscreenBackBtnFocused: "_fullscreenBackBtnFocused_17cks_402",
          fullscreenPlayPauseBtn: "_fullscreenPlayPauseBtn_17cks_406",
          fullscreenPlayPauseBtnFocused: "_fullscreenPlayPauseBtnFocused_17cks_425",
          fullscreenTitle: "_fullscreenTitle_17cks_430",
          fullscreenBottomBar: "_fullscreenBottomBar_17cks_436",
          fullscreenLiveBadge: "_fullscreenLiveBadge_17cks_441",
          liveDot: "_liveDot_17cks_455",
          livePulse: "_livePulse_17cks_1",
          adUiOverlay: "_adUiOverlay_17cks_470"
        };
      }
    };
  });
}();