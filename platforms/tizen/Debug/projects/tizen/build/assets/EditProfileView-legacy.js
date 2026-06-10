!function () {
  function e(r) {
    return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, e(r);
  }
  function r() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
      n,
      a = "function" == typeof Symbol ? Symbol : {},
      o = a.iterator || "@@iterator",
      i = a.toStringTag || "@@toStringTag";
    function l(r, a, o, i) {
      var l = a && a.prototype instanceof s ? a : s,
        u = Object.create(l.prototype);
      return t(u, "_invoke", function (r, t, a) {
        var o,
          i,
          l,
          s = 0,
          u = a || [],
          d = !1,
          f = {
            p: 0,
            n: 0,
            v: e,
            a: v,
            f: v.bind(e, 4),
            d: function (r, t) {
              return o = r, i = 0, l = e, f.n = t, c;
            }
          };
        function v(r, t) {
          for (i = r, l = t, n = 0; !d && s && !a && n < u.length; n++) {
            var a,
              o = u[n],
              v = f.p,
              m = o[2];
            r > 3 ? (a = m === t) && (l = o[(i = o[4]) ? 5 : (i = 3, 3)], o[4] = o[5] = e) : o[0] <= v && ((a = r < 2 && v < o[1]) ? (i = 0, f.v = t, f.n = o[1]) : v < m && (a = r < 3 || o[0] > t || t > m) && (o[4] = r, o[5] = t, f.n = m, i = 0));
          }
          if (a || r > 1) return c;
          throw d = !0, t;
        }
        return function (a, u, m) {
          if (s > 1) throw TypeError("Generator is already running");
          for (d && 1 === u && v(u, m), i = u, l = m; (n = i < 2 ? e : l) || !d;) {
            o || (i ? i < 3 ? (i > 1 && (f.n = -1), v(i, l)) : f.n = l : f.v = l);
            try {
              if (s = 2, o) {
                if (i || (a = "next"), n = o[a]) {
                  if (!(n = n.call(o, l))) throw TypeError("iterator result is not an object");
                  if (!n.done) return n;
                  l = n.value, i < 2 && (i = 0);
                } else 1 === i && (n = o.return) && n.call(o), i < 2 && (l = TypeError("The iterator does not provide a '" + a + "' method"), i = 1);
                o = e;
              } else if ((n = (d = f.n < 0) ? l : r.call(t, f)) !== c) break;
            } catch (n) {
              o = e, i = 1, l = n;
            } finally {
              s = 1;
            }
          }
          return {
            value: n,
            done: d
          };
        };
      }(r, o, i), !0), u;
    }
    var c = {};
    function s() {}
    function u() {}
    function d() {}
    n = Object.getPrototypeOf;
    var f = [][o] ? n(n([][o]())) : (t(n = {}, o, function () {
        return this;
      }), n),
      v = d.prototype = s.prototype = Object.create(f);
    function m(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, t(e, i, "GeneratorFunction")), e.prototype = Object.create(v), e;
    }
    return u.prototype = d, t(v, "constructor", d), t(d, "constructor", u), u.displayName = "GeneratorFunction", t(d, i, "GeneratorFunction"), t(v), t(v, i, "Generator"), t(v, o, function () {
      return this;
    }), t(v, "toString", function () {
      return "[object Generator]";
    }), (r = function () {
      return {
        w: l,
        m: m
      };
    })();
  }
  function t(e, r, n, a) {
    var o = Object.defineProperty;
    try {
      o({}, "", {});
    } catch (e) {
      o = 0;
    }
    t = function (e, r, n, a) {
      function i(r, n) {
        t(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      r ? o ? o(e, r, {
        value: n,
        enumerable: !a,
        configurable: !a,
        writable: !a
      }) : e[r] = n : (i("next", 0), i("throw", 1), i("return", 2));
    }, t(e, r, n, a);
  }
  function n(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      r && (n = n.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, n);
    }
    return t;
  }
  function a(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? n(Object(t), !0).forEach(function (r) {
        o(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : n(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function o(r, t, n) {
    return (t = function (r) {
      var t = function (r, t) {
        if ("object" != e(r) || !r) return r;
        var n = r[Symbol.toPrimitive];
        if (void 0 !== n) {
          var a = n.call(r, t || "default");
          if ("object" != e(a)) return a;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(r);
      }(r, "string");
      return "symbol" == e(t) ? t : t + "";
    }(t)) in r ? Object.defineProperty(r, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : r[t] = n, r;
  }
  function i(e, r, t, n, a, o, i) {
    try {
      var l = e[o](i),
        c = l.value;
    } catch (e) {
      return void t(e);
    }
    l.done ? r(c) : Promise.resolve(c).then(n, a);
  }
  function l(e) {
    return function () {
      var r = this,
        t = arguments;
      return new Promise(function (n, a) {
        var o = e.apply(r, t);
        function l(e) {
          i(o, n, a, l, c, "next", e);
        }
        function c(e) {
          i(o, n, a, l, c, "throw", e);
        }
        l(void 0);
      });
    };
  }
  function c(e, r) {
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
    }(e, r) || function (e, r) {
      if (e) {
        if ("string" == typeof e) return s(e, r);
        var t = {}.toString.call(e).slice(8, -1);
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? s(e, r) : void 0;
      }
    }(e, r) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function s(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
    return n;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./profileService-legacy.js", "./Button-legacy.js", "./useProfilesNavigation-legacy.js", "./OnScreenKeyboard-legacy.js", "./iconos-edit-legacy.js"], function (e, t) {
    var n, o, i, s, u, d, f, v, m, _, p, b, g, y, h, x, w, j, P, E, C;
    function k(e) {
      var r = e.focusKey,
        t = e.label,
        n = e.onPress,
        a = e.disabled,
        o = e.baseClass,
        i = e.focusedClass,
        l = f({
          focusKey: r,
          focusable: !a,
          onEnterPress: n
        }),
        c = l.ref,
        s = l.focused;
      return (0, C.jsx)("button", {
        ref: c,
        className: "".concat(E.actionBtn, " ").concat(o, " ").concat(s ? i : ""),
        onClick: n,
        disabled: a,
        children: t
      });
    }
    function O(e) {
      var r = e.name,
        t = e.isDeleting,
        n = e.onCancel,
        a = e.onDelete,
        o = f({
          focusKey: "DELETE-MODAL",
          isFocusBoundary: !0,
          trackChildren: !0
        }),
        l = o.ref,
        c = o.focusKey;
      return (0, P.useEffect)(function () {
        setTimeout(function () {
          return u("modal-cancel");
        }, 50);
      }, []), (0, C.jsx)(i.Provider, {
        value: c,
        children: (0, C.jsx)("div", {
          ref: l,
          className: E.modalOverlay,
          children: (0, C.jsxs)("div", {
            className: E.modalContent,
            children: [(0, C.jsxs)("p", {
              className: E.modalText,
              children: ["¿Quieres borrar el perfil de ", r, "?"]
            }), (0, C.jsxs)("div", {
              className: E.modalActions,
              children: [(0, C.jsx)(k, {
                focusKey: "modal-cancel",
                label: "Cancelar",
                onPress: n,
                baseClass: "".concat(E.modalBtn, " ").concat(E.modalCancelBtn),
                focusedClass: E.modalBtnFocused
              }), (0, C.jsx)(k, {
                focusKey: "modal-delete",
                label: t ? "Borrando..." : "Borrar",
                onPress: a,
                disabled: t,
                baseClass: "".concat(E.modalBtn, " ").concat(E.modalDeleteBtn),
                focusedClass: E.modalBtnFocused
              })]
            })]
          })
        })
      });
    }
    return e("default", function () {
      var e,
        t,
        n,
        d = s().id,
        v = h(),
        j = v.goToProfiles,
        k = v.goToAvatarSelect,
        B = p(function (e) {
          return e.token;
        }),
        S = !d || "nuevo" === d,
        A = b(function () {
          return g.getAll(B);
        }, [B], {
          enabled: !!B && !S
        }).data,
        T = S ? null : null !== (e = null == A || null === (t = A.data) || void 0 === t ? void 0 : t.find(function (e) {
          return e.id === d;
        })) && void 0 !== e ? e : null,
        N = c((0, P.useState)(""), 2),
        I = N[0],
        F = N[1],
        D = c((0, P.useState)(null), 2),
        K = D[0],
        L = D[1],
        z = c((0, P.useState)(null), 2),
        G = z[0],
        W = z[1],
        R = c((0, P.useState)(!1), 2),
        $ = R[0],
        M = R[1],
        U = c((0, P.useState)(""), 2),
        q = U[0],
        H = U[1],
        Q = c((0, P.useState)(!1), 2),
        V = Q[0],
        X = Q[1],
        Z = c((0, P.useState)(!1), 2),
        J = Z[0],
        Y = Z[1],
        ee = c((0, P.useState)(!1), 2),
        re = ee[0],
        te = ee[1],
        ne = !(null == A || !A.data) && (null === (n = A.data[0]) || void 0 === n ? void 0 : n.id) === d,
        ae = !0 === (null == T ? void 0 : T.default) || ne,
        oe = o(),
        ie = (0, P.useRef)(!1);
      (0, P.useEffect)(function () {
        var e = oe.state;
        null != e && e.selectedAvatar && (L(e.selectedAvatar), W(e.selectedAvatarUrl || null), ie.current = !0), void 0 !== (null == e ? void 0 : e.currentName) && F(e.currentName);
      }, [oe.state]), (0, P.useEffect)(function () {
        T && (F(T.name_perfil), ie.current || L(T.avatar || null));
      }, [T]);
      var le = f({
          focusKey: "EDIT-PROFILE-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        ce = le.ref,
        se = le.focusKey;
      (0, P.useEffect)(function () {
        setTimeout(function () {
          return u("PROFILE-KB-r0-a");
        }, 300);
      }, []), (0, P.useEffect)(function () {
        var e = function (e) {
          m(e, "Back") && (e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), J ? Y(!1) : j());
        };
        return window.addEventListener("keydown", e, !0), function () {
          return window.removeEventListener("keydown", e, !0);
        };
      }, [j, J]);
      var ue,
        de,
        fe = p(function (e) {
          return e.activeProfile;
        }),
        ve = p(function (e) {
          return e.setActiveProfile;
        }),
        me = function () {
          var e = l(r().m(function e() {
            var t, n, o, i, l, c, s;
            return r().w(function (e) {
              for (;;) switch (e.p = e.n) {
                case 0:
                  if (B) {
                    e.n = 1;
                    break;
                  }
                  return e.a(2);
                case 1:
                  if (I.trim()) {
                    e.n = 2;
                    break;
                  }
                  return H("El nombre del perfil es obligatorio."), e.a(2);
                case 2:
                  if (M(!0), H(""), e.p = 3, n = S ? K : null !== (t = null != K ? K : null == T ? void 0 : T.avatar) && void 0 !== t ? t : null, console.log("[EditProfile] Submitting:", {
                    isCreateMode: S,
                    name: I.trim(),
                    avatarToSend: n,
                    selectedAvatar: K,
                    existingAvatar: null == T ? void 0 : T.avatar
                  }), !S) {
                    e.n = 5;
                    break;
                  }
                  return e.n = 4, g.create(B, I.trim(), n);
                case 4:
                  c = e.v, e.n = 7;
                  break;
                case 5:
                  return e.n = 6, g.update(B, d, I.trim(), n);
                case 6:
                  c = e.v;
                case 7:
                  if ("error" !== (o = c).status) {
                    e.n = 8;
                    break;
                  }
                  return i = o.msj || "", l = "Error al guardar el perfil.", i.toLowerCase().includes("avatar") ? l = "Debes seleccionar un avatar para el perfil." : i.toLowerCase().includes("name") || i.toLowerCase().includes("nombre") ? l = "El nombre del perfil es obligatorio." : i && (l = i), H(l), e.a(2);
                case 8:
                  !S && T && (null == fe ? void 0 : fe.id) === d && ve(a(a({}, T), {}, {
                    name_perfil: I.trim(),
                    avatar: n || T.avatar,
                    images: G ? {
                      default: G,
                      medium: G
                    } : T.images
                  })), X(!0), setTimeout(function () {
                    return j();
                  }, 1200), e.n = 10;
                  break;
                case 9:
                  e.p = 9, s = e.v, console.error("[EditProfile] Error:", s), H("Error de conexión. Intenta de nuevo.");
                case 10:
                  return e.p = 10, M(!1), e.f(10);
                case 11:
                  return e.a(2);
              }
            }, e, null, [[3, 9, 10, 11]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }(),
        _e = (0, P.useCallback)(l(r().m(function e() {
          var t, n;
          return r().w(function (e) {
            for (;;) switch (e.p = e.n) {
              case 0:
                if (B && d && !S) {
                  e.n = 1;
                  break;
                }
                return e.a(2);
              case 1:
                return te(!0), e.p = 2, e.n = 3, g.delete(B, d);
              case 3:
                if ("error" !== (t = e.v).status) {
                  e.n = 4;
                  break;
                }
                return H(t.msj || "Error al eliminar el perfil."), Y(!1), e.a(2);
              case 4:
                j(), e.n = 6;
                break;
              case 5:
                e.p = 5, n = e.v, console.error("[EditProfile] Delete error:", n), H("Error de conexión."), Y(!1);
              case 6:
                return e.p = 6, te(!1), e.f(6);
              case 7:
                return e.a(2);
            }
          }, e, null, [[2, 5, 6, 7]]);
        })), [B, d, S, j]),
        pe = G || (!T || Array.isArray(T.images) ? null : (null === (ue = T.images) || void 0 === ue ? void 0 : ue.medium) || (null === (de = T.images) || void 0 === de ? void 0 : de.default) || null),
        be = S ? "/mi-latina/nuevo" : "/mi-latina/".concat(d),
        ge = (0, P.useCallback)(function () {
          k(K, be, I);
        }, [k, K, be, I]),
        ye = f({
          focusKey: "edit-profile-avatar-btn",
          onEnterPress: ge,
          onArrowPress: function (e) {
            return "right" === e ? (u("PROFILE-KB"), !1) : "down" !== e || (u("edit-profile-save"), !1);
          }
        }),
        he = ye.ref,
        xe = ye.focused;
      return S || T || !A ? (0, C.jsxs)(i.Provider, {
        value: se,
        children: [(0, C.jsxs)("div", {
          ref: ce,
          className: E.container,
          children: [(0, C.jsx)("h1", {
            className: E.title,
            children: S ? "Crear perfil" : "Editar perfil"
          }), (0, C.jsxs)("div", {
            className: E.contentGrid,
            children: [(0, C.jsxs)("div", {
              className: E.leftColumn,
              children: [(0, C.jsxs)("div", {
                className: E.avatarContainer,
                children: [(0, C.jsx)("div", {
                  className: E.avatarPreview,
                  children: pe ? (0, C.jsx)("img", {
                    src: pe,
                    alt: "Avatar",
                    className: E.avatarPreviewImg,
                    draggable: !1,
                    decoding: "async"
                  }) : (0, C.jsx)("span", {
                    className: E.avatarPreviewFallback,
                    children: (I.trim() || (null == T ? void 0 : T.name_perfil) || "Default").charAt(0).toUpperCase()
                  })
                }), (0, C.jsx)("button", {
                  ref: he,
                  className: "".concat(E.avatarEditBadge, " ").concat(xe ? E.avatarEditBadgeFocused : ""),
                  onClick: ge,
                  children: (0, C.jsx)("img", {
                    src: w,
                    alt: "Editar",
                    className: E.avatarEditIcon
                  })
                })]
              }), (0, C.jsx)("input", {
                type: "text",
                placeholder: "Nombre del perfil",
                value: I,
                className: E.nameInput,
                readOnly: !0,
                maxLength: 15
              })]
            }), (0, C.jsx)("div", {
              className: E.rightColumn,
              children: (0, C.jsx)("div", {
                className: E.keyboardWrapper,
                children: (0, C.jsx)(x, {
                  focusKeyPrefix: "PROFILE-KB",
                  onInput: function (e) {
                    return F(function (r) {
                      return r.length < 15 ? r + e : r;
                    });
                  },
                  onDelete: function () {
                    return F(function (e) {
                      return e.slice(0, -1);
                    });
                  },
                  onEscapeLeft: function () {
                    return u("edit-profile-avatar-btn");
                  }
                })
              })
            })]
          }), (0, C.jsxs)("div", {
            className: E.bottomActions,
            children: [q && (0, C.jsx)("p", {
              className: E.errorText,
              children: q
            }), V && (0, C.jsxs)("p", {
              className: E.successText,
              children: [S ? "Perfil creado" : "Perfil actualizado", " ✓"]
            }), (0, C.jsx)(y, {
              focusKey: "edit-profile-save",
              variant: "secondary",
              onPress: me,
              children: $ ? "Guardando..." : S ? "Crear perfil" : "Guardar cambios"
            }), !S && !ae && (0, C.jsx)(y, {
              focusKey: "edit-profile-delete",
              variant: "tertiary",
              onPress: function () {
                return Y(!0);
              },
              children: "Eliminar perfil"
            })]
          })]
        }), J && (0, C.jsx)(O, {
          name: I || (null == T ? void 0 : T.name_perfil) || "",
          isDeleting: re,
          onCancel: function () {
            Y(!1), u("edit-profile-delete");
          },
          onDelete: _e
        })]
      }) : (0, C.jsx)(_, {});
    }), {
      setters: [function (e) {
        n = e.$, o = e.H, i = e.K, s = e.W, u = e.X, d = e.Z, f = e.q, v = e.t;
      }, function (e) {
        m = e.l, _ = e.n, p = e.o, b = e.t;
      }, function (e) {
        g = e.t;
      }, function (e) {
        y = e.t;
      }, function (e) {
        h = e.n;
      }, function (e) {
        x = e.t;
      }, function (e) {
        w = e.t;
      }],
      execute: function () {
        (j = document.createElement("style")).textContent = "._container_1l0vi_1{background:var(--clr-primary);flex-direction:column;width:100%;height:100vh;padding:2vh 4vw;display:flex;overflow:hidden}._title_1l0vi_12{color:var(--clr-primary-title);text-align:center;flex-shrink:0;margin:15vh 0 5vh;font-size:2.2vw;font-weight:700}._contentGrid_1l0vi_25{flex-direction:row;justify-content:center;align-items:center;display:flex}._leftColumn_1l0vi_33{flex-direction:column;align-items:center;width:20vw;margin-right:3vw;display:flex}._leftColumn_1l0vi_33>*+*{margin-top:4vh}._columnLabel_1l0vi_45{color:var(--clr-primary-text);opacity:.8;align-self:flex-start;margin:0;font-size:1rem;font-weight:500}._avatarContainer_1l0vi_55{position:relative}._avatarPreview_1l0vi_59{background:rgba(255,255,255,.1);border-radius:50%;justify-content:center;align-items:center;width:12vw;height:12vw;display:flex;overflow:hidden}._avatarPreviewImg_1l0vi_71{object-fit:cover;width:100%;height:100%}._avatarPreviewFallback_1l0vi_77{color:var(--clr-primary-text);text-transform:uppercase;font-size:5vw;font-weight:700;line-height:1}._avatarEditBadge_1l0vi_85{cursor:pointer;background:#fff;border:2px solid transparent;border-radius:50%;outline:none;justify-content:center;align-items:center;width:2vw;height:2vw;padding:0;transition:transform .2s,border-color .2s;display:flex;position:absolute;bottom:.3vw;right:.3vw;box-shadow:0 2px 8px rgba(0,0,0,.3)}._avatarEditBadgeFocused_1l0vi_104,._avatarEditBadge_1l0vi_85:hover{border-color:var(--foc-primary);transform:scale(1.15)}._avatarEditIcon_1l0vi_110{width:1.1vw;height:1.1vw}._nameInput_1l0vi_116{background:var(--clr-secondary);width:100%;color:var(--clr-primary-text);text-align:center;border:2px solid transparent;border-radius:8px;outline:none;padding:1vh 1vw;font-size:1vw}._rightColumn_1l0vi_129{flex-direction:column;align-items:flex-start;width:20vw;display:flex}._rightColumn_1l0vi_129>*+*{margin-top:.5vh}._keyboardWrapper_1l0vi_140{width:100%}._keyboardWrapper_1l0vi_140>div{padding:0}._keyboardWrapper_1l0vi_140 button{text-transform:none;border-radius:5px;height:5.5vh;min-height:5.5vh;font-size:1vw}._bottomActions_1l0vi_158{flex-shrink:0;justify-content:center;padding:1.5rem 0;display:flex}._bottomActions_1l0vi_158>*+*{margin-left:1.5rem}._actionBtn_1l0vi_169{cursor:pointer;text-align:center;border:2px solid transparent;border-radius:8px;outline:none;padding:.75rem 2.5rem;font-size:.9rem;font-weight:600;transition:border-color .2s,transform .2s}._actionBtn_1l0vi_169:disabled{opacity:.5}._errorText_1l0vi_187{color:#fca5a5;text-align:center;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);border-radius:8px;margin:0;padding:.8rem 1.5rem;font-size:1.2rem}._successText_1l0vi_198{color:#86efac;text-align:center;background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);border-radius:8px;margin:0;padding:.8rem 1.5rem;font-size:1.2rem}._modalOverlay_1l0vi_210{z-index:200;background:rgba(0,0,0,.75);justify-content:center;align-items:center;display:flex;position:fixed;top:0;bottom:0;left:0;right:0}._modalContent_1l0vi_220{background:var(--clr-secondary);border-radius:16px;flex-direction:column;align-items:center;min-width:22rem;padding:2.5rem;display:flex}._modalContent_1l0vi_220>*+*{margin-top:1.5rem}._modalText_1l0vi_234{color:var(--clr-primary-text);text-align:center;margin:0;font-size:1rem}._modalActions_1l0vi_241{width:100%;display:flex}._modalActions_1l0vi_241>*+*{margin-left:1rem}._modalBtn_1l0vi_250{cursor:pointer;text-transform:uppercase;border:2px solid transparent;border-radius:8px;outline:none;flex:1;padding:.7rem 1rem;font-size:.9rem;font-weight:600;transition:border-color .2s,transform .2s}._modalCancelBtn_1l0vi_263{color:var(--clr-primary-text);background:0 0}._modalDeleteBtn_1l0vi_268{background:var(--foc-primary);color:var(--clr-text-secondary-button)}._modalBtnFocused_1l0vi_273{border-color:#fff;transform:scale(1.03)}\n/*$vite$:1*/", document.head.appendChild(j), P = n(d(), 1), E = {
          container: "_container_1l0vi_1",
          title: "_title_1l0vi_12",
          contentGrid: "_contentGrid_1l0vi_25",
          leftColumn: "_leftColumn_1l0vi_33",
          columnLabel: "_columnLabel_1l0vi_45",
          avatarContainer: "_avatarContainer_1l0vi_55",
          avatarPreview: "_avatarPreview_1l0vi_59",
          avatarPreviewImg: "_avatarPreviewImg_1l0vi_71",
          avatarPreviewFallback: "_avatarPreviewFallback_1l0vi_77",
          avatarEditBadge: "_avatarEditBadge_1l0vi_85",
          avatarEditBadgeFocused: "_avatarEditBadgeFocused_1l0vi_104",
          avatarEditIcon: "_avatarEditIcon_1l0vi_110",
          nameInput: "_nameInput_1l0vi_116",
          rightColumn: "_rightColumn_1l0vi_129",
          keyboardWrapper: "_keyboardWrapper_1l0vi_140",
          bottomActions: "_bottomActions_1l0vi_158",
          actionBtn: "_actionBtn_1l0vi_169",
          errorText: "_errorText_1l0vi_187",
          successText: "_successText_1l0vi_198",
          modalOverlay: "_modalOverlay_1l0vi_210",
          modalContent: "_modalContent_1l0vi_220",
          modalText: "_modalText_1l0vi_234",
          modalActions: "_modalActions_1l0vi_241",
          modalBtn: "_modalBtn_1l0vi_250",
          modalCancelBtn: "_modalCancelBtn_1l0vi_263",
          modalDeleteBtn: "_modalDeleteBtn_1l0vi_268",
          modalBtnFocused: "_modalBtnFocused_1l0vi_273"
        }, C = v();
      }
    };
  });
}();