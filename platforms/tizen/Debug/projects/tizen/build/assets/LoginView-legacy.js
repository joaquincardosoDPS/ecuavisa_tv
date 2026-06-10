!function () {
  function e() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,
      n,
      i = "function" == typeof Symbol ? Symbol : {},
      o = i.iterator || "@@iterator",
      a = i.toStringTag || "@@toStringTag";
    function c(e, i, o, a) {
      var c = i && i.prototype instanceof s ? i : s,
        f = Object.create(c.prototype);
      return t(f, "_invoke", function (e, t, i) {
        var o,
          a,
          c,
          s = 0,
          f = i || [],
          u = !1,
          d = {
            p: 0,
            n: 0,
            v: r,
            a: m,
            f: m.bind(r, 4),
            d: function (e, t) {
              return o = e, a = 0, c = r, d.n = t, l;
            }
          };
        function m(e, t) {
          for (a = e, c = t, n = 0; !u && s && !i && n < f.length; n++) {
            var i,
              o = f[n],
              m = d.p,
              x = o[2];
            e > 3 ? (i = x === t) && (c = o[(a = o[4]) ? 5 : (a = 3, 3)], o[4] = o[5] = r) : o[0] <= m && ((i = e < 2 && m < o[1]) ? (a = 0, d.v = t, d.n = o[1]) : m < x && (i = e < 3 || o[0] > t || t > x) && (o[4] = e, o[5] = t, d.n = x, a = 0));
          }
          if (i || e > 1) return l;
          throw u = !0, t;
        }
        return function (i, f, x) {
          if (s > 1) throw TypeError("Generator is already running");
          for (u && 1 === f && m(f, x), a = f, c = x; (n = a < 2 ? r : c) || !u;) {
            o || (a ? a < 3 ? (a > 1 && (d.n = -1), m(a, c)) : d.n = c : d.v = c);
            try {
              if (s = 2, o) {
                if (a || (i = "next"), n = o[i]) {
                  if (!(n = n.call(o, c))) throw TypeError("iterator result is not an object");
                  if (!n.done) return n;
                  c = n.value, a < 2 && (a = 0);
                } else 1 === a && (n = o.return) && n.call(o), a < 2 && (c = TypeError("The iterator does not provide a '" + i + "' method"), a = 1);
                o = r;
              } else if ((n = (u = d.n < 0) ? c : e.call(t, d)) !== l) break;
            } catch (n) {
              o = r, a = 1, c = n;
            } finally {
              s = 1;
            }
          }
          return {
            value: n,
            done: u
          };
        };
      }(e, o, a), !0), f;
    }
    var l = {};
    function s() {}
    function f() {}
    function u() {}
    n = Object.getPrototypeOf;
    var d = [][o] ? n(n([][o]())) : (t(n = {}, o, function () {
        return this;
      }), n),
      m = u.prototype = s.prototype = Object.create(d);
    function x(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, u) : (e.__proto__ = u, t(e, a, "GeneratorFunction")), e.prototype = Object.create(m), e;
    }
    return f.prototype = u, t(m, "constructor", u), t(u, "constructor", f), f.displayName = "GeneratorFunction", t(u, a, "GeneratorFunction"), t(m), t(m, a, "Generator"), t(m, o, function () {
      return this;
    }), t(m, "toString", function () {
      return "[object Generator]";
    }), (e = function () {
      return {
        w: c,
        m: x
      };
    })();
  }
  function t(e, r, n, i) {
    var o = Object.defineProperty;
    try {
      o({}, "", {});
    } catch (e) {
      o = 0;
    }
    t = function (e, r, n, i) {
      function a(r, n) {
        t(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      r ? o ? o(e, r, {
        value: n,
        enumerable: !i,
        configurable: !i,
        writable: !i
      }) : e[r] = n : (a("next", 0), a("throw", 1), a("return", 2));
    }, t(e, r, n, i);
  }
  function r(e, t, r, n, i, o, a) {
    try {
      var c = e[o](a),
        l = c.value;
    } catch (e) {
      return void r(e);
    }
    c.done ? t(l) : Promise.resolve(l).then(n, i);
  }
  function n(e) {
    return function () {
      var t = this,
        n = arguments;
      return new Promise(function (i, o) {
        var a = e.apply(t, n);
        function c(e) {
          r(a, i, o, c, l, "next", e);
        }
        function l(e) {
          r(a, i, o, c, l, "throw", e);
        }
        c(void 0);
      });
    };
  }
  function i(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != r) {
        var n,
          i,
          o,
          a,
          c = [],
          l = !0,
          s = !1;
        try {
          if (o = (r = r.call(e)).next, 0 === t) {
            if (Object(r) !== r) return;
            l = !1;
          } else for (; !(l = (n = o.call(r)).done) && (c.push(n.value), c.length !== t); l = !0);
        } catch (e) {
          s = !0, i = e;
        } finally {
          try {
            if (!l && null != r.return && (a = r.return(), Object(a) !== a)) return;
          } finally {
            if (s) throw i;
          }
        }
        return c;
      }
    }(e, t) || function (e, t) {
      if (e) {
        if ("string" == typeof e) return o(e, t);
        var r = {}.toString.call(e).slice(8, -1);
        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? o(e, t) : void 0;
      }
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function o(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./useAuthNavigation-legacy.js", "./profileService-legacy.js"], function (t, r) {
    var o, a, c, l, s, f, u, d, m, x, _, p, v, h, g, w, b, y, z, C;
    return t("default", function () {
      var t = x(function (e) {
          var t;
          return null === (t = e.config) || void 0 === t ? void 0 : t.logo;
        }),
        r = x(function (e) {
          var t;
          return (null === (t = e.config) || void 0 === t ? void 0 : t["url-tv-vincular"]) || "https://www.latina.pe/activacion";
        }),
        o = h(),
        l = o.goBack,
        m = function (t) {
          var r = i((0, b.useState)(null), 2),
            o = r[0],
            a = r[1],
            c = i((0, b.useState)(!0), 2),
            l = c[0],
            u = c[1],
            m = i((0, b.useState)(null), 2),
            x = m[0],
            _ = m[1],
            v = (0, b.useRef)(null),
            h = (0, b.useRef)(null),
            w = (0, b.useCallback)(n(e().m(function t() {
              var r, n;
              return e().w(function (e) {
                for (;;) switch (e.p = e.n) {
                  case 0:
                    return e.p = 0, u(!0), _(null), e.n = 1, s.post(f, {});
                  case 1:
                    r = e.v, "ok" === (n = r.data).status && n.data && n.data.code_tv ? (a(n.data), localStorage.setItem("token_tv", n.data.token_tv)) : _(n.msj || "Error al obtener el código"), e.n = 3;
                    break;
                  case 2:
                    e.p = 2, e.v, _("No se pudo conectar con el servidor");
                  case 3:
                    return e.p = 3, u(!1), e.f(3);
                  case 4:
                    return e.a(2);
                }
              }, t, null, [[0, 2, 3, 4]]);
            })), []),
            y = (0, b.useCallback)(n(e().m(function r() {
              var n, i, o, a, c, l, f, u, m, x, _;
              return e().w(function (e) {
                for (;;) switch (e.p = e.n) {
                  case 0:
                    if (e.p = 0, i = localStorage.getItem("token_tv")) {
                      e.n = 1;
                      break;
                    }
                    return e.a(2);
                  case 1:
                    return e.n = 2, s.post(d, {
                      token_tv: i
                    });
                  case 2:
                    if (o = e.v, "ok" !== (a = o.data).status || null === (n = a.user) || void 0 === n || !n.token) {
                      e.n = 11;
                      break;
                    }
                    return console.log("[Auth] Device verified, user:", a.user.email), p.getState().login(a.user.token, a.user), localStorage.removeItem("token_tv"), e.p = 3, e.n = 4, g.getAll(a.user.token);
                  case 4:
                    if (m = c = e.v, u = null === m) {
                      e.n = 5;
                      break;
                    }
                    u = void 0 === c;
                  case 5:
                    if (!u) {
                      e.n = 6;
                      break;
                    }
                    x = void 0, e.n = 7;
                    break;
                  case 6:
                    x = c.data;
                  case 7:
                    if (f = x) {
                      e.n = 8;
                      break;
                    }
                    f = [];
                  case 8:
                    (l = f).length > 0 && (p.getState().setActiveProfile(l[0]), console.log("[Auth] Default profile set:", l[0].name_perfil)), e.n = 10;
                    break;
                  case 9:
                    e.p = 9, _ = e.v, console.warn("[Auth] Could not fetch profiles after login:", _);
                  case 10:
                    t();
                  case 11:
                    e.n = 13;
                    break;
                  case 12:
                    e.p = 12, e.v;
                  case 13:
                    return e.a(2);
                }
              }, r, null, [[3, 9], [0, 12]]);
            })), [t]);
          return (0, b.useEffect)(function () {
            return w(), v.current = setInterval(function () {
              return w();
            }, 3e4), h.current = setInterval(function () {
              return y();
            }, 5e3), function () {
              v.current && clearInterval(v.current), h.current && clearInterval(h.current);
            };
          }, [w, y]), {
            deviceData: o,
            isLoading: l,
            error: x
          };
        }(o.goToWhoIsThere),
        w = m.deviceData,
        k = m.isLoading,
        j = m.error,
        T = u({
          focusKey: C,
          trackChildren: !0,
          isFocusBoundary: !0
        }),
        A = T.ref,
        H = T.focusKey,
        V = u({
          focusKey: "sn:login-back-btn",
          onEnterPress: l
        }),
        N = V.ref,
        L = V.focused;
      (0, b.useEffect)(function () {
        var e = setTimeout(function () {
          return c("sn:login-back-btn");
        }, 300);
        return function () {
          return clearTimeout(e);
        };
      }, []), (0, b.useEffect)(function () {
        var e = function (e) {
          _(e, "Back") && (e.preventDefault(), e.stopPropagation(), l());
        };
        return window.addEventListener("keydown", e), function () {
          return window.removeEventListener("keydown", e);
        };
      }, [l]);
      var S = [y.backBtn, L && y.focused].filter(Boolean).join(" ");
      return (0, z.jsx)(a.Provider, {
        value: H,
        children: (0, z.jsxs)("div", {
          ref: A,
          className: y.container,
          children: [(0, z.jsx)("div", {
            className: y.backRow,
            children: (0, z.jsx)("button", {
              ref: N,
              className: S,
              onClick: l,
              onMouseEnter: function () {
                return c("sn:login-back-btn");
              },
              children: (0, z.jsx)("svg", {
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: (0, z.jsx)("path", {
                  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                })
              })
            })
          }), (0, z.jsx)("div", {
            className: y.logoRow,
            children: (0, z.jsx)("img", {
              src: t || "data:image/svg+xml,%3csvg%20width='51'%20height='77'%20viewBox='0%200%2051%2077'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1449_856)'%3e%3cpath%20d='M51.0001%2035.2505H22.2632V40.9285H51.0001V35.2505Z'%20fill='%23FF1376'/%3e%3cpath%20d='M36.6268%2077C44.5503%2077%2050.9952%2070.5275%2050.9952%2062.57V60.6611H45.3414V62.57C45.3414%2067.3953%2041.4315%2071.322%2036.6268%2071.322C31.822%2071.322%2027.9121%2067.3953%2027.9121%2062.57V60.6611H22.2583V62.57C22.2583%2070.5275%2028.7033%2077%2036.6268%2077Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9954%2048.1399H39.4346V53.8179H50.9954V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M33.824%2048.1399H22.2632V53.8179H33.824V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9931%2040.9261V35.2504L33.8242%2022.2544V28.7028L49.9776%2040.9261H50.9931Z'%20fill='%23FF1376'/%3e%3cpath%20d='M0%200V28.8505L17.1713%2040.9381V28.8505H28.7297V0H0ZM20.3165%2022.2544H16.3463V16.8597C16.3463%2016.4261%2016.2185%2016.087%2015.9604%2015.8399C15.7023%2015.5928%2015.3574%2015.4693%2014.9281%2015.4693C14.4987%2015.4693%2014.1369%2015.5928%2013.8861%2015.8399C13.6352%2016.087%2013.5098%2016.4261%2013.5098%2016.8597V22.2544H9.53959V16.8597C9.53959%2016.4261%209.41175%2016.087%209.15366%2015.8399C8.89557%2015.5928%208.55306%2015.4693%208.12131%2015.4693C7.68956%2015.4693%207.33016%2015.5928%207.07931%2015.8399C6.82846%2016.087%206.70304%2016.4261%206.70304%2016.8597V22.2544H2.71354V12.0804H6.70062V13.4514C6.98766%2013.0178%207.38082%2012.669%207.8777%2012.405C8.37457%2012.1409%208.95829%2012.0077%209.62883%2012.0077C10.3597%2012.0077%2011.0061%2012.1676%2011.5681%2012.4849C12.1301%2012.8047%2012.5812%2013.2504%2012.9164%2013.8293C13.2879%2013.3013%2013.7606%2012.8652%2014.3347%2012.5213C14.9088%2012.1773%2015.5431%2012.0077%2016.2378%2012.0077C17.5306%2012.0077%2018.5341%2012.3977%2019.2456%2013.1801C19.9572%2013.9626%2020.3141%2015.0211%2020.3141%2016.3559V22.2544H20.3165ZM26.0162%209.939H22.0411L26.0162%2012.2112V22.2544H22.0411V7.16296H26.0162V9.939Z'%20fill='%23FAE24B'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1449_856'%3e%3crect%20width='51'%20height='77'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
              alt: "Logo",
              className: y.logo
            })
          }), (0, z.jsxs)("div", {
            className: y.body,
            children: [(0, z.jsxs)("div", {
              className: y.codeColumn,
              children: [(0, z.jsx)("p", {
                className: y.codeText,
                children: "Para iniciar sesion, debe vincular su televisor en el sitio web. Visite"
              }), (0, z.jsx)("p", {
                className: y.codeUrl,
                children: r
              }), k ? (0, z.jsx)("div", {
                className: y.codeLoading,
                children: (0, z.jsx)("div", {
                  className: y.spinner
                })
              }) : w ? (0, z.jsx)("div", {
                className: y.codeChip,
                children: w.code_tv
              }) : null, j && (0, z.jsx)("p", {
                className: y.errorText,
                children: j
              })]
            }), (0, z.jsxs)("div", {
              className: y.divider,
              children: [(0, z.jsx)("div", {
                className: y.dividerLine
              }), (0, z.jsx)("span", {
                className: y.dividerText,
                children: "o"
              }), (0, z.jsx)("div", {
                className: y.dividerLine
              })]
            }), (0, z.jsxs)("div", {
              className: y.qrColumn,
              children: [(0, z.jsx)("p", {
                className: y.qrText,
                children: "Escanee el siguiente código QR"
              }), (0, z.jsx)("p", {
                className: y.qrTextBottom,
                children: "usando tu móvil:"
              }), (0, z.jsx)("div", {
                className: y.qrContainer,
                children: (0, z.jsx)(v, {
                  value: r,
                  size: 300,
                  bgColor: "#ffffff",
                  fgColor: "#000000",
                  level: "M"
                })
              })]
            })]
          })]
        })
      });
    }), {
      setters: [function (e) {
        o = e.$, a = e.K, c = e.X, l = e.Z, s = e.n, f = e.o, u = e.q, d = e.s, m = e.t;
      }, function (e) {
        x = e.a, e.i, _ = e.l, p = e.o;
      }, function (e) {
        v = e.n, h = e.t;
      }, function (e) {
        g = e.t;
      }],
      execute: function () {
        (w = document.createElement("style")).textContent = "._container_1wmxz_4{background-color:var(--clr-primary,#00705a);width:100vw;min-height:100vh;color:var(--clr-primary-text,#fff);box-sizing:border-box;flex-direction:column;padding-left:40px;padding-right:32px;display:flex;overflow:hidden}._container_1wmxz_4>*+*{margin-top:32px}._backRow_1wmxz_22{justify-content:flex-start;width:100%;display:flex}._backBtn_1wmxz_28{color:var(--clr-primary-text,#fff);cursor:pointer;width:var(--tam-back-button-height,60px);height:var(--tam-back-button-width,60px);font-size:var(--font-siz-icon,2rem);text-align:center;z-index:1;background:0 0;border:none;border-radius:8px;outline:none;justify-content:center;align-items:center;padding:0;transition:color .3s;display:flex;position:relative;top:30px;left:10px}._backBtn_1wmxz_28._focused_1wmxz_50,._backBtn_1wmxz_28:hover{color:var(--foc-primary,#ffe500)}._backBtn_1wmxz_28 svg{width:1.4em;height:1.4em;font-size:inherit}._logoRow_1wmxz_62{flex-direction:row;flex-grow:1;justify-content:center;align-items:center;height:0;display:flex}._logo_1wmxz_62{object-fit:contain;width:110px;height:110px;position:relative;top:10px}._body_1wmxz_80{flex-direction:row;flex-grow:1;display:flex}._body_1wmxz_80>*+*{margin-left:16px}._codeColumn_1wmxz_91{flex-direction:column;align-items:center;width:100%;height:100%;display:flex}._codeText_1wmxz_99{text-align:center;width:450px;color:var(--clr-primary-text,#fff);margin:0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400;line-height:1.4}._codeUrl_1wmxz_110{color:var(--clr-primary-subtitle,#00b28a);margin:0;padding-top:8px;padding-bottom:80px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400}._codeChip_1wmxz_121{background-color:var(--foc-primary,#ffe500);width:300px;height:100px;color:var(--clr-text-primary-button,#000);letter-spacing:.15em;border-radius:4rem;justify-content:center;align-items:center;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:35px;font-weight:500;display:inline-flex}._codeLoading_1wmxz_137{background-color:var(--foc-primary,#ffe500);border-radius:4rem;justify-content:center;align-items:center;width:300px;height:100px;display:flex}._spinner_1wmxz_147{border:4px solid rgba(0,0,0,.2);border-top-color:var(--clr-text-primary-button,#000);border-radius:50%;width:40px;height:40px;animation:.8s linear infinite _spin_1wmxz_147}@keyframes _spin_1wmxz_147{to{transform:rotate(360deg)}}._divider_1wmxz_161{flex-direction:column;flex-shrink:0;align-items:center;display:flex}._dividerLine_1wmxz_168{border-left:1px solid var(--foc-primary,#ffe500);height:20vh}._dividerText_1wmxz_173{color:var(--clr-primary-text,#fff);margin:16px 0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:2.125rem;font-weight:400}._qrColumn_1wmxz_182{flex-direction:column;align-items:center;width:100%;display:flex}._qrColumn_1wmxz_182>*+*{margin-top:8px}._qrText_1wmxz_193{color:var(--clr-primary-text,#fff);text-align:center;margin:0;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400}._qrTextBottom_1wmxz_202{color:var(--clr-primary-text,#fff);text-align:center;margin:0;padding-bottom:24px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400}._qrContainer_1wmxz_213{box-sizing:border-box;background-color:#fff;border-radius:2rem;justify-content:center;align-items:center;width:350px;height:350px;margin-top:8px;padding:20px;display:flex}._errorText_1wmxz_227{color:#ef4444;text-align:center;margin-top:8px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1rem}\n/*$vite$:1*/", document.head.appendChild(w), b = o(l(), 1), y = {
          container: "_container_1wmxz_4",
          backRow: "_backRow_1wmxz_22",
          backBtn: "_backBtn_1wmxz_28",
          focused: "_focused_1wmxz_50",
          logoRow: "_logoRow_1wmxz_62",
          logo: "_logo_1wmxz_62",
          body: "_body_1wmxz_80",
          codeColumn: "_codeColumn_1wmxz_91",
          codeText: "_codeText_1wmxz_99",
          codeUrl: "_codeUrl_1wmxz_110",
          codeChip: "_codeChip_1wmxz_121",
          codeLoading: "_codeLoading_1wmxz_137",
          spinner: "_spinner_1wmxz_147",
          spin: "_spin_1wmxz_147",
          divider: "_divider_1wmxz_161",
          dividerLine: "_dividerLine_1wmxz_168",
          dividerText: "_dividerText_1wmxz_173",
          qrColumn: "_qrColumn_1wmxz_182",
          qrText: "_qrText_1wmxz_193",
          qrTextBottom: "_qrTextBottom_1wmxz_202",
          qrContainer: "_qrContainer_1wmxz_213",
          errorText: "_errorText_1wmxz_227"
        }, z = m(), C = "sn:login";
      }
    };
  });
}();