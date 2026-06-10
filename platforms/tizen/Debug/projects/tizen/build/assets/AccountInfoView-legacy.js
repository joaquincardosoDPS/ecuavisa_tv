!function () {
  function e(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, r) {
      var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != t) {
        var n,
          a,
          o,
          i,
          l = [],
          c = !0,
          s = !1;
        try {
          if (o = (t = t.call(e)).next, 0 === r) {
            if (Object(t) !== t) return;
            c = !1;
          } else for (; !(c = (n = o.call(t)).done) && (l.push(n.value), l.length !== r); c = !0);
        } catch (e) {
          s = !0, a = e;
        } finally {
          try {
            if (!c && null != t.return && (i = t.return(), Object(i) !== i)) return;
          } finally {
            if (s) throw a;
          }
        }
        return l;
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
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js"], function (r, t) {
    var n, a, o, i, l, c, s, u, f, d, _, m, g, p, x;
    function v(e) {
      var r = e.focusKey,
        t = e.label,
        n = e.onPress,
        a = e.variant,
        o = void 0 === a ? "primary" : a,
        i = f({
          focusKey: r,
          onEnterPress: n
        }),
        l = i.ref,
        c = i.focused;
      return (0, x.jsx)("button", {
        ref: l,
        className: [p.button, "secondary" === o && p.buttonSecondary, c && p.buttonFocused].filter(Boolean).join(" "),
        onClick: n,
        children: t
      });
    }
    return r("default", function () {
      var r,
        t,
        n,
        s,
        d,
        m = _(function (e) {
          return e.activeProfile;
        }),
        y = _(function (e) {
          return e.logout;
        }),
        h = function () {
          var r = e((0, g.useState)(null), 2),
            t = r[0],
            n = r[1],
            i = e((0, g.useState)(!0), 2),
            l = i[0],
            c = i[1],
            s = e((0, g.useState)(""), 2),
            f = s[0],
            d = s[1];
          return (0, g.useEffect)(function () {
            var e = !1,
              r = localStorage.getItem("auth_token") || "";
            return r ? (c(!0), d(""), o.post(a, "client=".concat(u, "&token=").concat(r, "&_t=").concat(Date.now()), {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(function (r) {
              if (!e) {
                var t = r.data;
                "error" === t.status ? d(t.msj || "Error al cargar la sesión.") : t.user && n({
                  name: t.user.name || "",
                  last_name: t.user.last_name || "",
                  email: t.user.email || "",
                  gender: t.user.gender || ""
                });
              }
            }).catch(function (r) {
              e || d(r instanceof Error ? r.message : "Error al cargar la sesión.");
            }).finally(function () {
              e || c(!1);
            }), function () {
              e = !0;
            }) : (c(!1), void d("No hay sesión activa."));
          }, []), {
            session: t,
            isLoading: l,
            error: f
          };
        }(),
        b = h.session,
        j = h.isLoading,
        N = h.error,
        C = (t = l(), {
          goToAccountInfo: function () {
            t("/mi-latina/cuenta", {
              replace: !0
            });
          },
          goBack: function () {
            t(-1);
          },
          goToMiLatina: function () {
            t("/mi-latina", {
              replace: !0
            });
          },
          goToHomeAfterLogout: function () {
            t("/", {
              replace: !0
            });
          }
        }),
        w = C.goToMiLatina,
        T = C.goToHomeAfterLogout,
        S = f({
          focusKey: "ACCOUNT-INFO-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          autoRestoreFocus: !0
        }),
        I = S.ref,
        L = S.focusKey,
        k = m ? (n = m, Array.isArray(n.images) ? null : (null === (s = n.images) || void 0 === s ? void 0 : s.medium) || (null === (d = n.images) || void 0 === d ? void 0 : d.default) || null) : null,
        A = (0, g.useCallback)(function () {
          y(), T();
        }, [y, T]);
      return (0, g.useEffect)(function () {
        j || setTimeout(function () {
          return c("ACCOUNT-BTN-LOGOUT");
        }, 300);
      }, [j]), (0, g.useEffect)(function () {
        var e = function (e) {
          var r = e.keyCode;
          27 !== r && 8 !== r && 10009 !== r && 461 !== r || (e.preventDefault(), e.stopPropagation(), w());
        };
        return window.addEventListener("keydown", e, !0), function () {
          return window.removeEventListener("keydown", e, !0);
        };
      }, [w]), j ? (0, x.jsx)("div", {
        className: p.loading,
        children: "Cargando..."
      }) : (0, x.jsx)(i.Provider, {
        value: L,
        children: (0, x.jsxs)("div", {
          ref: I,
          className: p.container,
          children: [(0, x.jsx)("div", {
            className: p.avatar,
            children: k ? (0, x.jsx)("img", {
              src: k,
              alt: (null == m ? void 0 : m.name_perfil) || "Perfil",
              className: p.avatarImg,
              draggable: !1,
              decoding: "async"
            }) : (0, x.jsx)("span", {
              className: p.avatarInitial,
              children: (null == m || null === (r = m.name_perfil) || void 0 === r ? void 0 : r.charAt(0).toUpperCase()) || "U"
            })
          }), (0, x.jsx)("h1", {
            className: p.title,
            children: "Mi Perfil"
          }), N ? (0, x.jsx)("p", {
            className: p.errorText,
            children: N
          }) : b ? (0, x.jsxs)("div", {
            className: p.infoGroup,
            children: [(0, x.jsx)("span", {
              className: p.infoLabel,
              children: "Nombre"
            }), (0, x.jsxs)("span", {
              className: p.infoValue,
              children: [b.name, " ", b.last_name]
            }), (0, x.jsx)("span", {
              className: p.infoLabel,
              children: "Email"
            }), (0, x.jsx)("span", {
              className: p.infoValue,
              children: b.email
            })]
          }) : null, (0, x.jsx)("div", {
            className: p.buttonsContainer,
            children: (0, x.jsx)(v, {
              focusKey: "ACCOUNT-BTN-LOGOUT",
              label: "Cerrar Sesión",
              onPress: A,
              variant: "secondary"
            })
          })]
        })
      });
    }), {
      setters: [function (e) {
        n = e.$, a = e.C, o = e.I, i = e.K, l = e.U, c = e.X, s = e.Z, u = e.i, f = e.q, d = e.t;
      }, function (e) {
        _ = e.o;
      }],
      execute: function () {
        (m = document.createElement("style")).textContent = "._container_px39g_1{flex-direction:column;justify-content:center;align-items:center;min-height:100vh;padding:6vh 4vw 4vh;display:flex}._avatar_px39g_11{background:rgba(255,255,255,.1);border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;width:100px;height:100px;margin-bottom:2vh;display:flex;overflow:hidden}._avatarImg_px39g_24{object-fit:cover;width:100%;height:100%}._avatarInitial_px39g_30{color:var(--clr-primary-text);text-transform:uppercase;font-size:2.5rem;font-weight:700;line-height:1}._title_px39g_39{color:var(--clr-primary-title);margin:0 0 1vh;font-size:2rem;font-weight:700}._profileName_px39g_47{color:var(--clr-primary-text);opacity:.8;margin:0 0 4vh;font-size:1.2rem}._infoGroup_px39g_54{flex-direction:column;align-items:center;margin-bottom:4vh;display:flex}._infoGroup_px39g_54>*+*{margin-top:1vh}._infoLabel_px39g_65{color:var(--clr-primary-subtitle);opacity:.6;text-transform:uppercase;letter-spacing:.05em;font-size:.9rem}._infoValue_px39g_73{color:var(--clr-primary-text);font-size:1.1rem}._buttonsContainer_px39g_79{flex-direction:column;align-items:center;display:flex}._buttonsContainer_px39g_79>*+*{margin-top:1.5vh}._button_px39g_79{background:var(--clr-primary-button);color:var(--clr-text-primary-button);cursor:pointer;border:2px solid transparent;border-radius:8px;justify-content:center;align-items:center;min-width:280px;padding:1.2rem 3rem;font-size:1.1rem;font-weight:600;transition:transform .2s,opacity .2s;display:flex}._buttonFocused_px39g_106,._button_px39g_79:hover{border-color:var(--foc-primary);background:var(--foc-primary);color:var(--clr-text-primary-button);transform:scale(1.05)}._buttonSecondary_px39g_115{background:var(--clr-secondary-button);color:var(--clr-text-secondary-button)}._buttonSecondary_px39g_115._buttonFocused_px39g_106,._buttonSecondary_px39g_115:hover{background:var(--foc-secondary);border-color:var(--foc-secondary);color:var(--clr-text-secondary-button)}._loading_px39g_128{min-height:100vh;color:var(--clr-primary-text);justify-content:center;align-items:center;font-size:1.2rem;display:flex}._errorText_px39g_138{color:#ef4444;text-align:center;margin-bottom:3vh;font-size:1.1rem}\n/*$vite$:1*/", document.head.appendChild(m), g = n(s(), 1), p = {
          container: "_container_px39g_1",
          avatar: "_avatar_px39g_11",
          avatarImg: "_avatarImg_px39g_24",
          avatarInitial: "_avatarInitial_px39g_30",
          title: "_title_px39g_39",
          profileName: "_profileName_px39g_47",
          infoGroup: "_infoGroup_px39g_54",
          infoLabel: "_infoLabel_px39g_65",
          infoValue: "_infoValue_px39g_73",
          buttonsContainer: "_buttonsContainer_px39g_79",
          button: "_button_px39g_79",
          buttonFocused: "_buttonFocused_px39g_106",
          buttonSecondary: "_buttonSecondary_px39g_115",
          loading: "_loading_px39g_128",
          errorText: "_errorText_px39g_138"
        }, x = d();
      }
    };
  });
}();