(window._iconfont_svg_string_4040449 =
  '<svg><symbol id="icon-shanchu" viewBox="0 0 1024 1024"><path d="M513.875 139.15625c-206.15625 0-373.875 167.71875-373.875 373.875 0 206.25 167.71875 373.96875 373.875 373.96875s373.875-167.71875 373.875-373.875S720.03125 139.15625 513.875 139.15625z m158.0625 457.6875c20.4375 20.4375 20.4375 53.90625 0 74.34375s-53.90625 20.4375-74.34375 0L513.875 587.46875l-83.71875 83.71875c-20.4375 20.4375-53.90625 20.4375-74.34375 0s-20.4375-53.90625 0-74.34375l83.71875-83.71875-83.71875-83.71875c-20.4375-20.4375-20.4375-53.90625 0-74.34375 20.4375-20.4375 53.90625-20.4375 74.34375 0l83.71875 83.71875 83.71875-83.71875c20.4375-20.4375 53.90625-20.4375 74.34375 0 20.4375 20.4375 20.4375 53.90625 0 74.34375l-83.71875 83.71875 83.71875 83.71875z" fill="#d81e06" ></path></symbol><symbol id="icon-zengjia" viewBox="0 0 1024 1024"><path d="M459.01755715 459.01755715H353.09693432a53.11523078 53.11523078 0 1 0 0 105.9648857H459.01755715v105.96488572a53.11523078 53.11523078 0 1 0 105.9648857 0V564.98244285h105.96488572a53.11523078 53.11523078 0 1 0 0-105.9648857H564.98244285V353.09693432a53.11523078 53.11523078 0 1 0-105.9648857 0z m53.11523078 423.77101707a370.78857422 370.78857422 0 1 1 370.78857422-370.78857422 370.78857422 370.78857422 0 0 1-370.92136215 370.78857422z" fill="#1D85ED" ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName("script"))[t.length - 1],
      e = t.getAttribute("data-injectcss"),
      t = t.getAttribute("data-disable-injectsvg");
    if (!t) {
      var i,
        o,
        c,
        a,
        d,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (i = function () {
        var t,
          e = document.createElement("div");
        (e.innerHTML = n._iconfont_svg_string_4040449),
          (e = e.getElementsByTagName("svg")[0]) &&
            (e.setAttribute("aria-hidden", "true"),
            (e.style.position = "absolute"),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = "hidden"),
            (e = e),
            (t = document.body).firstChild
              ? s(e, t.firstChild)
              : t.appendChild(e));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener("DOMContentLoaded", o, !1), i();
              }),
              document.addEventListener("DOMContentLoaded", o, !1))
          : document.attachEvent &&
            ((c = i),
            (a = n.document),
            (d = !1),
            r(),
            (a.onreadystatechange = function () {
              "complete" == a.readyState &&
                ((a.onreadystatechange = null), l());
            }));
    }
    function l() {
      d || ((d = !0), c());
    }
    function r() {
      try {
        a.documentElement.doScroll("left");
      } catch (t) {
        return void setTimeout(r, 50);
      }
      l();
    }
  })(window);
