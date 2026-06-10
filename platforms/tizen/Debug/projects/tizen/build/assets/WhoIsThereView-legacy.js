!function () {
  function e(e, n) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, r) {
      var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != n) {
        var t,
          i,
          o,
          a,
          c = [],
          s = !0,
          l = !1;
        try {
          if (o = (n = n.call(e)).next, 0 === r) {
            if (Object(n) !== n) return;
            s = !1;
          } else for (; !(s = (t = o.call(n)).done) && (c.push(t.value), c.length !== r); s = !0);
        } catch (e) {
          l = !0, i = e;
        } finally {
          try {
            if (!s && null != n.return && (a = n.return(), Object(a) !== a)) return;
          } finally {
            if (l) throw i;
          }
        }
        return c;
      }
    }(e, n) || function (e, n) {
      if (e) {
        if ("string" == typeof e) return r(e, n);
        var t = {}.toString.call(e).slice(8, -1);
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? r(e, n) : void 0;
      }
    }(e, n) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function r(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var n = 0, t = Array(r); n < r; n++) t[n] = e[n];
    return t;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./Button-legacy.js", "./useProfilesNavigation-legacy.js", "./iconos-edit-legacy.js", "./ProfilesView.module-legacy.js"], function (r, n) {
    var t, i, o, a, c, s, l, u, d, f, h, C, p, g, v;
    function m(e) {
      var r = e.profile,
        n = e.focusKey,
        t = e.onSelect,
        i = e.editMode,
        a = e.onEdit,
        s = e.prevFocusKey,
        l = e.nextFocusKey,
        u = function () {
          i ? a() : t();
        },
        d = c({
          focusKey: n,
          onEnterPress: u,
          onArrowPress: function (e) {
            return "down" === e ? (o("whoisthere-edit-btn"), !1) : "left" === e ? (s && o(s), !1) : "right" !== e || !l || (o(l), !1);
          }
        }),
        f = d.ref,
        h = d.focused;
      (0, g.useEffect)(function () {
        h && f.current && f.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, [h, f]);
      var C = function (e) {
        var r, n;
        return Array.isArray(e.images) ? null : (null === (r = e.images) || void 0 === r ? void 0 : r.medium) || (null === (n = e.images) || void 0 === n ? void 0 : n.default) || null;
      }(r);
      return (0, v.jsxs)("button", {
        ref: f,
        className: p.profileCard,
        onClick: u,
        children: [(0, v.jsxs)("div", {
          className: "".concat(p.avatarWrapper, " ").concat(h ? p.avatarWrapperFocused : ""),
          children: [C ? (0, v.jsx)("img", {
            src: C,
            alt: r.name_perfil,
            className: p.avatarImg,
            draggable: !1,
            decoding: "async"
          }) : (0, v.jsx)("span", {
            className: p.avatarInitial,
            children: r.name_perfil.charAt(0).toUpperCase()
          }), i && (0, v.jsx)("div", {
            className: "".concat(p.editBadge, " ").concat(h ? p.editBadgeFocused : ""),
            children: (0, v.jsx)("img", {
              src: "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%203.96483C0.105263%203.67009%200.161404%203.34728%200.31579%203.0736C0.77193%202.2736%201.4807%201.86658%202.4%201.85956C3.78246%201.85255%205.16491%201.85956%206.54737%201.85956C6.87018%201.85956%207.08772%202.05606%207.08772%202.32974C7.08772%202.61044%206.86316%202.80693%206.53333%202.80693C5.17895%202.80693%203.81754%202.80693%202.46316%202.80693C1.72632%202.80693%201.18597%203.20693%201.00351%203.90167C0.968421%204.04202%200.954386%204.19641%200.954386%204.34377C0.954386%208.40693%200.954386%2012.4771%200.954386%2016.5403C0.954386%2017.3052%201.33333%2017.8385%202.01404%2018.021C2.16842%2018.0631%202.32983%2018.0771%202.49123%2018.0771C6.87719%2018.0771%2011.2561%2018.0771%2015.6421%2018.0771C16.5754%2018.0771%2017.1789%2017.4666%2017.1789%2016.5262C17.1789%2015.1718%2017.1789%2013.8245%2017.1789%2012.4701C17.1789%2012.1964%2017.3193%2011.9999%2017.5439%2011.9508C17.8316%2011.8876%2018.1123%2012.0982%2018.1263%2012.3999C18.1333%2012.7789%2018.1263%2013.1578%2018.1263%2013.5368C18.1263%2014.6104%2018.1404%2015.6911%2018.1193%2016.7648C18.0912%2017.9578%2017.0807%2018.9543%2015.8877%2019.0104C15.8035%2019.0104%2015.7123%2019.0104%2015.6281%2019.0175C11.2491%2019.0175%206.87719%2019.0175%202.49825%2019.0175C1.53684%2019.0175%200.792983%2018.6315%200.31579%2017.8034C0.161404%2017.5368%200.105263%2017.2139%200%2016.9122C0%2012.5894%200%208.26658%200%203.95079V3.96483Z'%20fill='black'/%3e%3cpath%20d='M16.442%200C16.9754%200.00701754%2017.4525%200.182455%2017.8596%200.554385C18.0771%200.757894%2018.2876%200.96842%2018.4982%201.18596C19.3333%202.04912%2019.3473%203.29824%2018.5403%204.18246C18.4911%204.2386%2018.435%204.28772%2018.3859%204.34386C15.642%207.08772%2012.8911%209.83859%2010.1473%2012.5895C9.9929%2012.7439%209.82448%2012.8421%209.60693%2012.8982C8.36483%2013.2351%207.12974%2013.586%205.88764%2013.9298C5.71922%2013.9789%205.55781%2014.007%205.40343%2013.9158C5.20693%2013.8035%205.12272%2013.593%205.1929%2013.3333C5.48764%2012.2667%205.81044%2011.207%206.06307%2010.1333C6.21746%209.48772%206.52623%208.99649%206.99641%208.53333C9.62097%205.94386%2012.2175%203.33333%2014.821%200.722806C15.2701%200.273683%2015.7894%200.0140339%2016.442%200.00701637V0ZM14.421%202.54737C12.1192%204.84912%209.81044%207.15789%207.51571%209.45263C8.23851%2010.1754%208.97536%2010.9123%209.68413%2011.621C11.9859%209.3193%2014.2947%207.01053%2016.5894%204.71579C15.8666%204%2015.1297%203.25614%2014.421%202.54737ZM15.0806%201.76842C15.8525%202.54035%2016.5964%203.28421%2017.3473%204.0421C17.5438%203.83158%2017.7613%203.62807%2017.9438%203.39649C18.2525%203.01052%2018.2525%202.38596%2017.9368%202.00702C17.6911%201.7193%2017.4245%201.44561%2017.1368%201.20702C16.7718%200.905263%2016.3227%200.85614%2015.9157%201.09474C15.6069%201.27719%2015.3473%201.55088%2015.0806%201.76842ZM6.99641%2010.3649C6.77185%2011.1719%206.54728%2011.9789%206.31571%2012.814C7.15079%2012.5825%207.95781%2012.3579%208.76483%2012.1333C8.16834%2011.5368%207.58588%2010.9544%206.99641%2010.3579V10.3649Z'%20fill='black'/%3e%3c/svg%3e",
              alt: "Editar",
              className: p.editBadgeIcon
            })
          })]
        }), (0, v.jsx)("span", {
          className: "".concat(p.profileName, " ").concat(h ? p.profileNameFocused : ""),
          children: r.name_perfil
        })]
      });
    }
    function w(e) {
      var r = e.focusKey,
        n = e.disabled,
        t = e.onPress,
        i = function () {
          n || null == t || t();
        },
        a = c({
          focusKey: r,
          onEnterPress: i,
          focusable: !n,
          onArrowPress: function (e) {
            return "down" !== e || (o("whoisthere-edit-btn"), !1);
          }
        }),
        s = a.ref,
        l = a.focused;
      return (0, v.jsxs)("button", {
        ref: s,
        className: p.profileCard,
        onClick: i,
        children: [(0, v.jsx)("div", {
          className: "".concat(p.avatarWrapper, " ").concat(l ? p.avatarWrapperFocused : ""),
          children: (0, v.jsx)("span", {
            className: "".concat(p.addIcon, " ").concat(l ? p.addIconFocused : ""),
            children: "+"
          })
        }), (0, v.jsx)("span", {
          className: "".concat(p.profileName, " ").concat(l ? p.profileNameFocused : ""),
          children: "Agregar perfil"
        })]
      });
    }
    return r("default", function () {
      var r = l(function (e) {
          var r;
          return null === (r = e.config) || void 0 === r ? void 0 : r.logo;
        }) || "data:image/svg+xml,%3csvg%20width='51'%20height='77'%20viewBox='0%200%2051%2077'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1449_856)'%3e%3cpath%20d='M51.0001%2035.2505H22.2632V40.9285H51.0001V35.2505Z'%20fill='%23FF1376'/%3e%3cpath%20d='M36.6268%2077C44.5503%2077%2050.9952%2070.5275%2050.9952%2062.57V60.6611H45.3414V62.57C45.3414%2067.3953%2041.4315%2071.322%2036.6268%2071.322C31.822%2071.322%2027.9121%2067.3953%2027.9121%2062.57V60.6611H22.2583V62.57C22.2583%2070.5275%2028.7033%2077%2036.6268%2077Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9954%2048.1399H39.4346V53.8179H50.9954V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M33.824%2048.1399H22.2632V53.8179H33.824V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9931%2040.9261V35.2504L33.8242%2022.2544V28.7028L49.9776%2040.9261H50.9931Z'%20fill='%23FF1376'/%3e%3cpath%20d='M0%200V28.8505L17.1713%2040.9381V28.8505H28.7297V0H0ZM20.3165%2022.2544H16.3463V16.8597C16.3463%2016.4261%2016.2185%2016.087%2015.9604%2015.8399C15.7023%2015.5928%2015.3574%2015.4693%2014.9281%2015.4693C14.4987%2015.4693%2014.1369%2015.5928%2013.8861%2015.8399C13.6352%2016.087%2013.5098%2016.4261%2013.5098%2016.8597V22.2544H9.53959V16.8597C9.53959%2016.4261%209.41175%2016.087%209.15366%2015.8399C8.89557%2015.5928%208.55306%2015.4693%208.12131%2015.4693C7.68956%2015.4693%207.33016%2015.5928%207.07931%2015.8399C6.82846%2016.087%206.70304%2016.4261%206.70304%2016.8597V22.2544H2.71354V12.0804H6.70062V13.4514C6.98766%2013.0178%207.38082%2012.669%207.8777%2012.405C8.37457%2012.1409%208.95829%2012.0077%209.62883%2012.0077C10.3597%2012.0077%2011.0061%2012.1676%2011.5681%2012.4849C12.1301%2012.8047%2012.5812%2013.2504%2012.9164%2013.8293C13.2879%2013.3013%2013.7606%2012.8652%2014.3347%2012.5213C14.9088%2012.1773%2015.5431%2012.0077%2016.2378%2012.0077C17.5306%2012.0077%2018.5341%2012.3977%2019.2456%2013.1801C19.9572%2013.9626%2020.3141%2015.0211%2020.3141%2016.3559V22.2544H20.3165ZM26.0162%209.939H22.0411L26.0162%2012.2112V22.2544H22.0411V7.16296H26.0162V9.939Z'%20fill='%23FAE24B'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1449_856'%3e%3crect%20width='51'%20height='77'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
        n = e((0, g.useState)(!1), 2),
        t = n[0],
        a = n[1],
        s = C(),
        y = s.token,
        x = s.profiles,
        j = s.isLoading,
        V = s.isError,
        b = s.selectProfile,
        E = s.logout,
        H = h(),
        F = H.goToLogin,
        N = H.goToLive,
        P = H.goToCreateProfile,
        I = H.goToEditProfile;
      (0, g.useEffect)(function () {
        y || F();
      }, [y, F]);
      var A = c({
          focusKey: "WHOISTHERE-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        K = A.ref,
        M = A.focusKey,
        S = c({
          focusKey: "WHOISTHERE-GRID",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        Z = S.ref,
        L = S.focusKey;
      return (0, g.useEffect)(function () {
        !j && x.length > 0 && setTimeout(function () {
          return o("whoisthere-profile-".concat(x[0].id));
        }, 300);
      }, [j, x]), (0, g.useEffect)(function () {
        var e = function (e) {
          if (u(e, "Back")) if (e.preventDefault(), e.stopPropagation(), t) a(!1);else try {
            void 0 !== window.tizen && window.tizen.application.getCurrentApplication().exit(), void 0 !== window.webOS && window.close();
          } catch (r) {}
        };
        return window.addEventListener("keydown", e), function () {
          return window.removeEventListener("keydown", e);
        };
      }, [t]), (0, v.jsx)(i.Provider, {
        value: M,
        children: (0, v.jsxs)("div", {
          ref: K,
          className: p.container,
          children: [(0, v.jsx)("img", {
            src: r,
            alt: "Logo",
            className: p.logo,
            draggable: !1
          }), (0, v.jsx)("h1", {
            className: p.heading,
            children: t ? "Editar perfil" : "¿Quién está ahí?"
          }), j ? (0, v.jsx)(d, {}) : V ? (0, v.jsx)("p", {
            className: p.errorText,
            children: "Error al cargar perfiles."
          }) : (0, v.jsxs)(v.Fragment, {
            children: [(0, v.jsx)(i.Provider, {
              value: L,
              children: (0, v.jsxs)("div", {
                ref: Z,
                className: p.profilesGrid,
                children: [x.map(function (e, r) {
                  var n = r > 0 ? "whoisthere-profile-".concat(x[r - 1].id) : null,
                    i = r === x.length - 1 ? x.length < 4 && !t ? "whoisthere-profile-add" : null : "whoisthere-profile-".concat(x[r + 1].id);
                  return (0, v.jsx)(m, {
                    profile: e,
                    focusKey: "whoisthere-profile-".concat(e.id),
                    onSelect: function () {
                      return function (e) {
                        console.log("[WhoIsThere] Selected:", e.name_perfil, e.id), b(e), N();
                      }(e);
                    },
                    editMode: t,
                    onEdit: function () {
                      return I(e.id);
                    },
                    prevFocusKey: n,
                    nextFocusKey: i
                  }, e.id);
                }), x.length < 4 && (0, v.jsx)(w, {
                  focusKey: "whoisthere-profile-add",
                  disabled: t,
                  onPress: P
                })]
              })
            }), (0, v.jsxs)("div", {
              className: p.bottomActions,
              children: [(0, v.jsx)(f, {
                focusKey: "whoisthere-edit-btn",
                variant: "secondary",
                onPress: function () {
                  return a(function (e) {
                    return !e;
                  });
                },
                onArrowPress: function (e) {
                  return "up" !== e || (o("WHOISTHERE-GRID"), !1);
                },
                children: t ? "Listo" : "Editar perfil"
              }), (0, v.jsx)(f, {
                focusKey: "whoisthere-logout-btn",
                variant: "tertiary",
                onPress: function () {
                  E(), F();
                },
                onArrowPress: function (e) {
                  return "up" !== e || (o("WHOISTHERE-GRID"), !1);
                },
                children: "Cerrar sesión"
              })]
            })]
          })]
        })
      });
    }), {
      setters: [function (e) {
        t = e.$, i = e.K, o = e.X, a = e.Z, c = e.q, s = e.t;
      }, function (e) {
        l = e.a, e.i, u = e.l, d = e.n;
      }, function (e) {
        f = e.t;
      }, function (e) {
        h = e.i;
      }, function (e) {
        e.t;
      }, function (e) {
        C = e.n, p = e.t;
      }],
      execute: function () {
        g = t(a(), 1), v = s();
      }
    };
  });
}();