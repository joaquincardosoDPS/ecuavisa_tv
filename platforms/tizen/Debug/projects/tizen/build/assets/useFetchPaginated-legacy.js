!function () {
  function t(t) {
    return function (t) {
      if (Array.isArray(t)) return e(t);
    }(t) || function (t) {
      if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
    }(t) || r(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function n(t, n) {
    return function (t) {
      if (Array.isArray(t)) return t;
    }(t) || function (t, n) {
      var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
      if (null != r) {
        var e,
          a,
          o,
          i,
          u = [],
          l = !0,
          c = !1;
        try {
          if (o = (r = r.call(t)).next, 0 === n) {
            if (Object(r) !== r) return;
            l = !1;
          } else for (; !(l = (e = o.call(r)).done) && (u.push(e.value), u.length !== n); l = !0);
        } catch (t) {
          c = !0, a = t;
        } finally {
          try {
            if (!l && null != r.return && (i = r.return(), Object(i) !== i)) return;
          } finally {
            if (c) throw a;
          }
        }
        return u;
      }
    }(t, n) || r(t, n) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function r(t, n) {
    if (t) {
      if ("string" == typeof t) return e(t, n);
      var r = {}.toString.call(t).slice(8, -1);
      return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e(t, n) : void 0;
    }
  }
  function e(t, n) {
    (null == n || n > t.length) && (n = t.length);
    for (var r = 0, e = Array(n); r < n; r++) e[r] = t[r];
    return e;
  }
  System.register(["./jsx-runtime-legacy.js"], function (r, e) {
    var a, o, i;
    return r("t", function (r) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
        a = arguments.length > 2 ? arguments[2] : void 0,
        o = a.limit,
        u = a.enabled,
        l = void 0 === u || u,
        c = a.hasMoreStrategy,
        f = void 0 === c ? "last_page" : c,
        s = n((0, i.useState)([]), 2),
        y = s[0],
        d = s[1],
        h = n((0, i.useState)(1), 2),
        b = h[0],
        v = h[1],
        m = n((0, i.useState)(!1), 2),
        g = m[0],
        S = m[1],
        p = n((0, i.useState)(l), 2),
        A = p[0],
        j = p[1],
        w = n((0, i.useState)(!1), 2),
        I = w[0],
        M = w[1],
        C = n((0, i.useState)(!1), 2),
        E = C[0],
        k = C[1],
        x = (0, i.useRef)(r);
      x.current = r;
      var O = (0, i.useCallback)(function (t, n, r) {
        return "length" === f ? n.length >= o : t < (r.last_page || 1);
      }, [f, o]);
      return (0, i.useEffect)(function () {
        if (l) {
          var t = !1;
          return j(!0), k(!1), d([]), v(1), x.current(1, o).then(function (n) {
            if (!t) {
              var r = n.data || [];
              d(r), S(O(1, r, n));
            }
          }).catch(function () {
            t || k(!0);
          }).finally(function () {
            t || j(!1);
          }), function () {
            t = !0;
          };
        }
        j(!1);
      }, [l, o].concat(t(e))), {
        data: y,
        isLoading: A,
        isLoadingMore: I,
        isError: E,
        hasMore: g,
        page: b,
        loadMore: (0, i.useCallback)(function () {
          if (!I && g) {
            var n = b + 1;
            M(!0), x.current(n, o).then(function (r) {
              var e = r.data || [];
              d(function (n) {
                return [].concat(t(n), t(e));
              }), v(n), S(O(n, e, r));
            }).catch(function () {}).finally(function () {
              M(!1);
            });
          }
        }, [b, g, I, o, O]),
        reset: (0, i.useCallback)(function () {
          d([]), v(1), S(!1), k(!1);
        }, [])
      };
    }), {
      setters: [function (t) {
        a = t.$, o = t.Z;
      }],
      execute: function () {
        i = a(o(), 1);
      }
    };
  });
}();