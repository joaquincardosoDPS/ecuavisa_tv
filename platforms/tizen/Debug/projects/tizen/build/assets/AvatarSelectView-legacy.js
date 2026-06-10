!function () {
  function e(e, r) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, a) {
      var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != r) {
        var t,
          n,
          o,
          i,
          l = [],
          c = !0,
          s = !1;
        try {
          if (o = (r = r.call(e)).next, 0 === a) {
            if (Object(r) !== r) return;
            c = !1;
          } else for (; !(c = (t = o.call(r)).done) && (l.push(t.value), l.length !== a); c = !0);
        } catch (e) {
          s = !0, n = e;
        } finally {
          try {
            if (!c && null != r.return && (i = r.return(), Object(i) !== i)) return;
          } finally {
            if (s) throw n;
          }
        }
        return l;
      }
    }(e, r) || function (e, r) {
      if (e) {
        if ("string" == typeof e) return a(e, r);
        var t = {}.toString.call(e).slice(8, -1);
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? a(e, r) : void 0;
      }
    }(e, r) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function a(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var r = 0, t = Array(a); r < a; r++) t[r] = e[r];
    return t;
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./profileService-legacy.js", "./useProfilesNavigation-legacy.js"], function (a, r) {
    var t, n, o, i, l, c, s, u, d, v, f, _, m, h, g, p;
    function y(e) {
      var a,
        r,
        t = e.avatar,
        n = e.isSelected,
        o = e.focusKey,
        i = e.onSelect,
        l = e.onCardFocus,
        s = c({
          focusKey: o,
          onEnterPress: i,
          onFocus: function () {
            return null == l ? void 0 : l();
          }
        }),
        u = s.ref,
        d = s.focused,
        v = (null === (a = t.images) || void 0 === a ? void 0 : a.medium) || (null === (r = t.images) || void 0 === r ? void 0 : r.default) || null;
      return (0, p.jsx)("button", {
        ref: u,
        className: [g.avatarBtn, n && g.avatarBtnSelected, d && g.avatarBtnFocused].filter(Boolean).join(" "),
        onClick: i,
        "data-focuskey": o,
        children: v ? (0, p.jsx)("img", {
          src: v,
          alt: "Avatar ".concat(t.id),
          className: g.avatarImg,
          draggable: !1,
          decoding: "async"
        }) : (0, p.jsx)("span", {
          className: g.avatarFallback,
          children: "?"
        })
      });
    }
    function k(e) {
      var a = e.group,
        r = e.selectedAvatar,
        t = e.onSelectAvatar,
        n = e.focusKeyPrefix,
        i = (0, h.useRef)(null),
        l = c({
          focusKey: n,
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        s = l.ref,
        u = l.focusKey,
        d = (0, h.useCallback)(function (e) {
          var a = i.current;
          if (a) {
            var r = a.parentElement;
            if (r) {
              var t = a.querySelector('[data-focuskey="'.concat(e, '"]'));
              if (t) {
                var n = r.offsetWidth,
                  o = t.offsetLeft - n / 2 + t.offsetWidth / 2,
                  l = a.scrollWidth - n,
                  c = Math.max(0, Math.min(o, l));
                a.style.transform = "translateX(-".concat(c, "px)");
              }
            }
          }
        }, []);
      return (0, p.jsx)(o.Provider, {
        value: u,
        children: (0, p.jsxs)("div", {
          ref: s,
          children: [(0, p.jsx)("h3", {
            className: g.groupTitle,
            children: a.name
          }), (0, p.jsx)("div", {
            className: g.carouselWrapper,
            children: (0, p.jsx)("div", {
              ref: i,
              className: g.carouselTrack,
              children: a.avatars.map(function (e) {
                var a = "".concat(n, "-").concat(e.id);
                return (0, p.jsx)(y, {
                  avatar: e,
                  isSelected: r === e.id,
                  focusKey: a,
                  onSelect: function () {
                    var a,
                      r,
                      n = (null === (a = e.images) || void 0 === a ? void 0 : a.medium) || (null === (r = e.images) || void 0 === r ? void 0 : r.default) || null;
                    t(e.id, n);
                  },
                  onCardFocus: function () {
                    return d(a);
                  }
                }, e.id);
              })
            })
          })]
        })
      });
    }
    return a("default", function () {
      var a,
        r = _().goBackWithAvatar,
        t = n().state || {},
        l = e((0, h.useState)(null !== (a = t.currentAvatar) && void 0 !== a ? a : null), 2),
        s = l[0],
        m = l[1],
        y = v(function () {
          return f.getAvatars();
        }, []),
        x = y.data,
        b = y.isLoading,
        w = (null == x ? void 0 : x.data) || [],
        j = c({
          focusKey: "AVATAR-SELECT-VIEW",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        q = j.ref,
        S = j.focusKey;
      (0, h.useEffect)(function () {
        if (!b && w.length > 0) {
          var e = w[0];
          e.avatars.length > 0 && setTimeout(function () {
            return i("avatar-row-0-".concat(e.avatars[0].id));
          }, 300);
        }
      }, [b, w]);
      var A = (0, h.useCallback)(function () {
        r(t.returnTo || "/mi-latina/nuevo", s, t.currentName);
      }, [r, s, t.returnTo, t.currentName]);
      return (0, h.useEffect)(function () {
        var e = function (e) {
          u(e, "Back") && (e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), A());
        };
        return window.addEventListener("keydown", e, !0), function () {
          return window.removeEventListener("keydown", e, !0);
        };
      }, [A]), b ? (0, p.jsx)(d, {}) : (0, p.jsx)(o.Provider, {
        value: S,
        children: (0, p.jsxs)("div", {
          ref: q,
          className: g.container,
          children: [(0, p.jsx)("h1", {
            className: g.title,
            children: "Elegir avatar"
          }), (0, p.jsx)("div", {
            className: g.avatarsScroll,
            children: w.map(function (e, a) {
              return (0, p.jsx)(k, {
                group: e,
                selectedAvatar: s,
                onSelectAvatar: function (e, a) {
                  m(e), r(t.returnTo || "/mi-latina/nuevo", e, t.currentName, a);
                },
                focusKeyPrefix: "avatar-row-".concat(a)
              }, e.name);
            })
          })]
        })
      });
    }), {
      setters: [function (e) {
        t = e.$, n = e.H, o = e.K, i = e.X, l = e.Z, c = e.q, s = e.t;
      }, function (e) {
        u = e.l, d = e.n, v = e.t;
      }, function (e) {
        f = e.t;
      }, function (e) {
        _ = e.t;
      }],
      execute: function () {
        (m = document.createElement("style")).textContent = "._container_5k5qo_1{background:var(--clr-primary);flex-direction:column;justify-content:center;align-items:center;width:100%;height:100vh;padding:3vh 4vw;display:flex;overflow:hidden}._title_5k5qo_13{color:var(--clr-primary-title);text-align:center;flex-shrink:0;margin:15vh 0 3vh;font-size:2.2vw;font-weight:700}._avatarsScroll_5k5qo_23{scrollbar-width:none;flex-direction:column;flex:1;padding:4px;display:flex;overflow-x:hidden;overflow-y:auto}._avatarsScroll_5k5qo_23>div+div{margin-top:2.5vh}._avatarsScroll_5k5qo_23::-webkit-scrollbar{display:none}._groupTitle_5k5qo_41{color:var(--clr-primary-text);opacity:.7;text-align:center;margin:0 0 2vh;font-size:1vw;font-weight:500}._carouselWrapper_5k5qo_50{width:80%;margin:-8px auto;padding:8px;overflow:hidden}._carouselTrack_5k5qo_57{will-change:transform;flex-wrap:nowrap;transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex}._carouselTrack_5k5qo_57>button+button{margin-left:1vw}._avatarBtn_5k5qo_68{cursor:pointer;background:rgba(255,255,255,.1);border:3px solid transparent;border-radius:50%;outline:none;flex-shrink:0;justify-content:center;align-items:center;width:7vw;height:7vw;padding:0;transition:border-color .2s,transform .2s;display:flex;overflow:hidden}._avatarBtnSelected_5k5qo_85{border-color:var(--foc-primary);transform:scale(1.08)}._avatarBtnFocused_5k5qo_90,._avatarBtn_5k5qo_68:hover{border-color:var(--foc-primary);transform:scale(1.08);box-shadow:0 0 12px rgba(255,19,118,.3)}._avatarImg_5k5qo_97{object-fit:cover;width:100%;height:100%}._avatarFallback_5k5qo_103{color:var(--clr-secondary-text);font-size:2vw}\n/*$vite$:1*/", document.head.appendChild(m), h = t(l(), 1), g = {
          container: "_container_5k5qo_1",
          title: "_title_5k5qo_13",
          avatarsScroll: "_avatarsScroll_5k5qo_23",
          groupTitle: "_groupTitle_5k5qo_41",
          carouselWrapper: "_carouselWrapper_5k5qo_50",
          carouselTrack: "_carouselTrack_5k5qo_57",
          avatarBtn: "_avatarBtn_5k5qo_68",
          avatarBtnSelected: "_avatarBtnSelected_5k5qo_85",
          avatarBtnFocused: "_avatarBtnFocused_5k5qo_90",
          avatarImg: "_avatarImg_5k5qo_97",
          avatarFallback: "_avatarFallback_5k5qo_103"
        }, p = s();
      }
    };
  });
}();