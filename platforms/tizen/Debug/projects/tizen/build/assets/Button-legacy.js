System.register(["./jsx-runtime-legacy.js"], function (r, t) {
  var o, e, n, a, i;
  return r("t", function (r) {
    var t = r.children,
      e = r.variant,
      n = void 0 === e ? "primary" : e,
      c = r.showArrow,
      f = void 0 !== c && c,
      d = r.focusKey,
      _ = r.onPress,
      s = r.onClick,
      l = r.onFocused,
      u = r.onArrowPress,
      x = r.className,
      y = o({
        focusKey: d,
        onEnterPress: function () {
          return null == _ ? void 0 : _();
        },
        onFocus: function () {
          return null == l ? void 0 : l();
        },
        onArrowPress: u
      }),
      p = y.ref,
      b = y.focused;
    return (0, i.jsx)("button", {
      ref: p,
      type: "button",
      className: [a.btn, a[n], b && a.focused, f && a.withArrow, x].filter(Boolean).join(" "),
      onClick: function () {
        null == _ || _(), null == s || s();
      },
      children: t
    });
  }), {
    setters: [function (r) {
      o = r.q, e = r.t;
    }],
    execute: function () {
      (n = document.createElement("style")).textContent = '._btn_1fdx0_5{cursor:pointer;white-space:nowrap;border:2px solid transparent;border-radius:8px;justify-content:center;align-items:center;padding:1.2rem 3.5rem;font-family:inherit;font-size:1.5rem;font-weight:700;display:inline-flex;position:relative}._btn_1fdx0_5._withArrow_1fdx0_21:before{content:"";border:8px solid transparent;border-left:14px solid;border-right-width:0;flex-shrink:0;width:0;height:0;margin-right:.75rem;display:inline-block}._primary_1fdx0_36{background-color:var(--clr-primary-button,#ffe500);color:var(--clr-text-primary-button,#000)}._primary_1fdx0_36._focused_1fdx0_41,._primary_1fdx0_36:hover{background-color:var(--foc-primary,#ffe500);color:var(--clr-text-primary-button,#000);box-shadow:0 0 20px 4px var(--clr-primary-button,#ffe500)}._secondary_1fdx0_51{background-color:var(--clr-secondary-button,#ffe500);color:var(--clr-text-secondary-button,#000)}._secondary_1fdx0_51._focused_1fdx0_41,._secondary_1fdx0_51:hover{box-shadow:0px 0px 20px 0px var(--foc-secondary,#ffe500)}._tertiary_1fdx0_64{color:var(--clr-text-tertiary-button,#fff);border-color:var(--clr-text-tertiary-button,#fff);background-color:transparent}._tertiary_1fdx0_64._focused_1fdx0_41,._tertiary_1fdx0_64:hover{background-color:var(--clr-text-tertiary-button,#fff);color:var(--clr-tertiary-button,var(--clr-primary,#00705a));box-shadow:0 0 10px 1px var(--foc-tertiary,#fff)}\n/*$vite$:1*/', document.head.appendChild(n), a = {
        btn: "_btn_1fdx0_5",
        withArrow: "_withArrow_1fdx0_21",
        primary: "_primary_1fdx0_36",
        focused: "_focused_1fdx0_41",
        secondary: "_secondary_1fdx0_51",
        tertiary: "_tertiary_1fdx0_64"
      }, i = e();
    }
  };
});