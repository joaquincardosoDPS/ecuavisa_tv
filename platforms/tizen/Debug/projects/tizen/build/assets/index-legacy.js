!function () {
  function e() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var n,
      r,
      a = "function" == typeof Symbol ? Symbol : {},
      l = a.iterator || "@@iterator",
      o = a.toStringTag || "@@toStringTag";
    function i(e, a, l, o) {
      var i = a && a.prototype instanceof s ? a : s,
        c = Object.create(i.prototype);
      return t(c, "_invoke", function (e, t, a) {
        var l,
          o,
          i,
          s = 0,
          c = a || [],
          f = !1,
          d = {
            p: 0,
            n: 0,
            v: n,
            a: p,
            f: p.bind(n, 4),
            d: function (e, t) {
              return l = e, o = 0, i = n, d.n = t, u;
            }
          };
        function p(e, t) {
          for (o = e, i = t, r = 0; !f && s && !a && r < c.length; r++) {
            var a,
              l = c[r],
              p = d.p,
              m = l[2];
            e > 3 ? (a = m === t) && (i = l[(o = l[4]) ? 5 : (o = 3, 3)], l[4] = l[5] = n) : l[0] <= p && ((a = e < 2 && p < l[1]) ? (o = 0, d.v = t, d.n = l[1]) : p < m && (a = e < 3 || l[0] > t || t > m) && (l[4] = e, l[5] = t, d.n = m, o = 0));
          }
          if (a || e > 1) return u;
          throw f = !0, t;
        }
        return function (a, c, m) {
          if (s > 1) throw TypeError("Generator is already running");
          for (f && 1 === c && p(c, m), o = c, i = m; (r = o < 2 ? n : i) || !f;) {
            l || (o ? o < 3 ? (o > 1 && (d.n = -1), p(o, i)) : d.n = i : d.v = i);
            try {
              if (s = 2, l) {
                if (o || (a = "next"), r = l[a]) {
                  if (!(r = r.call(l, i))) throw TypeError("iterator result is not an object");
                  if (!r.done) return r;
                  i = r.value, o < 2 && (o = 0);
                } else 1 === o && (r = l.return) && r.call(l), o < 2 && (i = TypeError("The iterator does not provide a '" + a + "' method"), o = 1);
                l = n;
              } else if ((r = (f = d.n < 0) ? i : e.call(t, d)) !== u) break;
            } catch (r) {
              l = n, o = 1, i = r;
            } finally {
              s = 1;
            }
          }
          return {
            value: r,
            done: f
          };
        };
      }(e, l, o), !0), c;
    }
    var u = {};
    function s() {}
    function c() {}
    function f() {}
    r = Object.getPrototypeOf;
    var d = [][l] ? r(r([][l]())) : (t(r = {}, l, function () {
        return this;
      }), r),
      p = f.prototype = s.prototype = Object.create(d);
    function m(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, f) : (e.__proto__ = f, t(e, o, "GeneratorFunction")), e.prototype = Object.create(p), e;
    }
    return c.prototype = f, t(p, "constructor", f), t(f, "constructor", c), c.displayName = "GeneratorFunction", t(f, o, "GeneratorFunction"), t(p), t(p, o, "Generator"), t(p, l, function () {
      return this;
    }), t(p, "toString", function () {
      return "[object Generator]";
    }), (e = function () {
      return {
        w: i,
        m: m
      };
    })();
  }
  function t(e, n, r, a) {
    var l = Object.defineProperty;
    try {
      l({}, "", {});
    } catch (e) {
      l = 0;
    }
    t = function (e, n, r, a) {
      function o(n, r) {
        t(e, n, function (e) {
          return this._invoke(n, r, e);
        });
      }
      n ? l ? l(e, n, {
        value: r,
        enumerable: !a,
        configurable: !a,
        writable: !a
      }) : e[n] = r : (o("next", 0), o("throw", 1), o("return", 2));
    }, t(e, n, r, a);
  }
  function n(e) {
    return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, n(e);
  }
  function r(e, t) {
    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (!n) {
      if (Array.isArray(e) || (n = function (e, t) {
        if (e) {
          if ("string" == typeof e) return a(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(e, t) : void 0;
        }
      }(e)) || t && e && "number" == typeof e.length) {
        n && (e = n);
        var r = 0,
          l = function () {};
        return {
          s: l,
          n: function () {
            return r >= e.length ? {
              done: !0
            } : {
              done: !1,
              value: e[r++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: l
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      i = !0,
      u = !1;
    return {
      s: function () {
        n = n.call(e);
      },
      n: function () {
        var e = n.next();
        return i = e.done, e;
      },
      e: function (e) {
        u = !0, o = e;
      },
      f: function () {
        try {
          i || null == n.return || n.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function a(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function l(e) {
    return function (e) {
      if (Array.isArray(e)) return u(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    }(e) || i(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function o(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != n) {
        var r,
          a,
          l,
          o,
          i = [],
          u = !0,
          s = !1;
        try {
          if (l = (n = n.call(e)).next, 0 === t) {
            if (Object(n) !== n) return;
            u = !1;
          } else for (; !(u = (r = l.call(n)).done) && (i.push(r.value), i.length !== t); u = !0);
        } catch (e) {
          s = !0, a = e;
        } finally {
          try {
            if (!u && null != n.return && (o = n.return(), Object(o) !== o)) return;
          } finally {
            if (s) throw a;
          }
        }
        return i;
      }
    }(e, t) || i(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function i(e, t) {
    if (e) {
      if ("string" == typeof e) return u(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0;
    }
  }
  function u(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function s(e, t, n, r, a, l, o) {
    try {
      var i = e[l](o),
        u = i.value;
    } catch (e) {
      return void n(e);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, a);
  }
  function c(e) {
    return function () {
      var t = this,
        n = arguments;
      return new Promise(function (r, a) {
        var l = e.apply(t, n);
        function o(e) {
          s(l, r, a, o, i, "next", e);
        }
        function i(e) {
          s(l, r, a, o, i, "throw", e);
        }
        o(void 0);
      });
    };
  }
  function f(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function d(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? f(Object(n), !0).forEach(function (t) {
        p(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  function p(e, t, r) {
    return (t = function (e) {
      var t = function (e, t) {
        if ("object" != n(e) || !e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var a = r.call(e, t || "default");
          if ("object" != n(a)) return a;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      }(e, "string");
      return "symbol" == n(t) ? t : t + "";
    }(t)) in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = r, e;
  }
  System.register(["./jsx-runtime-legacy.js"], function (t, a) {
    var i, u, s, f, p, m, h, g, v, y, b, w, k, S, _, x, E, C, z, P, L, T, N, O, A, j, F, R, M, D, I, V, B, H, U, W, $, q, Q, X, K, G, Y, Z, J, ee, te, ne, re, ae, le, oe, ie, ue, se, ce, fe, de, pe, me, he, ge, ve, ye, be, we, ke, Se, _e, xe, Ee, Ce, ze, Pe, Le, Te, Ne, Oe, Ae, je, Fe, Re, Me, De, Ie, Ve, Be, He, Ue, We, $e, qe, Qe, Xe, Ke, Ge, Ye, Ze, Je, et, tt, nt, rt, at, lt, ot, it, ut, st, ct, ft, dt, pt, mt, ht, gt, vt, yt, bt, wt, kt, St, _t, xt, Et, Ct, zt, Pt, Lt, Tt, Nt, Ot, At, jt, Ft, Rt, Mt, Dt, It;
    function Vt() {
      return Vt = Object.assign ? Object.assign.bind() : function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }, Vt.apply(this, arguments);
    }
    function Bt(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = {
          mimeType: t.mimeType || null,
          onBeforeSend: t.onBeforeSend || Function.prototype,
          onSuccess: t.onSuccess || Function.prototype,
          onError: t.onError || Function.prototype,
          onComplete: t.onComplete || Function.prototype
        },
        r = Array.isArray(e) ? e : [e],
        a = Array.apply(null, Array(r.length)).map(function (e) {
          return null;
        });
      function l(e) {
        var t = "string" == typeof e,
          n = t && "<" === e.trim().charAt(0);
        return t && !n;
      }
      function o(e, t) {
        n.onError(e, r[t], t);
      }
      function i(e, t) {
        var l = n.onSuccess(e, r[t], t);
        e = !1 === l ? "" : l || e, a[t] = e, -1 === a.indexOf(null) && n.onComplete(a);
      }
      var u = document.createElement("a");
      r.forEach(function (e, t) {
        if (u.setAttribute("href", e), u.href = String(u.href), Boolean(document.all && !window.atob) && u.host.split(":")[0] !== location.host.split(":")[0]) {
          if (u.protocol === location.protocol) {
            var r = new XDomainRequest();
            r.open("GET", e), r.timeout = 0, r.onprogress = Function.prototype, r.ontimeout = Function.prototype, r.onload = function () {
              var e = r.responseText;
              l(e) ? i(e, t) : o(r, t);
            }, r.onerror = function (e) {
              o(r, t);
            }, setTimeout(function () {
              r.send();
            }, 0);
          } else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e, ")")), o(null, t);
        } else {
          var a = new XMLHttpRequest();
          a.open("GET", e), n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), n.onBeforeSend(a, e, t), a.onreadystatechange = function () {
            if (4 === a.readyState) {
              var e = a.responseText;
              a.status < 400 && l(e) || 0 === a.status && l(e) ? i(e, t) : o(a, t);
            }
          }, a.send();
        }
      });
    }
    function Ht(e) {
      var t = /\/\*[\s\S]+?\*\//g,
        n = /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g,
        r = {
          rootElement: e.rootElement || document,
          include: e.include || 'style,link[rel="stylesheet"]',
          exclude: e.exclude || null,
          filter: e.filter || null,
          skipDisabled: !1 !== e.skipDisabled,
          useCSSOM: e.useCSSOM || !1,
          onBeforeSend: e.onBeforeSend || Function.prototype,
          onSuccess: e.onSuccess || Function.prototype,
          onError: e.onError || Function.prototype,
          onComplete: e.onComplete || Function.prototype
        },
        a = Array.apply(null, r.rootElement.querySelectorAll(r.include)).filter(function (e) {
          return t = e, n = r.exclude, !(t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector).call(t, n);
          var t, n;
        }),
        l = Array.apply(null, Array(a.length)).map(function (e) {
          return null;
        });
      function o() {
        if (-1 === l.indexOf(null)) {
          l.reduce(function (e, t, n) {
            return "" === t && e.push(n), e;
          }, []).reverse().forEach(function (e) {
            return [a, l].forEach(function (t) {
              return t.splice(e, 1);
            });
          });
          var e = l.join("");
          r.onComplete(e, l, a);
        }
      }
      function i(e, t, n, a) {
        var i = r.onSuccess(e, n, a);
        s(e = void 0 !== i && !1 === Boolean(i) ? "" : i || e, n, a, function (e, a) {
          null === l[t] && (a.forEach(function (e) {
            return r.onError(e.xhr, n, e.url);
          }), !r.filter || r.filter.test(e) ? l[t] = e : l[t] = "", o());
        });
      }
      function u(e, r) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
          l = {};
        return l.rules = (e.replace(t, "").match(n) || []).filter(function (e) {
          return -1 === a.indexOf(e);
        }), l.urls = l.rules.map(function (e) {
          return e.replace(n, "$1");
        }), l.absoluteUrls = l.urls.map(function (e) {
          return Ut(e, r);
        }), l.absoluteRules = l.rules.map(function (e, t) {
          var n = l.urls[t],
            a = Ut(l.absoluteUrls[t], r);
          return e.replace(n, a);
        }), l;
      }
      function s(e, t, n, a) {
        var l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [],
          o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : [],
          i = u(e, n, o);
        i.rules.length ? Bt(i.absoluteUrls, {
          onBeforeSend: function (e, n, a) {
            r.onBeforeSend(e, t, n);
          },
          onSuccess: function (e, n, a) {
            var l = r.onSuccess(e, t, n),
              i = u(e = !1 === l ? "" : l || e, n, o);
            return i.rules.forEach(function (t, n) {
              e = e.replace(t, i.absoluteRules[n]);
            }), e;
          },
          onError: function (r, u, c) {
            l.push({
              xhr: r,
              url: u
            }), o.push(i.rules[c]), s(e, t, n, a, l, o);
          },
          onComplete: function (r) {
            r.forEach(function (t, n) {
              e = e.replace(i.rules[n], t);
            }), s(e, t, n, a, l, o);
          }
        }) : a(e, l);
      }
      a.length ? a.forEach(function (e, t) {
        var n = e.getAttribute("href"),
          a = e.getAttribute("rel"),
          u = "link" === e.nodeName.toLowerCase() && n && a && -1 !== a.toLowerCase().indexOf("stylesheet"),
          s = !1 !== r.skipDisabled && e.disabled,
          c = "style" === e.nodeName.toLowerCase();
        if (u && !s) {
          if (-1 !== n.indexOf("data:text/css")) {
            var f = decodeURIComponent(n.substring(n.indexOf(",") + 1));
            r.useCSSOM && (f = Array.apply(null, e.sheet.cssRules).map(function (e) {
              return e.cssText;
            }).join("")), i(f, t, e, location.href);
          } else Bt(n, {
            mimeType: "text/css",
            onBeforeSend: function (t, n, a) {
              r.onBeforeSend(t, e, n);
            },
            onSuccess: function (r, a, l) {
              i(r, t, e, Ut(n));
            },
            onError: function (n, a, i) {
              l[t] = "", r.onError(n, e, a), o();
            }
          });
        } else if (c && !s) {
          var d = e.textContent;
          r.useCSSOM && (d = Array.apply(null, e.sheet.cssRules).map(function (e) {
            return e.cssText;
          }).join("")), i(d, t, e, location.href);
        } else l[t] = "", o();
      }) : r.onComplete("", []);
    }
    function Ut(e, t) {
      var n = document.implementation.createHTMLDocument(""),
        r = n.createElement("base"),
        a = n.createElement("a");
      return n.head.appendChild(r), n.body.appendChild(a), r.href = t || document.baseURI || (document.querySelector("base") || {}).href || location.href, a.href = e, a.href;
    }
    function Wt(e, t, n) {
      e instanceof RegExp && (e = $t(e, n)), t instanceof RegExp && (t = $t(t, n));
      var r = qt(e, t, n);
      return r && {
        start: r[0],
        end: r[1],
        pre: n.slice(0, r[0]),
        body: n.slice(r[0] + e.length, r[1]),
        post: n.slice(r[1] + t.length)
      };
    }
    function $t(e, t) {
      var n = t.match(e);
      return n ? n[0] : null;
    }
    function qt(e, t, n) {
      var r,
        a,
        l,
        o,
        i,
        u = n.indexOf(e),
        s = n.indexOf(t, u + 1),
        c = u;
      if (u >= 0 && s > 0) {
        if (e === t) return [u, s];
        for (r = [], l = n.length; c >= 0 && !i;) c == u ? (r.push(c), u = n.indexOf(e, c + 1)) : 1 == r.length ? i = [r.pop(), s] : ((a = r.pop()) < l && (l = a, o = s), s = n.indexOf(t, c + 1)), c = u < s && u >= 0 ? u : s;
        r.length && (i = [l, o]);
      }
      return i;
    }
    function Qt(e) {
      var t = Vt({}, {
        preserveStatic: !0,
        removeComments: !1
      }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});
      function n(e) {
        throw new Error("CSS parse error: ".concat(e));
      }
      function r(t) {
        var n = t.exec(e);
        if (n) return e = e.slice(n[0].length), n;
      }
      function a() {
        return r(/^{\s*/);
      }
      function l() {
        return r(/^}/);
      }
      function o() {
        r(/^\s*/);
      }
      function i() {
        if (o(), "/" === e[0] && "*" === e[1]) {
          for (var t = 2; e[t] && ("*" !== e[t] || "/" !== e[t + 1]);) t++;
          if (!e[t]) return n("end of comment is missing");
          var r = e.slice(2, t);
          return e = e.slice(t + 2), {
            type: "comment",
            comment: r
          };
        }
      }
      function u() {
        for (var e, n = []; e = i();) n.push(e);
        return t.removeComments ? [] : n;
      }
      function s() {
        for (o(); "}" === e[0];) n("extra closing bracket");
        var t = r(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
        if (t) {
          var a,
            l = t[0].trim();
          /\/\*/.test(l) && (l = l.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, ""));
          var i = /["']\w*,\w*["']/.test(l);
          return i && (l = l.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (e) {
            return e.replace(/,/g, "‌");
          })), a = /,/.test(l) ? l.split(/\s*(?![^(]*\)),\s*/) : [l], i && (a = a.map(function (e) {
            return e.replace(/\u200C/g, ",");
          })), a;
        }
      }
      function c() {
        if ("@" === e[0]) return p();
        r(/^([;\s]*)+/);
        var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
          a = r(/^(\*?[-#/*\\\w.]+(\[[0-9a-z_-]+\])?)\s*/);
        if (a) {
          if (a = a[0].trim(), !r(/^:\s*/)) return n("property missing ':'");
          var l = r(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),
            o = {
              type: "declaration",
              property: a.replace(t, ""),
              value: l ? l[0].replace(t, "").trim() : ""
            };
          return r(/^[;\s]*/), o;
        }
      }
      function f() {
        if (!a()) return n("missing '{'");
        for (var e, t = u(); e = c();) t.push(e), t = t.concat(u());
        return l() ? t : n("missing '}'");
      }
      function d() {
        o();
        for (var e, t = []; e = r(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) t.push(e[1]), r(/^,\s*/);
        if (t.length) return {
          type: "keyframe",
          values: t,
          declarations: f()
        };
      }
      function p() {
        if (o(), "@" === e[0]) {
          var i = function () {
            var e = r(/^@(import|charset|namespace)\s*([^;]+);/);
            if (e) return {
              type: e[1],
              name: e[2].trim()
            };
          }() || function () {
            if (r(/^@font-face\s*/)) return {
              type: "font-face",
              declarations: f()
            };
          }() || function () {
            var e = r(/^@media([^{]+)*/);
            if (e) return {
              type: "media",
              media: (e[1] || "").trim(),
              rules: h()
            };
          }() || function () {
            var e = r(/^@([-\w]+)?keyframes\s*/);
            if (e) {
              var t = e[1];
              if (!(e = r(/^([-\w]+)\s*/))) return n("@keyframes missing name");
              var o,
                i = e[1];
              if (!a()) return n("@keyframes missing '{'");
              for (var s = u(); o = d();) s.push(o), s = s.concat(u());
              return l() ? {
                type: "keyframes",
                name: i,
                vendor: t,
                keyframes: s
              } : n("@keyframes missing '}'");
            }
          }() || function () {
            var e = r(/^@supports *([^{]+)/);
            if (e) return {
              type: "supports",
              supports: e[1].trim(),
              rules: h()
            };
          }() || function () {
            var e = r(/^@([-\w]+)?document *([^{]+)/);
            if (e) return {
              type: "document",
              document: e[2].trim(),
              vendor: e[1] ? e[1].trim() : null,
              rules: h()
            };
          }() || function () {
            var e = r(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
            if (e) return {
              type: "custom-media",
              name: e[1].trim(),
              media: e[2].trim()
            };
          }() || function () {
            if (r(/^@host\s*/)) return {
              type: "host",
              rules: h()
            };
          }() || function () {
            if (r(/^@page */)) return {
              type: "page",
              selectors: s() || [],
              declarations: f()
            };
          }() || function () {
            var e = r(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);
            if (e) return {
              type: "page-margin-box",
              name: "".concat(e[1], "-").concat(e[2]) + (e[3] ? "-".concat(e[3]) : ""),
              declarations: f()
            };
          }();
          if (i && !t.preserveStatic) {
            return (i.declarations ? i.declarations.some(function (e) {
              return /var\(/.test(e.value);
            }) : (i.keyframes || i.rules || []).some(function (e) {
              return (e.declarations || []).some(function (e) {
                return /var\(/.test(e.value);
              });
            })) ? i : {};
          }
          return i;
        }
      }
      function m() {
        if (!t.preserveStatic) {
          var r = D("{", "}", e);
          if (r) {
            var a = /:(?:root|host)(?![.:#(])/.test(r.pre) && /--\S*\s*:/.test(r.body),
              l = /var\(/.test(r.body);
            if (!a && !l) return e = e.slice(r.end + 1), {};
          }
        }
        var o = s() || [],
          i = t.preserveStatic ? f() : f().filter(function (e) {
            var t = o.some(function (e) {
                return /:(?:root|host)(?![.:#(])/.test(e);
              }) && /^--\S/.test(e.property),
              n = /var\(/.test(e.value);
            return t || n;
          });
        return o.length || n("selector missing"), {
          type: "rule",
          selectors: o,
          declarations: i
        };
      }
      function h(t) {
        if (!t && !a()) return n("missing '{'");
        for (var r, o = u(); e.length && (t || "}" !== e[0]) && (r = p() || m());) r.type && o.push(r), o = o.concat(u());
        return t || l() ? o : n("missing '}'");
      }
      return {
        type: "stylesheet",
        stylesheet: {
          rules: h(!0),
          errors: []
        }
      };
    }
    function Xt(e) {
      var t = Vt({}, {
          parseHost: !1,
          store: {},
          onWarning: function () {}
        }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}),
        n = new RegExp(":".concat(t.parseHost ? "host" : "root", "$"));
      return "string" == typeof e && (e = Qt(e, t)), e.stylesheet.rules.forEach(function (e) {
        "rule" === e.type && e.selectors.some(function (e) {
          return n.test(e);
        }) && e.declarations.forEach(function (e, n) {
          var r = e.property,
            a = e.value;
          r && 0 === r.indexOf("--") && (t.store[r] = a);
        });
      }), t.store;
    }
    function Kt(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 ? arguments[2] : void 0,
        r = {
          charset: function (e) {
            return "@charset " + e.name + ";";
          },
          comment: function (e) {
            return 0 === e.comment.indexOf("__CSSVARSPONYFILL") ? "/*" + e.comment + "*/" : "";
          },
          "custom-media": function (e) {
            return "@custom-media " + e.name + " " + e.media + ";";
          },
          declaration: function (e) {
            return e.property + ":" + e.value + ";";
          },
          document: function (e) {
            return "@" + (e.vendor || "") + "document " + e.document + "{" + a(e.rules) + "}";
          },
          "font-face": function (e) {
            return "@font-face{" + a(e.declarations) + "}";
          },
          host: function (e) {
            return "@host{" + a(e.rules) + "}";
          },
          import: function (e) {
            return "@import " + e.name + ";";
          },
          keyframe: function (e) {
            return e.values.join(",") + "{" + a(e.declarations) + "}";
          },
          keyframes: function (e) {
            return "@" + (e.vendor || "") + "keyframes " + e.name + "{" + a(e.keyframes) + "}";
          },
          media: function (e) {
            return "@media " + e.media + "{" + a(e.rules) + "}";
          },
          namespace: function (e) {
            return "@namespace " + e.name + ";";
          },
          page: function (e) {
            return "@page " + (e.selectors.length ? e.selectors.join(", ") : "") + "{" + a(e.declarations) + "}";
          },
          "page-margin-box": function (e) {
            return "@" + e.name + "{" + a(e.declarations) + "}";
          },
          rule: function (e) {
            var t = e.declarations;
            if (t.length) return e.selectors.join(",") + "{" + a(t) + "}";
          },
          supports: function (e) {
            return "@supports " + e.supports + "{" + a(e.rules) + "}";
          }
        };
      function a(e) {
        for (var a = "", l = 0; l < e.length; l++) {
          var o = e[l];
          n && n(o);
          var i = r[o.type](o);
          i && (a += i, i.length && o.selectors && (a += t));
        }
        return a;
      }
      return a(e.stylesheet.rules);
    }
    function Gt(e, t) {
      e.rules.forEach(function (n) {
        n.rules ? Gt(n, t) : n.keyframes ? n.keyframes.forEach(function (e) {
          "keyframe" === e.type && t(e.declarations, n);
        }) : n.declarations && t(n.declarations, e);
      });
    }
    function Yt(e) {
      var t = Vt({}, {
        preserveStatic: !0,
        preserveVars: !1,
        variables: {},
        onWarning: function () {}
      }, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});
      return "string" == typeof e && (e = Qt(e, t)), Gt(e.stylesheet, function (e, n) {
        for (var r = 0; r < e.length; r++) {
          var a = e[r],
            l = a.type,
            o = a.property,
            i = a.value;
          if ("declaration" === l) if (t.preserveVars || !o || 0 !== o.indexOf(I)) {
            if (-1 !== i.indexOf(V + "(")) {
              var u = Jt(i, t);
              u !== a.value && (u = Zt(u), t.preserveVars ? (e.splice(r, 0, {
                type: l,
                property: o,
                value: u
              }), r++) : a.value = u);
            }
          } else e.splice(r, 1), r--;
        }
      }), Kt(e);
    }
    function Zt(e) {
      return (e.match(/calc\(([^)]+)\)/g) || []).forEach(function (t) {
        var n = "calc".concat(t.split("calc").join(""));
        e = e.replace(t, n);
      }), e;
    }
    function Jt(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = arguments.length > 2 ? arguments[2] : void 0;
      if (-1 === e.indexOf("var(")) return e;
      var r = D("(", ")", e);
      return r ? "var" === r.pre.slice(-3) ? 0 === r.body.trim().length ? (t.onWarning("var() must contain a non-whitespace string"), e) : r.pre.slice(0, -3) + function (e) {
        var r = e.split(",")[0].replace(/[\s\n\t]/g, ""),
          a = (e.match(/(?:\s*,\s*){1}(.*)?/) || [])[1],
          l = Object.prototype.hasOwnProperty.call(t.variables, r) ? String(t.variables[r]) : void 0,
          o = l || (a ? String(a) : void 0),
          i = n || e;
        return l || t.onWarning('variable "'.concat(r, '" is undefined')), o && "undefined" !== o && o.length > 0 ? Jt(o, t, i) : "var(".concat(i, ")");
      }(r.body) + Jt(r.post, t) : r.pre + "(".concat(Jt(r.body, t), ")") + Jt(r.post, t) : (-1 !== e.indexOf("var(") && t.onWarning('missing closing ")" in the value "'.concat(e, '"')), e);
    }
    function en() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = "cssVars(): ",
        n = Vt({}, W, e);
      function r(e, r, a, l) {
        !n.silent && window.console && console.error("".concat(t).concat(e, "\n"), r), n.onError(e, r, a, l);
      }
      function a(e) {
        !n.silent && window.console && console.warn("".concat(t).concat(e)), n.onWarning(e);
      }
      function l(e) {
        n.onFinally(Boolean(e), H, nn() - n.__benchmark);
      }
      if (B) {
        if (n.watch) return n.watch = W.watch, function (e) {
          function t(e) {
            var t = n(e) && e.hasAttribute("disabled"),
              r = (e.sheet || {}).disabled;
            return t || r;
          }
          function n(e) {
            return "link" === e.nodeName.toLowerCase() && -1 !== (e.getAttribute("rel") || "").indexOf("stylesheet");
          }
          function r(e) {
            return "style" === e.nodeName.toLowerCase();
          }
          function a(r) {
            var a = !1;
            if ("attributes" === r.type && n(r.target) && !t(r.target)) {
              var l = "disabled" === r.attributeName,
                o = "href" === r.attributeName,
                i = "skip" === r.target.getAttribute("data-cssvars"),
                u = "src" === r.target.getAttribute("data-cssvars");
              l ? a = !i && !u : o && (i ? r.target.setAttribute("data-cssvars", "") : u && rn(e.rootElement, !0), a = !0);
            }
            return a;
          }
          function l(e) {
            var t = !1;
            if ("childList" === e.type) {
              var n = r(e.target),
                a = "out" === e.target.getAttribute("data-cssvars");
              t = n && !a;
            }
            return t;
          }
          function o(e) {
            var a = !1;
            return "childList" === e.type && (a = [].slice.call(e.addedNodes).some(function (e) {
              var a = 1 === e.nodeType && e.hasAttribute("data-cssvars"),
                l = r(e) && $.cssVars.test(e.textContent);
              return !a && (n(e) || l) && !t(e);
            })), a;
          }
          function i(t) {
            var n = !1;
            return "childList" === t.type && (n = [].slice.call(t.removedNodes).some(function (t) {
              var n = 1 === t.nodeType,
                r = n && "out" === t.getAttribute("data-cssvars"),
                a = n && "src" === t.getAttribute("data-cssvars"),
                l = a;
              if (a || r) {
                var o = t.getAttribute("data-cssvars-group"),
                  i = e.rootElement.querySelector('[data-cssvars-group="'.concat(o, '"]'));
                a && rn(e.rootElement, !0), i && i.parentNode.removeChild(i);
              }
              return l;
            })), n;
          }
          if (!window.MutationObserver) return;
          X && (X.disconnect(), X = null);
          X = new MutationObserver(function (t) {
            t.some(function (e) {
              return a(e) || l(e) || o(e) || i(e);
            }) && en(e);
          }), X.observe(document.documentElement, {
            attributes: !0,
            attributeFilter: ["disabled", "href"],
            childList: !0,
            subtree: !0
          });
        }(n), void en(n);
        if (!1 === n.watch && X && (X.disconnect(), X = null), !n.__benchmark) {
          if (Q === n.rootElement) return void function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
            clearTimeout(G), G = setTimeout(function () {
              e.__benchmark = null, en(e);
            }, t);
          }(e);
          var o = [].slice.call(n.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])'));
          n.__benchmark = nn(), n.exclude = [X ? '[data-cssvars]:not([data-cssvars=""])' : '[data-cssvars="out"]', "link[disabled]:not([data-cssvars])", n.exclude].filter(function (e) {
            return e;
          }).join(","), n.variables = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = /^-{2}/;
            return Object.keys(e).reduce(function (n, r) {
              return n[t.test(r) ? r : "--".concat(r.replace(/^-+/, ""))] = e[r], n;
            }, {});
          }(n.variables), o.forEach(function (e) {
            var t = "style" === e.nodeName.toLowerCase() && e.__cssVars.text,
              n = t && e.textContent !== e.__cssVars.text;
            t && n && (e.sheet && (e.sheet.disabled = !1), e.setAttribute("data-cssvars", ""));
          }), X || ([].slice.call(n.rootElement.querySelectorAll('[data-cssvars="out"]')).forEach(function (e) {
            var t = e.getAttribute("data-cssvars-group");
            t && n.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t, '"]')) || e.parentNode.removeChild(e);
          }), K && o.length < K && (K = o.length, q.dom = {}));
        }
        if ("loading" !== document.readyState) {
          if (H && n.onlyLegacy) {
            var i = !1;
            if (n.updateDOM) {
              var u = n.rootElement.host || (n.rootElement === document ? document.documentElement : n.rootElement);
              Object.keys(n.variables).forEach(function (e) {
                var t = n.variables[e];
                i = i || t !== getComputedStyle(u).getPropertyValue(e), u.style.setProperty(e, t);
              });
            }
            l(i);
          } else !Y && (n.shadowDOM || n.rootElement.shadowRoot || n.rootElement.host) ? Ht({
            rootElement: W.rootElement,
            include: W.include,
            exclude: n.exclude,
            skipDisabled: !1,
            onSuccess: function (e, t, n) {
              return !((t.sheet || {}).disabled && !t.__cssVars) && ((e = ((e = e.replace($.cssComments, "").replace($.cssMediaQueries, "")).match($.cssVarDeclRules) || []).join("")) || !1);
            },
            onComplete: function (e, t, r) {
              Xt(e, {
                store: q.dom,
                onWarning: a
              }), Y = !0, en(n);
            }
          }) : (Q = n.rootElement, Ht({
            rootElement: n.rootElement,
            include: n.include,
            exclude: n.exclude,
            skipDisabled: !1,
            onBeforeSend: n.onBeforeSend,
            onError: function (e, t, n) {
              var a = e.responseURL || tn(n, location.href),
                l = e.statusText ? "(".concat(e.statusText, ")") : "Unspecified Error" + (0 === e.status ? " (possibly CORS related)" : "");
              r("CSS XHR Error: ".concat(a, " ").concat(e.status, " ").concat(l), t, e, a);
            },
            onSuccess: function (e, t, r) {
              if ((t.sheet || {}).disabled && !t.__cssVars) return !1;
              var a = "link" === t.nodeName.toLowerCase(),
                l = "style" === t.nodeName.toLowerCase() && e !== t.textContent,
                o = n.onSuccess(e, t, r);
              return e = void 0 !== o && !1 === Boolean(o) ? "" : o || e, n.updateURLs && (a || l) && (e = function (e, t) {
                return (e.replace($.cssComments, "").match($.cssUrls) || []).forEach(function (n) {
                  var r = n.replace($.cssUrls, "$1"),
                    a = tn(r, t);
                  e = e.replace(n, n.replace(r, a));
                }), e;
              }(e, r)), e;
            },
            onComplete: function (e, t) {
              var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                i = Vt({}, q.dom, q.user);
              if (q.job = {}, o.forEach(function (e, l) {
                var o = t[l];
                if (e.__cssVars = e.__cssVars || {}, e.__cssVars.text = o, $.cssVars.test(o)) try {
                  var i = Qt(o, {
                    preserveStatic: n.preserveStatic,
                    removeComments: !0
                  });
                  Xt(i, {
                    parseHost: Boolean(n.rootElement.host),
                    store: q.dom,
                    onWarning: a
                  }), e.__cssVars.tree = i;
                } catch (u) {
                  r(u.message, e);
                }
              }), Vt(q.job, q.dom), n.updateDOM ? (Vt(q.user, n.variables), Vt(q.job, q.user)) : (Vt(q.job, q.user, n.variables), Vt(i, n.variables)), U.job > 0 && Boolean(Object.keys(q.job).length > Object.keys(i).length || Boolean(Object.keys(i).length && Object.keys(q.job).some(function (e) {
                return q.job[e] !== i[e];
              })))) rn(n.rootElement), en(n);else {
                var u = [],
                  s = [],
                  c = !1;
                if (n.updateDOM && U.job++, o.forEach(function (e, l) {
                  var o = !e.__cssVars.tree;
                  if (e.__cssVars.tree) try {
                    Yt(e.__cssVars.tree, Vt({}, n, {
                      variables: q.job,
                      onWarning: a
                    }));
                    var i = Kt(e.__cssVars.tree);
                    if (n.updateDOM) {
                      var f = t[l],
                        d = $.cssVarFunc.test(f);
                      if (e.getAttribute("data-cssvars") || e.setAttribute("data-cssvars", "src"), i.length && d) {
                        var p = e.getAttribute("data-cssvars-group") || ++U.group,
                          m = i.replace(/\s/g, ""),
                          h = n.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(p, '"]')) || document.createElement("style");
                        c = c || $.cssKeyframes.test(i), n.preserveStatic && e.sheet && (e.sheet.disabled = !0), h.hasAttribute("data-cssvars") || h.setAttribute("data-cssvars", "out"), m === e.textContent.replace(/\s/g, "") ? (o = !0, h && h.parentNode && (e.removeAttribute("data-cssvars-group"), h.parentNode.removeChild(h))) : m !== h.textContent.replace(/\s/g, "") && ([e, h].forEach(function (e) {
                          e.setAttribute("data-cssvars-job", U.job), e.setAttribute("data-cssvars-group", p);
                        }), h.textContent = i, u.push(i), s.push(h), h.parentNode || e.parentNode.insertBefore(h, e.nextSibling));
                      }
                    } else e.textContent.replace(/\s/g, "") !== i && u.push(i);
                  } catch (g) {
                    r(g.message, e);
                  }
                  o && e.setAttribute("data-cssvars", "skip"), e.hasAttribute("data-cssvars-job") || e.setAttribute("data-cssvars-job", U.job);
                }), K = n.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length, n.shadowDOM) for (var f, d = [].concat(n.rootElement).concat([].slice.call(n.rootElement.querySelectorAll("*"))), p = 0; f = d[p]; ++p) f.shadowRoot && f.shadowRoot.querySelector("style") && en(Vt({}, n, {
                  rootElement: f.shadowRoot
                }));
                n.updateDOM && c && function (e) {
                  var t = ["animation-name", "-moz-animation-name", "-webkit-animation-name"].filter(function (e) {
                    return getComputedStyle(document.body)[e];
                  })[0];
                  if (t) {
                    for (var n = [].slice.call(e.querySelectorAll("*")), r = [], a = "__CSSVARSPONYFILL-KEYFRAMES__", l = 0, o = n.length; l < o; l++) {
                      var i = n[l];
                      "none" !== getComputedStyle(i)[t] && (i.style[t] += a, r.push(i));
                    }
                    document.body.offsetHeight;
                    for (var u = 0, s = r.length; u < s; u++) {
                      var c = r[u].style;
                      c[t] = c[t].replace(a, "");
                    }
                  }
                }(n.rootElement), Q = !1, n.onComplete(u.join(""), s, JSON.parse(JSON.stringify(q.job)), nn() - n.__benchmark), l(s.length);
              }
            }
          }));
        } else document.addEventListener("DOMContentLoaded", function t(n) {
          en(e), document.removeEventListener("DOMContentLoaded", t);
        });
      }
    }
    function tn(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href,
        n = document.implementation.createHTMLDocument(""),
        r = n.createElement("base"),
        a = n.createElement("a");
      return n.head.appendChild(r), n.body.appendChild(a), r.href = t, a.href = e, a.href;
    }
    function nn() {
      return B && (window.performance || {}).now ? window.performance.now() : new Date().getTime();
    }
    function rn(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      [].slice.call(e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]')).forEach(function (e) {
        return e.setAttribute("data-cssvars", "");
      }), t && (q.dom = {});
    }
    function an(e) {
      return qe.createElement(T, d({
        flushSync: Qe.flushSync
      }, e));
    }
    function ln(e, t) {
      var n = Xe[t];
      return !!n && (n.includes(e.key) || n.includes(e.code) || n.includes(String(e.keyCode)));
    }
    function on() {
      var e;
      return "undefined" != typeof tizen && null !== (e = tizen) && void 0 !== e && e.application ? "tizen" : "undefined" != typeof webOS || navigator.userAgent.toLowerCase().includes("webos") ? "webos" : navigator.userAgent.toLowerCase().includes("hisense") ? "hisense" : "web";
    }
    function un() {
      switch (on()) {
        case "tizen":
          try {
            tizen.application.getCurrentApplication().exit();
          } catch (n) {}
          break;
        case "webos":
          try {
            var e, t;
            null === (e = (t = webOS).platformBack) || void 0 === e || e.call(t);
          } catch (r) {}
      }
    }
    function sn() {
      return (sn = c(e().m(function t(n) {
        var r, a, l;
        return e().w(function (e) {
          for (;;) switch (e.p = e.n) {
            case 0:
              if (r = on(), !("wakeLock" in navigator)) {
                e.n = 7;
                break;
              }
              if (e.p = 1, !n || Ke) {
                e.n = 3;
                break;
              }
              return e.n = 2, navigator.wakeLock.request("screen");
            case 2:
              Ke = e.v, e.n = 5;
              break;
            case 3:
              if (n || !Ke) {
                e.n = 5;
                break;
              }
              return e.n = 4, Ke.release();
            case 4:
              Ke = null;
            case 5:
              e.n = 7;
              break;
            case 6:
              e.p = 6, l = e.v, console.warn("WakeLock API error:", l);
            case 7:
              if ("tizen" === r) try {
                n ? tizen.power.request("SCREEN", "SCREEN_NORMAL") : tizen.power.release("SCREEN");
              } catch (t) {} else if ("webos" === r) try {
                "undefined" != typeof webOS && webOS.setWindowProperty && webOS.setWindowProperty("keepAlive", n ? "true" : "false"), (a = window.webOSSystem || window.PalmSystem) && a.keepAlive && a.keepAlive(n);
              } catch (o) {}
            case 8:
              return e.a(2);
          }
        }, t, null, [[1, 6]]);
      }))).apply(this, arguments);
    }
    function cn(e) {
      var t = w(),
        n = p(),
        r = (0, qe.useRef)(""),
        a = (0, qe.useCallback)(function (a) {
          var l;
          ln(a, "Back") && (a.preventDefault(), a.stopPropagation(), l = n.pathname, Ge.some(function (e) {
            return l === e || l === e + "/";
          }) ? e ? (r.current = m(), e(r.current)) : un() : n.pathname.startsWith("/programas/") ? t("/programas", {
            replace: !0
          }) : t(-1));
        }, [t, e, n.pathname]);
      return (0, qe.useEffect)(function () {
        return window.addEventListener("keydown", a), function () {
          return window.removeEventListener("keydown", a);
        };
      }, [a]), {
        restoreFocus: (0, qe.useCallback)(function () {
          r.current && S(r.current);
        }, [])
      };
    }
    function fn(e) {
      ot = d(d({}, ot), e), it.forEach(function (e) {
        return e();
      });
    }
    function dn() {
      return d(d({}, ot), ut);
    }
    function pn(e) {
      return it.add(e), function () {
        return it.delete(e);
      };
    }
    function mn(e) {
      return (0, qe.useSyncExternalStore)(pn, function () {
        return e(dn());
      });
    }
    function hn() {
      return d(d({}, st), ft);
    }
    function gn(e) {
      return ct.add(e), function () {
        return ct.delete(e);
      };
    }
    function vn(e) {
      return (0, qe.useSyncExternalStore)(gn, function () {
        return e(hn());
      });
    }
    function yn(e) {
      return (0, dt.jsx)("svg", d(d({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 45 45.005",
        fill: "none"
      }, e), {}, {
        children: (0, dt.jsx)("path", {
          d: "M44.291,19.575l0,0L25.929,1.214a4.143,4.143,0,0,0-5.859,0L1.721,19.562l-.019.019A4.141,4.141,0,0,0,4.459,26.64c.043,0,.085.006.128.006h.731v13.51A4.855,4.855,0,0,0,10.168,45H17.35a1.319,1.319,0,0,0,1.318-1.318V33.094a2.215,2.215,0,0,1,2.213-2.212h4.236a2.215,2.215,0,0,1,2.212,2.212V43.686A1.319,1.319,0,0,0,28.649,45h7.182a4.854,4.854,0,0,0,4.849-4.849V26.646h.678a4.144,4.144,0,0,0,2.932-7.071Zm-1.867,3.993a1.5,1.5,0,0,1-1.065.442h-2a1.318,1.318,0,0,0-1.318,1.318V40.156a2.215,2.215,0,0,1-2.212,2.212H29.967V33.094a4.855,4.855,0,0,0-4.849-4.849H20.882a4.855,4.855,0,0,0-4.85,4.849v9.273H10.168a2.215,2.215,0,0,1-2.212-2.212V25.327a1.318,1.318,0,0,0-1.318-1.318H4.675l-.062,0a1.5,1.5,0,0,1-1.037-2.569h0L21.935,3.078a1.505,1.505,0,0,1,2.13,0L42.418,21.431l.009.008A1.509,1.509,0,0,1,42.424,23.567Zm0,0",
          transform: "translate(-0.499)",
          fill: "currentColor"
        })
      }));
    }
    function bn(e) {
      return (0, dt.jsx)("svg", d(d({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 35 35",
        fill: "none"
      }, e), {}, {
        children: (0, dt.jsx)("path", {
          d: "M23.6709 20.5622C23.863 20.7107 24.1076 20.8592 24.2998 21.0513C27.4443 24.1697 30.5714 27.2967 33.7159 30.4151C34.3099 31.0003 34.6243 31.6816 34.4846 32.5114C34.3361 33.3849 33.8295 33.9963 32.9822 34.2846C32.1087 34.5816 31.3226 34.3807 30.6675 33.7518C29.628 32.7473 28.6148 31.7165 27.5928 30.6946C25.2431 28.3536 22.8935 26.0127 20.5263 23.6543C17.1198 25.9079 13.4424 26.5805 9.503 25.5061C6.41961 24.6588 3.97386 22.8682 2.19195 20.2215C-1.38059 14.8933 -0.507107 7.68706 4.20096 3.44194C9.03132 -0.916732 16.2201 -1.15257 21.1814 2.8305C26.2127 6.87472 27.8549 14.3605 23.6709 20.5534V20.5622ZM23.7408 13.0328C23.7582 7.15424 18.9715 2.35009 13.093 2.33262C7.21447 2.31515 2.36665 7.06689 2.34044 12.8668C2.31424 18.8502 7.08345 23.6368 13.0668 23.6543C18.9104 23.663 23.7233 18.8764 23.7408 13.0328Z",
          fill: "currentColor"
        })
      }));
    }
    function wn(e) {
      return (0, dt.jsx)("svg", d(d({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 43.47 34",
        fill: "none"
      }, e), {}, {
        children: (0, dt.jsxs)("g", {
          transform: "translate(1 1)",
          children: [(0, dt.jsx)("path", {
            d: "M56.6,67.566V45.8L68.067,56.683Z",
            transform: "translate(-39.321 -40.683)",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "10",
            strokeWidth: "2"
          }), (0, dt.jsx)("path", {
            d: "M53.189,59H19.114A3.1,3.1,0,0,1,16,55.886V30.114A3.1,3.1,0,0,1,19.114,27H54.357a3.1,3.1,0,0,1,3.114,3.114v23.7",
            transform: "translate(-16 -27)",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: "10",
            strokeWidth: "2"
          })]
        })
      }));
    }
    function kn(e) {
      return (0, dt.jsxs)("svg", d(d({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 41.47 44.668",
        fill: "none"
      }, e), {}, {
        children: [(0, dt.jsx)("defs", {
          children: (0, dt.jsx)("clipPath", {
            id: "sidebar-live-clip",
            children: (0, dt.jsx)("rect", {
              width: "41.47",
              height: "44.668",
              fill: "currentColor"
            })
          })
        }), (0, dt.jsx)("g", {
          transform: "translate(0 0)",
          children: (0, dt.jsx)("g", {
            transform: "translate(0 0)",
            clipPath: "url(#sidebar-live-clip)",
            children: (0, dt.jsx)("path", {
              d: "M27.115,25.528a1.675,1.675,0,0,1-.8,1.436l-7.975,4.785a1.2,1.2,0,0,1-.8.159,1.438,1.438,0,0,1-.8-.159,1.675,1.675,0,0,1-.8-1.436v-9.57a1.675,1.675,0,0,1,.8-1.436,1.449,1.449,0,0,1,1.6,0l7.975,4.785a1.675,1.675,0,0,1,.8,1.436M41.47,20.743v9.57A14.3,14.3,0,0,1,27.115,44.668H14.355A14.3,14.3,0,0,1,0,30.313v-9.57c0-7.5,5.9-12.76,14.355-12.76h3.031L13.079,2.56A1.56,1.56,0,0,1,13.4.327a1.56,1.56,0,0,1,2.233.319l5.1,6.38,5.1-6.38A1.715,1.715,0,0,1,28.072.327a1.715,1.715,0,0,1,.319,2.233L24.085,7.983h3.031c8.454,0,14.355,5.264,14.355,12.76m-3.19,0c0-6.54-5.583-9.57-11.165-9.57H14.355c-5.583,0-11.165,3.031-11.165,9.57v9.57A11.1,11.1,0,0,0,14.355,41.478h12.76A11.1,11.1,0,0,0,38.28,30.313Z",
              transform: "translate(0 0.001)",
              fill: "currentColor"
            })
          })
        })]
      }));
    }
    function Sn(e) {
      return (0, dt.jsx)("svg", d(d({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 32 24",
        fill: "none"
      }, e), {}, {
        children: (0, dt.jsx)("path", {
          d: "M3.19997 19.2C4.08363 19.2 4.8 19.9163 4.8 20.8V22.4C4.8 23.2836 4.08363 24 3.19997 24H1.59999C0.71633 24 0 23.2836 0 22.4V20.8C0 19.9163 0.71633 19.2 1.59999 19.2H3.19997ZM30.4001 20.0011C31.2838 20.0011 32 20.7175 32 21.6012C32 22.4848 31.2836 23.2012 30.3999 23.2011L9.59992 23.2C8.71626 23.1999 7.99993 22.4836 7.99998 21.5999C8.00002 20.7163 8.71641 19.9999 9.60006 20L30.4001 20.0011ZM3.19997 9.6C4.08363 9.6 4.8 10.3163 4.8 11.2V12.8C4.8 13.6836 4.08363 14.4 3.19997 14.4H1.59999C0.71633 14.4 0 13.6836 0 12.8V11.2C0 10.3163 0.71633 9.6 1.59999 9.6H3.19997ZM30.4001 10.4013C31.2838 10.4013 32 11.1177 32 12.0014C31.9999 12.885 31.2836 13.6013 30.3999 13.6012L9.59992 13.6C8.71627 13.5999 7.99993 12.8836 7.99998 11.9999C8.00003 11.1163 8.71645 10.3999 9.6001 10.4L30.4001 10.4013ZM3.19997 0C4.08363 0 4.8 0.716329 4.8 1.59998V3.19997C4.8 4.08362 4.08363 4.8 3.19997 4.8H1.59999C0.71633 4.8 0 4.08362 0 3.19997V1.59998C0 0.716329 0.71633 0 1.59999 0H3.19997ZM30.4001 0.801234C31.2838 0.801287 32 1.51766 32 2.40131C31.9999 3.28497 31.2836 4.0013 30.3999 4.00125L9.59992 3.99998C8.71626 3.99993 7.99993 3.28355 7.99998 2.39991C8.00003 1.51625 8.71645 0.799916 9.6001 0.799969L30.4001 0.801234Z",
          fill: "currentColor"
        })
      }));
    }
    function _n(e) {
      return (0, dt.jsx)("svg", d(d({
        xmlns: "http://www.w3.org/2000/svg",
        width: 41,
        height: 41,
        viewBox: "0 0 41 41"
      }, e), {}, {
        children: (0, dt.jsx)("path", {
          id: "usuario",
          d: "M35,6A20.5,20.5,0,0,0,6,35,20.5,20.5,0,0,0,35,6ZM10.277,35.425a10.38,10.38,0,0,1,20.446,0,18.058,18.058,0,0,1-20.446,0Zm3.7-17.5A6.518,6.518,0,1,1,20.5,24.445,6.525,6.525,0,0,1,13.982,17.927ZM32.8,33.759A12.8,12.8,0,0,0,25.361,25.4a8.921,8.921,0,1,0-9.721,0A12.8,12.8,0,0,0,8.2,33.759a18.1,18.1,0,1,1,24.607,0Zm0,0",
          fill: "currentColor"
        })
      }));
    }
    function xn(e) {
      var t = e.name,
        n = e.size,
        r = void 0 === n ? 48 : n,
        a = pt[t];
      return a ? (0, dt.jsx)(a, {
        width: r,
        height: r
      }) : null;
    }
    function En(e) {
      var t = e.item,
        n = e.isExpanded,
        r = e.prevFocusKey,
        a = e.nextFocusKey,
        l = e.onItemFocus,
        o = e.onItemBlur,
        i = e.onCollapse,
        u = w(),
        s = p().pathname.startsWith(t.path),
        c = P({
          focusKey: t.id,
          onEnterPress: function () {
            u(t.path, {
              replace: !0
            }), i(), S(tt);
          },
          onFocus: l,
          onBlur: o,
          onArrowPress: function (e) {
            return "right" === e ? (i(), S(tt), !1) : "left" !== e && ("up" === e && r ? (S(r), !1) : !("down" !== e || !a) && (S(a), !1));
          }
        }),
        f = c.ref,
        d = c.focused;
      return (0, dt.jsx)("li", {
        ref: f,
        className: [mt.item, d && mt.focused, s && mt.active, n && mt.expanded].filter(Boolean).join(" "),
        onClick: function () {
          u(t.path, {
            replace: !0
          }), i(), S(tt);
        },
        children: (0, dt.jsxs)("div", {
          className: mt.itemInner,
          children: [(0, dt.jsx)("span", {
            className: mt.iconWrapper,
            children: (0, dt.jsx)(xn, {
              name: t.icon,
              size: 44
            })
          }), (0, dt.jsx)("span", {
            className: mt.label,
            children: t.title
          })]
        })
      });
    }
    function Cn(e) {
      var t = e.profile,
        n = e.avatarUrl,
        r = e.isExpanded,
        a = e.prevFocusKey,
        l = e.onItemFocus,
        o = e.onItemBlur,
        i = e.onCollapse,
        u = w(),
        s = function () {
          u("/mi-latina", {
            replace: !0
          }), i(), S(tt);
        },
        c = P({
          focusKey: "sidebar-profile",
          onEnterPress: s,
          onFocus: l,
          onBlur: o,
          onArrowPress: function (e) {
            return "right" === e ? (i(), S(tt), !1) : "left" !== e && !("up" !== e || !a) && (S(a), !1);
          }
        }),
        f = c.ref,
        d = c.focused;
      return (0, dt.jsx)("li", {
        ref: f,
        className: [ht.profileItem, d && ht.profileItemFocused, r && ht.profileItemExpanded].filter(Boolean).join(" "),
        onClick: s,
        children: (0, dt.jsxs)("div", {
          className: ht.profileItemInner,
          children: [(0, dt.jsx)("span", {
            className: ht.profileAvatar,
            children: n ? (0, dt.jsx)("img", {
              src: n,
              alt: t.name_perfil,
              className: ht.profileAvatarImg,
              draggable: !1,
              decoding: "async"
            }) : (0, dt.jsx)("span", {
              className: ht.profileAvatarInitial,
              children: t.name_perfil.charAt(0).toUpperCase()
            })
          }), (0, dt.jsx)("span", {
            className: ht.profileLabel,
            children: "Mi Latina"
          })]
        })
      });
    }
    function zn() {
      var e,
        t,
        n,
        r,
        a = mn(function (e) {
          return e.isAuthenticated;
        }),
        i = mn(function (e) {
          return e.activeProfile;
        }),
        u = vn(function (e) {
          var t;
          return null === (t = e.config) || void 0 === t ? void 0 : t.logo;
        }),
        s = o((0, qe.useState)(!1), 2),
        c = s[0],
        f = s[1],
        d = o((0, qe.useState)(!1), 2),
        p = d[0],
        m = d[1],
        g = c || p,
        v = (0, qe.useMemo)(function () {
          return [].concat(l(Ze), a ? l(Je) : [et]);
        }, [a]),
        y = P({
          focusKey: Ye,
          saveLastFocusedChild: !0,
          trackChildren: !0,
          isFocusBoundary: !1
        }),
        b = y.ref,
        w = y.focusKey,
        k = (0, qe.useCallback)(function () {
          f(!0);
        }, []),
        S = (0, qe.useCallback)(function () {
          f(!1);
        }, []),
        _ = (0, qe.useCallback)(function () {
          m(!0);
        }, []),
        x = (0, qe.useCallback)(function () {
          m(!1);
        }, []),
        E = (0, qe.useCallback)(function () {
          f(!1), m(!1);
        }, []),
        C = [ht.container, g && ht.expanded].filter(Boolean).join(" ");
      return (0, dt.jsx)(h.Provider, {
        value: w,
        children: (0, dt.jsxs)("nav", {
          ref: b,
          className: C,
          onMouseEnter: _,
          onMouseLeave: x,
          children: [(0, dt.jsx)("div", {
            className: ht.backdrop
          }), (0, dt.jsx)("img", {
            src: u || "data:image/svg+xml,%3csvg%20width='51'%20height='77'%20viewBox='0%200%2051%2077'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1449_856)'%3e%3cpath%20d='M51.0001%2035.2505H22.2632V40.9285H51.0001V35.2505Z'%20fill='%23FF1376'/%3e%3cpath%20d='M36.6268%2077C44.5503%2077%2050.9952%2070.5275%2050.9952%2062.57V60.6611H45.3414V62.57C45.3414%2067.3953%2041.4315%2071.322%2036.6268%2071.322C31.822%2071.322%2027.9121%2067.3953%2027.9121%2062.57V60.6611H22.2583V62.57C22.2583%2070.5275%2028.7033%2077%2036.6268%2077Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9954%2048.1399H39.4346V53.8179H50.9954V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M33.824%2048.1399H22.2632V53.8179H33.824V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9931%2040.9261V35.2504L33.8242%2022.2544V28.7028L49.9776%2040.9261H50.9931Z'%20fill='%23FF1376'/%3e%3cpath%20d='M0%200V28.8505L17.1713%2040.9381V28.8505H28.7297V0H0ZM20.3165%2022.2544H16.3463V16.8597C16.3463%2016.4261%2016.2185%2016.087%2015.9604%2015.8399C15.7023%2015.5928%2015.3574%2015.4693%2014.9281%2015.4693C14.4987%2015.4693%2014.1369%2015.5928%2013.8861%2015.8399C13.6352%2016.087%2013.5098%2016.4261%2013.5098%2016.8597V22.2544H9.53959V16.8597C9.53959%2016.4261%209.41175%2016.087%209.15366%2015.8399C8.89557%2015.5928%208.55306%2015.4693%208.12131%2015.4693C7.68956%2015.4693%207.33016%2015.5928%207.07931%2015.8399C6.82846%2016.087%206.70304%2016.4261%206.70304%2016.8597V22.2544H2.71354V12.0804H6.70062V13.4514C6.98766%2013.0178%207.38082%2012.669%207.8777%2012.405C8.37457%2012.1409%208.95829%2012.0077%209.62883%2012.0077C10.3597%2012.0077%2011.0061%2012.1676%2011.5681%2012.4849C12.1301%2012.8047%2012.5812%2013.2504%2012.9164%2013.8293C13.2879%2013.3013%2013.7606%2012.8652%2014.3347%2012.5213C14.9088%2012.1773%2015.5431%2012.0077%2016.2378%2012.0077C17.5306%2012.0077%2018.5341%2012.3977%2019.2456%2013.1801C19.9572%2013.9626%2020.3141%2015.0211%2020.3141%2016.3559V22.2544H20.3165ZM26.0162%209.939H22.0411L26.0162%2012.2112V22.2544H22.0411V7.16296H26.0162V9.939Z'%20fill='%23FAE24B'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1449_856'%3e%3crect%20width='51'%20height='77'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
            alt: "Logo",
            className: ht.logo
          }), (0, dt.jsx)("div", {
            className: ht.spacer
          }), (0, dt.jsxs)("ul", {
            className: ht.navList,
            children: [v.map(function (e, t) {
              return (0, dt.jsx)(En, {
                item: e,
                isExpanded: g,
                prevFocusKey: t > 0 ? v[t - 1].id : null,
                nextFocusKey: t < v.length - 1 ? v[t + 1].id : a && i ? "sidebar-profile" : null,
                onItemFocus: k,
                onItemBlur: S,
                onCollapse: E
              }, e.id);
            }), a && i && (0, dt.jsx)(Cn, {
              profile: i,
              avatarUrl: (t = i, Array.isArray(t.images) ? null : (null === (n = t.images) || void 0 === n ? void 0 : n.medium) || (null === (r = t.images) || void 0 === r ? void 0 : r.default) || null),
              isExpanded: g,
              prevFocusKey: (null === (e = v[v.length - 1]) || void 0 === e ? void 0 : e.id) || null,
              onItemFocus: k,
              onItemBlur: S,
              onCollapse: E
            })]
          })]
        })
      });
    }
    function Pn(e) {
      var t = e.text,
        n = e.focusKey,
        r = e.onClick,
        a = P({
          focusKey: n,
          onEnterPress: r
        }),
        l = a.ref,
        o = a.focused;
      return (0, dt.jsx)("button", {
        ref: l,
        className: [gt.btn, o && gt.focused].filter(Boolean).join(" "),
        onClick: r,
        children: t
      });
    }
    function Ln(e) {
      var t = e.visible,
        n = e.onConfirm,
        r = e.onCancel,
        a = P({
          isFocusBoundary: !0,
          focusKey: "EXIT-MODAL"
        }),
        l = a.ref,
        o = a.focusKey;
      (0, qe.useEffect)(function () {
        t && S("EXIT-MODAL-NO");
      }, [t]);
      var i = [gt.overlay, !t && gt.hidden].filter(Boolean).join(" ");
      return (0, dt.jsx)(h.Provider, {
        value: o,
        children: (0, dt.jsx)("div", {
          ref: l,
          className: i,
          children: (0, dt.jsxs)("div", {
            className: gt.content,
            children: [(0, dt.jsx)("p", {
              className: gt.title,
              children: "¿Estás seguro que deseas salir de la aplicación?"
            }), (0, dt.jsxs)("div", {
              className: gt.buttons,
              children: [(0, dt.jsx)(Pn, {
                text: "Sí",
                focusKey: "EXIT-MODAL-YES",
                onClick: n
              }), (0, dt.jsx)(Pn, {
                text: "No",
                focusKey: "EXIT-MODAL-NO",
                onClick: r
              })]
            })]
          })
        })
      });
    }
    function Tn() {
      var e = P({
          focusKey: tt,
          saveLastFocusedChild: !0,
          trackChildren: !0,
          autoRestoreFocus: !0,
          isFocusBoundary: !1,
          onArrowPress: function (e) {
            return "left" !== e || (S(Ye), !1);
          }
        }),
        t = e.ref,
        n = e.focusKey;
      return (0, dt.jsx)(h.Provider, {
        value: n,
        children: (0, dt.jsx)("main", {
          ref: t,
          className: vt.content,
          style: {
            marginLeft: "9vw"
          },
          children: (0, dt.jsx)(y, {})
        })
      });
    }
    function Nn() {
      var e = o((0, qe.useState)(!1), 2),
        t = e[0],
        n = e[1],
        r = P({
          focusKey: "MAIN-LAYOUT",
          saveLastFocusedChild: !0,
          trackChildren: !0,
          autoRestoreFocus: !0,
          isFocusBoundary: !1
        }),
        a = r.ref,
        l = r.focusKey,
        i = cn((0, qe.useCallback)(function () {
          n(!0);
        }, [])).restoreFocus,
        u = (0, qe.useCallback)(function () {
          un();
        }, []),
        s = (0, qe.useCallback)(function () {
          n(!1), i();
        }, [i]);
      return (0, dt.jsx)(h.Provider, {
        value: l,
        children: (0, dt.jsxs)("div", {
          ref: a,
          className: vt.layout,
          children: [(0, dt.jsx)(zn, {}), (0, dt.jsx)(Ln, {
            visible: t,
            onConfirm: u,
            onCancel: s
          }), (0, dt.jsx)(Tn, {})]
        })
      });
    }
    function On(e) {
      var t = e.children,
        n = mn(function (e) {
          return e.isAuthenticated;
        }),
        r = p();
      return n ? t ? (0, dt.jsx)(dt.Fragment, {
        children: t
      }) : (0, dt.jsx)(y, {}) : (0, dt.jsx)(g, {
        to: "/auth/register",
        state: {
          from: r.pathname
        },
        replace: !0
      });
    }
    function An() {
      return (0, dt.jsxs)("div", {
        className: yt.container,
        children: [(0, dt.jsx)("div", {
          className: yt.track
        }), (0, dt.jsx)("div", {
          className: yt.spinner
        })]
      });
    }
    function jn() {
      return (0, dt.jsx)("div", {
        className: bt.overlay,
        children: (0, dt.jsx)(An, {})
      });
    }
    function Fn(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
        n = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).enabled,
        r = void 0 === n || n,
        a = o((0, qe.useState)(null), 2),
        i = a[0],
        u = a[1],
        s = o((0, qe.useState)(r), 2),
        c = s[0],
        f = s[1],
        d = o((0, qe.useState)(!1), 2),
        p = d[0],
        m = d[1],
        h = o((0, qe.useState)(null), 2),
        g = h[0],
        v = h[1],
        y = (0, qe.useRef)(e);
      y.current = e;
      var b = (0, qe.useCallback)(function () {
        r ? (f(!0), m(!1), v(null), y.current().then(function (e) {
          u(e), f(!1);
        }).catch(function (e) {
          m(!0), v(e), f(!1);
        })) : f(!1);
      }, [r]);
      return (0, qe.useEffect)(function () {
        b();
      }, [r].concat(l(t))), {
        data: i,
        isLoading: c,
        isError: p,
        error: g,
        refetch: b
      };
    }
    function Rn() {
      var e = It(),
        t = e.isLoading,
        n = e.isError;
      return t ? (0, dt.jsx)(jn, {}) : n ? (0, dt.jsx)("div", {
        children: "Error crítico al iniciar la aplicación."
      }) : (0, dt.jsx)(an, {
        router: Mt
      });
    }
    return t({
      a: vn,
      c: function (e) {
        return sn.apply(this, arguments);
      },
      l: ln,
      n: jn,
      o: mn,
      r: An,
      t: Fn
    }), {
      setters: [function (e) {
        i = e.$, u = e.B, s = e.C, f = e.G, p = e.H, m = e.J, h = e.K, g = e.L, v = e.Q, y = e.R, b = e.S, w = e.U, k = e.V, S = e.X, _ = e.Y, x = e.Z, E = e.a, C = e.m, z = e.n, P = e.q, L = e.t, T = e.z;
      }],
      execute: function () {
        var l, p, m, h;
        (N = document.createElement("style")).textContent = "@font-face{font-family:Poppins;src:url(" + new URL("Poppins-Light.ttf", a.meta.url).href + ");font-weight:300;font-style:normal;font-display:swap}@font-face{font-family:Poppins;src:url(" + new URL("Poppins-Regular.ttf", a.meta.url).href + ");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Poppins;src:url(" + new URL("Poppins-Medium.ttf", a.meta.url).href + ");font-weight:500;font-style:normal;font-display:swap}@font-face{font-family:Poppins;src:url(" + new URL("Poppins-SemiBold.ttf", a.meta.url).href + ");font-weight:600;font-style:normal;font-display:swap}@font-face{font-family:Poppins;src:url(" + new URL("Poppins-Bold.ttf", a.meta.url).href + ");font-weight:700;font-style:normal;font-display:swap}@font-face{font-family:Archia;src:url(" + new URL("archia-light-webfont.ttf", a.meta.url).href + ");font-weight:300;font-style:normal;font-display:swap}@font-face{font-family:Archia;src:url(" + new URL("archia-regular-webfont.ttf", a.meta.url).href + ");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Archia;src:url(" + new URL("archia-medium-webfont.ttf", a.meta.url).href + ");font-weight:500;font-style:normal;font-display:swap}@font-face{font-family:Archia;src:url(" + new URL("archia-semibold-webfont.ttf", a.meta.url).href + ");font-weight:600;font-style:normal;font-display:swap}@font-face{font-family:Archia;src:url(" + new URL("archia-bold-webfont.ttf", a.meta.url).href + ");font-weight:700;font-style:normal;font-display:swap}@font-face{font-family:CircularXX;src:url(" + new URL("CircularXX-Book.woff2", a.meta.url).href + ");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:CircularXX;src:url(" + new URL("CircularXX-Regular.woff2", a.meta.url).href + ");font-weight:450;font-style:normal;font-display:swap}@font-face{font-family:CircularXX;src:url(" + new URL("CircularXX-Medium.woff2", a.meta.url).href + ');font-weight:500;font-style:normal;font-display:swap}:root{--tam-banner-button-height:9vh;--tam-banner-button-width:14vw;--tam-primary-button-height:7vh;--tam-primary-button-width:6vw;--tam-tertiary-button-height:1vh;--tam-tertiary-button-width:11vw;--tam-secondary-button-width:180px;--tam-secondary-button-height:80px;--tam-quaternary-button-width:13vw;--tam-quaternary-button-height:6vh;--font-size-heading:2.8rem;--font-size-title:2.5rem;--font-size-subtitle:1.5rem;--font-size-body:1.5rem;--font-size-text:1.3rem;--font-size-caption:1.1rem;--font-size-label:1.4rem;--font-size-code:2rem;--font-size-subtext:.9rem;--font-size-icon:4rem;--font-weight-title:bold;--font-weight-subtitle:bold;--font-weight-text:normal;--font-weight-subtext:normal;--font-weight-button:bold;--font-family-title:"Poppins", Arial, Helvetica, sans-serif;--font-family-subtitle:"Poppins", Arial, Helvetica, sans-serif;--font-family-text:"Poppins", Arial, Helvetica, sans-serif;--font-family-button:"Poppins", Arial, Helvetica, sans-serif;--font-family-category:"Archia", Arial, Helvetica, sans-serif;--bor-primary-radius:5rem;--bor-secondary-radius:3rem;--bor-tertiary-radius:1rem;--shadow-primary:0 0 10px 5px rgba(0,209,167,.75);--shadow-secondary:0 0 20px 15px rgba(0,209,167,.55);--tam-banner-width:100vw;--tam-banner-height:50vh;--tam-primary-container-width:12.5vw;--tam-primary-container-height:37vh;--tam-secondary-container-width:20vw;--tam-secondary-container-height:21vh;--tam-quaternary-container-width:15vw;--tam-quaternary-container-height:15vh;--card-w-vertical:20vh;--card-w-horizontal:32vh;--avatar-size:200px;--avatar-border-radius:50%;--clr-primary:#00705a;--clr-secondary:#004a3c;--clr-primary-title:#fff;--clr-secondary-title:#fff;--clr-primary-text:#fff;--clr-secondary-text:#ccc;--clr-primary-subtitle:#00b28a;--clr-secondary-subtitle:#00b28a;--foc-primary:#ffe500;--foc-secondary:#ffe500;--foc-tertiary:#fff;--grad-sidebar:linear-gradient(90deg, #00705a 0%, transparent 100%);--clr-primary-button:#ffe500;--clr-secondary-button:#ffe500;--clr-text-primary-button:#000;--clr-text-secondary-button:#000;--clr-text-tertiary-button:#fff;--clr-icon:#fff;--clr-edit:#ffe500;--mask-right:linear-gradient(90deg, #000 0%, #000 85%, transparent 100%)}*,:before,:after{box-sizing:border-box}html{scrollbar-width:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}html::-webkit-scrollbar{display:none}html,body,#root{height:100%;margin:0;padding:0}body{background-color:var(--clr-primary,#001a28);color:#fff;line-height:1.5;font-family:var(--font-family-title)!important}.chapter-card-img-full img{object-fit:cover;border-radius:16px;width:100%;height:100%;display:block}.chapter-card-img-full:focus-within img,.chapter-card-img-full.focused img{outline:3px solid var(--foc-primary);outline-offset:-3px;box-shadow:var(--shadow-primary)}.scrollbar-subtle{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent}.scrollbar-subtle::-webkit-scrollbar{width:4px}.scrollbar-subtle::-webkit-scrollbar-track{background:0 0}.scrollbar-subtle::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:9999px}.scrollbar-subtle::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.3)}.bg-header-gradient{background-image:linear-gradient(rgba(0,26,40,.8),rgba(0,26,40,0))}._item_chu3s_6{color:#fff;cursor:pointer;flex-direction:column;justify-content:center;align-items:center;width:100%;margin:20px;display:flex;position:relative}._itemInner_chu3s_19{background-color:transparent;flex-direction:row;justify-content:flex-start;align-items:center;width:4rem;margin-right:36px;padding-left:8px;transition:all .3s;display:flex}._item_chu3s_6._active_chu3s_32 ._itemInner_chu3s_19{border-left:.4rem solid var(--foc-primary)}._item_chu3s_6._focused_chu3s_37 ._itemInner_chu3s_19{transform-origin:0;transform:scale(1.2)}._iconWrapper_chu3s_43{flex-shrink:0;justify-content:center;align-items:center;transition:color .3s,transform .2s cubic-bezier(.4,2,.6,1);display:flex}._item_chu3s_6:hover ._iconWrapper_chu3s_43{transform:scale(1.1)}._iconWrapper_chu3s_43 svg{width:48px;height:48px}._label_chu3s_63{color:#fff;white-space:nowrap;margin:0;padding-left:16px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.2rem;font-weight:600;transition:opacity .3s,font-size .2s cubic-bezier(.4,2,.6,1);display:none}._item_chu3s_6._expanded_chu3s_75 ._label_chu3s_63{display:block}._container_1n295_5{z-index:10;flex-direction:column;justify-content:center;width:9vw;height:100vh;margin-right:.5rem;transition:box-shadow .3s;display:flex;position:fixed;top:0;left:0}._backdrop_1n295_21{content:"";background:var(--grad-sidebar);opacity:0;z-index:-1;pointer-events:none;width:60vmax;height:100%;transition:opacity .3s;position:absolute;top:0;left:0}._container_1n295_5._expanded_1n295_35 ._backdrop_1n295_21{opacity:1}._container_1n295_5._expanded_1n295_35{z-index:99999999}._logo_1n295_44{object-fit:contain;width:75px;height:75px;margin-left:3rem;position:absolute;top:60px}._spacer_1n295_54{height:140px}._navList_1n295_59{flex-direction:column;width:100%;margin:0;padding:0;list-style:none;display:flex}._profileItem_1n295_72{cursor:pointer;flex-direction:column;justify-content:center;align-items:center;width:100%;margin:20px;list-style:none;display:flex;position:relative}._profileItemInner_1n295_84{background-color:transparent;flex-direction:row;justify-content:flex-start;align-items:center;width:4rem;margin-right:36px;padding-left:8px;transition:all .3s;display:flex}._profileItemFocused_1n295_96 ._profileItemInner_1n295_84,._profileItem_1n295_72:hover ._profileItemInner_1n295_84{transform-origin:0;transform:scale(1.2)}._profileAvatar_1n295_102{background:rgba(255,255,255,.1);border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;width:56px;height:56px;display:flex;overflow:hidden}._profileAvatarImg_1n295_114{object-fit:cover;width:100%;height:100%}._profileAvatarInitial_1n295_120{color:var(--clr-primary-text);text-transform:uppercase;font-size:1.2rem;font-weight:700;line-height:1}._profileLabel_1n295_128{white-space:nowrap;color:#fff;margin-left:16px;font-family:Inter,Archia,CircularXX,Arial,Helvetica,sans-serif;font-size:1.2rem;font-weight:600;display:none}._profileItemExpanded_1n295_138 ._profileLabel_1n295_128{display:block}._overlay_7m30n_1{z-index:9999;background-color:rgba(0,0,0,.92);justify-content:center;align-items:center;width:100vw;height:100vh;display:flex;position:fixed;top:0;left:0}._overlay_7m30n_1._hidden_7m30n_14{visibility:hidden;pointer-events:none}._content_7m30n_19{flex-direction:column;align-items:center;display:flex}._title_7m30n_25{font-size:var(--font-size-code);color:#fff;text-align:center;margin-bottom:2.5rem;font-weight:600}._buttons_7m30n_33{flex-direction:row;justify-content:center;align-items:center;display:flex}._btn_7m30n_40{min-width:160px;height:56px;font-size:var(--font-size-label);cursor:pointer;color:var(--clr-text-primary-button);background-color:var(--clr-primary-button);border:2px solid transparent;border-radius:8px;margin:0 1rem;font-weight:600}._btn_7m30n_40._focused_7m30n_53,._btn_7m30n_40:hover{border-color:var(--foc-primary)}._layout_1em8t_1{min-height:100vh;display:flex;position:relative;overflow:hidden}._content_1em8t_8{flex:1;min-width:0;height:100vh;position:relative;overflow:hidden}._container_1wdi1_1{justify-content:center;align-items:center;width:48px;height:48px;display:flex;position:relative}._track_1wdi1_10{border:4px solid rgba(255,255,255,.2);border-radius:50%;position:absolute;top:0;bottom:0;left:0;right:0}._spinner_1wdi1_17{border:4px solid var(--foc-primary,#fff);border-top-color:transparent;border-radius:50%;animation:1s linear infinite _spin_1wdi1_17;position:absolute;top:0;bottom:0;left:0;right:0}@keyframes _spin_1wdi1_17{to{transform:rotate(360deg)}}._overlay_ekis2_1{z-index:50;background-color:var(--clr-primary,#0a0a0a);justify-content:center;align-items:center;display:flex;position:fixed;top:0;bottom:0;left:0;right:0}\n/*$vite$:1*/', document.head.appendChild(N), function () {
          var e = document.createElement("link").relList;
          if (!(e && e.supports && e.supports("modulepreload"))) {
            var t,
              n = r(document.querySelectorAll('link[rel="modulepreload"]'));
            try {
              for (n.s(); !(t = n.n()).done;) {
                a(t.value);
              }
            } catch (l) {
              n.e(l);
            } finally {
              n.f();
            }
            new MutationObserver(function (e) {
              var t,
                n = r(e);
              try {
                for (n.s(); !(t = n.n()).done;) {
                  var o = t.value;
                  if ("childList" === o.type) {
                    var i,
                      u = r(o.addedNodes);
                    try {
                      for (u.s(); !(i = u.n()).done;) {
                        var s = i.value;
                        "LINK" === s.tagName && "modulepreload" === s.rel && a(s);
                      }
                    } catch (l) {
                      u.e(l);
                    } finally {
                      u.f();
                    }
                  }
                }
              } catch (l) {
                n.e(l);
              } finally {
                n.f();
              }
            }).observe(document, {
              childList: !0,
              subtree: !0
            });
          }
          function a(e) {
            if (!e.ep) {
              e.ep = !0;
              var t = function (e) {
                var t = {};
                return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), "use-credentials" === e.crossOrigin ? t.credentials = "include" : "anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin", t;
              }(e);
              fetch(e.href, t);
            }
          }
        }(), O = v(function (e) {
          function t(e, t) {
            var n = e.length;
            e.push(t);
            e: for (; 0 < n;) {
              var r = n - 1 >>> 1,
                a = e[r];
              if (!(0 < l(a, t))) break e;
              e[r] = t, e[n] = a, n = r;
            }
          }
          function r(e) {
            return 0 === e.length ? null : e[0];
          }
          function a(e) {
            if (0 === e.length) return null;
            var t = e[0],
              n = e.pop();
            if (n !== t) {
              e[0] = n;
              e: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
                var i = 2 * (r + 1) - 1,
                  u = e[i],
                  s = i + 1,
                  c = e[s];
                if (0 > l(u, n)) s < a && 0 > l(c, u) ? (e[r] = c, e[s] = n, r = s) : (e[r] = u, e[i] = n, r = i);else {
                  if (!(s < a && 0 > l(c, n))) break e;
                  e[r] = c, e[s] = n, r = s;
                }
              }
            }
            return t;
          }
          function l(e, t) {
            var n = e.sortIndex - t.sortIndex;
            return 0 !== n ? n : e.id - t.id;
          }
          if (e.unstable_now = void 0, "object" === ("undefined" == typeof performance ? "undefined" : n(performance)) && "function" == typeof performance.now) {
            var o = performance;
            e.unstable_now = function () {
              return o.now();
            };
          } else {
            var i = Date,
              u = i.now();
            e.unstable_now = function () {
              return i.now() - u;
            };
          }
          var s = [],
            c = [],
            f = 1,
            d = null,
            p = 3,
            m = !1,
            h = !1,
            g = !1,
            v = !1,
            y = "function" == typeof setTimeout ? setTimeout : null,
            b = "function" == typeof clearTimeout ? clearTimeout : null,
            w = "undefined" != typeof setImmediate ? setImmediate : null;
          function k(e) {
            for (var n = r(c); null !== n;) {
              if (null === n.callback) a(c);else {
                if (!(n.startTime <= e)) break;
                a(c), n.sortIndex = n.expirationTime, t(s, n);
              }
              n = r(c);
            }
          }
          function S(e) {
            if (g = !1, k(e), !h) if (null !== r(s)) h = !0, x || (x = !0, _());else {
              var t = r(c);
              null !== t && O(S, t.startTime - e);
            }
          }
          var _,
            x = !1,
            E = -1,
            C = 5,
            z = -1;
          function P() {
            return !!v || !(e.unstable_now() - z < C);
          }
          function L() {
            if (v = !1, x) {
              var t = e.unstable_now();
              z = t;
              var n = !0;
              try {
                e: {
                  h = !1, g && (g = !1, b(E), E = -1), m = !0;
                  var l = p;
                  try {
                    t: {
                      for (k(t), d = r(s); null !== d && !(d.expirationTime > t && P());) {
                        var o = d.callback;
                        if ("function" == typeof o) {
                          d.callback = null, p = d.priorityLevel;
                          var i = o(d.expirationTime <= t);
                          if (t = e.unstable_now(), "function" == typeof i) {
                            d.callback = i, k(t), n = !0;
                            break t;
                          }
                          d === r(s) && a(s), k(t);
                        } else a(s);
                        d = r(s);
                      }
                      if (null !== d) n = !0;else {
                        var u = r(c);
                        null !== u && O(S, u.startTime - t), n = !1;
                      }
                    }
                    break e;
                  } finally {
                    d = null, p = l, m = !1;
                  }
                  n = void 0;
                }
              } finally {
                n ? _() : x = !1;
              }
            }
          }
          if ("function" == typeof w) _ = function () {
            w(L);
          };else if ("undefined" != typeof MessageChannel) {
            var T = new MessageChannel(),
              N = T.port2;
            T.port1.onmessage = L, _ = function () {
              N.postMessage(null);
            };
          } else _ = function () {
            y(L, 0);
          };
          function O(t, n) {
            E = y(function () {
              t(e.unstable_now());
            }, n);
          }
          e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function (e) {
            e.callback = null;
          }, e.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < e ? Math.floor(1e3 / e) : 5;
          }, e.unstable_getCurrentPriorityLevel = function () {
            return p;
          }, e.unstable_next = function (e) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = p;
            }
            var n = p;
            p = t;
            try {
              return e();
            } finally {
              p = n;
            }
          }, e.unstable_requestPaint = function () {
            v = !0;
          }, e.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var n = p;
            p = e;
            try {
              return t();
            } finally {
              p = n;
            }
          }, e.unstable_scheduleCallback = function (a, l, o) {
            var i = e.unstable_now();
            switch ("object" === n(o) && null !== o ? o = "number" == typeof (o = o.delay) && 0 < o ? i + o : i : o = i, a) {
              case 1:
                var u = -1;
                break;
              case 2:
                u = 250;
                break;
              case 5:
                u = 1073741823;
                break;
              case 4:
                u = 1e4;
                break;
              default:
                u = 5e3;
            }
            return a = {
              id: f++,
              callback: l,
              priorityLevel: a,
              startTime: o,
              expirationTime: u = o + u,
              sortIndex: -1
            }, o > i ? (a.sortIndex = o, t(c, a), null === r(s) && a === r(c) && (g ? (b(E), E = -1) : g = !0, O(S, o - i))) : (a.sortIndex = u, t(s, a), h || m || (h = !0, x || (x = !0, _()))), a;
          }, e.unstable_shouldYield = P, e.unstable_wrapCallback = function (e) {
            var t = p;
            return function () {
              var n = p;
              p = t;
              try {
                return e.apply(this, arguments);
              } finally {
                p = n;
              }
            };
          };
        }), A = v(function (e, t) {
          t.exports = O();
        }), j = v(function (e) {
          var t = x();
          function r(e) {
            var t = "https://react.dev/errors/" + e;
            if (1 < arguments.length) {
              t += "?args[]=" + encodeURIComponent(arguments[1]);
              for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
            }
            return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
          }
          function a() {}
          var l = {
              d: {
                f: a,
                r: function () {
                  throw Error(r(522));
                },
                D: a,
                C: a,
                L: a,
                m: a,
                X: a,
                S: a,
                M: a
              },
              p: 0,
              findDOMNode: null
            },
            o = Symbol.for("react.portal");
          var i = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
          function u(e, t) {
            return "font" === e ? "" : "string" == typeof t ? "use-credentials" === t ? t : "" : void 0;
          }
          e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, e.createPortal = function (e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
            if (!t || 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType) throw Error(r(299));
            return function (e, t, n) {
              var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
              return {
                $$typeof: o,
                key: null == r ? null : "" + r,
                children: e,
                containerInfo: t,
                implementation: n
              };
            }(e, t, null, n);
          }, e.flushSync = function (e) {
            var t = i.T,
              n = l.p;
            try {
              if (i.T = null, l.p = 2, e) return e();
            } finally {
              i.T = t, l.p = n, l.d.f();
            }
          }, e.preconnect = function (e, t) {
            "string" == typeof e && (t ? t = "string" == typeof (t = t.crossOrigin) ? "use-credentials" === t ? t : "" : void 0 : t = null, l.d.C(e, t));
          }, e.prefetchDNS = function (e) {
            "string" == typeof e && l.d.D(e);
          }, e.preinit = function (e, t) {
            if ("string" == typeof e && t && "string" == typeof t.as) {
              var n = t.as,
                r = u(n, t.crossOrigin),
                a = "string" == typeof t.integrity ? t.integrity : void 0,
                o = "string" == typeof t.fetchPriority ? t.fetchPriority : void 0;
              "style" === n ? l.d.S(e, "string" == typeof t.precedence ? t.precedence : void 0, {
                crossOrigin: r,
                integrity: a,
                fetchPriority: o
              }) : "script" === n && l.d.X(e, {
                crossOrigin: r,
                integrity: a,
                fetchPriority: o,
                nonce: "string" == typeof t.nonce ? t.nonce : void 0
              });
            }
          }, e.preinitModule = function (e, t) {
            if ("string" == typeof e) if ("object" === n(t) && null !== t) {
              if (null == t.as || "script" === t.as) {
                var r = u(t.as, t.crossOrigin);
                l.d.M(e, {
                  crossOrigin: r,
                  integrity: "string" == typeof t.integrity ? t.integrity : void 0,
                  nonce: "string" == typeof t.nonce ? t.nonce : void 0
                });
              }
            } else null != t || l.d.M(e);
          }, e.preload = function (e, t) {
            if ("string" == typeof e && "object" === n(t) && null !== t && "string" == typeof t.as) {
              var r = t.as,
                a = u(r, t.crossOrigin);
              l.d.L(e, r, {
                crossOrigin: a,
                integrity: "string" == typeof t.integrity ? t.integrity : void 0,
                nonce: "string" == typeof t.nonce ? t.nonce : void 0,
                type: "string" == typeof t.type ? t.type : void 0,
                fetchPriority: "string" == typeof t.fetchPriority ? t.fetchPriority : void 0,
                referrerPolicy: "string" == typeof t.referrerPolicy ? t.referrerPolicy : void 0,
                imageSrcSet: "string" == typeof t.imageSrcSet ? t.imageSrcSet : void 0,
                imageSizes: "string" == typeof t.imageSizes ? t.imageSizes : void 0,
                media: "string" == typeof t.media ? t.media : void 0
              });
            }
          }, e.preloadModule = function (e, t) {
            if ("string" == typeof e) if (t) {
              var n = u(t.as, t.crossOrigin);
              l.d.m(e, {
                as: "string" == typeof t.as && "script" !== t.as ? t.as : void 0,
                crossOrigin: n,
                integrity: "string" == typeof t.integrity ? t.integrity : void 0
              });
            } else l.d.m(e);
          }, e.requestFormReset = function (e) {
            l.d.r(e);
          }, e.unstable_batchedUpdates = function (e, t) {
            return e(t);
          }, e.useFormState = function (e, t, n) {
            return i.H.useFormState(e, t, n);
          }, e.useFormStatus = function () {
            return i.H.useHostTransitionStatus();
          }, e.version = "19.2.5";
        }), t("u", F = v(function (e, t) {
          !function e() {
            if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
          }(), t.exports = j();
        })), R = v(function (e) {
          var t = A(),
            r = x(),
            a = F();
          function l(e) {
            var t = "https://react.dev/errors/" + e;
            if (1 < arguments.length) {
              t += "?args[]=" + encodeURIComponent(arguments[1]);
              for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
            }
            return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
          }
          function o(e) {
            var t = e,
              n = e;
            if (e.alternate) for (; t.return;) t = t.return;else {
              e = t;
              do {
                !!(4098 & (t = e).flags) && (n = t.return), e = t.return;
              } while (e);
            }
            return 3 === t.tag ? n : null;
          }
          function i(e) {
            if (13 === e.tag) {
              var t = e.memoizedState;
              if (null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t) return t.dehydrated;
            }
            return null;
          }
          function u(e) {
            if (31 === e.tag) {
              var t = e.memoizedState;
              if (null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t) return t.dehydrated;
            }
            return null;
          }
          function s(e) {
            if (o(e) !== e) throw Error(l(188));
          }
          function c(e) {
            var t = e.tag;
            if (5 === t || 26 === t || 27 === t || 6 === t) return e;
            for (e = e.child; null !== e;) {
              if (null !== (t = c(e))) return t;
              e = e.sibling;
            }
            return null;
          }
          var f = Object.assign,
            d = Symbol.for("react.element"),
            p = Symbol.for("react.transitional.element"),
            m = Symbol.for("react.portal"),
            h = Symbol.for("react.fragment"),
            g = Symbol.for("react.strict_mode"),
            v = Symbol.for("react.profiler"),
            y = Symbol.for("react.consumer"),
            b = Symbol.for("react.context"),
            w = Symbol.for("react.forward_ref"),
            k = Symbol.for("react.suspense"),
            S = Symbol.for("react.suspense_list"),
            _ = Symbol.for("react.memo"),
            E = Symbol.for("react.lazy"),
            C = Symbol.for("react.activity"),
            z = Symbol.for("react.memo_cache_sentinel"),
            P = Symbol.iterator;
          function L(e) {
            return null === e || "object" !== n(e) ? null : "function" == typeof (e = P && e[P] || e["@@iterator"]) ? e : null;
          }
          var T = Symbol.for("react.client.reference");
          function N(e) {
            if (null == e) return null;
            if ("function" == typeof e) return e.$$typeof === T ? null : e.displayName || e.name || null;
            if ("string" == typeof e) return e;
            switch (e) {
              case h:
                return "Fragment";
              case v:
                return "Profiler";
              case g:
                return "StrictMode";
              case k:
                return "Suspense";
              case S:
                return "SuspenseList";
              case C:
                return "Activity";
            }
            if ("object" === n(e)) switch (e.$$typeof) {
              case m:
                return "Portal";
              case b:
                return e.displayName || "Context";
              case y:
                return (e._context.displayName || "Context") + ".Consumer";
              case w:
                var t = e.render;
                return (e = e.displayName) || (e = "" !== (e = t.displayName || t.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
              case _:
                return null !== (t = e.displayName || null) ? t : N(e.type) || "Memo";
              case E:
                t = e._payload, e = e._init;
                try {
                  return N(e(t));
                } catch (r) {}
            }
            return null;
          }
          var O = Array.isArray,
            j = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            R = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            M = {
              pending: !1,
              data: null,
              method: null,
              action: null
            },
            D = [],
            I = -1;
          function V(e) {
            return {
              current: e
            };
          }
          function B(e) {
            0 > I || (e.current = D[I], D[I] = null, I--);
          }
          function H(e, t) {
            I++, D[I] = e.current, e.current = t;
          }
          var U,
            W,
            $ = V(null),
            q = V(null),
            Q = V(null),
            X = V(null);
          function K(e, t) {
            switch (H(Q, t), H(q, e), H($, null), t.nodeType) {
              case 9:
              case 11:
                e = (e = t.documentElement) && (e = e.namespaceURI) ? bf(e) : 0;
                break;
              default:
                if (e = t.tagName, t = t.namespaceURI) e = wf(t = bf(t), e);else switch (e) {
                  case "svg":
                    e = 1;
                    break;
                  case "math":
                    e = 2;
                    break;
                  default:
                    e = 0;
                }
            }
            B($), H($, e);
          }
          function G() {
            B($), B(q), B(Q);
          }
          function Y(e) {
            null !== e.memoizedState && H(X, e);
            var t = $.current,
              n = wf(t, e.type);
            t !== n && (H(q, e), H($, n));
          }
          function Z(e) {
            q.current === e && (B($), B(q)), X.current === e && (B(X), dd._currentValue = M);
          }
          function J(e) {
            if (void 0 === U) try {
              throw Error();
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/);
              U = t && t[1] || "", W = -1 < n.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
            }
            return "\n" + U + e + W;
          }
          var ee = !1;
          function te(e, t) {
            if (!e || ee) return "";
            ee = !0;
            var r = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            try {
              var a = {
                DetermineComponentFrameRoot: function () {
                  try {
                    if (t) {
                      var r = function () {
                        throw Error();
                      };
                      if (Object.defineProperty(r.prototype, "props", {
                        set: function () {
                          throw Error();
                        }
                      }), "object" === ("undefined" == typeof Reflect ? "undefined" : n(Reflect)) && Reflect.construct) {
                        try {
                          Reflect.construct(r, []);
                        } catch (l) {
                          var a = l;
                        }
                        Reflect.construct(e, [], r);
                      } else {
                        try {
                          r.call();
                        } catch (o) {
                          a = o;
                        }
                        e.call(r.prototype);
                      }
                    } else {
                      try {
                        throw Error();
                      } catch (i) {
                        a = i;
                      }
                      (r = e()) && "function" == typeof r.catch && r.catch(function () {});
                    }
                  } catch (u) {
                    if (u && a && "string" == typeof u.stack) return [u.stack, a.stack];
                  }
                  return [null, null];
                }
              };
              a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
              var l = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
              l && l.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
              });
              var o = a.DetermineComponentFrameRoot(),
                i = o[0],
                u = o[1];
              if (i && u) {
                var s = i.split("\n"),
                  c = u.split("\n");
                for (l = a = 0; a < s.length && !s[a].includes("DetermineComponentFrameRoot");) a++;
                for (; l < c.length && !c[l].includes("DetermineComponentFrameRoot");) l++;
                if (a === s.length || l === c.length) for (a = s.length - 1, l = c.length - 1; 1 <= a && 0 <= l && s[a] !== c[l];) l--;
                for (; 1 <= a && 0 <= l; a--, l--) if (s[a] !== c[l]) {
                  if (1 !== a || 1 !== l) do {
                    if (a--, 0 > --l || s[a] !== c[l]) {
                      var f = "\n" + s[a].replace(" at new ", " at ");
                      return e.displayName && f.includes("<anonymous>") && (f = f.replace("<anonymous>", e.displayName)), f;
                    }
                  } while (1 <= a && 0 <= l);
                  break;
                }
              }
            } finally {
              ee = !1, Error.prepareStackTrace = r;
            }
            return (r = e ? e.displayName || e.name : "") ? J(r) : "";
          }
          function ne(e, t) {
            switch (e.tag) {
              case 26:
              case 27:
              case 5:
                return J(e.type);
              case 16:
                return J("Lazy");
              case 13:
                return e.child !== t && null !== t ? J("Suspense Fallback") : J("Suspense");
              case 19:
                return J("SuspenseList");
              case 0:
              case 15:
                return te(e.type, !1);
              case 11:
                return te(e.type.render, !1);
              case 1:
                return te(e.type, !0);
              case 31:
                return J("Activity");
              default:
                return "";
            }
          }
          function re(e) {
            try {
              var t = "",
                n = null;
              do {
                t += ne(e, n), n = e, e = e.return;
              } while (e);
              return t;
            } catch (r) {
              return "\nError generating stack: " + r.message + "\n" + r.stack;
            }
          }
          var ae = Object.prototype.hasOwnProperty,
            le = t.unstable_scheduleCallback,
            oe = t.unstable_cancelCallback,
            ie = t.unstable_shouldYield,
            ue = t.unstable_requestPaint,
            se = t.unstable_now,
            ce = t.unstable_getCurrentPriorityLevel,
            fe = t.unstable_ImmediatePriority,
            de = t.unstable_UserBlockingPriority,
            pe = t.unstable_NormalPriority,
            me = t.unstable_LowPriority,
            he = t.unstable_IdlePriority,
            ge = t.log,
            ve = t.unstable_setDisableYieldValue,
            ye = null,
            be = null;
          function we(e) {
            if ("function" == typeof ge && ve(e), be && "function" == typeof be.setStrictMode) try {
              be.setStrictMode(ye, e);
            } catch (t) {}
          }
          var ke = Math.clz32 ? Math.clz32 : function (e) {
              return 0 === (e >>>= 0) ? 32 : 31 - (Se(e) / _e | 0) | 0;
            },
            Se = Math.log,
            _e = Math.LN2;
          var xe = 256,
            Ee = 262144,
            Ce = 4194304;
          function ze(e) {
            var t = 42 & e;
            if (0 !== t) return t;
            switch (e & -e) {
              case 1:
                return 1;
              case 2:
                return 2;
              case 4:
                return 4;
              case 8:
                return 8;
              case 16:
                return 16;
              case 32:
                return 32;
              case 64:
                return 64;
              case 128:
                return 128;
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
                return 261888 & e;
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
                return 3932160 & e;
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
                return 62914560 & e;
              case 67108864:
                return 67108864;
              case 134217728:
                return 134217728;
              case 268435456:
                return 268435456;
              case 536870912:
                return 536870912;
              case 1073741824:
                return 0;
              default:
                return e;
            }
          }
          function Pe(e, t, n) {
            var r = e.pendingLanes;
            if (0 === r) return 0;
            var a = 0,
              l = e.suspendedLanes,
              o = e.pingedLanes;
            e = e.warmLanes;
            var i = 134217727 & r;
            return 0 !== i ? 0 !== (r = i & ~l) ? a = ze(r) : 0 !== (o &= i) ? a = ze(o) : n || 0 !== (n = i & ~e) && (a = ze(n)) : 0 !== (i = r & ~l) ? a = ze(i) : 0 !== o ? a = ze(o) : n || 0 !== (n = r & ~e) && (a = ze(n)), 0 === a ? 0 : 0 !== t && t !== a && 0 === (t & l) && ((l = a & -a) >= (n = t & -t) || 32 === l && 4194048 & n) ? t : a;
          }
          function Le(e, t) {
            return 0 === (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t);
          }
          function Te(e, t) {
            switch (e) {
              case 1:
              case 2:
              case 4:
              case 8:
              case 64:
                return t + 250;
              case 16:
              case 32:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
                return t + 5e3;
              default:
                return -1;
            }
          }
          function Ne() {
            var e = Ce;
            return !(62914560 & (Ce <<= 1)) && (Ce = 4194304), e;
          }
          function Oe(e) {
            for (var t = [], n = 0; 31 > n; n++) t.push(e);
            return t;
          }
          function Ae(e, t) {
            e.pendingLanes |= t, 268435456 !== t && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
          }
          function je(e, t, n) {
            e.pendingLanes |= t, e.suspendedLanes &= ~t;
            var r = 31 - ke(t);
            e.entangledLanes |= t, e.entanglements[r] = 1073741824 | e.entanglements[r] | 261930 & n;
          }
          function Fe(e, t) {
            var n = e.entangledLanes |= t;
            for (e = e.entanglements; n;) {
              var r = 31 - ke(n),
                a = 1 << r;
              a & t | e[r] & t && (e[r] |= t), n &= ~a;
            }
          }
          function Re(e, t) {
            var n = t & -t;
            return 0 !== ((n = 42 & n ? 1 : Me(n)) & (e.suspendedLanes | t)) ? 0 : n;
          }
          function Me(e) {
            switch (e) {
              case 2:
                e = 1;
                break;
              case 8:
                e = 4;
                break;
              case 32:
                e = 16;
                break;
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
                e = 128;
                break;
              case 268435456:
                e = 134217728;
                break;
              default:
                e = 0;
            }
            return e;
          }
          function De(e) {
            return 2 < (e &= -e) ? 8 < e ? 134217727 & e ? 32 : 268435456 : 8 : 2;
          }
          function Ie() {
            var e = R.p;
            return 0 !== e ? e : void 0 === (e = window.event) ? 32 : Cd(e.type);
          }
          function Ve(e, t) {
            var n = R.p;
            try {
              return R.p = e, t();
            } finally {
              R.p = n;
            }
          }
          var Be = Math.random().toString(36).slice(2),
            He = "__reactFiber$" + Be,
            Ue = "__reactProps$" + Be,
            We = "__reactContainer$" + Be,
            $e = "__reactEvents$" + Be,
            qe = "__reactListeners$" + Be,
            Qe = "__reactHandles$" + Be,
            Xe = "__reactResources$" + Be,
            Ke = "__reactMarker$" + Be;
          function Ge(e) {
            delete e[He], delete e[Ue], delete e[$e], delete e[qe], delete e[Qe];
          }
          function Ye(e) {
            var t = e[He];
            if (t) return t;
            for (var n = e.parentNode; n;) {
              if (t = n[We] || n[He]) {
                if (n = t.alternate, null !== t.child || null !== n && null !== n.child) for (e = Df(e); null !== e;) {
                  if (n = e[He]) return n;
                  e = Df(e);
                }
                return t;
              }
              n = (e = n).parentNode;
            }
            return null;
          }
          function Ze(e) {
            if (e = e[He] || e[We]) {
              var t = e.tag;
              if (5 === t || 6 === t || 13 === t || 31 === t || 26 === t || 27 === t || 3 === t) return e;
            }
            return null;
          }
          function Je(e) {
            var t = e.tag;
            if (5 === t || 26 === t || 27 === t || 6 === t) return e.stateNode;
            throw Error(l(33));
          }
          function et(e) {
            var t = e[Xe];
            return t || (t = e[Xe] = {
              hoistableStyles: new Map(),
              hoistableScripts: new Map()
            }), t;
          }
          function tt(e) {
            e[Ke] = !0;
          }
          var nt = new Set(),
            rt = {};
          function at(e, t) {
            lt(e, t), lt(e + "Capture", t);
          }
          function lt(e, t) {
            for (rt[e] = t, e = 0; e < t.length; e++) nt.add(t[e]);
          }
          var ot = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),
            it = {},
            ut = {};
          function st(e, t, r) {
            if (l = t, ae.call(ut, l) || !ae.call(it, l) && (ot.test(l) ? ut[l] = !0 : (it[l] = !0, 0))) if (null === r) e.removeAttribute(t);else {
              switch (n(r)) {
                case "undefined":
                case "function":
                case "symbol":
                  return void e.removeAttribute(t);
                case "boolean":
                  var a = t.toLowerCase().slice(0, 5);
                  if ("data-" !== a && "aria-" !== a) return void e.removeAttribute(t);
              }
              e.setAttribute(t, "" + r);
            }
            var l;
          }
          function ct(e, t, r) {
            if (null === r) e.removeAttribute(t);else {
              switch (n(r)) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                  return void e.removeAttribute(t);
              }
              e.setAttribute(t, "" + r);
            }
          }
          function ft(e, t, r, a) {
            if (null === a) e.removeAttribute(r);else {
              switch (n(a)) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                  return void e.removeAttribute(r);
              }
              e.setAttributeNS(t, r, "" + a);
            }
          }
          function dt(e) {
            switch (n(e)) {
              case "bigint":
              case "boolean":
              case "number":
              case "string":
              case "undefined":
              case "object":
                return e;
              default:
                return "";
            }
          }
          function pt(e) {
            var t = e.type;
            return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t);
          }
          function mt(e) {
            if (!e._valueTracker) {
              var t = pt(e) ? "checked" : "value";
              e._valueTracker = function (e, t, n) {
                var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
                if (!e.hasOwnProperty(t) && void 0 !== r && "function" == typeof r.get && "function" == typeof r.set) {
                  var a = r.get,
                    l = r.set;
                  return Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return a.call(this);
                    },
                    set: function (e) {
                      n = "" + e, l.call(this, e);
                    }
                  }), Object.defineProperty(e, t, {
                    enumerable: r.enumerable
                  }), {
                    getValue: function () {
                      return n;
                    },
                    setValue: function (e) {
                      n = "" + e;
                    },
                    stopTracking: function () {
                      e._valueTracker = null, delete e[t];
                    }
                  };
                }
              }(e, t, "" + e[t]);
            }
          }
          function ht(e) {
            if (!e) return !1;
            var t = e._valueTracker;
            if (!t) return !0;
            var n = t.getValue(),
              r = "";
            return e && (r = pt(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0);
          }
          function gt(e) {
            if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
            try {
              return e.activeElement || e.body;
            } catch (t) {
              return e.body;
            }
          }
          var vt = /[\n"\\]/g;
          function yt(e) {
            return e.replace(vt, function (e) {
              return "\\" + e.charCodeAt(0).toString(16) + " ";
            });
          }
          function bt(e, t, r, a, l, o, i, u) {
            e.name = "", null != i && "function" != typeof i && "symbol" !== n(i) && "boolean" != typeof i ? e.type = i : e.removeAttribute("type"), null != t ? "number" === i ? (0 === t && "" === e.value || e.value != t) && (e.value = "" + dt(t)) : e.value !== "" + dt(t) && (e.value = "" + dt(t)) : "submit" !== i && "reset" !== i || e.removeAttribute("value"), null != t ? kt(e, i, dt(t)) : null != r ? kt(e, i, dt(r)) : null != a && e.removeAttribute("value"), null == l && null != o && (e.defaultChecked = !!o), null != l && (e.checked = l && "function" != typeof l && "symbol" !== n(l)), null != u && "function" != typeof u && "symbol" !== n(u) && "boolean" != typeof u ? e.name = "" + dt(u) : e.removeAttribute("name");
          }
          function wt(e, t, r, a, l, o, i, u) {
            if (null != o && "function" != typeof o && "symbol" !== n(o) && "boolean" != typeof o && (e.type = o), null != t || null != r) {
              if (("submit" === o || "reset" === o) && null == t) return void mt(e);
              r = null != r ? "" + dt(r) : "", t = null != t ? "" + dt(t) : r, u || t === e.value || (e.value = t), e.defaultValue = t;
            }
            a = "function" != typeof (a = null != a ? a : l) && "symbol" !== n(a) && !!a, e.checked = u ? e.checked : !!a, e.defaultChecked = !!a, null != i && "function" != typeof i && "symbol" !== n(i) && "boolean" != typeof i && (e.name = i), mt(e);
          }
          function kt(e, t, n) {
            "number" === t && gt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
          }
          function St(e, t, n, r) {
            if (e = e.options, t) {
              t = {};
              for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
              for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
            } else {
              for (n = "" + dt(n), t = null, a = 0; a < e.length; a++) {
                if (e[a].value === n) return e[a].selected = !0, void (r && (e[a].defaultSelected = !0));
                null !== t || e[a].disabled || (t = e[a]);
              }
              null !== t && (t.selected = !0);
            }
          }
          function _t(e, t, n) {
            null == t || ((t = "" + dt(t)) !== e.value && (e.value = t), null != n) ? e.defaultValue = null != n ? "" + dt(n) : "" : e.defaultValue !== t && (e.defaultValue = t);
          }
          function xt(e, t, n, r) {
            if (null == t) {
              if (null != r) {
                if (null != n) throw Error(l(92));
                if (O(r)) {
                  if (1 < r.length) throw Error(l(93));
                  r = r[0];
                }
                n = r;
              }
              null != n || (n = ""), t = n;
            }
            n = dt(t), e.defaultValue = n, (r = e.textContent) === n && "" !== r && null !== r && (e.value = r), mt(e);
          }
          function Et(e, t) {
            if (t) {
              var n = e.firstChild;
              if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
            }
            e.textContent = t;
          }
          var Ct = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
          function zt(e, t, n) {
            var r = 0 === t.indexOf("--");
            null == n || "boolean" == typeof n || "" === n ? r ? e.setProperty(t, "") : "float" === t ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : "number" != typeof n || 0 === n || Ct.has(t) ? "float" === t ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
          }
          function Pt(e, t, r) {
            if (null != t && "object" !== n(t)) throw Error(l(62));
            if (e = e.style, null != r) {
              for (var a in r) !r.hasOwnProperty(a) || null != t && t.hasOwnProperty(a) || (0 === a.indexOf("--") ? e.setProperty(a, "") : "float" === a ? e.cssFloat = "" : e[a] = "");
              for (var o in t) a = t[o], t.hasOwnProperty(o) && r[o] !== a && zt(e, o, a);
            } else for (var i in t) t.hasOwnProperty(i) && zt(e, i, t[i]);
          }
          function Lt(e) {
            if (-1 === e.indexOf("-")) return !1;
            switch (e) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return !1;
              default:
                return !0;
            }
          }
          var Tt = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]),
            Nt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
          function Ot(e) {
            return Nt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
          }
          function At() {}
          var jt = null;
          function Ft(e) {
            return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e;
          }
          var Rt = null,
            Mt = null;
          function Dt(e) {
            var t = Ze(e);
            if (t && (e = t.stateNode)) {
              var n = e[Ue] || null;
              e: switch (e = t.stateNode, t.type) {
                case "input":
                  if (bt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, "radio" === n.type && null != t) {
                    for (n = e; n.parentNode;) n = n.parentNode;
                    for (n = n.querySelectorAll('input[name="' + yt("" + t) + '"][type="radio"]'), t = 0; t < n.length; t++) {
                      var r = n[t];
                      if (r !== e && r.form === e.form) {
                        var a = r[Ue] || null;
                        if (!a) throw Error(l(90));
                        bt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
                      }
                    }
                    for (t = 0; t < n.length; t++) (r = n[t]).form === e.form && ht(r);
                  }
                  break e;
                case "textarea":
                  _t(e, n.value, n.defaultValue);
                  break e;
                case "select":
                  null != (t = n.value) && St(e, !!n.multiple, t, !1);
              }
            }
          }
          var It = !1;
          function Vt(e, t, n) {
            if (It) return e(t, n);
            It = !0;
            try {
              return e(t);
            } finally {
              if (It = !1, (null !== Rt || null !== Mt) && (ec(), Rt && (t = Rt, e = Mt, Mt = Rt = null, Dt(t), e))) for (t = 0; t < e.length; t++) Dt(e[t]);
            }
          }
          function Bt(e, t) {
            var r = e.stateNode;
            if (null === r) return null;
            var a = r[Ue] || null;
            if (null === a) return null;
            r = a[t];
            e: switch (t) {
              case "onClick":
              case "onClickCapture":
              case "onDoubleClick":
              case "onDoubleClickCapture":
              case "onMouseDown":
              case "onMouseDownCapture":
              case "onMouseMove":
              case "onMouseMoveCapture":
              case "onMouseUp":
              case "onMouseUpCapture":
              case "onMouseEnter":
                (a = !a.disabled) || (a = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), e = !a;
                break e;
              default:
                e = !1;
            }
            if (e) return null;
            if (r && "function" != typeof r) throw Error(l(231, t, n(r)));
            return r;
          }
          var Ht = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement),
            Ut = !1;
          if (Ht) try {
            var Wt = {};
            Object.defineProperty(Wt, "passive", {
              get: function () {
                Ut = !0;
              }
            }), window.addEventListener("test", Wt, Wt), window.removeEventListener("test", Wt, Wt);
          } catch (Yd) {
            Ut = !1;
          }
          var $t = null,
            qt = null,
            Qt = null;
          function Xt() {
            if (Qt) return Qt;
            var e,
              t,
              n = qt,
              r = n.length,
              a = "value" in $t ? $t.value : $t.textContent,
              l = a.length;
            for (e = 0; e < r && n[e] === a[e]; e++);
            var o = r - e;
            for (t = 1; t <= o && n[r - t] === a[l - t]; t++);
            return Qt = a.slice(e, 1 < t ? 1 - t : void 0);
          }
          function Kt(e) {
            var t = e.keyCode;
            return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
          }
          function Gt() {
            return !0;
          }
          function Yt() {
            return !1;
          }
          function Zt(e) {
            function t(t, n, r, a, l) {
              for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = a, this.target = l, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(a) : a[o]);
              return this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue) ? Gt : Yt, this.isPropagationStopped = Yt, this;
            }
            return f(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = Gt);
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = Gt);
              },
              persist: function () {},
              isPersistent: Gt
            }), t;
          }
          var Jt,
            en,
            tn,
            nn = {
              eventPhase: 0,
              bubbles: 0,
              cancelable: 0,
              timeStamp: function (e) {
                return e.timeStamp || Date.now();
              },
              defaultPrevented: 0,
              isTrusted: 0
            },
            rn = Zt(nn),
            an = f({}, nn, {
              view: 0,
              detail: 0
            }),
            ln = Zt(an),
            on = f({}, an, {
              screenX: 0,
              screenY: 0,
              clientX: 0,
              clientY: 0,
              pageX: 0,
              pageY: 0,
              ctrlKey: 0,
              shiftKey: 0,
              altKey: 0,
              metaKey: 0,
              getModifierState: yn,
              button: 0,
              buttons: 0,
              relatedTarget: function (e) {
                return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
              },
              movementX: function (e) {
                return "movementX" in e ? e.movementX : (e !== tn && (tn && "mousemove" === e.type ? (Jt = e.screenX - tn.screenX, en = e.screenY - tn.screenY) : en = Jt = 0, tn = e), Jt);
              },
              movementY: function (e) {
                return "movementY" in e ? e.movementY : en;
              }
            }),
            un = Zt(on),
            sn = Zt(f({}, on, {
              dataTransfer: 0
            })),
            cn = Zt(f({}, an, {
              relatedTarget: 0
            })),
            fn = Zt(f({}, nn, {
              animationName: 0,
              elapsedTime: 0,
              pseudoElement: 0
            })),
            dn = Zt(f({}, nn, {
              clipboardData: function (e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData;
              }
            })),
            pn = Zt(f({}, nn, {
              data: 0
            })),
            mn = {
              Esc: "Escape",
              Spacebar: " ",
              Left: "ArrowLeft",
              Up: "ArrowUp",
              Right: "ArrowRight",
              Down: "ArrowDown",
              Del: "Delete",
              Win: "OS",
              Menu: "ContextMenu",
              Apps: "ContextMenu",
              Scroll: "ScrollLock",
              MozPrintableKey: "Unidentified"
            },
            hn = {
              8: "Backspace",
              9: "Tab",
              12: "Clear",
              13: "Enter",
              16: "Shift",
              17: "Control",
              18: "Alt",
              19: "Pause",
              20: "CapsLock",
              27: "Escape",
              32: " ",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "ArrowLeft",
              38: "ArrowUp",
              39: "ArrowRight",
              40: "ArrowDown",
              45: "Insert",
              46: "Delete",
              112: "F1",
              113: "F2",
              114: "F3",
              115: "F4",
              116: "F5",
              117: "F6",
              118: "F7",
              119: "F8",
              120: "F9",
              121: "F10",
              122: "F11",
              123: "F12",
              144: "NumLock",
              145: "ScrollLock",
              224: "Meta"
            },
            gn = {
              Alt: "altKey",
              Control: "ctrlKey",
              Meta: "metaKey",
              Shift: "shiftKey"
            };
          function vn(e) {
            var t = this.nativeEvent;
            return t.getModifierState ? t.getModifierState(e) : !!(e = gn[e]) && !!t[e];
          }
          function yn() {
            return vn;
          }
          var bn = Zt(f({}, an, {
              key: function (e) {
                if (e.key) {
                  var t = mn[e.key] || e.key;
                  if ("Unidentified" !== t) return t;
                }
                return "keypress" === e.type ? 13 === (e = Kt(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? hn[e.keyCode] || "Unidentified" : "";
              },
              code: 0,
              location: 0,
              ctrlKey: 0,
              shiftKey: 0,
              altKey: 0,
              metaKey: 0,
              repeat: 0,
              locale: 0,
              getModifierState: yn,
              charCode: function (e) {
                return "keypress" === e.type ? Kt(e) : 0;
              },
              keyCode: function (e) {
                return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
              },
              which: function (e) {
                return "keypress" === e.type ? Kt(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
              }
            })),
            wn = Zt(f({}, on, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0
            })),
            kn = Zt(f({}, an, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: yn
            })),
            Sn = Zt(f({}, nn, {
              propertyName: 0,
              elapsedTime: 0,
              pseudoElement: 0
            })),
            _n = Zt(f({}, on, {
              deltaX: function (e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
              },
              deltaY: function (e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
              },
              deltaZ: 0,
              deltaMode: 0
            })),
            xn = Zt(f({}, nn, {
              newState: 0,
              oldState: 0
            })),
            En = [9, 13, 27, 32],
            Cn = Ht && "CompositionEvent" in window,
            zn = null;
          Ht && "documentMode" in document && (zn = document.documentMode);
          var Pn = Ht && "TextEvent" in window && !zn,
            Ln = Ht && (!Cn || zn && 8 < zn && 11 >= zn),
            Tn = String.fromCharCode(32),
            Nn = !1;
          function On(e, t) {
            switch (e) {
              case "keyup":
                return -1 !== En.indexOf(t.keyCode);
              case "keydown":
                return 229 !== t.keyCode;
              case "keypress":
              case "mousedown":
              case "focusout":
                return !0;
              default:
                return !1;
            }
          }
          function An(e) {
            return "object" === n(e = e.detail) && "data" in e ? e.data : null;
          }
          var jn = !1;
          var Fn = {
            color: !0,
            date: !0,
            datetime: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            password: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
          };
          function Rn(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return "input" === t ? !!Fn[e.type] : "textarea" === t;
          }
          function Mn(e, t, n, r) {
            Rt ? Mt ? Mt.push(r) : Mt = [r] : Rt = r, 0 < (t = af(t, "onChange")).length && (n = new rn("onChange", "change", null, n, r), e.push({
              event: n,
              listeners: t
            }));
          }
          var Dn = null,
            In = null;
          function Vn(e) {
            Gc(e, 0);
          }
          function Bn(e) {
            if (ht(Je(e))) return e;
          }
          function Hn(e, t) {
            if ("change" === e) return t;
          }
          var Un = !1;
          if (Ht) {
            var Wn;
            if (Ht) {
              var $n = "oninput" in document;
              if (!$n) {
                var qn = document.createElement("div");
                qn.setAttribute("oninput", "return;"), $n = "function" == typeof qn.oninput;
              }
              Wn = $n;
            } else Wn = !1;
            Un = Wn && (!document.documentMode || 9 < document.documentMode);
          }
          function Qn() {
            Dn && (Dn.detachEvent("onpropertychange", Xn), In = Dn = null);
          }
          function Xn(e) {
            if ("value" === e.propertyName && Bn(In)) {
              var t = [];
              Mn(t, In, e, Ft(e)), Vt(Vn, t);
            }
          }
          function Kn(e, t, n) {
            "focusin" === e ? (Qn(), In = n, (Dn = t).attachEvent("onpropertychange", Xn)) : "focusout" === e && Qn();
          }
          function Gn(e) {
            if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Bn(In);
          }
          function Yn(e, t) {
            if ("click" === e) return Bn(t);
          }
          function Zn(e, t) {
            if ("input" === e || "change" === e) return Bn(t);
          }
          var Jn = "function" == typeof Object.is ? Object.is : function (e, t) {
            return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
          };
          function er(e, t) {
            if (Jn(e, t)) return !0;
            if ("object" !== n(e) || null === e || "object" !== n(t) || null === t) return !1;
            var r = Object.keys(e),
              a = Object.keys(t);
            if (r.length !== a.length) return !1;
            for (a = 0; a < r.length; a++) {
              var l = r[a];
              if (!ae.call(t, l) || !Jn(e[l], t[l])) return !1;
            }
            return !0;
          }
          function tr(e) {
            for (; e && e.firstChild;) e = e.firstChild;
            return e;
          }
          function nr(e, t) {
            var n,
              r = tr(e);
            for (e = 0; r;) {
              if (3 === r.nodeType) {
                if (n = e + r.textContent.length, e <= t && n >= t) return {
                  node: r,
                  offset: t - e
                };
                e = n;
              }
              e: {
                for (; r;) {
                  if (r.nextSibling) {
                    r = r.nextSibling;
                    break e;
                  }
                  r = r.parentNode;
                }
                r = void 0;
              }
              r = tr(r);
            }
          }
          function rr(e, t) {
            return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? rr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))));
          }
          function ar(e) {
            for (var t = gt((e = null != e && null != e.ownerDocument && null != e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window).document); t instanceof e.HTMLIFrameElement;) {
              try {
                var n = "string" == typeof t.contentWindow.location.href;
              } catch (r) {
                n = !1;
              }
              if (!n) break;
              t = gt((e = t.contentWindow).document);
            }
            return t;
          }
          function lr(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable);
          }
          var or = Ht && "documentMode" in document && 11 >= document.documentMode,
            ir = null,
            ur = null,
            sr = null,
            cr = !1;
          function fr(e, t, n) {
            var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
            cr || null == ir || ir !== gt(r) || ("selectionStart" in (r = ir) && lr(r) ? r = {
              start: r.selectionStart,
              end: r.selectionEnd
            } : r = {
              anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset
            }, sr && er(sr, r) || (sr = r, 0 < (r = af(ur, "onSelect")).length && (t = new rn("onSelect", "select", null, t, n), e.push({
              event: t,
              listeners: r
            }), t.target = ir)));
          }
          function dr(e, t) {
            var n = {};
            return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
          }
          var pr = {
              animationend: dr("Animation", "AnimationEnd"),
              animationiteration: dr("Animation", "AnimationIteration"),
              animationstart: dr("Animation", "AnimationStart"),
              transitionrun: dr("Transition", "TransitionRun"),
              transitionstart: dr("Transition", "TransitionStart"),
              transitioncancel: dr("Transition", "TransitionCancel"),
              transitionend: dr("Transition", "TransitionEnd")
            },
            mr = {},
            hr = {};
          function gr(e) {
            if (mr[e]) return mr[e];
            if (!pr[e]) return e;
            var t,
              n = pr[e];
            for (t in n) if (n.hasOwnProperty(t) && t in hr) return mr[e] = n[t];
            return e;
          }
          Ht && (hr = document.createElement("div").style, "AnimationEvent" in window || (delete pr.animationend.animation, delete pr.animationiteration.animation, delete pr.animationstart.animation), "TransitionEvent" in window || delete pr.transitionend.transition);
          var vr = gr("animationend"),
            yr = gr("animationiteration"),
            br = gr("animationstart"),
            wr = gr("transitionrun"),
            kr = gr("transitionstart"),
            Sr = gr("transitioncancel"),
            _r = gr("transitionend"),
            xr = new Map(),
            Er = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
          function Cr(e, t) {
            xr.set(e, t), at(t, [e]);
          }
          Er.push("scrollEnd");
          var zr = "function" == typeof reportError ? reportError : function (e) {
              if ("object" === ("undefined" == typeof window ? "undefined" : n(window)) && "function" == typeof window.ErrorEvent) {
                var t = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message: "object" === n(e) && null !== e && "string" == typeof e.message ? String(e.message) : String(e),
                  error: e
                });
                if (!window.dispatchEvent(t)) return;
              } else if ("object" === ("undefined" == typeof process ? "undefined" : n(process)) && "function" == typeof process.emit) return void process.emit("uncaughtException", e);
              console.error(e);
            },
            Pr = [],
            Lr = 0,
            Tr = 0;
          function Nr() {
            for (var e = Lr, t = Tr = Lr = 0; t < e;) {
              var n = Pr[t];
              Pr[t++] = null;
              var r = Pr[t];
              Pr[t++] = null;
              var a = Pr[t];
              Pr[t++] = null;
              var l = Pr[t];
              if (Pr[t++] = null, null !== r && null !== a) {
                var o = r.pending;
                null === o ? a.next = a : (a.next = o.next, o.next = a), r.pending = a;
              }
              0 !== l && Fr(n, a, l);
            }
          }
          function Or(e, t, n, r) {
            Pr[Lr++] = e, Pr[Lr++] = t, Pr[Lr++] = n, Pr[Lr++] = r, Tr |= r, e.lanes |= r, null !== (e = e.alternate) && (e.lanes |= r);
          }
          function Ar(e, t, n, r) {
            return Or(e, t, n, r), Rr(e);
          }
          function jr(e, t) {
            return Or(e, null, null, t), Rr(e);
          }
          function Fr(e, t, n) {
            e.lanes |= n;
            var r = e.alternate;
            null !== r && (r.lanes |= n);
            for (var a = !1, l = e.return; null !== l;) l.childLanes |= n, null !== (r = l.alternate) && (r.childLanes |= n), 22 === l.tag && (null === (e = l.stateNode) || 1 & e._visibility || (a = !0)), e = l, l = l.return;
            return 3 === e.tag ? (l = e.stateNode, a && null !== t && (a = 31 - ke(n), null === (r = (e = l.hiddenUpdates)[a]) ? e[a] = [t] : r.push(t), t.lane = 536870912 | n), l) : null;
          }
          function Rr(e) {
            if (50 < $s) throw $s = 0, qs = null, Error(l(185));
            for (var t = e.return; null !== t;) t = (e = t).return;
            return 3 === e.tag ? e.stateNode : null;
          }
          var Mr = {};
          function Dr(e, t, n, r) {
            this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
          }
          function Ir(e, t, n, r) {
            return new Dr(e, t, n, r);
          }
          function Vr(e) {
            return !(!(e = e.prototype) || !e.isReactComponent);
          }
          function Br(e, t) {
            var n = e.alternate;
            return null === n ? ((n = Ir(e.tag, t, e.key, e.mode)).elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = 65011712 & e.flags, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = null === t ? null : {
              lanes: t.lanes,
              firstContext: t.firstContext
            }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
          }
          function Hr(e, t) {
            e.flags &= 65011714;
            var n = e.alternate;
            return null === n ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = null === t ? null : {
              lanes: t.lanes,
              firstContext: t.firstContext
            }), e;
          }
          function Ur(e, t, r, a, o, i) {
            var u = 0;
            if (a = e, "function" == typeof e) Vr(e) && (u = 1);else if ("string" == typeof e) u = function (e, t, r) {
              if (1 === r || null != t.itemProp) return !1;
              switch (e) {
                case "meta":
                case "title":
                  return !0;
                case "style":
                  if ("string" != typeof t.precedence || "string" != typeof t.href || "" === t.href) break;
                  return !0;
                case "link":
                  if ("string" != typeof t.rel || "string" != typeof t.href || "" === t.href || t.onLoad || t.onError) break;
                  return "stylesheet" !== t.rel || (e = t.disabled, "string" == typeof t.precedence && null == e);
                case "script":
                  if (t.async && "function" != typeof t.async && "symbol" !== n(t.async) && !t.onLoad && !t.onError && t.src && "string" == typeof t.src) return !0;
              }
              return !1;
            }(e, r, $.current) ? 26 : "html" === e || "head" === e || "body" === e ? 27 : 5;else e: switch (e) {
              case C:
                return (e = Ir(31, r, t, o)).elementType = C, e.lanes = i, e;
              case h:
                return Wr(r.children, o, i, t);
              case g:
                u = 8, o |= 24;
                break;
              case v:
                return (e = Ir(12, r, t, 2 | o)).elementType = v, e.lanes = i, e;
              case k:
                return (e = Ir(13, r, t, o)).elementType = k, e.lanes = i, e;
              case S:
                return (e = Ir(19, r, t, o)).elementType = S, e.lanes = i, e;
              default:
                if ("object" === n(e) && null !== e) switch (e.$$typeof) {
                  case b:
                    u = 10;
                    break e;
                  case y:
                    u = 9;
                    break e;
                  case w:
                    u = 11;
                    break e;
                  case _:
                    u = 14;
                    break e;
                  case E:
                    u = 16, a = null;
                    break e;
                }
                u = 29, r = Error(l(130, null === e ? "null" : n(e), "")), a = null;
            }
            return (t = Ir(u, r, t, o)).elementType = e, t.type = a, t.lanes = i, t;
          }
          function Wr(e, t, n, r) {
            return (e = Ir(7, e, r, t)).lanes = n, e;
          }
          function $r(e, t, n) {
            return (e = Ir(6, e, null, t)).lanes = n, e;
          }
          function qr(e) {
            var t = Ir(18, null, null, 0);
            return t.stateNode = e, t;
          }
          function Qr(e, t, n) {
            return (t = Ir(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation
            }, t;
          }
          var Xr = new WeakMap();
          function Kr(e, t) {
            if ("object" === n(e) && null !== e) {
              var r = Xr.get(e);
              return void 0 !== r ? r : (t = {
                value: e,
                source: t,
                stack: re(t)
              }, Xr.set(e, t), t);
            }
            return {
              value: e,
              source: t,
              stack: re(t)
            };
          }
          var Gr = [],
            Yr = 0,
            Zr = null,
            Jr = 0,
            ea = [],
            ta = 0,
            na = null,
            ra = 1,
            aa = "";
          function la(e, t) {
            Gr[Yr++] = Jr, Gr[Yr++] = Zr, Zr = e, Jr = t;
          }
          function oa(e, t, n) {
            ea[ta++] = ra, ea[ta++] = aa, ea[ta++] = na, na = e;
            var r = ra;
            e = aa;
            var a = 32 - ke(r) - 1;
            r &= ~(1 << a), n += 1;
            var l = 32 - ke(t) + a;
            if (30 < l) {
              var o = a - a % 5;
              l = (r & (1 << o) - 1).toString(32), r >>= o, a -= o, ra = 1 << 32 - ke(t) + a | n << a | r, aa = l + e;
            } else ra = 1 << l | n << a | r, aa = e;
          }
          function ia(e) {
            null !== e.return && (la(e, 1), oa(e, 1, 0));
          }
          function ua(e) {
            for (; e === Zr;) Zr = Gr[--Yr], Gr[Yr] = null, Jr = Gr[--Yr], Gr[Yr] = null;
            for (; e === na;) na = ea[--ta], ea[ta] = null, aa = ea[--ta], ea[ta] = null, ra = ea[--ta], ea[ta] = null;
          }
          function sa(e, t) {
            ea[ta++] = ra, ea[ta++] = aa, ea[ta++] = na, ra = t.id, aa = t.overflow, na = e;
          }
          var ca = null,
            fa = null,
            da = !1,
            pa = null,
            ma = !1,
            ha = Error(l(519));
          function ga(e) {
            throw Sa(Kr(Error(l(418, 1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML", "")), e)), ha;
          }
          function va(e) {
            var t = e.stateNode,
              n = e.type,
              r = e.memoizedProps;
            switch (t[He] = e, t[Ue] = r, n) {
              case "dialog":
                Yc("cancel", t), Yc("close", t);
                break;
              case "iframe":
              case "object":
              case "embed":
                Yc("load", t);
                break;
              case "video":
              case "audio":
                for (n = 0; n < Xc.length; n++) Yc(Xc[n], t);
                break;
              case "source":
                Yc("error", t);
                break;
              case "img":
              case "image":
              case "link":
                Yc("error", t), Yc("load", t);
                break;
              case "details":
                Yc("toggle", t);
                break;
              case "input":
                Yc("invalid", t), wt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
                break;
              case "select":
                Yc("invalid", t);
                break;
              case "textarea":
                Yc("invalid", t), xt(t, r.value, r.defaultValue, r.children);
            }
            "string" != typeof (n = r.children) && "number" != typeof n && "bigint" != typeof n || t.textContent === "" + n || !0 === r.suppressHydrationWarning || ff(t.textContent, n) ? (null != r.popover && (Yc("beforetoggle", t), Yc("toggle", t)), null != r.onScroll && Yc("scroll", t), null != r.onScrollEnd && Yc("scrollend", t), null != r.onClick && (t.onclick = At), t = !0) : t = !1, t || ga(e, !0);
          }
          function ya(e) {
            for (ca = e.return; ca;) switch (ca.tag) {
              case 5:
              case 31:
              case 13:
                return void (ma = !1);
              case 27:
              case 3:
                return void (ma = !0);
              default:
                ca = ca.return;
            }
          }
          function ba(e) {
            if (e !== ca) return !1;
            if (!da) return ya(e), da = !0, !1;
            var t,
              n = e.tag;
            if ((t = 3 !== n && 27 !== n) && ((t = 5 === n) && (t = !("form" !== (t = e.type) && "button" !== t) || kf(e.type, e.memoizedProps)), t = !t), t && fa && ga(e), ya(e), 13 === n) {
              if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(l(317));
              fa = Mf(e);
            } else if (31 === n) {
              if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(l(317));
              fa = Mf(e);
            } else 27 === n ? (n = fa, Pf(e.type) ? (e = Rf, Rf = null, fa = e) : fa = n) : fa = ca ? Ff(e.stateNode.nextSibling) : null;
            return !0;
          }
          function wa() {
            fa = ca = null, da = !1;
          }
          function ka() {
            var e = pa;
            return null !== e && (null === Ns ? Ns = e : Ns.push.apply(Ns, e), pa = null), e;
          }
          function Sa(e) {
            null === pa ? pa = [e] : pa.push(e);
          }
          var _a = V(null),
            xa = null,
            Ea = null;
          function Ca(e, t, n) {
            H(_a, t._currentValue), t._currentValue = n;
          }
          function za(e) {
            e._currentValue = _a.current, B(_a);
          }
          function Pa(e, t, n) {
            for (; null !== e;) {
              var r = e.alternate;
              if ((e.childLanes & t) !== t ? (e.childLanes |= t, null !== r && (r.childLanes |= t)) : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
              e = e.return;
            }
          }
          function La(e, t, n, r) {
            var a = e.child;
            for (null !== a && (a.return = e); null !== a;) {
              var o = a.dependencies;
              if (null !== o) {
                var i = a.child;
                o = o.firstContext;
                e: for (; null !== o;) {
                  var u = o;
                  o = a;
                  for (var s = 0; s < t.length; s++) if (u.context === t[s]) {
                    o.lanes |= n, null !== (u = o.alternate) && (u.lanes |= n), Pa(o.return, n, e), r || (i = null);
                    break e;
                  }
                  o = u.next;
                }
              } else if (18 === a.tag) {
                if (null === (i = a.return)) throw Error(l(341));
                i.lanes |= n, null !== (o = i.alternate) && (o.lanes |= n), Pa(i, n, e), i = null;
              } else i = a.child;
              if (null !== i) i.return = a;else for (i = a; null !== i;) {
                if (i === e) {
                  i = null;
                  break;
                }
                if (null !== (a = i.sibling)) {
                  a.return = i.return, i = a;
                  break;
                }
                i = i.return;
              }
              a = i;
            }
          }
          function Ta(e, t, n, r) {
            e = null;
            for (var a = t, o = !1; null !== a;) {
              if (!o) if (524288 & a.flags) o = !0;else if (262144 & a.flags) break;
              if (10 === a.tag) {
                var i = a.alternate;
                if (null === i) throw Error(l(387));
                if (null !== (i = i.memoizedProps)) {
                  var u = a.type;
                  Jn(a.pendingProps.value, i.value) || (null !== e ? e.push(u) : e = [u]);
                }
              } else if (a === X.current) {
                if (null === (i = a.alternate)) throw Error(l(387));
                i.memoizedState.memoizedState !== a.memoizedState.memoizedState && (null !== e ? e.push(dd) : e = [dd]);
              }
              a = a.return;
            }
            null !== e && La(t, e, n, r), t.flags |= 262144;
          }
          function Na(e) {
            for (e = e.firstContext; null !== e;) {
              if (!Jn(e.context._currentValue, e.memoizedValue)) return !0;
              e = e.next;
            }
            return !1;
          }
          function Oa(e) {
            xa = e, Ea = null, null !== (e = e.dependencies) && (e.firstContext = null);
          }
          function Aa(e) {
            return Fa(xa, e);
          }
          function ja(e, t) {
            return null === xa && Oa(e), Fa(e, t);
          }
          function Fa(e, t) {
            var n = t._currentValue;
            if (t = {
              context: t,
              memoizedValue: n,
              next: null
            }, null === Ea) {
              if (null === e) throw Error(l(308));
              Ea = t, e.dependencies = {
                lanes: 0,
                firstContext: t
              }, e.flags |= 524288;
            } else Ea = Ea.next = t;
            return n;
          }
          var Ra = "undefined" != typeof AbortController ? AbortController : function () {
              var e = [],
                t = this.signal = {
                  aborted: !1,
                  addEventListener: function (t, n) {
                    e.push(n);
                  }
                };
              this.abort = function () {
                t.aborted = !0, e.forEach(function (e) {
                  return e();
                });
              };
            },
            Ma = t.unstable_scheduleCallback,
            Da = t.unstable_NormalPriority,
            Ia = {
              $$typeof: b,
              Consumer: null,
              Provider: null,
              _currentValue: null,
              _currentValue2: null,
              _threadCount: 0
            };
          function Va() {
            return {
              controller: new Ra(),
              data: new Map(),
              refCount: 0
            };
          }
          function Ba(e) {
            e.refCount--, 0 === e.refCount && Ma(Da, function () {
              e.controller.abort();
            });
          }
          var Ha = null,
            Ua = 0,
            Wa = 0,
            $a = null;
          function qa() {
            if (0 === --Ua && null !== Ha) {
              null !== $a && ($a.status = "fulfilled");
              var e = Ha;
              Ha = null, Wa = 0, $a = null;
              for (var t = 0; t < e.length; t++) (0, e[t])();
            }
          }
          var Qa = j.S;
          j.S = function (e, t) {
            js = se(), "object" === n(t) && null !== t && "function" == typeof t.then && function (e, t) {
              if (null === Ha) {
                var n = Ha = [];
                Ua = 0, Wa = Uc(), $a = {
                  status: "pending",
                  value: void 0,
                  then: function (e) {
                    n.push(e);
                  }
                };
              }
              Ua++, t.then(qa, qa);
            }(0, t), null !== Qa && Qa(e, t);
          };
          var Xa = V(null);
          function Ka() {
            var e = Xa.current;
            return null !== e ? e : hs.pooledCache;
          }
          function Ga(e, t) {
            H(Xa, null === t ? Xa.current : t.pool);
          }
          function Ya() {
            var e = Ka();
            return null === e ? null : {
              parent: Ia._currentValue,
              pool: e
            };
          }
          var Za = Error(l(460)),
            Ja = Error(l(474)),
            el = Error(l(542)),
            tl = {
              then: function () {}
            };
          function nl(e) {
            return "fulfilled" === (e = e.status) || "rejected" === e;
          }
          function rl(e, t, n) {
            switch (void 0 === (n = e[n]) ? e.push(t) : n !== t && (t.then(At, At), t = n), t.status) {
              case "fulfilled":
                return t.value;
              case "rejected":
                throw il(e = t.reason), e;
              default:
                if ("string" == typeof t.status) t.then(At, At);else {
                  if (null !== (e = hs) && 100 < e.shellSuspendCounter) throw Error(l(482));
                  (e = t).status = "pending", e.then(function (e) {
                    if ("pending" === t.status) {
                      var n = t;
                      n.status = "fulfilled", n.value = e;
                    }
                  }, function (e) {
                    if ("pending" === t.status) {
                      var n = t;
                      n.status = "rejected", n.reason = e;
                    }
                  });
                }
                switch (t.status) {
                  case "fulfilled":
                    return t.value;
                  case "rejected":
                    throw il(e = t.reason), e;
                }
                throw ll = t, Za;
            }
          }
          function al(e) {
            try {
              return (0, e._init)(e._payload);
            } catch (t) {
              if (null !== t && "object" === n(t) && "function" == typeof t.then) throw ll = t, Za;
              throw t;
            }
          }
          var ll = null;
          function ol() {
            if (null === ll) throw Error(l(459));
            var e = ll;
            return ll = null, e;
          }
          function il(e) {
            if (e === Za || e === el) throw Error(l(483));
          }
          var ul = null,
            sl = 0;
          function cl(e) {
            var t = sl;
            return sl += 1, null === ul && (ul = []), rl(ul, e, t);
          }
          function fl(e, t) {
            t = t.props.ref, e.ref = void 0 !== t ? t : null;
          }
          function dl(e, t) {
            if (t.$$typeof === d) throw Error(l(525));
            throw e = Object.prototype.toString.call(t), Error(l(31, "[object Object]" === e ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
          }
          function pl(e) {
            function t(t, n) {
              if (e) {
                var r = t.deletions;
                null === r ? (t.deletions = [n], t.flags |= 16) : r.push(n);
              }
            }
            function r(n, r) {
              if (!e) return null;
              for (; null !== r;) t(n, r), r = r.sibling;
              return null;
            }
            function a(e) {
              for (var t = new Map(); null !== e;) null !== e.key ? t.set(e.key, e) : t.set(e.index, e), e = e.sibling;
              return t;
            }
            function o(e, t) {
              return (e = Br(e, t)).index = 0, e.sibling = null, e;
            }
            function i(t, n, r) {
              return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags |= 67108866, n) : r : (t.flags |= 67108866, n) : (t.flags |= 1048576, n);
            }
            function u(t) {
              return e && null === t.alternate && (t.flags |= 67108866), t;
            }
            function s(e, t, n, r) {
              return null === t || 6 !== t.tag ? ((t = $r(n, e.mode, r)).return = e, t) : ((t = o(t, n)).return = e, t);
            }
            function c(e, t, r, a) {
              var l = r.type;
              return l === h ? d(e, t, r.props.children, a, r.key) : null !== t && (t.elementType === l || "object" === n(l) && null !== l && l.$$typeof === E && al(l) === t.type) ? (fl(t = o(t, r.props), r), t.return = e, t) : (fl(t = Ur(r.type, r.key, r.props, null, e.mode, a), r), t.return = e, t);
            }
            function f(e, t, n, r) {
              return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Qr(n, e.mode, r)).return = e, t) : ((t = o(t, n.children || [])).return = e, t);
            }
            function d(e, t, n, r, a) {
              return null === t || 7 !== t.tag ? ((t = Wr(n, e.mode, r, a)).return = e, t) : ((t = o(t, n)).return = e, t);
            }
            function g(e, t, r) {
              if ("string" == typeof t && "" !== t || "number" == typeof t || "bigint" == typeof t) return (t = $r("" + t, e.mode, r)).return = e, t;
              if ("object" === n(t) && null !== t) {
                switch (t.$$typeof) {
                  case p:
                    return fl(r = Ur(t.type, t.key, t.props, null, e.mode, r), t), r.return = e, r;
                  case m:
                    return (t = Qr(t, e.mode, r)).return = e, t;
                  case E:
                    return g(e, t = al(t), r);
                }
                if (O(t) || L(t)) return (t = Wr(t, e.mode, r, null)).return = e, t;
                if ("function" == typeof t.then) return g(e, cl(t), r);
                if (t.$$typeof === b) return g(e, ja(e, t), r);
                dl(e, t);
              }
              return null;
            }
            function v(e, t, r, a) {
              var l = null !== t ? t.key : null;
              if ("string" == typeof r && "" !== r || "number" == typeof r || "bigint" == typeof r) return null !== l ? null : s(e, t, "" + r, a);
              if ("object" === n(r) && null !== r) {
                switch (r.$$typeof) {
                  case p:
                    return r.key === l ? c(e, t, r, a) : null;
                  case m:
                    return r.key === l ? f(e, t, r, a) : null;
                  case E:
                    return v(e, t, r = al(r), a);
                }
                if (O(r) || L(r)) return null !== l ? null : d(e, t, r, a, null);
                if ("function" == typeof r.then) return v(e, t, cl(r), a);
                if (r.$$typeof === b) return v(e, t, ja(e, r), a);
                dl(e, r);
              }
              return null;
            }
            function y(e, t, r, a, l) {
              if ("string" == typeof a && "" !== a || "number" == typeof a || "bigint" == typeof a) return s(t, e = e.get(r) || null, "" + a, l);
              if ("object" === n(a) && null !== a) {
                switch (a.$$typeof) {
                  case p:
                    return c(t, e = e.get(null === a.key ? r : a.key) || null, a, l);
                  case m:
                    return f(t, e = e.get(null === a.key ? r : a.key) || null, a, l);
                  case E:
                    return y(e, t, r, a = al(a), l);
                }
                if (O(a) || L(a)) return d(t, e = e.get(r) || null, a, l, null);
                if ("function" == typeof a.then) return y(e, t, r, cl(a), l);
                if (a.$$typeof === b) return y(e, t, r, ja(t, a), l);
                dl(t, a);
              }
              return null;
            }
            function w(s, c, f, d) {
              if ("object" === n(f) && null !== f && f.type === h && null === f.key && (f = f.props.children), "object" === n(f) && null !== f) {
                switch (f.$$typeof) {
                  case p:
                    e: {
                      for (var k = f.key; null !== c;) {
                        if (c.key === k) {
                          if ((k = f.type) === h) {
                            if (7 === c.tag) {
                              r(s, c.sibling), (d = o(c, f.props.children)).return = s, s = d;
                              break e;
                            }
                          } else if (c.elementType === k || "object" === n(k) && null !== k && k.$$typeof === E && al(k) === c.type) {
                            r(s, c.sibling), fl(d = o(c, f.props), f), d.return = s, s = d;
                            break e;
                          }
                          r(s, c);
                          break;
                        }
                        t(s, c), c = c.sibling;
                      }
                      f.type === h ? ((d = Wr(f.props.children, s.mode, d, f.key)).return = s, s = d) : (fl(d = Ur(f.type, f.key, f.props, null, s.mode, d), f), d.return = s, s = d);
                    }
                    return u(s);
                  case m:
                    e: {
                      for (k = f.key; null !== c;) {
                        if (c.key === k) {
                          if (4 === c.tag && c.stateNode.containerInfo === f.containerInfo && c.stateNode.implementation === f.implementation) {
                            r(s, c.sibling), (d = o(c, f.children || [])).return = s, s = d;
                            break e;
                          }
                          r(s, c);
                          break;
                        }
                        t(s, c), c = c.sibling;
                      }
                      (d = Qr(f, s.mode, d)).return = s, s = d;
                    }
                    return u(s);
                  case E:
                    return w(s, c, f = al(f), d);
                }
                if (O(f)) return function (n, l, o, u) {
                  for (var s = null, c = null, f = l, d = l = 0, p = null; null !== f && d < o.length; d++) {
                    f.index > d ? (p = f, f = null) : p = f.sibling;
                    var m = v(n, f, o[d], u);
                    if (null === m) {
                      null === f && (f = p);
                      break;
                    }
                    e && f && null === m.alternate && t(n, f), l = i(m, l, d), null === c ? s = m : c.sibling = m, c = m, f = p;
                  }
                  if (d === o.length) return r(n, f), da && la(n, d), s;
                  if (null === f) {
                    for (; d < o.length; d++) null !== (f = g(n, o[d], u)) && (l = i(f, l, d), null === c ? s = f : c.sibling = f, c = f);
                    return da && la(n, d), s;
                  }
                  for (f = a(f); d < o.length; d++) null !== (p = y(f, n, d, o[d], u)) && (e && null !== p.alternate && f.delete(null === p.key ? d : p.key), l = i(p, l, d), null === c ? s = p : c.sibling = p, c = p);
                  return e && f.forEach(function (e) {
                    return t(n, e);
                  }), da && la(n, d), s;
                }(s, c, f, d);
                if (L(f)) {
                  if ("function" != typeof (k = L(f))) throw Error(l(150));
                  return function (n, o, u, s) {
                    if (null == u) throw Error(l(151));
                    for (var c = null, f = null, d = o, p = o = 0, m = null, h = u.next(); null !== d && !h.done; p++, h = u.next()) {
                      d.index > p ? (m = d, d = null) : m = d.sibling;
                      var b = v(n, d, h.value, s);
                      if (null === b) {
                        null === d && (d = m);
                        break;
                      }
                      e && d && null === b.alternate && t(n, d), o = i(b, o, p), null === f ? c = b : f.sibling = b, f = b, d = m;
                    }
                    if (h.done) return r(n, d), da && la(n, p), c;
                    if (null === d) {
                      for (; !h.done; p++, h = u.next()) null !== (h = g(n, h.value, s)) && (o = i(h, o, p), null === f ? c = h : f.sibling = h, f = h);
                      return da && la(n, p), c;
                    }
                    for (d = a(d); !h.done; p++, h = u.next()) null !== (h = y(d, n, p, h.value, s)) && (e && null !== h.alternate && d.delete(null === h.key ? p : h.key), o = i(h, o, p), null === f ? c = h : f.sibling = h, f = h);
                    return e && d.forEach(function (e) {
                      return t(n, e);
                    }), da && la(n, p), c;
                  }(s, c, f = k.call(f), d);
                }
                if ("function" == typeof f.then) return w(s, c, cl(f), d);
                if (f.$$typeof === b) return w(s, c, ja(s, f), d);
                dl(s, f);
              }
              return "string" == typeof f && "" !== f || "number" == typeof f || "bigint" == typeof f ? (f = "" + f, null !== c && 6 === c.tag ? (r(s, c.sibling), (d = o(c, f)).return = s, s = d) : (r(s, c), (d = $r(f, s.mode, d)).return = s, s = d), u(s)) : r(s, c);
            }
            return function (e, t, n, r) {
              try {
                sl = 0;
                var a = w(e, t, n, r);
                return ul = null, a;
              } catch (o) {
                if (o === Za || o === el) throw o;
                var l = Ir(29, o, null, e.mode);
                return l.lanes = r, l.return = e, l;
              }
            };
          }
          var ml = pl(!0),
            hl = pl(!1),
            gl = !1;
          function vl(e) {
            e.updateQueue = {
              baseState: e.memoizedState,
              firstBaseUpdate: null,
              lastBaseUpdate: null,
              shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
              },
              callbacks: null
            };
          }
          function yl(e, t) {
            e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
              baseState: e.baseState,
              firstBaseUpdate: e.firstBaseUpdate,
              lastBaseUpdate: e.lastBaseUpdate,
              shared: e.shared,
              callbacks: null
            });
          }
          function bl(e) {
            return {
              lane: e,
              tag: 0,
              payload: null,
              callback: null,
              next: null
            };
          }
          function wl(e, t, n) {
            var r = e.updateQueue;
            if (null === r) return null;
            if (r = r.shared, 2 & ms) {
              var a = r.pending;
              return null === a ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, t = Rr(e), Fr(e, null, n), t;
            }
            return Or(e, r, t, n), Rr(e);
          }
          function kl(e, t, n) {
            if (null !== (t = t.updateQueue) && (t = t.shared, 4194048 & n)) {
              var r = t.lanes;
              n |= r &= e.pendingLanes, t.lanes = n, Fe(e, n);
            }
          }
          function Sl(e, t) {
            var n = e.updateQueue,
              r = e.alternate;
            if (null !== r && n === (r = r.updateQueue)) {
              var a = null,
                l = null;
              if (null !== (n = n.firstBaseUpdate)) {
                do {
                  var o = {
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: null,
                    next: null
                  };
                  null === l ? a = l = o : l = l.next = o, n = n.next;
                } while (null !== n);
                null === l ? a = l = t : l = l.next = t;
              } else a = l = t;
              return n = {
                baseState: r.baseState,
                firstBaseUpdate: a,
                lastBaseUpdate: l,
                shared: r.shared,
                callbacks: r.callbacks
              }, void (e.updateQueue = n);
            }
            null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
          }
          var _l = !1;
          function xl() {
            if (_l) {
              if (null !== $a) throw $a;
            }
          }
          function El(e, t, n, r) {
            _l = !1;
            var a = e.updateQueue;
            gl = !1;
            var l = a.firstBaseUpdate,
              o = a.lastBaseUpdate,
              i = a.shared.pending;
            if (null !== i) {
              a.shared.pending = null;
              var u = i,
                s = u.next;
              u.next = null, null === o ? l = s : o.next = s, o = u;
              var c = e.alternate;
              null !== c && (i = (c = c.updateQueue).lastBaseUpdate) !== o && (null === i ? c.firstBaseUpdate = s : i.next = s, c.lastBaseUpdate = u);
            }
            if (null !== l) {
              var d = a.baseState;
              for (o = 0, c = s = u = null, i = l;;) {
                var p = -536870913 & i.lane,
                  m = p !== i.lane;
                if (m ? (vs & p) === p : (r & p) === p) {
                  0 !== p && p === Wa && (_l = !0), null !== c && (c = c.next = {
                    lane: 0,
                    tag: i.tag,
                    payload: i.payload,
                    callback: null,
                    next: null
                  });
                  e: {
                    var h = e,
                      g = i;
                    p = t;
                    var v = n;
                    switch (g.tag) {
                      case 1:
                        if ("function" == typeof (h = g.payload)) {
                          d = h.call(v, d, p);
                          break e;
                        }
                        d = h;
                        break e;
                      case 3:
                        h.flags = -65537 & h.flags | 128;
                      case 0:
                        if (null == (p = "function" == typeof (h = g.payload) ? h.call(v, d, p) : h)) break e;
                        d = f({}, d, p);
                        break e;
                      case 2:
                        gl = !0;
                    }
                  }
                  null !== (p = i.callback) && (e.flags |= 64, m && (e.flags |= 8192), null === (m = a.callbacks) ? a.callbacks = [p] : m.push(p));
                } else m = {
                  lane: p,
                  tag: i.tag,
                  payload: i.payload,
                  callback: i.callback,
                  next: null
                }, null === c ? (s = c = m, u = d) : c = c.next = m, o |= p;
                if (null === (i = i.next)) {
                  if (null === (i = a.shared.pending)) break;
                  i = (m = i).next, m.next = null, a.lastBaseUpdate = m, a.shared.pending = null;
                }
              }
              null === c && (u = d), a.baseState = u, a.firstBaseUpdate = s, a.lastBaseUpdate = c, null === l && (a.shared.lanes = 0), Es |= o, e.lanes = o, e.memoizedState = d;
            }
          }
          function Cl(e, t) {
            if ("function" != typeof e) throw Error(l(191, e));
            e.call(t);
          }
          function zl(e, t) {
            var n = e.callbacks;
            if (null !== n) for (e.callbacks = null, e = 0; e < n.length; e++) Cl(n[e], t);
          }
          var Pl = V(null),
            Ll = V(0);
          function Tl(e, t) {
            H(Ll, e = _s), H(Pl, t), _s = e | t.baseLanes;
          }
          function Nl() {
            H(Ll, _s), H(Pl, Pl.current);
          }
          function Ol() {
            _s = Ll.current, B(Pl), B(Ll);
          }
          var Al = V(null),
            jl = null;
          function Fl(e) {
            var t = e.alternate;
            H(Vl, 1 & Vl.current), H(Al, e), null === jl && (null === t || null !== Pl.current || null !== t.memoizedState) && (jl = e);
          }
          function Rl(e) {
            H(Vl, Vl.current), H(Al, e), null === jl && (jl = e);
          }
          function Ml(e) {
            22 === e.tag ? (H(Vl, Vl.current), H(Al, e), null === jl && (jl = e)) : Dl();
          }
          function Dl() {
            H(Vl, Vl.current), H(Al, Al.current);
          }
          function Il(e) {
            B(Al), jl === e && (jl = null), B(Vl);
          }
          var Vl = V(0);
          function Bl(e) {
            for (var t = e; null !== t;) {
              if (13 === t.tag) {
                var n = t.memoizedState;
                if (null !== n && (null === (n = n.dehydrated) || Af(n) || jf(n))) return t;
              } else if (19 !== t.tag || "forwards" !== t.memoizedProps.revealOrder && "backwards" !== t.memoizedProps.revealOrder && "unstable_legacy-backwards" !== t.memoizedProps.revealOrder && "together" !== t.memoizedProps.revealOrder) {
                if (null !== t.child) {
                  t.child.return = t, t = t.child;
                  continue;
                }
              } else if (128 & t.flags) return t;
              if (t === e) break;
              for (; null === t.sibling;) {
                if (null === t.return || t.return === e) return null;
                t = t.return;
              }
              t.sibling.return = t.return, t = t.sibling;
            }
            return null;
          }
          var Hl = 0,
            Ul = null,
            Wl = null,
            $l = null,
            ql = !1,
            Ql = !1,
            Xl = !1,
            Kl = 0,
            Gl = 0,
            Yl = null,
            Zl = 0;
          function Jl() {
            throw Error(l(321));
          }
          function eo(e, t) {
            if (null === t) return !1;
            for (var n = 0; n < t.length && n < e.length; n++) if (!Jn(e[n], t[n])) return !1;
            return !0;
          }
          function to(e, t, n, r, a, l) {
            return Hl = l, Ul = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = null === e || null === e.memoizedState ? vi : yi, Xl = !1, l = n(r, a), Xl = !1, Ql && (l = ro(t, n, r, a)), no(e), l;
          }
          function no(e) {
            j.H = gi;
            var t = null !== Wl && null !== Wl.next;
            if (Hl = 0, $l = Wl = Ul = null, ql = !1, Gl = 0, Yl = null, t) throw Error(l(300));
            null === e || ji || null !== (e = e.dependencies) && Na(e) && (ji = !0);
          }
          function ro(e, t, n, r) {
            Ul = e;
            var a = 0;
            do {
              if (Ql && (Yl = null), Gl = 0, Ql = !1, 25 <= a) throw Error(l(301));
              if (a += 1, $l = Wl = null, null != e.updateQueue) {
                var o = e.updateQueue;
                o.lastEffect = null, o.events = null, o.stores = null, null != o.memoCache && (o.memoCache.index = 0);
              }
              j.H = bi, o = t(n, r);
            } while (Ql);
            return o;
          }
          function ao() {
            var e = j.H,
              t = e.useState()[0];
            return t = "function" == typeof t.then ? co(t) : t, e = e.useState()[0], (null !== Wl ? Wl.memoizedState : null) !== e && (Ul.flags |= 1024), t;
          }
          function lo() {
            var e = 0 !== Kl;
            return Kl = 0, e;
          }
          function oo(e, t, n) {
            t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
          }
          function io(e) {
            if (ql) {
              for (e = e.memoizedState; null !== e;) {
                var t = e.queue;
                null !== t && (t.pending = null), e = e.next;
              }
              ql = !1;
            }
            Hl = 0, $l = Wl = Ul = null, Ql = !1, Gl = Kl = 0, Yl = null;
          }
          function uo() {
            var e = {
              memoizedState: null,
              baseState: null,
              baseQueue: null,
              queue: null,
              next: null
            };
            return null === $l ? Ul.memoizedState = $l = e : $l = $l.next = e, $l;
          }
          function so() {
            if (null === Wl) {
              var e = Ul.alternate;
              e = null !== e ? e.memoizedState : null;
            } else e = Wl.next;
            var t = null === $l ? Ul.memoizedState : $l.next;
            if (null !== t) $l = t, Wl = e;else {
              if (null === e) {
                if (null === Ul.alternate) throw Error(l(467));
                throw Error(l(310));
              }
              e = {
                memoizedState: (Wl = e).memoizedState,
                baseState: Wl.baseState,
                baseQueue: Wl.baseQueue,
                queue: Wl.queue,
                next: null
              }, null === $l ? Ul.memoizedState = $l = e : $l = $l.next = e;
            }
            return $l;
          }
          function co(e) {
            var t = Gl;
            return Gl += 1, null === Yl && (Yl = []), e = rl(Yl, e, t), t = Ul, null === (null === $l ? t.memoizedState : $l.next) && (t = t.alternate, j.H = null === t || null === t.memoizedState ? vi : yi), e;
          }
          function fo(e) {
            if (null !== e && "object" === n(e)) {
              if ("function" == typeof e.then) return co(e);
              if (e.$$typeof === b) return Aa(e);
            }
            throw Error(l(438, String(e)));
          }
          function po(e) {
            var t = null,
              n = Ul.updateQueue;
            if (null !== n && (t = n.memoCache), null == t) {
              var r = Ul.alternate;
              null !== r && null !== (r = r.updateQueue) && null != (r = r.memoCache) && (t = {
                data: r.data.map(function (e) {
                  return e.slice();
                }),
                index: 0
              });
            }
            if (null != t || (t = {
              data: [],
              index: 0
            }), null === n && (n = {
              lastEffect: null,
              events: null,
              stores: null,
              memoCache: null
            }, Ul.updateQueue = n), n.memoCache = t, void 0 === (n = t.data[t.index])) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = z;
            return t.index++, n;
          }
          function mo(e, t) {
            return "function" == typeof t ? t(e) : t;
          }
          function ho(e) {
            return go(so(), Wl, e);
          }
          function go(e, t, n) {
            var r = e.queue;
            if (null === r) throw Error(l(311));
            r.lastRenderedReducer = n;
            var a = e.baseQueue,
              o = r.pending;
            if (null !== o) {
              if (null !== a) {
                var i = a.next;
                a.next = o.next, o.next = i;
              }
              t.baseQueue = a = o, r.pending = null;
            }
            if (o = e.baseState, null === a) e.memoizedState = o;else {
              var u = i = null,
                s = null,
                c = t = a.next,
                f = !1;
              do {
                var d = -536870913 & c.lane;
                if (d !== c.lane ? (vs & d) === d : (Hl & d) === d) {
                  var p = c.revertLane;
                  if (0 === p) null !== s && (s = s.next = {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                  }), d === Wa && (f = !0);else {
                    if ((Hl & p) === p) {
                      c = c.next, p === Wa && (f = !0);
                      continue;
                    }
                    d = {
                      lane: 0,
                      revertLane: c.revertLane,
                      gesture: null,
                      action: c.action,
                      hasEagerState: c.hasEagerState,
                      eagerState: c.eagerState,
                      next: null
                    }, null === s ? (u = s = d, i = o) : s = s.next = d, Ul.lanes |= p, Es |= p;
                  }
                  d = c.action, Xl && n(o, d), o = c.hasEagerState ? c.eagerState : n(o, d);
                } else p = {
                  lane: d,
                  revertLane: c.revertLane,
                  gesture: c.gesture,
                  action: c.action,
                  hasEagerState: c.hasEagerState,
                  eagerState: c.eagerState,
                  next: null
                }, null === s ? (u = s = p, i = o) : s = s.next = p, Ul.lanes |= d, Es |= d;
                c = c.next;
              } while (null !== c && c !== t);
              if (null === s ? i = o : s.next = u, !Jn(o, e.memoizedState) && (ji = !0, f && null !== (n = $a))) throw n;
              e.memoizedState = o, e.baseState = i, e.baseQueue = s, r.lastRenderedState = o;
            }
            return null === a && (r.lanes = 0), [e.memoizedState, r.dispatch];
          }
          function vo(e) {
            var t = so(),
              n = t.queue;
            if (null === n) throw Error(l(311));
            n.lastRenderedReducer = e;
            var r = n.dispatch,
              a = n.pending,
              o = t.memoizedState;
            if (null !== a) {
              n.pending = null;
              var i = a = a.next;
              do {
                o = e(o, i.action), i = i.next;
              } while (i !== a);
              Jn(o, t.memoizedState) || (ji = !0), t.memoizedState = o, null === t.baseQueue && (t.baseState = o), n.lastRenderedState = o;
            }
            return [o, r];
          }
          function yo(e, t, n) {
            var r = Ul,
              a = so(),
              o = da;
            if (o) {
              if (void 0 === n) throw Error(l(407));
              n = n();
            } else n = t();
            var i = !Jn((Wl || a).memoizedState, n);
            if (i && (a.memoizedState = n, ji = !0), a = a.queue, Uo(ko.bind(null, r, a, e), [e]), a.getSnapshot !== t || i || null !== $l && 1 & $l.memoizedState.tag) {
              if (r.flags |= 2048, Do(9, {
                destroy: void 0
              }, wo.bind(null, r, a, n, t), null), null === hs) throw Error(l(349));
              o || 127 & Hl || bo(r, t, n);
            }
            return n;
          }
          function bo(e, t, n) {
            e.flags |= 16384, e = {
              getSnapshot: t,
              value: n
            }, null === (t = Ul.updateQueue) ? (t = {
              lastEffect: null,
              events: null,
              stores: null,
              memoCache: null
            }, Ul.updateQueue = t, t.stores = [e]) : null === (n = t.stores) ? t.stores = [e] : n.push(e);
          }
          function wo(e, t, n, r) {
            t.value = n, t.getSnapshot = r, So(t) && _o(e);
          }
          function ko(e, t, n) {
            return n(function () {
              So(t) && _o(e);
            });
          }
          function So(e) {
            var t = e.getSnapshot;
            e = e.value;
            try {
              var n = t();
              return !Jn(e, n);
            } catch (r) {
              return !0;
            }
          }
          function _o(e) {
            var t = jr(e, 2);
            null !== t && Ks(t, e, 2);
          }
          function xo(e) {
            var t = uo();
            if ("function" == typeof e) {
              var n = e;
              if (e = n(), Xl) {
                we(!0);
                try {
                  n();
                } finally {
                  we(!1);
                }
              }
            }
            return t.memoizedState = t.baseState = e, t.queue = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: mo,
              lastRenderedState: e
            }, t;
          }
          function Eo(e, t, n, r) {
            return e.baseState = n, go(e, Wl, "function" == typeof r ? r : mo);
          }
          function Co(e, t, n, r, a) {
            if (pi(e)) throw Error(l(485));
            if (null !== (e = t.action)) {
              var o = {
                payload: a,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function (e) {
                  o.listeners.push(e);
                }
              };
              null !== j.T ? n(!0) : o.isTransition = !1, r(o), null === (n = t.pending) ? (o.next = t.pending = o, zo(t, o)) : (o.next = n.next, t.pending = n.next = o);
            }
          }
          function zo(e, t) {
            var n = t.action,
              r = t.payload,
              a = e.state;
            if (t.isTransition) {
              var l = j.T,
                o = {};
              j.T = o;
              try {
                var i = n(a, r),
                  u = j.S;
                null !== u && u(o, i), Po(e, t, i);
              } catch (s) {
                To(e, t, s);
              } finally {
                null !== l && null !== o.types && (l.types = o.types), j.T = l;
              }
            } else try {
              Po(e, t, l = n(a, r));
            } catch (c) {
              To(e, t, c);
            }
          }
          function Po(e, t, r) {
            null !== r && "object" === n(r) && "function" == typeof r.then ? r.then(function (n) {
              Lo(e, t, n);
            }, function (n) {
              return To(e, t, n);
            }) : Lo(e, t, r);
          }
          function Lo(e, t, n) {
            t.status = "fulfilled", t.value = n, No(t), e.state = n, null !== (t = e.pending) && ((n = t.next) === t ? e.pending = null : (n = n.next, t.next = n, zo(e, n)));
          }
          function To(e, t, n) {
            var r = e.pending;
            if (e.pending = null, null !== r) {
              r = r.next;
              do {
                t.status = "rejected", t.reason = n, No(t), t = t.next;
              } while (t !== r);
            }
            e.action = null;
          }
          function No(e) {
            e = e.listeners;
            for (var t = 0; t < e.length; t++) (0, e[t])();
          }
          function Oo(e, t) {
            return t;
          }
          function Ao(e, t) {
            if (da) {
              var n = hs.formState;
              if (null !== n) {
                e: {
                  var r = Ul;
                  if (da) {
                    if (fa) {
                      t: {
                        for (var a = fa, l = ma; 8 !== a.nodeType;) {
                          if (!l) {
                            a = null;
                            break t;
                          }
                          if (null === (a = Ff(a.nextSibling))) {
                            a = null;
                            break t;
                          }
                        }
                        a = "F!" === (l = a.data) || "F" === l ? a : null;
                      }
                      if (a) {
                        fa = Ff(a.nextSibling), r = "F!" === a.data;
                        break e;
                      }
                    }
                    ga(r);
                  }
                  r = !1;
                }
                r && (t = n[0]);
              }
            }
            return (n = uo()).memoizedState = n.baseState = t, r = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: Oo,
              lastRenderedState: t
            }, n.queue = r, n = ci.bind(null, Ul, r), r.dispatch = n, r = xo(!1), l = di.bind(null, Ul, !1, r.queue), a = {
              state: t,
              dispatch: null,
              action: e,
              pending: null
            }, (r = uo()).queue = a, n = Co.bind(null, Ul, a, l, n), a.dispatch = n, r.memoizedState = e, [t, n, !1];
          }
          function jo(e) {
            return Fo(so(), Wl, e);
          }
          function Fo(e, t, r) {
            if (t = go(e, t, Oo)[0], e = ho(mo)[0], "object" === n(t) && null !== t && "function" == typeof t.then) try {
              var a = co(t);
            } catch (i) {
              if (i === Za) throw el;
              throw i;
            } else a = t;
            var l = (t = so()).queue,
              o = l.dispatch;
            return r !== t.memoizedState && (Ul.flags |= 2048, Do(9, {
              destroy: void 0
            }, Ro.bind(null, l, r), null)), [a, o, e];
          }
          function Ro(e, t) {
            e.action = t;
          }
          function Mo(e) {
            var t = so(),
              n = Wl;
            if (null !== n) return Fo(t, n, e);
            so(), t = t.memoizedState;
            var r = (n = so()).queue.dispatch;
            return n.memoizedState = e, [t, r, !1];
          }
          function Do(e, t, n, r) {
            return e = {
              tag: e,
              create: n,
              deps: r,
              inst: t,
              next: null
            }, null === (t = Ul.updateQueue) && (t = {
              lastEffect: null,
              events: null,
              stores: null,
              memoCache: null
            }, Ul.updateQueue = t), null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
          }
          function Io() {
            return so().memoizedState;
          }
          function Vo(e, t, n, r) {
            var a = uo();
            Ul.flags |= e, a.memoizedState = Do(1 | t, {
              destroy: void 0
            }, n, void 0 === r ? null : r);
          }
          function Bo(e, t, n, r) {
            var a = so();
            r = void 0 === r ? null : r;
            var l = a.memoizedState.inst;
            null !== Wl && null !== r && eo(r, Wl.memoizedState.deps) ? a.memoizedState = Do(t, l, n, r) : (Ul.flags |= e, a.memoizedState = Do(1 | t, l, n, r));
          }
          function Ho(e, t) {
            Vo(8390656, 8, e, t);
          }
          function Uo(e, t) {
            Bo(2048, 8, e, t);
          }
          function Wo(e) {
            var t = so().memoizedState;
            return function (e) {
              Ul.flags |= 4;
              var t = Ul.updateQueue;
              if (null === t) t = {
                lastEffect: null,
                events: null,
                stores: null,
                memoCache: null
              }, Ul.updateQueue = t, t.events = [e];else {
                var n = t.events;
                null === n ? t.events = [e] : n.push(e);
              }
            }({
              ref: t,
              nextImpl: e
            }), function () {
              if (2 & ms) throw Error(l(440));
              return t.impl.apply(void 0, arguments);
            };
          }
          function $o(e, t) {
            return Bo(4, 2, e, t);
          }
          function qo(e, t) {
            return Bo(4, 4, e, t);
          }
          function Qo(e, t) {
            if ("function" == typeof t) {
              e = e();
              var n = t(e);
              return function () {
                "function" == typeof n ? n() : t(null);
              };
            }
            if (null != t) return e = e(), t.current = e, function () {
              t.current = null;
            };
          }
          function Xo(e, t, n) {
            n = null != n ? n.concat([e]) : null, Bo(4, 4, Qo.bind(null, t, e), n);
          }
          function Ko() {}
          function Go(e, t) {
            var n = so();
            t = void 0 === t ? null : t;
            var r = n.memoizedState;
            return null !== t && eo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
          }
          function Yo(e, t) {
            var n = so();
            t = void 0 === t ? null : t;
            var r = n.memoizedState;
            if (null !== t && eo(t, r[1])) return r[0];
            if (r = e(), Xl) {
              we(!0);
              try {
                e();
              } finally {
                we(!1);
              }
            }
            return n.memoizedState = [r, t], r;
          }
          function Zo(e, t, n) {
            return void 0 === n || 1073741824 & Hl && !(261930 & vs) ? e.memoizedState = t : (e.memoizedState = n, e = Xs(), Ul.lanes |= e, Es |= e, n);
          }
          function Jo(e, t, n, r) {
            return Jn(n, t) ? n : null !== Pl.current ? (e = Zo(e, n, r), Jn(e, t) || (ji = !0), e) : 42 & Hl && (!(1073741824 & Hl) || 261930 & vs) ? (e = Xs(), Ul.lanes |= e, Es |= e, t) : (ji = !0, e.memoizedState = n);
          }
          function ei(e, t, r, a, l) {
            var o = R.p;
            R.p = 0 !== o && 8 > o ? o : 8;
            var i = j.T,
              u = {};
            j.T = u, di(e, !1, t, r);
            try {
              var s = l(),
                c = j.S;
              null !== c && c(u, s), null !== s && "object" === n(s) && "function" == typeof s.then ? fi(e, t, function (e, t) {
                var n = [],
                  r = {
                    status: "pending",
                    value: null,
                    reason: null,
                    then: function (e) {
                      n.push(e);
                    }
                  };
                return e.then(function () {
                  r.status = "fulfilled", r.value = t;
                  for (var e = 0; e < n.length; e++) (0, n[e])(t);
                }, function (e) {
                  for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
                }), r;
              }(s, a), Qs()) : fi(e, t, a, Qs());
            } catch (f) {
              fi(e, t, {
                then: function () {},
                status: "rejected",
                reason: f
              }, Qs());
            } finally {
              R.p = o, null !== i && null !== u.types && (i.types = u.types), j.T = i;
            }
          }
          function ti() {}
          function ni(e, t, n, r) {
            if (5 !== e.tag) throw Error(l(476));
            var a = ri(e).queue;
            ei(e, a, t, M, null === n ? ti : function () {
              return ai(e), n(r);
            });
          }
          function ri(e) {
            var t = e.memoizedState;
            if (null !== t) return t;
            var n = {};
            return (t = {
              memoizedState: M,
              baseState: M,
              baseQueue: null,
              queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: mo,
                lastRenderedState: M
              },
              next: null
            }).next = {
              memoizedState: n,
              baseState: n,
              baseQueue: null,
              queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: mo,
                lastRenderedState: n
              },
              next: null
            }, e.memoizedState = t, null !== (e = e.alternate) && (e.memoizedState = t), t;
          }
          function ai(e) {
            var t = ri(e);
            null === t.next && (t = e.alternate.memoizedState), fi(e, t.next.queue, {}, Qs());
          }
          function li() {
            return Aa(dd);
          }
          function oi() {
            return so().memoizedState;
          }
          function ii() {
            return so().memoizedState;
          }
          function ui(e) {
            for (var t = e.return; null !== t;) {
              switch (t.tag) {
                case 24:
                case 3:
                  var n = Qs(),
                    r = wl(t, e = bl(n), n);
                  return null !== r && (Ks(r, t, n), kl(r, t, n)), t = {
                    cache: Va()
                  }, void (e.payload = t);
              }
              t = t.return;
            }
          }
          function si(e, t, n) {
            var r = Qs();
            n = {
              lane: r,
              revertLane: 0,
              gesture: null,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null
            }, pi(e) ? mi(t, n) : null !== (n = Ar(e, t, n, r)) && (Ks(n, e, r), hi(n, t, r));
          }
          function ci(e, t, n) {
            fi(e, t, n, Qs());
          }
          function fi(e, t, n, r) {
            var a = {
              lane: r,
              revertLane: 0,
              gesture: null,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null
            };
            if (pi(e)) mi(t, a);else {
              var l = e.alternate;
              if (0 === e.lanes && (null === l || 0 === l.lanes) && null !== (l = t.lastRenderedReducer)) try {
                var o = t.lastRenderedState,
                  i = l(o, n);
                if (a.hasEagerState = !0, a.eagerState = i, Jn(i, o)) return Or(e, t, a, 0), null === hs && Nr(), !1;
              } catch (u) {}
              if (null !== (n = Ar(e, t, a, r))) return Ks(n, e, r), hi(n, t, r), !0;
            }
            return !1;
          }
          function di(e, t, n, r) {
            if (r = {
              lane: 2,
              revertLane: Uc(),
              gesture: null,
              action: r,
              hasEagerState: !1,
              eagerState: null,
              next: null
            }, pi(e)) {
              if (t) throw Error(l(479));
            } else null !== (t = Ar(e, n, r, 2)) && Ks(t, e, 2);
          }
          function pi(e) {
            var t = e.alternate;
            return e === Ul || null !== t && t === Ul;
          }
          function mi(e, t) {
            Ql = ql = !0;
            var n = e.pending;
            null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
          }
          function hi(e, t, n) {
            if (4194048 & n) {
              var r = t.lanes;
              n |= r &= e.pendingLanes, t.lanes = n, Fe(e, n);
            }
          }
          var gi = {
            readContext: Aa,
            use: fo,
            useCallback: Jl,
            useContext: Jl,
            useEffect: Jl,
            useImperativeHandle: Jl,
            useLayoutEffect: Jl,
            useInsertionEffect: Jl,
            useMemo: Jl,
            useReducer: Jl,
            useRef: Jl,
            useState: Jl,
            useDebugValue: Jl,
            useDeferredValue: Jl,
            useTransition: Jl,
            useSyncExternalStore: Jl,
            useId: Jl,
            useHostTransitionStatus: Jl,
            useFormState: Jl,
            useActionState: Jl,
            useOptimistic: Jl,
            useMemoCache: Jl,
            useCacheRefresh: Jl
          };
          gi.useEffectEvent = Jl;
          var vi = {
              readContext: Aa,
              use: fo,
              useCallback: function (e, t) {
                return uo().memoizedState = [e, void 0 === t ? null : t], e;
              },
              useContext: Aa,
              useEffect: Ho,
              useImperativeHandle: function (e, t, n) {
                n = null != n ? n.concat([e]) : null, Vo(4194308, 4, Qo.bind(null, t, e), n);
              },
              useLayoutEffect: function (e, t) {
                return Vo(4194308, 4, e, t);
              },
              useInsertionEffect: function (e, t) {
                Vo(4, 2, e, t);
              },
              useMemo: function (e, t) {
                var n = uo();
                t = void 0 === t ? null : t;
                var r = e();
                if (Xl) {
                  we(!0);
                  try {
                    e();
                  } finally {
                    we(!1);
                  }
                }
                return n.memoizedState = [r, t], r;
              },
              useReducer: function (e, t, n) {
                var r = uo();
                if (void 0 !== n) {
                  var a = n(t);
                  if (Xl) {
                    we(!0);
                    try {
                      n(t);
                    } finally {
                      we(!1);
                    }
                  }
                } else a = t;
                return r.memoizedState = r.baseState = a, e = {
                  pending: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: a
                }, r.queue = e, e = e.dispatch = si.bind(null, Ul, e), [r.memoizedState, e];
              },
              useRef: function (e) {
                return e = {
                  current: e
                }, uo().memoizedState = e;
              },
              useState: function (e) {
                var t = (e = xo(e)).queue,
                  n = ci.bind(null, Ul, t);
                return t.dispatch = n, [e.memoizedState, n];
              },
              useDebugValue: Ko,
              useDeferredValue: function (e, t) {
                return Zo(uo(), e, t);
              },
              useTransition: function () {
                var e = xo(!1);
                return e = ei.bind(null, Ul, e.queue, !0, !1), uo().memoizedState = e, [!1, e];
              },
              useSyncExternalStore: function (e, t, n) {
                var r = Ul,
                  a = uo();
                if (da) {
                  if (void 0 === n) throw Error(l(407));
                  n = n();
                } else {
                  if (n = t(), null === hs) throw Error(l(349));
                  127 & vs || bo(r, t, n);
                }
                a.memoizedState = n;
                var o = {
                  value: n,
                  getSnapshot: t
                };
                return a.queue = o, Ho(ko.bind(null, r, o, e), [e]), r.flags |= 2048, Do(9, {
                  destroy: void 0
                }, wo.bind(null, r, o, n, t), null), n;
              },
              useId: function () {
                var e = uo(),
                  t = hs.identifierPrefix;
                if (da) {
                  var n = aa;
                  t = "_" + t + "R_" + (n = (ra & ~(1 << 32 - ke(ra) - 1)).toString(32) + n), 0 < (n = Kl++) && (t += "H" + n.toString(32)), t += "_";
                } else t = "_" + t + "r_" + (n = Zl++).toString(32) + "_";
                return e.memoizedState = t;
              },
              useHostTransitionStatus: li,
              useFormState: Ao,
              useActionState: Ao,
              useOptimistic: function (e) {
                var t = uo();
                t.memoizedState = t.baseState = e;
                var n = {
                  pending: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: null,
                  lastRenderedState: null
                };
                return t.queue = n, t = di.bind(null, Ul, !0, n), n.dispatch = t, [e, t];
              },
              useMemoCache: po,
              useCacheRefresh: function () {
                return uo().memoizedState = ui.bind(null, Ul);
              },
              useEffectEvent: function (e) {
                var t = uo(),
                  n = {
                    impl: e
                  };
                return t.memoizedState = n, function () {
                  if (2 & ms) throw Error(l(440));
                  return n.impl.apply(void 0, arguments);
                };
              }
            },
            yi = {
              readContext: Aa,
              use: fo,
              useCallback: Go,
              useContext: Aa,
              useEffect: Uo,
              useImperativeHandle: Xo,
              useInsertionEffect: $o,
              useLayoutEffect: qo,
              useMemo: Yo,
              useReducer: ho,
              useRef: Io,
              useState: function () {
                return ho(mo);
              },
              useDebugValue: Ko,
              useDeferredValue: function (e, t) {
                return Jo(so(), Wl.memoizedState, e, t);
              },
              useTransition: function () {
                var e = ho(mo)[0],
                  t = so().memoizedState;
                return ["boolean" == typeof e ? e : co(e), t];
              },
              useSyncExternalStore: yo,
              useId: oi,
              useHostTransitionStatus: li,
              useFormState: jo,
              useActionState: jo,
              useOptimistic: function (e, t) {
                return Eo(so(), 0, e, t);
              },
              useMemoCache: po,
              useCacheRefresh: ii
            };
          yi.useEffectEvent = Wo;
          var bi = {
            readContext: Aa,
            use: fo,
            useCallback: Go,
            useContext: Aa,
            useEffect: Uo,
            useImperativeHandle: Xo,
            useInsertionEffect: $o,
            useLayoutEffect: qo,
            useMemo: Yo,
            useReducer: vo,
            useRef: Io,
            useState: function () {
              return vo(mo);
            },
            useDebugValue: Ko,
            useDeferredValue: function (e, t) {
              var n = so();
              return null === Wl ? Zo(n, e, t) : Jo(n, Wl.memoizedState, e, t);
            },
            useTransition: function () {
              var e = vo(mo)[0],
                t = so().memoizedState;
              return ["boolean" == typeof e ? e : co(e), t];
            },
            useSyncExternalStore: yo,
            useId: oi,
            useHostTransitionStatus: li,
            useFormState: Mo,
            useActionState: Mo,
            useOptimistic: function (e, t) {
              var n = so();
              return null !== Wl ? Eo(n, 0, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
            },
            useMemoCache: po,
            useCacheRefresh: ii
          };
          function wi(e, t, n, r) {
            n = null == (n = n(r, t = e.memoizedState)) ? t : f({}, t, n), e.memoizedState = n, 0 === e.lanes && (e.updateQueue.baseState = n);
          }
          bi.useEffectEvent = Wo;
          var ki = {
            enqueueSetState: function (e, t, n) {
              e = e._reactInternals;
              var r = Qs(),
                a = bl(r);
              a.payload = t, null != n && (a.callback = n), null !== (t = wl(e, a, r)) && (Ks(t, e, r), kl(t, e, r));
            },
            enqueueReplaceState: function (e, t, n) {
              e = e._reactInternals;
              var r = Qs(),
                a = bl(r);
              a.tag = 1, a.payload = t, null != n && (a.callback = n), null !== (t = wl(e, a, r)) && (Ks(t, e, r), kl(t, e, r));
            },
            enqueueForceUpdate: function (e, t) {
              e = e._reactInternals;
              var n = Qs(),
                r = bl(n);
              r.tag = 2, null != t && (r.callback = t), null !== (t = wl(e, r, n)) && (Ks(t, e, n), kl(t, e, n));
            }
          };
          function Si(e, t, n, r, a, l, o) {
            return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, l, o) : !t.prototype || !t.prototype.isPureReactComponent || !er(n, r) || !er(a, l);
          }
          function _i(e, t, n, r) {
            e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ki.enqueueReplaceState(t, t.state, null);
          }
          function xi(e, t) {
            var n = t;
            if ("ref" in t) for (var r in n = {}, t) "ref" !== r && (n[r] = t[r]);
            if (e = e.defaultProps) for (var a in n === t && (n = f({}, n)), e) void 0 === n[a] && (n[a] = e[a]);
            return n;
          }
          function Ei(e) {
            zr(e);
          }
          function Ci(e) {
            console.error(e);
          }
          function zi(e) {
            zr(e);
          }
          function Pi(e, t) {
            try {
              (0, e.onUncaughtError)(t.value, {
                componentStack: t.stack
              });
            } catch (n) {
              setTimeout(function () {
                throw n;
              });
            }
          }
          function Li(e, t, n) {
            try {
              (0, e.onCaughtError)(n.value, {
                componentStack: n.stack,
                errorBoundary: 1 === t.tag ? t.stateNode : null
              });
            } catch (r) {
              setTimeout(function () {
                throw r;
              });
            }
          }
          function Ti(e, t, n) {
            return (n = bl(n)).tag = 3, n.payload = {
              element: null
            }, n.callback = function () {
              Pi(e, t);
            }, n;
          }
          function Ni(e) {
            return (e = bl(e)).tag = 3, e;
          }
          function Oi(e, t, n, r) {
            var a = n.type.getDerivedStateFromError;
            if ("function" == typeof a) {
              var l = r.value;
              e.payload = function () {
                return a(l);
              }, e.callback = function () {
                Li(t, n, r);
              };
            }
            var o = n.stateNode;
            null !== o && "function" == typeof o.componentDidCatch && (e.callback = function () {
              Li(t, n, r), "function" != typeof a && (null === Ms ? Ms = new Set([this]) : Ms.add(this));
              var e = r.stack;
              this.componentDidCatch(r.value, {
                componentStack: null !== e ? e : ""
              });
            });
          }
          var Ai = Error(l(461)),
            ji = !1;
          function Fi(e, t, n, r) {
            t.child = null === e ? hl(t, null, n, r) : ml(t, e.child, n, r);
          }
          function Ri(e, t, n, r, a) {
            n = n.render;
            var l = t.ref;
            if ("ref" in r) {
              var o = {};
              for (var i in r) "ref" !== i && (o[i] = r[i]);
            } else o = r;
            return Oa(t), r = to(e, t, n, o, l, a), i = lo(), null === e || ji ? (da && i && ia(t), t.flags |= 1, Fi(e, t, r, a), t.child) : (oo(e, t, a), lu(e, t, a));
          }
          function Mi(e, t, n, r, a) {
            if (null === e) {
              var l = n.type;
              return "function" != typeof l || Vr(l) || void 0 !== l.defaultProps || null !== n.compare ? ((e = Ur(n.type, null, r, t, t.mode, a)).ref = t.ref, e.return = t, t.child = e) : (t.tag = 15, t.type = l, Di(e, t, l, r, a));
            }
            if (l = e.child, !ou(e, a)) {
              var o = l.memoizedProps;
              if ((n = null !== (n = n.compare) ? n : er)(o, r) && e.ref === t.ref) return lu(e, t, a);
            }
            return t.flags |= 1, (e = Br(l, r)).ref = t.ref, e.return = t, t.child = e;
          }
          function Di(e, t, n, r, a) {
            if (null !== e) {
              var l = e.memoizedProps;
              if (er(l, r) && e.ref === t.ref) {
                if (ji = !1, t.pendingProps = r = l, !ou(e, a)) return t.lanes = e.lanes, lu(e, t, a);
                131072 & e.flags && (ji = !0);
              }
            }
            return $i(e, t, n, r, a);
          }
          function Ii(e, t, n, r) {
            var a = r.children,
              l = null !== e ? e.memoizedState : null;
            if (null === e && null === t.stateNode && (t.stateNode = {
              _visibility: 1,
              _pendingMarkers: null,
              _retryCache: null,
              _transitions: null
            }), "hidden" === r.mode) {
              if (128 & t.flags) {
                if (l = null !== l ? l.baseLanes | n : n, null !== e) {
                  for (r = t.child = e.child, a = 0; null !== r;) a = a | r.lanes | r.childLanes, r = r.sibling;
                  r = a & ~l;
                } else r = 0, t.child = null;
                return Bi(e, t, l, n, r);
              }
              if (!(536870912 & n)) return r = t.lanes = 536870912, Bi(e, t, null !== l ? l.baseLanes | n : n, n, r);
              t.memoizedState = {
                baseLanes: 0,
                cachePool: null
              }, null !== e && Ga(0, null !== l ? l.cachePool : null), null !== l ? Tl(t, l) : Nl(), Ml(t);
            } else null !== l ? (Ga(0, l.cachePool), Tl(t, l), Dl(), t.memoizedState = null) : (null !== e && Ga(0, null), Nl(), Dl());
            return Fi(e, t, a, n), t.child;
          }
          function Vi(e, t) {
            return null !== e && 22 === e.tag || null !== t.stateNode || (t.stateNode = {
              _visibility: 1,
              _pendingMarkers: null,
              _retryCache: null,
              _transitions: null
            }), t.sibling;
          }
          function Bi(e, t, n, r, a) {
            var l = Ka();
            return l = null === l ? null : {
              parent: Ia._currentValue,
              pool: l
            }, t.memoizedState = {
              baseLanes: n,
              cachePool: l
            }, null !== e && Ga(0, null), Nl(), Ml(t), null !== e && Ta(e, t, r, !0), t.childLanes = a, null;
          }
          function Hi(e, t) {
            return (t = eu({
              mode: t.mode,
              children: t.children
            }, e.mode)).ref = e.ref, e.child = t, t.return = e, t;
          }
          function Ui(e, t, n) {
            return ml(t, e.child, null, n), (e = Hi(t, t.pendingProps)).flags |= 2, Il(t), t.memoizedState = null, e;
          }
          function Wi(e, t) {
            var r = t.ref;
            if (null === r) null !== e && null !== e.ref && (t.flags |= 4194816);else {
              if ("function" != typeof r && "object" !== n(r)) throw Error(l(284));
              null !== e && e.ref === r || (t.flags |= 4194816);
            }
          }
          function $i(e, t, n, r, a) {
            return Oa(t), n = to(e, t, n, r, void 0, a), r = lo(), null === e || ji ? (da && r && ia(t), t.flags |= 1, Fi(e, t, n, a), t.child) : (oo(e, t, a), lu(e, t, a));
          }
          function qi(e, t, n, r, a, l) {
            return Oa(t), t.updateQueue = null, n = ro(t, r, n, a), no(e), r = lo(), null === e || ji ? (da && r && ia(t), t.flags |= 1, Fi(e, t, n, l), t.child) : (oo(e, t, l), lu(e, t, l));
          }
          function Qi(e, t, r, a, l) {
            if (Oa(t), null === t.stateNode) {
              var o = Mr,
                i = r.contextType;
              "object" === n(i) && null !== i && (o = Aa(i)), o = new r(a, o), t.memoizedState = null !== o.state && void 0 !== o.state ? o.state : null, o.updater = ki, t.stateNode = o, o._reactInternals = t, (o = t.stateNode).props = a, o.state = t.memoizedState, o.refs = {}, vl(t), i = r.contextType, o.context = "object" === n(i) && null !== i ? Aa(i) : Mr, o.state = t.memoizedState, "function" == typeof (i = r.getDerivedStateFromProps) && (wi(t, r, i, a), o.state = t.memoizedState), "function" == typeof r.getDerivedStateFromProps || "function" == typeof o.getSnapshotBeforeUpdate || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || (i = o.state, "function" == typeof o.componentWillMount && o.componentWillMount(), "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount(), i !== o.state && ki.enqueueReplaceState(o, o.state, null), El(t, a, o, l), xl(), o.state = t.memoizedState), "function" == typeof o.componentDidMount && (t.flags |= 4194308), a = !0;
            } else if (null === e) {
              o = t.stateNode;
              var u = t.memoizedProps,
                s = xi(r, u);
              o.props = s;
              var c = o.context,
                f = r.contextType;
              i = Mr, "object" === n(f) && null !== f && (i = Aa(f));
              var d = r.getDerivedStateFromProps;
              f = "function" == typeof d || "function" == typeof o.getSnapshotBeforeUpdate, u = t.pendingProps !== u, f || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (u || c !== i) && _i(t, o, a, i), gl = !1;
              var p = t.memoizedState;
              o.state = p, El(t, a, o, l), xl(), c = t.memoizedState, u || p !== c || gl ? ("function" == typeof d && (wi(t, r, d, a), c = t.memoizedState), (s = gl || Si(t, r, s, a, p, c, i)) ? (f || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || ("function" == typeof o.componentWillMount && o.componentWillMount(), "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()), "function" == typeof o.componentDidMount && (t.flags |= 4194308)) : ("function" == typeof o.componentDidMount && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = c), o.props = a, o.state = c, o.context = i, a = s) : ("function" == typeof o.componentDidMount && (t.flags |= 4194308), a = !1);
            } else {
              o = t.stateNode, yl(e, t), f = xi(r, i = t.memoizedProps), o.props = f, d = t.pendingProps, p = o.context, c = r.contextType, s = Mr, "object" === n(c) && null !== c && (s = Aa(c)), (c = "function" == typeof (u = r.getDerivedStateFromProps) || "function" == typeof o.getSnapshotBeforeUpdate) || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (i !== d || p !== s) && _i(t, o, a, s), gl = !1, p = t.memoizedState, o.state = p, El(t, a, o, l), xl();
              var m = t.memoizedState;
              i !== d || p !== m || gl || null !== e && null !== e.dependencies && Na(e.dependencies) ? ("function" == typeof u && (wi(t, r, u, a), m = t.memoizedState), (f = gl || Si(t, r, f, a, p, m, s) || null !== e && null !== e.dependencies && Na(e.dependencies)) ? (c || "function" != typeof o.UNSAFE_componentWillUpdate && "function" != typeof o.componentWillUpdate || ("function" == typeof o.componentWillUpdate && o.componentWillUpdate(a, m, s), "function" == typeof o.UNSAFE_componentWillUpdate && o.UNSAFE_componentWillUpdate(a, m, s)), "function" == typeof o.componentDidUpdate && (t.flags |= 4), "function" == typeof o.getSnapshotBeforeUpdate && (t.flags |= 1024)) : ("function" != typeof o.componentDidUpdate || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), "function" != typeof o.getSnapshotBeforeUpdate || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = m), o.props = a, o.state = m, o.context = s, a = f) : ("function" != typeof o.componentDidUpdate || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), "function" != typeof o.getSnapshotBeforeUpdate || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
            }
            return o = a, Wi(e, t), a = !!(128 & t.flags), o || a ? (o = t.stateNode, r = a && "function" != typeof r.getDerivedStateFromError ? null : o.render(), t.flags |= 1, null !== e && a ? (t.child = ml(t, e.child, null, l), t.child = ml(t, null, r, l)) : Fi(e, t, r, l), t.memoizedState = o.state, e = t.child) : e = lu(e, t, l), e;
          }
          function Xi(e, t, n, r) {
            return wa(), t.flags |= 256, Fi(e, t, n, r), t.child;
          }
          var Ki = {
            dehydrated: null,
            treeContext: null,
            retryLane: 0,
            hydrationErrors: null
          };
          function Gi(e) {
            return {
              baseLanes: e,
              cachePool: Ya()
            };
          }
          function Yi(e, t, n) {
            return e = null !== e ? e.childLanes & ~n : 0, t && (e |= Ps), e;
          }
          function Zi(e, t, n) {
            var r,
              a = t.pendingProps,
              o = !1,
              i = !!(128 & t.flags);
            if ((r = i) || (r = (null === e || null !== e.memoizedState) && !!(2 & Vl.current)), r && (o = !0, t.flags &= -129), r = !!(32 & t.flags), t.flags &= -33, null === e) {
              if (da) {
                if (o ? Fl(t) : Dl(), (e = fa) ? null !== (e = null !== (e = Of(e, ma)) && "&" !== e.data ? e : null) && (t.memoizedState = {
                  dehydrated: e,
                  treeContext: null !== na ? {
                    id: ra,
                    overflow: aa
                  } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }, (n = qr(e)).return = t, t.child = n, ca = t, fa = null) : e = null, null === e) throw ga(t);
                return jf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
              }
              var u = a.children;
              return a = a.fallback, o ? (Dl(), u = eu({
                mode: "hidden",
                children: u
              }, o = t.mode), a = Wr(a, o, n, null), u.return = t, a.return = t, u.sibling = a, t.child = u, (a = t.child).memoizedState = Gi(n), a.childLanes = Yi(e, r, n), t.memoizedState = Ki, Vi(null, a)) : (Fl(t), Ji(t, u));
            }
            var s = e.memoizedState;
            if (null !== s && null !== (u = s.dehydrated)) {
              if (i) 256 & t.flags ? (Fl(t), t.flags &= -257, t = tu(e, t, n)) : null !== t.memoizedState ? (Dl(), t.child = e.child, t.flags |= 128, t = null) : (Dl(), u = a.fallback, o = t.mode, a = eu({
                mode: "visible",
                children: a.children
              }, o), (u = Wr(u, o, n, null)).flags |= 2, a.return = t, u.return = t, a.sibling = u, t.child = a, ml(t, e.child, null, n), (a = t.child).memoizedState = Gi(n), a.childLanes = Yi(e, r, n), t.memoizedState = Ki, t = Vi(null, a));else if (Fl(t), jf(u)) {
                if (r = u.nextSibling && u.nextSibling.dataset) var c = r.dgst;
                r = c, (a = Error(l(419))).stack = "", a.digest = r, Sa({
                  value: a,
                  source: null,
                  stack: null
                }), t = tu(e, t, n);
              } else if (ji || Ta(e, t, n, !1), r = 0 !== (n & e.childLanes), ji || r) {
                if (null !== (r = hs) && 0 !== (a = Re(r, n)) && a !== s.retryLane) throw s.retryLane = a, jr(e, a), Ks(r, e, a), Ai;
                Af(u) || ic(), t = tu(e, t, n);
              } else Af(u) ? (t.flags |= 192, t.child = e.child, t = null) : (e = s.treeContext, fa = Ff(u.nextSibling), ca = t, da = !0, pa = null, ma = !1, null !== e && sa(t, e), (t = Ji(t, a.children)).flags |= 4096);
              return t;
            }
            return o ? (Dl(), u = a.fallback, o = t.mode, c = (s = e.child).sibling, (a = Br(s, {
              mode: "hidden",
              children: a.children
            })).subtreeFlags = 65011712 & s.subtreeFlags, null !== c ? u = Br(c, u) : (u = Wr(u, o, n, null)).flags |= 2, u.return = t, a.return = t, a.sibling = u, t.child = a, Vi(null, a), a = t.child, null === (u = e.child.memoizedState) ? u = Gi(n) : (null !== (o = u.cachePool) ? (s = Ia._currentValue, o = o.parent !== s ? {
              parent: s,
              pool: s
            } : o) : o = Ya(), u = {
              baseLanes: u.baseLanes | n,
              cachePool: o
            }), a.memoizedState = u, a.childLanes = Yi(e, r, n), t.memoizedState = Ki, Vi(e.child, a)) : (Fl(t), e = (n = e.child).sibling, (n = Br(n, {
              mode: "visible",
              children: a.children
            })).return = t, n.sibling = null, null !== e && (null === (r = t.deletions) ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
          }
          function Ji(e, t) {
            return (t = eu({
              mode: "visible",
              children: t
            }, e.mode)).return = e, e.child = t;
          }
          function eu(e, t) {
            return (e = Ir(22, e, null, t)).lanes = 0, e;
          }
          function tu(e, t, n) {
            return ml(t, e.child, null, n), (e = Ji(t, t.pendingProps.children)).flags |= 2, t.memoizedState = null, e;
          }
          function nu(e, t, n) {
            e.lanes |= t;
            var r = e.alternate;
            null !== r && (r.lanes |= t), Pa(e.return, t, n);
          }
          function ru(e, t, n, r, a, l) {
            var o = e.memoizedState;
            null === o ? e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: a,
              treeForkCount: l
            } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = a, o.treeForkCount = l);
          }
          function au(e, t, n) {
            var r = t.pendingProps,
              a = r.revealOrder,
              l = r.tail;
            r = r.children;
            var o = Vl.current,
              i = !!(2 & o);
            if (i ? (o = 1 & o | 2, t.flags |= 128) : o &= 1, H(Vl, o), Fi(e, t, r, n), r = da ? Jr : 0, !i && null !== e && 128 & e.flags) e: for (e = t.child; null !== e;) {
              if (13 === e.tag) null !== e.memoizedState && nu(e, n, t);else if (19 === e.tag) nu(e, n, t);else if (null !== e.child) {
                e.child.return = e, e = e.child;
                continue;
              }
              if (e === t) break e;
              for (; null === e.sibling;) {
                if (null === e.return || e.return === t) break e;
                e = e.return;
              }
              e.sibling.return = e.return, e = e.sibling;
            }
            switch (a) {
              case "forwards":
                for (n = t.child, a = null; null !== n;) null !== (e = n.alternate) && null === Bl(e) && (a = n), n = n.sibling;
                null === (n = a) ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), ru(t, !1, a, n, l, r);
                break;
              case "backwards":
              case "unstable_legacy-backwards":
                for (n = null, a = t.child, t.child = null; null !== a;) {
                  if (null !== (e = a.alternate) && null === Bl(e)) {
                    t.child = a;
                    break;
                  }
                  e = a.sibling, a.sibling = n, n = a, a = e;
                }
                ru(t, !0, n, null, l, r);
                break;
              case "together":
                ru(t, !1, null, null, void 0, r);
                break;
              default:
                t.memoizedState = null;
            }
            return t.child;
          }
          function lu(e, t, n) {
            if (null !== e && (t.dependencies = e.dependencies), Es |= t.lanes, 0 === (n & t.childLanes)) {
              if (null === e) return null;
              if (Ta(e, t, n, !1), 0 === (n & t.childLanes)) return null;
            }
            if (null !== e && t.child !== e.child) throw Error(l(153));
            if (null !== t.child) {
              for (n = Br(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = Br(e, e.pendingProps)).return = t;
              n.sibling = null;
            }
            return t.child;
          }
          function ou(e, t) {
            return 0 !== (e.lanes & t) || !(null === (e = e.dependencies) || !Na(e));
          }
          function iu(e, t, n) {
            if (null !== e) {
              if (e.memoizedProps !== t.pendingProps) ji = !0;else {
                if (!(ou(e, n) || 128 & t.flags)) return ji = !1, function (e, t, n) {
                  switch (t.tag) {
                    case 3:
                      K(t, t.stateNode.containerInfo), Ca(0, Ia, e.memoizedState.cache), wa();
                      break;
                    case 27:
                    case 5:
                      Y(t);
                      break;
                    case 4:
                      K(t, t.stateNode.containerInfo);
                      break;
                    case 10:
                      Ca(0, t.type, t.memoizedProps.value);
                      break;
                    case 31:
                      if (null !== t.memoizedState) return t.flags |= 128, Rl(t), null;
                      break;
                    case 13:
                      var r = t.memoizedState;
                      if (null !== r) return null !== r.dehydrated ? (Fl(t), t.flags |= 128, null) : 0 !== (n & t.child.childLanes) ? Zi(e, t, n) : (Fl(t), null !== (e = lu(e, t, n)) ? e.sibling : null);
                      Fl(t);
                      break;
                    case 19:
                      var a = !!(128 & e.flags);
                      if ((r = 0 !== (n & t.childLanes)) || (Ta(e, t, n, !1), r = 0 !== (n & t.childLanes)), a) {
                        if (r) return au(e, t, n);
                        t.flags |= 128;
                      }
                      if (null !== (a = t.memoizedState) && (a.rendering = null, a.tail = null, a.lastEffect = null), H(Vl, Vl.current), r) break;
                      return null;
                    case 22:
                      return t.lanes = 0, Ii(e, t, n, t.pendingProps);
                    case 24:
                      Ca(0, Ia, e.memoizedState.cache);
                  }
                  return lu(e, t, n);
                }(e, t, n);
                ji = !!(131072 & e.flags);
              }
            } else ji = !1, da && 1048576 & t.flags && oa(t, Jr, t.index);
            switch (t.lanes = 0, t.tag) {
              case 16:
                e: {
                  var r = t.pendingProps;
                  if (e = al(t.elementType), t.type = e, "function" != typeof e) {
                    if (null != e) {
                      var a = e.$$typeof;
                      if (a === w) {
                        t.tag = 11, t = Ri(null, t, e, r, n);
                        break e;
                      }
                      if (a === _) {
                        t.tag = 14, t = Mi(null, t, e, r, n);
                        break e;
                      }
                    }
                    throw t = N(e) || e, Error(l(306, t, ""));
                  }
                  Vr(e) ? (r = xi(e, r), t.tag = 1, t = Qi(null, t, e, r, n)) : (t.tag = 0, t = $i(null, t, e, r, n));
                }
                return t;
              case 0:
                return $i(e, t, t.type, t.pendingProps, n);
              case 1:
                return Qi(e, t, r = t.type, a = xi(r, t.pendingProps), n);
              case 3:
                e: {
                  if (K(t, t.stateNode.containerInfo), null === e) throw Error(l(387));
                  r = t.pendingProps;
                  var o = t.memoizedState;
                  a = o.element, yl(e, t), El(t, r, null, n);
                  var i = t.memoizedState;
                  if (r = i.cache, Ca(0, Ia, r), r !== o.cache && La(t, [Ia], n, !0), xl(), r = i.element, o.isDehydrated) {
                    if (o = {
                      element: r,
                      isDehydrated: !1,
                      cache: i.cache
                    }, t.updateQueue.baseState = o, t.memoizedState = o, 256 & t.flags) {
                      t = Xi(e, t, r, n);
                      break e;
                    }
                    if (r !== a) {
                      Sa(a = Kr(Error(l(424)), t)), t = Xi(e, t, r, n);
                      break e;
                    }
                    if (9 === (e = t.stateNode.containerInfo).nodeType) e = e.body;else e = "HTML" === e.nodeName ? e.ownerDocument.body : e;
                    for (fa = Ff(e.firstChild), ca = t, da = !0, pa = null, ma = !0, n = hl(t, null, r, n), t.child = n; n;) n.flags = -3 & n.flags | 4096, n = n.sibling;
                  } else {
                    if (wa(), r === a) {
                      t = lu(e, t, n);
                      break e;
                    }
                    Fi(e, t, r, n);
                  }
                  t = t.child;
                }
                return t;
              case 26:
                return Wi(e, t), null === e ? (n = Qf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : da || (n = t.type, e = t.pendingProps, (r = yf(Q.current).createElement(n))[He] = t, r[Ue] = e, mf(r, n, e), tt(r), t.stateNode = r) : t.memoizedState = Qf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
              case 27:
                return Y(t), null === e && da && (r = t.stateNode = If(t.type, t.pendingProps, Q.current), ca = t, ma = !0, a = fa, Pf(t.type) ? (Rf = a, fa = Ff(r.firstChild)) : fa = a), Fi(e, t, t.pendingProps.children, n), Wi(e, t), null === e && (t.flags |= 4194304), t.child;
              case 5:
                return null === e && da && ((a = r = fa) && (null !== (r = function (e, t, n, r) {
                  for (; 1 === e.nodeType;) {
                    var a = n;
                    if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                      if (!r && ("INPUT" !== e.nodeName || "hidden" !== e.type)) break;
                    } else if (r) {
                      if (!e[Ke]) switch (t) {
                        case "meta":
                          if (!e.hasAttribute("itemprop")) break;
                          return e;
                        case "link":
                          if ("stylesheet" === (l = e.getAttribute("rel")) && e.hasAttribute("data-precedence")) break;
                          if (l !== a.rel || e.getAttribute("href") !== (null == a.href || "" === a.href ? null : a.href) || e.getAttribute("crossorigin") !== (null == a.crossOrigin ? null : a.crossOrigin) || e.getAttribute("title") !== (null == a.title ? null : a.title)) break;
                          return e;
                        case "style":
                          if (e.hasAttribute("data-precedence")) break;
                          return e;
                        case "script":
                          if (((l = e.getAttribute("src")) !== (null == a.src ? null : a.src) || e.getAttribute("type") !== (null == a.type ? null : a.type) || e.getAttribute("crossorigin") !== (null == a.crossOrigin ? null : a.crossOrigin)) && l && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
                          return e;
                        default:
                          return e;
                      }
                    } else {
                      if ("input" !== t || "hidden" !== e.type) return e;
                      var l = null == a.name ? null : "" + a.name;
                      if ("hidden" === a.type && e.getAttribute("name") === l) return e;
                    }
                    if (null === (e = Ff(e.nextSibling))) break;
                  }
                  return null;
                }(r, t.type, t.pendingProps, ma)) ? (t.stateNode = r, ca = t, fa = Ff(r.firstChild), ma = !1, a = !0) : a = !1), a || ga(t)), Y(t), a = t.type, o = t.pendingProps, i = null !== e ? e.memoizedProps : null, r = o.children, kf(a, o) ? r = null : null !== i && kf(a, i) && (t.flags |= 32), null !== t.memoizedState && (a = to(e, t, ao, null, null, n), dd._currentValue = a), Wi(e, t), Fi(e, t, r, n), t.child;
              case 6:
                return null === e && da && ((e = n = fa) && (null !== (n = function (e, t, n) {
                  if ("" === t) return null;
                  for (; 3 !== e.nodeType;) {
                    if ((1 !== e.nodeType || "INPUT" !== e.nodeName || "hidden" !== e.type) && !n) return null;
                    if (null === (e = Ff(e.nextSibling))) return null;
                  }
                  return e;
                }(n, t.pendingProps, ma)) ? (t.stateNode = n, ca = t, fa = null, e = !0) : e = !1), e || ga(t)), null;
              case 13:
                return Zi(e, t, n);
              case 4:
                return K(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = ml(t, null, r, n) : Fi(e, t, r, n), t.child;
              case 11:
                return Ri(e, t, t.type, t.pendingProps, n);
              case 7:
                return Fi(e, t, t.pendingProps, n), t.child;
              case 8:
              case 12:
                return Fi(e, t, t.pendingProps.children, n), t.child;
              case 10:
                return r = t.pendingProps, Ca(0, t.type, r.value), Fi(e, t, r.children, n), t.child;
              case 9:
                return a = t.type._context, r = t.pendingProps.children, Oa(t), r = r(a = Aa(a)), t.flags |= 1, Fi(e, t, r, n), t.child;
              case 14:
                return Mi(e, t, t.type, t.pendingProps, n);
              case 15:
                return Di(e, t, t.type, t.pendingProps, n);
              case 19:
                return au(e, t, n);
              case 31:
                return function (e, t, n) {
                  var r = t.pendingProps,
                    a = !!(128 & t.flags);
                  if (t.flags &= -129, null === e) {
                    if (da) {
                      if ("hidden" === r.mode) return e = Hi(t, r), t.lanes = 536870912, Vi(null, e);
                      if (Rl(t), (e = fa) ? null !== (e = null !== (e = Of(e, ma)) && "&" === e.data ? e : null) && (t.memoizedState = {
                        dehydrated: e,
                        treeContext: null !== na ? {
                          id: ra,
                          overflow: aa
                        } : null,
                        retryLane: 536870912,
                        hydrationErrors: null
                      }, (n = qr(e)).return = t, t.child = n, ca = t, fa = null) : e = null, null === e) throw ga(t);
                      return t.lanes = 536870912, null;
                    }
                    return Hi(t, r);
                  }
                  var o = e.memoizedState;
                  if (null !== o) {
                    var i = o.dehydrated;
                    if (Rl(t), a) {
                      if (256 & t.flags) t.flags &= -257, t = Ui(e, t, n);else {
                        if (null === t.memoizedState) throw Error(l(558));
                        t.child = e.child, t.flags |= 128, t = null;
                      }
                    } else if (ji || Ta(e, t, n, !1), a = 0 !== (n & e.childLanes), ji || a) {
                      if (null !== (r = hs) && 0 !== (i = Re(r, n)) && i !== o.retryLane) throw o.retryLane = i, jr(e, i), Ks(r, e, i), Ai;
                      ic(), t = Ui(e, t, n);
                    } else e = o.treeContext, fa = Ff(i.nextSibling), ca = t, da = !0, pa = null, ma = !1, null !== e && sa(t, e), (t = Hi(t, r)).flags |= 4096;
                    return t;
                  }
                  return (e = Br(e.child, {
                    mode: r.mode,
                    children: r.children
                  })).ref = t.ref, t.child = e, e.return = t, e;
                }(e, t, n);
              case 22:
                return Ii(e, t, n, t.pendingProps);
              case 24:
                return Oa(t), r = Aa(Ia), null === e ? (null === (a = Ka()) && (a = hs, o = Va(), a.pooledCache = o, o.refCount++, null !== o && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
                  parent: r,
                  cache: a
                }, vl(t), Ca(0, Ia, a)) : (0 !== (e.lanes & n) && (yl(e, t), El(t, null, null, n), xl()), a = e.memoizedState, o = t.memoizedState, a.parent !== r ? (a = {
                  parent: r,
                  cache: r
                }, t.memoizedState = a, 0 === t.lanes && (t.memoizedState = t.updateQueue.baseState = a), Ca(0, Ia, r)) : (r = o.cache, Ca(0, Ia, r), r !== a.cache && La(t, [Ia], n, !0))), Fi(e, t, t.pendingProps.children, n), t.child;
              case 29:
                throw t.pendingProps;
            }
            throw Error(l(156, t.tag));
          }
          function uu(e) {
            e.flags |= 4;
          }
          function su(e, t, n, r, a) {
            if ((t = !!(32 & e.mode)) && (t = !1), t) {
              if (e.flags |= 16777216, (335544128 & a) === a) if (e.stateNode.complete) e.flags |= 8192;else {
                if (!ac()) throw ll = tl, Ja;
                e.flags |= 8192;
              }
            } else e.flags &= -16777217;
          }
          function cu(e, t) {
            if ("stylesheet" !== t.type || 4 & t.state.loading) e.flags &= -16777217;else if (e.flags |= 16777216, !od(t)) {
              if (!ac()) throw ll = tl, Ja;
              e.flags |= 8192;
            }
          }
          function fu(e, t) {
            null !== t && (e.flags |= 4), 16384 & e.flags && (t = 22 !== e.tag ? Ne() : 536870912, e.lanes |= t, Ls |= t);
          }
          function du(e, t) {
            if (!da) switch (e.tailMode) {
              case "hidden":
                t = e.tail;
                for (var n = null; null !== t;) null !== t.alternate && (n = t), t = t.sibling;
                null === n ? e.tail = null : n.sibling = null;
                break;
              case "collapsed":
                n = e.tail;
                for (var r = null; null !== n;) null !== n.alternate && (r = n), n = n.sibling;
                null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null;
            }
          }
          function pu(e) {
            var t = null !== e.alternate && e.alternate.child === e.child,
              n = 0,
              r = 0;
            if (t) for (var a = e.child; null !== a;) n |= a.lanes | a.childLanes, r |= 65011712 & a.subtreeFlags, r |= 65011712 & a.flags, a.return = e, a = a.sibling;else for (a = e.child; null !== a;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
            return e.subtreeFlags |= r, e.childLanes = n, t;
          }
          function mu(e, t, n) {
            var r = t.pendingProps;
            switch (ua(t), t.tag) {
              case 16:
              case 15:
              case 0:
              case 11:
              case 7:
              case 8:
              case 12:
              case 9:
              case 14:
              case 1:
                return pu(t), null;
              case 3:
                return n = t.stateNode, r = null, null !== e && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), za(Ia), G(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), null !== e && null !== e.child || (ba(t) ? uu(t) : null === e || e.memoizedState.isDehydrated && !(256 & t.flags) || (t.flags |= 1024, ka())), pu(t), null;
              case 26:
                var a = t.type,
                  o = t.memoizedState;
                return null === e ? (uu(t), null !== o ? (pu(t), cu(t, o)) : (pu(t), su(t, a, 0, 0, n))) : o ? o !== e.memoizedState ? (uu(t), pu(t), cu(t, o)) : (pu(t), t.flags &= -16777217) : ((e = e.memoizedProps) !== r && uu(t), pu(t), su(t, a, 0, 0, n)), null;
              case 27:
                if (Z(t), n = Q.current, a = t.type, null !== e && null != t.stateNode) e.memoizedProps !== r && uu(t);else {
                  if (!r) {
                    if (null === t.stateNode) throw Error(l(166));
                    return pu(t), null;
                  }
                  e = $.current, ba(t) ? va(t) : (e = If(a, r, n), t.stateNode = e, uu(t));
                }
                return pu(t), null;
              case 5:
                if (Z(t), a = t.type, null !== e && null != t.stateNode) e.memoizedProps !== r && uu(t);else {
                  if (!r) {
                    if (null === t.stateNode) throw Error(l(166));
                    return pu(t), null;
                  }
                  if (o = $.current, ba(t)) va(t);else {
                    var i = yf(Q.current);
                    switch (o) {
                      case 1:
                        o = i.createElementNS("http://www.w3.org/2000/svg", a);
                        break;
                      case 2:
                        o = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                        break;
                      default:
                        switch (a) {
                          case "svg":
                            o = i.createElementNS("http://www.w3.org/2000/svg", a);
                            break;
                          case "math":
                            o = i.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                            break;
                          case "script":
                            (o = i.createElement("div")).innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
                            break;
                          case "select":
                            o = "string" == typeof r.is ? i.createElement("select", {
                              is: r.is
                            }) : i.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
                            break;
                          default:
                            o = "string" == typeof r.is ? i.createElement(a, {
                              is: r.is
                            }) : i.createElement(a);
                        }
                    }
                    o[He] = t, o[Ue] = r;
                    e: for (i = t.child; null !== i;) {
                      if (5 === i.tag || 6 === i.tag) o.appendChild(i.stateNode);else if (4 !== i.tag && 27 !== i.tag && null !== i.child) {
                        i.child.return = i, i = i.child;
                        continue;
                      }
                      if (i === t) break e;
                      for (; null === i.sibling;) {
                        if (null === i.return || i.return === t) break e;
                        i = i.return;
                      }
                      i.sibling.return = i.return, i = i.sibling;
                    }
                    t.stateNode = o;
                    e: switch (mf(o, a, r), a) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        r = !!r.autoFocus;
                        break e;
                      case "img":
                        r = !0;
                        break e;
                      default:
                        r = !1;
                    }
                    r && uu(t);
                  }
                }
                return pu(t), su(t, t.type, null === e || e.memoizedProps, t.pendingProps, n), null;
              case 6:
                if (e && null != t.stateNode) e.memoizedProps !== r && uu(t);else {
                  if ("string" != typeof r && null === t.stateNode) throw Error(l(166));
                  if (e = Q.current, ba(t)) {
                    if (e = t.stateNode, n = t.memoizedProps, r = null, null !== (a = ca)) switch (a.tag) {
                      case 27:
                      case 5:
                        r = a.memoizedProps;
                    }
                    e[He] = t, (e = !!(e.nodeValue === n || null !== r && !0 === r.suppressHydrationWarning || ff(e.nodeValue, n))) || ga(t, !0);
                  } else (e = yf(e).createTextNode(r))[He] = t, t.stateNode = e;
                }
                return pu(t), null;
              case 31:
                if (n = t.memoizedState, null === e || null !== e.memoizedState) {
                  if (r = ba(t), null !== n) {
                    if (null === e) {
                      if (!r) throw Error(l(318));
                      if (!(e = null !== (e = t.memoizedState) ? e.dehydrated : null)) throw Error(l(557));
                      e[He] = t;
                    } else wa(), !(128 & t.flags) && (t.memoizedState = null), t.flags |= 4;
                    pu(t), e = !1;
                  } else n = ka(), null !== e && null !== e.memoizedState && (e.memoizedState.hydrationErrors = n), e = !0;
                  if (!e) return 256 & t.flags ? (Il(t), t) : (Il(t), null);
                  if (128 & t.flags) throw Error(l(558));
                }
                return pu(t), null;
              case 13:
                if (r = t.memoizedState, null === e || null !== e.memoizedState && null !== e.memoizedState.dehydrated) {
                  if (a = ba(t), null !== r && null !== r.dehydrated) {
                    if (null === e) {
                      if (!a) throw Error(l(318));
                      if (!(a = null !== (a = t.memoizedState) ? a.dehydrated : null)) throw Error(l(317));
                      a[He] = t;
                    } else wa(), !(128 & t.flags) && (t.memoizedState = null), t.flags |= 4;
                    pu(t), a = !1;
                  } else a = ka(), null !== e && null !== e.memoizedState && (e.memoizedState.hydrationErrors = a), a = !0;
                  if (!a) return 256 & t.flags ? (Il(t), t) : (Il(t), null);
                }
                return Il(t), 128 & t.flags ? (t.lanes = n, t) : (n = null !== r, e = null !== e && null !== e.memoizedState, n && (a = null, null !== (r = t.child).alternate && null !== r.alternate.memoizedState && null !== r.alternate.memoizedState.cachePool && (a = r.alternate.memoizedState.cachePool.pool), o = null, null !== r.memoizedState && null !== r.memoizedState.cachePool && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), fu(t, t.updateQueue), pu(t), null);
              case 4:
                return G(), null === e && ef(t.stateNode.containerInfo), pu(t), null;
              case 10:
                return za(t.type), pu(t), null;
              case 19:
                if (B(Vl), null === (r = t.memoizedState)) return pu(t), null;
                if (a = !!(128 & t.flags), null === (o = r.rendering)) {
                  if (a) du(r, !1);else {
                    if (0 !== xs || null !== e && 128 & e.flags) for (e = t.child; null !== e;) {
                      if (null !== (o = Bl(e))) {
                        for (t.flags |= 128, du(r, !1), e = o.updateQueue, t.updateQueue = e, fu(t, e), t.subtreeFlags = 0, e = n, n = t.child; null !== n;) Hr(n, e), n = n.sibling;
                        return H(Vl, 1 & Vl.current | 2), da && la(t, r.treeForkCount), t.child;
                      }
                      e = e.sibling;
                    }
                    null !== r.tail && se() > Fs && (t.flags |= 128, a = !0, du(r, !1), t.lanes = 4194304);
                  }
                } else {
                  if (!a) if (null !== (e = Bl(o))) {
                    if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, fu(t, e), du(r, !0), null === r.tail && "hidden" === r.tailMode && !o.alternate && !da) return pu(t), null;
                  } else 2 * se() - r.renderingStartTime > Fs && 536870912 !== n && (t.flags |= 128, a = !0, du(r, !1), t.lanes = 4194304);
                  r.isBackwards ? (o.sibling = t.child, t.child = o) : (null !== (e = r.last) ? e.sibling = o : t.child = o, r.last = o);
                }
                return null !== r.tail ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = se(), e.sibling = null, n = Vl.current, H(Vl, a ? 1 & n | 2 : 1 & n), da && la(t, r.treeForkCount), e) : (pu(t), null);
              case 22:
              case 23:
                return Il(t), Ol(), r = null !== t.memoizedState, null !== e ? null !== e.memoizedState !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? !!(536870912 & n) && !(128 & t.flags) && (pu(t), 6 & t.subtreeFlags && (t.flags |= 8192)) : pu(t), null !== (n = t.updateQueue) && fu(t, n.retryQueue), n = null, null !== e && null !== e.memoizedState && null !== e.memoizedState.cachePool && (n = e.memoizedState.cachePool.pool), r = null, null !== t.memoizedState && null !== t.memoizedState.cachePool && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), null !== e && B(Xa), null;
              case 24:
                return n = null, null !== e && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), za(Ia), pu(t), null;
              case 25:
              case 30:
                return null;
            }
            throw Error(l(156, t.tag));
          }
          function hu(e, t) {
            switch (ua(t), t.tag) {
              case 1:
                return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
              case 3:
                return za(Ia), G(), 65536 & (e = t.flags) && !(128 & e) ? (t.flags = -65537 & e | 128, t) : null;
              case 26:
              case 27:
              case 5:
                return Z(t), null;
              case 31:
                if (null !== t.memoizedState) {
                  if (Il(t), null === t.alternate) throw Error(l(340));
                  wa();
                }
                return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
              case 13:
                if (Il(t), null !== (e = t.memoizedState) && null !== e.dehydrated) {
                  if (null === t.alternate) throw Error(l(340));
                  wa();
                }
                return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
              case 19:
                return B(Vl), null;
              case 4:
                return G(), null;
              case 10:
                return za(t.type), null;
              case 22:
              case 23:
                return Il(t), Ol(), null !== e && B(Xa), 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
              case 24:
                return za(Ia), null;
              default:
                return null;
            }
          }
          function gu(e, t) {
            switch (ua(t), t.tag) {
              case 3:
                za(Ia), G();
                break;
              case 26:
              case 27:
              case 5:
                Z(t);
                break;
              case 4:
                G();
                break;
              case 31:
                null !== t.memoizedState && Il(t);
                break;
              case 13:
                Il(t);
                break;
              case 19:
                B(Vl);
                break;
              case 10:
                za(t.type);
                break;
              case 22:
              case 23:
                Il(t), Ol(), null !== e && B(Xa);
                break;
              case 24:
                za(Ia);
            }
          }
          function vu(e, t) {
            try {
              var n = t.updateQueue,
                r = null !== n ? n.lastEffect : null;
              if (null !== r) {
                var a = r.next;
                n = a;
                do {
                  if ((n.tag & e) === e) {
                    r = void 0;
                    var l = n.create,
                      o = n.inst;
                    r = l(), o.destroy = r;
                  }
                  n = n.next;
                } while (n !== a);
              }
            } catch (i) {
              xc(t, t.return, i);
            }
          }
          function yu(e, t, n) {
            try {
              var r = t.updateQueue,
                a = null !== r ? r.lastEffect : null;
              if (null !== a) {
                var l = a.next;
                r = l;
                do {
                  if ((r.tag & e) === e) {
                    var o = r.inst,
                      i = o.destroy;
                    if (void 0 !== i) {
                      o.destroy = void 0, a = t;
                      var u = n,
                        s = i;
                      try {
                        s();
                      } catch (c) {
                        xc(a, u, c);
                      }
                    }
                  }
                  r = r.next;
                } while (r !== l);
              }
            } catch (c) {
              xc(t, t.return, c);
            }
          }
          function bu(e) {
            var t = e.updateQueue;
            if (null !== t) {
              var n = e.stateNode;
              try {
                zl(t, n);
              } catch (r) {
                xc(e, e.return, r);
              }
            }
          }
          function wu(e, t, n) {
            n.props = xi(e.type, e.memoizedProps), n.state = e.memoizedState;
            try {
              n.componentWillUnmount();
            } catch (r) {
              xc(e, t, r);
            }
          }
          function ku(e, t) {
            try {
              var n = e.ref;
              if (null !== n) {
                switch (e.tag) {
                  case 26:
                  case 27:
                  case 5:
                    var r = e.stateNode;
                    break;
                  default:
                    r = e.stateNode;
                }
                "function" == typeof n ? e.refCleanup = n(r) : n.current = r;
              }
            } catch (a) {
              xc(e, t, a);
            }
          }
          function Su(e, t) {
            var n = e.ref,
              r = e.refCleanup;
            if (null !== n) if ("function" == typeof r) try {
              r();
            } catch (a) {
              xc(e, t, a);
            } finally {
              e.refCleanup = null, null != (e = e.alternate) && (e.refCleanup = null);
            } else if ("function" == typeof n) try {
              n(null);
            } catch (l) {
              xc(e, t, l);
            } else n.current = null;
          }
          function _u(e) {
            var t = e.type,
              n = e.memoizedProps,
              r = e.stateNode;
            try {
              e: switch (t) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  n.autoFocus && r.focus();
                  break e;
                case "img":
                  n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
              }
            } catch (a) {
              xc(e, e.return, a);
            }
          }
          function xu(e, t, r) {
            try {
              var a = e.stateNode;
              !function (e, t, r, a) {
                switch (t) {
                  case "div":
                  case "span":
                  case "svg":
                  case "path":
                  case "a":
                  case "g":
                  case "p":
                  case "li":
                    break;
                  case "input":
                    var o = null,
                      i = null,
                      u = null,
                      s = null,
                      c = null,
                      f = null,
                      d = null;
                    for (h in r) {
                      var p = r[h];
                      if (r.hasOwnProperty(h) && null != p) switch (h) {
                        case "checked":
                        case "value":
                          break;
                        case "defaultValue":
                          c = p;
                        default:
                          a.hasOwnProperty(h) || df(e, t, h, null, a, p);
                      }
                    }
                    for (var m in a) {
                      var h = a[m];
                      if (p = r[m], a.hasOwnProperty(m) && (null != h || null != p)) switch (m) {
                        case "type":
                          i = h;
                          break;
                        case "name":
                          o = h;
                          break;
                        case "checked":
                          f = h;
                          break;
                        case "defaultChecked":
                          d = h;
                          break;
                        case "value":
                          u = h;
                          break;
                        case "defaultValue":
                          s = h;
                          break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                          if (null != h) throw Error(l(137, t));
                          break;
                        default:
                          h !== p && df(e, t, m, h, a, p);
                      }
                    }
                    return void bt(e, u, s, c, f, d, i, o);
                  case "select":
                    for (i in h = u = s = m = null, r) if (c = r[i], r.hasOwnProperty(i) && null != c) switch (i) {
                      case "value":
                        break;
                      case "multiple":
                        h = c;
                      default:
                        a.hasOwnProperty(i) || df(e, t, i, null, a, c);
                    }
                    for (o in a) if (i = a[o], c = r[o], a.hasOwnProperty(o) && (null != i || null != c)) switch (o) {
                      case "value":
                        m = i;
                        break;
                      case "defaultValue":
                        s = i;
                        break;
                      case "multiple":
                        u = i;
                      default:
                        i !== c && df(e, t, o, i, a, c);
                    }
                    return t = s, r = u, a = h, void (null != m ? St(e, !!r, m, !1) : !!a != !!r && (null != t ? St(e, !!r, t, !0) : St(e, !!r, r ? [] : "", !1)));
                  case "textarea":
                    for (s in h = m = null, r) if (o = r[s], r.hasOwnProperty(s) && null != o && !a.hasOwnProperty(s)) switch (s) {
                      case "value":
                      case "children":
                        break;
                      default:
                        df(e, t, s, null, a, o);
                    }
                    for (u in a) if (o = a[u], i = r[u], a.hasOwnProperty(u) && (null != o || null != i)) switch (u) {
                      case "value":
                        m = o;
                        break;
                      case "defaultValue":
                        h = o;
                        break;
                      case "children":
                        break;
                      case "dangerouslySetInnerHTML":
                        if (null != o) throw Error(l(91));
                        break;
                      default:
                        o !== i && df(e, t, u, o, a, i);
                    }
                    return void _t(e, m, h);
                  case "option":
                    for (var g in r) if (m = r[g], r.hasOwnProperty(g) && null != m && !a.hasOwnProperty(g)) if ("selected" === g) e.selected = !1;else df(e, t, g, null, a, m);
                    for (c in a) if (m = a[c], h = r[c], a.hasOwnProperty(c) && m !== h && (null != m || null != h)) if ("selected" === c) e.selected = m && "function" != typeof m && "symbol" !== n(m);else df(e, t, c, m, a, h);
                    return;
                  case "img":
                  case "link":
                  case "area":
                  case "base":
                  case "br":
                  case "col":
                  case "embed":
                  case "hr":
                  case "keygen":
                  case "meta":
                  case "param":
                  case "source":
                  case "track":
                  case "wbr":
                  case "menuitem":
                    for (var v in r) m = r[v], r.hasOwnProperty(v) && null != m && !a.hasOwnProperty(v) && df(e, t, v, null, a, m);
                    for (f in a) if (m = a[f], h = r[f], a.hasOwnProperty(f) && m !== h && (null != m || null != h)) switch (f) {
                      case "children":
                      case "dangerouslySetInnerHTML":
                        if (null != m) throw Error(l(137, t));
                        break;
                      default:
                        df(e, t, f, m, a, h);
                    }
                    return;
                  default:
                    if (Lt(t)) {
                      for (var y in r) m = r[y], r.hasOwnProperty(y) && void 0 !== m && !a.hasOwnProperty(y) && pf(e, t, y, void 0, a, m);
                      for (d in a) m = a[d], h = r[d], !a.hasOwnProperty(d) || m === h || void 0 === m && void 0 === h || pf(e, t, d, m, a, h);
                      return;
                    }
                }
                for (var b in r) m = r[b], r.hasOwnProperty(b) && null != m && !a.hasOwnProperty(b) && df(e, t, b, null, a, m);
                for (p in a) m = a[p], h = r[p], !a.hasOwnProperty(p) || m === h || null == m && null == h || df(e, t, p, m, a, h);
              }(a, e.type, r, t), a[Ue] = t;
            } catch (o) {
              xc(e, e.return, o);
            }
          }
          function Eu(e) {
            return 5 === e.tag || 3 === e.tag || 26 === e.tag || 27 === e.tag && Pf(e.type) || 4 === e.tag;
          }
          function Cu(e) {
            e: for (;;) {
              for (; null === e.sibling;) {
                if (null === e.return || Eu(e.return)) return null;
                e = e.return;
              }
              for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag;) {
                if (27 === e.tag && Pf(e.type)) continue e;
                if (2 & e.flags) continue e;
                if (null === e.child || 4 === e.tag) continue e;
                e.child.return = e, e = e.child;
              }
              if (!(2 & e.flags)) return e.stateNode;
            }
          }
          function zu(e, t, n) {
            var r = e.tag;
            if (5 === r || 6 === r) e = e.stateNode, t ? (9 === n.nodeType ? n.body : "HTML" === n.nodeName ? n.ownerDocument.body : n).insertBefore(e, t) : ((t = 9 === n.nodeType ? n.body : "HTML" === n.nodeName ? n.ownerDocument.body : n).appendChild(e), null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = At));else if (4 !== r && (27 === r && Pf(e.type) && (n = e.stateNode, t = null), null !== (e = e.child))) for (zu(e, t, n), e = e.sibling; null !== e;) zu(e, t, n), e = e.sibling;
          }
          function Pu(e, t, n) {
            var r = e.tag;
            if (5 === r || 6 === r) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);else if (4 !== r && (27 === r && Pf(e.type) && (n = e.stateNode), null !== (e = e.child))) for (Pu(e, t, n), e = e.sibling; null !== e;) Pu(e, t, n), e = e.sibling;
          }
          function Lu(e) {
            var t = e.stateNode,
              n = e.memoizedProps;
            try {
              for (var r = e.type, a = t.attributes; a.length;) t.removeAttributeNode(a[0]);
              mf(t, r, n), t[He] = e, t[Ue] = n;
            } catch (l) {
              xc(e, e.return, l);
            }
          }
          var Tu = !1,
            Nu = !1,
            Ou = !1,
            Au = "function" == typeof WeakSet ? WeakSet : Set,
            ju = null;
          function Fu(e, t, n) {
            var r = n.flags;
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                Ku(e, n), 4 & r && vu(5, n);
                break;
              case 1:
                if (Ku(e, n), 4 & r) if (e = n.stateNode, null === t) try {
                  e.componentDidMount();
                } catch (o) {
                  xc(n, n.return, o);
                } else {
                  var a = xi(n.type, t.memoizedProps);
                  t = t.memoizedState;
                  try {
                    e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
                  } catch (i) {
                    xc(n, n.return, i);
                  }
                }
                64 & r && bu(n), 512 & r && ku(n, n.return);
                break;
              case 3:
                if (Ku(e, n), 64 & r && null !== (e = n.updateQueue)) {
                  if (t = null, null !== n.child) switch (n.child.tag) {
                    case 27:
                    case 5:
                    case 1:
                      t = n.child.stateNode;
                  }
                  try {
                    zl(e, t);
                  } catch (o) {
                    xc(n, n.return, o);
                  }
                }
                break;
              case 27:
                null === t && 4 & r && Lu(n);
              case 26:
              case 5:
                Ku(e, n), null === t && 4 & r && _u(n), 512 & r && ku(n, n.return);
                break;
              case 12:
                Ku(e, n);
                break;
              case 31:
                Ku(e, n), 4 & r && Bu(e, n);
                break;
              case 13:
                Ku(e, n), 4 & r && Hu(e, n), 64 & r && null !== (e = n.memoizedState) && null !== (e = e.dehydrated) && function (e, t) {
                  var n = e.ownerDocument;
                  if ("$~" === e.data) e._reactRetry = t;else if ("$?" !== e.data || "loading" !== n.readyState) t();else {
                    var r = function () {
                      t(), n.removeEventListener("DOMContentLoaded", r);
                    };
                    n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
                  }
                }(e, n = Pc.bind(null, n));
                break;
              case 22:
                if (!(r = null !== n.memoizedState || Tu)) {
                  t = null !== t && null !== t.memoizedState || Nu, a = Tu;
                  var l = Nu;
                  Tu = r, (Nu = t) && !l ? Yu(e, n, !!(8772 & n.subtreeFlags)) : Ku(e, n), Tu = a, Nu = l;
                }
                break;
              case 30:
                break;
              default:
                Ku(e, n);
            }
          }
          function Ru(e) {
            var t = e.alternate;
            null !== t && (e.alternate = null, Ru(t)), e.child = null, e.deletions = null, e.sibling = null, 5 === e.tag && null !== (t = e.stateNode) && Ge(t), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
          }
          var Mu = null,
            Du = !1;
          function Iu(e, t, n) {
            for (n = n.child; null !== n;) Vu(e, t, n), n = n.sibling;
          }
          function Vu(e, t, n) {
            if (be && "function" == typeof be.onCommitFiberUnmount) try {
              be.onCommitFiberUnmount(ye, n);
            } catch (l) {}
            switch (n.tag) {
              case 26:
                Nu || Su(n, t), Iu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode).parentNode.removeChild(n);
                break;
              case 27:
                Nu || Su(n, t);
                var r = Mu,
                  a = Du;
                Pf(n.type) && (Mu = n.stateNode, Du = !1), Iu(e, t, n), Vf(n.stateNode), Mu = r, Du = a;
                break;
              case 5:
                Nu || Su(n, t);
              case 6:
                if (r = Mu, a = Du, Mu = null, Iu(e, t, n), Du = a, null !== (Mu = r)) if (Du) try {
                  (9 === Mu.nodeType ? Mu.body : "HTML" === Mu.nodeName ? Mu.ownerDocument.body : Mu).removeChild(n.stateNode);
                } catch (o) {
                  xc(n, t, o);
                } else try {
                  Mu.removeChild(n.stateNode);
                } catch (o) {
                  xc(n, t, o);
                }
                break;
              case 18:
                null !== Mu && (Du ? (Lf(9 === (e = Mu).nodeType ? e.body : "HTML" === e.nodeName ? e.ownerDocument.body : e, n.stateNode), Wd(e)) : Lf(Mu, n.stateNode));
                break;
              case 4:
                r = Mu, a = Du, Mu = n.stateNode.containerInfo, Du = !0, Iu(e, t, n), Mu = r, Du = a;
                break;
              case 0:
              case 11:
              case 14:
              case 15:
                yu(2, n, t), Nu || yu(4, n, t), Iu(e, t, n);
                break;
              case 1:
                Nu || (Su(n, t), "function" == typeof (r = n.stateNode).componentWillUnmount && wu(n, t, r)), Iu(e, t, n);
                break;
              case 21:
                Iu(e, t, n);
                break;
              case 22:
                Nu = (r = Nu) || null !== n.memoizedState, Iu(e, t, n), Nu = r;
                break;
              default:
                Iu(e, t, n);
            }
          }
          function Bu(e, t) {
            if (null === t.memoizedState && null !== (e = t.alternate) && null !== (e = e.memoizedState)) {
              e = e.dehydrated;
              try {
                Wd(e);
              } catch (n) {
                xc(t, t.return, n);
              }
            }
          }
          function Hu(e, t) {
            if (null === t.memoizedState && null !== (e = t.alternate) && null !== (e = e.memoizedState) && null !== (e = e.dehydrated)) try {
              Wd(e);
            } catch (n) {
              xc(t, t.return, n);
            }
          }
          function Uu(e, t) {
            var n = function (e) {
              switch (e.tag) {
                case 31:
                case 13:
                case 19:
                  var t = e.stateNode;
                  return null === t && (t = e.stateNode = new Au()), t;
                case 22:
                  return null === (t = (e = e.stateNode)._retryCache) && (t = e._retryCache = new Au()), t;
                default:
                  throw Error(l(435, e.tag));
              }
            }(e);
            t.forEach(function (t) {
              if (!n.has(t)) {
                n.add(t);
                var r = Lc.bind(null, e, t);
                t.then(r, r);
              }
            });
          }
          function Wu(e, t) {
            var n = t.deletions;
            if (null !== n) for (var r = 0; r < n.length; r++) {
              var a = n[r],
                o = e,
                i = t,
                u = i;
              e: for (; null !== u;) {
                switch (u.tag) {
                  case 27:
                    if (Pf(u.type)) {
                      Mu = u.stateNode, Du = !1;
                      break e;
                    }
                    break;
                  case 5:
                    Mu = u.stateNode, Du = !1;
                    break e;
                  case 3:
                  case 4:
                    Mu = u.stateNode.containerInfo, Du = !0;
                    break e;
                }
                u = u.return;
              }
              if (null === Mu) throw Error(l(160));
              Vu(o, i, a), Mu = null, Du = !1, null !== (o = a.alternate) && (o.return = null), a.return = null;
            }
            if (13886 & t.subtreeFlags) for (t = t.child; null !== t;) qu(t, e), t = t.sibling;
          }
          var $u = null;
          function qu(e, t) {
            var n = e.alternate,
              r = e.flags;
            switch (e.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Wu(t, e), Qu(e), 4 & r && (yu(3, e, e.return), vu(3, e), yu(5, e, e.return));
                break;
              case 1:
                Wu(t, e), Qu(e), 512 & r && (Nu || null === n || Su(n, n.return)), 64 & r && Tu && null !== (e = e.updateQueue) && null !== (r = e.callbacks) && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = null === n ? r : n.concat(r));
                break;
              case 26:
                var a = $u;
                if (Wu(t, e), Qu(e), 512 & r && (Nu || null === n || Su(n, n.return)), 4 & r) {
                  var o = null !== n ? n.memoizedState : null;
                  if (r = e.memoizedState, null === n) {
                    if (null === r) {
                      if (null === e.stateNode) {
                        e: {
                          r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
                          t: switch (r) {
                            case "title":
                              (!(o = a.getElementsByTagName("title")[0]) || o[Ke] || o[He] || "http://www.w3.org/2000/svg" === o.namespaceURI || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), mf(o, r, n), o[He] = e, tt(o), r = o;
                              break e;
                            case "link":
                              var i = ad("link", "href", a).get(r + (n.href || ""));
                              if (i) for (var u = 0; u < i.length; u++) if ((o = i[u]).getAttribute("href") === (null == n.href || "" === n.href ? null : n.href) && o.getAttribute("rel") === (null == n.rel ? null : n.rel) && o.getAttribute("title") === (null == n.title ? null : n.title) && o.getAttribute("crossorigin") === (null == n.crossOrigin ? null : n.crossOrigin)) {
                                i.splice(u, 1);
                                break t;
                              }
                              mf(o = a.createElement(r), r, n), a.head.appendChild(o);
                              break;
                            case "meta":
                              if (i = ad("meta", "content", a).get(r + (n.content || ""))) for (u = 0; u < i.length; u++) if ((o = i[u]).getAttribute("content") === (null == n.content ? null : "" + n.content) && o.getAttribute("name") === (null == n.name ? null : n.name) && o.getAttribute("property") === (null == n.property ? null : n.property) && o.getAttribute("http-equiv") === (null == n.httpEquiv ? null : n.httpEquiv) && o.getAttribute("charset") === (null == n.charSet ? null : n.charSet)) {
                                i.splice(u, 1);
                                break t;
                              }
                              mf(o = a.createElement(r), r, n), a.head.appendChild(o);
                              break;
                            default:
                              throw Error(l(468, r));
                          }
                          o[He] = e, tt(o), r = o;
                        }
                        e.stateNode = r;
                      } else ld(a, e.type, e.stateNode);
                    } else e.stateNode = Jf(a, r, e.memoizedProps);
                  } else o !== r ? (null === o ? null !== n.stateNode && (n = n.stateNode).parentNode.removeChild(n) : o.count--, null === r ? ld(a, e.type, e.stateNode) : Jf(a, r, e.memoizedProps)) : null === r && null !== e.stateNode && xu(e, e.memoizedProps, n.memoizedProps);
                }
                break;
              case 27:
                Wu(t, e), Qu(e), 512 & r && (Nu || null === n || Su(n, n.return)), null !== n && 4 & r && xu(e, e.memoizedProps, n.memoizedProps);
                break;
              case 5:
                if (Wu(t, e), Qu(e), 512 & r && (Nu || null === n || Su(n, n.return)), 32 & e.flags) {
                  a = e.stateNode;
                  try {
                    Et(a, "");
                  } catch (h) {
                    xc(e, e.return, h);
                  }
                }
                4 & r && null != e.stateNode && xu(e, a = e.memoizedProps, null !== n ? n.memoizedProps : a), 1024 & r && (Ou = !0);
                break;
              case 6:
                if (Wu(t, e), Qu(e), 4 & r) {
                  if (null === e.stateNode) throw Error(l(162));
                  r = e.memoizedProps, n = e.stateNode;
                  try {
                    n.nodeValue = r;
                  } catch (h) {
                    xc(e, e.return, h);
                  }
                }
                break;
              case 3:
                if (rd = null, a = $u, $u = Uf(t.containerInfo), Wu(t, e), $u = a, Qu(e), 4 & r && null !== n && n.memoizedState.isDehydrated) try {
                  Wd(t.containerInfo);
                } catch (h) {
                  xc(e, e.return, h);
                }
                Ou && (Ou = !1, Xu(e));
                break;
              case 4:
                r = $u, $u = Uf(e.stateNode.containerInfo), Wu(t, e), Qu(e), $u = r;
                break;
              case 12:
              default:
                Wu(t, e), Qu(e);
                break;
              case 31:
              case 19:
                Wu(t, e), Qu(e), 4 & r && null !== (r = e.updateQueue) && (e.updateQueue = null, Uu(e, r));
                break;
              case 13:
                Wu(t, e), Qu(e), 8192 & e.child.flags && null !== e.memoizedState != (null !== n && null !== n.memoizedState) && (As = se()), 4 & r && null !== (r = e.updateQueue) && (e.updateQueue = null, Uu(e, r));
                break;
              case 22:
                a = null !== e.memoizedState;
                var s = null !== n && null !== n.memoizedState,
                  c = Tu,
                  f = Nu;
                if (Tu = c || a, Nu = f || s, Wu(t, e), Nu = f, Tu = c, Qu(e), 8192 & r) e: for (t = e.stateNode, t._visibility = a ? -2 & t._visibility : 1 | t._visibility, a && (null === n || s || Tu || Nu || Gu(e)), n = null, t = e;;) {
                  if (5 === t.tag || 26 === t.tag) {
                    if (null === n) {
                      s = n = t;
                      try {
                        if (o = s.stateNode, a) "function" == typeof (i = o.style).setProperty ? i.setProperty("display", "none", "important") : i.display = "none";else {
                          u = s.stateNode;
                          var d = s.memoizedProps.style,
                            p = null != d && d.hasOwnProperty("display") ? d.display : null;
                          u.style.display = null == p || "boolean" == typeof p ? "" : ("" + p).trim();
                        }
                      } catch (h) {
                        xc(s, s.return, h);
                      }
                    }
                  } else if (6 === t.tag) {
                    if (null === n) {
                      s = t;
                      try {
                        s.stateNode.nodeValue = a ? "" : s.memoizedProps;
                      } catch (h) {
                        xc(s, s.return, h);
                      }
                    }
                  } else if (18 === t.tag) {
                    if (null === n) {
                      s = t;
                      try {
                        var m = s.stateNode;
                        a ? Tf(m, !0) : Tf(s.stateNode, !1);
                      } catch (h) {
                        xc(s, s.return, h);
                      }
                    }
                  } else if ((22 !== t.tag && 23 !== t.tag || null === t.memoizedState || t === e) && null !== t.child) {
                    t.child.return = t, t = t.child;
                    continue;
                  }
                  if (t === e) break e;
                  for (; null === t.sibling;) {
                    if (null === t.return || t.return === e) break e;
                    n === t && (n = null), t = t.return;
                  }
                  n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
                }
                4 & r && null !== (r = e.updateQueue) && null !== (n = r.retryQueue) && (r.retryQueue = null, Uu(e, n));
              case 30:
              case 21:
            }
          }
          function Qu(e) {
            var t = e.flags;
            if (2 & t) {
              try {
                for (var n, r = e.return; null !== r;) {
                  if (Eu(r)) {
                    n = r;
                    break;
                  }
                  r = r.return;
                }
                if (null == n) throw Error(l(160));
                switch (n.tag) {
                  case 27:
                    var a = n.stateNode;
                    Pu(e, Cu(e), a);
                    break;
                  case 5:
                    var o = n.stateNode;
                    32 & n.flags && (Et(o, ""), n.flags &= -33), Pu(e, Cu(e), o);
                    break;
                  case 3:
                  case 4:
                    var i = n.stateNode.containerInfo;
                    zu(e, Cu(e), i);
                    break;
                  default:
                    throw Error(l(161));
                }
              } catch (u) {
                xc(e, e.return, u);
              }
              e.flags &= -3;
            }
            4096 & t && (e.flags &= -4097);
          }
          function Xu(e) {
            if (1024 & e.subtreeFlags) for (e = e.child; null !== e;) {
              var t = e;
              Xu(t), 5 === t.tag && 1024 & t.flags && t.stateNode.reset(), e = e.sibling;
            }
          }
          function Ku(e, t) {
            if (8772 & t.subtreeFlags) for (t = t.child; null !== t;) Fu(e, t.alternate, t), t = t.sibling;
          }
          function Gu(e) {
            for (e = e.child; null !== e;) {
              var t = e;
              switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  yu(4, t, t.return), Gu(t);
                  break;
                case 1:
                  Su(t, t.return);
                  var n = t.stateNode;
                  "function" == typeof n.componentWillUnmount && wu(t, t.return, n), Gu(t);
                  break;
                case 27:
                  Vf(t.stateNode);
                case 26:
                case 5:
                  Su(t, t.return), Gu(t);
                  break;
                case 22:
                  null === t.memoizedState && Gu(t);
                  break;
                default:
                  Gu(t);
              }
              e = e.sibling;
            }
          }
          function Yu(e, t, n) {
            for (n = n && !!(8772 & t.subtreeFlags), t = t.child; null !== t;) {
              var r = t.alternate,
                a = e,
                l = t,
                o = l.flags;
              switch (l.tag) {
                case 0:
                case 11:
                case 15:
                  Yu(a, l, n), vu(4, l);
                  break;
                case 1:
                  if (Yu(a, l, n), "function" == typeof (a = (r = l).stateNode).componentDidMount) try {
                    a.componentDidMount();
                  } catch (s) {
                    xc(r, r.return, s);
                  }
                  if (null !== (a = (r = l).updateQueue)) {
                    var i = r.stateNode;
                    try {
                      var u = a.shared.hiddenCallbacks;
                      if (null !== u) for (a.shared.hiddenCallbacks = null, a = 0; a < u.length; a++) Cl(u[a], i);
                    } catch (s) {
                      xc(r, r.return, s);
                    }
                  }
                  n && 64 & o && bu(l), ku(l, l.return);
                  break;
                case 27:
                  Lu(l);
                case 26:
                case 5:
                  Yu(a, l, n), n && null === r && 4 & o && _u(l), ku(l, l.return);
                  break;
                case 12:
                  Yu(a, l, n);
                  break;
                case 31:
                  Yu(a, l, n), n && 4 & o && Bu(a, l);
                  break;
                case 13:
                  Yu(a, l, n), n && 4 & o && Hu(a, l);
                  break;
                case 22:
                  null === l.memoizedState && Yu(a, l, n), ku(l, l.return);
                  break;
                case 30:
                  break;
                default:
                  Yu(a, l, n);
              }
              t = t.sibling;
            }
          }
          function Zu(e, t) {
            var n = null;
            null !== e && null !== e.memoizedState && null !== e.memoizedState.cachePool && (n = e.memoizedState.cachePool.pool), e = null, null !== t.memoizedState && null !== t.memoizedState.cachePool && (e = t.memoizedState.cachePool.pool), e !== n && (null != e && e.refCount++, null != n && Ba(n));
          }
          function Ju(e, t) {
            e = null, null !== t.alternate && (e = t.alternate.memoizedState.cache), (t = t.memoizedState.cache) !== e && (t.refCount++, null != e && Ba(e));
          }
          function es(e, t, n, r) {
            if (10256 & t.subtreeFlags) for (t = t.child; null !== t;) ts(e, t, n, r), t = t.sibling;
          }
          function ts(e, t, n, r) {
            var a = t.flags;
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                es(e, t, n, r), 2048 & a && vu(9, t);
                break;
              case 1:
              case 31:
              case 13:
              default:
                es(e, t, n, r);
                break;
              case 3:
                es(e, t, n, r), 2048 & a && (e = null, null !== t.alternate && (e = t.alternate.memoizedState.cache), (t = t.memoizedState.cache) !== e && (t.refCount++, null != e && Ba(e)));
                break;
              case 12:
                if (2048 & a) {
                  es(e, t, n, r), e = t.stateNode;
                  try {
                    var l = t.memoizedProps,
                      o = l.id,
                      i = l.onPostCommit;
                    "function" == typeof i && i(o, null === t.alternate ? "mount" : "update", e.passiveEffectDuration, -0);
                  } catch (u) {
                    xc(t, t.return, u);
                  }
                } else es(e, t, n, r);
                break;
              case 23:
                break;
              case 22:
                l = t.stateNode, o = t.alternate, null !== t.memoizedState ? 2 & l._visibility ? es(e, t, n, r) : rs(e, t) : 2 & l._visibility ? es(e, t, n, r) : (l._visibility |= 2, ns(e, t, n, r, !!(10256 & t.subtreeFlags) || !1)), 2048 & a && Zu(o, t);
                break;
              case 24:
                es(e, t, n, r), 2048 & a && Ju(t.alternate, t);
            }
          }
          function ns(e, t, n, r, a) {
            for (a = a && (!!(10256 & t.subtreeFlags) || !1), t = t.child; null !== t;) {
              var l = e,
                o = t,
                i = n,
                u = r,
                s = o.flags;
              switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  ns(l, o, i, u, a), vu(8, o);
                  break;
                case 23:
                  break;
                case 22:
                  var c = o.stateNode;
                  null !== o.memoizedState ? 2 & c._visibility ? ns(l, o, i, u, a) : rs(l, o) : (c._visibility |= 2, ns(l, o, i, u, a)), a && 2048 & s && Zu(o.alternate, o);
                  break;
                case 24:
                  ns(l, o, i, u, a), a && 2048 & s && Ju(o.alternate, o);
                  break;
                default:
                  ns(l, o, i, u, a);
              }
              t = t.sibling;
            }
          }
          function rs(e, t) {
            if (10256 & t.subtreeFlags) for (t = t.child; null !== t;) {
              var n = e,
                r = t,
                a = r.flags;
              switch (r.tag) {
                case 22:
                  rs(n, r), 2048 & a && Zu(r.alternate, r);
                  break;
                case 24:
                  rs(n, r), 2048 & a && Ju(r.alternate, r);
                  break;
                default:
                  rs(n, r);
              }
              t = t.sibling;
            }
          }
          var as = 8192;
          function ls(e, t, n) {
            if (e.subtreeFlags & as) for (e = e.child; null !== e;) os(e, t, n), e = e.sibling;
          }
          function os(e, t, r) {
            switch (e.tag) {
              case 26:
                ls(e, t, r), e.flags & as && null !== e.memoizedState && function (e, t, r, a) {
                  if (!("stylesheet" !== r.type || "string" == typeof a.media && !1 === matchMedia(a.media).matches || 4 & r.state.loading)) {
                    if (null === r.instance) {
                      var l = Xf(a.href),
                        o = t.querySelector(Kf(l));
                      if (o) return null !== (t = o._p) && "object" === n(t) && "function" == typeof t.then && (e.count++, e = ud.bind(e), t.then(e, e)), r.state.loading |= 4, r.instance = o, void tt(o);
                      o = t.ownerDocument || t, a = Gf(a), (l = Bf.get(l)) && td(a, l), tt(o = o.createElement("link"));
                      var i = o;
                      i._p = new Promise(function (e, t) {
                        i.onload = e, i.onerror = t;
                      }), mf(o, "link", a), r.instance = o;
                    }
                    null === e.stylesheets && (e.stylesheets = new Map()), e.stylesheets.set(r, t), (t = r.state.preload) && !(3 & r.state.loading) && (e.count++, r = ud.bind(e), t.addEventListener("load", r), t.addEventListener("error", r));
                  }
                }(r, $u, e.memoizedState, e.memoizedProps);
                break;
              case 5:
              default:
                ls(e, t, r);
                break;
              case 3:
              case 4:
                var a = $u;
                $u = Uf(e.stateNode.containerInfo), ls(e, t, r), $u = a;
                break;
              case 22:
                null === e.memoizedState && (null !== (a = e.alternate) && null !== a.memoizedState ? (a = as, as = 16777216, ls(e, t, r), as = a) : ls(e, t, r));
            }
          }
          function is(e) {
            var t = e.alternate;
            if (null !== t && null !== (e = t.child)) {
              t.child = null;
              do {
                t = e.sibling, e.sibling = null, e = t;
              } while (null !== e);
            }
          }
          function us(e) {
            var t = e.deletions;
            if (16 & e.flags) {
              if (null !== t) for (var n = 0; n < t.length; n++) {
                var r = t[n];
                ju = r, fs(r, e);
              }
              is(e);
            }
            if (10256 & e.subtreeFlags) for (e = e.child; null !== e;) ss(e), e = e.sibling;
          }
          function ss(e) {
            switch (e.tag) {
              case 0:
              case 11:
              case 15:
                us(e), 2048 & e.flags && yu(9, e, e.return);
                break;
              case 3:
              case 12:
              default:
                us(e);
                break;
              case 22:
                var t = e.stateNode;
                null !== e.memoizedState && 2 & t._visibility && (null === e.return || 13 !== e.return.tag) ? (t._visibility &= -3, cs(e)) : us(e);
            }
          }
          function cs(e) {
            var t = e.deletions;
            if (16 & e.flags) {
              if (null !== t) for (var n = 0; n < t.length; n++) {
                var r = t[n];
                ju = r, fs(r, e);
              }
              is(e);
            }
            for (e = e.child; null !== e;) {
              switch ((t = e).tag) {
                case 0:
                case 11:
                case 15:
                  yu(8, t, t.return), cs(t);
                  break;
                case 22:
                  2 & (n = t.stateNode)._visibility && (n._visibility &= -3, cs(t));
                  break;
                default:
                  cs(t);
              }
              e = e.sibling;
            }
          }
          function fs(e, t) {
            for (; null !== ju;) {
              var n = ju;
              switch (n.tag) {
                case 0:
                case 11:
                case 15:
                  yu(8, n, t);
                  break;
                case 23:
                case 22:
                  if (null !== n.memoizedState && null !== n.memoizedState.cachePool) {
                    var r = n.memoizedState.cachePool.pool;
                    null != r && r.refCount++;
                  }
                  break;
                case 24:
                  Ba(n.memoizedState.cache);
              }
              if (null !== (r = n.child)) r.return = n, ju = r;else e: for (n = e; null !== ju;) {
                var a = (r = ju).sibling,
                  l = r.return;
                if (Ru(r), r === n) {
                  ju = null;
                  break e;
                }
                if (null !== a) {
                  a.return = l, ju = a;
                  break e;
                }
                ju = l;
              }
            }
          }
          var ds = {
              getCacheForType: function (e) {
                var t = Aa(Ia),
                  n = t.data.get(e);
                return void 0 === n && (n = e(), t.data.set(e, n)), n;
              },
              cacheSignal: function () {
                return Aa(Ia).controller.signal;
              }
            },
            ps = "function" == typeof WeakMap ? WeakMap : Map,
            ms = 0,
            hs = null,
            gs = null,
            vs = 0,
            ys = 0,
            bs = null,
            ws = !1,
            ks = !1,
            Ss = !1,
            _s = 0,
            xs = 0,
            Es = 0,
            Cs = 0,
            zs = 0,
            Ps = 0,
            Ls = 0,
            Ts = null,
            Ns = null,
            Os = !1,
            As = 0,
            js = 0,
            Fs = 1 / 0,
            Rs = null,
            Ms = null,
            Ds = 0,
            Is = null,
            Vs = null,
            Bs = 0,
            Hs = 0,
            Us = null,
            Ws = null,
            $s = 0,
            qs = null;
          function Qs() {
            return 2 & ms && 0 !== vs ? vs & -vs : null !== j.T ? Uc() : Ie();
          }
          function Xs() {
            if (0 === Ps) if (536870912 & vs && !da) Ps = 536870912;else {
              var e = Ee;
              !(3932160 & (Ee <<= 1)) && (Ee = 262144), Ps = e;
            }
            return null !== (e = Al.current) && (e.flags |= 32), Ps;
          }
          function Ks(e, t, n) {
            (e !== hs || 2 !== ys && 9 !== ys) && null === e.cancelPendingCommit || (nc(e, 0), Js(e, vs, Ps, !1)), Ae(e, n), 2 & ms && e === hs || (e === hs && (!(2 & ms) && (Cs |= n), 4 === xs && Js(e, vs, Ps, !1)), Rc(e));
          }
          function Gs(e, t, n) {
            if (6 & ms) throw Error(l(327));
            for (var r = !n && !(127 & t) && 0 === (t & e.expiredLanes) || Le(e, t), a = r ? function (e, t) {
                var n = ms;
                ms |= 2;
                var r = lc(),
                  a = oc();
                hs !== e || vs !== t ? (Rs = null, Fs = se() + 500, nc(e, t)) : ks = Le(e, t);
                e: for (;;) try {
                  if (0 !== ys && null !== gs) {
                    t = gs;
                    var o = bs;
                    t: switch (ys) {
                      case 1:
                        ys = 0, bs = null, pc(e, t, o, 1);
                        break;
                      case 2:
                      case 9:
                        if (nl(o)) {
                          ys = 0, bs = null, dc(t);
                          break;
                        }
                        t = function () {
                          2 !== ys && 9 !== ys || hs !== e || (ys = 7), Rc(e);
                        }, o.then(t, t);
                        break e;
                      case 3:
                        ys = 7;
                        break e;
                      case 4:
                        ys = 5;
                        break e;
                      case 7:
                        nl(o) ? (ys = 0, bs = null, dc(t)) : (ys = 0, bs = null, pc(e, t, o, 7));
                        break;
                      case 5:
                        var i = null;
                        switch (gs.tag) {
                          case 26:
                            i = gs.memoizedState;
                          case 5:
                          case 27:
                            var u = gs;
                            if (i ? od(i) : u.stateNode.complete) {
                              ys = 0, bs = null;
                              var s = u.sibling;
                              if (null !== s) gs = s;else {
                                var c = u.return;
                                null !== c ? (gs = c, mc(c)) : gs = null;
                              }
                              break t;
                            }
                        }
                        ys = 0, bs = null, pc(e, t, o, 5);
                        break;
                      case 6:
                        ys = 0, bs = null, pc(e, t, o, 6);
                        break;
                      case 8:
                        tc(), xs = 6;
                        break e;
                      default:
                        throw Error(l(462));
                    }
                  }
                  cc();
                  break;
                } catch (f) {
                  rc(e, f);
                }
                return Ea = xa = null, j.H = r, j.A = a, ms = n, null !== gs ? 0 : (hs = null, vs = 0, Nr(), xs);
              }(e, t) : uc(e, t, !0), o = r;;) {
              if (0 === a) {
                ks && !r && Js(e, t, 0, !1);
                break;
              }
              if (n = e.current.alternate, !o || Zs(n)) {
                if (2 === a) {
                  if (o = t, e.errorRecoveryDisabledLanes & o) var i = 0;else i = 0 !== (i = -536870913 & e.pendingLanes) ? i : 536870912 & i ? 536870912 : 0;
                  if (0 !== i) {
                    t = i;
                    e: {
                      var u = e;
                      a = Ts;
                      var s = u.current.memoizedState.isDehydrated;
                      if (s && (nc(u, i).flags |= 256), 2 !== (i = uc(u, i, !1))) {
                        if (Ss && !s) {
                          u.errorRecoveryDisabledLanes |= o, Cs |= o, a = 4;
                          break e;
                        }
                        o = Ns, Ns = a, null !== o && (null === Ns ? Ns = o : Ns.push.apply(Ns, o));
                      }
                      a = i;
                    }
                    if (o = !1, 2 !== a) continue;
                  }
                }
                if (1 === a) {
                  nc(e, 0), Js(e, t, 0, !0);
                  break;
                }
                e: {
                  switch (r = e, o = a) {
                    case 0:
                    case 1:
                      throw Error(l(345));
                    case 4:
                      if ((4194048 & t) !== t) break;
                    case 6:
                      Js(r, t, Ps, !ws);
                      break e;
                    case 2:
                      Ns = null;
                      break;
                    case 3:
                    case 5:
                      break;
                    default:
                      throw Error(l(329));
                  }
                  if ((62914560 & t) === t && 10 < (a = As + 300 - se())) {
                    if (Js(r, t, Ps, !ws), 0 !== Pe(r, 0, !0)) break e;
                    Bs = t, r.timeoutHandle = _f(Ys.bind(null, r, n, Ns, Rs, Os, t, Ps, Cs, Ls, ws, o, "Throttled", -0, 0), a);
                  } else Ys(r, n, Ns, Rs, Os, t, Ps, Cs, Ls, ws, o, null, -0, 0);
                }
                break;
              }
              a = uc(e, t, !1), o = !1;
            }
            Rc(e);
          }
          function Ys(e, t, n, r, a, l, o, i, u, s, c, f, d, p) {
            if (e.timeoutHandle = -1, 8192 & (f = t.subtreeFlags) || !(16785408 & ~f)) {
              os(t, l, f = {
                stylesheets: null,
                count: 0,
                imgCount: 0,
                imgBytes: 0,
                suspenseyImages: [],
                waitingForImages: !0,
                waitingForViewTransition: !1,
                unsuspend: At
              });
              var m = (62914560 & l) === l ? As - se() : (4194048 & l) === l ? js - se() : 0;
              if (m = function (e, t) {
                return e.stylesheets && 0 === e.count && cd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function (n) {
                  var r = setTimeout(function () {
                    if (e.stylesheets && cd(e, e.stylesheets), e.unsuspend) {
                      var t = e.unsuspend;
                      e.unsuspend = null, t();
                    }
                  }, 6e4 + t);
                  0 < e.imgBytes && 0 === id && (id = 62500 * function () {
                    if ("function" == typeof performance.getEntriesByType) {
                      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
                        var a = n[r],
                          l = a.transferSize,
                          o = a.initiatorType,
                          i = a.duration;
                        if (l && i && hf(o)) {
                          for (o = 0, i = a.responseEnd, r += 1; r < n.length; r++) {
                            var u = n[r],
                              s = u.startTime;
                            if (s > i) break;
                            var c = u.transferSize,
                              f = u.initiatorType;
                            c && hf(f) && (o += c * ((u = u.responseEnd) < i ? 1 : (i - s) / (u - s)));
                          }
                          if (--r, t += 8 * (l + o) / (a.duration / 1e3), 10 < ++e) break;
                        }
                      }
                      if (0 < e) return t / e / 1e6;
                    }
                    return navigator.connection && "number" == typeof (e = navigator.connection.downlink) ? e : 5;
                  }());
                  var a = setTimeout(function () {
                    if (e.waitingForImages = !1, 0 === e.count && (e.stylesheets && cd(e, e.stylesheets), e.unsuspend)) {
                      var t = e.unsuspend;
                      e.unsuspend = null, t();
                    }
                  }, (e.imgBytes > id ? 50 : 800) + t);
                  return e.unsuspend = n, function () {
                    e.unsuspend = null, clearTimeout(r), clearTimeout(a);
                  };
                } : null;
              }(f, m), null !== m) return Bs = l, e.cancelPendingCommit = m(gc.bind(null, e, t, l, n, r, a, o, i, u, c, f, null, d, p)), void Js(e, l, o, !s);
            }
            gc(e, t, l, n, r, a, o, i, u);
          }
          function Zs(e) {
            for (var t = e;;) {
              var n = t.tag;
              if ((0 === n || 11 === n || 15 === n) && 16384 & t.flags && null !== (n = t.updateQueue) && null !== (n = n.stores)) for (var r = 0; r < n.length; r++) {
                var a = n[r],
                  l = a.getSnapshot;
                a = a.value;
                try {
                  if (!Jn(l(), a)) return !1;
                } catch (o) {
                  return !1;
                }
              }
              if (n = t.child, 16384 & t.subtreeFlags && null !== n) n.return = t, t = n;else {
                if (t === e) break;
                for (; null === t.sibling;) {
                  if (null === t.return || t.return === e) return !0;
                  t = t.return;
                }
                t.sibling.return = t.return, t = t.sibling;
              }
            }
            return !0;
          }
          function Js(e, t, n, r) {
            t &= ~zs, t &= ~Cs, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
            for (var a = t; 0 < a;) {
              var l = 31 - ke(a),
                o = 1 << l;
              r[l] = -1, a &= ~o;
            }
            0 !== n && je(e, n, t);
          }
          function ec() {
            return !!(6 & ms) || (Mc(0, !1), !1);
          }
          function tc() {
            if (null !== gs) {
              if (0 === ys) var e = gs.return;else Ea = xa = null, io(e = gs), ul = null, sl = 0, e = gs;
              for (; null !== e;) gu(e.alternate, e), e = e.return;
              gs = null;
            }
          }
          function nc(e, t) {
            var n = e.timeoutHandle;
            -1 !== n && (e.timeoutHandle = -1, xf(n)), null !== (n = e.cancelPendingCommit) && (e.cancelPendingCommit = null, n()), Bs = 0, tc(), hs = e, gs = n = Br(e.current, null), vs = t, ys = 0, bs = null, ws = !1, ks = Le(e, t), Ss = !1, Ls = Ps = zs = Cs = Es = xs = 0, Ns = Ts = null, Os = !1, 8 & t && (t |= 32 & t);
            var r = e.entangledLanes;
            if (0 !== r) for (e = e.entanglements, r &= t; 0 < r;) {
              var a = 31 - ke(r),
                l = 1 << a;
              t |= e[a], r &= ~l;
            }
            return _s = t, Nr(), n;
          }
          function rc(e, t) {
            Ul = null, j.H = gi, t === Za || t === el ? (t = ol(), ys = 3) : t === Ja ? (t = ol(), ys = 4) : ys = t === Ai ? 8 : null !== t && "object" === n(t) && "function" == typeof t.then ? 6 : 1, bs = t, null === gs && (xs = 1, Pi(e, Kr(t, e.current)));
          }
          function ac() {
            var e = Al.current;
            return null === e || ((4194048 & vs) === vs ? null === jl : !!((62914560 & vs) === vs || 536870912 & vs) && e === jl);
          }
          function lc() {
            var e = j.H;
            return j.H = gi, null === e ? gi : e;
          }
          function oc() {
            var e = j.A;
            return j.A = ds, e;
          }
          function ic() {
            xs = 4, ws || (4194048 & vs) !== vs && null !== Al.current || (ks = !0), !(134217727 & Es) && !(134217727 & Cs) || null === hs || Js(hs, vs, Ps, !1);
          }
          function uc(e, t, n) {
            var r = ms;
            ms |= 2;
            var a = lc(),
              l = oc();
            hs === e && vs === t || (Rs = null, nc(e, t)), t = !1;
            var o = xs;
            e: for (;;) try {
              if (0 !== ys && null !== gs) {
                var i = gs,
                  u = bs;
                switch (ys) {
                  case 8:
                    tc(), o = 6;
                    break e;
                  case 3:
                  case 2:
                  case 9:
                  case 6:
                    null === Al.current && (t = !0);
                    var s = ys;
                    if (ys = 0, bs = null, pc(e, i, u, s), n && ks) {
                      o = 0;
                      break e;
                    }
                    break;
                  default:
                    s = ys, ys = 0, bs = null, pc(e, i, u, s);
                }
              }
              sc(), o = xs;
              break;
            } catch (c) {
              rc(e, c);
            }
            return t && e.shellSuspendCounter++, Ea = xa = null, ms = r, j.H = a, j.A = l, null === gs && (hs = null, vs = 0, Nr()), o;
          }
          function sc() {
            for (; null !== gs;) fc(gs);
          }
          function cc() {
            for (; null !== gs && !ie();) fc(gs);
          }
          function fc(e) {
            var t = iu(e.alternate, e, _s);
            e.memoizedProps = e.pendingProps, null === t ? mc(e) : gs = t;
          }
          function dc(e) {
            var t = e,
              n = t.alternate;
            switch (t.tag) {
              case 15:
              case 0:
                t = qi(n, t, t.pendingProps, t.type, void 0, vs);
                break;
              case 11:
                t = qi(n, t, t.pendingProps, t.type.render, t.ref, vs);
                break;
              case 5:
                io(t);
              default:
                gu(n, t), t = iu(n, t = gs = Hr(t, _s), _s);
            }
            e.memoizedProps = e.pendingProps, null === t ? mc(e) : gs = t;
          }
          function pc(e, t, r, a) {
            Ea = xa = null, io(t), ul = null, sl = 0;
            var o = t.return;
            try {
              if (function (e, t, r, a, o) {
                if (r.flags |= 32768, null !== a && "object" === n(a) && "function" == typeof a.then) {
                  if (null !== (t = r.alternate) && Ta(t, r, o, !0), null !== (r = Al.current)) {
                    switch (r.tag) {
                      case 31:
                      case 13:
                        return null === jl ? ic() : null === r.alternate && 0 === xs && (xs = 3), r.flags &= -257, r.flags |= 65536, r.lanes = o, a === tl ? r.flags |= 16384 : (null === (t = r.updateQueue) ? r.updateQueue = new Set([a]) : t.add(a), Ec(e, a, o)), !1;
                      case 22:
                        return r.flags |= 65536, a === tl ? r.flags |= 16384 : (null === (t = r.updateQueue) ? (t = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([a])
                        }, r.updateQueue = t) : null === (r = t.retryQueue) ? t.retryQueue = new Set([a]) : r.add(a), Ec(e, a, o)), !1;
                    }
                    throw Error(l(435, r.tag));
                  }
                  return Ec(e, a, o), ic(), !1;
                }
                if (da) return null !== (t = Al.current) ? (!(65536 & t.flags) && (t.flags |= 256), t.flags |= 65536, t.lanes = o, a !== ha && Sa(Kr(e = Error(l(422), {
                  cause: a
                }), r))) : (a !== ha && Sa(Kr(t = Error(l(423), {
                  cause: a
                }), r)), (e = e.current.alternate).flags |= 65536, o &= -o, e.lanes |= o, a = Kr(a, r), Sl(e, o = Ti(e.stateNode, a, o)), 4 !== xs && (xs = 2)), !1;
                var i = Error(l(520), {
                  cause: a
                });
                if (i = Kr(i, r), null === Ts ? Ts = [i] : Ts.push(i), 4 !== xs && (xs = 2), null === t) return !0;
                a = Kr(a, r), r = t;
                do {
                  switch (r.tag) {
                    case 3:
                      return r.flags |= 65536, e = o & -o, r.lanes |= e, Sl(r, e = Ti(r.stateNode, a, e)), !1;
                    case 1:
                      if (t = r.type, i = r.stateNode, !(128 & r.flags || "function" != typeof t.getDerivedStateFromError && (null === i || "function" != typeof i.componentDidCatch || null !== Ms && Ms.has(i)))) return r.flags |= 65536, o &= -o, r.lanes |= o, Oi(o = Ni(o), e, r, a), Sl(r, o), !1;
                  }
                  r = r.return;
                } while (null !== r);
                return !1;
              }(e, o, t, r, vs)) return xs = 1, Pi(e, Kr(r, e.current)), void (gs = null);
            } catch (i) {
              if (null !== o) throw gs = o, i;
              return xs = 1, Pi(e, Kr(r, e.current)), void (gs = null);
            }
            32768 & t.flags ? (da || 1 === a ? e = !0 : ks || 536870912 & vs ? e = !1 : (ws = e = !0, (2 === a || 9 === a || 3 === a || 6 === a) && null !== (a = Al.current) && 13 === a.tag && (a.flags |= 16384)), hc(t, e)) : mc(t);
          }
          function mc(e) {
            var t = e;
            do {
              if (32768 & t.flags) return void hc(t, ws);
              e = t.return;
              var n = mu(t.alternate, t, _s);
              if (null !== n) return void (gs = n);
              if (null !== (t = t.sibling)) return void (gs = t);
              gs = t = e;
            } while (null !== t);
            0 === xs && (xs = 5);
          }
          function hc(e, t) {
            do {
              var n = hu(e.alternate, e);
              if (null !== n) return n.flags &= 32767, void (gs = n);
              if (null !== (n = e.return) && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && null !== (e = e.sibling)) return void (gs = e);
              gs = e = n;
            } while (null !== e);
            xs = 6, gs = null;
          }
          function gc(e, t, n, r, a, o, i, u, s) {
            e.cancelPendingCommit = null;
            do {
              kc();
            } while (0 !== Ds);
            if (6 & ms) throw Error(l(327));
            if (null !== t) {
              if (t === e.current) throw Error(l(177));
              if (o = t.lanes | t.childLanes, function (e, t, n, r, a, l) {
                var o = e.pendingLanes;
                e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
                var i = e.entanglements,
                  u = e.expirationTimes,
                  s = e.hiddenUpdates;
                for (n = o & ~n; 0 < n;) {
                  var c = 31 - ke(n),
                    f = 1 << c;
                  i[c] = 0, u[c] = -1;
                  var d = s[c];
                  if (null !== d) for (s[c] = null, c = 0; c < d.length; c++) {
                    var p = d[c];
                    null !== p && (p.lane &= -536870913);
                  }
                  n &= ~f;
                }
                0 !== r && je(e, r, 0), 0 !== l && 0 === a && 0 !== e.tag && (e.suspendedLanes |= l & ~(o & ~t));
              }(e, n, o |= Tr, i, u, s), e === hs && (gs = hs = null, vs = 0), Vs = t, Is = e, Bs = n, Hs = o, Us = a, Ws = r, 10256 & t.subtreeFlags || 10256 & t.flags ? (e.callbackNode = null, e.callbackPriority = 0, le(pe, function () {
                return Sc(), null;
              })) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(13878 & t.flags), 13878 & t.subtreeFlags || r) {
                r = j.T, j.T = null, a = R.p, R.p = 2, i = ms, ms |= 4;
                try {
                  !function (e, t) {
                    if (e = e.containerInfo, gf = bd, lr(e = ar(e))) {
                      if ("selectionStart" in e) var n = {
                        start: e.selectionStart,
                        end: e.selectionEnd
                      };else e: {
                        var r = (n = (n = e.ownerDocument) && n.defaultView || window).getSelection && n.getSelection();
                        if (r && 0 !== r.rangeCount) {
                          n = r.anchorNode;
                          var a = r.anchorOffset,
                            o = r.focusNode;
                          r = r.focusOffset;
                          try {
                            n.nodeType, o.nodeType;
                          } catch (g) {
                            n = null;
                            break e;
                          }
                          var i = 0,
                            u = -1,
                            s = -1,
                            c = 0,
                            f = 0,
                            d = e,
                            p = null;
                          t: for (;;) {
                            for (var m; d !== n || 0 !== a && 3 !== d.nodeType || (u = i + a), d !== o || 0 !== r && 3 !== d.nodeType || (s = i + r), 3 === d.nodeType && (i += d.nodeValue.length), null !== (m = d.firstChild);) p = d, d = m;
                            for (;;) {
                              if (d === e) break t;
                              if (p === n && ++c === a && (u = i), p === o && ++f === r && (s = i), null !== (m = d.nextSibling)) break;
                              p = (d = p).parentNode;
                            }
                            d = m;
                          }
                          n = -1 === u || -1 === s ? null : {
                            start: u,
                            end: s
                          };
                        } else n = null;
                      }
                      n = n || {
                        start: 0,
                        end: 0
                      };
                    } else n = null;
                    for (vf = {
                      focusedElem: e,
                      selectionRange: n
                    }, bd = !1, ju = t; null !== ju;) if (e = (t = ju).child, 1028 & t.subtreeFlags && null !== e) e.return = t, ju = e;else for (; null !== ju;) {
                      switch (o = (t = ju).alternate, e = t.flags, t.tag) {
                        case 0:
                          if (4 & e && null !== (e = null !== (e = t.updateQueue) ? e.events : null)) for (n = 0; n < e.length; n++) (a = e[n]).ref.impl = a.nextImpl;
                          break;
                        case 11:
                        case 15:
                        case 5:
                        case 26:
                        case 27:
                        case 6:
                        case 4:
                        case 17:
                          break;
                        case 1:
                          if (1024 & e && null !== o) {
                            e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
                            try {
                              var h = xi(n.type, a);
                              e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
                            } catch (v) {
                              xc(n, n.return, v);
                            }
                          }
                          break;
                        case 3:
                          if (1024 & e) if (9 === (n = (e = t.stateNode.containerInfo).nodeType)) Nf(e);else if (1 === n) switch (e.nodeName) {
                            case "HEAD":
                            case "HTML":
                            case "BODY":
                              Nf(e);
                              break;
                            default:
                              e.textContent = "";
                          }
                          break;
                        default:
                          if (1024 & e) throw Error(l(163));
                      }
                      if (null !== (e = t.sibling)) {
                        e.return = t.return, ju = e;
                        break;
                      }
                      ju = t.return;
                    }
                  }(e, t);
                } finally {
                  ms = i, R.p = a, j.T = r;
                }
              }
              Ds = 1, vc(), yc(), bc();
            }
          }
          function vc() {
            if (1 === Ds) {
              Ds = 0;
              var e = Is,
                t = Vs,
                n = !!(13878 & t.flags);
              if (13878 & t.subtreeFlags || n) {
                n = j.T, j.T = null;
                var r = R.p;
                R.p = 2;
                var a = ms;
                ms |= 4;
                try {
                  qu(t, e);
                  var l = vf,
                    o = ar(e.containerInfo),
                    i = l.focusedElem,
                    u = l.selectionRange;
                  if (o !== i && i && i.ownerDocument && rr(i.ownerDocument.documentElement, i)) {
                    if (null !== u && lr(i)) {
                      var s = u.start,
                        c = u.end;
                      if (void 0 === c && (c = s), "selectionStart" in i) i.selectionStart = s, i.selectionEnd = Math.min(c, i.value.length);else {
                        var f = i.ownerDocument || document,
                          d = f && f.defaultView || window;
                        if (d.getSelection) {
                          var p = d.getSelection(),
                            m = i.textContent.length,
                            h = Math.min(u.start, m),
                            g = void 0 === u.end ? h : Math.min(u.end, m);
                          !p.extend && h > g && (o = g, g = h, h = o);
                          var v = nr(i, h),
                            y = nr(i, g);
                          if (v && y && (1 !== p.rangeCount || p.anchorNode !== v.node || p.anchorOffset !== v.offset || p.focusNode !== y.node || p.focusOffset !== y.offset)) {
                            var b = f.createRange();
                            b.setStart(v.node, v.offset), p.removeAllRanges(), h > g ? (p.addRange(b), p.extend(y.node, y.offset)) : (b.setEnd(y.node, y.offset), p.addRange(b));
                          }
                        }
                      }
                    }
                    for (f = [], p = i; p = p.parentNode;) 1 === p.nodeType && f.push({
                      element: p,
                      left: p.scrollLeft,
                      top: p.scrollTop
                    });
                    for ("function" == typeof i.focus && i.focus(), i = 0; i < f.length; i++) {
                      var w = f[i];
                      w.element.scrollLeft = w.left, w.element.scrollTop = w.top;
                    }
                  }
                  bd = !!gf, vf = gf = null;
                } finally {
                  ms = a, R.p = r, j.T = n;
                }
              }
              e.current = t, Ds = 2;
            }
          }
          function yc() {
            if (2 === Ds) {
              Ds = 0;
              var e = Is,
                t = Vs,
                n = !!(8772 & t.flags);
              if (8772 & t.subtreeFlags || n) {
                n = j.T, j.T = null;
                var r = R.p;
                R.p = 2;
                var a = ms;
                ms |= 4;
                try {
                  Fu(e, t.alternate, t);
                } finally {
                  ms = a, R.p = r, j.T = n;
                }
              }
              Ds = 3;
            }
          }
          function bc() {
            if (4 === Ds || 3 === Ds) {
              Ds = 0, ue();
              var e = Is,
                t = Vs,
                n = Bs,
                r = Ws;
              10256 & t.subtreeFlags || 10256 & t.flags ? Ds = 5 : (Ds = 0, Vs = Is = null, wc(e, e.pendingLanes));
              var a = e.pendingLanes;
              if (0 === a && (Ms = null), De(n), t = t.stateNode, be && "function" == typeof be.onCommitFiberRoot) try {
                be.onCommitFiberRoot(ye, t, void 0, !(128 & ~t.current.flags));
              } catch (u) {}
              if (null !== r) {
                t = j.T, a = R.p, R.p = 2, j.T = null;
                try {
                  for (var l = e.onRecoverableError, o = 0; o < r.length; o++) {
                    var i = r[o];
                    l(i.value, {
                      componentStack: i.stack
                    });
                  }
                } finally {
                  j.T = t, R.p = a;
                }
              }
              3 & Bs && kc(), Rc(e), a = e.pendingLanes, 261930 & n && 42 & a ? e === qs ? $s++ : ($s = 0, qs = e) : $s = 0, Mc(0, !1);
            }
          }
          function wc(e, t) {
            0 === (e.pooledCacheLanes &= t) && null != (t = e.pooledCache) && (e.pooledCache = null, Ba(t));
          }
          function kc() {
            return vc(), yc(), bc(), Sc();
          }
          function Sc() {
            if (5 !== Ds) return !1;
            var e = Is,
              t = Hs;
            Hs = 0;
            var n = De(Bs),
              r = j.T,
              a = R.p;
            try {
              R.p = 32 > n ? 32 : n, j.T = null, n = Us, Us = null;
              var o = Is,
                i = Bs;
              if (Ds = 0, Vs = Is = null, Bs = 0, 6 & ms) throw Error(l(331));
              var u = ms;
              if (ms |= 4, ss(o.current), ts(o, o.current, i, n), ms = u, Mc(0, !1), be && "function" == typeof be.onPostCommitFiberRoot) try {
                be.onPostCommitFiberRoot(ye, o);
              } catch (s) {}
              return !0;
            } finally {
              R.p = a, j.T = r, wc(e, t);
            }
          }
          function _c(e, t, n) {
            t = Kr(n, t), null !== (e = wl(e, t = Ti(e.stateNode, t, 2), 2)) && (Ae(e, 2), Rc(e));
          }
          function xc(e, t, n) {
            if (3 === e.tag) _c(e, e, n);else for (; null !== t;) {
              if (3 === t.tag) {
                _c(t, e, n);
                break;
              }
              if (1 === t.tag) {
                var r = t.stateNode;
                if ("function" == typeof t.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === Ms || !Ms.has(r))) {
                  e = Kr(n, e), null !== (r = wl(t, n = Ni(2), 2)) && (Oi(n, r, t, e), Ae(r, 2), Rc(r));
                  break;
                }
              }
              t = t.return;
            }
          }
          function Ec(e, t, n) {
            var r = e.pingCache;
            if (null === r) {
              r = e.pingCache = new ps();
              var a = new Set();
              r.set(t, a);
            } else void 0 === (a = r.get(t)) && (a = new Set(), r.set(t, a));
            a.has(n) || (Ss = !0, a.add(n), e = Cc.bind(null, e, t, n), t.then(e, e));
          }
          function Cc(e, t, n) {
            var r = e.pingCache;
            null !== r && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, hs === e && (vs & n) === n && (4 === xs || 3 === xs && (62914560 & vs) === vs && 300 > se() - As ? !(2 & ms) && nc(e, 0) : zs |= n, Ls === vs && (Ls = 0)), Rc(e);
          }
          function zc(e, t) {
            0 === t && (t = Ne()), null !== (e = jr(e, t)) && (Ae(e, t), Rc(e));
          }
          function Pc(e) {
            var t = e.memoizedState,
              n = 0;
            null !== t && (n = t.retryLane), zc(e, n);
          }
          function Lc(e, t) {
            var n = 0;
            switch (e.tag) {
              case 31:
              case 13:
                var r = e.stateNode,
                  a = e.memoizedState;
                null !== a && (n = a.retryLane);
                break;
              case 19:
                r = e.stateNode;
                break;
              case 22:
                r = e.stateNode._retryCache;
                break;
              default:
                throw Error(l(314));
            }
            null !== r && r.delete(t), zc(e, n);
          }
          var Tc = null,
            Nc = null,
            Oc = !1,
            Ac = !1,
            jc = !1,
            Fc = 0;
          function Rc(e) {
            e !== Nc && null === e.next && (null === Nc ? Tc = Nc = e : Nc = Nc.next = e), Ac = !0, Oc || (Oc = !0, Cf(function () {
              6 & ms ? le(fe, Dc) : Ic();
            }));
          }
          function Mc(e, t) {
            if (!jc && Ac) {
              jc = !0;
              do {
                for (var n = !1, r = Tc; null !== r;) {
                  if (!t) if (0 !== e) {
                    var a = r.pendingLanes;
                    if (0 === a) var l = 0;else {
                      var o = r.suspendedLanes,
                        i = r.pingedLanes;
                      l = (1 << 31 - ke(42 | e) + 1) - 1, l = 201326741 & (l &= a & ~(o & ~i)) ? 201326741 & l | 1 : l ? 2 | l : 0;
                    }
                    0 !== l && (n = !0, Hc(r, l));
                  } else l = vs, !(3 & (l = Pe(r, r === hs ? l : 0, null !== r.cancelPendingCommit || -1 !== r.timeoutHandle))) || Le(r, l) || (n = !0, Hc(r, l));
                  r = r.next;
                }
              } while (n);
              jc = !1;
            }
          }
          function Dc() {
            Ic();
          }
          function Ic() {
            Ac = Oc = !1;
            var e = 0;
            0 !== Fc && function () {
              var e = window.event;
              if (e && "popstate" === e.type) return e !== Sf && (Sf = e, !0);
              return Sf = null, !1;
            }() && (e = Fc);
            for (var t = se(), n = null, r = Tc; null !== r;) {
              var a = r.next,
                l = Vc(r, t);
              0 === l ? (r.next = null, null === n ? Tc = a : n.next = a, null === a && (Nc = n)) : (n = r, (0 !== e || 3 & l) && (Ac = !0)), r = a;
            }
            0 !== Ds && 5 !== Ds || Mc(e, !1), 0 !== Fc && (Fc = 0);
          }
          function Vc(e, t) {
            for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, l = -62914561 & e.pendingLanes; 0 < l;) {
              var o = 31 - ke(l),
                i = 1 << o,
                u = a[o];
              -1 === u ? 0 !== (i & n) && 0 === (i & r) || (a[o] = Te(i, t)) : u <= t && (e.expiredLanes |= i), l &= ~i;
            }
            if (n = vs, n = Pe(e, e === (t = hs) ? n : 0, null !== e.cancelPendingCommit || -1 !== e.timeoutHandle), r = e.callbackNode, 0 === n || e === t && (2 === ys || 9 === ys) || null !== e.cancelPendingCommit) return null !== r && null !== r && oe(r), e.callbackNode = null, e.callbackPriority = 0;
            if (!(3 & n) || Le(e, n)) {
              if ((t = n & -n) === e.callbackPriority) return t;
              switch (null !== r && oe(r), De(n)) {
                case 2:
                case 8:
                  n = de;
                  break;
                case 32:
                default:
                  n = pe;
                  break;
                case 268435456:
                  n = he;
              }
              return r = Bc.bind(null, e), n = le(n, r), e.callbackPriority = t, e.callbackNode = n, t;
            }
            return null !== r && null !== r && oe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
          }
          function Bc(e, t) {
            if (0 !== Ds && 5 !== Ds) return e.callbackNode = null, e.callbackPriority = 0, null;
            var n = e.callbackNode;
            if (kc() && e.callbackNode !== n) return null;
            var r = vs;
            return 0 === (r = Pe(e, e === hs ? r : 0, null !== e.cancelPendingCommit || -1 !== e.timeoutHandle)) ? null : (Gs(e, r, t), Vc(e, se()), null != e.callbackNode && e.callbackNode === n ? Bc.bind(null, e) : null);
          }
          function Hc(e, t) {
            if (kc()) return null;
            Gs(e, t, !0);
          }
          function Uc() {
            if (0 === Fc) {
              var e = Wa;
              0 === e && (e = xe, !(261888 & (xe <<= 1)) && (xe = 256)), Fc = e;
            }
            return Fc;
          }
          function Wc(e) {
            return null == e || "symbol" === n(e) || "boolean" == typeof e ? null : "function" == typeof e ? e : Ot("" + e);
          }
          function $c(e, t) {
            var n = t.ownerDocument.createElement("input");
            return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
          }
          for (var qc = 0; qc < Er.length; qc++) {
            var Qc = Er[qc];
            Cr(Qc.toLowerCase(), "on" + (Qc[0].toUpperCase() + Qc.slice(1)));
          }
          Cr(vr, "onAnimationEnd"), Cr(yr, "onAnimationIteration"), Cr(br, "onAnimationStart"), Cr("dblclick", "onDoubleClick"), Cr("focusin", "onFocus"), Cr("focusout", "onBlur"), Cr(wr, "onTransitionRun"), Cr(kr, "onTransitionStart"), Cr(Sr, "onTransitionCancel"), Cr(_r, "onTransitionEnd"), lt("onMouseEnter", ["mouseout", "mouseover"]), lt("onMouseLeave", ["mouseout", "mouseover"]), lt("onPointerEnter", ["pointerout", "pointerover"]), lt("onPointerLeave", ["pointerout", "pointerover"]), at("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), at("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), at("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), at("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), at("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), at("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
          var Xc = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
            Kc = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xc));
          function Gc(e, t) {
            t = !!(4 & t);
            for (var n = 0; n < e.length; n++) {
              var r = e[n],
                a = r.event;
              r = r.listeners;
              e: {
                var l = void 0;
                if (t) for (var o = r.length - 1; 0 <= o; o--) {
                  var i = r[o],
                    u = i.instance,
                    s = i.currentTarget;
                  if (i = i.listener, u !== l && a.isPropagationStopped()) break e;
                  l = i, a.currentTarget = s;
                  try {
                    l(a);
                  } catch (c) {
                    zr(c);
                  }
                  a.currentTarget = null, l = u;
                } else for (o = 0; o < r.length; o++) {
                  if (u = (i = r[o]).instance, s = i.currentTarget, i = i.listener, u !== l && a.isPropagationStopped()) break e;
                  l = i, a.currentTarget = s;
                  try {
                    l(a);
                  } catch (c) {
                    zr(c);
                  }
                  a.currentTarget = null, l = u;
                }
              }
            }
          }
          function Yc(e, t) {
            var n = t[$e];
            void 0 === n && (n = t[$e] = new Set());
            var r = e + "__bubble";
            n.has(r) || (tf(t, e, 2, !1), n.add(r));
          }
          function Zc(e, t, n) {
            var r = 0;
            t && (r |= 4), tf(n, e, r, t);
          }
          var Jc = "_reactListening" + Math.random().toString(36).slice(2);
          function ef(e) {
            if (!e[Jc]) {
              e[Jc] = !0, nt.forEach(function (t) {
                "selectionchange" !== t && (Kc.has(t) || Zc(t, !1, e), Zc(t, !0, e));
              });
              var t = 9 === e.nodeType ? e : e.ownerDocument;
              null === t || t[Jc] || (t[Jc] = !0, Zc("selectionchange", !1, t));
            }
          }
          function tf(e, t, n, r) {
            switch (Cd(t)) {
              case 2:
                var a = wd;
                break;
              case 8:
                a = kd;
                break;
              default:
                a = Sd;
            }
            n = a.bind(null, t, n, e), a = void 0, !Ut || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (a = !0), r ? void 0 !== a ? e.addEventListener(t, n, {
              capture: !0,
              passive: a
            }) : e.addEventListener(t, n, !0) : void 0 !== a ? e.addEventListener(t, n, {
              passive: a
            }) : e.addEventListener(t, n, !1);
          }
          function nf(e, t, n, r, a) {
            var l = r;
            if (!(1 & t || 2 & t || null === r)) e: for (;;) {
              if (null === r) return;
              var i = r.tag;
              if (3 === i || 4 === i) {
                var u = r.stateNode.containerInfo;
                if (u === a) break;
                if (4 === i) for (i = r.return; null !== i;) {
                  var s = i.tag;
                  if ((3 === s || 4 === s) && i.stateNode.containerInfo === a) return;
                  i = i.return;
                }
                for (; null !== u;) {
                  if (null === (i = Ye(u))) return;
                  if (5 === (s = i.tag) || 6 === s || 26 === s || 27 === s) {
                    r = l = i;
                    continue e;
                  }
                  u = u.parentNode;
                }
              }
              r = r.return;
            }
            Vt(function () {
              var r = l,
                a = Ft(n),
                i = [];
              e: {
                var u = xr.get(e);
                if (void 0 !== u) {
                  var s = rn,
                    c = e;
                  switch (e) {
                    case "keypress":
                      if (0 === Kt(n)) break e;
                    case "keydown":
                    case "keyup":
                      s = bn;
                      break;
                    case "focusin":
                      c = "focus", s = cn;
                      break;
                    case "focusout":
                      c = "blur", s = cn;
                      break;
                    case "beforeblur":
                    case "afterblur":
                      s = cn;
                      break;
                    case "click":
                      if (2 === n.button) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                      s = un;
                      break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                      s = sn;
                      break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                      s = kn;
                      break;
                    case vr:
                    case yr:
                    case br:
                      s = fn;
                      break;
                    case _r:
                      s = Sn;
                      break;
                    case "scroll":
                    case "scrollend":
                      s = ln;
                      break;
                    case "wheel":
                      s = _n;
                      break;
                    case "copy":
                    case "cut":
                    case "paste":
                      s = dn;
                      break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                      s = wn;
                      break;
                    case "toggle":
                    case "beforetoggle":
                      s = xn;
                  }
                  var f = !!(4 & t),
                    d = !f && ("scroll" === e || "scrollend" === e),
                    p = f ? null !== u ? u + "Capture" : null : u;
                  f = [];
                  for (var m, h = r; null !== h;) {
                    var g = h;
                    if (m = g.stateNode, 5 !== (g = g.tag) && 26 !== g && 27 !== g || null === m || null === p || null != (g = Bt(h, p)) && f.push(rf(h, g, m)), d) break;
                    h = h.return;
                  }
                  0 < f.length && (u = new s(u, c, null, n, a), i.push({
                    event: u,
                    listeners: f
                  }));
                }
              }
              if (!(7 & t)) {
                if (s = "mouseout" === e || "pointerout" === e, (!(u = "mouseover" === e || "pointerover" === e) || n === jt || !(c = n.relatedTarget || n.fromElement) || !Ye(c) && !c[We]) && (s || u) && (u = a.window === a ? a : (u = a.ownerDocument) ? u.defaultView || u.parentWindow : window, s ? (s = r, null !== (c = (c = n.relatedTarget || n.toElement) ? Ye(c) : null) && (d = o(c), f = c.tag, c !== d || 5 !== f && 27 !== f && 6 !== f) && (c = null)) : (s = null, c = r), s !== c)) {
                  if (f = un, g = "onMouseLeave", p = "onMouseEnter", h = "mouse", "pointerout" !== e && "pointerover" !== e || (f = wn, g = "onPointerLeave", p = "onPointerEnter", h = "pointer"), d = null == s ? u : Je(s), m = null == c ? u : Je(c), (u = new f(g, h + "leave", s, n, a)).target = d, u.relatedTarget = m, g = null, Ye(a) === r && ((f = new f(p, h + "enter", c, n, a)).target = m, f.relatedTarget = d, g = f), d = g, s && c) e: {
                    for (f = lf, h = c, m = 0, g = p = s; g; g = f(g)) m++;
                    g = 0;
                    for (var v = h; v; v = f(v)) g++;
                    for (; 0 < m - g;) p = f(p), m--;
                    for (; 0 < g - m;) h = f(h), g--;
                    for (; m--;) {
                      if (p === h || null !== h && p === h.alternate) {
                        f = p;
                        break e;
                      }
                      p = f(p), h = f(h);
                    }
                    f = null;
                  } else f = null;
                  null !== s && of(i, u, s, f, !1), null !== c && null !== d && of(i, d, c, f, !0);
                }
                if ("select" === (s = (u = r ? Je(r) : window).nodeName && u.nodeName.toLowerCase()) || "input" === s && "file" === u.type) var y = Hn;else if (Rn(u)) {
                  if (Un) y = Zn;else {
                    y = Gn;
                    var b = Kn;
                  }
                } else !(s = u.nodeName) || "input" !== s.toLowerCase() || "checkbox" !== u.type && "radio" !== u.type ? r && Lt(r.elementType) && (y = Hn) : y = Yn;
                switch (y && (y = y(e, r)) ? Mn(i, y, n, a) : (b && b(e, u, r), "focusout" === e && r && "number" === u.type && null != r.memoizedProps.value && kt(u, "number", u.value)), b = r ? Je(r) : window, e) {
                  case "focusin":
                    (Rn(b) || "true" === b.contentEditable) && (ir = b, ur = r, sr = null);
                    break;
                  case "focusout":
                    sr = ur = ir = null;
                    break;
                  case "mousedown":
                    cr = !0;
                    break;
                  case "contextmenu":
                  case "mouseup":
                  case "dragend":
                    cr = !1, fr(i, n, a);
                    break;
                  case "selectionchange":
                    if (or) break;
                  case "keydown":
                  case "keyup":
                    fr(i, n, a);
                }
                var w;
                if (Cn) e: {
                  switch (e) {
                    case "compositionstart":
                      var k = "onCompositionStart";
                      break e;
                    case "compositionend":
                      k = "onCompositionEnd";
                      break e;
                    case "compositionupdate":
                      k = "onCompositionUpdate";
                      break e;
                  }
                  k = void 0;
                } else jn ? On(e, n) && (k = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (k = "onCompositionStart");
                k && (Ln && "ko" !== n.locale && (jn || "onCompositionStart" !== k ? "onCompositionEnd" === k && jn && (w = Xt()) : (qt = "value" in ($t = a) ? $t.value : $t.textContent, jn = !0)), 0 < (b = af(r, k)).length && (k = new pn(k, e, null, n, a), i.push({
                  event: k,
                  listeners: b
                }), w ? k.data = w : null !== (w = An(n)) && (k.data = w))), (w = Pn ? function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return An(t);
                    case "keypress":
                      return 32 !== t.which ? null : (Nn = !0, Tn);
                    case "textInput":
                      return (e = t.data) === Tn && Nn ? null : e;
                    default:
                      return null;
                  }
                }(e, n) : function (e, t) {
                  if (jn) return "compositionend" === e || !Cn && On(e, t) ? (e = Xt(), Qt = qt = $t = null, jn = !1, e) : null;
                  switch (e) {
                    case "paste":
                    default:
                      return null;
                    case "keypress":
                      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                      }
                      return null;
                    case "compositionend":
                      return Ln && "ko" !== t.locale ? null : t.data;
                  }
                }(e, n)) && 0 < (k = af(r, "onBeforeInput")).length && (b = new pn("onBeforeInput", "beforeinput", null, n, a), i.push({
                  event: b,
                  listeners: k
                }), b.data = w), function (e, t, n, r, a) {
                  if ("submit" === t && n && n.stateNode === a) {
                    var l = Wc((a[Ue] || null).action),
                      o = r.submitter;
                    o && null !== (t = (t = o[Ue] || null) ? Wc(t.formAction) : o.getAttribute("formAction")) && (l = t, o = null);
                    var i = new rn("action", "action", null, r, a);
                    e.push({
                      event: i,
                      listeners: [{
                        instance: null,
                        listener: function () {
                          if (r.defaultPrevented) {
                            if (0 !== Fc) {
                              var e = o ? $c(a, o) : new FormData(a);
                              ni(n, {
                                pending: !0,
                                data: e,
                                method: a.method,
                                action: l
                              }, null, e);
                            }
                          } else "function" == typeof l && (i.preventDefault(), e = o ? $c(a, o) : new FormData(a), ni(n, {
                            pending: !0,
                            data: e,
                            method: a.method,
                            action: l
                          }, l, e));
                        },
                        currentTarget: a
                      }]
                    });
                  }
                }(i, e, r, n, a);
              }
              Gc(i, t);
            });
          }
          function rf(e, t, n) {
            return {
              instance: e,
              listener: t,
              currentTarget: n
            };
          }
          function af(e, t) {
            for (var n = t + "Capture", r = []; null !== e;) {
              var a = e,
                l = a.stateNode;
              if (5 !== (a = a.tag) && 26 !== a && 27 !== a || null === l || (null != (a = Bt(e, n)) && r.unshift(rf(e, a, l)), null != (a = Bt(e, t)) && r.push(rf(e, a, l))), 3 === e.tag) return r;
              e = e.return;
            }
            return [];
          }
          function lf(e) {
            if (null === e) return null;
            do {
              e = e.return;
            } while (e && 5 !== e.tag && 27 !== e.tag);
            return e || null;
          }
          function of(e, t, n, r, a) {
            for (var l = t._reactName, o = []; null !== n && n !== r;) {
              var i = n,
                u = i.alternate,
                s = i.stateNode;
              if (i = i.tag, null !== u && u === r) break;
              5 !== i && 26 !== i && 27 !== i || null === s || (u = s, a ? null != (s = Bt(n, l)) && o.unshift(rf(n, s, u)) : a || null != (s = Bt(n, l)) && o.push(rf(n, s, u))), n = n.return;
            }
            0 !== o.length && e.push({
              event: t,
              listeners: o
            });
          }
          var uf = /\r\n?/g,
            sf = /\u0000|\uFFFD/g;
          function cf(e) {
            return ("string" == typeof e ? e : "" + e).replace(uf, "\n").replace(sf, "");
          }
          function ff(e, t) {
            return t = cf(t), cf(e) === t;
          }
          function df(e, t, r, a, o, i) {
            switch (r) {
              case "children":
                "string" == typeof a ? "body" === t || "textarea" === t && "" === a || Et(e, a) : ("number" == typeof a || "bigint" == typeof a) && "body" !== t && Et(e, "" + a);
                break;
              case "className":
                ct(e, "class", a);
                break;
              case "tabIndex":
                ct(e, "tabindex", a);
                break;
              case "dir":
              case "role":
              case "viewBox":
              case "width":
              case "height":
                ct(e, r, a);
                break;
              case "style":
                Pt(e, a, i);
                break;
              case "data":
                if ("object" !== t) {
                  ct(e, "data", a);
                  break;
                }
              case "src":
              case "href":
                if ("" === a && ("a" !== t || "href" !== r)) {
                  e.removeAttribute(r);
                  break;
                }
                if (null == a || "function" == typeof a || "symbol" === n(a) || "boolean" == typeof a) {
                  e.removeAttribute(r);
                  break;
                }
                a = Ot("" + a), e.setAttribute(r, a);
                break;
              case "action":
              case "formAction":
                if ("function" == typeof a) {
                  e.setAttribute(r, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                  break;
                }
                if ("function" == typeof i && ("formAction" === r ? ("input" !== t && df(e, t, "name", o.name, o, null), df(e, t, "formEncType", o.formEncType, o, null), df(e, t, "formMethod", o.formMethod, o, null), df(e, t, "formTarget", o.formTarget, o, null)) : (df(e, t, "encType", o.encType, o, null), df(e, t, "method", o.method, o, null), df(e, t, "target", o.target, o, null))), null == a || "symbol" === n(a) || "boolean" == typeof a) {
                  e.removeAttribute(r);
                  break;
                }
                a = Ot("" + a), e.setAttribute(r, a);
                break;
              case "onClick":
                null != a && (e.onclick = At);
                break;
              case "onScroll":
                null != a && Yc("scroll", e);
                break;
              case "onScrollEnd":
                null != a && Yc("scrollend", e);
                break;
              case "dangerouslySetInnerHTML":
                if (null != a) {
                  if ("object" !== n(a) || !("__html" in a)) throw Error(l(61));
                  if (null != (r = a.__html)) {
                    if (null != o.children) throw Error(l(60));
                    e.innerHTML = r;
                  }
                }
                break;
              case "multiple":
                e.multiple = a && "function" != typeof a && "symbol" !== n(a);
                break;
              case "muted":
                e.muted = a && "function" != typeof a && "symbol" !== n(a);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
              case "defaultValue":
              case "defaultChecked":
              case "innerHTML":
              case "ref":
              case "autoFocus":
                break;
              case "xlinkHref":
                if (null == a || "function" == typeof a || "boolean" == typeof a || "symbol" === n(a)) {
                  e.removeAttribute("xlink:href");
                  break;
                }
                r = Ot("" + a), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r);
                break;
              case "contentEditable":
              case "spellCheck":
              case "draggable":
              case "value":
              case "autoReverse":
              case "externalResourcesRequired":
              case "focusable":
              case "preserveAlpha":
                null != a && "function" != typeof a && "symbol" !== n(a) ? e.setAttribute(r, "" + a) : e.removeAttribute(r);
                break;
              case "inert":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
                a && "function" != typeof a && "symbol" !== n(a) ? e.setAttribute(r, "") : e.removeAttribute(r);
                break;
              case "capture":
              case "download":
                !0 === a ? e.setAttribute(r, "") : !1 !== a && null != a && "function" != typeof a && "symbol" !== n(a) ? e.setAttribute(r, a) : e.removeAttribute(r);
                break;
              case "cols":
              case "rows":
              case "size":
              case "span":
                null != a && "function" != typeof a && "symbol" !== n(a) && !isNaN(a) && 1 <= a ? e.setAttribute(r, a) : e.removeAttribute(r);
                break;
              case "rowSpan":
              case "start":
                null == a || "function" == typeof a || "symbol" === n(a) || isNaN(a) ? e.removeAttribute(r) : e.setAttribute(r, a);
                break;
              case "popover":
                Yc("beforetoggle", e), Yc("toggle", e), st(e, "popover", a);
                break;
              case "xlinkActuate":
                ft(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
                break;
              case "xlinkArcrole":
                ft(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
                break;
              case "xlinkRole":
                ft(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
                break;
              case "xlinkShow":
                ft(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
                break;
              case "xlinkTitle":
                ft(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
                break;
              case "xlinkType":
                ft(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
                break;
              case "xmlBase":
                ft(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
                break;
              case "xmlLang":
                ft(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
                break;
              case "xmlSpace":
                ft(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
                break;
              case "is":
                st(e, "is", a);
                break;
              case "innerText":
              case "textContent":
                break;
              default:
                (!(2 < r.length) || "o" !== r[0] && "O" !== r[0] || "n" !== r[1] && "N" !== r[1]) && st(e, r = Tt.get(r) || r, a);
            }
          }
          function pf(e, t, r, a, o, i) {
            switch (r) {
              case "style":
                Pt(e, a, i);
                break;
              case "dangerouslySetInnerHTML":
                if (null != a) {
                  if ("object" !== n(a) || !("__html" in a)) throw Error(l(61));
                  if (null != (r = a.__html)) {
                    if (null != o.children) throw Error(l(60));
                    e.innerHTML = r;
                  }
                }
                break;
              case "children":
                "string" == typeof a ? Et(e, a) : ("number" == typeof a || "bigint" == typeof a) && Et(e, "" + a);
                break;
              case "onScroll":
                null != a && Yc("scroll", e);
                break;
              case "onScrollEnd":
                null != a && Yc("scrollend", e);
                break;
              case "onClick":
                null != a && (e.onclick = At);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
              case "innerHTML":
              case "ref":
              case "innerText":
              case "textContent":
                break;
              default:
                rt.hasOwnProperty(r) || ("o" !== r[0] || "n" !== r[1] || (o = r.endsWith("Capture"), t = r.slice(2, o ? r.length - 7 : void 0), "function" == typeof (i = null != (i = e[Ue] || null) ? i[r] : null) && e.removeEventListener(t, i, o), "function" != typeof a) ? r in e ? e[r] = a : !0 === a ? e.setAttribute(r, "") : st(e, r, a) : ("function" != typeof i && null !== i && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(t, a, o)));
            }
          }
          function mf(e, t, r) {
            switch (t) {
              case "div":
              case "span":
              case "svg":
              case "path":
              case "a":
              case "g":
              case "p":
              case "li":
                break;
              case "img":
                Yc("error", e), Yc("load", e);
                var a,
                  o = !1,
                  i = !1;
                for (a in r) if (r.hasOwnProperty(a)) {
                  var u = r[a];
                  if (null != u) switch (a) {
                    case "src":
                      o = !0;
                      break;
                    case "srcSet":
                      i = !0;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(l(137, t));
                    default:
                      df(e, t, a, u, r, null);
                  }
                }
                return i && df(e, t, "srcSet", r.srcSet, r, null), void (o && df(e, t, "src", r.src, r, null));
              case "input":
                Yc("invalid", e);
                var s = a = u = i = null,
                  c = null,
                  f = null;
                for (o in r) if (r.hasOwnProperty(o)) {
                  var d = r[o];
                  if (null != d) switch (o) {
                    case "name":
                      i = d;
                      break;
                    case "type":
                      u = d;
                      break;
                    case "checked":
                      c = d;
                      break;
                    case "defaultChecked":
                      f = d;
                      break;
                    case "value":
                      a = d;
                      break;
                    case "defaultValue":
                      s = d;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (null != d) throw Error(l(137, t));
                      break;
                    default:
                      df(e, t, o, d, r, null);
                  }
                }
                return void wt(e, a, s, c, f, u, i, !1);
              case "select":
                for (i in Yc("invalid", e), o = u = a = null, r) if (r.hasOwnProperty(i) && null != (s = r[i])) switch (i) {
                  case "value":
                    a = s;
                    break;
                  case "defaultValue":
                    u = s;
                    break;
                  case "multiple":
                    o = s;
                  default:
                    df(e, t, i, s, r, null);
                }
                return t = a, r = u, e.multiple = !!o, void (null != t ? St(e, !!o, t, !1) : null != r && St(e, !!o, r, !0));
              case "textarea":
                for (u in Yc("invalid", e), a = i = o = null, r) if (r.hasOwnProperty(u) && null != (s = r[u])) switch (u) {
                  case "value":
                    o = s;
                    break;
                  case "defaultValue":
                    i = s;
                    break;
                  case "children":
                    a = s;
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != s) throw Error(l(91));
                    break;
                  default:
                    df(e, t, u, s, r, null);
                }
                return void xt(e, o, i, a);
              case "option":
                for (c in r) if (r.hasOwnProperty(c) && null != (o = r[c])) if ("selected" === c) e.selected = o && "function" != typeof o && "symbol" !== n(o);else df(e, t, c, o, r, null);
                return;
              case "dialog":
                Yc("beforetoggle", e), Yc("toggle", e), Yc("cancel", e), Yc("close", e);
                break;
              case "iframe":
              case "object":
                Yc("load", e);
                break;
              case "video":
              case "audio":
                for (o = 0; o < Xc.length; o++) Yc(Xc[o], e);
                break;
              case "image":
                Yc("error", e), Yc("load", e);
                break;
              case "details":
                Yc("toggle", e);
                break;
              case "embed":
              case "source":
              case "link":
                Yc("error", e), Yc("load", e);
              case "area":
              case "base":
              case "br":
              case "col":
              case "hr":
              case "keygen":
              case "meta":
              case "param":
              case "track":
              case "wbr":
              case "menuitem":
                for (f in r) if (r.hasOwnProperty(f) && null != (o = r[f])) switch (f) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(l(137, t));
                  default:
                    df(e, t, f, o, r, null);
                }
                return;
              default:
                if (Lt(t)) {
                  for (d in r) r.hasOwnProperty(d) && void 0 !== (o = r[d]) && pf(e, t, d, o, r, void 0);
                  return;
                }
            }
            for (s in r) r.hasOwnProperty(s) && null != (o = r[s]) && df(e, t, s, o, r, null);
          }
          function hf(e) {
            switch (e) {
              case "css":
              case "script":
              case "font":
              case "img":
              case "image":
              case "input":
              case "link":
                return !0;
              default:
                return !1;
            }
          }
          var gf = null,
            vf = null;
          function yf(e) {
            return 9 === e.nodeType ? e : e.ownerDocument;
          }
          function bf(e) {
            switch (e) {
              case "http://www.w3.org/2000/svg":
                return 1;
              case "http://www.w3.org/1998/Math/MathML":
                return 2;
              default:
                return 0;
            }
          }
          function wf(e, t) {
            if (0 === e) switch (t) {
              case "svg":
                return 1;
              case "math":
                return 2;
              default:
                return 0;
            }
            return 1 === e && "foreignObject" === t ? 0 : e;
          }
          function kf(e, t) {
            return "textarea" === e || "noscript" === e || "string" == typeof t.children || "number" == typeof t.children || "bigint" == typeof t.children || "object" === n(t.dangerouslySetInnerHTML) && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html;
          }
          var Sf = null;
          var _f = "function" == typeof setTimeout ? setTimeout : void 0,
            xf = "function" == typeof clearTimeout ? clearTimeout : void 0,
            Ef = "function" == typeof Promise ? Promise : void 0,
            Cf = "function" == typeof queueMicrotask ? queueMicrotask : void 0 !== Ef ? function (e) {
              return Ef.resolve(null).then(e).catch(zf);
            } : _f;
          function zf(e) {
            setTimeout(function () {
              throw e;
            });
          }
          function Pf(e) {
            return "head" === e;
          }
          function Lf(e, t) {
            var n = t,
              r = 0;
            do {
              var a = n.nextSibling;
              if (e.removeChild(n), a && 8 === a.nodeType) if ("/$" === (n = a.data) || "/&" === n) {
                if (0 === r) return e.removeChild(a), void Wd(t);
                r--;
              } else if ("$" === n || "$?" === n || "$~" === n || "$!" === n || "&" === n) r++;else if ("html" === n) Vf(e.ownerDocument.documentElement);else if ("head" === n) {
                Vf(n = e.ownerDocument.head);
                for (var l = n.firstChild; l;) {
                  var o = l.nextSibling,
                    i = l.nodeName;
                  l[Ke] || "SCRIPT" === i || "STYLE" === i || "LINK" === i && "stylesheet" === l.rel.toLowerCase() || n.removeChild(l), l = o;
                }
              } else "body" === n && Vf(e.ownerDocument.body);
              n = a;
            } while (n);
            Wd(t);
          }
          function Tf(e, t) {
            var n = e;
            e = 0;
            do {
              var r = n.nextSibling;
              if (1 === n.nodeType ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", "" === n.getAttribute("style") && n.removeAttribute("style")) : 3 === n.nodeType && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && 8 === r.nodeType) if ("/$" === (n = r.data)) {
                if (0 === e) break;
                e--;
              } else "$" !== n && "$?" !== n && "$~" !== n && "$!" !== n || e++;
              n = r;
            } while (n);
          }
          function Nf(e) {
            var t = e.firstChild;
            for (t && 10 === t.nodeType && (t = t.nextSibling); t;) {
              var n = t;
              switch (t = t.nextSibling, n.nodeName) {
                case "HTML":
                case "HEAD":
                case "BODY":
                  Nf(n), Ge(n);
                  continue;
                case "SCRIPT":
                case "STYLE":
                  continue;
                case "LINK":
                  if ("stylesheet" === n.rel.toLowerCase()) continue;
              }
              e.removeChild(n);
            }
          }
          function Of(e, t) {
            for (; 8 !== e.nodeType;) {
              if ((1 !== e.nodeType || "INPUT" !== e.nodeName || "hidden" !== e.type) && !t) return null;
              if (null === (e = Ff(e.nextSibling))) return null;
            }
            return e;
          }
          function Af(e) {
            return "$?" === e.data || "$~" === e.data;
          }
          function jf(e) {
            return "$!" === e.data || "$?" === e.data && "loading" !== e.ownerDocument.readyState;
          }
          function Ff(e) {
            for (; null != e; e = e.nextSibling) {
              var t = e.nodeType;
              if (1 === t || 3 === t) break;
              if (8 === t) {
                if ("$" === (t = e.data) || "$!" === t || "$?" === t || "$~" === t || "&" === t || "F!" === t || "F" === t) break;
                if ("/$" === t || "/&" === t) return null;
              }
            }
            return e;
          }
          var Rf = null;
          function Mf(e) {
            e = e.nextSibling;
            for (var t = 0; e;) {
              if (8 === e.nodeType) {
                var n = e.data;
                if ("/$" === n || "/&" === n) {
                  if (0 === t) return Ff(e.nextSibling);
                  t--;
                } else "$" !== n && "$!" !== n && "$?" !== n && "$~" !== n && "&" !== n || t++;
              }
              e = e.nextSibling;
            }
            return null;
          }
          function Df(e) {
            e = e.previousSibling;
            for (var t = 0; e;) {
              if (8 === e.nodeType) {
                var n = e.data;
                if ("$" === n || "$!" === n || "$?" === n || "$~" === n || "&" === n) {
                  if (0 === t) return e;
                  t--;
                } else "/$" !== n && "/&" !== n || t++;
              }
              e = e.previousSibling;
            }
            return null;
          }
          function If(e, t, n) {
            switch (t = yf(n), e) {
              case "html":
                if (!(e = t.documentElement)) throw Error(l(452));
                return e;
              case "head":
                if (!(e = t.head)) throw Error(l(453));
                return e;
              case "body":
                if (!(e = t.body)) throw Error(l(454));
                return e;
              default:
                throw Error(l(451));
            }
          }
          function Vf(e) {
            for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
            Ge(e);
          }
          var Bf = new Map(),
            Hf = new Set();
          function Uf(e) {
            return "function" == typeof e.getRootNode ? e.getRootNode() : 9 === e.nodeType ? e : e.ownerDocument;
          }
          var Wf = R.d;
          R.d = {
            f: function () {
              var e = Wf.f(),
                t = ec();
              return e || t;
            },
            r: function (e) {
              var t = Ze(e);
              null !== t && 5 === t.tag && "form" === t.type ? ai(t) : Wf.r(e);
            },
            D: function (e) {
              Wf.D(e), qf("dns-prefetch", e, null);
            },
            C: function (e, t) {
              Wf.C(e, t), qf("preconnect", e, t);
            },
            L: function (e, t, n) {
              Wf.L(e, t, n);
              var r = $f;
              if (r && e && t) {
                var a = 'link[rel="preload"][as="' + yt(t) + '"]';
                "image" === t && n && n.imageSrcSet ? (a += '[imagesrcset="' + yt(n.imageSrcSet) + '"]', "string" == typeof n.imageSizes && (a += '[imagesizes="' + yt(n.imageSizes) + '"]')) : a += '[href="' + yt(e) + '"]';
                var l = a;
                switch (t) {
                  case "style":
                    l = Xf(e);
                    break;
                  case "script":
                    l = Yf(e);
                }
                Bf.has(l) || (e = f({
                  rel: "preload",
                  href: "image" === t && n && n.imageSrcSet ? void 0 : e,
                  as: t
                }, n), Bf.set(l, e), null !== r.querySelector(a) || "style" === t && r.querySelector(Kf(l)) || "script" === t && r.querySelector(Zf(l)) || (mf(t = r.createElement("link"), "link", e), tt(t), r.head.appendChild(t)));
              }
            },
            m: function (e, t) {
              Wf.m(e, t);
              var n = $f;
              if (n && e) {
                var r = t && "string" == typeof t.as ? t.as : "script",
                  a = 'link[rel="modulepreload"][as="' + yt(r) + '"][href="' + yt(e) + '"]',
                  l = a;
                switch (r) {
                  case "audioworklet":
                  case "paintworklet":
                  case "serviceworker":
                  case "sharedworker":
                  case "worker":
                  case "script":
                    l = Yf(e);
                }
                if (!Bf.has(l) && (e = f({
                  rel: "modulepreload",
                  href: e
                }, t), Bf.set(l, e), null === n.querySelector(a))) {
                  switch (r) {
                    case "audioworklet":
                    case "paintworklet":
                    case "serviceworker":
                    case "sharedworker":
                    case "worker":
                    case "script":
                      if (n.querySelector(Zf(l))) return;
                  }
                  mf(r = n.createElement("link"), "link", e), tt(r), n.head.appendChild(r);
                }
              }
            },
            X: function (e, t) {
              Wf.X(e, t);
              var n = $f;
              if (n && e) {
                var r = et(n).hoistableScripts,
                  a = Yf(e),
                  l = r.get(a);
                l || ((l = n.querySelector(Zf(a))) || (e = f({
                  src: e,
                  async: !0
                }, t), (t = Bf.get(a)) && nd(e, t), tt(l = n.createElement("script")), mf(l, "link", e), n.head.appendChild(l)), l = {
                  type: "script",
                  instance: l,
                  count: 1,
                  state: null
                }, r.set(a, l));
              }
            },
            S: function (e, t, n) {
              Wf.S(e, t, n);
              var r = $f;
              if (r && e) {
                var a = et(r).hoistableStyles,
                  l = Xf(e);
                t = t || "default";
                var o = a.get(l);
                if (!o) {
                  var i = {
                    loading: 0,
                    preload: null
                  };
                  if (o = r.querySelector(Kf(l))) i.loading = 5;else {
                    e = f({
                      rel: "stylesheet",
                      href: e,
                      "data-precedence": t
                    }, n), (n = Bf.get(l)) && td(e, n);
                    var u = o = r.createElement("link");
                    tt(u), mf(u, "link", e), u._p = new Promise(function (e, t) {
                      u.onload = e, u.onerror = t;
                    }), u.addEventListener("load", function () {
                      i.loading |= 1;
                    }), u.addEventListener("error", function () {
                      i.loading |= 2;
                    }), i.loading |= 4, ed(o, t, r);
                  }
                  o = {
                    type: "stylesheet",
                    instance: o,
                    count: 1,
                    state: i
                  }, a.set(l, o);
                }
              }
            },
            M: function (e, t) {
              Wf.M(e, t);
              var n = $f;
              if (n && e) {
                var r = et(n).hoistableScripts,
                  a = Yf(e),
                  l = r.get(a);
                l || ((l = n.querySelector(Zf(a))) || (e = f({
                  src: e,
                  async: !0,
                  type: "module"
                }, t), (t = Bf.get(a)) && nd(e, t), tt(l = n.createElement("script")), mf(l, "link", e), n.head.appendChild(l)), l = {
                  type: "script",
                  instance: l,
                  count: 1,
                  state: null
                }, r.set(a, l));
              }
            }
          };
          var $f = "undefined" == typeof document ? null : document;
          function qf(e, t, n) {
            var r = $f;
            if (r && "string" == typeof t && t) {
              var a = yt(t);
              a = 'link[rel="' + e + '"][href="' + a + '"]', "string" == typeof n && (a += '[crossorigin="' + n + '"]'), Hf.has(a) || (Hf.add(a), e = {
                rel: e,
                crossOrigin: n,
                href: t
              }, null === r.querySelector(a) && (mf(t = r.createElement("link"), "link", e), tt(t), r.head.appendChild(t)));
            }
          }
          function Qf(e, t, r, a) {
            var o = (o = Q.current) ? Uf(o) : null;
            if (!o) throw Error(l(446));
            switch (e) {
              case "meta":
              case "title":
                return null;
              case "style":
                return "string" == typeof r.precedence && "string" == typeof r.href ? (t = Xf(r.href), (a = (r = et(o).hoistableStyles).get(t)) || (a = {
                  type: "style",
                  instance: null,
                  count: 0,
                  state: null
                }, r.set(t, a)), a) : {
                  type: "void",
                  instance: null,
                  count: 0,
                  state: null
                };
              case "link":
                if ("stylesheet" === r.rel && "string" == typeof r.href && "string" == typeof r.precedence) {
                  e = Xf(r.href);
                  var i = et(o).hoistableStyles,
                    u = i.get(e);
                  if (u || (o = o.ownerDocument || o, u = {
                    type: "stylesheet",
                    instance: null,
                    count: 0,
                    state: {
                      loading: 0,
                      preload: null
                    }
                  }, i.set(e, u), (i = o.querySelector(Kf(e))) && !i._p && (u.instance = i, u.state.loading = 5), Bf.has(e) || (r = {
                    rel: "preload",
                    as: "style",
                    href: r.href,
                    crossOrigin: r.crossOrigin,
                    integrity: r.integrity,
                    media: r.media,
                    hrefLang: r.hrefLang,
                    referrerPolicy: r.referrerPolicy
                  }, Bf.set(e, r), i || function (e, t, n, r) {
                    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function () {
                      return r.loading |= 1;
                    }), t.addEventListener("error", function () {
                      return r.loading |= 2;
                    }), mf(t, "link", n), tt(t), e.head.appendChild(t));
                  }(o, e, r, u.state))), t && null === a) throw Error(l(528, ""));
                  return u;
                }
                if (t && null !== a) throw Error(l(529, ""));
                return null;
              case "script":
                return t = r.async, "string" == typeof (r = r.src) && t && "function" != typeof t && "symbol" !== n(t) ? (t = Yf(r), (a = (r = et(o).hoistableScripts).get(t)) || (a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null
                }, r.set(t, a)), a) : {
                  type: "void",
                  instance: null,
                  count: 0,
                  state: null
                };
              default:
                throw Error(l(444, e));
            }
          }
          function Xf(e) {
            return 'href="' + yt(e) + '"';
          }
          function Kf(e) {
            return 'link[rel="stylesheet"][' + e + "]";
          }
          function Gf(e) {
            return f({}, e, {
              "data-precedence": e.precedence,
              precedence: null
            });
          }
          function Yf(e) {
            return '[src="' + yt(e) + '"]';
          }
          function Zf(e) {
            return "script[async]" + e;
          }
          function Jf(e, t, n) {
            if (t.count++, null === t.instance) switch (t.type) {
              case "style":
                var r = e.querySelector('style[data-href~="' + yt(n.href) + '"]');
                if (r) return t.instance = r, tt(r), r;
                var a = f({}, n, {
                  "data-href": n.href,
                  "data-precedence": n.precedence,
                  href: null,
                  precedence: null
                });
                return tt(r = (e.ownerDocument || e).createElement("style")), mf(r, "style", a), ed(r, n.precedence, e), t.instance = r;
              case "stylesheet":
                a = Xf(n.href);
                var o = e.querySelector(Kf(a));
                if (o) return t.state.loading |= 4, t.instance = o, tt(o), o;
                r = Gf(n), (a = Bf.get(a)) && td(r, a), tt(o = (e.ownerDocument || e).createElement("link"));
                var i = o;
                return i._p = new Promise(function (e, t) {
                  i.onload = e, i.onerror = t;
                }), mf(o, "link", r), t.state.loading |= 4, ed(o, n.precedence, e), t.instance = o;
              case "script":
                return o = Yf(n.src), (a = e.querySelector(Zf(o))) ? (t.instance = a, tt(a), a) : (r = n, (a = Bf.get(o)) && nd(r = f({}, n), a), tt(a = (e = e.ownerDocument || e).createElement("script")), mf(a, "link", r), e.head.appendChild(a), t.instance = a);
              case "void":
                return null;
              default:
                throw Error(l(443, t.type));
            } else "stylesheet" === t.type && !(4 & t.state.loading) && (r = t.instance, t.state.loading |= 4, ed(r, n.precedence, e));
            return t.instance;
          }
          function ed(e, t, n) {
            for (var r = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), a = r.length ? r[r.length - 1] : null, l = a, o = 0; o < r.length; o++) {
              var i = r[o];
              if (i.dataset.precedence === t) l = i;else if (l !== a) break;
            }
            l ? l.parentNode.insertBefore(e, l.nextSibling) : (t = 9 === n.nodeType ? n.head : n).insertBefore(e, t.firstChild);
          }
          function td(e, t) {
            var n, r, a;
            null !== (n = e.crossOrigin) && void 0 !== n || (e.crossOrigin = t.crossOrigin), null !== (r = e.referrerPolicy) && void 0 !== r || (e.referrerPolicy = t.referrerPolicy), null !== (a = e.title) && void 0 !== a || (e.title = t.title);
          }
          function nd(e, t) {
            var n, r, a;
            null !== (n = e.crossOrigin) && void 0 !== n || (e.crossOrigin = t.crossOrigin), null !== (r = e.referrerPolicy) && void 0 !== r || (e.referrerPolicy = t.referrerPolicy), null !== (a = e.integrity) && void 0 !== a || (e.integrity = t.integrity);
          }
          var rd = null;
          function ad(e, t, n) {
            if (null === rd) {
              var r = new Map(),
                a = rd = new Map();
              a.set(n, r);
            } else (r = (a = rd).get(n)) || (r = new Map(), a.set(n, r));
            if (r.has(e)) return r;
            for (r.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
              var l = n[a];
              if (!(l[Ke] || l[He] || "link" === e && "stylesheet" === l.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== l.namespaceURI) {
                var o = l.getAttribute(t) || "";
                o = e + o;
                var i = r.get(o);
                i ? i.push(l) : r.set(o, [l]);
              }
            }
            return r;
          }
          function ld(e, t, n) {
            (e = e.ownerDocument || e).head.insertBefore(n, "title" === t ? e.querySelector("head > title") : null);
          }
          function od(e) {
            return !!("stylesheet" !== e.type || 3 & e.state.loading);
          }
          var id = 0;
          function ud() {
            if (this.count--, 0 === this.count && (0 === this.imgCount || !this.waitingForImages)) if (this.stylesheets) cd(this, this.stylesheets);else if (this.unsuspend) {
              var e = this.unsuspend;
              this.unsuspend = null, e();
            }
          }
          var sd = null;
          function cd(e, t) {
            e.stylesheets = null, null !== e.unsuspend && (e.count++, sd = new Map(), t.forEach(fd, e), sd = null, ud.call(e));
          }
          function fd(e, t) {
            if (!(4 & t.state.loading)) {
              var n = sd.get(e);
              if (n) var r = n.get(null);else {
                n = new Map(), sd.set(e, n);
                for (var a = e.querySelectorAll("link[data-precedence],style[data-precedence]"), l = 0; l < a.length; l++) {
                  var o = a[l];
                  "LINK" !== o.nodeName && "not all" === o.getAttribute("media") || (n.set(o.dataset.precedence, o), r = o);
                }
                r && n.set(null, r);
              }
              o = (a = t.instance).getAttribute("data-precedence"), (l = n.get(o) || r) === r && n.set(null, a), n.set(o, a), this.count++, r = ud.bind(this), a.addEventListener("load", r), a.addEventListener("error", r), l ? l.parentNode.insertBefore(a, l.nextSibling) : (e = 9 === e.nodeType ? e.head : e).insertBefore(a, e.firstChild), t.state.loading |= 4;
            }
          }
          var dd = {
            $$typeof: b,
            Provider: null,
            Consumer: null,
            _currentValue: M,
            _currentValue2: M,
            _threadCount: 0
          };
          function pd(e, t, n, r, a, l, o, i, u) {
            this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Oe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Oe(0), this.hiddenUpdates = Oe(null), this.identifierPrefix = r, this.onUncaughtError = a, this.onCaughtError = l, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = u, this.incompleteTransitions = new Map();
          }
          function md(e, t, n, r, a, l) {
            a = function (e) {
              return e ? e = Mr : Mr;
            }(a), null === r.context ? r.context = a : r.pendingContext = a, (r = bl(t)).payload = {
              element: n
            }, null !== (l = void 0 === l ? null : l) && (r.callback = l), null !== (n = wl(e, r, t)) && (Ks(n, 0, t), kl(n, e, t));
          }
          function hd(e, t) {
            if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
              var n = e.retryLane;
              e.retryLane = 0 !== n && n < t ? n : t;
            }
          }
          function gd(e, t) {
            hd(e, t), (e = e.alternate) && hd(e, t);
          }
          function vd(e) {
            if (13 === e.tag || 31 === e.tag) {
              var t = jr(e, 67108864);
              null !== t && Ks(t, 0, 67108864), gd(e, 67108864);
            }
          }
          function yd(e) {
            if (13 === e.tag || 31 === e.tag) {
              var t = Qs(),
                n = jr(e, t = Me(t));
              null !== n && Ks(n, 0, t), gd(e, t);
            }
          }
          var bd = !0;
          function wd(e, t, n, r) {
            var a = j.T;
            j.T = null;
            var l = R.p;
            try {
              R.p = 2, Sd(e, t, n, r);
            } finally {
              R.p = l, j.T = a;
            }
          }
          function kd(e, t, n, r) {
            var a = j.T;
            j.T = null;
            var l = R.p;
            try {
              R.p = 8, Sd(e, t, n, r);
            } finally {
              R.p = l, j.T = a;
            }
          }
          function Sd(e, t, n, r) {
            if (bd) {
              var a = _d(r);
              if (null === a) nf(e, t, r, xd, n), Fd(e, r);else if (function (e, t, n, r, a) {
                switch (t) {
                  case "focusin":
                    return Pd = Rd(Pd, e, t, n, r, a), !0;
                  case "dragenter":
                    return Ld = Rd(Ld, e, t, n, r, a), !0;
                  case "mouseover":
                    return Td = Rd(Td, e, t, n, r, a), !0;
                  case "pointerover":
                    var l = a.pointerId;
                    return Nd.set(l, Rd(Nd.get(l) || null, e, t, n, r, a)), !0;
                  case "gotpointercapture":
                    return l = a.pointerId, Od.set(l, Rd(Od.get(l) || null, e, t, n, r, a)), !0;
                }
                return !1;
              }(a, e, t, n, r)) r.stopPropagation();else if (Fd(e, r), 4 & t && -1 < jd.indexOf(e)) {
                for (; null !== a;) {
                  var l = Ze(a);
                  if (null !== l) switch (l.tag) {
                    case 3:
                      if ((l = l.stateNode).current.memoizedState.isDehydrated) {
                        var o = ze(l.pendingLanes);
                        if (0 !== o) {
                          var i = l;
                          for (i.pendingLanes |= 2, i.entangledLanes |= 2; o;) {
                            var u = 1 << 31 - ke(o);
                            i.entanglements[1] |= u, o &= ~u;
                          }
                          Rc(l), !(6 & ms) && (Fs = se() + 500, Mc(0, !1));
                        }
                      }
                      break;
                    case 31:
                    case 13:
                      null !== (i = jr(l, 2)) && Ks(i, 0, 2), ec(), gd(l, 2);
                  }
                  if (null === (l = _d(r)) && nf(e, t, r, xd, n), l === a) break;
                  a = l;
                }
                null !== a && r.stopPropagation();
              } else nf(e, t, r, null, n);
            }
          }
          function _d(e) {
            return Ed(e = Ft(e));
          }
          var xd = null;
          function Ed(e) {
            if (xd = null, null !== (e = Ye(e))) {
              var t = o(e);
              if (null === t) e = null;else {
                var n = t.tag;
                if (13 === n) {
                  if (null !== (e = i(t))) return e;
                  e = null;
                } else if (31 === n) {
                  if (null !== (e = u(t))) return e;
                  e = null;
                } else if (3 === n) {
                  if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
                  e = null;
                } else t !== e && (e = null);
              }
            }
            return xd = e, null;
          }
          function Cd(e) {
            switch (e) {
              case "beforetoggle":
              case "cancel":
              case "click":
              case "close":
              case "contextmenu":
              case "copy":
              case "cut":
              case "auxclick":
              case "dblclick":
              case "dragend":
              case "dragstart":
              case "drop":
              case "focusin":
              case "focusout":
              case "input":
              case "invalid":
              case "keydown":
              case "keypress":
              case "keyup":
              case "mousedown":
              case "mouseup":
              case "paste":
              case "pause":
              case "play":
              case "pointercancel":
              case "pointerdown":
              case "pointerup":
              case "ratechange":
              case "reset":
              case "resize":
              case "seeked":
              case "submit":
              case "toggle":
              case "touchcancel":
              case "touchend":
              case "touchstart":
              case "volumechange":
              case "change":
              case "selectionchange":
              case "textInput":
              case "compositionstart":
              case "compositionend":
              case "compositionupdate":
              case "beforeblur":
              case "afterblur":
              case "beforeinput":
              case "blur":
              case "fullscreenchange":
              case "focus":
              case "hashchange":
              case "popstate":
              case "select":
              case "selectstart":
                return 2;
              case "drag":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "mousemove":
              case "mouseout":
              case "mouseover":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "scroll":
              case "touchmove":
              case "wheel":
              case "mouseenter":
              case "mouseleave":
              case "pointerenter":
              case "pointerleave":
                return 8;
              case "message":
                switch (ce()) {
                  case fe:
                    return 2;
                  case de:
                    return 8;
                  case pe:
                  case me:
                    return 32;
                  case he:
                    return 268435456;
                  default:
                    return 32;
                }
              default:
                return 32;
            }
          }
          var zd = !1,
            Pd = null,
            Ld = null,
            Td = null,
            Nd = new Map(),
            Od = new Map(),
            Ad = [],
            jd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
          function Fd(e, t) {
            switch (e) {
              case "focusin":
              case "focusout":
                Pd = null;
                break;
              case "dragenter":
              case "dragleave":
                Ld = null;
                break;
              case "mouseover":
              case "mouseout":
                Td = null;
                break;
              case "pointerover":
              case "pointerout":
                Nd.delete(t.pointerId);
                break;
              case "gotpointercapture":
              case "lostpointercapture":
                Od.delete(t.pointerId);
            }
          }
          function Rd(e, t, n, r, a, l) {
            return null === e || e.nativeEvent !== l ? (e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: l,
              targetContainers: [a]
            }, null !== t && null !== (t = Ze(t)) && vd(t), e) : (e.eventSystemFlags |= r, t = e.targetContainers, null !== a && -1 === t.indexOf(a) && t.push(a), e);
          }
          function Md(e) {
            var t = Ye(e.target);
            if (null !== t) {
              var n = o(t);
              if (null !== n) if (13 === (t = n.tag)) {
                if (null !== (t = i(n))) return e.blockedOn = t, void Ve(e.priority, function () {
                  yd(n);
                });
              } else if (31 === t) {
                if (null !== (t = u(n))) return e.blockedOn = t, void Ve(e.priority, function () {
                  yd(n);
                });
              } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated) return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
            }
            e.blockedOn = null;
          }
          function Dd(e) {
            if (null !== e.blockedOn) return !1;
            for (var t = e.targetContainers; 0 < t.length;) {
              var n = _d(e.nativeEvent);
              if (null !== n) return null !== (t = Ze(n)) && vd(t), e.blockedOn = n, !1;
              var r = new (n = e.nativeEvent).constructor(n.type, n);
              jt = r, n.target.dispatchEvent(r), jt = null, t.shift();
            }
            return !0;
          }
          function Id(e, t, n) {
            Dd(e) && n.delete(t);
          }
          function Vd() {
            zd = !1, null !== Pd && Dd(Pd) && (Pd = null), null !== Ld && Dd(Ld) && (Ld = null), null !== Td && Dd(Td) && (Td = null), Nd.forEach(Id), Od.forEach(Id);
          }
          function Bd(e, n) {
            e.blockedOn === n && (e.blockedOn = null, zd || (zd = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Vd)));
          }
          var Hd = null;
          function Ud(e) {
            Hd !== e && (Hd = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function () {
              Hd === e && (Hd = null);
              for (var t = 0; t < e.length; t += 3) {
                var n = e[t],
                  r = e[t + 1],
                  a = e[t + 2];
                if ("function" != typeof r) {
                  if (null === Ed(r || n)) continue;
                  break;
                }
                var l = Ze(n);
                null !== l && (e.splice(t, 3), t -= 3, ni(l, {
                  pending: !0,
                  data: a,
                  method: n.method,
                  action: r
                }, r, a));
              }
            }));
          }
          function Wd(e) {
            function t(t) {
              return Bd(t, e);
            }
            null !== Pd && Bd(Pd, e), null !== Ld && Bd(Ld, e), null !== Td && Bd(Td, e), Nd.forEach(t), Od.forEach(t);
            for (var n = 0; n < Ad.length; n++) {
              var r = Ad[n];
              r.blockedOn === e && (r.blockedOn = null);
            }
            for (; 0 < Ad.length && null === (n = Ad[0]).blockedOn;) Md(n), null === n.blockedOn && Ad.shift();
            if (null != (n = (e.ownerDocument || e).$$reactFormReplay)) for (r = 0; r < n.length; r += 3) {
              var a = n[r],
                l = n[r + 1],
                o = a[Ue] || null;
              if ("function" == typeof l) o || Ud(n);else if (o) {
                var i = null;
                if (l && l.hasAttribute("formAction")) {
                  if (a = l, o = l[Ue] || null) i = o.formAction;else if (null !== Ed(a)) continue;
                } else i = o.action;
                "function" == typeof i ? n[r + 1] = i : (n.splice(r, 3), r -= 3), Ud(n);
              }
            }
          }
          function $d() {
            function e(e) {
              e.canIntercept && "react-transition" === e.info && e.intercept({
                handler: function () {
                  return new Promise(function (e) {
                    return l = e;
                  });
                },
                focusReset: "manual",
                scroll: "manual"
              });
            }
            function t() {
              null !== l && (l(), l = null), a || setTimeout(r, 20);
            }
            function r() {
              if (!a && !navigation.transition) {
                var e = navigation.currentEntry;
                e && null != e.url && navigation.navigate(e.url, {
                  state: e.getState(),
                  info: "react-transition",
                  history: "replace"
                });
              }
            }
            if ("object" === ("undefined" == typeof navigation ? "undefined" : n(navigation))) {
              var a = !1,
                l = null;
              return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(r, 100), function () {
                a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), null !== l && (l(), l = null);
              };
            }
          }
          function qd(e) {
            this._internalRoot = e;
          }
          function Qd(e) {
            this._internalRoot = e;
          }
          Qd.prototype.render = qd.prototype.render = function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(l(409));
            md(t.current, Qs(), e, t, null, null);
          }, Qd.prototype.unmount = qd.prototype.unmount = function () {
            var e = this._internalRoot;
            if (null !== e) {
              this._internalRoot = null;
              var t = e.containerInfo;
              md(e.current, 2, null, e, null, null), ec(), t[We] = null;
            }
          }, Qd.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = Ie();
              e = {
                blockedOn: null,
                target: e,
                priority: t
              };
              for (var n = 0; n < Ad.length && 0 !== t && t < Ad[n].priority; n++);
              Ad.splice(n, 0, e), 0 === n && Md(e);
            }
          };
          var Xd = r.version;
          if ("19.2.5" !== Xd) throw Error(l(527, Xd, "19.2.5"));
          R.findDOMNode = function (e) {
            var t = e._reactInternals;
            if (void 0 === t) {
              if ("function" == typeof e.render) throw Error(l(188));
              throw e = Object.keys(e).join(","), Error(l(268, e));
            }
            return e = function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = o(e))) throw Error(l(188));
                return t !== e ? null : e;
              }
              for (var n = e, r = t;;) {
                var a = n.return;
                if (null === a) break;
                var i = a.alternate;
                if (null === i) {
                  if (null !== (r = a.return)) {
                    n = r;
                    continue;
                  }
                  break;
                }
                if (a.child === i.child) {
                  for (i = a.child; i;) {
                    if (i === n) return s(a), e;
                    if (i === r) return s(a), t;
                    i = i.sibling;
                  }
                  throw Error(l(188));
                }
                if (n.return !== r.return) n = a, r = i;else {
                  for (var u = !1, c = a.child; c;) {
                    if (c === n) {
                      u = !0, n = a, r = i;
                      break;
                    }
                    if (c === r) {
                      u = !0, r = a, n = i;
                      break;
                    }
                    c = c.sibling;
                  }
                  if (!u) {
                    for (c = i.child; c;) {
                      if (c === n) {
                        u = !0, n = i, r = a;
                        break;
                      }
                      if (c === r) {
                        u = !0, r = i, n = a;
                        break;
                      }
                      c = c.sibling;
                    }
                    if (!u) throw Error(l(189));
                  }
                }
                if (n.alternate !== r) throw Error(l(190));
              }
              if (3 !== n.tag) throw Error(l(188));
              return n.stateNode.current === n ? e : t;
            }(t), e = null === (e = null !== e ? c(e) : null) ? null : e.stateNode;
          };
          var Kd = {
            bundleType: 0,
            version: "19.2.5",
            rendererPackageName: "react-dom",
            currentDispatcherRef: j,
            reconcilerVersion: "19.2.5"
          };
          if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
            var Gd = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (!Gd.isDisabled && Gd.supportsFiber) try {
              ye = Gd.inject(Kd), be = Gd;
            } catch (Zd) {}
          }
          e.createRoot = function (e, t) {
            if (!(n = e) || 1 !== n.nodeType && 9 !== n.nodeType && 11 !== n.nodeType) throw Error(l(299));
            var n,
              r = !1,
              a = "",
              o = Ei,
              i = Ci,
              u = zi;
            return null != t && (!0 === t.unstable_strictMode && (r = !0), void 0 !== t.identifierPrefix && (a = t.identifierPrefix), void 0 !== t.onUncaughtError && (o = t.onUncaughtError), void 0 !== t.onCaughtError && (i = t.onCaughtError), void 0 !== t.onRecoverableError && (u = t.onRecoverableError)), t = function (e, t, n, r, a, l, o, i, u, s, c, f) {
              return e = new pd(e, t, n, o, u, s, c, f, i), t = 1, !0 === l && (t |= 24), l = Ir(3, null, null, t), e.current = l, l.stateNode = e, (t = Va()).refCount++, e.pooledCache = t, t.refCount++, l.memoizedState = {
                element: r,
                isDehydrated: n,
                cache: t
              }, vl(l), e;
            }(e, 1, !1, null, 0, r, a, null, o, i, u, $d), e[We] = t.current, ef(e), new qd(t);
          };
        }), M = v(function (e, t) {
          !function e() {
            if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
          }(), t.exports = R();
        })(), D = Wt, Wt.range = qt, I = "--", V = "var", B = "undefined" != typeof window, H = B && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)"), U = {
          group: 0,
          job: 0
        }, W = {
          rootElement: B ? document : null,
          shadowDOM: !1,
          include: "style,link[rel=stylesheet]",
          exclude: "",
          variables: {},
          onlyLegacy: !0,
          preserveStatic: !0,
          preserveVars: !1,
          silent: !1,
          updateDOM: !0,
          updateURLs: !0,
          watch: null,
          onBeforeSend: function () {},
          onError: function () {},
          onWarning: function () {},
          onSuccess: function () {},
          onComplete: function () {},
          onFinally: function () {}
        }, $ = {
          cssComments: /\/\*[\s\S]+?\*\//g,
          cssKeyframes: /@(?:-\w*-)?keyframes/,
          cssMediaQueries: /@media[^{]+\{([\s\S]+?})\s*}/g,
          cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
          cssVarDeclRules: /(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,
          cssVarDecls: /(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,
          cssVarFunc: /var\(\s*--[\w-]/,
          cssVars: /(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
        }, q = {
          dom: {},
          job: {},
          user: {}
        }, Q = !1, X = null, K = 0, G = null, Y = !1, en.reset = function () {
          for (var e in U.job = 0, U.group = 0, Q = !1, X && (X.disconnect(), X = null), K = 0, G = null, Y = !1, q) q[e] = {};
        }, Z = [], J = function () {
          return Z.some(function (e) {
            return e.activeTargets.length > 0;
          });
        }, ee = function () {
          return Z.some(function (e) {
            return e.skippedTargets.length > 0;
          });
        }, te = "ResizeObserver loop completed with undelivered notifications.", ne = function () {
          var e;
          "function" == typeof ErrorEvent ? e = new ErrorEvent("error", {
            message: te
          }) : ((e = document.createEvent("Event")).initEvent("error", !1, !1), e.message = te), window.dispatchEvent(e);
        }, function (e) {
          e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
        }(re || (re = {})), ae = function (e) {
          return Object.freeze(e);
        }, le = function (e, t) {
          this.inlineSize = e, this.blockSize = t, ae(this);
        }, oe = function () {
          function e(e, t, n, r) {
            return this.x = e, this.y = t, this.width = n, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, ae(this);
          }
          return e.prototype.toJSON = function () {
            var e = this;
            return {
              x: e.x,
              y: e.y,
              top: e.top,
              right: e.right,
              bottom: e.bottom,
              left: e.left,
              width: e.width,
              height: e.height
            };
          }, e.fromRect = function (t) {
            return new e(t.x, t.y, t.width, t.height);
          }, e;
        }(), ie = function (e) {
          return e instanceof SVGElement && "getBBox" in e;
        }, ue = function (e) {
          if (ie(e)) {
            var t = e.getBBox(),
              n = t.width,
              r = t.height;
            return !n && !r;
          }
          var a = e,
            l = a.offsetWidth,
            o = a.offsetHeight;
          return !(l || o || e.getClientRects().length);
        }, se = function (e) {
          var t;
          if (e instanceof Element) return !0;
          var n = null === (t = null == e ? void 0 : e.ownerDocument) || void 0 === t ? void 0 : t.defaultView;
          return !!(n && e instanceof n.Element);
        }, ce = function (e) {
          switch (e.tagName) {
            case "INPUT":
              if ("image" !== e.type) break;
            case "VIDEO":
            case "AUDIO":
            case "EMBED":
            case "OBJECT":
            case "CANVAS":
            case "IFRAME":
            case "IMG":
              return !0;
          }
          return !1;
        }, fe = "undefined" != typeof window ? window : {}, de = new WeakMap(), pe = /auto|scroll/, me = /^tb|vertical/, he = /msie|trident/i.test(fe.navigator && fe.navigator.userAgent), ge = function (e) {
          return parseFloat(e || "0");
        }, ye = ae({
          devicePixelContentBoxSize: (ve = function (e, t, n) {
            return void 0 === e && (e = 0), void 0 === t && (t = 0), void 0 === n && (n = !1), new le((n ? t : e) || 0, (n ? e : t) || 0);
          })(),
          borderBoxSize: ve(),
          contentBoxSize: ve(),
          contentRect: new oe(0, 0, 0, 0)
        }), be = function (e, t) {
          if (void 0 === t && (t = !1), de.has(e) && !t) return de.get(e);
          if (ue(e)) return de.set(e, ye), ye;
          var n = getComputedStyle(e),
            r = ie(e) && e.ownerSVGElement && e.getBBox(),
            a = !he && "border-box" === n.boxSizing,
            l = me.test(n.writingMode || ""),
            o = !r && pe.test(n.overflowY || ""),
            i = !r && pe.test(n.overflowX || ""),
            u = r ? 0 : ge(n.paddingTop),
            s = r ? 0 : ge(n.paddingRight),
            c = r ? 0 : ge(n.paddingBottom),
            f = r ? 0 : ge(n.paddingLeft),
            d = r ? 0 : ge(n.borderTopWidth),
            p = r ? 0 : ge(n.borderRightWidth),
            m = r ? 0 : ge(n.borderBottomWidth),
            h = f + s,
            g = u + c,
            v = (r ? 0 : ge(n.borderLeftWidth)) + p,
            y = d + m,
            b = i ? e.offsetHeight - y - e.clientHeight : 0,
            w = o ? e.offsetWidth - v - e.clientWidth : 0,
            k = a ? h + v : 0,
            S = a ? g + y : 0,
            _ = r ? r.width : ge(n.width) - k - w,
            x = r ? r.height : ge(n.height) - S - b,
            E = _ + h + w + v,
            C = x + g + b + y,
            z = ae({
              devicePixelContentBoxSize: ve(Math.round(_ * devicePixelRatio), Math.round(x * devicePixelRatio), l),
              borderBoxSize: ve(E, C, l),
              contentBoxSize: ve(_, x, l),
              contentRect: new oe(f, u, _, x)
            });
          return de.set(e, z), z;
        }, we = function (e, t, n) {
          var r = be(e, n),
            a = r.borderBoxSize,
            l = r.contentBoxSize,
            o = r.devicePixelContentBoxSize;
          switch (t) {
            case re.DEVICE_PIXEL_CONTENT_BOX:
              return o;
            case re.BORDER_BOX:
              return a;
            default:
              return l;
          }
        }, ke = function (e) {
          var t = be(e);
          this.target = e, this.contentRect = t.contentRect, this.borderBoxSize = ae([t.borderBoxSize]), this.contentBoxSize = ae([t.contentBoxSize]), this.devicePixelContentBoxSize = ae([t.devicePixelContentBoxSize]);
        }, Se = function (e) {
          if (ue(e)) return 1 / 0;
          for (var t = 0, n = e.parentNode; n;) t += 1, n = n.parentNode;
          return t;
        }, _e = function () {
          var e = 1 / 0,
            t = [];
          Z.forEach(function (n) {
            if (0 !== n.activeTargets.length) {
              var r = [];
              n.activeTargets.forEach(function (t) {
                var n = new ke(t.target),
                  a = Se(t.target);
                r.push(n), t.lastReportedSize = we(t.target, t.observedBox), a < e && (e = a);
              }), t.push(function () {
                n.callback.call(n.observer, r, n.observer);
              }), n.activeTargets.splice(0, n.activeTargets.length);
            }
          });
          for (var n = 0, r = t; n < r.length; n++) {
            (0, r[n])();
          }
          return e;
        }, xe = function (e) {
          Z.forEach(function (t) {
            t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function (n) {
              n.isActive() && (Se(n.target) > e ? t.activeTargets.push(n) : t.skippedTargets.push(n));
            });
          });
        }, Ee = function () {
          var e = 0;
          for (xe(e); J();) e = _e(), xe(e);
          return ee() && ne(), e > 0;
        }, ze = [], Pe = function () {
          return ze.splice(0).forEach(function (e) {
            return e();
          });
        }, Le = function (e) {
          if (!Ce) {
            var t = 0,
              n = document.createTextNode("");
            new MutationObserver(function () {
              return Pe();
            }).observe(n, {
              characterData: !0
            }), Ce = function () {
              n.textContent = "".concat(t ? t-- : t++);
            };
          }
          ze.push(e), Ce();
        }, Te = function (e) {
          Le(function () {
            requestAnimationFrame(e);
          });
        }, Ne = 0, Oe = function () {
          return !!Ne;
        }, Ae = {
          attributes: !0,
          characterData: !0,
          childList: !0,
          subtree: !0
        }, je = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"], Fe = function (e) {
          return void 0 === e && (e = 0), Date.now() + e;
        }, Re = !1, Me = new (function () {
          function e() {
            var e = this;
            this.stopped = !0, this.listener = function () {
              return e.schedule();
            };
          }
          return e.prototype.run = function (e) {
            var t = this;
            if (void 0 === e && (e = 250), !Re) {
              Re = !0;
              var n = Fe(e);
              Te(function () {
                var r = !1;
                try {
                  r = Ee();
                } finally {
                  if (Re = !1, e = n - Fe(), !Oe()) return;
                  r ? t.run(1e3) : e > 0 ? t.run(e) : t.start();
                }
              });
            }
          }, e.prototype.schedule = function () {
            this.stop(), this.run();
          }, e.prototype.observe = function () {
            var e = this,
              t = function () {
                return e.observer && e.observer.observe(document.body, Ae);
              };
            document.body ? t() : fe.addEventListener("DOMContentLoaded", t);
          }, e.prototype.start = function () {
            var e = this;
            this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), je.forEach(function (t) {
              return fe.addEventListener(t, e.listener, !0);
            }));
          }, e.prototype.stop = function () {
            var e = this;
            this.stopped || (this.observer && this.observer.disconnect(), je.forEach(function (t) {
              return fe.removeEventListener(t, e.listener, !0);
            }), this.stopped = !0);
          }, e;
        }())(), De = function (e) {
          !Ne && e > 0 && Me.start(), !(Ne += e) && Me.stop();
        }, Ie = function (e) {
          return !ie(e) && !ce(e) && "inline" === getComputedStyle(e).display;
        }, Ve = function () {
          function e(e, t) {
            this.target = e, this.observedBox = t || re.CONTENT_BOX, this.lastReportedSize = {
              inlineSize: 0,
              blockSize: 0
            };
          }
          return e.prototype.isActive = function () {
            var e = we(this.target, this.observedBox, !0);
            return Ie(this.target) && (this.lastReportedSize = e), this.lastReportedSize.inlineSize !== e.inlineSize || this.lastReportedSize.blockSize !== e.blockSize;
          }, e;
        }(), Be = function (e, t) {
          this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = e, this.callback = t;
        }, He = new WeakMap(), Ue = function (e, t) {
          for (var n = 0; n < e.length; n += 1) if (e[n].target === t) return n;
          return -1;
        }, We = function () {
          function e() {}
          return e.connect = function (e, t) {
            var n = new Be(e, t);
            He.set(e, n);
          }, e.observe = function (e, t, n) {
            var r = He.get(e),
              a = 0 === r.observationTargets.length;
            Ue(r.observationTargets, t) < 0 && (a && Z.push(r), r.observationTargets.push(new Ve(t, n && n.box)), De(1), Me.schedule());
          }, e.unobserve = function (e, t) {
            var n = He.get(e),
              r = Ue(n.observationTargets, t),
              a = 1 === n.observationTargets.length;
            r >= 0 && (a && Z.splice(Z.indexOf(n), 1), n.observationTargets.splice(r, 1), De(-1));
          }, e.disconnect = function (e) {
            var t = this,
              n = He.get(e);
            n.observationTargets.slice().forEach(function (n) {
              return t.unobserve(e, n.target);
            }), n.activeTargets.splice(0, n.activeTargets.length);
          }, e;
        }(), $e = function () {
          function e(e) {
            if (0 === arguments.length) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if ("function" != typeof e) throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            We.connect(this, e);
          }
          return e.prototype.observe = function (e, t) {
            if (0 === arguments.length) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!se(e)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            We.observe(this, e, t);
          }, e.prototype.unobserve = function (e) {
            if (0 === arguments.length) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!se(e)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            We.unobserve(this, e);
          }, e.prototype.disconnect = function () {
            We.disconnect(this);
          }, e.toString = function () {
            return "function ResizeObserver () { [polyfill code] }";
          }, e;
        }(), qe = i(x(), 1), Qe = i(F(), 1), u(), Xe = {
          Back: ["Backspace", "Escape", "XF86Back", "GoBack", "10009", "461"],
          Enter: ["Enter", "Return", "13"],
          Play: ["MediaPlay", "XF86AudioPlay", "415"],
          Pause: ["MediaPause", "XF86AudioPause", "19"],
          PlayPause: [" ", "MediaPlayPause", "10252"],
          Stop: ["MediaStop", "XF86AudioStop", "413"],
          Forward: ["MediaFastForward", "XF86AudioFastForward", "417"],
          Rewind: ["MediaRewind", "XF86AudioRewind", "412"],
          ChannelUp: ["ChannelUp", "XF86RaiseChannel", "427"],
          ChannelDown: ["ChannelDown", "XF86LowerChannel", "428"],
          ColorRed: ["ColorF0Red", "403"],
          ColorGreen: ["ColorF1Green", "404"],
          ColorYellow: ["ColorF2Yellow", "405"],
          ColorBlue: ["ColorF3Blue", "406"]
        }, Ke = null, Ge = ["/live", "/home", "/buscar", "/programas", "/mi-lista"], t("s", Ye = "SIDEBAR"), Ze = [{
          id: "live",
          title: "En vivo",
          path: "/live",
          icon: "live"
        }, {
          id: "home",
          title: "Inicio",
          path: "/home",
          icon: "home"
        }, {
          id: "search",
          title: "Buscar",
          path: "/buscar",
          icon: "search"
        }, {
          id: "programs",
          title: "On Demand",
          path: "/programas",
          icon: "programs"
        }], Je = [{
          id: "my-list",
          title: "Mi lista",
          path: "/mi-lista",
          icon: "list"
        }], et = {
          id: "login",
          title: "Mi Latina",
          path: "/auth/login",
          icon: "login"
        }, tt = "CONTENT", nt = {
          register: (m = c(e().m(function t(n) {
            var r, a;
            return e().w(function (e) {
              for (;;) switch (e.n) {
                case 0:
                  return e.n = 1, z.post(b, {
                    device: "web",
                    name: n.name,
                    email: n.email,
                    password: n.password
                  });
                case 1:
                  return r = e.v, a = r.data, e.a(2, a);
              }
            }, t);
          })), function (e) {
            return m.apply(this, arguments);
          }),
          login: (p = c(e().m(function t(n) {
            var r, a;
            return e().w(function (e) {
              for (;;) switch (e.n) {
                case 0:
                  return e.n = 1, z.post(C, {
                    device: "web",
                    email: n.email,
                    password: n.password
                  });
                case 1:
                  return r = e.v, a = r.data, e.a(2, a);
              }
            }, t);
          })), function (e) {
            return p.apply(this, arguments);
          }),
          validateSession: (l = c(e().m(function t(n) {
            var r, a;
            return e().w(function (e) {
              for (;;) switch (e.n) {
                case 0:
                  return e.n = 1, z.post(s, {
                    device: "web",
                    token: n
                  });
                case 1:
                  return r = e.v, a = r.data, e.a(2, a);
              }
            }, t);
          })), function (e) {
            return l.apply(this, arguments);
          })
        }, rt = localStorage.getItem("auth_token"), at = localStorage.getItem("auth_user"), lt = localStorage.getItem("active_profile"), ot = {
          user: at ? JSON.parse(at) : null,
          token: rt,
          activeProfile: lt ? JSON.parse(lt) : null,
          isAuthenticated: !!rt,
          isValidating: !1
        }, it = new Set(), ut = {
          login: function (e, t) {
            var n = d({
              token: e
            }, t);
            localStorage.setItem("auth_token", e), localStorage.setItem("auth_user", JSON.stringify(n)), fn({
              user: n,
              token: e,
              isAuthenticated: !0
            });
          },
          logout: function () {
            localStorage.removeItem("auth_token"), localStorage.removeItem("auth_user"), localStorage.removeItem("active_profile"), fn({
              user: null,
              token: null,
              activeProfile: null,
              isAuthenticated: !1
            });
          },
          setActiveProfile: function (e) {
            localStorage.setItem("active_profile", JSON.stringify(e)), fn({
              activeProfile: e
            });
          },
          validateSession: (h = c(e().m(function t() {
            var n, r, a, l, o;
            return e().w(function (e) {
              for (;;) switch (e.p = e.n) {
                case 0:
                  if (n = ot.token) {
                    e.n = 1;
                    break;
                  }
                  return fn({
                    isAuthenticated: !1,
                    user: null,
                    token: null
                  }), e.a(2);
                case 1:
                  return fn({
                    isValidating: !0
                  }), e.p = 2, e.n = 3, nt.validateSession(n);
                case 3:
                  if ("error" !== (a = e.v).status) {
                    e.n = 4;
                    break;
                  }
                  return console.warn("[Auth] Session invalid, logging out"), ut.logout(), e.a(2);
                case 4:
                  l = d(d({}, a.user), {}, {
                    token: (null === (r = a.user) || void 0 === r ? void 0 : r.token) || n
                  }), localStorage.setItem("auth_user", JSON.stringify(l)), fn({
                    user: l,
                    token: l.token,
                    isAuthenticated: !0
                  }), e.n = 6;
                  break;
                case 5:
                  e.p = 5, o = e.v, console.warn("[Auth] Session validation failed, logging out", o), ut.logout();
                case 6:
                  return e.p = 6, fn({
                    isValidating: !1
                  }), e.f(6);
                case 7:
                  return e.a(2);
              }
            }, t, null, [[2, 5, 6, 7]]);
          })), function () {
            return h.apply(this, arguments);
          })
        }, mn.getState = dn, st = {
          config: null
        }, ct = new Set(), ft = {
          setConfig: function (e) {
            return t = {
              config: e
            }, st = d(d({}, st), t), void ct.forEach(function (e) {
              return e();
            });
            var t;
          }
        }, vn.getState = hn, dt = L(), pt = {
          home: yn,
          search: bn,
          programs: wn,
          live: kn,
          list: Sn,
          account: _n,
          login: _n
        }, mt = {
          item: "_item_chu3s_6",
          itemInner: "_itemInner_chu3s_19",
          active: "_active_chu3s_32",
          focused: "_focused_chu3s_37",
          iconWrapper: "_iconWrapper_chu3s_43",
          label: "_label_chu3s_63",
          expanded: "_expanded_chu3s_75"
        }, t("i", "data:image/svg+xml,%3csvg%20width='51'%20height='77'%20viewBox='0%200%2051%2077'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1449_856)'%3e%3cpath%20d='M51.0001%2035.2505H22.2632V40.9285H51.0001V35.2505Z'%20fill='%23FF1376'/%3e%3cpath%20d='M36.6268%2077C44.5503%2077%2050.9952%2070.5275%2050.9952%2062.57V60.6611H45.3414V62.57C45.3414%2067.3953%2041.4315%2071.322%2036.6268%2071.322C31.822%2071.322%2027.9121%2067.3953%2027.9121%2062.57V60.6611H22.2583V62.57C22.2583%2070.5275%2028.7033%2077%2036.6268%2077Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9954%2048.1399H39.4346V53.8179H50.9954V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M33.824%2048.1399H22.2632V53.8179H33.824V48.1399Z'%20fill='%23FF1376'/%3e%3cpath%20d='M50.9931%2040.9261V35.2504L33.8242%2022.2544V28.7028L49.9776%2040.9261H50.9931Z'%20fill='%23FF1376'/%3e%3cpath%20d='M0%200V28.8505L17.1713%2040.9381V28.8505H28.7297V0H0ZM20.3165%2022.2544H16.3463V16.8597C16.3463%2016.4261%2016.2185%2016.087%2015.9604%2015.8399C15.7023%2015.5928%2015.3574%2015.4693%2014.9281%2015.4693C14.4987%2015.4693%2014.1369%2015.5928%2013.8861%2015.8399C13.6352%2016.087%2013.5098%2016.4261%2013.5098%2016.8597V22.2544H9.53959V16.8597C9.53959%2016.4261%209.41175%2016.087%209.15366%2015.8399C8.89557%2015.5928%208.55306%2015.4693%208.12131%2015.4693C7.68956%2015.4693%207.33016%2015.5928%207.07931%2015.8399C6.82846%2016.087%206.70304%2016.4261%206.70304%2016.8597V22.2544H2.71354V12.0804H6.70062V13.4514C6.98766%2013.0178%207.38082%2012.669%207.8777%2012.405C8.37457%2012.1409%208.95829%2012.0077%209.62883%2012.0077C10.3597%2012.0077%2011.0061%2012.1676%2011.5681%2012.4849C12.1301%2012.8047%2012.5812%2013.2504%2012.9164%2013.8293C13.2879%2013.3013%2013.7606%2012.8652%2014.3347%2012.5213C14.9088%2012.1773%2015.5431%2012.0077%2016.2378%2012.0077C17.5306%2012.0077%2018.5341%2012.3977%2019.2456%2013.1801C19.9572%2013.9626%2020.3141%2015.0211%2020.3141%2016.3559V22.2544H20.3165ZM26.0162%209.939H22.0411L26.0162%2012.2112V22.2544H22.0411V7.16296H26.0162V9.939Z'%20fill='%23FAE24B'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1449_856'%3e%3crect%20width='51'%20height='77'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"), ht = {
          container: "_container_1n295_5",
          backdrop: "_backdrop_1n295_21",
          expanded: "_expanded_1n295_35",
          logo: "_logo_1n295_44",
          spacer: "_spacer_1n295_54",
          navList: "_navList_1n295_59",
          profileItem: "_profileItem_1n295_72",
          profileItemInner: "_profileItemInner_1n295_84",
          profileItemFocused: "_profileItemFocused_1n295_96",
          profileAvatar: "_profileAvatar_1n295_102",
          profileAvatarImg: "_profileAvatarImg_1n295_114",
          profileAvatarInitial: "_profileAvatarInitial_1n295_120",
          profileLabel: "_profileLabel_1n295_128",
          profileItemExpanded: "_profileItemExpanded_1n295_138"
        }, gt = {
          overlay: "_overlay_7m30n_1",
          hidden: "_hidden_7m30n_14",
          content: "_content_7m30n_19",
          title: "_title_7m30n_25",
          buttons: "_buttons_7m30n_33",
          btn: "_btn_7m30n_40",
          focused: "_focused_7m30n_53"
        }, vt = {
          layout: "_layout_1em8t_1",
          content: "_content_1em8t_8"
        }, yt = {
          container: "_container_1wdi1_1",
          track: "_track_1wdi1_10",
          spinner: "_spinner_1wdi1_17",
          spin: "_spin_1wdi1_17"
        }, bt = {
          overlay: "_overlay_ekis2_1"
        }, wt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./HomeView-legacy.js");
          }, void 0, a.meta.url);
        }), kt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./SearchView-legacy.js");
          }, void 0, a.meta.url);
        }), St = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./ProgramsView-legacy.js");
          }, void 0, a.meta.url);
        }), _t = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./Program-legacy.js");
          }, void 0, a.meta.url);
        }), xt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./PlayerViewAlt-legacy.js");
          }, void 0, a.meta.url);
        }), Et = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./LoginView-legacy.js");
          }, void 0, a.meta.url);
        }), Ct = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./RegisterView-legacy.js");
          }, void 0, a.meta.url);
        }), zt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./WhoIsThereView-legacy.js");
          }, void 0, a.meta.url);
        }), Pt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./ProfilesView-legacy.js");
          }, void 0, a.meta.url);
        }), Lt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./EditProfileView-legacy.js");
          }, void 0, a.meta.url);
        }), Tt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./AvatarSelectView-legacy.js");
          }, void 0, a.meta.url);
        }), Nt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./MyListView-legacy.js");
          }, void 0, a.meta.url);
        }), Ot = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./AccountInfoView-legacy.js");
          }, void 0, a.meta.url);
        }), At = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./CategoryView-legacy.js");
          }, void 0, a.meta.url);
        }), jt = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./LiveView-legacy.js");
          }, void 0, a.meta.url);
        }), Ft = (0, qe.lazy)(function () {
          return f(function () {
            return a.import("./EventView-legacy.js");
          }, void 0, a.meta.url);
        }), Rt = function (e) {
          var t = e.children;
          return (0, dt.jsx)(qe.Suspense, {
            fallback: (0, dt.jsx)(jn, {}),
            children: t
          });
        }, Mt = k([{
          path: "auth/register",
          element: (0, dt.jsx)(Rt, {
            children: (0, dt.jsx)(Ct, {})
          })
        }, {
          path: "auth/login",
          element: (0, dt.jsx)(Rt, {
            children: (0, dt.jsx)(Et, {})
          })
        }, {
          element: (0, dt.jsx)(On, {}),
          children: [{
            path: "whoisthere",
            element: (0, dt.jsx)(Rt, {
              children: (0, dt.jsx)(zt, {})
            })
          }]
        }, {
          id: "root",
          element: (0, dt.jsx)(Nn, {}),
          children: [{
            index: !0,
            element: (0, dt.jsx)(g, {
              to: "/whoisthere",
              replace: !0
            })
          }, {
            path: "play/:program/:segment/:season/:chapter",
            element: (0, dt.jsx)(Rt, {
              children: (0, dt.jsx)(xt, {})
            })
          }, {
            element: (0, dt.jsx)(On, {}),
            children: [{
              path: "home",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(wt, {})
              })
            }, {
              path: "buscar",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(kt, {})
              })
            }, {
              path: "programas",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(St, {})
              })
            }, {
              path: "programas/:slug",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(_t, {})
              })
            }, {
              path: "categoria/:slug",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(At, {})
              })
            }, {
              path: "eventos/:slug",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(Ft, {})
              })
            }, {
              path: "live",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(jt, {})
              })
            }, {
              path: "mi-lista",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(Nt, {})
              })
            }, {
              path: "mi-latina/cuenta",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(Ot, {})
              })
            }, {
              path: "mi-latina",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(Pt, {})
              })
            }, {
              path: "mi-latina/nuevo",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(Lt, {})
              })
            }, {
              path: "mi-latina/:id",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(Lt, {})
              })
            }, {
              path: "mi-latina/avatar",
              element: (0, dt.jsx)(Rt, {
                children: (0, dt.jsx)(Tt, {})
              })
            }]
          }]
        }]), Dt = function () {
          var t = c(e().m(function t() {
            var n, r;
            return e().w(function (e) {
              for (;;) switch (e.n) {
                case 0:
                  return e.n = 1, z.post(E, {});
                case 1:
                  return n = e.v, r = n.data, e.a(2, r);
              }
            }, t);
          }));
          return function () {
            return t.apply(this, arguments);
          };
        }(), It = function () {
          var e = vn(function (e) {
              return e.setConfig;
            }),
            t = (0, qe.useRef)(!1),
            n = Fn(function () {
              return Dt();
            }, []);
          return (0, qe.useEffect)(function () {
            var r;
            if (null !== (r = n.data) && void 0 !== r && r.data) {
              var a = n.data.data;
              e(a), function () {
                if ("tizen" === on()) try {
                  ["MediaPlay", "MediaPause", "MediaPlayPause", "MediaStop", "MediaFastForward", "MediaRewind", "ChannelUp", "ChannelDown", "ColorF0Red", "ColorF1Green", "ColorF2Yellow", "ColorF3Blue"].forEach(function (e) {
                    var t;
                    null === (t = tizen.tvinputdevice) || void 0 === t || t.registerKey(e);
                  });
                } catch (e) {}
              }(), a.name && (document.title = a.name);
              var l = document.documentElement;
              if (Object.entries(a).forEach(function (e) {
                var t = o(e, 2),
                  n = t[0],
                  r = t[1];
                (n.startsWith("clr-") || n.startsWith("foc-") || n.startsWith("grad-")) && l.style.setProperty("--".concat(n), r);
              }), !t.current) {
                t.current = !0;
                var i = mn.getState(),
                  u = i.token,
                  s = i.validateSession;
                u && s();
              }
            }
          }, [n.data, e]), n;
        }, void 0 === window.ResizeObserver && (window.ResizeObserver = $e), en({
          watch: !0,
          silent: !0
        }), _({
          debug: !1,
          visualDebug: !1,
          throttle: 0
        }), (0, M.createRoot)(document.getElementById("root")).render((0, dt.jsx)(Rn, {}));
      }
    };
  });
}();