!function () {
  function e(t) {
    return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, e(t);
  }
  function t(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != n) {
        var r,
          i,
          o,
          a,
          l = [],
          u = !0,
          s = !1;
        try {
          if (o = (n = n.call(e)).next, 0 === t) {
            if (Object(n) !== n) return;
            u = !1;
          } else for (; !(u = (r = o.call(n)).done) && (l.push(r.value), l.length !== t); u = !0);
        } catch (e) {
          s = !0, i = e;
        } finally {
          try {
            if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return;
          } finally {
            if (s) throw i;
          }
        }
        return l;
      }
    }(e, t) || s(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, o(r.key), r);
    }
  }
  function i(e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function o(t) {
    var n = function (t, n) {
      if ("object" != e(t) || !t) return t;
      var r = t[Symbol.toPrimitive];
      if (void 0 !== r) {
        var i = r.call(t, n || "default");
        if ("object" != e(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === n ? String : Number)(t);
    }(t, "string");
    return "symbol" == e(n) ? n : n + "";
  }
  function a(e, t) {
    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (!n) {
      if (Array.isArray(e) || (n = function (e, t) {
        if (e) {
          if ("string" == typeof e) return l(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0;
        }
      }(e)) || t && e && "number" == typeof e.length) {
        n && (e = n);
        var r = 0,
          i = function () {};
        return {
          s: i,
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
          f: i
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        n = n.call(e);
      },
      n: function () {
        var e = n.next();
        return a = e.done, e;
      },
      e: function (e) {
        u = !0, o = e;
      },
      f: function () {
        try {
          a || null == n.return || n.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function l(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function u(e) {
    return function (e) {
      if (Array.isArray(e)) return c(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
    }(e) || s(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function s(e, t) {
    if (e) {
      if ("string" == typeof e) return c(e, t);
      var n = {}.toString.call(e).slice(8, -1);
      return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? c(e, t) : void 0;
    }
  }
  function c(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  System.register(["./jsx-runtime-legacy.js"], function (e, r) {
    var o, l, s, c, f, h, v, d, m, g, y, E, w, p, M, C, b, S, A, R, N, k;
    function I(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = [];
      return e.forEach(function (e, r) {
        var i = null;
        e.forEach(function (o, a) {
          if (!o && null !== i) return n.push("M".concat(i + t, " ").concat(r + t, "h").concat(a - i, "v1H").concat(i + t, "z")), void (i = null);
          if (a !== e.length - 1) o && null === i && (i = a);else {
            if (!o) return;
            null === i ? n.push("M".concat(a + t, ",").concat(r + t, " h1v1H").concat(a + t, "z")) : n.push("M".concat(i + t, ",").concat(r + t, " h").concat(a + 1 - i, "v1H").concat(i + t, "z"));
          }
        });
      }), n.join("");
    }
    function P(e, t) {
      return e.slice().map(function (e, n) {
        return n < t.y || n >= t.y + t.h ? e : e.map(function (e, n) {
          return (n < t.x || n >= t.x + t.w) && e;
        });
      });
    }
    function O(e, t, n, r) {
      if (null == r) return null;
      var i = e.length + 2 * n,
        o = Math.floor(t * R),
        a = i / t,
        l = (r.width || o) * a,
        u = (r.height || o) * a,
        s = null == r.x ? e.length / 2 - l / 2 : r.x * a,
        c = null == r.y ? e.length / 2 - u / 2 : r.y * a,
        f = null == r.opacity ? 1 : r.opacity,
        h = null;
      if (r.excavate) {
        var v = Math.floor(s),
          d = Math.floor(c);
        h = {
          x: v,
          y: d,
          w: Math.ceil(l + s - v),
          h: Math.ceil(u + c - d)
        };
      }
      return {
        x: s,
        y: c,
        h: u,
        w: l,
        excavation: h,
        opacity: f,
        crossOrigin: r.crossOrigin
      };
    }
    function z(e) {
      var t = e.value,
        n = e.level,
        r = e.minVersion,
        i = e.includeMargin,
        o = e.marginSize,
        a = e.imageSettings,
        l = e.size,
        s = e.boostLevel,
        f = c.useMemo(function () {
          var e = (Array.isArray(t) ? t : [t]).reduce(function (e, t) {
            return e.push.apply(e, u(w.QrSegment.makeSegments(t))), e;
          }, []);
          return w.QrCode.encodeSegments(e, p[n], r, void 0, void 0, s);
        }, [t, n, r, s]),
        h = c.useMemo(function () {
          var e = f.getModules(),
            t = function (e, t) {
              return null != t ? Math.max(Math.floor(t), 0) : e ? S : A;
            }(i, o);
          return {
            cells: e,
            margin: t,
            numCells: e.length + 2 * t,
            calculatedImageSettings: O(e, l, t, a)
          };
        }, [f, l, a, i, o]),
        v = h.cells,
        d = h.margin,
        m = h.numCells,
        g = h.calculatedImageSettings;
      return {
        qrcode: f,
        margin: d,
        cells: v,
        numCells: m,
        calculatedImageSettings: g
      };
    }
    return e("t", function () {
      var e = l();
      return {
        goBack: (0, c.useCallback)(function () {
          e(-1);
        }, [e]),
        goToLogin: (0, c.useCallback)(function () {
          e("/auth/login");
        }, [e]),
        goToWhoIsThere: (0, c.useCallback)(function () {
          e("/whoisthere", {
            replace: !0
          });
        }, [e]),
        goToLive: (0, c.useCallback)(function () {
          e("/live", {
            replace: !0
          });
        }, [e])
      };
    }), {
      setters: [function (e) {
        o = e.$, l = e.U, s = e.Z;
      }],
      execute: function () {
        var r, l, u;
        c = o(s()), f = Object.defineProperty, h = Object.getOwnPropertySymbols, v = Object.prototype.hasOwnProperty, d = Object.prototype.propertyIsEnumerable, m = function (e, t, n) {
          return t in e ? f(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
          }) : e[t] = n;
        }, g = function (e, t) {
          for (var n in t || (t = {})) v.call(t, n) && m(e, n, t[n]);
          if (h) {
            var r,
              i = a(h(t));
            try {
              for (i.s(); !(r = i.n()).done;) {
                n = r.value;
                d.call(t, n) && m(e, n, t[n]);
              }
            } catch (o) {
              i.e(o);
            } finally {
              i.f();
            }
          }
          return e;
        }, y = function (e, t) {
          var n = {};
          for (var r in e) v.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
          if (null != e && h) {
            var i,
              o = a(h(e));
            try {
              for (o.s(); !(i = o.n()).done;) {
                r = i.value;
                t.indexOf(r) < 0 && d.call(e, r) && (n[r] = e[r]);
              }
            } catch (l) {
              o.e(l);
            } finally {
              o.f();
            }
          }
          return n;
        }, function (e) {
          var t = function () {
            function t(e, r, i, o) {
              if (n(this, t), this.version = e, this.errorCorrectionLevel = r, this.modules = [], this.isFunction = [], e < t.MIN_VERSION || e > t.MAX_VERSION) throw new RangeError("Version value out of range");
              if (o < -1 || o > 7) throw new RangeError("Mask value out of range");
              this.size = 4 * e + 17;
              for (var a = [], u = 0; u < this.size; u++) a.push(!1);
              for (var s = 0; s < this.size; s++) this.modules.push(a.slice()), this.isFunction.push(a.slice());
              this.drawFunctionPatterns();
              var c = this.addEccAndInterleave(i);
              if (this.drawCodewords(c), -1 == o) for (var f = 1e9, h = 0; h < 8; h++) {
                this.applyMask(h), this.drawFormatBits(h);
                var v = this.getPenaltyScore();
                v < f && (o = h, f = v), this.applyMask(h);
              }
              l(0 <= o && o <= 7), this.mask = o, this.applyMask(o), this.drawFormatBits(o), this.isFunction = [];
            }
            return i(t, [{
              key: "getModule",
              value: function (e, t) {
                return 0 <= e && e < this.size && 0 <= t && t < this.size && this.modules[t][e];
              }
            }, {
              key: "getModules",
              value: function () {
                return this.modules;
              }
            }, {
              key: "drawFunctionPatterns",
              value: function () {
                for (var e = 0; e < this.size; e++) this.setFunctionModule(6, e, e % 2 == 0), this.setFunctionModule(e, 6, e % 2 == 0);
                this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
                for (var t = this.getAlignmentPatternPositions(), n = t.length, r = 0; r < n; r++) for (var i = 0; i < n; i++) 0 == r && 0 == i || 0 == r && i == n - 1 || r == n - 1 && 0 == i || this.drawAlignmentPattern(t[r], t[i]);
                this.drawFormatBits(0), this.drawVersion();
              }
            }, {
              key: "drawFormatBits",
              value: function (e) {
                for (var t = this.errorCorrectionLevel.formatBits << 3 | e, n = t, r = 0; r < 10; r++) n = n << 1 ^ 1335 * (n >>> 9);
                var i = 21522 ^ (t << 10 | n);
                l(i >>> 15 == 0);
                for (var a = 0; a <= 5; a++) this.setFunctionModule(8, a, o(i, a));
                this.setFunctionModule(8, 7, o(i, 6)), this.setFunctionModule(8, 8, o(i, 7)), this.setFunctionModule(7, 8, o(i, 8));
                for (var u = 9; u < 15; u++) this.setFunctionModule(14 - u, 8, o(i, u));
                for (var s = 0; s < 8; s++) this.setFunctionModule(this.size - 1 - s, 8, o(i, s));
                for (var c = 8; c < 15; c++) this.setFunctionModule(8, this.size - 15 + c, o(i, c));
                this.setFunctionModule(8, this.size - 8, !0);
              }
            }, {
              key: "drawVersion",
              value: function () {
                if (!(this.version < 7)) {
                  for (var e = this.version, t = 0; t < 12; t++) e = e << 1 ^ 7973 * (e >>> 11);
                  var n = this.version << 12 | e;
                  l(n >>> 18 == 0);
                  for (var r = 0; r < 18; r++) {
                    var i = o(n, r),
                      a = this.size - 11 + r % 3,
                      u = Math.floor(r / 3);
                    this.setFunctionModule(a, u, i), this.setFunctionModule(u, a, i);
                  }
                }
              }
            }, {
              key: "drawFinderPattern",
              value: function (e, t) {
                for (var n = -4; n <= 4; n++) for (var r = -4; r <= 4; r++) {
                  var i = Math.max(Math.abs(r), Math.abs(n)),
                    o = e + r,
                    a = t + n;
                  0 <= o && o < this.size && 0 <= a && a < this.size && this.setFunctionModule(o, a, 2 != i && 4 != i);
                }
              }
            }, {
              key: "drawAlignmentPattern",
              value: function (e, t) {
                for (var n = -2; n <= 2; n++) for (var r = -2; r <= 2; r++) this.setFunctionModule(e + r, t + n, 1 != Math.max(Math.abs(r), Math.abs(n)));
              }
            }, {
              key: "setFunctionModule",
              value: function (e, t, n) {
                this.modules[t][e] = n, this.isFunction[t][e] = !0;
              }
            }, {
              key: "addEccAndInterleave",
              value: function (e) {
                var n = this.version,
                  r = this.errorCorrectionLevel;
                if (e.length != t.getNumDataCodewords(n, r)) throw new RangeError("Invalid argument");
                for (var i = t.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][n], o = t.ECC_CODEWORDS_PER_BLOCK[r.ordinal][n], a = Math.floor(t.getNumRawDataModules(n) / 8), u = i - a % i, s = Math.floor(a / i), c = [], f = t.reedSolomonComputeDivisor(o), h = 0, v = 0; h < i; h++) {
                  var d = e.slice(v, v + s - o + (h < u ? 0 : 1));
                  v += d.length;
                  var m = t.reedSolomonComputeRemainder(d, f);
                  h < u && d.push(0), c.push(d.concat(m));
                }
                for (var g = [], y = function (e) {
                    c.forEach(function (t, n) {
                      (e != s - o || n >= u) && g.push(t[e]);
                    });
                  }, E = 0; E < c[0].length; E++) y(E);
                return l(g.length == a), g;
              }
            }, {
              key: "drawCodewords",
              value: function (e) {
                if (e.length != Math.floor(t.getNumRawDataModules(this.version) / 8)) throw new RangeError("Invalid argument");
                for (var n = 0, r = this.size - 1; r >= 1; r -= 2) {
                  6 == r && (r = 5);
                  for (var i = 0; i < this.size; i++) for (var a = 0; a < 2; a++) {
                    var u = r - a,
                      s = r + 1 & 2 ? i : this.size - 1 - i;
                    !this.isFunction[s][u] && n < 8 * e.length && (this.modules[s][u] = o(e[n >>> 3], 7 - (7 & n)), n++);
                  }
                }
                l(n == 8 * e.length);
              }
            }, {
              key: "applyMask",
              value: function (e) {
                if (e < 0 || e > 7) throw new RangeError("Mask value out of range");
                for (var t = 0; t < this.size; t++) for (var n = 0; n < this.size; n++) {
                  var r = void 0;
                  switch (e) {
                    case 0:
                      r = (n + t) % 2 == 0;
                      break;
                    case 1:
                      r = t % 2 == 0;
                      break;
                    case 2:
                      r = n % 3 == 0;
                      break;
                    case 3:
                      r = (n + t) % 3 == 0;
                      break;
                    case 4:
                      r = (Math.floor(n / 3) + Math.floor(t / 2)) % 2 == 0;
                      break;
                    case 5:
                      r = n * t % 2 + n * t % 3 == 0;
                      break;
                    case 6:
                      r = (n * t % 2 + n * t % 3) % 2 == 0;
                      break;
                    case 7:
                      r = ((n + t) % 2 + n * t % 3) % 2 == 0;
                      break;
                    default:
                      throw new Error("Unreachable");
                  }
                  !this.isFunction[t][n] && r && (this.modules[t][n] = !this.modules[t][n]);
                }
              }
            }, {
              key: "getPenaltyScore",
              value: function () {
                for (var e = 0, n = 0; n < this.size; n++) {
                  for (var r = !1, i = 0, o = [0, 0, 0, 0, 0, 0, 0], u = 0; u < this.size; u++) this.modules[n][u] == r ? 5 == ++i ? e += t.PENALTY_N1 : i > 5 && e++ : (this.finderPenaltyAddHistory(i, o), r || (e += this.finderPenaltyCountPatterns(o) * t.PENALTY_N3), r = this.modules[n][u], i = 1);
                  e += this.finderPenaltyTerminateAndCount(r, i, o) * t.PENALTY_N3;
                }
                for (var s = 0; s < this.size; s++) {
                  for (var c = !1, f = 0, h = [0, 0, 0, 0, 0, 0, 0], v = 0; v < this.size; v++) this.modules[v][s] == c ? 5 == ++f ? e += t.PENALTY_N1 : f > 5 && e++ : (this.finderPenaltyAddHistory(f, h), c || (e += this.finderPenaltyCountPatterns(h) * t.PENALTY_N3), c = this.modules[v][s], f = 1);
                  e += this.finderPenaltyTerminateAndCount(c, f, h) * t.PENALTY_N3;
                }
                for (var d = 0; d < this.size - 1; d++) for (var m = 0; m < this.size - 1; m++) {
                  var g = this.modules[d][m];
                  g == this.modules[d][m + 1] && g == this.modules[d + 1][m] && g == this.modules[d + 1][m + 1] && (e += t.PENALTY_N2);
                }
                var y,
                  E = 0,
                  w = a(this.modules);
                try {
                  for (w.s(); !(y = w.n()).done;) {
                    E = y.value.reduce(function (e, t) {
                      return e + (t ? 1 : 0);
                    }, E);
                  }
                } catch (C) {
                  w.e(C);
                } finally {
                  w.f();
                }
                var p = this.size * this.size,
                  M = Math.ceil(Math.abs(20 * E - 10 * p) / p) - 1;
                return l(0 <= M && M <= 9), l(0 <= (e += M * t.PENALTY_N4) && e <= 2568888), e;
              }
            }, {
              key: "getAlignmentPatternPositions",
              value: function () {
                if (1 == this.version) return [];
                for (var e = Math.floor(this.version / 7) + 2, t = 32 == this.version ? 26 : 2 * Math.ceil((4 * this.version + 4) / (2 * e - 2)), n = [6], r = this.size - 7; n.length < e; r -= t) n.splice(1, 0, r);
                return n;
              }
            }, {
              key: "finderPenaltyCountPatterns",
              value: function (e) {
                var t = e[1];
                l(t <= 3 * this.size);
                var n = t > 0 && e[2] == t && e[3] == 3 * t && e[4] == t && e[5] == t;
                return (n && e[0] >= 4 * t && e[6] >= t ? 1 : 0) + (n && e[6] >= 4 * t && e[0] >= t ? 1 : 0);
              }
            }, {
              key: "finderPenaltyTerminateAndCount",
              value: function (e, t, n) {
                return e && (this.finderPenaltyAddHistory(t, n), t = 0), t += this.size, this.finderPenaltyAddHistory(t, n), this.finderPenaltyCountPatterns(n);
              }
            }, {
              key: "finderPenaltyAddHistory",
              value: function (e, t) {
                0 == t[0] && (e += this.size), t.pop(), t.unshift(e);
              }
            }], [{
              key: "encodeText",
              value: function (n, r) {
                var i = e.QrSegment.makeSegments(n);
                return t.encodeSegments(i, r);
              }
            }, {
              key: "encodeBinary",
              value: function (n, r) {
                var i = e.QrSegment.makeBytes(n);
                return t.encodeSegments([i], r);
              }
            }, {
              key: "encodeSegments",
              value: function (e, n) {
                var i,
                  o,
                  u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                  c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 40,
                  f = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1,
                  h = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];
                if (!(t.MIN_VERSION <= u && u <= c && c <= t.MAX_VERSION) || f < -1 || f > 7) throw new RangeError("Invalid value");
                for (i = u;; i++) {
                  var v = 8 * t.getNumDataCodewords(i, n),
                    d = s.getTotalBits(e, i);
                  if (d <= v) {
                    o = d;
                    break;
                  }
                  if (i >= c) throw new RangeError("Data too long");
                }
                for (var m = 0, g = [t.Ecc.MEDIUM, t.Ecc.QUARTILE, t.Ecc.HIGH]; m < g.length; m++) {
                  var y = g[m];
                  h && o <= 8 * t.getNumDataCodewords(i, y) && (n = y);
                }
                var E,
                  w = [],
                  p = a(e);
                try {
                  for (p.s(); !(E = p.n()).done;) {
                    var M = E.value;
                    r(M.mode.modeBits, 4, w), r(M.numChars, M.mode.numCharCountBits(i), w);
                    var C,
                      b = a(M.getData());
                    try {
                      for (b.s(); !(C = b.n()).done;) {
                        var S = C.value;
                        w.push(S);
                      }
                    } catch (k) {
                      b.e(k);
                    } finally {
                      b.f();
                    }
                  }
                } catch (k) {
                  p.e(k);
                } finally {
                  p.f();
                }
                l(w.length == o);
                var A = 8 * t.getNumDataCodewords(i, n);
                l(w.length <= A), r(0, Math.min(4, A - w.length), w), r(0, (8 - w.length % 8) % 8, w), l(w.length % 8 == 0);
                for (var R = 236; w.length < A; R ^= 253) r(R, 8, w);
                for (var N = []; 8 * N.length < w.length;) N.push(0);
                return w.forEach(function (e, t) {
                  return N[t >>> 3] |= e << 7 - (7 & t);
                }), new t(i, n, N, f);
              }
            }, {
              key: "getNumRawDataModules",
              value: function (e) {
                if (e < t.MIN_VERSION || e > t.MAX_VERSION) throw new RangeError("Version number out of range");
                var n = (16 * e + 128) * e + 64;
                if (e >= 2) {
                  var r = Math.floor(e / 7) + 2;
                  n -= (25 * r - 10) * r - 55, e >= 7 && (n -= 36);
                }
                return l(208 <= n && n <= 29648), n;
              }
            }, {
              key: "getNumDataCodewords",
              value: function (e, n) {
                return Math.floor(t.getNumRawDataModules(e) / 8) - t.ECC_CODEWORDS_PER_BLOCK[n.ordinal][e] * t.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][e];
              }
            }, {
              key: "reedSolomonComputeDivisor",
              value: function (e) {
                if (e < 1 || e > 255) throw new RangeError("Degree out of range");
                for (var n = [], r = 0; r < e - 1; r++) n.push(0);
                n.push(1);
                for (var i = 1, o = 0; o < e; o++) {
                  for (var a = 0; a < n.length; a++) n[a] = t.reedSolomonMultiply(n[a], i), a + 1 < n.length && (n[a] ^= n[a + 1]);
                  i = t.reedSolomonMultiply(i, 2);
                }
                return n;
              }
            }, {
              key: "reedSolomonComputeRemainder",
              value: function (e, n) {
                var r,
                  i = n.map(function (e) {
                    return 0;
                  }),
                  o = a(e);
                try {
                  var l = function () {
                    var e = r.value ^ i.shift();
                    i.push(0), n.forEach(function (n, r) {
                      return i[r] ^= t.reedSolomonMultiply(n, e);
                    });
                  };
                  for (o.s(); !(r = o.n()).done;) l();
                } catch (u) {
                  o.e(u);
                } finally {
                  o.f();
                }
                return i;
              }
            }, {
              key: "reedSolomonMultiply",
              value: function (e, t) {
                if (e >>> 8 != 0 || t >>> 8 != 0) throw new RangeError("Byte out of range");
                for (var n = 0, r = 7; r >= 0; r--) n = n << 1 ^ 285 * (n >>> 7), n ^= (t >>> r & 1) * e;
                return l(n >>> 8 == 0), n;
              }
            }]);
          }();
          function r(e, t, n) {
            if (t < 0 || t > 31 || e >>> t != 0) throw new RangeError("Value out of range");
            for (var r = t - 1; r >= 0; r--) n.push(e >>> r & 1);
          }
          function o(e, t) {
            return !!(e >>> t & 1);
          }
          function l(e) {
            if (!e) throw new Error("Assertion error");
          }
          t.MIN_VERSION = 1, t.MAX_VERSION = 40, t.PENALTY_N1 = 3, t.PENALTY_N2 = 3, t.PENALTY_N3 = 40, t.PENALTY_N4 = 10, t.ECC_CODEWORDS_PER_BLOCK = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]], t.NUM_ERROR_CORRECTION_BLOCKS = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]], e.QrCode = t;
          var u = function () {
            function e(t, r, i) {
              if (n(this, e), this.mode = t, this.numChars = r, this.bitData = i, r < 0) throw new RangeError("Invalid argument");
              this.bitData = i.slice();
            }
            return i(e, [{
              key: "getData",
              value: function () {
                return this.bitData.slice();
              }
            }], [{
              key: "makeBytes",
              value: function (t) {
                var n,
                  i = [],
                  o = a(t);
                try {
                  for (o.s(); !(n = o.n()).done;) {
                    r(n.value, 8, i);
                  }
                } catch (l) {
                  o.e(l);
                } finally {
                  o.f();
                }
                return new e(e.Mode.BYTE, t.length, i);
              }
            }, {
              key: "makeNumeric",
              value: function (t) {
                if (!e.isNumeric(t)) throw new RangeError("String contains non-numeric characters");
                for (var n = [], i = 0; i < t.length;) {
                  var o = Math.min(t.length - i, 3);
                  r(parseInt(t.substring(i, i + o), 10), 3 * o + 1, n), i += o;
                }
                return new e(e.Mode.NUMERIC, t.length, n);
              }
            }, {
              key: "makeAlphanumeric",
              value: function (t) {
                if (!e.isAlphanumeric(t)) throw new RangeError("String contains unencodable characters in alphanumeric mode");
                var n,
                  i = [];
                for (n = 0; n + 2 <= t.length; n += 2) {
                  var o = 45 * e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n));
                  r(o += e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n + 1)), 11, i);
                }
                return n < t.length && r(e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n)), 6, i), new e(e.Mode.ALPHANUMERIC, t.length, i);
              }
            }, {
              key: "makeSegments",
              value: function (t) {
                return "" == t ? [] : e.isNumeric(t) ? [e.makeNumeric(t)] : e.isAlphanumeric(t) ? [e.makeAlphanumeric(t)] : [e.makeBytes(e.toUtf8ByteArray(t))];
              }
            }, {
              key: "makeEci",
              value: function (t) {
                var n = [];
                if (t < 0) throw new RangeError("ECI assignment value out of range");
                if (t < 128) r(t, 8, n);else if (t < 16384) r(2, 2, n), r(t, 14, n);else {
                  if (!(t < 1e6)) throw new RangeError("ECI assignment value out of range");
                  r(6, 3, n), r(t, 21, n);
                }
                return new e(e.Mode.ECI, 0, n);
              }
            }, {
              key: "isNumeric",
              value: function (t) {
                return e.NUMERIC_REGEX.test(t);
              }
            }, {
              key: "isAlphanumeric",
              value: function (t) {
                return e.ALPHANUMERIC_REGEX.test(t);
              }
            }, {
              key: "getTotalBits",
              value: function (e, t) {
                var n,
                  r = 0,
                  i = a(e);
                try {
                  for (i.s(); !(n = i.n()).done;) {
                    var o = n.value,
                      l = o.mode.numCharCountBits(t);
                    if (o.numChars >= 1 << l) return 1 / 0;
                    r += 4 + l + o.bitData.length;
                  }
                } catch (u) {
                  i.e(u);
                } finally {
                  i.f();
                }
                return r;
              }
            }, {
              key: "toUtf8ByteArray",
              value: function (e) {
                e = encodeURI(e);
                for (var t = [], n = 0; n < e.length; n++) "%" != e.charAt(n) ? t.push(e.charCodeAt(n)) : (t.push(parseInt(e.substring(n + 1, n + 3), 16)), n += 2);
                return t;
              }
            }]);
          }();
          u.NUMERIC_REGEX = /^[0-9]*$/, u.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/, u.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
          var s = u;
          e.QrSegment = u;
        }(E || (E = {})), r = E || (E = {}), l = r.QrCode || (r.QrCode = {}), (u = i(function e(t, r) {
          n(this, e), this.ordinal = t, this.formatBits = r;
        })).LOW = new u(0, 1), u.MEDIUM = new u(1, 0), u.QUARTILE = new u(2, 3), u.HIGH = new u(3, 2), l.Ecc = u, function (e) {
          var t, r;
          t = e.QrSegment || (e.QrSegment = {}), (r = function () {
            return i(function e(t, r) {
              n(this, e), this.modeBits = t, this.numBitsCharCount = r;
            }, [{
              key: "numCharCountBits",
              value: function (e) {
                return this.numBitsCharCount[Math.floor((e + 7) / 17)];
              }
            }]);
          }()).NUMERIC = new r(1, [10, 12, 14]), r.ALPHANUMERIC = new r(2, [9, 11, 13]), r.BYTE = new r(4, [8, 16, 16]), r.KANJI = new r(8, [8, 10, 12]), r.ECI = new r(7, [0, 0, 0]), t.Mode = r;
        }(E || (E = {})), p = {
          L: (w = E).QrCode.Ecc.LOW,
          M: w.QrCode.Ecc.MEDIUM,
          Q: w.QrCode.Ecc.QUARTILE,
          H: w.QrCode.Ecc.HIGH
        }, M = "#FFFFFF", C = "#000000", b = !1, S = 4, A = 0, R = .1, N = function () {
          try {
            new Path2D().addPath(new Path2D());
          } catch (e) {
            return !1;
          }
          return !0;
        }(), c.forwardRef(function (e, n) {
          var r = e,
            i = r.value,
            o = r.size,
            a = void 0 === o ? 128 : o,
            l = r.level,
            u = void 0 === l ? "L" : l,
            s = r.bgColor,
            f = void 0 === s ? M : s,
            h = r.fgColor,
            v = void 0 === h ? C : h,
            d = r.includeMargin,
            m = void 0 === d ? b : d,
            E = r.minVersion,
            w = void 0 === E ? 1 : E,
            p = r.boostLevel,
            S = r.marginSize,
            A = r.imageSettings,
            R = y(r, ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "boostLevel", "marginSize", "imageSettings"]),
            k = R.style,
            O = y(R, ["style"]),
            L = null == A ? void 0 : A.src,
            _ = c.useRef(null),
            T = c.useRef(null),
            F = c.useCallback(function (e) {
              _.current = e, "function" == typeof n ? n(e) : n && (n.current = e);
            }, [n]),
            B = t(c.useState(!1), 2),
            D = (B[0], B[1]),
            x = z({
              value: i,
              level: u,
              minVersion: w,
              boostLevel: p,
              includeMargin: m,
              marginSize: S,
              imageSettings: A,
              size: a
            }),
            H = x.margin,
            U = x.cells,
            V = x.numCells,
            Q = x.calculatedImageSettings;
          c.useEffect(function () {
            if (null != _.current) {
              var e = _.current,
                t = e.getContext("2d");
              if (!t) return;
              var n = U,
                r = T.current,
                i = null != Q && null !== r && r.complete && 0 !== r.naturalHeight && 0 !== r.naturalWidth;
              i && null != Q.excavation && (n = P(U, Q.excavation));
              var o = window.devicePixelRatio || 1;
              e.height = e.width = a * o;
              var l = a / V * o;
              t.scale(l, l), t.fillStyle = f, t.fillRect(0, 0, V, V), t.fillStyle = v, N ? t.fill(new Path2D(I(n, H))) : U.forEach(function (e, n) {
                e.forEach(function (e, r) {
                  e && t.fillRect(r + H, n + H, 1, 1);
                });
              }), Q && (t.globalAlpha = Q.opacity), i && t.drawImage(r, Q.x + H, Q.y + H, Q.w, Q.h);
            }
          }), c.useEffect(function () {
            D(!1);
          }, [L]);
          var j = g({
              height: a,
              width: a
            }, k),
            Y = null;
          return null != L && (Y = c.createElement("img", {
            src: L,
            key: L,
            style: {
              display: "none"
            },
            onLoad: function () {
              D(!0);
            },
            ref: T,
            crossOrigin: null == Q ? void 0 : Q.crossOrigin
          })), c.createElement(c.Fragment, null, c.createElement("canvas", g({
            style: j,
            height: a,
            width: a,
            ref: F,
            role: "img"
          }, O)), Y);
        }).displayName = "QRCodeCanvas", e("n", k = c.forwardRef(function (e, t) {
          var n = e,
            r = n.value,
            i = n.size,
            o = void 0 === i ? 128 : i,
            a = n.level,
            l = void 0 === a ? "L" : a,
            u = n.bgColor,
            s = void 0 === u ? M : u,
            f = n.fgColor,
            h = void 0 === f ? C : f,
            v = n.includeMargin,
            d = void 0 === v ? b : v,
            m = n.minVersion,
            E = void 0 === m ? 1 : m,
            w = n.boostLevel,
            p = n.title,
            S = n.marginSize,
            A = n.imageSettings,
            R = y(n, ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "boostLevel", "title", "marginSize", "imageSettings"]),
            N = z({
              value: r,
              level: l,
              minVersion: E,
              boostLevel: w,
              includeMargin: d,
              marginSize: S,
              imageSettings: A,
              size: o
            }),
            k = N.margin,
            O = N.cells,
            L = N.numCells,
            _ = N.calculatedImageSettings,
            T = O,
            F = null;
          null != A && null != _ && (null != _.excavation && (T = P(O, _.excavation)), F = c.createElement("image", {
            href: A.src,
            height: _.h,
            width: _.w,
            x: _.x + k,
            y: _.y + k,
            preserveAspectRatio: "none",
            opacity: _.opacity,
            crossOrigin: _.crossOrigin
          }));
          var B = I(T, k);
          return c.createElement("svg", g({
            height: o,
            width: o,
            viewBox: "0 0 ".concat(L, " ").concat(L),
            ref: t,
            role: "img"
          }, R), !!p && c.createElement("title", null, p), c.createElement("path", {
            fill: s,
            d: "M0,0 h".concat(L, "v").concat(L, "H0z"),
            shapeRendering: "crispEdges"
          }), c.createElement("path", {
            fill: h,
            d: B,
            shapeRendering: "crispEdges"
          }), F);
        })), k.displayName = "QRCodeSVG";
      }
    };
  });
}();