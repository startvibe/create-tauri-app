;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  33091,
  (e, t, r) => {
    t.exports = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  },
  29352,
  47569,
  31162,
  e => {
    'use strict'
    let t
    var r = e.i(96388)
    ;(e.i(33091), Object.create(null))
    let n = {},
      a = (e, t, r, a) => {
        ;(l(r) && n[r]) ||
          (l(r) && (n[r] = new Date()),
          ((e, t, r, n) => {
            let a = [r, { code: t, ...(n || {}) }]
            if (e?.services?.logger?.forward)
              return e.services.logger.forward(a, 'warn', 'react-i18next::', !0)
            ;(l(a[0]) && (a[0] = `react-i18next:: ${a[0]}`),
              e?.services?.logger?.warn
                ? e.services.logger.warn(...a)
                : console?.warn && console.warn(...a))
          })(e, t, r, a))
      },
      o = (e, t) => () => {
        if (e.isInitialized) t()
        else {
          let r = () => {
            ;(setTimeout(() => {
              e.off('initialized', r)
            }, 0),
              t())
          }
          e.on('initialized', r)
        }
      },
      s = (e, t, r) => {
        e.loadNamespaces(t, o(e, r))
      },
      i = (e, t, r, n) => {
        if ((l(r) && (r = [r]), e.options.preload && e.options.preload.indexOf(t) > -1))
          return s(e, r, n)
        ;(r.forEach(t => {
          0 > e.options.ns.indexOf(t) && e.options.ns.push(t)
        }),
          e.loadLanguages(t, o(e, n)))
      },
      l = e => 'string' == typeof e,
      u =
        /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
      c = {
        '&amp;': '&',
        '&#38;': '&',
        '&lt;': '<',
        '&#60;': '<',
        '&gt;': '>',
        '&#62;': '>',
        '&apos;': "'",
        '&#39;': "'",
        '&quot;': '"',
        '&#34;': '"',
        '&nbsp;': ' ',
        '&#160;': ' ',
        '&copy;': '©',
        '&#169;': '©',
        '&reg;': '®',
        '&#174;': '®',
        '&hellip;': '…',
        '&#8230;': '…',
        '&#x2F;': '/',
        '&#47;': '/',
      },
      d = e => c[e],
      f = {
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: !0,
        transWrapTextNodes: '',
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
        useSuspense: !0,
        unescape: e => e.replace(u, d),
      }
    e.s(
      [
        'initReactI18next',
        0,
        {
          type: '3rdParty',
          init(e) {
            ;(((e = {}) => {
              f = { ...f, ...e }
            })(e.options.react),
              (t = e))
          },
        },
      ],
      47569
    )
    let p = (0, r.createContext)()
    class h {
      constructor() {
        this.usedNamespaces = {}
      }
      addUsedNamespaces(e) {
        e.forEach(e => {
          this.usedNamespaces[e] || (this.usedNamespaces[e] = !0)
        })
      }
      getUsedNamespaces() {
        return Object.keys(this.usedNamespaces)
      }
    }
    ;(e.s(
      [
        'useTranslation',
        0,
        (e, n = {}) => {
          var o, u, c
          let d,
            { i18n: g } = n,
            { i18n: m, defaultNS: y } = (0, r.useContext)(p) || {},
            b = g || m || t
          if ((b && !b.reportNamespaces && (b.reportNamespaces = new h()), !b)) {
            a(
              b,
              'NO_I18NEXT_INSTANCE',
              'useTranslation: You will need to pass in an i18next instance by using initReactI18next'
            )
            let e = (e, t) => {
                let r
                return l(t)
                  ? t
                  : 'object' == typeof (r = t) && null !== r && l(t.defaultValue)
                    ? t.defaultValue
                    : Array.isArray(e)
                      ? e[e.length - 1]
                      : e
              },
              t = [e, {}, !1]
            return ((t.t = e), (t.i18n = {}), (t.ready = !1), t)
          }
          b.options.react?.wait &&
            a(
              b,
              'DEPRECATED_OPTION',
              'useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.'
            )
          let v = { ...f, ...b.options.react, ...n },
            { useSuspense: x, keyPrefix: N } = v,
            j = e || y || b.options?.defaultNS
          ;((j = l(j) ? [j] : j || ['translation']), b.reportNamespaces.addUsedNamespaces?.(j))
          let w =
              (b.isInitialized || b.initializedStoreOnce) &&
              j.every(e =>
                ((e, t, r = {}) =>
                  t.languages && t.languages.length
                    ? t.hasLoadedNamespace(e, {
                        lng: r.lng,
                        precheck: (t, n) => {
                          if (
                            r.bindI18n &&
                            r.bindI18n.indexOf('languageChanging') > -1 &&
                            t.services.backendConnector.backend &&
                            t.isLanguageChangingTo &&
                            !n(t.isLanguageChangingTo, e)
                          )
                            return !1
                        },
                      })
                    : (a(t, 'NO_LANGUAGES', 'i18n.languages were undefined or empty', {
                        languages: t.languages,
                      }),
                      !0))(e, b, v)
              ),
            E =
              ((o = n.lng || null),
              (u = 'fallback' === v.nsMode ? j : j[0]),
              (0, r.useCallback)(b.getFixedT(o, u, N), [b, o, u, N])),
            k = () => E,
            P = () => {
              let e, t
              return (
                (e = n.lng || null),
                (t = 'fallback' === v.nsMode ? j : j[0]),
                b.getFixedT(e, t, N)
              )
            },
            [O, C] = (0, r.useState)(k),
            T = j.join()
          n.lng && (T = `${n.lng}${T}`)
          let S =
              ((c = T),
              (d = (0, r.useRef)()),
              (0, r.useEffect)(() => {
                d.current = c
              }, [c, void 0]),
              d.current),
            _ = (0, r.useRef)(!0)
          ;((0, r.useEffect)(() => {
            let { bindI18n: e, bindI18nStore: t } = v
            ;((_.current = !0),
              w ||
                x ||
                (n.lng
                  ? i(b, n.lng, j, () => {
                      _.current && C(P)
                    })
                  : s(b, j, () => {
                      _.current && C(P)
                    })),
              w && S && S !== T && _.current && C(P))
            let r = () => {
              _.current && C(P)
            }
            return (
              e && b?.on(e, r),
              t && b?.store.on(t, r),
              () => {
                ;((_.current = !1),
                  b && e && e?.split(' ').forEach(e => b.off(e, r)),
                  t && b && t.split(' ').forEach(e => b.store.off(e, r)))
              }
            )
          }, [b, T]),
            (0, r.useEffect)(() => {
              _.current && w && C(k)
            }, [b, N, w]))
          let L = [O, b, w]
          if (((L.t = O), (L.i18n = b), (L.ready = w), w || (!w && !x))) return L
          throw new Promise(e => {
            n.lng ? i(b, n.lng, j, () => e()) : s(b, j, () => e())
          })
        },
      ],
      31162
    ),
      e.s([], 29352))
  },
  12718,
  (e, t, r) => {
    'use strict'
    Object.defineProperty(r, '__esModule', { value: !0 })
    var n = {
      assign: function () {
        return l
      },
      searchParamsToUrlQuery: function () {
        return o
      },
      urlQueryToSearchParams: function () {
        return i
      },
    }
    for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
    function o(e) {
      let t = {}
      for (let [r, n] of e.entries()) {
        let e = t[r]
        void 0 === e ? (t[r] = n) : Array.isArray(e) ? e.push(n) : (t[r] = [e, n])
      }
      return t
    }
    function s(e) {
      return 'string' == typeof e
        ? e
        : ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e
          ? ''
          : String(e)
    }
    function i(e) {
      let t = new URLSearchParams()
      for (let [r, n] of Object.entries(e))
        if (Array.isArray(n)) for (let e of n) t.append(r, s(e))
        else t.set(r, s(n))
      return t
    }
    function l(e, ...t) {
      for (let r of t) {
        for (let t of r.keys()) e.delete(t)
        for (let [t, n] of r.entries()) e.append(t, n)
      }
      return e
    }
  },
  38841,
  (e, t, r) => {
    'use strict'
    Object.defineProperty(r, '__esModule', { value: !0 })
    var n = {
      formatUrl: function () {
        return i
      },
      formatWithValidation: function () {
        return u
      },
      urlObjectKeys: function () {
        return l
      },
    }
    for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
    let o = e.r(97825)._(e.r(12718)),
      s = /https?|ftp|gopher|file/
    function i(e) {
      let { auth: t, hostname: r } = e,
        n = e.protocol || '',
        a = e.pathname || '',
        i = e.hash || '',
        l = e.query || '',
        u = !1
      ;((t = t ? encodeURIComponent(t).replace(/%3A/i, ':') + '@' : ''),
        e.host
          ? (u = t + e.host)
          : r && ((u = t + (~r.indexOf(':') ? `[${r}]` : r)), e.port && (u += ':' + e.port)),
        l && 'object' == typeof l && (l = String(o.urlQueryToSearchParams(l))))
      let c = e.search || (l && `?${l}`) || ''
      return (
        n && !n.endsWith(':') && (n += ':'),
        e.slashes || ((!n || s.test(n)) && !1 !== u)
          ? ((u = '//' + (u || '')), a && '/' !== a[0] && (a = '/' + a))
          : u || (u = ''),
        i && '#' !== i[0] && (i = '#' + i),
        c && '?' !== c[0] && (c = '?' + c),
        (a = a.replace(/[?#]/g, encodeURIComponent)),
        (c = c.replace('#', '%23')),
        `${n}${u}${a}${c}${i}`
      )
    }
    let l = [
      'auth',
      'hash',
      'host',
      'hostname',
      'href',
      'path',
      'pathname',
      'port',
      'protocol',
      'query',
      'search',
      'slashes',
    ]
    function u(e) {
      return i(e)
    }
  },
  9709,
  (e, t, r) => {
    'use strict'
    ;(Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'useMergedRef', {
        enumerable: !0,
        get: function () {
          return a
        },
      }))
    let n = e.r(96388)
    function a(e, t) {
      let r = (0, n.useRef)(null),
        a = (0, n.useRef)(null)
      return (0, n.useCallback)(
        n => {
          if (null === n) {
            let e = r.current
            e && ((r.current = null), e())
            let t = a.current
            t && ((a.current = null), t())
          } else (e && (r.current = o(e, n)), t && (a.current = o(t, n)))
        },
        [e, t]
      )
    }
    function o(e, t) {
      if ('function' != typeof e)
        return (
          (e.current = t),
          () => {
            e.current = null
          }
        )
      {
        let r = e(t)
        return 'function' == typeof r ? r : () => e(null)
      }
    }
    ;('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default))
  },
  30280,
  (e, t, r) => {
    'use strict'
    Object.defineProperty(r, '__esModule', { value: !0 })
    var n = {
      DecodeError: function () {
        return y
      },
      MiddlewareNotFoundError: function () {
        return N
      },
      MissingStaticPage: function () {
        return x
      },
      NormalizeError: function () {
        return b
      },
      PageNotFoundError: function () {
        return v
      },
      SP: function () {
        return g
      },
      ST: function () {
        return m
      },
      WEB_VITALS: function () {
        return o
      },
      execOnce: function () {
        return s
      },
      getDisplayName: function () {
        return d
      },
      getLocationOrigin: function () {
        return u
      },
      getURL: function () {
        return c
      },
      isAbsoluteUrl: function () {
        return l
      },
      isResSent: function () {
        return f
      },
      loadGetInitialProps: function () {
        return h
      },
      normalizeRepeatedSlashes: function () {
        return p
      },
      stringifyError: function () {
        return j
      },
    }
    for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
    let o = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']
    function s(e) {
      let t,
        r = !1
      return (...n) => (r || ((r = !0), (t = e(...n))), t)
    }
    let i = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
      l = e => i.test(e)
    function u() {
      let { protocol: e, hostname: t, port: r } = window.location
      return `${e}//${t}${r ? ':' + r : ''}`
    }
    function c() {
      let { href: e } = window.location,
        t = u()
      return e.substring(t.length)
    }
    function d(e) {
      return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown'
    }
    function f(e) {
      return e.finished || e.headersSent
    }
    function p(e) {
      let t = e.split('?')
      return (
        t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') + (t[1] ? `?${t.slice(1).join('?')}` : '')
      )
    }
    async function h(e, t) {
      let r = t.res || (t.ctx && t.ctx.res)
      if (!e.getInitialProps)
        return t.ctx && t.Component ? { pageProps: await h(t.Component, t.ctx) } : {}
      let n = await e.getInitialProps(t)
      if (r && f(r)) return n
      if (!n)
        throw Object.defineProperty(
          Error(
            `"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`
          ),
          '__NEXT_ERROR_CODE',
          { value: 'E394', enumerable: !1, configurable: !0 }
        )
      return n
    }
    let g = 'undefined' != typeof performance,
      m =
        g && ['mark', 'measure', 'getEntriesByName'].every(e => 'function' == typeof performance[e])
    class y extends Error {}
    class b extends Error {}
    class v extends Error {
      constructor(e) {
        ;(super(),
          (this.code = 'ENOENT'),
          (this.name = 'PageNotFoundError'),
          (this.message = `Cannot find module for page: ${e}`))
      }
    }
    class x extends Error {
      constructor(e, t) {
        ;(super(), (this.message = `Failed to load static file for page: ${e} ${t}`))
      }
    }
    class N extends Error {
      constructor() {
        ;(super(), (this.code = 'ENOENT'), (this.message = 'Cannot find the middleware module'))
      }
    }
    function j(e) {
      return JSON.stringify({ message: e.message, stack: e.stack })
    }
  },
  22710,
  (e, t, r) => {
    'use strict'
    ;(Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'isLocalURL', {
        enumerable: !0,
        get: function () {
          return o
        },
      }))
    let n = e.r(30280),
      a = e.r(19303)
    function o(e) {
      if (!(0, n.isAbsoluteUrl)(e)) return !0
      try {
        let t = (0, n.getLocationOrigin)(),
          r = new URL(e, t)
        return r.origin === t && (0, a.hasBasePath)(r.pathname)
      } catch (e) {
        return !1
      }
    }
  },
  25104,
  (e, t, r) => {
    'use strict'
    ;(Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'errorOnce', {
        enumerable: !0,
        get: function () {
          return n
        },
      }))
    let n = e => {}
  },
  60227,
  (e, t, r) => {
    'use strict'
    Object.defineProperty(r, '__esModule', { value: !0 })
    var n = {
      default: function () {
        return y
      },
      useLinkStatus: function () {
        return v
      },
    }
    for (var a in n) Object.defineProperty(r, a, { enumerable: !0, get: n[a] })
    let o = e.r(97825),
      s = e.r(38068),
      i = o._(e.r(96388)),
      l = e.r(38841),
      u = e.r(63186),
      c = e.r(9709),
      d = e.r(30280),
      f = e.r(3722)
    e.r(69442)
    let p = e.r(7664),
      h = e.r(22710),
      g = e.r(1813)
    function m(e) {
      return 'string' == typeof e ? e : (0, l.formatUrl)(e)
    }
    function y(t) {
      var r
      let n,
        a,
        o,
        [l, y] = (0, i.useOptimistic)(p.IDLE_LINK_STATUS),
        v = (0, i.useRef)(null),
        {
          href: x,
          as: N,
          children: j,
          prefetch: w = null,
          passHref: E,
          replace: k,
          shallow: P,
          scroll: O,
          onClick: C,
          onMouseEnter: T,
          onTouchStart: S,
          legacyBehavior: _ = !1,
          onNavigate: L,
          ref: A,
          unstable_dynamicOnHover: I,
          ...R
        } = t
      ;((n = j),
        _ &&
          ('string' == typeof n || 'number' == typeof n) &&
          (n = (0, s.jsx)('a', { children: n })))
      let M = i.default.useContext(u.AppRouterContext),
        $ = !1 !== w,
        U =
          !1 !== w
            ? null === (r = w) || 'auto' === r
              ? g.FetchStrategy.PPR
              : g.FetchStrategy.Full
            : g.FetchStrategy.PPR,
        { href: z, as: F } = i.default.useMemo(() => {
          let e = m(x)
          return { href: e, as: N ? m(N) : e }
        }, [x, N])
      if (_) {
        if (n?.$$typeof === Symbol.for('react.lazy'))
          throw Object.defineProperty(
            Error(
              "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."
            ),
            '__NEXT_ERROR_CODE',
            { value: 'E863', enumerable: !1, configurable: !0 }
          )
        a = i.default.Children.only(n)
      }
      let B = _ ? a && 'object' == typeof a && a.ref : A,
        D = i.default.useCallback(
          e => (
            null !== M && (v.current = (0, p.mountLinkInstance)(e, z, M, U, $, y)),
            () => {
              ;(v.current &&
                ((0, p.unmountLinkForCurrentNavigation)(v.current), (v.current = null)),
                (0, p.unmountPrefetchableInstance)(e))
            }
          ),
          [$, z, M, U, y]
        ),
        K = {
          ref: (0, c.useMergedRef)(D, B),
          onClick(t) {
            ;(_ || 'function' != typeof C || C(t),
              _ && a.props && 'function' == typeof a.props.onClick && a.props.onClick(t),
              !M ||
                t.defaultPrevented ||
                (function (t, r, n, a, o, s, l) {
                  if ('undefined' != typeof window) {
                    let u,
                      { nodeName: c } = t.currentTarget
                    if (
                      ('A' === c.toUpperCase() &&
                        (((u = t.currentTarget.getAttribute('target')) && '_self' !== u) ||
                          t.metaKey ||
                          t.ctrlKey ||
                          t.shiftKey ||
                          t.altKey ||
                          (t.nativeEvent && 2 === t.nativeEvent.which))) ||
                      t.currentTarget.hasAttribute('download')
                    )
                      return
                    if (!(0, h.isLocalURL)(r)) {
                      o && (t.preventDefault(), location.replace(r))
                      return
                    }
                    if ((t.preventDefault(), l)) {
                      let e = !1
                      if (
                        (l({
                          preventDefault: () => {
                            e = !0
                          },
                        }),
                        e)
                      )
                        return
                    }
                    let { dispatchNavigateAction: d } = e.r(63129)
                    i.default.startTransition(() => {
                      d(n || r, o ? 'replace' : 'push', s ?? !0, a.current)
                    })
                  }
                })(t, z, F, v, k, O, L))
          },
          onMouseEnter(e) {
            ;(_ || 'function' != typeof T || T(e),
              _ && a.props && 'function' == typeof a.props.onMouseEnter && a.props.onMouseEnter(e),
              M && $ && (0, p.onNavigationIntent)(e.currentTarget, !0 === I))
          },
          onTouchStart: function (e) {
            ;(_ || 'function' != typeof S || S(e),
              _ && a.props && 'function' == typeof a.props.onTouchStart && a.props.onTouchStart(e),
              M && $ && (0, p.onNavigationIntent)(e.currentTarget, !0 === I))
          },
        }
      return (
        (0, d.isAbsoluteUrl)(F)
          ? (K.href = F)
          : (_ && !E && ('a' !== a.type || 'href' in a.props)) || (K.href = (0, f.addBasePath)(F)),
        (o = _ ? i.default.cloneElement(a, K) : (0, s.jsx)('a', { ...R, ...K, children: n })),
        (0, s.jsx)(b.Provider, { value: l, children: o })
      )
    }
    e.r(25104)
    let b = (0, i.createContext)(p.IDLE_LINK_STATUS),
      v = () => (0, i.useContext)(b)
    ;('function' == typeof r.default || ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default))
  },
  98479,
  e => {
    'use strict'
    var t = e.i(38068),
      r = e.i(60227)
    e.i(29352)
    var n = e.i(31162),
      a = e.i(96388)
    let o = e => {
        let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) =>
          r ? r.toUpperCase() : t.toLowerCase()
        )
        return t.charAt(0).toUpperCase() + t.slice(1)
      },
      s = (...e) =>
        e
          .filter((e, t, r) => !!e && '' !== e.trim() && r.indexOf(e) === t)
          .join(' ')
          .trim()
    var i = {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    }
    let l = (0, a.forwardRef)(
        (
          {
            color: e = 'currentColor',
            size: t = 24,
            strokeWidth: r = 2,
            absoluteStrokeWidth: n,
            className: o = '',
            children: l,
            iconNode: u,
            ...c
          },
          d
        ) =>
          (0, a.createElement)(
            'svg',
            {
              ref: d,
              ...i,
              width: t,
              height: t,
              stroke: e,
              strokeWidth: n ? (24 * Number(r)) / Number(t) : r,
              className: s('lucide', o),
              ...(!l &&
                !(e => {
                  for (let t in e)
                    if (t.startsWith('aria-') || 'role' === t || 'title' === t) return !0
                })(c) && { 'aria-hidden': 'true' }),
              ...c,
            },
            [...u.map(([e, t]) => (0, a.createElement)(e, t)), ...(Array.isArray(l) ? l : [l])]
          )
      ),
      u = (e, t) => {
        let r = (0, a.forwardRef)(({ className: r, ...n }, i) =>
          (0, a.createElement)(l, {
            ref: i,
            iconNode: t,
            className: s(
              `lucide-${o(e)
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .toLowerCase()}`,
              `lucide-${e}`,
              r
            ),
            ...n,
          })
        )
        return ((r.displayName = o(e)), r)
      },
      c = u('moon', [
        [
          'path',
          {
            d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
            key: 'kfwtm',
          },
        ],
      ]),
      d = u('sun', [
        ['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
        ['path', { d: 'M12 2v2', key: 'tus03m' }],
        ['path', { d: 'M12 20v2', key: '1lh1kg' }],
        ['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
        ['path', { d: 'm17.66 17.66 1.41 1.41', key: 'ptbguv' }],
        ['path', { d: 'M2 12h2', key: '1t8f8n' }],
        ['path', { d: 'M20 12h2', key: '1q8mjw' }],
        ['path', { d: 'm6.34 17.66-1.41 1.41', key: '1m8zz5' }],
        ['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
      ])
    function f() {
      let [e, r] = a.useState(!1)
      ;(a.useEffect(() => {
        let e = localStorage.getItem('theme'),
          t = window.matchMedia('(prefers-color-scheme: dark)').matches,
          a = 'dark' === e || (!e && t)
        ;(r(a), n(a))
      }, []),
        a.useEffect(() => {
          n(e)
        }, [e]))
      let n = e => {
        let t = document.documentElement
        ;(e
          ? (t.classList.add('dark'), t.setAttribute('data-theme', 'dark'))
          : (t.classList.remove('dark'), t.setAttribute('data-theme', 'light')),
          localStorage.setItem('theme', e ? 'dark' : 'light'))
      }
      return (0, t.jsx)('button', {
        onClick: () => {
          r(e => !e)
        },
        className: 'btn btn-ghost btn-circle theme-controller',
        'aria-label': '切换主题',
        'data-theme': e ? 'dark' : 'light',
        children: e
          ? (0, t.jsx)(d, { className: 'h-5 w-5' })
          : (0, t.jsx)(c, { className: 'h-5 w-5' }),
      })
    }
    let p = u('globe', [
      ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
      ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', key: '13o1zl' }],
      ['path', { d: 'M2 12h20', key: '9i4pu4' }],
    ])
    function h({ className: e }) {
      let { i18n: r, t: a } = (0, n.useTranslation)('common'),
        o = [
          { code: 'zh-CN', name: a('language.chinese'), flag: '🇨🇳' },
          { code: 'en-US', name: a('language.english'), flag: '🇺🇸' },
        ]
      return (0, t.jsxs)('div', {
        className: `dropdown dropdown-end ${e}`,
        children: [
          (0, t.jsx)('div', {
            tabIndex: 0,
            role: 'button',
            className: 'btn btn-ghost btn-circle',
            'aria-label': a('language.toggle'),
            title: a('language.toggle'),
            children: (0, t.jsx)(p, { className: 'h-5 w-5' }),
          }),
          (0, t.jsx)('ul', {
            tabIndex: 0,
            className: 'dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow',
            children: o.map(e =>
              (0, t.jsx)(
                'li',
                {
                  children: (0, t.jsxs)('button', {
                    onClick: () => {
                      var t
                      return ((t = e.code), void r.changeLanguage(t))
                    },
                    className: `flex items-center gap-2 ${r.language === e.code ? 'active' : ''}`,
                    children: [
                      (0, t.jsx)('span', { className: 'text-lg', children: e.flag }),
                      (0, t.jsx)('span', { className: 'flex-1', children: e.name }),
                      r.language === e.code &&
                        (0, t.jsx)('span', { className: 'text-primary', children: '✓' }),
                    ],
                  }),
                },
                e.code
              )
            ),
          }),
        ],
      })
    }
    function g({ children: e }) {
      let { t: a } = (0, n.useTranslation)('common')
      return (0, t.jsxs)('div', {
        className: 'min-h-screen bg-base-200',
        children: [
          (0, t.jsx)('nav', {
            className: 'navbar bg-base-100 shadow',
            children: (0, t.jsxs)('div', {
              className: 'container mx-auto',
              children: [
                (0, t.jsx)('div', {
                  className: 'flex-1',
                  children: (0, t.jsx)(r.default, {
                    href: '/',
                    className: 'btn btn-ghost text-xl',
                    children: a('nav.brand'),
                  }),
                }),
                (0, t.jsxs)('div', {
                  className: 'flex-none gap-2',
                  children: [
                    (0, t.jsx)(r.default, {
                      href: '/',
                      className: 'btn btn-ghost',
                      children: a('nav.home'),
                    }),
                    (0, t.jsx)(r.default, {
                      href: '/dashboard',
                      className: 'btn btn-ghost',
                      children: a('nav.dashboard'),
                    }),
                    (0, t.jsx)(r.default, {
                      href: '/users',
                      className: 'btn btn-ghost',
                      children: a('nav.users'),
                    }),
                    (0, t.jsx)(r.default, {
                      href: '/settings',
                      className: 'btn btn-ghost',
                      children: a('nav.settings'),
                    }),
                    (0, t.jsx)(h, {}),
                    (0, t.jsx)(f, {}),
                  ],
                }),
              ],
            }),
          }),
          (0, t.jsx)('main', { className: 'container mx-auto p-4', children: e }),
        ],
      })
    }
    e.s(['AppLayout', () => g], 98479)
  },
])
