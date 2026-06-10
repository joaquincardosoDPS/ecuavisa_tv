!function () {
  function e(e, r) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, n) {
      var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != r) {
        var t,
          o,
          i,
          c,
          a = [],
          s = !0,
          l = !1;
        try {
          if (i = (r = r.call(e)).next, 0 === n) {
            if (Object(r) !== r) return;
            s = !1;
          } else for (; !(s = (t = i.call(r)).done) && (a.push(t.value), a.length !== n); s = !0);
        } catch (e) {
          l = !0, o = e;
        } finally {
          try {
            if (!s && null != r.return && (c = r.return(), Object(c) !== c)) return;
          } finally {
            if (l) throw o;
          }
        }
        return a;
      }
    }(e, r) || function (e, r) {
      if (e) {
        if ("string" == typeof e) return n(e, r);
        var t = {}.toString.call(e).slice(8, -1);
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? n(e, r) : void 0;
      }
    }(e, r) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function n(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var r = 0, t = Array(n); r < n; r++) t[r] = e[r];
    return t;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./Button-legacy.js", "./useProfilesNavigation-legacy.js", "./iconos-edit-legacy.js", "./ProfilesView.module-legacy.js"], function (n, r) {
    var t, o, i, c, a, s, l, u, f, d, C, p, g, h, v, m;
    function y(e) {
      var n = e.profile,
        r = e.focusKey,
        t = e.onSelect,
        o = e.editMode,
        c = e.onEdit,
        s = e.prevFocusKey,
        l = e.nextFocusKey,
        u = function () {
          o ? c() : t();
        },
        f = a({
          focusKey: r,
          onEnterPress: u,
          onArrowPress: function (e) {
            return "down" === e ? (i("profiles-edit-btn"), !1) : "left" === e ? (i(s || d), !1) : "right" !== e || !l || (i(l), !1);
          }
        }),
        C = f.ref,
        p = f.focused;
      (0, v.useEffect)(function () {
        p && C.current && C.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, [p, C]);
      var g = function (e) {
        var n, r;
        return Array.isArray(e.images) ? null : (null === (n = e.images) || void 0 === n ? void 0 : n.medium) || (null === (r = e.images) || void 0 === r ? void 0 : r.default) || null;
      }(n);
      return (0, m.jsxs)("button", {
        ref: C,
        className: h.profileCard,
        onClick: u,
        children: [(0, m.jsxs)("div", {
          className: "".concat(h.avatarWrapper, " ").concat(p ? h.avatarWrapperFocused : ""),
          children: [g ? (0, m.jsx)("img", {
            src: g,
            alt: n.name_perfil,
            className: h.avatarImg,
            draggable: !1,
            decoding: "async"
          }) : (0, m.jsx)("span", {
            className: h.avatarInitial,
            children: n.name_perfil.charAt(0).toUpperCase()
          }), o && (0, m.jsx)("div", {
            className: "".concat(h.editBadge, " ").concat(p ? h.editBadgeFocused : ""),
            children: (0, m.jsx)("img", {
              src: "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%203.96483C0.105263%203.67009%200.161404%203.34728%200.31579%203.0736C0.77193%202.2736%201.4807%201.86658%202.4%201.85956C3.78246%201.85255%205.16491%201.85956%206.54737%201.85956C6.87018%201.85956%207.08772%202.05606%207.08772%202.32974C7.08772%202.61044%206.86316%202.80693%206.53333%202.80693C5.17895%202.80693%203.81754%202.80693%202.46316%202.80693C1.72632%202.80693%201.18597%203.20693%201.00351%203.90167C0.968421%204.04202%200.954386%204.19641%200.954386%204.34377C0.954386%208.40693%200.954386%2012.4771%200.954386%2016.5403C0.954386%2017.3052%201.33333%2017.8385%202.01404%2018.021C2.16842%2018.0631%202.32983%2018.0771%202.49123%2018.0771C6.87719%2018.0771%2011.2561%2018.0771%2015.6421%2018.0771C16.5754%2018.0771%2017.1789%2017.4666%2017.1789%2016.5262C17.1789%2015.1718%2017.1789%2013.8245%2017.1789%2012.4701C17.1789%2012.1964%2017.3193%2011.9999%2017.5439%2011.9508C17.8316%2011.8876%2018.1123%2012.0982%2018.1263%2012.3999C18.1333%2012.7789%2018.1263%2013.1578%2018.1263%2013.5368C18.1263%2014.6104%2018.1404%2015.6911%2018.1193%2016.7648C18.0912%2017.9578%2017.0807%2018.9543%2015.8877%2019.0104C15.8035%2019.0104%2015.7123%2019.0104%2015.6281%2019.0175C11.2491%2019.0175%206.87719%2019.0175%202.49825%2019.0175C1.53684%2019.0175%200.792983%2018.6315%200.31579%2017.8034C0.161404%2017.5368%200.105263%2017.2139%200%2016.9122C0%2012.5894%200%208.26658%200%203.95079V3.96483Z'%20fill='black'/%3e%3cpath%20d='M16.442%200C16.9754%200.00701754%2017.4525%200.182455%2017.8596%200.554385C18.0771%200.757894%2018.2876%200.96842%2018.4982%201.18596C19.3333%202.04912%2019.3473%203.29824%2018.5403%204.18246C18.4911%204.2386%2018.435%204.28772%2018.3859%204.34386C15.642%207.08772%2012.8911%209.83859%2010.1473%2012.5895C9.9929%2012.7439%209.82448%2012.8421%209.60693%2012.8982C8.36483%2013.2351%207.12974%2013.586%205.88764%2013.9298C5.71922%2013.9789%205.55781%2014.007%205.40343%2013.9158C5.20693%2013.8035%205.12272%2013.593%205.1929%2013.3333C5.48764%2012.2667%205.81044%2011.207%206.06307%2010.1333C6.21746%209.48772%206.52623%208.99649%206.99641%208.53333C9.62097%205.94386%2012.2175%203.33333%2014.821%200.722806C15.2701%200.273683%2015.7894%200.0140339%2016.442%200.00701637V0ZM14.421%202.54737C12.1192%204.84912%209.81044%207.15789%207.51571%209.45263C8.23851%2010.1754%208.97536%2010.9123%209.68413%2011.621C11.9859%209.3193%2014.2947%207.01053%2016.5894%204.71579C15.8666%204%2015.1297%203.25614%2014.421%202.54737ZM15.0806%201.76842C15.8525%202.54035%2016.5964%203.28421%2017.3473%204.0421C17.5438%203.83158%2017.7613%203.62807%2017.9438%203.39649C18.2525%203.01052%2018.2525%202.38596%2017.9368%202.00702C17.6911%201.7193%2017.4245%201.44561%2017.1368%201.20702C16.7718%200.905263%2016.3227%200.85614%2015.9157%201.09474C15.6069%201.27719%2015.3473%201.55088%2015.0806%201.76842ZM6.99641%2010.3649C6.77185%2011.1719%206.54728%2011.9789%206.31571%2012.814C7.15079%2012.5825%207.95781%2012.3579%208.76483%2012.1333C8.16834%2011.5368%207.58588%2010.9544%206.99641%2010.3579V10.3649Z'%20fill='black'/%3e%3c/svg%3e",
              alt: "Editar",
              className: h.editBadgeIcon
            })
          })]
        }), (0, m.jsx)("span", {
          className: "".concat(h.profileName, " ").concat(p ? h.profileNameFocused : ""),
          children: n.name_perfil
        })]
      });
    }
    function x(e) {
      var n = e.focusKey,
        r = e.disabled,
        t = e.onPress,
        o = function () {
          r || null == t || t();
        },
        c = a({
          focusKey: n,
          onEnterPress: o,
          focusable: !r,
          onArrowPress: function (e) {
            return "down" !== e || (i("profiles-edit-btn"), !1);
          }
        }),
        s = c.ref,
        l = c.focused;
      return (0, m.jsxs)("button", {
        ref: s,
        className: h.profileCard,
        onClick: o,
        children: [(0, m.jsx)("div", {
          className: "".concat(h.avatarWrapper, " ").concat(l ? h.avatarWrapperFocused : ""),
          children: (0, m.jsx)("span", {
            className: "".concat(h.addIcon, " ").concat(l ? h.addIconFocused : ""),
            children: "+"
          })
        }), (0, m.jsx)("span", {
          className: "".concat(h.profileName, " ").concat(l ? h.profileNameFocused : ""),
          children: "Agregar perfil"
        })]
      });
    }
    return n("default", function () {
      var n = l(function (e) {
          var n;
          return null === (n = e.config) || void 0 === n ? void 0 : n.logo;
        }) || "data:image/svg+xml,%3csvg%20width='51'%20height='77'%20viewBox='0%200%2051%2077'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1449_856)'%3e%3cpath%20d='M51.0001%2035.2505H22.2632V40.9285H51.0001V35.2505Z'%20fill='%23FF1376'/%3e%3cpath%20d='M36.6268%2077C44.5503%2077%2050.9952%2070.5275%2050.9952%2062.57V60.6611H45.3414V62.57C45.3414%2067.3953%2041.4315%2071.322%2036.6268%2071.322C31.822%2071.322%2027.9121%2067.3953%2027.9121%2062.57V60.6611H22.2583V62.57C22.2583%2070.5275%2028.7033%2077%2036.6268%2077Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9954%2048.1399H39.4346V53.8179H50.9954V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M33.824%2048.1399H22.2632V53.8179H33.824V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9931%2040.9261V35.2504L33.8242%2022.2544V28.7028L49.9776%2040.9261H50.9931Z'%20fill='%23FF1376'/%3e%3cpath%20d='M0%200V28.8505L17.1713%2040.9381V28.8505H28.7297V0H0ZM20.3165%2022.2544H16.3463V16.8597C16.3463%2016.4261%2016.2185%2016.087%2015.9604%2015.8399C15.7023%2015.5928%2015.3574%2015.4693%2014.9281%2015.4693C14.4987%2015.4693%2014.1369%2015.5928%2013.8861%2015.8399C13.6352%2016.087%2013.5098%2016.4261%2013.5098%2016.8597V22.2544H9.53959V16.8597C9.53959%2016.4261%209.41175%2016.087%209.15366%2015.8399C8.89557%2015.5928%208.55306%2015.4693%208.12131%2015.4693C7.68956%2015.4693%207.33016%2015.5928%207.07931%2015.8399C6.82846%2016.087%206.70304%2016.4261%206.70304%2016.8597V22.2544H2.71354V12.0804H6.70062V13.4514C6.98766%2013.0178%207.38082%2012.669%207.8777%2012.405C8.37457%2012.1409%208.95829%2012.0077%209.62883%2012.0077C10.3597%2012.0077%2011.0061%2012.1676%2011.5681%2012.4849C12.1301%2012.8047%2012.5812%2013.2504%2012.9164%2013.8293C13.2879%2013.3013%2013.7606%2012.8652%2014.3347%2012.5213C14.9088%2012.1773%2015.5431%2012.0077%2016.2378%2012.0077C17.5306%2012.0077%2018.5341%2012.3977%2019.2456%2013.1801C19.9572%2013.9626%2020.3141%2015.0211%2020.3141%2016.3559V22.2544H20.3165ZM26.0162%209.939H22.0411L26.0162%2012.2112V22.2544H22.0411V7.16296H26.0162V9.939Z'%20fill='%23FAE24B'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1449_856'%3e%3crect%20width='51'%20height='77'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
        r = e((0, v.useState)(!1), 2),
        t = r[0],
        c = r[1],
        s = g(),
        d = s.token,
        j = s.profiles,
        w = s.isLoading,
        b = s.isError,
        V = s.selectProfile,
        F = s.logout,
        P = p(),
        E = P.goToHome,
        N = P.goToCreateProfile,
        H = P.goToEditProfile,
        A = P.goToAccountInfo;
      (0, v.useEffect)(function () {
        d || E();
      }, [d, E]);
      var K = a({
          focusKey: "PROFILES-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        I = K.ref,
        M = K.focusKey,
        L = a({
          focusKey: "PROFILES-GRID",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        Z = L.ref,
        S = L.focusKey;
      return (0, v.useEffect)(function () {
        !w && j.length > 0 && setTimeout(function () {
          return i("profile-".concat(j[0].id));
        }, 300);
      }, [w, j]), (0, v.useEffect)(function () {
        var e = function (e) {
          u(e, "Back") && (e.preventDefault(), e.stopPropagation(), t ? c(!1) : E());
        };
        return window.addEventListener("keydown", e), function () {
          return window.removeEventListener("keydown", e);
        };
      }, [t, E]), (0, m.jsx)(o.Provider, {
        value: M,
        children: (0, m.jsxs)("div", {
          ref: I,
          className: h.container,
          children: [(0, m.jsx)("img", {
            src: n,
            alt: "Logo",
            className: h.logo,
            draggable: !1
          }), (0, m.jsx)("h1", {
            className: h.heading,
            children: t ? "Editar perfil" : "¿Quién está ahí?"
          }), w ? (0, m.jsx)(f, {}) : b ? (0, m.jsx)("p", {
            className: h.errorText,
            children: "Error al cargar perfiles."
          }) : (0, m.jsxs)(m.Fragment, {
            children: [(0, m.jsx)(o.Provider, {
              value: S,
              children: (0, m.jsxs)("div", {
                ref: Z,
                className: h.profilesGrid,
                children: [j.map(function (e, n) {
                  var r = n > 0 ? "profile-".concat(j[n - 1].id) : null,
                    o = n === j.length - 1 ? j.length < 4 && !t ? "profile-add" : null : "profile-".concat(j[n + 1].id);
                  return (0, m.jsx)(y, {
                    profile: e,
                    focusKey: "profile-".concat(e.id),
                    onSelect: function () {
                      return function (e) {
                        console.log("[Profiles] Selected:", e.name_perfil, e.id), V(e), E();
                      }(e);
                    },
                    editMode: t,
                    onEdit: function () {
                      return H(e.id);
                    },
                    prevFocusKey: r,
                    nextFocusKey: o
                  }, e.id);
                }), j.length < 4 && (0, m.jsx)(x, {
                  focusKey: "profile-add",
                  disabled: t,
                  onPress: N
                })]
              })
            }), (0, m.jsxs)("div", {
              className: h.bottomActions,
              children: [(0, m.jsx)(C, {
                focusKey: "profiles-edit-btn",
                variant: "secondary",
                onPress: function () {
                  return c(function (e) {
                    return !e;
                  });
                },
                onArrowPress: function (e) {
                  return "up" === e ? (i("PROFILES-GRID"), !1) : "down" !== e || (i("profiles-account-btn"), !1);
                },
                children: t ? "Listo" : "Editar perfil"
              }), (0, m.jsx)(C, {
                focusKey: "profiles-account-btn",
                variant: "secondary",
                onPress: A,
                onArrowPress: function (e) {
                  return "up" === e ? (i("profiles-edit-btn"), !1) : "down" !== e || (i("profiles-logout-btn"), !1);
                },
                children: "Información de Cuenta"
              }), (0, m.jsx)(C, {
                focusKey: "profiles-logout-btn",
                variant: "tertiary",
                onPress: function () {
                  F(), E();
                },
                onArrowPress: function (e) {
                  return "up" !== e || (i("profiles-account-btn"), !1);
                },
                children: "Cerrar sesión"
              })]
            })]
          })]
        })
      });
    }), {
      setters: [function (e) {
        t = e.$, o = e.K, i = e.X, c = e.Z, a = e.q, s = e.t;
      }, function (e) {
        l = e.a, e.i, u = e.l, f = e.n, d = e.s;
      }, function (e) {
        C = e.t;
      }, function (e) {
        p = e.r;
      }, function (e) {
        e.t;
      }, function (e) {
        g = e.n, h = e.t;
      }],
      execute: function () {
        v = t(c(), 1), m = s();
      }
    };
  });
}();