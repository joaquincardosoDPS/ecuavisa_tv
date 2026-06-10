System.register(["./index-legacy.js", "./profileService-legacy.js"], function (r, e) {
  var t, o, a, i;
  return r("n", function () {
    var r = t(function (r) {
        return r.token;
      }),
      e = o(function () {
        return a.getAll(r);
      }, [r], {
        enabled: !!r
      }),
      i = e.data,
      n = e.isLoading,
      _ = e.isError,
      c = (null == i ? void 0 : i.data) || [];
    return {
      token: r,
      profiles: c,
      isLoading: n,
      isError: _,
      selectProfile: function (r) {
        t.getState().setActiveProfile(r);
      },
      logout: function () {
        t.getState().logout();
      }
    };
  }), {
    setters: [function (r) {
      t = r.o, o = r.t;
    }, function (r) {
      a = r.t;
    }],
    execute: function () {
      (i = document.createElement("style")).textContent = "._container_1kp7r_1{background:var(--clr-primary);flex-direction:column;justify-content:start;align-items:center;width:100%;height:100vh;padding-top:15vh;display:flex}._container_1kp7r_1>*+*{margin-top:2rem}._logo_1kp7r_16{width:auto;height:5rem}._heading_1kp7r_21{color:var(--clr-primary-title);margin:0;font-size:1.6rem;font-weight:400}._profilesGrid_1kp7r_28{flex-wrap:wrap;justify-content:center;align-items:flex-start;display:flex}._profileCard_1kp7r_39{cursor:pointer;background:0 0;border:none;outline:none;flex-direction:column;align-items:center;padding:1rem;display:flex}._profileCard_1kp7r_39>*+*{margin-top:.8rem}._avatarWrapper_1kp7r_54{background:var(--clr-secondary);border:3px solid transparent;border-radius:50%;justify-content:center;align-items:center;width:12rem;height:12rem;transition:border-color .2s,transform .2s;display:flex;position:relative}._avatarWrapperFocused_1kp7r_67{border-color:var(--foc-primary);transform:scale(1.08)}._editBadge_1kp7r_73{background:var(--clr-secondary);border:2px solid var(--clr-primary);width:2.2rem;height:2.2rem;color:var(--clr-primary-text);z-index:2;border-radius:50%;justify-content:center;align-items:center;font-size:1rem;transition:background-color .2s,border-color .2s;display:flex;position:absolute;bottom:0;right:0}._editBadgeFocused_1kp7r_91{background:var(--foc-primary);border-color:var(--foc-primary);color:#fff}._editBadgeIcon_1kp7r_97{width:1rem;height:1rem}._avatarImg_1kp7r_102{object-fit:cover;border-radius:50%;width:100%;height:100%}._avatarInitial_1kp7r_109{color:var(--clr-secondary-text);font-size:3.5rem;font-weight:600}._profileName_1kp7r_115{color:var(--clr-primary-text);opacity:.7;font-size:1.6rem;font-weight:400;transition:opacity .2s}._profileNameFocused_1kp7r_123{opacity:1}._addIcon_1kp7r_127{color:var(--clr-secondary-text);font-size:4rem;font-weight:300;transition:color .2s}._addIconFocused_1kp7r_134{color:var(--foc-primary)}._errorText_1kp7r_138{color:#ef4444;font-size:.9rem}._bottomActions_1kp7r_144{flex-direction:column;align-items:center;margin-top:3rem;display:flex}._bottomActions_1kp7r_144>*+*{margin-top:1rem}\n/*$vite$:1*/", document.head.appendChild(i), r("t", {
        container: "_container_1kp7r_1",
        logo: "_logo_1kp7r_16",
        heading: "_heading_1kp7r_21",
        profilesGrid: "_profilesGrid_1kp7r_28",
        profileCard: "_profileCard_1kp7r_39",
        avatarWrapper: "_avatarWrapper_1kp7r_54",
        avatarWrapperFocused: "_avatarWrapperFocused_1kp7r_67",
        editBadge: "_editBadge_1kp7r_73",
        editBadgeFocused: "_editBadgeFocused_1kp7r_91",
        editBadgeIcon: "_editBadgeIcon_1kp7r_97",
        avatarImg: "_avatarImg_1kp7r_102",
        avatarInitial: "_avatarInitial_1kp7r_109",
        profileName: "_profileName_1kp7r_115",
        profileNameFocused: "_profileNameFocused_1kp7r_123",
        addIcon: "_addIcon_1kp7r_127",
        addIconFocused: "_addIconFocused_1kp7r_134",
        errorText: "_errorText_1kp7r_138",
        bottomActions: "_bottomActions_1kp7r_144"
      });
    }
  };
});