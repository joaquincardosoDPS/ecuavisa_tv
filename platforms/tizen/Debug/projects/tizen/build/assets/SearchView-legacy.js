!function () {
  function e(e, n) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, r) {
      var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != n) {
        var t,
          a,
          i,
          o,
          c = [],
          l = !0,
          s = !1;
        try {
          if (i = (n = n.call(e)).next, 0 === r) {
            if (Object(n) !== n) return;
            l = !1;
          } else for (; !(l = (t = i.call(n)).done) && (c.push(t.value), c.length !== r); l = !0);
        } catch (e) {
          s = !0, a = e;
        } finally {
          try {
            if (!l && null != n.return && (o = n.return(), Object(o) !== o)) return;
          } finally {
            if (s) throw a;
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
  System.register(["./jsx-runtime-legacy.js", "./useFetchPaginated-legacy.js", "./catalogService-legacy.js", "./ProgramGrid-legacy.js", "./OnScreenKeyboard-legacy.js"], function (r, n) {
    var t, a, i, o, c, l, s, u, d, f, p, h, _, g, m, y;
    function b() {
      var r,
        n,
        t,
        a,
        i,
        o = e((0, _.useState)(""), 2),
        c = o[0],
        l = o[1],
        s = (r = c, n = 500, t = e((0, _.useState)(r), 2), a = t[0], i = t[1], (0, _.useEffect)(function () {
          var e = setTimeout(function () {
            i(r);
          }, n);
          return function () {
            clearTimeout(e);
          };
        }, [r, n]), a),
        f = s.trim().length > 0,
        p = u(function (e, r) {
          return d.searchPrograms({
            search: s,
            limit: r,
            page: e
          });
        }, [s], {
          limit: g,
          enabled: f,
          hasMoreStrategy: "length"
        }),
        h = p.data,
        m = p.isLoading,
        y = p.isLoadingMore,
        b = p.isError,
        k = p.hasMore,
        x = p.loadMore,
        v = (0, _.useCallback)(function (e) {
          l(function (r) {
            return r + e;
          });
        }, []),
        j = (0, _.useCallback)(function () {
          l(function (e) {
            return e.slice(0, -1);
          });
        }, []),
        P = (0, _.useCallback)(function () {
          l("");
        }, []);
      return {
        query: c,
        debouncedQuery: s,
        programs: f ? h : [],
        isLoading: m,
        isLoadingMore: y,
        isError: b,
        hasMore: k,
        loadMore: x,
        appendChar: v,
        deleteChar: j,
        clearQuery: P
      };
    }
    return r("default", function () {
      var e,
        r = b(),
        n = r.query,
        t = r.debouncedQuery,
        c = r.programs,
        s = r.isLoading,
        u = r.isLoadingMore,
        d = r.isError,
        h = r.hasMore,
        g = r.loadMore,
        k = r.appendChar,
        x = r.deleteChar,
        v = r.clearQuery,
        j = (e = i(), {
          goToProgram: function (r) {
            e("/programas/".concat(r));
          }
        }).goToProgram,
        P = l({
          focusKey: "SEARCH",
          saveLastFocusedChild: !0,
          trackChildren: !0
        }),
        S = P.ref,
        C = P.focusKey;
      return (0, _.useEffect)(function () {
        o("SEARCH-KB");
      }, []), (0, y.jsx)(a.Provider, {
        value: C,
        children: (0, y.jsxs)("div", {
          ref: S,
          className: m.container,
          children: [(0, y.jsx)("div", {
            className: m.inputWrapper,
            children: (0, y.jsx)("div", {
              className: m.inputDisplay,
              children: n || (0, y.jsx)("span", {
                className: m.placeholder,
                children: "Ingresa tu búsqueda..."
              })
            })
          }), (0, y.jsxs)("div", {
            className: m.content,
            children: [(0, y.jsx)("div", {
              className: m.keyboardPanel,
              children: (0, y.jsx)(p, {
                focusKeyPrefix: "SEARCH-KB",
                onInput: k,
                onSearch: function () {},
                onDelete: x,
                onClear: v
              })
            }), (0, y.jsx)("div", {
              className: m.resultsPanel,
              children: 0 === t.trim().length ? (0, y.jsx)("p", {
                className: m.hint,
                children: "Usa el teclado para buscar programas"
              }) : (0, y.jsx)(f, {
                programs: c,
                isLoading: s,
                isError: d,
                loadingText: "Buscando...",
                errorText: "Error al buscar",
                focusKeyPrefix: "SEARCH-RESULTS",
                hasMore: h,
                isLoadingMore: u,
                onLoadMore: g,
                onProgramPress: j
              })
            })]
          })]
        })
      });
    }), {
      setters: [function (e) {
        t = e.$, a = e.K, i = e.U, o = e.X, c = e.Z, l = e.q, s = e.t;
      }, function (e) {
        u = e.t;
      }, function (e) {
        d = e.t;
      }, function (e) {
        f = e.t;
      }, function (e) {
        p = e.t;
      }],
      execute: function () {
        (h = document.createElement("style")).textContent = "._container_1cnk5_2{box-sizing:border-box;flex-direction:column;height:100vh;padding:2rem 3rem;display:flex;overflow:hidden}._inputWrapper_1cnk5_12{margin-bottom:1.5rem}._inputDisplay_1cnk5_16{font-size:var(--font-size-subtitle);color:var(--clr-secondary-text);background-color:#2c404b;border-radius:8px;align-items:center;min-height:2.5rem;padding:.75rem 1.5rem;font-weight:500;display:flex}._placeholder_1cnk5_28{opacity:.4;font-weight:400}._cursor_1cnk5_34{background-color:var(--foc-primary);width:2px;height:1.4em;margin-left:2px;animation:1s step-end infinite _blink_1cnk5_1;display:inline-block}@keyframes _blink_1cnk5_1{0%,50%{opacity:1}51%,to{opacity:0}}._content_1cnk5_57{flex-direction:row;flex:1;min-height:0;display:flex}._keyboardPanel_1cnk5_65{flex:0 0 20vw;align-items:flex-start;padding-right:1.5rem;display:flex}._resultsPanel_1cnk5_73{flex:1;min-width:0;overflow:hidden}._hint_1cnk5_80{color:var(--clr-secondary-text);font-size:var(--font-size-label);opacity:.5;font-weight:400}\n/*$vite$:1*/", document.head.appendChild(h), _ = t(c(), 1), g = 12, m = {
          container: "_container_1cnk5_2",
          inputWrapper: "_inputWrapper_1cnk5_12",
          inputDisplay: "_inputDisplay_1cnk5_16",
          placeholder: "_placeholder_1cnk5_28",
          cursor: "_cursor_1cnk5_34",
          blink: "_blink_1cnk5_1",
          content: "_content_1cnk5_57",
          keyboardPanel: "_keyboardPanel_1cnk5_65",
          resultsPanel: "_resultsPanel_1cnk5_73",
          hint: "_hint_1cnk5_80"
        }, y = s();
      }
    };
  });
}();