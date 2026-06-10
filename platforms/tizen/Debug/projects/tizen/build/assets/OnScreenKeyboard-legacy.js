System.register(["./jsx-runtime-legacy.js"], function (e, a) {
  var l, r, n, o, t, s, c;
  function _(e) {
    var a = e.keyDef,
      l = e.focusKey,
      n = e.onKeyPress,
      o = e.isFirstInRow,
      c = e.onEscapeLeft,
      _ = r({
        focusKey: l,
        onEnterPress: function () {
          return n(a);
        },
        onArrowPress: function (e) {
          return "left" !== e || !o || !c || (c(), !1);
        }
      }),
      b = _.ref,
      u = _.focused;
    return (0, s.jsx)("button", {
      ref: b,
      type: "button",
      className: [t.key, u && t.focused, a.action && t.actionKey, 2 === a.span && t.span2, 3 === a.span && t.span3, 4 === a.span && t.span4, 5 === a.span && t.span5, 6 === a.span && t.span6].filter(Boolean).join(" "),
      onClick: function () {
        return n(a);
      },
      children: "delete" === a.action ? (0, s.jsxs)("svg", {
        className: t.deleteIcon,
        viewBox: "0 0 24 24",
        children: [(0, s.jsx)("path", {
          d: "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        }), (0, s.jsx)("line", {
          x1: "16.5",
          y1: "8.5",
          x2: "10.5",
          y2: "14.5"
        }), (0, s.jsx)("line", {
          x1: "10.5",
          y1: "8.5",
          x2: "16.5",
          y2: "14.5"
        })]
      }) : a.label
    });
  }
  return e("t", function (e) {
    var a = e.focusKeyPrefix,
      n = void 0 === a ? "KB" : a,
      o = e.onInput,
      b = e.onSearch,
      u = e.onDelete,
      i = e.onClear,
      x = e.customRows,
      d = e.onEscapeLeft,
      f = r({
        focusKey: n,
        saveLastFocusedChild: !0,
        trackChildren: !0,
        isFocusBoundary: !1
      }),
      p = f.ref,
      v = f.focusKey,
      y = function (e) {
        switch (e.action) {
          case "search":
            null == b || b();
            break;
          case "delete":
            u();
            break;
          case "clear":
            null == i || i();
            break;
          default:
            o(e.value);
        }
      },
      k = x || c;
    return (0, s.jsx)(l.Provider, {
      value: v,
      children: (0, s.jsx)("div", {
        ref: p,
        className: t.keyboard,
        children: k.map(function (e, a) {
          return (0, s.jsx)("div", {
            className: t.row,
            children: e.map(function (e, l) {
              return (0, s.jsx)(_, {
                keyDef: e,
                focusKey: "".concat(n, "-r").concat(a, "-").concat(e.label),
                onKeyPress: y,
                isFirstInRow: 0 === l,
                onEscapeLeft: d
              }, "".concat(e.label, "-").concat(l));
            })
          }, a);
        })
      })
    });
  }), {
    setters: [function (e) {
      l = e.K, r = e.q, n = e.t;
    }],
    execute: function () {
      (o = document.createElement("style")).textContent = "._keyboard_x6r1b_2{box-sizing:border-box;border-radius:12px;flex-direction:column;width:100%;padding:3%;display:flex}._row_x6r1b_12{flex-direction:row;display:flex}._row_x6r1b_12+._row_x6r1b_12{margin-top:2%}._key_x6r1b_2{background-color:var(--clr-secondary,#004a3c);color:var(--clr-primary-text,#fff);text-transform:lowercase;cursor:pointer;border:2px solid transparent;border-radius:8px;flex:1 1 0;justify-content:center;align-items:center;height:2.8vw;min-height:2.8vw;padding:0;font-family:inherit;font-size:1.4em;font-weight:600;display:flex}._key_x6r1b_2+._key_x6r1b_2{margin-left:2%}._key_x6r1b_2._span2_x6r1b_45{flex:2.04 1 0}._key_x6r1b_2._span3_x6r1b_46{flex:3.08 1 0}._key_x6r1b_2._span4_x6r1b_47{flex:4.12 1 0}._key_x6r1b_2._span5_x6r1b_48{flex:5.16 1 0}._key_x6r1b_2._span6_x6r1b_49{flex:6.2 1 0}._key_x6r1b_2._focused_x6r1b_52,._key_x6r1b_2:hover{border-color:var(--foc-primary,#ffe500);box-shadow:0 0 12px var(--foc-primary,#ffe500);z-index:2;background-color:rgba(255,255,255,.2)}._actionKey_x6r1b_61{text-transform:uppercase;letter-spacing:.05em;font-size:1em}._deleteIcon_x6r1b_68{width:1.4em;height:1.4em}._deleteIcon_x6r1b_68 path{fill:currentColor;stroke:none}._deleteIcon_x6r1b_68 line{stroke:var(--clr-secondary,#004a3c);stroke-width:2px;stroke-linecap:round}\n/*$vite$:1*/", document.head.appendChild(o), t = {
        keyboard: "_keyboard_x6r1b_2",
        row: "_row_x6r1b_12",
        key: "_key_x6r1b_2",
        span2: "_span2_x6r1b_45",
        span3: "_span3_x6r1b_46",
        span4: "_span4_x6r1b_47",
        span5: "_span5_x6r1b_48",
        span6: "_span6_x6r1b_49",
        focused: "_focused_x6r1b_52",
        actionKey: "_actionKey_x6r1b_61",
        deleteIcon: "_deleteIcon_x6r1b_68"
      }, s = n(), c = [[{
        label: "a",
        value: "a"
      }, {
        label: "b",
        value: "b"
      }, {
        label: "c",
        value: "c"
      }, {
        label: "d",
        value: "d"
      }, {
        label: "e",
        value: "e"
      }, {
        label: "f",
        value: "f"
      }], [{
        label: "g",
        value: "g"
      }, {
        label: "h",
        value: "h"
      }, {
        label: "i",
        value: "i"
      }, {
        label: "j",
        value: "j"
      }, {
        label: "k",
        value: "k"
      }, {
        label: "l",
        value: "l"
      }], [{
        label: "m",
        value: "m"
      }, {
        label: "n",
        value: "n"
      }, {
        label: "ñ",
        value: "ñ"
      }, {
        label: "o",
        value: "o"
      }, {
        label: "p",
        value: "p"
      }, {
        label: "q",
        value: "q"
      }], [{
        label: "r",
        value: "r"
      }, {
        label: "s",
        value: "s"
      }, {
        label: "t",
        value: "t"
      }, {
        label: "u",
        value: "u"
      }, {
        label: "v",
        value: "v"
      }, {
        label: "w",
        value: "w"
      }], [{
        label: "x",
        value: "x"
      }, {
        label: "y",
        value: "y"
      }, {
        label: "z",
        value: "z"
      }, {
        label: "0",
        value: "0"
      }, {
        label: "1",
        value: "1"
      }, {
        label: "2",
        value: "2"
      }], [{
        label: "3",
        value: "3"
      }, {
        label: "4",
        value: "4"
      }, {
        label: "5",
        value: "5"
      }, {
        label: "6",
        value: "6"
      }, {
        label: "7",
        value: "7"
      }, {
        label: "8",
        value: "8"
      }], [{
        label: "9",
        value: "9"
      }, {
        label: "Espacio",
        value: " ",
        span: 4,
        action: "space"
      }, {
        label: "⌫",
        value: "",
        span: 1,
        action: "delete"
      }]];
    }
  };
});