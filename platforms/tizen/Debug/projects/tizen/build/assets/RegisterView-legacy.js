!function () {
  function e(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, i) {
      var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != t) {
        var n,
          o,
          r,
          l,
          a = [],
          c = !0,
          s = !1;
        try {
          if (r = (t = t.call(e)).next, 0 === i) {
            if (Object(t) !== t) return;
            c = !1;
          } else for (; !(c = (n = r.call(t)).done) && (a.push(n.value), a.length !== i); c = !0);
        } catch (e) {
          s = !0, o = e;
        } finally {
          try {
            if (!c && null != t.return && (l = t.return(), Object(l) !== l)) return;
          } finally {
            if (s) throw o;
          }
        }
        return a;
      }
    }(e, t) || function (e, t) {
      if (e) {
        if ("string" == typeof e) return i(e, t);
        var n = {}.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? i(e, t) : void 0;
      }
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function i(e, i) {
    (null == i || i > e.length) && (i = e.length);
    for (var t = 0, n = Array(i); t < i; t++) n[t] = e[t];
    return n;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./useAuthNavigation-legacy.js"], function (i, t) {
    var n, o, r, l, a, c, s, d, f, g, u, m, _, p, h, w;
    return i("default", function () {
      var i = s(function (e) {
          var i;
          return null === (i = e.config) || void 0 === i ? void 0 : i.logo;
        }),
        t = s(function (e) {
          var i;
          return (null === (i = e.config) || void 0 === i ? void 0 : i["url-tv-vincular"]) || "https://latina.pe/activacion";
        }),
        n = f(function (e) {
          return e.isAuthenticated;
        }),
        l = e((0, _.useState)(!1), 2),
        c = l[0],
        m = l[1],
        x = e((0, _.useState)("cancel"), 2),
        v = x[0],
        b = x[1],
        C = u(),
        y = C.goToLogin,
        V = C.goToLive;
      (0, _.useEffect)(function () {
        n && V();
      }, [n, V]);
      var H = a({
          focusKey: w,
          trackChildren: !0,
          isFocusBoundary: !0
        }),
        j = H.ref,
        A = H.focusKey,
        B = a({
          focusKey: "sn:register-login-btn",
          onEnterPress: y
        }),
        k = B.ref,
        F = B.focused;
      (0, _.useEffect)(function () {
        var e = setTimeout(function () {
          return r("sn:register-login-btn");
        }, 300);
        return function () {
          return clearTimeout(e);
        };
      }, []);
      var N = (0, _.useCallback)(function (e) {
        if (c) {
          if ("ArrowLeft" === e.key || 37 === e.keyCode) b("cancel");else if ("ArrowRight" === e.key || 39 === e.keyCode) b("exit");else if ("Enter" === e.key || 13 === e.keyCode) {
            if ("exit" === v) try {
              var i,
                t,
                n = window;
              null !== (i = n.tizen) && void 0 !== i && i.application ? n.tizen.application.getCurrentApplication().exit() : null !== (t = n.webOS) && void 0 !== t && t.platformBack && n.webOS.platformBack();
            } catch (o) {
              window.close();
            } else m(!1), r("sn:register-login-btn");
          } else d(e, "Back") && (e.preventDefault(), m(!1), r("sn:register-login-btn"));
        } else d(e, "Back") && (e.preventDefault(), e.stopPropagation(), m(!0));
      }, [c, v]);
      (0, _.useEffect)(function () {
        return window.addEventListener("keydown", N), function () {
          return window.removeEventListener("keydown", N);
        };
      }, [N]);
      var S = [p.loginBtn, F && p.focused].filter(Boolean).join(" ");
      return (0, h.jsxs)(o.Provider, {
        value: A,
        children: [(0, h.jsxs)("div", {
          ref: j,
          className: p.container,
          children: [(0, h.jsxs)("div", {
            className: p.header,
            children: [(0, h.jsx)("div", {
              className: p.logoWrapper,
              children: (0, h.jsx)("img", {
                src: i || "data:image/svg+xml,%3csvg%20width='51'%20height='77'%20viewBox='0%200%2051%2077'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1449_856)'%3e%3cpath%20d='M51.0001%2035.2505H22.2632V40.9285H51.0001V35.2505Z'%20fill='%23FF1376'/%3e%3cpath%20d='M36.6268%2077C44.5503%2077%2050.9952%2070.5275%2050.9952%2062.57V60.6611H45.3414V62.57C45.3414%2067.3953%2041.4315%2071.322%2036.6268%2071.322C31.822%2071.322%2027.9121%2067.3953%2027.9121%2062.57V60.6611H22.2583V62.57C22.2583%2070.5275%2028.7033%2077%2036.6268%2077Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9954%2048.1399H39.4346V53.8179H50.9954V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M33.824%2048.1399H22.2632V53.8179H33.824V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9931%2040.9261V35.2504L33.8242%2022.2544V28.7028L49.9776%2040.9261H50.9931Z'%20fill='%23FF1376'/%3e%3cpath%20d='M0%200V28.8505L17.1713%2040.9381V28.8505H28.7297V0H0ZM20.3165%2022.2544H16.3463V16.8597C16.3463%2016.4261%2016.2185%2016.087%2015.9604%2015.8399C15.7023%2015.5928%2015.3574%2015.4693%2014.9281%2015.4693C14.4987%2015.4693%2014.1369%2015.5928%2013.8861%2015.8399C13.6352%2016.087%2013.5098%2016.4261%2013.5098%2016.8597V22.2544H9.53959V16.8597C9.53959%2016.4261%209.41175%2016.087%209.15366%2015.8399C8.89557%2015.5928%208.55306%2015.4693%208.12131%2015.4693C7.68956%2015.4693%207.33016%2015.5928%207.07931%2015.8399C6.82846%2016.087%206.70304%2016.4261%206.70304%2016.8597V22.2544H2.71354V12.0804H6.70062V13.4514C6.98766%2013.0178%207.38082%2012.669%207.8777%2012.405C8.37457%2012.1409%208.95829%2012.0077%209.62883%2012.0077C10.3597%2012.0077%2011.0061%2012.1676%2011.5681%2012.4849C12.1301%2012.8047%2012.5812%2013.2504%2012.9164%2013.8293C13.2879%2013.3013%2013.7606%2012.8652%2014.3347%2012.5213C14.9088%2012.1773%2015.5431%2012.0077%2016.2378%2012.0077C17.5306%2012.0077%2018.5341%2012.3977%2019.2456%2013.1801C19.9572%2013.9626%2020.3141%2015.0211%2020.3141%2016.3559V22.2544H20.3165ZM26.0162%209.939H22.0411L26.0162%2012.2112V22.2544H22.0411V7.16296H26.0162V9.939Z'%20fill='%23FAE24B'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1449_856'%3e%3crect%20width='51'%20height='77'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
                alt: "Logo",
                className: p.logo
              })
            }), (0, h.jsx)("div", {
              className: p.loginBtnWrapper,
              children: (0, h.jsx)("button", {
                ref: k,
                className: S,
                onClick: y,
                onMouseEnter: function () {
                  return r("sn:register-login-btn");
                },
                children: "Iniciar sesión"
              })
            })]
          }), (0, h.jsxs)("div", {
            className: p.body,
            children: [(0, h.jsxs)("div", {
              className: p.textColumn,
              children: [(0, h.jsx)("h2", {
                className: p.mainTitle,
                children: "Suscríbete Y Descubre"
              }), (0, h.jsx)("p", {
                className: p.subtitle,
                children: "¿No tienes una Cuenta?"
              }), (0, h.jsx)("p", {
                className: p.subtitleSmall,
                children: "Escanea el código QR para iniciar tu registro."
              })]
            }), (0, h.jsx)("div", {
              className: p.qrColumn,
              children: (0, h.jsx)("div", {
                className: p.qrContainer,
                children: (0, h.jsx)(g, {
                  value: t,
                  size: 300,
                  bgColor: "#ffffff",
                  fgColor: "#000000",
                  level: "M"
                })
              })
            })]
          })]
        }), c && (0, h.jsx)("div", {
          className: p.dialogOverlay,
          children: (0, h.jsxs)("div", {
            className: p.dialog,
            children: [(0, h.jsx)("img", {
              src: i || "data:image/svg+xml,%3csvg%20width='51'%20height='77'%20viewBox='0%200%2051%2077'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1449_856)'%3e%3cpath%20d='M51.0001%2035.2505H22.2632V40.9285H51.0001V35.2505Z'%20fill='%23FF1376'/%3e%3cpath%20d='M36.6268%2077C44.5503%2077%2050.9952%2070.5275%2050.9952%2062.57V60.6611H45.3414V62.57C45.3414%2067.3953%2041.4315%2071.322%2036.6268%2071.322C31.822%2071.322%2027.9121%2067.3953%2027.9121%2062.57V60.6611H22.2583V62.57C22.2583%2070.5275%2028.7033%2077%2036.6268%2077Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9954%2048.1399H39.4346V53.8179H50.9954V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M33.824%2048.1399H22.2632V53.8179H33.824V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9931%2040.9261V35.2504L33.8242%2022.2544V28.7028L49.9776%2040.9261H50.9931Z'%20fill='%23FF1376'/%3e%3cpath%20d='M0%200V28.8505L17.1713%2040.9381V28.8505H28.7297V0H0ZM20.3165%2022.2544H16.3463V16.8597C16.3463%2016.4261%2016.2185%2016.087%2015.9604%2015.8399C15.7023%2015.5928%2015.3574%2015.4693%2014.9281%2015.4693C14.4987%2015.4693%2014.1369%2015.5928%2013.8861%2015.8399C13.6352%2016.087%2013.5098%2016.4261%2013.5098%2016.8597V22.2544H9.53959V16.8597C9.53959%2016.4261%209.41175%2016.087%209.15366%2015.8399C8.89557%2015.5928%208.55306%2015.4693%208.12131%2015.4693C7.68956%2015.4693%207.33016%2015.5928%207.07931%2015.8399C6.82846%2016.087%206.70304%2016.4261%206.70304%2016.8597V22.2544H2.71354V12.0804H6.70062V13.4514C6.98766%2013.0178%207.38082%2012.669%207.8777%2012.405C8.37457%2012.1409%208.95829%2012.0077%209.62883%2012.0077C10.3597%2012.0077%2011.0061%2012.1676%2011.5681%2012.4849C12.1301%2012.8047%2012.5812%2013.2504%2012.9164%2013.8293C13.2879%2013.3013%2013.7606%2012.8652%2014.3347%2012.5213C14.9088%2012.1773%2015.5431%2012.0077%2016.2378%2012.0077C17.5306%2012.0077%2018.5341%2012.3977%2019.2456%2013.1801C19.9572%2013.9626%2020.3141%2015.0211%2020.3141%2016.3559V22.2544H20.3165ZM26.0162%209.939H22.0411L26.0162%2012.2112V22.2544H22.0411V7.16296H26.0162V9.939Z'%20fill='%23FAE24B'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1449_856'%3e%3crect%20width='51'%20height='77'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
              alt: "Logo",
              className: p.dialogLogo
            }), (0, h.jsx)("h2", {
              className: p.dialogTitle,
              children: "¿Salir app?"
            }), (0, h.jsx)("p", {
              className: p.dialogSubtitle,
              children: "¿Estás seguro de que deseas salir?"
            }), (0, h.jsxs)("div", {
              className: p.dialogActions,
              children: [(0, h.jsx)("button", {
                className: "".concat(p.dialogBtn, " ").concat("cancel" === v ? p.focused : ""),
                onClick: function () {
                  m(!1), r("sn:register-login-btn");
                },
                children: "Cancelar"
              }), (0, h.jsx)("button", {
                className: "".concat(p.dialogBtn, " ").concat("exit" === v ? p.focused : ""),
                onClick: function () {
                  return window.close();
                },
                children: "Sí, Salir"
              })]
            })]
          })
        })]
      });
    }), {
      setters: [function (e) {
        n = e.$, o = e.K, r = e.X, l = e.Z, a = e.q, c = e.t;
      }, function (e) {
        s = e.a, e.i, d = e.l, f = e.o;
      }, function (e) {
        g = e.n, u = e.t;
      }],
      execute: function () {
        (m = document.createElement("style")).textContent = "._container_12wmi_2{width:100vw;min-height:100vh;color:var(--clr-primary-text,#fff);box-sizing:border-box;background-color:#00705a;flex-direction:column;padding-top:160px;padding-left:80px;padding-right:32px;display:flex;overflow:hidden}._header_12wmi_17{width:100%;min-height:110px;position:relative}._logoWrapper_12wmi_23{position:absolute;top:0;left:0}._logo_12wmi_23{object-fit:contain;width:110px;height:110px}._loginBtnWrapper_12wmi_35{position:absolute;top:0;right:150px}._loginBtn_12wmi_35{color:#fff;text-transform:capitalize;cursor:pointer;background-color:#00946f;border:none;border-radius:3rem;outline:none;width:12.5vw;height:8vh;padding:10px 20px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:600;transition:all .3s}._loginBtn_12wmi_35._focused_12wmi_58,._loginBtn_12wmi_35:hover{color:#000;background-color:#ffe500;transform:scale(1.1)}._body_12wmi_66{flex-direction:row;margin-top:32px;display:flex}._body_12wmi_66>*+*{margin-left:16px}._textColumn_12wmi_77{flex-direction:column;width:100%;display:flex}._mainTitle_12wmi_83{color:#fff;width:600px;margin:0;padding-top:96px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:3rem;font-weight:700;line-height:1.2}._subtitle_12wmi_94{color:#fff;margin:0;padding-top:72px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400}._subtitleSmall_12wmi_103{color:#fff;margin:0;padding-top:8px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:400}._qrColumn_12wmi_113{flex-direction:column;align-items:center;width:100%;padding-top:24px;display:flex}._qrContainer_12wmi_121{width:350px;height:350px;box-shadow:0 0 0 2px var(--foc-primary,#ffe500);box-sizing:border-box;background-color:#fff;border-radius:2rem;justify-content:center;align-items:center;padding:20px;display:flex}._dialogOverlay_12wmi_135{z-index:100;background:rgba(0,0,0,.6);justify-content:center;align-items:center;width:100vw;height:100vh;display:flex;position:fixed;top:0;left:0}._dialog_12wmi_135{text-align:center;background:rgba(0,0,0,.85);border-radius:16px;min-width:420px;padding:40px 48px;box-shadow:0 25px 50px rgba(0,0,0,.5)}._dialogLogo_12wmi_157{object-fit:contain;width:60px;height:60px;margin-bottom:16px}._dialogTitle_12wmi_164{color:#fff;margin-bottom:12px;font-size:1.8rem;font-weight:700}._dialogSubtitle_12wmi_171{color:#bdbdbd;margin-bottom:32px;font-size:1.2rem}._dialogActions_12wmi_177{justify-content:center;display:flex}._dialogActions_12wmi_177>*+*{margin-left:24px}._dialogBtn_12wmi_186{cursor:pointer;text-transform:none;color:#fff;background-color:#00705a;border:2px solid #00705a;border-radius:2rem;outline:none;padding:12px 40px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.5rem;font-weight:600;transition:all .3s}._dialogBtn_12wmi_186._focused_12wmi_58,._dialogBtn_12wmi_186:hover{color:#000;background-color:#ffe500;border-color:#ffe500}\n/*$vite$:1*/", document.head.appendChild(m), _ = n(l(), 1), p = {
          container: "_container_12wmi_2",
          header: "_header_12wmi_17",
          logoWrapper: "_logoWrapper_12wmi_23",
          logo: "_logo_12wmi_23",
          loginBtnWrapper: "_loginBtnWrapper_12wmi_35",
          loginBtn: "_loginBtn_12wmi_35",
          focused: "_focused_12wmi_58",
          body: "_body_12wmi_66",
          textColumn: "_textColumn_12wmi_77",
          mainTitle: "_mainTitle_12wmi_83",
          subtitle: "_subtitle_12wmi_94",
          subtitleSmall: "_subtitleSmall_12wmi_103",
          qrColumn: "_qrColumn_12wmi_113",
          qrContainer: "_qrContainer_12wmi_121",
          dialogOverlay: "_dialogOverlay_12wmi_135",
          dialog: "_dialog_12wmi_135",
          dialogLogo: "_dialogLogo_12wmi_157",
          dialogTitle: "_dialogTitle_12wmi_164",
          dialogSubtitle: "_dialogSubtitle_12wmi_171",
          dialogActions: "_dialogActions_12wmi_177",
          dialogBtn: "_dialogBtn_12wmi_186"
        }, h = c(), w = "sn:register";
      }
    };
  });
}();