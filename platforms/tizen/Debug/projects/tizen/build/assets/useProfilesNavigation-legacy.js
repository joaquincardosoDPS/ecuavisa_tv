System.register(["./jsx-runtime-legacy.js"], function (e, t) {
  var n;
  return e({
    i: function () {
      var e = n();
      return {
        goToLogin: function () {
          e("/auth/login", {
            replace: !0
          });
        },
        goToLive: function () {
          e("/live", {
            replace: !0
          });
        },
        goToCreateProfile: function () {
          e("/mi-latina/nuevo", {
            replace: !0
          });
        },
        goToEditProfile: function (t) {
          e("/mi-latina/".concat(t), {
            replace: !0
          });
        }
      };
    },
    n: function () {
      var e = n();
      return {
        goToProfiles: function () {
          e("/mi-latina", {
            replace: !0
          });
        },
        goToAvatarSelect: function (t, n, o) {
          e("/mi-latina/avatar", {
            state: {
              currentAvatar: t,
              returnTo: n,
              currentName: o
            }
          });
        }
      };
    },
    r: function () {
      var e = n();
      return {
        goToHome: function () {
          e("/home", {
            replace: !0
          });
        },
        goToCreateProfile: function () {
          e("/mi-latina/nuevo", {
            replace: !0
          });
        },
        goToEditProfile: function (t) {
          e("/mi-latina/".concat(t), {
            replace: !0
          });
        },
        goToAccountInfo: function () {
          e("/mi-latina/cuenta", {
            replace: !0
          });
        }
      };
    },
    t: function () {
      var e = n();
      return {
        goBackWithAvatar: function (t, n, o, a) {
          e(t, {
            replace: !0,
            state: {
              selectedAvatar: n,
              selectedAvatarUrl: a,
              currentName: o
            }
          });
        }
      };
    }
  }), {
    setters: [function (e) {
      n = e.U;
    }],
    execute: function () {}
  };
});