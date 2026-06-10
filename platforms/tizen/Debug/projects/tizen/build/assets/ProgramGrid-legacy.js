System.register(["./jsx-runtime-legacy.js", "./Button-legacy.js"], function (e, t) {
  var r, a, o, i, n, l, s, c, d, _, f;
  function u(e) {
    var t,
      r = e.program,
      a = e.focusKey,
      o = e.onCardFocus,
      n = e.onPress,
      l = null == r || null === (t = r.image_land) || void 0 === t ? void 0 : t.small,
      s = function () {
        null == n || n(r.key);
      },
      c = i({
        focusKey: a,
        onEnterPress: s,
        onFocus: function () {
          return null == o ? void 0 : o();
        }
      }),
      f = c.ref,
      u = c.focused;
    return (0, _.jsx)("div", {
      ref: f,
      className: [d.card, d.alternative, u && d.focused].filter(Boolean).join(" "),
      "data-focuskey": a,
      onClick: s,
      children: (0, _.jsx)("div", {
        className: d.ratioBox,
        children: l ? (0, _.jsx)("img", {
          src: l,
          alt: r.title,
          className: d.image,
          draggable: !1,
          decoding: "async"
        }) : (0, _.jsx)("div", {
          className: d.fallback,
          children: (0, _.jsx)("span", {
            className: d.fallbackText,
            children: r.title
          })
        })
      })
    });
  }
  return e("t", function (e) {
    var t = e.programs,
      r = e.isLoading,
      o = void 0 !== r && r,
      n = e.isError,
      s = void 0 !== n && n,
      d = e.loadingText,
      v = void 0 === d ? "Cargando..." : d,
      p = e.errorText,
      g = void 0 === p ? "Error al cargar" : p,
      h = e.focusKeyPrefix,
      x = void 0 === h ? "GRID" : h,
      m = e.onRowFocused,
      j = e.hasMore,
      b = void 0 !== j && j,
      y = e.isLoadingMore,
      w = void 0 !== y && y,
      z = e.onLoadMore,
      k = e.onProgramPress,
      T = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.direction,
          r = void 0 === t ? "vertical" : t,
          a = e.enableWheel,
          o = void 0 !== a && a,
          i = (0, c.useRef)(null),
          n = (0, c.useRef)(0),
          l = "horizontal" === r,
          s = (0, c.useCallback)(function (e) {
            var t = i.current;
            if (t) {
              var r = t.parentElement;
              if (r) {
                var a = l ? r.offsetWidth : r.offsetHeight,
                  o = l ? t.scrollWidth : t.scrollHeight,
                  s = Math.max(0, o - a),
                  c = Math.max(0, Math.min(e, s));
                n.current = c, t.style.transform = l ? "translateX(-".concat(c, "px)") : "translateY(-".concat(c, "px)");
              }
            }
          }, [l]),
          d = (0, c.useCallback)(function (e) {
            var t = i.current;
            if (t) {
              var r = t.parentElement;
              if (r) {
                var a = t.querySelector('[data-focuskey="'.concat(e, '"]'));
                if (a) {
                  var o = l ? r.offsetWidth : r.offsetHeight,
                    n = l ? a.offsetLeft : a.offsetTop,
                    c = l ? a.offsetWidth : a.offsetHeight;
                  s(n - o / 2 + c / 2);
                }
              }
            }
          }, [l, s]);
        return (0, c.useEffect)(function () {
          var e;
          if (o) {
            var t = null === (e = i.current) || void 0 === e ? void 0 : e.parentElement;
            if (t) {
              var r = function (e) {
                e.preventDefault();
                var t = l && e.deltaX || e.deltaY;
                s(n.current + t);
              };
              return t.addEventListener("wheel", r, {
                passive: !1
              }), function () {
                return t.removeEventListener("wheel", r);
              };
            }
          }
        }, [s, o, l]), {
          trackRef: i,
          applyScroll: s,
          scrollToChild: d,
          currentOffset: n
        };
      }({
        direction: "vertical",
        enableWheel: !0
      }),
      B = T.trackRef,
      C = T.scrollToChild,
      D = i({
        focusKey: x,
        saveLastFocusedChild: !0,
        trackChildren: !0,
        isFocusBoundary: !1,
        onFocus: function () {
          return null == m ? void 0 : m();
        }
      }),
      N = D.ref,
      W = D.focusKey;
    if (o) return (0, _.jsx)("p", {
      className: f.statusText,
      children: v
    });
    if (s) return (0, _.jsx)("p", {
      className: f.errorText,
      children: g
    });
    if (0 === t.length) return null;
    var E = "".concat(x, "-loadmore");
    return (0, _.jsx)(a.Provider, {
      value: W,
      children: (0, _.jsx)("div", {
        ref: N,
        className: f.gridOuter,
        children: (0, _.jsxs)("div", {
          ref: B,
          className: f.grid,
          children: [t.map(function (e) {
            var t = e,
              r = "".concat(x, "-").concat(t.id);
            return (0, _.jsx)(u, {
              program: t,
              focusKey: r,
              onCardFocus: function () {
                return C(r);
              },
              onPress: k
            }, t.id);
          }), b && z && (0, _.jsx)("div", {
            className: f.loadMoreWrapper,
            children: (0, _.jsx)(l, {
              focusKey: E,
              variant: "secondary",
              onPress: z,
              onFocused: function () {
                return C(E);
              },
              children: w ? "Cargando..." : "Cargar más"
            })
          })]
        })
      })
    });
  }), {
    setters: [function (e) {
      r = e.$, a = e.K, o = e.Z, i = e.q, n = e.t;
    }, function (e) {
      l = e.t;
    }],
    execute: function () {
      (s = document.createElement("style")).textContent = '._card_3j3t0_2{cursor:pointer;backface-visibility:hidden;will-change:transform;background-color:#0a0a0a;border:3px solid transparent;flex-shrink:0;transition:transform .2s,border-color .2s;position:relative;overflow:hidden;transform:translateZ(0)}._card_3j3t0_2._focused_3j3t0_16,._card_3j3t0_2:hover{z-index:10;border-color:var(--foc-primary);transform:scale(1.02);box-shadow:0 0 20px rgba(255,19,118,.3)}._card_3j3t0_2._alternative_3j3t0_25._focused_3j3t0_16,._card_3j3t0_2._alternative_3j3t0_25:hover{box-shadow:none;border-color:transparent}._horizontal_3j3t0_32{border-radius:8px;width:22vw;height:12.375vw}._vertical_3j3t0_39{border-radius:12px;width:15vw;height:26.67vw}._alternative_3j3t0_25{background-color:#00ad86;border:none;border-radius:32px;width:100%;overflow:visible}._ratioBox_3j3t0_55{backface-visibility:hidden;border-radius:28px;width:100%;height:0;padding-top:56.25%;position:relative;overflow:hidden;transform:translateZ(0)}._ratioBox_3j3t0_55 ._image_3j3t0_66,._ratioBox_3j3t0_55 ._fallback_3j3t0_67{width:100%;height:100%;position:absolute;top:0;left:0}._ratioBox_3j3t0_55:after{content:"";border-radius:inherit;pointer-events:none;z-index:15;box-sizing:border-box;border:4px solid transparent;transition:border-color .2s;position:absolute;top:0;bottom:0;left:0;right:0}._alternative_3j3t0_25._focused_3j3t0_16 ._ratioBox_3j3t0_55:after,._alternative_3j3t0_25:hover ._ratioBox_3j3t0_55:after{border-color:var(--foc-primary)}._cardTitle_3j3t0_95{color:#fff;text-overflow:ellipsis;white-space:nowrap;padding-top:8px;font-family:Archia,Arial,Helvetica,sans-serif;font-size:18px;font-weight:600;overflow:hidden}._image_3j3t0_66{object-fit:cover;width:100%;height:100%}._fallback_3j3t0_67{text-align:center;background-color:#1a1a1a;justify-content:center;align-items:center;width:100%;height:100%;padding:1rem;display:flex}._fallbackText_3j3t0_125{color:#fff;font-size:var(--font-size-subtext);font-weight:500}._rankingBadge_3j3t0_132{z-index:10;justify-content:center;align-items:center;width:4.5rem;height:4.5rem;display:flex;position:absolute;top:.5rem;left:0}._rankingIcon_3j3t0_144{width:100%;height:100%;position:absolute;top:0;left:0}._rankingNumber_3j3t0_152{color:#fff;font-weight:700;font-size:var(--font-size-label);text-align:center;margin-top:-.875rem;position:relative}._eventBadge_3j3t0_161{z-index:10;font-size:var(--font-size-caption);text-transform:uppercase;letter-spacing:.05em;color:#000;border-radius:4px;padding:.25rem .75rem;font-weight:600;position:absolute;top:0;left:0}._cardWrapper_3j3t0_176{flex-direction:column;flex-shrink:0;display:flex}._eventDateInfo_3j3t0_183{flex-direction:column;padding:.5rem 0;display:flex}._eventDateText_3j3t0_189{font-size:var(--font-size-caption);text-transform:uppercase;letter-spacing:.03em;color:var(--clr-secondary-text);font-weight:600}._eventDateTitle_3j3t0_197{font-size:var(--font-size-caption);color:var(--clr-secondary-text);margin-top:.15rem;font-weight:500}._eventDateOverlay_3j3t0_205{z-index:10;background-color:var(--foc-primary);text-transform:uppercase;letter-spacing:.03em;color:var(--clr-primary-title);text-align:center;padding:.4rem .75rem;font-size:.75rem;font-weight:600;position:absolute;bottom:0;left:0;right:0}._gridOuter_8czue_1{width:100%;height:100%;margin:-8px;padding:8px;position:relative;overflow:hidden}._grid_8czue_1{will-change:transform;flex-wrap:wrap;align-content:flex-start;align-items:flex-start;padding-bottom:12px;transition:transform .3s cubic-bezier(.4,0,.2,1);display:flex}._grid_8czue_1>*{flex:0 0 23%;margin:1%}._loadMoreWrapper_8czue_28{flex:0 0 98%;justify-content:center;align-items:center;margin:1%;padding:.5rem 0;display:flex}._statusText_8czue_37{color:#fff;font-size:var(--font-size-caption);opacity:.7;font-weight:500}._errorText_8czue_44{color:#ef4444;font-size:var(--font-size-caption);font-weight:500}\n/*$vite$:1*/', document.head.appendChild(s), c = r(o(), 1), d = {
        card: "_card_3j3t0_2",
        focused: "_focused_3j3t0_16",
        alternative: "_alternative_3j3t0_25",
        horizontal: "_horizontal_3j3t0_32",
        vertical: "_vertical_3j3t0_39",
        ratioBox: "_ratioBox_3j3t0_55",
        image: "_image_3j3t0_66",
        fallback: "_fallback_3j3t0_67",
        cardTitle: "_cardTitle_3j3t0_95",
        fallbackText: "_fallbackText_3j3t0_125",
        rankingBadge: "_rankingBadge_3j3t0_132",
        rankingIcon: "_rankingIcon_3j3t0_144",
        rankingNumber: "_rankingNumber_3j3t0_152",
        eventBadge: "_eventBadge_3j3t0_161",
        cardWrapper: "_cardWrapper_3j3t0_176",
        eventDateInfo: "_eventDateInfo_3j3t0_183",
        eventDateText: "_eventDateText_3j3t0_189",
        eventDateTitle: "_eventDateTitle_3j3t0_197",
        eventDateOverlay: "_eventDateOverlay_3j3t0_205"
      }, _ = n(), f = {
        gridOuter: "_gridOuter_8czue_1",
        grid: "_grid_8czue_1",
        loadMoreWrapper: "_loadMoreWrapper_8czue_28",
        statusText: "_statusText_8czue_37",
        errorText: "_errorText_8czue_44"
      };
    }
  };
});