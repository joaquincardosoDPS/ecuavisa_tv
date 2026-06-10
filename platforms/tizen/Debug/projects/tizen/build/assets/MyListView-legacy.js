System.register(["./jsx-runtime-legacy.js", "./index-legacy.js", "./useFetchPaginated-legacy.js", "./Button-legacy.js", "./favoritesService-legacy.js", "./ProgramGrid-legacy.js"], function (e, r) {
  var t, n, o, i, a, s, c, l, d, g, u, m, _, f, p, h, y, v, j;
  function x(e) {
    var r = e.onPress,
      t = s({
        focusKey: "MYLIST-EMPTY-BTN",
        onEnterPress: function () {
          return null == r ? void 0 : r();
        }
      }),
      n = t.ref,
      o = t.focused,
      i = [v.emptyBtn, o && v.emptyBtnFocused].filter(Boolean).join(" ");
    return (0, j.jsxs)("div", {
      className: v.emptyContainer,
      children: [(0, j.jsx)("button", {
        ref: n,
        className: i,
        onClick: function () {
          return null == r ? void 0 : r();
        },
        dangerouslySetInnerHTML: {
          __html: y.replace(/width="[^"]*"/, 'width="80"').replace(/height="[^"]*"/, 'height="80"').replace(/stroke="[^"]*"/, 'stroke="currentColor"')
        }
      }), (0, j.jsx)("h1", {
        className: v.emptyTitle,
        children: "Tu lista está vacía"
      }), (0, j.jsx)("p", {
        className: v.emptySubtitle,
        children: "El contenido que agregues a tu lista aparecerá aquí"
      })]
    });
  }
  return e("default", function () {
    var e,
      r = function () {
        var e = d(function (e) {
            return e.token;
          }),
          r = d(function (e) {
            return e.activeProfile;
          }),
          t = !!e && !!r,
          n = g(function (t, n) {
            return m.getAll(e, r.id, t, n);
          }, [e, r], {
            limit: h,
            enabled: t,
            hasMoreStrategy: "length"
          }),
          o = n.data,
          i = n.isLoading,
          a = n.isLoadingMore,
          s = n.isError,
          c = n.hasMore;
        return {
          favorites: o,
          page: n.page,
          isLoading: i,
          isLoadingMore: a,
          isError: s,
          errorMsg: s ? "Error al cargar favoritos." : "",
          hasMore: c,
          loadMore: n.loadMore,
          isAuthenticated: t
        };
      }(),
      t = r.favorites,
      a = r.page,
      c = r.isLoading,
      f = r.isLoadingMore,
      y = r.isError,
      T = r.errorMsg,
      k = r.hasMore,
      L = r.loadMore,
      q = r.isAuthenticated,
      M = (e = o(), {
        goToProgram: function (r) {
          e("/programas/".concat(r));
        },
        goToLogin: function () {
          e("/auth/login");
        },
        goToSearch: function () {
          e("/buscar");
        }
      }),
      I = M.goToProgram,
      S = M.goToLogin,
      B = M.goToSearch,
      N = s({
        focusKey: "MYLIST-VIEW",
        saveLastFocusedChild: !0,
        trackChildren: !0,
        isFocusBoundary: !1,
        autoRestoreFocus: !0
      }),
      w = N.ref,
      E = N.focusKey;
    return (0, p.useEffect)(function () {
      c || (q ? t.length > 0 ? setTimeout(function () {
        return i("MYLIST-RESULTS-".concat(t[0].id));
      }, 300) : y || setTimeout(function () {
        return i("MYLIST-EMPTY-BTN");
      }, 300) : setTimeout(function () {
        return i("MYLIST-BTN-LOGIN");
      }, 300));
    }, [c, q, t.length, y]), (0, j.jsx)(n.Provider, {
      value: E,
      children: (0, j.jsxs)("div", {
        ref: w,
        className: v.container,
        children: [(0, j.jsx)("h1", {
          className: v.title,
          children: "Mi Lista"
        }), q ? c && 1 === a ? (0, j.jsx)(l, {}) : y ? (0, j.jsx)("p", {
          className: v.errorText,
          children: T
        }) : 0 === t.length ? (0, j.jsx)(x, {
          onPress: B
        }) : (0, j.jsx)("div", {
          className: v.favoritesWrapperGrid,
          children: (0, j.jsx)(_, {
            programs: t,
            isLoading: c,
            isError: y,
            loadingText: "Cargando favoritos...",
            errorText: "Error al cargar",
            focusKeyPrefix: "MYLIST-RESULTS",
            hasMore: k,
            isLoadingMore: f,
            onLoadMore: L,
            onProgramPress: I
          })
        }) : (0, j.jsxs)("div", {
          className: v.notLoggedIn,
          children: [(0, j.jsx)("p", {
            className: v.notLoggedInText,
            children: "Inicia sesión para ver tu lista de favoritos."
          }), (0, j.jsx)(u, {
            focusKey: "MYLIST-BTN-LOGIN",
            variant: "secondary",
            onPress: S,
            children: "Iniciar sesión"
          })]
        })]
      })
    });
  }), {
    setters: [function (e) {
      t = e.$, n = e.K, o = e.U, i = e.X, a = e.Z, s = e.q, c = e.t;
    }, function (e) {
      l = e.n, d = e.o;
    }, function (e) {
      g = e.t;
    }, function (e) {
      u = e.t;
    }, function (e) {
      m = e.t;
    }, function (e) {
      _ = e.t;
    }],
    execute: function () {
      (f = document.createElement("style")).textContent = "._container_jkn5q_1{flex-direction:column;min-height:100vh;padding:6vh 4vw 4vh;display:flex}._title_jkn5q_8{color:var(--clr-primary-title);margin:0 0 3vh;font-size:2rem;font-weight:700}._notLoggedIn_jkn5q_16{flex-direction:column;justify-content:center;align-items:center;padding:10vh 0;display:flex}._notLoggedIn_jkn5q_16>*+*{margin-top:1.5rem}._notLoggedInText_jkn5q_28{color:var(--clr-primary-text);opacity:.6;font-size:1.2rem}._errorText_jkn5q_35{color:#ef4444;text-align:center;padding:10vh 0;font-size:1.1rem}._emptyContainer_jkn5q_43{flex-direction:column;justify-content:center;align-items:center;display:flex}._emptyContainer_jkn5q_43>*+*{margin-top:1.25rem}._emptyBtn_jkn5q_54{border:4px solid var(--clr-text-primary-button);width:10rem;height:10rem;color:var(--clr-text-primary-button);cursor:pointer;background:0 0;border-radius:50%;justify-content:center;align-items:center;margin-top:10vh;transition:color .3s,border-color .3s;display:flex}._emptyBtnFocused_jkn5q_69,._emptyBtn_jkn5q_54:hover{color:var(--foc-primary);border-color:var(--foc-primary)}._emptyTitle_jkn5q_75{color:var(--clr-primary-title);margin:0;font-size:1.5rem;font-weight:700}._emptySubtitle_jkn5q_82{color:var(--clr-primary-text);opacity:.7;margin:0;font-size:1.1rem}._favoritesWrapperGrid_jkn5q_90{flex:1;min-height:0;margin-top:2vh;overflow:hidden}\n/*$vite$:1*/", document.head.appendChild(f), p = t(a(), 1), h = 12, y = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n  <path d="M12 4v16m8-8H4"/>\n</svg>\n', v = {
        container: "_container_jkn5q_1",
        title: "_title_jkn5q_8",
        notLoggedIn: "_notLoggedIn_jkn5q_16",
        notLoggedInText: "_notLoggedInText_jkn5q_28",
        errorText: "_errorText_jkn5q_35",
        emptyContainer: "_emptyContainer_jkn5q_43",
        emptyBtn: "_emptyBtn_jkn5q_54",
        emptyBtnFocused: "_emptyBtnFocused_jkn5q_69",
        emptyTitle: "_emptyTitle_jkn5q_75",
        emptySubtitle: "_emptySubtitle_jkn5q_82",
        favoritesWrapperGrid: "_favoritesWrapperGrid_jkn5q_90"
      }, j = c();
    }
  };
});