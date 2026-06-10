System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./eventStatus-legacy.js"], function (e, r) {
  var t, n, o, a, i, c, l, s, d, u, _, m, f;
  function v(e) {
    var r = new Date(e.replace(" ", "T") + "Z");
    return "".concat(r.toLocaleDateString("es-CL", {
      weekday: "short",
      day: "numeric",
      month: "long"
    }), ", ").concat(r.toLocaleTimeString("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }), " hrs");
  }
  function g(e) {
    var r,
      t,
      n = e.program,
      o = e.format,
      a = e.focusKey,
      c = e.onCardFocus,
      l = e.onArrowLeft,
      s = e.onPress,
      u = "event" === o,
      _ = u ? n : null,
      g = u ? null == _ || null === (r = _.image_land) || void 0 === r ? void 0 : r.small : null === (t = u ? null : n) || void 0 === t || null === (t = t.image_land) || void 0 === t ? void 0 : t.small,
      p = u && _ ? d(_) : null,
      h = null !== p && "Próximamente" === p.label,
      x = i({
        focusKey: a,
        onEnterPress: function () {
          return null == s ? void 0 : s();
        },
        onFocus: function () {
          return null == c ? void 0 : c();
        },
        onArrowPress: function (e) {
          return "left" !== e || !l || (l(), !1);
        }
      }),
      w = x.ref,
      b = x.focused,
      k = [m.card, m.horizontal, b && m.focused].filter(Boolean).join(" ");
    return (0, f.jsxs)("div", {
      className: m.cardWrapper,
      children: [(0, f.jsxs)("div", {
        ref: w,
        className: k,
        "data-focuskey": a,
        onClick: s,
        children: [p && (0, f.jsx)("span", {
          className: m.eventBadge,
          style: {
            backgroundColor: "var(".concat(p.colorVar, ")")
          },
          children: p.label
        }), g ? (0, f.jsx)("img", {
          src: g,
          alt: n.title,
          className: m.image,
          draggable: !1,
          decoding: "async"
        }) : (0, f.jsx)("div", {
          className: m.fallback,
          children: (0, f.jsx)("span", {
            className: m.fallbackText,
            children: n.title
          })
        })]
      }), (0, f.jsx)("span", {
        className: "".concat(m.cardTitle, " ").concat(m.cardTitleHorizontal),
        children: n.title
      }), h && _ && (0, f.jsxs)("div", {
        className: m.eventDateInfo,
        children: [(0, f.jsx)("span", {
          className: m.eventDateText,
          children: v(_.gmt0_unlocked)
        }), (0, f.jsx)("span", {
          className: m.eventDateTitle,
          children: n.title
        })]
      })]
    });
  }
  function p(e) {
    var r,
      t,
      n = e.program,
      o = e.format,
      a = e.index,
      c = e.focusKey,
      l = e.onCardFocus,
      s = e.onArrowLeft,
      u = e.onPress,
      _ = "event" === o,
      g = "ranking" === o,
      p = _ ? n : null,
      h = _ ? null == p || null === (r = p.image_port) || void 0 === r ? void 0 : r.small : null === (t = _ ? null : n) || void 0 === t || null === (t = t.image_port) || void 0 === t ? void 0 : t.small,
      x = _ && p ? d(p) : null,
      w = null !== x && "Próximamente" === x.label,
      b = i({
        focusKey: c,
        onEnterPress: function () {
          return null == u ? void 0 : u();
        },
        onFocus: function () {
          return null == l ? void 0 : l();
        },
        onArrowPress: function (e) {
          return "left" !== e || !s || (s(), !1);
        }
      }),
      k = b.ref,
      y = b.focused,
      j = [m.card, m.vertical, y && m.focused].filter(Boolean).join(" ");
    return (0, f.jsxs)("div", {
      className: m.cardWrapper,
      children: [(0, f.jsxs)("div", {
        ref: k,
        className: j,
        "data-focuskey": c,
        onClick: u,
        children: [g && null != a && (0, f.jsxs)("div", {
          className: m.rankingBadge,
          children: [(0, f.jsx)("img", {
            src: "data:image/svg+xml,%3csvg%20width='70'%20height='100'%20viewBox='0%200%2070%20100'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%200V70.2768L41.7646%2099.7211V70.2768H69.8775V0H0Z'%20fill='%23FF1376'/%3e%3c/svg%3e",
            alt: "",
            className: m.rankingIcon
          }), (0, f.jsx)("span", {
            className: m.rankingNumber,
            children: a + 1
          })]
        }), x && (0, f.jsx)("span", {
          className: m.eventBadge,
          style: {
            backgroundColor: "var(".concat(x.colorVar, ")")
          },
          children: x.label
        }), w && p && (0, f.jsx)("div", {
          className: m.eventDateOverlay,
          children: v(p.gmt0_unlocked)
        }), h ? (0, f.jsx)("img", {
          src: h,
          alt: n.title,
          className: m.image,
          draggable: !1,
          decoding: "async"
        }) : (0, f.jsx)("div", {
          className: m.fallback,
          children: (0, f.jsx)("span", {
            className: m.fallbackText,
            children: n.title
          })
        })]
      }), (0, f.jsx)("span", {
        className: "".concat(m.cardTitle, " ").concat(m.cardTitleVertical),
        children: n.title
      })]
    });
  }
  function h(e) {
    var r = e.focusKey,
      t = e.isVertical,
      n = e.onCardFocus,
      a = e.onPress,
      c = i({
        focusKey: r,
        onEnterPress: a,
        onFocus: function () {
          return n();
        }
      }),
      l = c.ref,
      s = c.focused;
    return (0, f.jsx)("div", {
      ref: l,
      className: [m.viewMore, t ? m.vertical : m.horizontal, s && m.focused].filter(Boolean).join(" "),
      "data-focuskey": r,
      onClick: a,
      onMouseEnter: function () {
        return o(r);
      },
      children: (0, f.jsxs)("span", {
        className: m.viewMoreText,
        children: ["Ver Más ", (0, f.jsx)("span", {
          className: m.viewMoreArrow,
          children: ">"
        })]
      })
    });
  }
  return e({
    i: function (e) {
      var r,
        t,
        n = Number(e.duration_seg) || (r = e.duration, 3 === (t = r.split(":").map(Number)).length ? 3600 * t[0] + 60 * t[1] + t[2] : 1),
        o = Number(e.time) || 0;
      return Math.min(100, o / n * 100);
    },
    n: function (e) {
      var r, t, n, o;
      return (null === (r = e.image_land) || void 0 === r ? void 0 : r.small) || (null === (t = e.image_land) || void 0 === t ? void 0 : t.normal) || (null === (n = e.image_land) || void 0 === n ? void 0 : n.big) || (null === (o = e.image_land) || void 0 === o ? void 0 : o.default) || e.image || "";
    },
    r: function (e) {
      var r = e.title || "";
      if (e.chapter) {
        var t = e.season ? "T".concat(e.season, " ") : "";
        r += " ".concat(t, "E").concat(e.chapter);
      }
      return r;
    },
    t: function (e) {
      var r = e.programs,
        t = e.orientation,
        a = void 0 === t ? "horizontal" : t,
        c = e.categorySlug,
        d = e.format,
        u = e.focusKeyPrefix,
        v = e.onRowFocused,
        x = e.onProgramFocused,
        w = e.onProgramPress,
        b = e.onViewMorePress,
        k = s(),
        y = k.trackRef,
        j = k.scrollToCard,
        T = "vertical" === a,
        N = i({
          focusKey: u,
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function () {
            return null == v ? void 0 : v();
          }
        }),
        z = N.ref,
        M = N.focusKey,
        C = "".concat(u, "-viewmore"),
        P = (0, _.useCallback)(function () {
          b && b();
        }, [b]);
      return (0, f.jsx)(n.Provider, {
        value: M,
        children: (0, f.jsx)("div", {
          ref: z,
          className: m.wrapper,
          children: (0, f.jsxs)("div", {
            ref: y,
            className: m.track,
            children: [r.map(function (e, r) {
              var t = "".concat(u, "-").concat(e.id),
                n = 0 === r ? function () {
                  return o(l);
                } : void 0,
                a = function () {
                  j(t), null == x || x(e);
                },
                i = function () {
                  null == w || w(e, d);
                };
              return T ? (0, f.jsx)(p, {
                program: e,
                format: d,
                index: r,
                focusKey: t,
                onCardFocus: a,
                onArrowLeft: n,
                onPress: i
              }, e.id) : (0, f.jsx)(g, {
                program: e,
                format: d,
                focusKey: t,
                onCardFocus: a,
                onArrowLeft: n,
                onPress: i
              }, e.id);
            }), c && "recomendados" !== c && (0, f.jsx)(h, {
              focusKey: C,
              isVertical: T,
              onCardFocus: function () {
                j(C), null == x || x();
              },
              onPress: P
            }), (0, f.jsx)("div", {
              className: m.endSpacer
            })]
          })
        })
      });
    }
  }), {
    setters: [function (e) {
      t = e.$, n = e.K, o = e.X, a = e.Z, i = e.q, c = e.t;
    }, function (e) {
      l = e.s;
    }, function (e) {
      s = e.n, d = e.t;
    }],
    execute: function () {
      (u = document.createElement("style")).textContent = '._cardWrapper_16cmu_6{flex-direction:column;flex-shrink:0;display:flex}._card_16cmu_6{cursor:pointer;flex-shrink:0;transition:transform .2s;position:relative;overflow:visible}._horizontal_16cmu_22{background-color:#00ad86;border-radius:32px;width:20vw;height:21vh}._vertical_16cmu_30{background-color:#00604e;border-radius:32px;width:12.5vw;height:37vh}._card_16cmu_6._focused_16cmu_38,._card_16cmu_6:hover{z-index:10;transform:scale(1.02)}._image_16cmu_45{object-fit:cover;width:100%;height:100%}._horizontal_16cmu_22 ._image_16cmu_45,._vertical_16cmu_30 ._image_16cmu_45{border-radius:32px}._card_16cmu_6:after{content:"";border-radius:inherit;pointer-events:none;z-index:15;box-sizing:border-box;border:4px solid transparent;transition:border-color .2s;position:absolute;top:0;bottom:0;left:0;right:0}._card_16cmu_6._focused_16cmu_38:after,._card_16cmu_6:hover:after{border-color:var(--foc-primary)}._fallback_16cmu_79{text-align:center;justify-content:center;align-items:center;width:100%;height:100%;padding:1rem;display:flex}._fallbackText_16cmu_89{color:#fff;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1rem;font-weight:500}._cardTitle_16cmu_97{color:#fff;text-overflow:ellipsis;white-space:nowrap;padding-top:8px;font-family:Archia,Arial,Helvetica,sans-serif;font-weight:600;overflow:hidden}._horizontal_16cmu_22+._cardTitle_16cmu_97,._cardTitleHorizontal_16cmu_108{font-size:18px}._vertical_16cmu_30+._cardTitle_16cmu_97,._cardTitleVertical_16cmu_113{margin-top:16px;font-size:1.2rem}._rankingBadge_16cmu_119{z-index:10;justify-content:center;align-items:center;width:4.5rem;height:4.5rem;display:flex;position:absolute;top:.5rem;left:0}._rankingIcon_16cmu_131{width:100%;height:100%;position:absolute;top:0;left:0}._rankingNumber_16cmu_139{color:#fff;text-align:center;margin-top:-.875rem;font-size:1.2rem;font-weight:700;position:relative}._eventBadge_16cmu_148{z-index:10;text-transform:uppercase;letter-spacing:.05em;color:#000;border-radius:6px;padding:.3rem .75rem;font-size:.75rem;font-weight:600;position:absolute;top:.5rem;left:.5rem}._eventDateInfo_16cmu_163{flex-direction:column;padding:.5rem 0;display:flex}._eventDateText_16cmu_169{text-transform:uppercase;letter-spacing:.03em;color:var(--clr-secondary-text);font-size:.75rem;font-weight:600}._eventDateTitle_16cmu_177{color:var(--clr-secondary-text);margin-top:.15rem;font-size:.75rem;font-weight:500}._eventDateOverlay_16cmu_185{z-index:10;background-color:var(--foc-primary);text-transform:uppercase;letter-spacing:.03em;color:var(--clr-primary-title);text-align:center;border-bottom-right-radius:1.5rem;border-bottom-left-radius:1.5rem;padding:.4rem .75rem;font-size:.75rem;font-weight:600;position:absolute;bottom:0;left:0;right:0}._wrapper_16cmu_207{width:100%;padding-top:6px;padding-bottom:6px;padding-left:16px;position:relative;overflow:visible}._track_16cmu_216{will-change:transform;flex-direction:row;transition:transform .3s;display:flex}._track_16cmu_216>*+*{margin-left:18px}._viewMore_16cmu_227{cursor:pointer;box-sizing:border-box;flex-shrink:0;justify-content:center;align-items:center;transition:all .3s;display:flex;position:relative;overflow:hidden}._viewMore_16cmu_227:after{content:"";border-radius:inherit;pointer-events:none;z-index:15;box-sizing:border-box;border:.3rem solid transparent;transition:border-color .3s;position:absolute;top:0;bottom:0;left:0;right:0}._viewMore_16cmu_227._horizontal_16cmu_22{background-color:#00ad86;border-radius:32px;width:20vw;height:21vh}._viewMore_16cmu_227._vertical_16cmu_30{background-color:rgba(0,0,0,.3);border-radius:32px;width:12.5vw;height:37vh}._viewMore_16cmu_227._focused_16cmu_38:after,._viewMore_16cmu_227:hover:after{border-color:var(--foc-primary)}._viewMore_16cmu_227._focused_16cmu_38,._viewMore_16cmu_227:hover{z-index:10}._viewMoreText_16cmu_275{color:#fff;align-items:center;font-family:Archia,Arial,Helvetica,sans-serif;font-size:24px;font-weight:500;display:flex}._viewMoreText_16cmu_275>*+*{margin-left:8px}._viewMoreArrow_16cmu_288{font-size:28px;font-weight:500}._endSpacer_16cmu_294{flex-shrink:0;width:5rem}\n/*$vite$:1*/', document.head.appendChild(u), _ = t(a(), 1), m = {
        cardWrapper: "_cardWrapper_16cmu_6",
        card: "_card_16cmu_6",
        horizontal: "_horizontal_16cmu_22",
        vertical: "_vertical_16cmu_30",
        focused: "_focused_16cmu_38",
        image: "_image_16cmu_45",
        fallback: "_fallback_16cmu_79",
        fallbackText: "_fallbackText_16cmu_89",
        cardTitle: "_cardTitle_16cmu_97",
        cardTitleHorizontal: "_cardTitleHorizontal_16cmu_108",
        cardTitleVertical: "_cardTitleVertical_16cmu_113",
        rankingBadge: "_rankingBadge_16cmu_119",
        rankingIcon: "_rankingIcon_16cmu_131",
        rankingNumber: "_rankingNumber_16cmu_139",
        eventBadge: "_eventBadge_16cmu_148",
        eventDateInfo: "_eventDateInfo_16cmu_163",
        eventDateText: "_eventDateText_16cmu_169",
        eventDateTitle: "_eventDateTitle_16cmu_177",
        eventDateOverlay: "_eventDateOverlay_16cmu_185",
        wrapper: "_wrapper_16cmu_207",
        track: "_track_16cmu_216",
        viewMore: "_viewMore_16cmu_227",
        viewMoreText: "_viewMoreText_16cmu_275",
        viewMoreArrow: "_viewMoreArrow_16cmu_288",
        endSpacer: "_endSpacer_16cmu_294"
      }, f = c();
    }
  };
});