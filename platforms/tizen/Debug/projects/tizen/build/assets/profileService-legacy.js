!function () {
  function t() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,
      e,
      o = "function" == typeof Symbol ? Symbol : {},
      u = o.iterator || "@@iterator",
      a = o.toStringTag || "@@toStringTag";
    function i(t, o, u, a) {
      var i = o && o.prototype instanceof f ? o : f,
        s = Object.create(i.prototype);
      return n(s, "_invoke", function (t, n, o) {
        var u,
          a,
          i,
          f = 0,
          s = o || [],
          p = !1,
          l = {
            p: 0,
            n: 0,
            v: r,
            a: v,
            f: v.bind(r, 4),
            d: function (t, n) {
              return u = t, a = 0, i = r, l.n = n, c;
            }
          };
        function v(t, n) {
          for (a = t, i = n, e = 0; !p && f && !o && e < s.length; e++) {
            var o,
              u = s[e],
              v = l.p,
              y = u[2];
            t > 3 ? (o = y === n) && (i = u[(a = u[4]) ? 5 : (a = 3, 3)], u[4] = u[5] = r) : u[0] <= v && ((o = t < 2 && v < u[1]) ? (a = 0, l.v = n, l.n = u[1]) : v < y && (o = t < 3 || u[0] > n || n > y) && (u[4] = t, u[5] = n, l.n = y, a = 0));
          }
          if (o || t > 1) return c;
          throw p = !0, n;
        }
        return function (o, s, y) {
          if (f > 1) throw TypeError("Generator is already running");
          for (p && 1 === s && v(s, y), a = s, i = y; (e = a < 2 ? r : i) || !p;) {
            u || (a ? a < 3 ? (a > 1 && (l.n = -1), v(a, i)) : l.n = i : l.v = i);
            try {
              if (f = 2, u) {
                if (a || (o = "next"), e = u[o]) {
                  if (!(e = e.call(u, i))) throw TypeError("iterator result is not an object");
                  if (!e.done) return e;
                  i = e.value, a < 2 && (a = 0);
                } else 1 === a && (e = u.return) && e.call(u), a < 2 && (i = TypeError("The iterator does not provide a '" + o + "' method"), a = 1);
                u = r;
              } else if ((e = (p = l.n < 0) ? i : t.call(n, l)) !== c) break;
            } catch (e) {
              u = r, a = 1, i = e;
            } finally {
              f = 1;
            }
          }
          return {
            value: e,
            done: p
          };
        };
      }(t, u, a), !0), s;
    }
    var c = {};
    function f() {}
    function s() {}
    function p() {}
    e = Object.getPrototypeOf;
    var l = [][u] ? e(e([][u]())) : (n(e = {}, u, function () {
        return this;
      }), e),
      v = p.prototype = f.prototype = Object.create(l);
    function y(t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, p) : (t.__proto__ = p, n(t, a, "GeneratorFunction")), t.prototype = Object.create(v), t;
    }
    return s.prototype = p, n(v, "constructor", p), n(p, "constructor", s), s.displayName = "GeneratorFunction", n(p, a, "GeneratorFunction"), n(v), n(v, a, "Generator"), n(v, u, function () {
      return this;
    }), n(v, "toString", function () {
      return "[object Generator]";
    }), (t = function () {
      return {
        w: i,
        m: y
      };
    })();
  }
  function n(t, r, e, o) {
    var u = Object.defineProperty;
    try {
      u({}, "", {});
    } catch (t) {
      u = 0;
    }
    n = function (t, r, e, o) {
      function a(r, e) {
        n(t, r, function (t) {
          return this._invoke(r, e, t);
        });
      }
      r ? u ? u(t, r, {
        value: e,
        enumerable: !o,
        configurable: !o,
        writable: !o
      }) : t[r] = e : (a("next", 0), a("throw", 1), a("return", 2));
    }, n(t, r, e, o);
  }
  function r(t, n, r, e, o, u, a) {
    try {
      var i = t[u](a),
        c = i.value;
    } catch (t) {
      return void r(t);
    }
    i.done ? n(c) : Promise.resolve(c).then(e, o);
  }
  function e(t) {
    return function () {
      var n = this,
        e = arguments;
      return new Promise(function (o, u) {
        var a = t.apply(n, e);
        function i(t) {
          r(a, o, u, i, c, "next", t);
        }
        function c(t) {
          r(a, o, u, i, c, "throw", t);
        }
        i(void 0);
      });
    };
  }
  System.register(["./jsx-runtime-legacy.js"], function (n, r) {
    var o, u, a, i, c, f;
    return {
      setters: [function (t) {
        o = t._, u = t.b, a = t.n, i = t.v, c = t.x, f = t.y;
      }],
      execute: function () {
        var r, s, p, l, v;
        n("t", {
          getAll: (v = e(t().m(function n(r) {
            var e, u;
            return t().w(function (t) {
              for (;;) switch (t.n) {
                case 0:
                  return t.n = 1, a.post(o, {
                    token: r
                  });
                case 1:
                  return e = t.v, u = e.data, t.a(2, u);
              }
            }, n);
          })), function (t) {
            return v.apply(this, arguments);
          }),
          getAvatars: (l = e(t().m(function n() {
            var r, e;
            return t().w(function (t) {
              for (;;) switch (t.n) {
                case 0:
                  return t.n = 1, a.post(i, {});
                case 1:
                  return r = t.v, e = r.data, t.a(2, e);
              }
            }, n);
          })), function () {
            return l.apply(this, arguments);
          }),
          create: (p = e(t().m(function n(r, e, o) {
            var u, i;
            return t().w(function (t) {
              for (;;) switch (t.n) {
                case 0:
                  return t.n = 1, a.post(f, {
                    token: r,
                    name_perfil: e,
                    avatar: null != o ? o : ""
                  });
                case 1:
                  return u = t.v, i = u.data, t.a(2, i);
              }
            }, n);
          })), function (t, n, r) {
            return p.apply(this, arguments);
          }),
          update: (s = e(t().m(function n(r, e, o, u) {
            var i, f;
            return t().w(function (t) {
              for (;;) switch (t.n) {
                case 0:
                  return t.n = 1, a.post(c, {
                    token: r,
                    id: e,
                    name_perfil: o,
                    avatar: null != u ? u : ""
                  });
                case 1:
                  return i = t.v, f = i.data, t.a(2, f);
              }
            }, n);
          })), function (t, n, r, e) {
            return s.apply(this, arguments);
          }),
          delete: (r = e(t().m(function n(r, e) {
            var o, i;
            return t().w(function (t) {
              for (;;) switch (t.n) {
                case 0:
                  return t.n = 1, a.post(u, {
                    token: r,
                    id: e
                  });
                case 1:
                  return o = t.v, i = o.data, t.a(2, i);
              }
            }, n);
          })), function (t, n) {
            return r.apply(this, arguments);
          })
        });
      }
    };
  });
}();