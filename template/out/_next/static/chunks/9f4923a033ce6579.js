;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  65492,
  t => {
    'use strict'
    var e = t.i(38068),
      s = t.i(96388)
    function c({ children: c }) {
      let [i, n] = (0, s.useState)(!1)
      return ((0, s.useEffect)(() => {
        t.A(63109).then(() => {
          n(!0)
        })
      }, []),
      i)
        ? (0, e.jsx)(e.Fragment, { children: c })
        : (0, e.jsx)('div', { children: 'Loading...' })
    }
    t.s(['I18nProvider', () => c])
  },
  63109,
  t => {
    t.v(e =>
      Promise.all(
        ['static/chunks/1d6da1da7bf0bf9e.js', 'static/chunks/10a48841a311fc5c.js'].map(e => t.l(e))
      ).then(() => e(27255))
    )
  },
])
