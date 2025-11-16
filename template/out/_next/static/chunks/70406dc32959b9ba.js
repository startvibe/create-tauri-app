;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  69442,
  (e, t, n) => {
    'use strict'
    ;(Object.defineProperty(n, '__esModule', { value: !0 }),
      Object.defineProperty(n, 'warnOnce', {
        enumerable: !0,
        get: function () {
          return r
        },
      }))
    let r = e => {}
  },
  65492,
  e => {
    'use strict'
    var t = e.i(38068),
      n = e.i(96388)
    function r({ children: r }) {
      let [c, i] = (0, n.useState)(!1)
      return ((0, n.useEffect)(() => {
        e.A(63109).then(() => {
          i(!0)
        })
      }, []),
      c)
        ? (0, t.jsx)(t.Fragment, { children: r })
        : (0, t.jsx)('div', { children: 'Loading...' })
    }
    e.s(['I18nProvider', () => r])
  },
  63109,
  e => {
    e.v(t =>
      Promise.all(
        ['static/chunks/1d6da1da7bf0bf9e.js', 'static/chunks/10a48841a311fc5c.js'].map(t => e.l(t))
      ).then(() => t(27255))
    )
  },
])
