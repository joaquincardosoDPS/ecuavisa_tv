!function () {
  function e(e, o) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, r) {
      var o = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != o) {
        var n,
          t,
          i,
          a,
          s = [],
          c = !0,
          l = !1;
        try {
          if (i = (o = o.call(e)).next, 0 === r) {
            if (Object(o) !== o) return;
            c = !1;
          } else for (; !(c = (n = i.call(o)).done) && (s.push(n.value), s.length !== r); c = !0);
        } catch (e) {
          l = !0, t = e;
        } finally {
          try {
            if (!c && null != o.return && (a = o.return(), Object(a) !== a)) return;
          } finally {
            if (l) throw t;
          }
        }
        return s;
      }
    }(e, o) || function (e, o) {
      if (e) {
        if ("string" == typeof e) return r(e, o);
        var n = {}.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, o) : void 0;
      }
    }(e, o) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function r(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var o = 0, n = Array(r); o < r; o++) n[o] = e[o];
    return n;
  }
  function o(e) {
    return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, o(e);
  }
  System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./catalogService-legacy.js", "./usePageScroll-legacy.js", "./eventStatus-legacy.js", "./historyService-legacy.js", "./HomeCardCarrousel-legacy.js"], function (r, n) {
    var t, i, a, s, c, l, d, _, f, u, p, g, m, h, x, v, y, w, b, j, z, k, N, T, C, B, P, S, A, I, F;
    function W(e) {
      var r,
        n,
        t = e.program,
        i = e.onPlayFocused,
        a = e.onSlideNext,
        c = e.onSlidePrev,
        d = e.isFirstSlide,
        _ = e.onPress,
        f = l({
          focusKey: "BANNER-PLAY",
          onEnterPress: function () {
            return null == _ ? void 0 : _();
          },
          onFocus: function () {
            return null == i ? void 0 : i();
          },
          onArrowPress: function (e) {
            return "left" === e ? (c ? c() : d && s(p), !1) : "right" === e ? (a && a(), !1) : "up" !== e;
          }
        }),
        u = f.ref,
        g = f.focused;
      if (!t) return null;
      var m = null === (r = t.genders) || void 0 === r ? void 0 : r.map(function (e) {
        return e.name;
      }).join(", ");
      return (0, B.jsxs)(B.Fragment, {
        children: [(0, B.jsx)("div", {
          className: C.logoWrapper,
          children: null !== (n = t.image_logo) && void 0 !== n && n.medium ? (0, B.jsx)("img", {
            src: t.image_logo.medium,
            alt: t.title,
            className: C.logo
          }) : (0, B.jsx)("h2", {
            className: C.fallbackTitle,
            children: t.title
          })
        }), (0, B.jsxs)("div", {
          className: C.descriptionBlock,
          children: [(0, B.jsx)("p", {
            className: C.description,
            children: t.description_short
          }), (0, B.jsxs)("div", {
            className: C.metaRow,
            children: [t.classification && (0, B.jsx)("span", {
              className: C.classificationBadge,
              children: "object" === o(t.classification) ? t.classification.name : t.classification
            }), t.anio_production && (0, B.jsx)("span", {
              children: t.anio_production
            }), m && (0, B.jsxs)(B.Fragment, {
              children: [(0, B.jsx)("span", {
                className: C.metaSeparator,
                children: "|"
              }), (0, B.jsx)("span", {
                className: C.genres,
                children: m
              })]
            })]
          })]
        }), (0, B.jsx)("button", {
          ref: u,
          type: "button",
          className: "".concat(C.playButton, " ").concat(g ? C.focused : ""),
          onClick: _,
          children: (0, B.jsxs)("span", {
            className: C.playButtonContent,
            children: [(0, B.jsx)("img", {
              src: T,
              alt: "",
              className: C.playIcon
            }), (0, B.jsx)("span", {
              className: C.playText,
              children: "Ver ahora"
            })]
          })
        })]
      });
    }
    function L(r) {
      var o,
        n,
        t = r.slider,
        i = r.onPlayFocused,
        a = r.onProgramPress,
        s = e((0, k.useState)(0), 2),
        c = s[0],
        l = s[1];
      if (!t || 0 === t.length) return null;
      var d = t[c] || t[0],
        _ = t.length,
        f = 0 === c,
        u = c === _ - 1,
        p = (0, k.useCallback)(function () {
          l(function (e) {
            return Math.min(e + 1, _ - 1);
          });
        }, [_]),
        g = (0, k.useCallback)(function () {
          l(function (e) {
            return Math.max(e - 1, 0);
          });
        }, []);
      return (0, B.jsxs)("div", {
        className: P.wrapper,
        children: [(0, B.jsx)("div", {
          className: P.bgImageWrapper,
          children: (0, B.jsx)("img", {
            src: (null === (o = d.image_slider) || void 0 === o ? void 0 : o.big) || (null === (n = d.image_land) || void 0 === n ? void 0 : n.default),
            alt: d.title,
            className: P.bgImage,
            decoding: "async"
          }, d.id)
        }), (0, B.jsx)("div", {
          className: P.overlay
        }), (0, B.jsx)("div", {
          className: P.content,
          children: (0, B.jsx)(W, {
            program: d,
            onPlayFocused: i,
            onSlideNext: u ? void 0 : p,
            onSlidePrev: f ? void 0 : g,
            isFirstSlide: f,
            onPress: function () {
              return null == a ? void 0 : a(d);
            }
          })
        }), _ > 1 && (0, B.jsxs)(B.Fragment, {
          children: [(0, B.jsx)("button", {
            className: P.arrowBtn + " " + P.arrowLeft,
            onClick: g,
            type: "button",
            tabIndex: -1,
            children: (0, B.jsx)("svg", {
              viewBox: "0 0 24 24",
              fill: "currentColor",
              children: (0, B.jsx)("path", {
                d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              })
            })
          }), (0, B.jsx)("button", {
            className: P.arrowBtn + " " + P.arrowRight,
            onClick: p,
            type: "button",
            tabIndex: -1,
            children: (0, B.jsx)("svg", {
              viewBox: "0 0 24 24",
              fill: "currentColor",
              children: (0, B.jsx)("path", {
                d: "M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
              })
            })
          })]
        }), _ > 1 && (0, B.jsx)("div", {
          className: P.dots,
          children: t.map(function (e, r) {
            return (0, B.jsx)("span", {
              className: "".concat(P.dot, " ").concat(r === c ? P.dotActive : ""),
              onClick: function () {
                return l(r);
              }
            }, r);
          })
        })]
      });
    }
    function R(e) {
      var r = e.signal,
        o = e.focusKey,
        n = e.onCardFocus,
        t = e.onArrowLeft,
        i = e.onPress,
        a = l({
          focusKey: o,
          onEnterPress: function () {
            return null == i ? void 0 : i();
          },
          onFocus: function () {
            return n();
          },
          onArrowPress: function (e) {
            return "left" !== e || !t || (t(), !1);
          }
        }),
        c = a.ref,
        d = a.focused;
      return (0, B.jsxs)("div", {
        ref: c,
        className: [S.channelCard, d && S.focused].filter(Boolean).join(" "),
        "data-focuskey": o,
        onClick: i,
        onMouseEnter: function () {
          return s(o);
        },
        children: [r.background_image && (0, B.jsx)("img", {
          src: r.background_image,
          alt: "",
          className: S.channelBg,
          draggable: !1,
          decoding: "async"
        }), (0, B.jsxs)("div", {
          className: S.channelInner,
          children: ["premium" === r.restriction && (0, B.jsx)("div", {
            className: S.restrictedOverlay,
            children: (0, B.jsx)("svg", {
              className: S.lockIcon,
              viewBox: "0 0 24 24",
              fill: "currentColor",
              children: (0, B.jsx)("path", {
                d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
              })
            })
          }), (0, B.jsx)("span", {
            className: S.liveBadge,
            children: "En Vivo"
          })]
        })]
      });
    }
    function E(e) {
      var r = e.signals,
        o = e.onRowFocused,
        n = e.onSignalPress,
        t = x(),
        a = t.trackRef,
        c = t.scrollToCard,
        d = l({
          focusKey: "HOME-LIVE-GRID",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function () {
            return null == o ? void 0 : o();
          }
        }),
        _ = d.ref,
        f = d.focusKey;
      return r && 0 !== r.length ? (0, B.jsxs)("div", {
        className: S.section,
        "data-section": "live-signals",
        children: [(0, B.jsx)("h2", {
          className: S.sectionTitle,
          children: "Nuestras Señales"
        }), (0, B.jsx)(i.Provider, {
          value: f,
          children: (0, B.jsx)("div", {
            ref: _,
            className: S.wrapper,
            children: (0, B.jsxs)("div", {
              ref: a,
              className: S.track,
              children: [r.map(function (e, r) {
                var o = "home-live-".concat(e.key || r);
                return (0, B.jsx)(R, {
                  signal: e,
                  focusKey: o,
                  onCardFocus: function () {
                    return c(o);
                  },
                  onArrowLeft: 0 === r ? function () {
                    return s(p);
                  } : void 0,
                  onPress: function () {
                    return null == n ? void 0 : n(e);
                  }
                }, e.key || r);
              }), (0, B.jsx)("div", {
                className: S.endSpacer
              })]
            })
          })
        })]
      }) : null;
    }
    function K(e) {
      var r,
        o,
        n = e.category,
        t = e.onRowFocused,
        i = e.onProgramPress,
        a = e.onViewMorePress,
        s = null === (r = n.image_background_category) || void 0 === r ? void 0 : r.default,
        c = null === (o = n.image_logo_category) || void 0 === o ? void 0 : o.medium,
        l = Boolean(s && "" !== s),
        d = Boolean(c && "" !== c),
        _ = n.format,
        f = "ranking" === _ || "portrait" === n.image_orientation ? "vertical" : "horizontal";
      return 0 === n.programs.length ? null : (0, B.jsxs)("div", {
        className: [A.section, l && A.hasBg].filter(Boolean).join(" "),
        style: s && "vertical" === f ? {
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%), url(".concat(s, ")")
        } : {},
        children: [(!d || "horizontal" === f) && (0, B.jsx)("h2", {
          className: A.sectionTitle,
          children: n.title
        }), (0, B.jsxs)("div", {
          className: A.row,
          children: [d && "vertical" === f && (0, B.jsxs)("div", {
            className: A.logoSide,
            children: [(0, B.jsx)("img", {
              src: n.image_logo_category.medium,
              alt: "".concat(n.title, " logo"),
              className: A.logoImage
            }), (0, B.jsx)("h2", {
              className: A.logoTitle,
              children: n.title
            })]
          }), (0, B.jsx)("div", {
            className: A.carouselWrapper,
            children: (0, B.jsx)(j, {
              programs: n.programs,
              orientation: f,
              categorySlug: n.key,
              format: _,
              focusKeyPrefix: "cat-".concat(n.key),
              onRowFocused: t,
              onProgramPress: i,
              onViewMorePress: function () {
                return null == a ? void 0 : a(n.key, n.title);
              }
            })
          })]
        })]
      });
    }
    function M(e) {
      var r = e.item,
        o = e.focusKey,
        n = e.index,
        t = e.onCardFocus,
        i = e.onPress,
        a = w(r),
        c = y(r),
        d = b(r),
        _ = l({
          focusKey: o,
          onEnterPress: function () {
            return null == i ? void 0 : i();
          },
          onFocus: function () {
            return null == t ? void 0 : t();
          },
          onArrowPress: function (e) {
            return "left" !== e || 0 !== n || (s(p), !1);
          }
        }),
        f = _.ref,
        u = _.focused,
        g = [I.card, u && I.focused].filter(Boolean).join(" ");
      return (0, B.jsxs)("div", {
        className: I.cardWrapper,
        children: [(0, B.jsxs)("div", {
          ref: f,
          className: g,
          "data-focuskey": o,
          onClick: i,
          onMouseEnter: function () {
            return s(o);
          },
          children: [a ? (0, B.jsx)("img", {
            src: a,
            alt: r.title,
            className: I.image,
            draggable: !1,
            decoding: "async"
          }) : (0, B.jsx)("div", {
            className: I.fallback,
            children: (0, B.jsx)("span", {
              className: I.fallbackText,
              children: r.title
            })
          }), (0, B.jsx)("div", {
            className: I.progressWrapper,
            children: (0, B.jsx)("div", {
              className: I.progressBar,
              children: (0, B.jsx)("div", {
                className: I.progressFill,
                style: {
                  width: "".concat(c, "%")
                }
              })
            })
          })]
        }), d && (0, B.jsx)("span", {
          className: I.cardTitle,
          children: d
        })]
      });
    }
    function H(e) {
      var r = e.items,
        o = e.onRowFocused,
        n = e.onItemPress,
        t = x(),
        a = t.trackRef,
        s = t.scrollToCard,
        c = l({
          focusKey: "CW-ROW",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1,
          onFocus: function () {
            return null == o ? void 0 : o();
          }
        }),
        d = c.ref,
        _ = c.focusKey;
      return 0 === r.length ? null : (0, B.jsx)(i.Provider, {
        value: _,
        children: (0, B.jsxs)("div", {
          className: I.section,
          children: [(0, B.jsx)("h2", {
            className: I.sectionTitle,
            children: "Seguir Viendo"
          }), (0, B.jsx)("div", {
            ref: d,
            className: I.wrapper,
            children: (0, B.jsxs)("div", {
              ref: a,
              className: I.track,
              children: [r.map(function (e, r) {
                return (0, B.jsx)(M, {
                  item: e,
                  index: r,
                  focusKey: "cw-".concat(e.slug),
                  onCardFocus: function () {
                    return s("cw-".concat(e.slug));
                  },
                  onPress: function () {
                    return null == n ? void 0 : n(e);
                  }
                }, e.slug);
              }), (0, B.jsx)("div", {
                className: I.endSpacer
              })]
            })
          })]
        })
      });
    }
    return r("default", function () {
      var e,
        r = N(),
        o = r.slider,
        n = r.categories,
        t = r.recommended,
        c = r.liveSignals,
        d = r.continueWatching,
        _ = r.recommendedTitle,
        u = r.isLoading,
        p = r.isError,
        g = (e = a(), {
          goToProgram: function (r) {
            e("/programas/".concat(r.key), {
              state: {
                program: r
              }
            });
          },
          goToProgramOrEvent: function (r, o) {
            if ("event" === o) {
              var n,
                t = r;
              t.skip_view && null !== (n = t.program_associated) && void 0 !== n && n.key ? e("/programas/".concat(t.program_associated.key)) : e("/eventos/".concat(t.key));
            } else e("/programas/".concat(r.key));
          },
          goToCategory: function (r, o) {
            e("/categoria/".concat(r), {
              state: {
                title: o
              }
            });
          },
          goToLive: function (r) {
            e("/live", {
              state: {
                selectedKeyLive: r.key_live
              }
            });
          },
          goToContinueWatching: function (r) {
            e("/play/".concat(r.key_program, "/").concat(r.key_segment, "/").concat(r.season, "/").concat(r.chapter), {
              state: {
                resumeTime: r.time
              }
            });
          }
        }),
        m = g.goToProgram,
        x = g.goToProgramOrEvent,
        v = g.goToCategory,
        y = g.goToLive,
        w = g.goToContinueWatching,
        b = h(),
        z = b.scrollRef,
        T = b.scrollToSection,
        C = b.scrollToTop,
        P = l({
          focusKey: "HOME",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        S = P.ref,
        A = P.focusKey;
      (0, k.useEffect)(function () {
        s("BANNER-PLAY");
      }, []);
      var I = (0, k.useCallback)(function (e) {
        return function () {
          return T(e);
        };
      }, [T]);
      return (0, B.jsx)(i.Provider, {
        value: A,
        children: (0, B.jsx)("div", {
          ref: S,
          className: F.container,
          children: u ? (0, B.jsx)(f, {}) : p || !o ? (0, B.jsx)("div", {
            className: F.errorContainer,
            children: (0, B.jsx)("p", {
              className: F.errorText,
              children: "Error al cargar el catálogo."
            })
          }) : (0, B.jsxs)("div", {
            ref: z,
            className: F.scrollContainer,
            children: [(0, B.jsx)(L, {
              slider: o,
              onPlayFocused: C,
              onProgramPress: m
            }), (0, B.jsxs)("div", {
              className: F.carouselsWrapper,
              children: [c.length > 0 && (0, B.jsx)(E, {
                signals: c,
                onRowFocused: I("live-signals"),
                onSignalPress: y
              }), t.length > 0 && (0, B.jsxs)("div", {
                className: F.sectionRecommended,
                "data-section": "recommended",
                children: [(0, B.jsx)("h2", {
                  className: F.sectionTitle,
                  children: _
                }), (0, B.jsx)(j, {
                  programs: t,
                  orientation: "vertical",
                  categorySlug: "recomendados",
                  focusKeyPrefix: "recommended",
                  onRowFocused: I("recommended"),
                  onProgramPress: x
                })]
              }), d.length > 0 && (0, B.jsx)("div", {
                "data-section": "continue-watching",
                children: (0, B.jsx)(H, {
                  items: d,
                  onRowFocused: I("continue-watching"),
                  onItemPress: w
                })
              }), n.map(function (e) {
                var r;
                return (null === (r = e.programs) || void 0 === r ? void 0 : r.length) > 0 && (0, B.jsx)("div", {
                  "data-section": "cat-".concat(e.key),
                  children: (0, B.jsx)(K, {
                    category: e,
                    onRowFocused: I("cat-".concat(e.key)),
                    onProgramPress: x,
                    onViewMorePress: v
                  })
                }, e.key);
              })]
            })]
          })
        })
      });
    }), {
      setters: [function (e) {
        t = e.$, i = e.K, a = e.U, s = e.X, c = e.Z, l = e.q, d = e.t;
      }, function (e) {
        _ = e.a, f = e.n, u = e.o, p = e.s, g = e.t;
      }, function (e) {
        m = e.t;
      }, function (e) {
        h = e.t;
      }, function (e) {
        x = e.n;
      }, function (e) {
        v = e.t;
      }, function (e) {
        y = e.i, w = e.n, b = e.r, j = e.t;
      }],
      execute: function () {
        (z = document.createElement("style")).textContent = '._logoWrapper_nu4zn_2{z-index:2;max-width:15vw;max-height:20vw;position:absolute;top:4vw;left:3vw}._logo_nu4zn_2{object-fit:contain;filter:drop-shadow(0 2px 8px rgba(0,0,0,.6));width:100%;height:100%}._fallbackTitle_nu4zn_18{color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.5);font-family:Archia,sans-serif;font-size:2.5rem;font-weight:700}._descriptionBlock_nu4zn_27{z-index:2;max-width:30vw;position:absolute;top:19vw;left:3vw}._description_nu4zn_27{color:#fff;-webkit-line-clamp:3;-webkit-box-orient:vertical;font-family:Archia,sans-serif;font-size:1.5rem;font-weight:500;line-height:1.4;display:-webkit-box;overflow:hidden}._metaRow_nu4zn_48{color:#fff;align-items:center;margin-top:.75rem;font-family:Archia,sans-serif;font-size:1.2rem;display:flex}._metaRow_nu4zn_48>*+*{margin-left:.75rem}._classificationBadge_nu4zn_61{color:#fff;background-color:#01a77e;border-radius:10px;padding:2px 8px;font-size:1.2rem;font-weight:600}._metaSeparator_nu4zn_70{opacity:.6}._genres_nu4zn_74{opacity:.8}._playButton_nu4zn_79{z-index:2;color:#fff;cursor:pointer;background-color:rgba(0,0,0,.6);border:4px solid transparent;border-radius:5rem;outline:none;justify-content:center;align-items:center;width:13vw;height:8vh;transition:transform .2s,opacity .2s;display:flex;position:absolute;bottom:40px;left:50px}._playButton_nu4zn_79:hover,._playButton_nu4zn_79._focused_nu4zn_99{border:4px solid #ffe500}._playButtonContent_nu4zn_103{align-items:center;display:flex}._playButtonContent_nu4zn_103>*+*{margin-left:.75rem}._playIcon_nu4zn_112{width:24px;height:24px}._playText_nu4zn_117{color:#fff;font-family:Archia,sans-serif;font-size:1.5rem;font-weight:600}._wrapper_19crt_2{border-radius:32px;width:100%;height:702px;position:relative;overflow:hidden}._bgImageWrapper_19crt_11{width:100%;height:100%;position:absolute;top:0;left:0}._bgImage_19crt_11{object-fit:cover;width:100%;height:100%;animation:.3s _fadeIn_19crt_1}@keyframes _fadeIn_19crt_1{0%{opacity:0}to{opacity:1}}._overlay_19crt_37{z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,.4) 50%,transparent 100%);width:100%;height:100%;position:absolute;top:0;left:0}._content_19crt_51{z-index:2;width:100%;height:100%;position:absolute;top:0;left:0}._arrowBtn_19crt_61{z-index:10;color:#fff;cursor:pointer;background-color:rgba(0,0,0,.5);border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;width:60px;height:60px;padding:0;font-size:3rem;transition:background-color .2s,transform .2s;display:flex;position:absolute;top:50%;transform:translateY(-40%)}._arrowBtn_19crt_61 svg{width:32px;height:32px}._arrowLeft_19crt_87{left:20px}._arrowRight_19crt_91{right:20px}._arrowBtn_19crt_61:hover{background-color:rgba(0,0,0,.8)}._dots_19crt_100{z-index:10;align-items:center;display:flex;position:absolute;bottom:30px;right:30px}._dots_19crt_100>*+*{margin-left:8px}._dot_19crt_100{cursor:pointer;background-color:#fff;border-radius:50%;width:8px;height:8px;transition:all .3s;display:inline-block}._dot_19crt_100._dotActive_19crt_123{background-color:#ffe500;border-radius:4px;width:24px;height:8px}._section_15pxd_3{padding:0 1rem}._sectionTitle_15pxd_7{color:#fff;text-transform:capitalize;font-size:1.5rem;font-weight:700;font-family:Archia, var(--font-family-category), Arial, Helvetica, sans-serif;margin-bottom:1rem;padding-left:1rem}._row_15pxd_18{flex-direction:row;display:flex}._channelCard_15pxd_24{box-sizing:border-box;cursor:pointer;background-color:#00604e;border-radius:32px;flex-shrink:0;width:12.6vw;height:13.5vh;margin-right:17.5px;transition:transform .2s;position:relative;overflow:hidden}._channelCard_15pxd_24._focused_15pxd_39,._channelCard_15pxd_24:hover{border:.3rem solid #ffe500;transform:scale(1.02)}._channelBg_15pxd_46{object-fit:cover;width:100%;height:100%;position:absolute;top:0;left:0}._channelInner_15pxd_56{border-radius:32px;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:relative}._channelLogo_15pxd_67{object-fit:contain;z-index:1;max-width:50%;max-height:50%}._liveBadge_15pxd_75{color:#fff;z-index:2;letter-spacing:.5px;background-color:red;border-radius:50px;padding:4px 6px;font-family:Archia,Arial,Helvetica,sans-serif;font-size:.8rem;font-weight:600;position:absolute;top:8px;right:8px}._restrictedOverlay_15pxd_91{content:"";z-index:1;background-color:rgba(0,0,0,.7);border-radius:32px;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:absolute}._lockIcon_15pxd_104{opacity:.7;z-index:2;width:32px;height:32px}._wrapper_15pxd_112{margin:-10px -15px;padding:10px 15px;overflow:hidden}._track_15pxd_118{flex-direction:row;transition:transform .3s;display:flex}._endSpacer_15pxd_124{flex-shrink:0;width:5rem}._section_jjpsw_1{flex-direction:column;display:flex;position:relative}._section_jjpsw_1._hasBg_jjpsw_7{padding:2rem 0}._section_jjpsw_1._hasBg_jjpsw_7:before{content:"";background:inherit;z-index:0;pointer-events:none;background-position:50%;background-repeat:no-repeat;background-size:cover;width:100vw;height:100%;position:absolute;top:0;left:-100px}._sectionTitle_jjpsw_27{z-index:2;color:#fff;text-transform:capitalize;font-size:1.8rem;font-weight:500;line-height:1.3;font-family:Archia, var(--font-family-category), Arial, Helvetica, sans-serif;margin-bottom:.5rem;margin-left:.5rem;position:relative}._row_jjpsw_41{z-index:1;flex-direction:row;align-items:center;display:flex;position:relative}._logoSide_jjpsw_49{z-index:2;flex-shrink:0;justify-content:center;align-items:center;width:20rem;margin:0 5rem;display:flex;position:relative}._logoSide_jjpsw_49>*+*{margin-left:1.25rem}._logoImage_jjpsw_64{object-fit:contain;width:60%;height:auto}._logoTitle_jjpsw_70{z-index:1;color:#fff;width:100%;font-size:1.5rem;font-weight:700;line-height:1.3;position:relative}._carouselWrapper_jjpsw_80{flex:1;min-width:0;overflow:hidden}._section_czcff_5{flex-direction:column;padding:0 1rem;display:flex}._sectionTitle_czcff_11{color:#fff;text-transform:capitalize;font-size:1.5rem;font-weight:700;font-family:Archia, var(--font-family-category), Arial, Helvetica, sans-serif;margin-bottom:1rem;padding-left:1rem}._wrapper_czcff_22{width:100%;margin:-25px -20px;padding:25px 20px;position:relative;overflow:hidden}._track_czcff_30{will-change:transform;flex-direction:row;transition:transform .3s;display:flex}._track_czcff_30>*+*{margin-left:18px}._cardWrapper_czcff_42{flex-direction:column;flex-shrink:0;display:flex}._card_czcff_42{cursor:pointer;box-sizing:border-box;background-color:#01a77e;border-radius:32px;flex-shrink:0;width:20vw;height:21vh;transition:transform .2s;position:relative;overflow:visible}._card_czcff_42._focused_czcff_63,._card_czcff_42:hover{z-index:10;transform:scale(1.02)}._image_czcff_70{object-fit:cover;box-sizing:border-box;border-radius:28px;width:100%;height:100%;display:block}._card_czcff_42._focused_czcff_63 ._image_czcff_70,._card_czcff_42:hover ._image_czcff_70{z-index:2;border:4px solid #ffe500;position:relative}._fallback_czcff_89{border-radius:28px;justify-content:center;align-items:center;width:100%;height:100%;display:flex}._fallbackText_czcff_98{color:#fff;font-family:Archia,Arial,Helvetica,sans-serif;font-size:1rem;font-weight:500}._progressWrapper_czcff_106{border-radius:0 0 5px 5px;width:calc(100% - 2rem);position:absolute;bottom:.3px;left:50%;overflow:hidden;transform:translate(-50%)}._progressBar_czcff_116{background-color:rgba(0,0,0,.5);border-radius:0 0 5px 5px;height:5px}._progressFill_czcff_122{background-color:#ffe500;height:100%;transition:width .3s}._cardTitle_czcff_129{color:#fff;text-overflow:ellipsis;white-space:nowrap;width:20vw;padding-top:8px;font-family:Archia,Arial,Helvetica,sans-serif;font-size:18px;font-weight:600;overflow:hidden}._endSpacer_czcff_142{flex-shrink:0;width:5rem}._container_1st16_1{scrollbar-width:none;height:100vh;position:relative;overflow-x:hidden;overflow-y:auto}._container_1st16_1::-webkit-scrollbar{display:none}._scrollContainer_1st16_14{padding-top:32px;padding-bottom:32px;padding-right:32px}._carouselsWrapper_1st16_20{flex-direction:column;margin-top:32px;padding-bottom:5rem;display:flex}._carouselsWrapper_1st16_20>*+*{margin-top:32px}._sectionRecommended_1st16_32{flex-direction:column;display:flex}._sectionTitle_1st16_37{color:#fff;text-transform:capitalize;font-size:1.8rem;font-weight:500;line-height:1.3;font-family:Archia, var(--font-family-category), Arial, Helvetica, sans-serif;margin-bottom:.5rem;margin-left:.5rem}._errorContainer_1st16_49{color:#fff;justify-content:center;align-items:center;min-height:50vh;display:flex}._errorText_1st16_57{color:#ef4444;font-family:var(--font-family-title);font-size:var(--font-size-text)}\n/*$vite$:1*/', document.head.appendChild(z), k = t(c(), 1), N = function () {
          var e,
            r,
            o,
            n,
            t,
            i = u(function (e) {
              return e.token;
            }),
            a = u(function (e) {
              return e.activeProfile;
            }),
            s = _(function (e) {
              return e.config;
            }),
            c = g(function () {
              return m.getSlider();
            }, []),
            l = g(function () {
              return m.getCategories({
                show_event: !0,
                show_ranking: !0
              });
            }, []),
            d = g(function () {
              return m.getRecommendedPrograms();
            }, []),
            f = g(function () {
              return m.getPlaylistPremium();
            }, []),
            p = g(function () {
              var e;
              return v.getAll({
                token: null != i ? i : "",
                profile: null !== (e = null == a ? void 0 : a.id) && void 0 !== e ? e : "",
                end: 0,
                limit: 10
              });
            }, [i, null == a ? void 0 : a.id], {
              enabled: !!i && !!a
            });
          return {
            slider: (null === (e = c.data) || void 0 === e ? void 0 : e.data) || [],
            categories: (null === (r = l.data) || void 0 === r ? void 0 : r.data) || [],
            recommended: (null === (o = d.data) || void 0 === o ? void 0 : o.data) || [],
            liveSignals: (null === (n = f.data) || void 0 === n ? void 0 : n.data) || [],
            continueWatching: (null === (t = p.data) || void 0 === t ? void 0 : t.data) || [],
            recommendedTitle: (null == s ? void 0 : s.nombre_recomendados) || "Destacados",
            isLoading: c.isLoading || l.isLoading || d.isLoading,
            isError: c.isError || l.isError || d.isError
          };
        }, T = "data:image/svg+xml,%3csvg%20width='27'%20height='28'%20viewBox='0%200%2027%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M25.8227%2012.0936C27.2626%2012.8396%2027.2626%2014.8991%2025.8227%2015.6452L2.9201%2027.5118C1.58881%2028.2016%20-1.3492e-06%2027.2354%20-1.28366e-06%2025.736L-2.46241e-07%202.00273C-1.80702e-07%200.503353%201.58881%20-0.462842%202.9201%200.226944L25.8227%2012.0936Z'%20fill='white'/%3e%3c/svg%3e", C = {
          logoWrapper: "_logoWrapper_nu4zn_2",
          logo: "_logo_nu4zn_2",
          fallbackTitle: "_fallbackTitle_nu4zn_18",
          descriptionBlock: "_descriptionBlock_nu4zn_27",
          description: "_description_nu4zn_27",
          metaRow: "_metaRow_nu4zn_48",
          classificationBadge: "_classificationBadge_nu4zn_61",
          metaSeparator: "_metaSeparator_nu4zn_70",
          genres: "_genres_nu4zn_74",
          playButton: "_playButton_nu4zn_79",
          focused: "_focused_nu4zn_99",
          playButtonContent: "_playButtonContent_nu4zn_103",
          playIcon: "_playIcon_nu4zn_112",
          playText: "_playText_nu4zn_117"
        }, B = d(), P = {
          wrapper: "_wrapper_19crt_2",
          bgImageWrapper: "_bgImageWrapper_19crt_11",
          bgImage: "_bgImage_19crt_11",
          fadeIn: "_fadeIn_19crt_1",
          overlay: "_overlay_19crt_37",
          content: "_content_19crt_51",
          arrowBtn: "_arrowBtn_19crt_61",
          arrowLeft: "_arrowLeft_19crt_87",
          arrowRight: "_arrowRight_19crt_91",
          dots: "_dots_19crt_100",
          dot: "_dot_19crt_100",
          dotActive: "_dotActive_19crt_123"
        }, S = {
          section: "_section_15pxd_3",
          sectionTitle: "_sectionTitle_15pxd_7",
          row: "_row_15pxd_18",
          channelCard: "_channelCard_15pxd_24",
          focused: "_focused_15pxd_39",
          channelBg: "_channelBg_15pxd_46",
          channelInner: "_channelInner_15pxd_56",
          channelLogo: "_channelLogo_15pxd_67",
          liveBadge: "_liveBadge_15pxd_75",
          restrictedOverlay: "_restrictedOverlay_15pxd_91",
          lockIcon: "_lockIcon_15pxd_104",
          wrapper: "_wrapper_15pxd_112",
          track: "_track_15pxd_118",
          endSpacer: "_endSpacer_15pxd_124"
        }, A = {
          section: "_section_jjpsw_1",
          hasBg: "_hasBg_jjpsw_7",
          sectionTitle: "_sectionTitle_jjpsw_27",
          row: "_row_jjpsw_41",
          logoSide: "_logoSide_jjpsw_49",
          logoImage: "_logoImage_jjpsw_64",
          logoTitle: "_logoTitle_jjpsw_70",
          carouselWrapper: "_carouselWrapper_jjpsw_80"
        }, I = {
          section: "_section_czcff_5",
          sectionTitle: "_sectionTitle_czcff_11",
          wrapper: "_wrapper_czcff_22",
          track: "_track_czcff_30",
          cardWrapper: "_cardWrapper_czcff_42",
          card: "_card_czcff_42",
          focused: "_focused_czcff_63",
          image: "_image_czcff_70",
          fallback: "_fallback_czcff_89",
          fallbackText: "_fallbackText_czcff_98",
          progressWrapper: "_progressWrapper_czcff_106",
          progressBar: "_progressBar_czcff_116",
          progressFill: "_progressFill_czcff_122",
          cardTitle: "_cardTitle_czcff_129",
          endSpacer: "_endSpacer_czcff_142"
        }, F = {
          container: "_container_1st16_1",
          scrollContainer: "_scrollContainer_1st16_14",
          carouselsWrapper: "_carouselsWrapper_1st16_20",
          sectionRecommended: "_sectionRecommended_1st16_32",
          sectionTitle: "_sectionTitle_1st16_37",
          errorContainer: "_errorContainer_1st16_49",
          errorText: "_errorText_1st16_57"
        };
      }
    };
  });
}();