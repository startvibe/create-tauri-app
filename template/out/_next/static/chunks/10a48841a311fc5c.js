;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  27255,
  e => {
    'use strict'
    ;(e.i(69621), e.i(29352))
    var t = e.i(47569)
    let i = e => 'string' == typeof e,
      s = () => {
        let e,
          t,
          i = new Promise((i, s) => {
            ;((e = i), (t = s))
          })
        return ((i.resolve = e), (i.reject = t), i)
      },
      o = e => (null == e ? '' : '' + e),
      r = /###/g,
      a = e => (e && e.indexOf('###') > -1 ? e.replace(r, '.') : e),
      n = e => !e || i(e),
      l = (e, t, s) => {
        let o = i(t) ? t.split('.') : t,
          r = 0
        for (; r < o.length - 1; ) {
          if (n(e)) return {}
          let t = a(o[r])
          ;(!e[t] && s && (e[t] = new s()),
            (e = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : {}),
            ++r)
        }
        return n(e) ? {} : { obj: e, k: a(o[r]) }
      },
      h = (e, t, i) => {
        let { obj: s, k: o } = l(e, t, Object)
        if (void 0 !== s || 1 === t.length) {
          s[o] = i
          return
        }
        let r = t[t.length - 1],
          a = t.slice(0, t.length - 1),
          n = l(e, a, Object)
        for (; void 0 === n.obj && a.length; )
          ((r = `${a[a.length - 1]}.${r}`),
            (n = l(e, (a = a.slice(0, a.length - 1)), Object)),
            n?.obj && void 0 !== n.obj[`${n.k}.${r}`] && (n.obj = void 0))
        n.obj[`${n.k}.${r}`] = i
      },
      u = (e, t) => {
        let { obj: i, k: s } = l(e, t)
        if (i && Object.prototype.hasOwnProperty.call(i, s)) return i[s]
      },
      p = (e, t, s) => {
        for (let o in t)
          '__proto__' !== o &&
            'constructor' !== o &&
            (o in e
              ? i(e[o]) || e[o] instanceof String || i(t[o]) || t[o] instanceof String
                ? s && (e[o] = t[o])
                : p(e[o], t[o], s)
              : (e[o] = t[o]))
        return e
      }
    var g = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' }
    let d = e => (i(e) ? e.replace(/[&<>"'\/]/g, e => g[e]) : e),
      c = [' ', ',', '?', '!', ';'],
      f = new (class {
        constructor(e) {
          ;((this.capacity = e), (this.regExpMap = new Map()), (this.regExpQueue = []))
        }
        getRegExp(e) {
          let t = this.regExpMap.get(e)
          if (void 0 !== t) return t
          let i = new RegExp(e)
          return (
            this.regExpQueue.length === this.capacity &&
              this.regExpMap.delete(this.regExpQueue.shift()),
            this.regExpMap.set(e, i),
            this.regExpQueue.push(e),
            i
          )
        }
      })(20),
      m = (e, t, i = '.') => {
        if (!e) return
        if (e[t]) {
          if (!Object.prototype.hasOwnProperty.call(e, t)) return
          return e[t]
        }
        let s = t.split(i),
          o = e
        for (let e = 0; e < s.length; ) {
          let t
          if (!o || 'object' != typeof o) return
          let r = ''
          for (let a = e; a < s.length; ++a)
            if ((a !== e && (r += i), (r += s[a]), void 0 !== (t = o[r]))) {
              if (['string', 'number', 'boolean'].indexOf(typeof t) > -1 && a < s.length - 1)
                continue
              e += a - e + 1
              break
            }
          o = t
        }
        return o
      },
      y = e => e?.replace('_', '-'),
      x = {
        type: 'logger',
        log(e) {
          this.output('log', e)
        },
        warn(e) {
          this.output('warn', e)
        },
        error(e) {
          this.output('error', e)
        },
        output(e, t) {
          console?.[e]?.apply?.(console, t)
        },
      }
    class v {
      constructor(e, t = {}) {
        this.init(e, t)
      }
      init(e, t = {}) {
        ;((this.prefix = t.prefix || 'i18next:'),
          (this.logger = e || x),
          (this.options = t),
          (this.debug = t.debug))
      }
      log(...e) {
        return this.forward(e, 'log', '', !0)
      }
      warn(...e) {
        return this.forward(e, 'warn', '', !0)
      }
      error(...e) {
        return this.forward(e, 'error', '')
      }
      deprecate(...e) {
        return this.forward(e, 'warn', 'WARNING DEPRECATED: ', !0)
      }
      forward(e, t, s, o) {
        return o && !this.debug
          ? null
          : (i(e[0]) && (e[0] = `${s}${this.prefix} ${e[0]}`), this.logger[t](e))
      }
      create(e) {
        return new v(this.logger, { ...{ prefix: `${this.prefix}:${e}:` }, ...this.options })
      }
      clone(e) {
        return (((e = e || this.options).prefix = e.prefix || this.prefix), new v(this.logger, e))
      }
    }
    var b = new v()
    class S {
      constructor() {
        this.observers = {}
      }
      on(e, t) {
        return (
          e.split(' ').forEach(e => {
            this.observers[e] || (this.observers[e] = new Map())
            let i = this.observers[e].get(t) || 0
            this.observers[e].set(t, i + 1)
          }),
          this
        )
      }
      off(e, t) {
        if (this.observers[e]) {
          if (!t) return void delete this.observers[e]
          this.observers[e].delete(t)
        }
      }
      emit(e, ...t) {
        ;(this.observers[e] &&
          Array.from(this.observers[e].entries()).forEach(([e, i]) => {
            for (let s = 0; s < i; s++) e(...t)
          }),
          this.observers['*'] &&
            Array.from(this.observers['*'].entries()).forEach(([i, s]) => {
              for (let o = 0; o < s; o++) i.apply(i, [e, ...t])
            }))
      }
    }
    class k extends S {
      constructor(e, t = { ns: ['translation'], defaultNS: 'translation' }) {
        ;(super(),
          (this.data = e || {}),
          (this.options = t),
          void 0 === this.options.keySeparator && (this.options.keySeparator = '.'),
          void 0 === this.options.ignoreJSONStructure && (this.options.ignoreJSONStructure = !0))
      }
      addNamespaces(e) {
        0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
      }
      removeNamespaces(e) {
        let t = this.options.ns.indexOf(e)
        t > -1 && this.options.ns.splice(t, 1)
      }
      getResource(e, t, s, o = {}) {
        let r,
          a = void 0 !== o.keySeparator ? o.keySeparator : this.options.keySeparator,
          n =
            void 0 !== o.ignoreJSONStructure
              ? o.ignoreJSONStructure
              : this.options.ignoreJSONStructure
        e.indexOf('.') > -1
          ? (r = e.split('.'))
          : ((r = [e, t]),
            s && (Array.isArray(s) ? r.push(...s) : i(s) && a ? r.push(...s.split(a)) : r.push(s)))
        let l = u(this.data, r)
        return (!l &&
          !t &&
          !s &&
          e.indexOf('.') > -1 &&
          ((e = r[0]), (t = r[1]), (s = r.slice(2).join('.'))),
        !l && n && i(s))
          ? m(this.data?.[e]?.[t], s, a)
          : l
      }
      addResource(e, t, i, s, o = { silent: !1 }) {
        let r = void 0 !== o.keySeparator ? o.keySeparator : this.options.keySeparator,
          a = [e, t]
        ;(i && (a = a.concat(r ? i.split(r) : i)),
          e.indexOf('.') > -1 && ((a = e.split('.')), (s = t), (t = a[1])),
          this.addNamespaces(t),
          h(this.data, a, s),
          o.silent || this.emit('added', e, t, i, s))
      }
      addResources(e, t, s, o = { silent: !1 }) {
        for (let o in s)
          (i(s[o]) || Array.isArray(s[o])) && this.addResource(e, t, o, s[o], { silent: !0 })
        o.silent || this.emit('added', e, t, s)
      }
      addResourceBundle(e, t, i, s, o, r = { silent: !1, skipCopy: !1 }) {
        let a = [e, t]
        ;(e.indexOf('.') > -1 && ((a = e.split('.')), (s = i), (i = t), (t = a[1])),
          this.addNamespaces(t))
        let n = u(this.data, a) || {}
        ;(r.skipCopy || (i = JSON.parse(JSON.stringify(i))),
          s ? p(n, i, o) : (n = { ...n, ...i }),
          h(this.data, a, n),
          r.silent || this.emit('added', e, t, i))
      }
      removeResourceBundle(e, t) {
        ;(this.hasResourceBundle(e, t) && delete this.data[e][t],
          this.removeNamespaces(t),
          this.emit('removed', e, t))
      }
      hasResourceBundle(e, t) {
        return void 0 !== this.getResource(e, t)
      }
      getResourceBundle(e, t) {
        return (t || (t = this.options.defaultNS), this.getResource(e, t))
      }
      getDataByLanguage(e) {
        return this.data[e]
      }
      hasLanguageSomeTranslations(e) {
        let t = this.getDataByLanguage(e)
        return !!((t && Object.keys(t)) || []).find(e => t[e] && Object.keys(t[e]).length > 0)
      }
      toJSON() {
        return this.data
      }
    }
    var w = {
      processors: {},
      addPostProcessor(e) {
        this.processors[e.name] = e
      },
      handle(e, t, i, s, o) {
        return (
          e.forEach(e => {
            t = this.processors[e]?.process(t, i, s, o) ?? t
          }),
          t
        )
      },
    }
    let L = Symbol('i18next/PATH_KEY')
    function O(e, t) {
      let i,
        s,
        o,
        { [L]: r } = e(
          ((s = []),
          ((o = Object.create(null)).get = (e, t) =>
            (i?.revoke?.(), t === L) ? s : (s.push(t), (i = Proxy.revocable(e, o)).proxy)),
          Proxy.revocable(Object.create(null), o).proxy)
        )
      return r.join(t?.keySeparator ?? '.')
    }
    let $ = {},
      C = e => !i(e) && 'boolean' != typeof e && 'number' != typeof e
    class R extends S {
      constructor(e, t = {}) {
        ;(super(),
          ((e, t, i) => {
            e.forEach(e => {
              t[e] && (i[e] = t[e])
            })
          })(
            [
              'resourceStore',
              'languageUtils',
              'pluralResolver',
              'interpolator',
              'backendConnector',
              'i18nFormat',
              'utils',
            ],
            e,
            this
          ),
          (this.options = t),
          void 0 === this.options.keySeparator && (this.options.keySeparator = '.'),
          (this.logger = b.create('translator')))
      }
      changeLanguage(e) {
        e && (this.language = e)
      }
      exists(e, t = { interpolation: {} }) {
        let i = { ...t }
        if (null == e) return !1
        let s = this.resolve(e, i)
        return s?.res !== void 0
      }
      extractFromKey(e, t) {
        let s = void 0 !== t.nsSeparator ? t.nsSeparator : this.options.nsSeparator
        void 0 === s && (s = ':')
        let o = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator,
          r = t.ns || this.options.defaultNS || [],
          a = s && e.indexOf(s) > -1,
          n =
            !this.options.userDefinedKeySeparator &&
            !t.keySeparator &&
            !this.options.userDefinedNsSeparator &&
            !t.nsSeparator &&
            !((e, t, i) => {
              ;((t = t || ''), (i = i || ''))
              let s = c.filter(e => 0 > t.indexOf(e) && 0 > i.indexOf(e))
              if (0 === s.length) return !0
              let o = f.getRegExp(`(${s.map(e => ('?' === e ? '\\?' : e)).join('|')})`),
                r = !o.test(e)
              if (!r) {
                let t = e.indexOf(i)
                t > 0 && !o.test(e.substring(0, t)) && (r = !0)
              }
              return r
            })(e, s, o)
        if (a && !n) {
          let t = e.match(this.interpolator.nestingRegexp)
          if (t && t.length > 0) return { key: e, namespaces: i(r) ? [r] : r }
          let a = e.split(s)
          ;((s !== o || (s === o && this.options.ns.indexOf(a[0]) > -1)) && (r = a.shift()),
            (e = a.join(o)))
        }
        return { key: e, namespaces: i(r) ? [r] : r }
      }
      translate(e, t, s) {
        let o = 'object' == typeof t ? { ...t } : t
        if (
          ('object' != typeof o &&
            this.options.overloadTranslationOptionHandler &&
            (o = this.options.overloadTranslationOptionHandler(arguments)),
          'object' == typeof o && (o = { ...o }),
          o || (o = {}),
          null == e)
        )
          return ''
        ;('function' == typeof e && (e = O(e, { ...this.options, ...o })),
          Array.isArray(e) || (e = [String(e)]))
        let r = void 0 !== o.returnDetails ? o.returnDetails : this.options.returnDetails,
          a = void 0 !== o.keySeparator ? o.keySeparator : this.options.keySeparator,
          { key: n, namespaces: l } = this.extractFromKey(e[e.length - 1], o),
          h = l[l.length - 1],
          u = void 0 !== o.nsSeparator ? o.nsSeparator : this.options.nsSeparator
        void 0 === u && (u = ':')
        let p = o.lng || this.language,
          g = o.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode
        if (p?.toLowerCase() === 'cimode')
          return g
            ? r
              ? {
                  res: `${h}${u}${n}`,
                  usedKey: n,
                  exactUsedKey: n,
                  usedLng: p,
                  usedNS: h,
                  usedParams: this.getUsedParamsDetails(o),
                }
              : `${h}${u}${n}`
            : r
              ? {
                  res: n,
                  usedKey: n,
                  exactUsedKey: n,
                  usedLng: p,
                  usedNS: h,
                  usedParams: this.getUsedParamsDetails(o),
                }
              : n
        let d = this.resolve(e, o),
          c = d?.res,
          f = d?.usedKey || n,
          m = d?.exactUsedKey || n,
          y = void 0 !== o.joinArrays ? o.joinArrays : this.options.joinArrays,
          x = !this.i18nFormat || this.i18nFormat.handleAsObject,
          v = void 0 !== o.count && !i(o.count),
          b = R.hasDefaultValue(o),
          S = v ? this.pluralResolver.getSuffix(p, o.count, o) : '',
          k = o.ordinal && v ? this.pluralResolver.getSuffix(p, o.count, { ordinal: !1 }) : '',
          w = v && !o.ordinal && 0 === o.count,
          L =
            (w && o[`defaultValue${this.options.pluralSeparator}zero`]) ||
            o[`defaultValue${S}`] ||
            o[`defaultValue${k}`] ||
            o.defaultValue,
          $ = c
        x && !c && b && ($ = L)
        let P = C($),
          N = Object.prototype.toString.apply($)
        if (
          x &&
          $ &&
          P &&
          0 > ['[object Number]', '[object Function]', '[object RegExp]'].indexOf(N) &&
          !(i(y) && Array.isArray($))
        ) {
          if (!o.returnObjects && !this.options.returnObjects) {
            this.options.returnedObjectHandler ||
              this.logger.warn('accessing an object - but returnObjects options is not enabled!')
            let e = this.options.returnedObjectHandler
              ? this.options.returnedObjectHandler(f, $, { ...o, ns: l })
              : `key '${n} (${this.language})' returned an object instead of string.`
            return r ? ((d.res = e), (d.usedParams = this.getUsedParamsDetails(o)), d) : e
          }
          if (a) {
            let e = Array.isArray($),
              t = e ? [] : {},
              i = e ? m : f
            for (let e in $)
              if (Object.prototype.hasOwnProperty.call($, e)) {
                let s = `${i}${a}${e}`
                ;(b && !c
                  ? (t[e] = this.translate(s, {
                      ...o,
                      defaultValue: C(L) ? L[e] : void 0,
                      ...{ joinArrays: !1, ns: l },
                    }))
                  : (t[e] = this.translate(s, { ...o, joinArrays: !1, ns: l })),
                  t[e] === s && (t[e] = $[e]))
              }
            c = t
          }
        } else if (x && i(y) && Array.isArray(c))
          (c = c.join(y)) && (c = this.extendTranslation(c, e, o, s))
        else {
          let t = !1,
            i = !1
          ;(!this.isValidLookup(c) && b && ((t = !0), (c = L)),
            this.isValidLookup(c) || ((i = !0), (c = n)))
          let r =
              (o.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && i
                ? void 0
                : c,
            l = b && L !== c && this.options.updateMissing
          if (i || t || l) {
            if ((this.logger.log(l ? 'updateKey' : 'missingKey', p, h, n, l ? L : c), a)) {
              let e = this.resolve(n, { ...o, keySeparator: !1 })
              e &&
                e.res &&
                this.logger.warn(
                  'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.'
                )
            }
            let e = [],
              t = this.languageUtils.getFallbackCodes(
                this.options.fallbackLng,
                o.lng || this.language
              )
            if ('fallback' === this.options.saveMissingTo && t && t[0])
              for (let i = 0; i < t.length; i++) e.push(t[i])
            else
              'all' === this.options.saveMissingTo
                ? (e = this.languageUtils.toResolveHierarchy(o.lng || this.language))
                : e.push(o.lng || this.language)
            let i = (e, t, i) => {
              let s = b && i !== c ? i : r
              ;(this.options.missingKeyHandler
                ? this.options.missingKeyHandler(e, h, t, s, l, o)
                : this.backendConnector?.saveMissing &&
                  this.backendConnector.saveMissing(e, h, t, s, l, o),
                this.emit('missingKey', e, h, t, c))
            }
            this.options.saveMissing &&
              (this.options.saveMissingPlurals && v
                ? e.forEach(e => {
                    let t = this.pluralResolver.getSuffixes(e, o)
                    ;(w &&
                      o[`defaultValue${this.options.pluralSeparator}zero`] &&
                      0 > t.indexOf(`${this.options.pluralSeparator}zero`) &&
                      t.push(`${this.options.pluralSeparator}zero`),
                      t.forEach(t => {
                        i([e], n + t, o[`defaultValue${t}`] || L)
                      }))
                  })
                : i(e, n, L))
          }
          ;((c = this.extendTranslation(c, e, o, d, s)),
            i && c === n && this.options.appendNamespaceToMissingKey && (c = `${h}${u}${n}`),
            (i || t) &&
              this.options.parseMissingKeyHandler &&
              (c = this.options.parseMissingKeyHandler(
                this.options.appendNamespaceToMissingKey ? `${h}${u}${n}` : n,
                t ? c : void 0,
                o
              )))
        }
        return r ? ((d.res = c), (d.usedParams = this.getUsedParamsDetails(o)), d) : c
      }
      extendTranslation(e, t, s, o, r) {
        if (this.i18nFormat?.parse)
          e = this.i18nFormat.parse(
            e,
            { ...this.options.interpolation.defaultVariables, ...s },
            s.lng || this.language || o.usedLng,
            o.usedNS,
            o.usedKey,
            { resolved: o }
          )
        else if (!s.skipInterpolation) {
          let a
          s.interpolation &&
            this.interpolator.init({
              ...s,
              ...{ interpolation: { ...this.options.interpolation, ...s.interpolation } },
            })
          let n =
            i(e) &&
            (s?.interpolation?.skipOnVariables !== void 0
              ? s.interpolation.skipOnVariables
              : this.options.interpolation.skipOnVariables)
          if (n) {
            let t = e.match(this.interpolator.nestingRegexp)
            a = t && t.length
          }
          let l = s.replace && !i(s.replace) ? s.replace : s
          if (
            (this.options.interpolation.defaultVariables &&
              (l = { ...this.options.interpolation.defaultVariables, ...l }),
            (e = this.interpolator.interpolate(e, l, s.lng || this.language || o.usedLng, s)),
            n)
          ) {
            let t = e.match(this.interpolator.nestingRegexp)
            a < (t && t.length) && (s.nest = !1)
          }
          ;(!s.lng && o && o.res && (s.lng = this.language || o.usedLng),
            !1 !== s.nest &&
              (e = this.interpolator.nest(
                e,
                (...e) =>
                  r?.[0] !== e[0] || s.context
                    ? this.translate(...e, t)
                    : (this.logger.warn(
                        `It seems you are nesting recursively key: ${e[0]} in key: ${t[0]}`
                      ),
                      null),
                s
              )),
            s.interpolation && this.interpolator.reset())
        }
        let a = s.postProcess || this.options.postProcess,
          n = i(a) ? [a] : a
        return (
          null != e &&
            n?.length &&
            !1 !== s.applyPostProcessor &&
            (e = w.handle(
              n,
              e,
              t,
              this.options && this.options.postProcessPassResolved
                ? { i18nResolved: { ...o, usedParams: this.getUsedParamsDetails(s) }, ...s }
                : s,
              this
            )),
          e
        )
      }
      resolve(e, t = {}) {
        let s, o, r, a, n
        return (
          i(e) && (e = [e]),
          e.forEach(e => {
            if (this.isValidLookup(s)) return
            let l = this.extractFromKey(e, t),
              h = l.key
            o = h
            let u = l.namespaces
            this.options.fallbackNS && (u = u.concat(this.options.fallbackNS))
            let p = void 0 !== t.count && !i(t.count),
              g = p && !t.ordinal && 0 === t.count,
              d =
                void 0 !== t.context &&
                (i(t.context) || 'number' == typeof t.context) &&
                '' !== t.context,
              c = t.lngs
                ? t.lngs
                : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng)
            u.forEach(e => {
              this.isValidLookup(s) ||
                ((n = e),
                !$[`${c[0]}-${e}`] &&
                  this.utils?.hasLoadedNamespace &&
                  !this.utils?.hasLoadedNamespace(n) &&
                  (($[`${c[0]}-${e}`] = !0),
                  this.logger.warn(
                    `key "${o}" for languages "${c.join(', ')}" won't get resolved as namespace "${n}" was not yet loaded`,
                    'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
                  )),
                c.forEach(i => {
                  let o
                  if (this.isValidLookup(s)) return
                  a = i
                  let n = [h]
                  if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(n, h, i, e, t)
                  else {
                    let e
                    p && (e = this.pluralResolver.getSuffix(i, t.count, t))
                    let s = `${this.options.pluralSeparator}zero`,
                      o = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`
                    if (
                      (p &&
                        (t.ordinal &&
                          0 === e.indexOf(o) &&
                          n.push(h + e.replace(o, this.options.pluralSeparator)),
                        n.push(h + e),
                        g && n.push(h + s)),
                      d)
                    ) {
                      let i = `${h}${this.options.contextSeparator || '_'}${t.context}`
                      ;(n.push(i),
                        p &&
                          (t.ordinal &&
                            0 === e.indexOf(o) &&
                            n.push(i + e.replace(o, this.options.pluralSeparator)),
                          n.push(i + e),
                          g && n.push(i + s)))
                    }
                  }
                  for (; (o = n.pop()); )
                    this.isValidLookup(s) || ((r = o), (s = this.getResource(i, e, o, t)))
                }))
            })
          }),
          { res: s, usedKey: o, exactUsedKey: r, usedLng: a, usedNS: n }
        )
      }
      isValidLookup(e) {
        return (
          void 0 !== e &&
          !(!this.options.returnNull && null === e) &&
          !(!this.options.returnEmptyString && '' === e)
        )
      }
      getResource(e, t, i, s = {}) {
        return this.i18nFormat?.getResource
          ? this.i18nFormat.getResource(e, t, i, s)
          : this.resourceStore.getResource(e, t, i, s)
      }
      getUsedParamsDetails(e = {}) {
        let t = e.replace && !i(e.replace),
          s = t ? e.replace : e
        if (
          (t && void 0 !== e.count && (s.count = e.count),
          this.options.interpolation.defaultVariables &&
            (s = { ...this.options.interpolation.defaultVariables, ...s }),
          !t)
        )
          for (let e of ((s = { ...s }),
          [
            'defaultValue',
            'ordinal',
            'context',
            'replace',
            'lng',
            'lngs',
            'fallbackLng',
            'ns',
            'keySeparator',
            'nsSeparator',
            'returnObjects',
            'returnDetails',
            'joinArrays',
            'postProcess',
            'interpolation',
          ]))
            delete s[e]
        return s
      }
      static hasDefaultValue(e) {
        let t = 'defaultValue'
        for (let i in e)
          if (
            Object.prototype.hasOwnProperty.call(e, i) &&
            t === i.substring(0, t.length) &&
            void 0 !== e[i]
          )
            return !0
        return !1
      }
    }
    class P {
      constructor(e) {
        ;((this.options = e),
          (this.supportedLngs = this.options.supportedLngs || !1),
          (this.logger = b.create('languageUtils')))
      }
      getScriptPartFromCode(e) {
        if (!(e = y(e)) || 0 > e.indexOf('-')) return null
        let t = e.split('-')
        return 2 === t.length || (t.pop(), 'x' === t[t.length - 1].toLowerCase())
          ? null
          : this.formatLanguageCode(t.join('-'))
      }
      getLanguagePartFromCode(e) {
        if (!(e = y(e)) || 0 > e.indexOf('-')) return e
        let t = e.split('-')
        return this.formatLanguageCode(t[0])
      }
      formatLanguageCode(e) {
        if (i(e) && e.indexOf('-') > -1) {
          let t
          try {
            t = Intl.getCanonicalLocales(e)[0]
          } catch (e) {}
          return (t && this.options.lowerCaseLng && (t = t.toLowerCase()), t)
            ? t
            : this.options.lowerCaseLng
              ? e.toLowerCase()
              : e
        }
        return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
      }
      isSupportedCode(e) {
        return (
          ('languageOnly' === this.options.load || this.options.nonExplicitSupportedLngs) &&
            (e = this.getLanguagePartFromCode(e)),
          !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
        )
      }
      getBestMatchFromCodes(e) {
        let t
        return e
          ? (e.forEach(e => {
              if (t) return
              let i = this.formatLanguageCode(e)
              ;(!this.options.supportedLngs || this.isSupportedCode(i)) && (t = i)
            }),
            !t &&
              this.options.supportedLngs &&
              e.forEach(e => {
                if (t) return
                let i = this.getScriptPartFromCode(e)
                if (this.isSupportedCode(i)) return (t = i)
                let s = this.getLanguagePartFromCode(e)
                if (this.isSupportedCode(s)) return (t = s)
                t = this.options.supportedLngs.find(e => {
                  if (
                    e === s ||
                    (!(0 > e.indexOf('-') && 0 > s.indexOf('-')) &&
                      ((e.indexOf('-') > 0 &&
                        0 > s.indexOf('-') &&
                        e.substring(0, e.indexOf('-')) === s) ||
                        (0 === e.indexOf(s) && s.length > 1)))
                  )
                    return e
                })
              }),
            t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
            t)
          : null
      }
      getFallbackCodes(e, t) {
        if (!e) return []
        if (('function' == typeof e && (e = e(t)), i(e) && (e = [e]), Array.isArray(e))) return e
        if (!t) return e.default || []
        let s = e[t]
        return (
          s || (s = e[this.getScriptPartFromCode(t)]),
          s || (s = e[this.formatLanguageCode(t)]),
          s || (s = e[this.getLanguagePartFromCode(t)]),
          s || (s = e.default),
          s || []
        )
      }
      toResolveHierarchy(e, t) {
        let s = this.getFallbackCodes((!1 === t ? [] : t) || this.options.fallbackLng || [], e),
          o = [],
          r = e => {
            e &&
              (this.isSupportedCode(e)
                ? o.push(e)
                : this.logger.warn(`rejecting language code not found in supportedLngs: ${e}`))
          }
        return (
          i(e) && (e.indexOf('-') > -1 || e.indexOf('_') > -1)
            ? ('languageOnly' !== this.options.load && r(this.formatLanguageCode(e)),
              'languageOnly' !== this.options.load &&
                'currentOnly' !== this.options.load &&
                r(this.getScriptPartFromCode(e)),
              'currentOnly' !== this.options.load && r(this.getLanguagePartFromCode(e)))
            : i(e) && r(this.formatLanguageCode(e)),
          s.forEach(e => {
            0 > o.indexOf(e) && r(this.formatLanguageCode(e))
          }),
          o
        )
      }
    }
    let N = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
      j = {
        select: e => (1 === e ? 'one' : 'other'),
        resolvedOptions: () => ({ pluralCategories: ['one', 'other'] }),
      }
    class E {
      constructor(e, t = {}) {
        ;((this.languageUtils = e),
          (this.options = t),
          (this.logger = b.create('pluralResolver')),
          (this.pluralRulesCache = {}))
      }
      addRule(e, t) {
        this.rules[e] = t
      }
      clearCache() {
        this.pluralRulesCache = {}
      }
      getRule(e, t = {}) {
        let i,
          s = y('dev' === e ? 'en' : e),
          o = t.ordinal ? 'ordinal' : 'cardinal',
          r = JSON.stringify({ cleanedCode: s, type: o })
        if (r in this.pluralRulesCache) return this.pluralRulesCache[r]
        try {
          i = new Intl.PluralRules(s, { type: o })
        } catch (o) {
          if (!Intl) return (this.logger.error('No Intl support, please use an Intl polyfill!'), j)
          if (!e.match(/-|_/)) return j
          let s = this.languageUtils.getLanguagePartFromCode(e)
          i = this.getRule(s, t)
        }
        return ((this.pluralRulesCache[r] = i), i)
      }
      needsPlural(e, t = {}) {
        let i = this.getRule(e, t)
        return (i || (i = this.getRule('dev', t)), i?.resolvedOptions().pluralCategories.length > 1)
      }
      getPluralFormsOfKey(e, t, i = {}) {
        return this.getSuffixes(e, i).map(e => `${t}${e}`)
      }
      getSuffixes(e, t = {}) {
        let i = this.getRule(e, t)
        return (i || (i = this.getRule('dev', t)), i)
          ? i
              .resolvedOptions()
              .pluralCategories.sort((e, t) => N[e] - N[t])
              .map(
                e =>
                  `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ''}${e}`
              )
          : []
      }
      getSuffix(e, t, i = {}) {
        let s = this.getRule(e, i)
        return s
          ? `${this.options.prepend}${i.ordinal ? `ordinal${this.options.prepend}` : ''}${s.select(t)}`
          : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix('dev', t, i))
      }
    }
    let D = (e, t, s, o = '.', r = !0) => {
      let a,
        n = void 0 !== (a = u(e, s)) ? a : u(t, s)
      return (!n && r && i(s) && void 0 === (n = m(e, s, o)) && (n = m(t, s, o)), n)
    }
    class I {
      constructor(e = {}) {
        ;((this.logger = b.create('interpolator')),
          (this.options = e),
          (this.format = e?.interpolation?.format || (e => e)),
          this.init(e))
      }
      init(e = {}) {
        e.interpolation || (e.interpolation = { escapeValue: !0 })
        let {
          escape: t,
          escapeValue: i,
          useRawValueToEscape: s,
          prefix: o,
          prefixEscaped: r,
          suffix: a,
          suffixEscaped: n,
          formatSeparator: l,
          unescapeSuffix: h,
          unescapePrefix: u,
          nestingPrefix: p,
          nestingPrefixEscaped: g,
          nestingSuffix: c,
          nestingSuffixEscaped: f,
          nestingOptionsSeparator: m,
          maxReplaces: y,
          alwaysFormat: x,
        } = e.interpolation
        ;((this.escape = void 0 !== t ? t : d),
          (this.escapeValue = void 0 === i || i),
          (this.useRawValueToEscape = void 0 !== s && s),
          (this.prefix = o ? o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') : r || '{{'),
          (this.suffix = a ? a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') : n || '}}'),
          (this.formatSeparator = l || ','),
          (this.unescapePrefix = h ? '' : u || '-'),
          (this.unescapeSuffix = this.unescapePrefix ? '' : h || ''),
          (this.nestingPrefix = p
            ? p.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
            : g || '$t('.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')),
          (this.nestingSuffix = c
            ? c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
            : f || ')'.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')),
          (this.nestingOptionsSeparator = m || ','),
          (this.maxReplaces = y || 1e3),
          (this.alwaysFormat = void 0 !== x && x),
          this.resetRegExp())
      }
      reset() {
        this.options && this.init(this.options)
      }
      resetRegExp() {
        let e = (e, t) => (e?.source === t ? ((e.lastIndex = 0), e) : RegExp(t, 'g'))
        ;((this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
          (this.regexpUnescape = e(
            this.regexpUnescape,
            `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`
          )),
          (this.nestingRegexp = e(
            this.nestingRegexp,
            `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`
          )))
      }
      interpolate(e, t, s, r) {
        let a,
          n,
          l,
          h =
            (this.options &&
              this.options.interpolation &&
              this.options.interpolation.defaultVariables) ||
            {},
          u = e => {
            if (0 > e.indexOf(this.formatSeparator)) {
              let i = D(t, h, e, this.options.keySeparator, this.options.ignoreJSONStructure)
              return this.alwaysFormat
                ? this.format(i, void 0, s, { ...r, ...t, interpolationkey: e })
                : i
            }
            let i = e.split(this.formatSeparator),
              o = i.shift().trim(),
              a = i.join(this.formatSeparator).trim()
            return this.format(
              D(t, h, o, this.options.keySeparator, this.options.ignoreJSONStructure),
              a,
              s,
              { ...r, ...t, interpolationkey: o }
            )
          }
        this.resetRegExp()
        let p = r?.missingInterpolationHandler || this.options.missingInterpolationHandler,
          g =
            r?.interpolation?.skipOnVariables !== void 0
              ? r.interpolation.skipOnVariables
              : this.options.interpolation.skipOnVariables
        return (
          [
            { regex: this.regexpUnescape, safeValue: e => e.replace(/\$/g, '$$$$') },
            {
              regex: this.regexp,
              safeValue: e =>
                this.escapeValue ? this.escape(e).replace(/\$/g, '$$$$') : e.replace(/\$/g, '$$$$'),
            },
          ].forEach(t => {
            for (l = 0; (a = t.regex.exec(e)); ) {
              let s = a[1].trim()
              if (void 0 === (n = u(s)))
                if ('function' == typeof p) {
                  let t = p(e, a, r)
                  n = i(t) ? t : ''
                } else if (r && Object.prototype.hasOwnProperty.call(r, s)) n = ''
                else if (g) {
                  n = a[0]
                  continue
                } else
                  (this.logger.warn(`missed to pass in variable ${s} for interpolating ${e}`),
                    (n = ''))
              else i(n) || this.useRawValueToEscape || (n = o(n))
              let h = t.safeValue(n)
              if (
                ((e = e.replace(a[0], h)),
                g
                  ? ((t.regex.lastIndex += n.length), (t.regex.lastIndex -= a[0].length))
                  : (t.regex.lastIndex = 0),
                ++l >= this.maxReplaces)
              )
                break
            }
          }),
          e
        )
      }
      nest(e, t, s = {}) {
        let r,
          a,
          n,
          l = (e, t) => {
            let i = this.nestingOptionsSeparator
            if (0 > e.indexOf(i)) return e
            let s = e.split(RegExp(`${i}[ ]*{`)),
              o = `{${s[1]}`
            e = s[0]
            let r = (o = this.interpolate(o, n)).match(/'/g),
              a = o.match(/"/g)
            ;(((r?.length ?? 0) % 2 != 0 || a) && a.length % 2 == 0) || (o = o.replace(/'/g, '"'))
            try {
              ;((n = JSON.parse(o)), t && (n = { ...t, ...n }))
            } catch (t) {
              return (
                this.logger.warn(`failed parsing options string in nesting for key ${e}`, t),
                `${e}${i}${o}`
              )
            }
            return (
              n.defaultValue && n.defaultValue.indexOf(this.prefix) > -1 && delete n.defaultValue,
              e
            )
          }
        for (; (r = this.nestingRegexp.exec(e)); ) {
          let h = []
          ;(((n = (n = { ...s }).replace && !i(n.replace) ? n.replace : n).applyPostProcessor = !1),
            delete n.defaultValue)
          let u = /{.*}/.test(r[1]) ? r[1].lastIndexOf('}') + 1 : r[1].indexOf(this.formatSeparator)
          if (
            (-1 !== u &&
              ((h = r[1]
                .slice(u)
                .split(this.formatSeparator)
                .map(e => e.trim())
                .filter(Boolean)),
              (r[1] = r[1].slice(0, u))),
            (a = t(l.call(this, r[1].trim(), n), n)) && r[0] === e && !i(a))
          )
            return a
          ;(i(a) || (a = o(a)),
            a || (this.logger.warn(`missed to resolve ${r[1]} for nesting ${e}`), (a = '')),
            h.length &&
              (a = h.reduce(
                (e, t) => this.format(e, t, s.lng, { ...s, interpolationkey: r[1].trim() }),
                a.trim()
              )),
            (e = e.replace(r[0], a)),
            (this.regexp.lastIndex = 0))
        }
        return e
      }
    }
    let F = e => {
        let t = {}
        return (i, s, o) => {
          let r = o
          o &&
            o.interpolationkey &&
            o.formatParams &&
            o.formatParams[o.interpolationkey] &&
            o[o.interpolationkey] &&
            (r = { ...r, [o.interpolationkey]: void 0 })
          let a = s + JSON.stringify(r),
            n = t[a]
          return (n || ((n = e(y(s), o)), (t[a] = n)), n(i))
        }
      },
      T = e => (t, i, s) => e(y(i), s)(t)
    class A {
      constructor(e = {}) {
        ;((this.logger = b.create('formatter')), (this.options = e), this.init(e))
      }
      init(e, t = { interpolation: {} }) {
        this.formatSeparator = t.interpolation.formatSeparator || ','
        let i = t.cacheInBuiltFormats ? F : T
        this.formats = {
          number: i((e, t) => {
            let i = new Intl.NumberFormat(e, { ...t })
            return e => i.format(e)
          }),
          currency: i((e, t) => {
            let i = new Intl.NumberFormat(e, { ...t, style: 'currency' })
            return e => i.format(e)
          }),
          datetime: i((e, t) => {
            let i = new Intl.DateTimeFormat(e, { ...t })
            return e => i.format(e)
          }),
          relativetime: i((e, t) => {
            let i = new Intl.RelativeTimeFormat(e, { ...t })
            return e => i.format(e, t.range || 'day')
          }),
          list: i((e, t) => {
            let i = new Intl.ListFormat(e, { ...t })
            return e => i.format(e)
          }),
        }
      }
      add(e, t) {
        this.formats[e.toLowerCase().trim()] = t
      }
      addCached(e, t) {
        this.formats[e.toLowerCase().trim()] = F(t)
      }
      format(e, t, i, s = {}) {
        let o = t.split(this.formatSeparator)
        if (
          o.length > 1 &&
          o[0].indexOf('(') > 1 &&
          0 > o[0].indexOf(')') &&
          o.find(e => e.indexOf(')') > -1)
        ) {
          let e = o.findIndex(e => e.indexOf(')') > -1)
          o[0] = [o[0], ...o.splice(1, e)].join(this.formatSeparator)
        }
        return o.reduce((e, t) => {
          let { formatName: o, formatOptions: r } = (e => {
            let t = e.toLowerCase().trim(),
              i = {}
            if (e.indexOf('(') > -1) {
              let s = e.split('(')
              t = s[0].toLowerCase().trim()
              let o = s[1].substring(0, s[1].length - 1)
              'currency' === t && 0 > o.indexOf(':')
                ? i.currency || (i.currency = o.trim())
                : 'relativetime' === t && 0 > o.indexOf(':')
                  ? i.range || (i.range = o.trim())
                  : o.split(';').forEach(e => {
                      if (e) {
                        let [t, ...s] = e.split(':'),
                          o = s
                            .join(':')
                            .trim()
                            .replace(/^'+|'+$/g, ''),
                          r = t.trim()
                        ;(i[r] || (i[r] = o),
                          'false' === o && (i[r] = !1),
                          'true' === o && (i[r] = !0),
                          isNaN(o) || (i[r] = parseInt(o, 10)))
                      }
                    })
            }
            return { formatName: t, formatOptions: i }
          })(t)
          if (this.formats[o]) {
            let t = e
            try {
              let a = s?.formatParams?.[s.interpolationkey] || {},
                n = a.locale || a.lng || s.locale || s.lng || i
              t = this.formats[o](e, n, { ...r, ...s, ...a })
            } catch (e) {
              this.logger.warn(e)
            }
            return t
          }
          return (this.logger.warn(`there was no format function for ${o}`), e)
        }, e)
      }
    }
    class V extends S {
      constructor(e, t, i, s = {}) {
        ;(super(),
          (this.backend = e),
          (this.store = t),
          (this.services = i),
          (this.languageUtils = i.languageUtils),
          (this.options = s),
          (this.logger = b.create('backendConnector')),
          (this.waitingReads = []),
          (this.maxParallelReads = s.maxParallelReads || 10),
          (this.readingCalls = 0),
          (this.maxRetries = s.maxRetries >= 0 ? s.maxRetries : 5),
          (this.retryTimeout = s.retryTimeout >= 1 ? s.retryTimeout : 350),
          (this.state = {}),
          (this.queue = []),
          this.backend?.init?.(i, s.backend, s))
      }
      queueLoad(e, t, i, s) {
        let o = {},
          r = {},
          a = {},
          n = {}
        return (
          e.forEach(e => {
            let s = !0
            ;(t.forEach(t => {
              let a = `${e}|${t}`
              !i.reload && this.store.hasResourceBundle(e, t)
                ? (this.state[a] = 2)
                : this.state[a] < 0 ||
                  (1 === this.state[a]
                    ? void 0 === r[a] && (r[a] = !0)
                    : ((this.state[a] = 1),
                      (s = !1),
                      void 0 === r[a] && (r[a] = !0),
                      void 0 === o[a] && (o[a] = !0),
                      void 0 === n[t] && (n[t] = !0)))
            }),
              s || (a[e] = !0))
          }),
          (Object.keys(o).length || Object.keys(r).length) &&
            this.queue.push({
              pending: r,
              pendingCount: Object.keys(r).length,
              loaded: {},
              errors: [],
              callback: s,
            }),
          {
            toLoad: Object.keys(o),
            pending: Object.keys(r),
            toLoadLanguages: Object.keys(a),
            toLoadNamespaces: Object.keys(n),
          }
        )
      }
      loaded(e, t, i) {
        let s = e.split('|'),
          o = s[0],
          r = s[1]
        ;(t && this.emit('failedLoading', o, r, t),
          !t && i && this.store.addResourceBundle(o, r, i, void 0, void 0, { skipCopy: !0 }),
          (this.state[e] = t ? -1 : 2),
          t && i && (this.state[e] = 0))
        let a = {}
        ;(this.queue.forEach(i => {
          ;(((e, t, i, s) => {
            let { obj: o, k: r } = l(e, t, Object)
            ;((o[r] = o[r] || []), o[r].push(i))
          })(i.loaded, [o], r),
            void 0 !== i.pending[e] && (delete i.pending[e], i.pendingCount--),
            t && i.errors.push(t),
            0 !== i.pendingCount ||
              i.done ||
              (Object.keys(i.loaded).forEach(e => {
                a[e] || (a[e] = {})
                let t = i.loaded[e]
                t.length &&
                  t.forEach(t => {
                    void 0 === a[e][t] && (a[e][t] = !0)
                  })
              }),
              (i.done = !0),
              i.errors.length ? i.callback(i.errors) : i.callback()))
        }),
          this.emit('loaded', a),
          (this.queue = this.queue.filter(e => !e.done)))
      }
      read(e, t, i, s = 0, o = this.retryTimeout, r) {
        if (!e.length) return r(null, {})
        if (this.readingCalls >= this.maxParallelReads)
          return void this.waitingReads.push({
            lng: e,
            ns: t,
            fcName: i,
            tried: s,
            wait: o,
            callback: r,
          })
        this.readingCalls++
        let a = (a, n) => {
            if ((this.readingCalls--, this.waitingReads.length > 0)) {
              let e = this.waitingReads.shift()
              this.read(e.lng, e.ns, e.fcName, e.tried, e.wait, e.callback)
            }
            a && n && s < this.maxRetries
              ? setTimeout(() => {
                  this.read.call(this, e, t, i, s + 1, 2 * o, r)
                }, o)
              : r(a, n)
          },
          n = this.backend[i].bind(this.backend)
        if (2 === n.length) {
          try {
            let i = n(e, t)
            i && 'function' == typeof i.then ? i.then(e => a(null, e)).catch(a) : a(null, i)
          } catch (e) {
            a(e)
          }
          return
        }
        return n(e, t, a)
      }
      prepareLoading(e, t, s = {}, o) {
        if (!this.backend)
          return (
            this.logger.warn('No backend was added via i18next.use. Will not load resources.'),
            o && o()
          )
        ;(i(e) && (e = this.languageUtils.toResolveHierarchy(e)), i(t) && (t = [t]))
        let r = this.queueLoad(e, t, s, o)
        if (!r.toLoad.length) return (r.pending.length || o(), null)
        r.toLoad.forEach(e => {
          this.loadOne(e)
        })
      }
      load(e, t, i) {
        this.prepareLoading(e, t, {}, i)
      }
      reload(e, t, i) {
        this.prepareLoading(e, t, { reload: !0 }, i)
      }
      loadOne(e, t = '') {
        let i = e.split('|'),
          s = i[0],
          o = i[1]
        this.read(s, o, 'read', void 0, void 0, (i, r) => {
          ;(i && this.logger.warn(`${t}loading namespace ${o} for language ${s} failed`, i),
            !i && r && this.logger.log(`${t}loaded namespace ${o} for language ${s}`, r),
            this.loaded(e, i, r))
        })
      }
      saveMissing(e, t, i, s, o, r = {}, a = () => {}) {
        if (
          this.services?.utils?.hasLoadedNamespace &&
          !this.services?.utils?.hasLoadedNamespace(t)
        )
          return void this.logger.warn(
            `did not save key "${i}" as the namespace "${t}" was not yet loaded`,
            'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!'
          )
        if (null != i && '' !== i) {
          if (this.backend?.create) {
            let n = { ...r, isUpdate: o },
              l = this.backend.create.bind(this.backend)
            if (l.length < 6)
              try {
                let o
                ;(o = 5 === l.length ? l(e, t, i, s, n) : l(e, t, i, s)) &&
                'function' == typeof o.then
                  ? o.then(e => a(null, e)).catch(a)
                  : a(null, o)
              } catch (e) {
                a(e)
              }
            else l(e, t, i, s, a, n)
          }
          e && e[0] && this.store.addResource(e[0], t, i, s)
        }
      }
    }
    let U = () => ({
        debug: !1,
        initAsync: !0,
        ns: ['translation'],
        defaultNS: ['translation'],
        fallbackLng: ['dev'],
        fallbackNS: !1,
        supportedLngs: !1,
        nonExplicitSupportedLngs: !1,
        load: 'all',
        preload: !1,
        simplifyPluralSuffix: !0,
        keySeparator: '.',
        nsSeparator: ':',
        pluralSeparator: '_',
        contextSeparator: '_',
        partialBundledLanguages: !1,
        saveMissing: !1,
        updateMissing: !1,
        saveMissingTo: 'fallback',
        saveMissingPlurals: !0,
        missingKeyHandler: !1,
        missingInterpolationHandler: !1,
        postProcess: !1,
        postProcessPassResolved: !1,
        returnNull: !1,
        returnEmptyString: !0,
        returnObjects: !1,
        joinArrays: !1,
        returnedObjectHandler: !1,
        parseMissingKeyHandler: !1,
        appendNamespaceToMissingKey: !1,
        appendNamespaceToCIMode: !1,
        overloadTranslationOptionHandler: e => {
          let t = {}
          if (
            ('object' == typeof e[1] && (t = e[1]),
            i(e[1]) && (t.defaultValue = e[1]),
            i(e[2]) && (t.tDescription = e[2]),
            'object' == typeof e[2] || 'object' == typeof e[3])
          ) {
            let i = e[3] || e[2]
            Object.keys(i).forEach(e => {
              t[e] = i[e]
            })
          }
          return t
        },
        interpolation: {
          escapeValue: !0,
          format: e => e,
          prefix: '{{',
          suffix: '}}',
          formatSeparator: ',',
          unescapePrefix: '-',
          nestingPrefix: '$t(',
          nestingSuffix: ')',
          nestingOptionsSeparator: ',',
          maxReplaces: 1e3,
          skipOnVariables: !0,
        },
        cacheInBuiltFormats: !0,
      }),
      K = e => (
        i(e.ns) && (e.ns = [e.ns]),
        i(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]),
        i(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]),
        e.supportedLngs?.indexOf?.('cimode') < 0 &&
          (e.supportedLngs = e.supportedLngs.concat(['cimode'])),
        'boolean' == typeof e.initImmediate && (e.initAsync = e.initImmediate),
        e
      ),
      M = () => {}
    class z extends S {
      constructor(e = {}, t) {
        if (
          (super(),
          (this.options = K(e)),
          (this.services = {}),
          (this.logger = b),
          (this.modules = { external: [] }),
          (e => {
            Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(t => {
              'function' == typeof e[t] && (e[t] = e[t].bind(e))
            })
          })(this),
          t && !this.isInitialized && !e.isClone)
        ) {
          if (!this.options.initAsync) return (this.init(e, t), this)
          setTimeout(() => {
            this.init(e, t)
          }, 0)
        }
      }
      init(e = {}, t) {
        ;((this.isInitializing = !0),
          'function' == typeof e && ((t = e), (e = {})),
          null == e.defaultNS &&
            e.ns &&
            (i(e.ns)
              ? (e.defaultNS = e.ns)
              : 0 > e.ns.indexOf('translation') && (e.defaultNS = e.ns[0])))
        let o = U()
        ;((this.options = { ...o, ...this.options, ...K(e) }),
          (this.options.interpolation = { ...o.interpolation, ...this.options.interpolation }),
          void 0 !== e.keySeparator && (this.options.userDefinedKeySeparator = e.keySeparator),
          void 0 !== e.nsSeparator && (this.options.userDefinedNsSeparator = e.nsSeparator))
        let r = e => (e ? ('function' == typeof e ? new e() : e) : null)
        if (!this.options.isClone) {
          let e
          ;(this.modules.logger
            ? b.init(r(this.modules.logger), this.options)
            : b.init(null, this.options),
            (e = this.modules.formatter ? this.modules.formatter : A))
          let t = new P(this.options)
          this.store = new k(this.options.resources, this.options)
          let i = this.services
          ;((i.logger = b),
            (i.resourceStore = this.store),
            (i.languageUtils = t),
            (i.pluralResolver = new E(t, {
              prepend: this.options.pluralSeparator,
              simplifyPluralSuffix: this.options.simplifyPluralSuffix,
            })),
            this.options.interpolation.format &&
              this.options.interpolation.format !== o.interpolation.format &&
              this.logger.deprecate(
                'init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting'
              ),
            e &&
              (!this.options.interpolation.format ||
                this.options.interpolation.format === o.interpolation.format) &&
              ((i.formatter = r(e)),
              i.formatter.init && i.formatter.init(i, this.options),
              (this.options.interpolation.format = i.formatter.format.bind(i.formatter))),
            (i.interpolator = new I(this.options)),
            (i.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
            (i.backendConnector = new V(r(this.modules.backend), i.resourceStore, i, this.options)),
            i.backendConnector.on('*', (e, ...t) => {
              this.emit(e, ...t)
            }),
            this.modules.languageDetector &&
              ((i.languageDetector = r(this.modules.languageDetector)),
              i.languageDetector.init &&
                i.languageDetector.init(i, this.options.detection, this.options)),
            this.modules.i18nFormat &&
              ((i.i18nFormat = r(this.modules.i18nFormat)),
              i.i18nFormat.init && i.i18nFormat.init(this)),
            (this.translator = new R(this.services, this.options)),
            this.translator.on('*', (e, ...t) => {
              this.emit(e, ...t)
            }),
            this.modules.external.forEach(e => {
              e.init && e.init(this)
            }))
        }
        if (
          ((this.format = this.options.interpolation.format),
          t || (t = M),
          this.options.fallbackLng && !this.services.languageDetector && !this.options.lng)
        ) {
          let e = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng)
          e.length > 0 && 'dev' !== e[0] && (this.options.lng = e[0])
        }
        ;(this.services.languageDetector ||
          this.options.lng ||
          this.logger.warn('init: no languageDetector is used and no lng is defined'),
          ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'].forEach(
            e => {
              this[e] = (...t) => this.store[e](...t)
            }
          ),
          ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'].forEach(
            e => {
              this[e] = (...t) => (this.store[e](...t), this)
            }
          ))
        let a = s(),
          n = () => {
            let e = (e, i) => {
              ;((this.isInitializing = !1),
                this.isInitialized &&
                  !this.initializedStoreOnce &&
                  this.logger.warn(
                    'init: i18next is already initialized. You should call init just once!'
                  ),
                (this.isInitialized = !0),
                this.options.isClone || this.logger.log('initialized', this.options),
                this.emit('initialized', this.options),
                a.resolve(i),
                t(e, i))
            }
            if (this.languages && !this.isInitialized) return e(null, this.t.bind(this))
            this.changeLanguage(this.options.lng, e)
          }
        return (this.options.resources || !this.options.initAsync ? n() : setTimeout(n, 0), a)
      }
      loadResources(e, t = M) {
        let s = t,
          o = i(e) ? e : this.language
        if (
          ('function' == typeof e && (s = e),
          !this.options.resources || this.options.partialBundledLanguages)
        ) {
          if (
            o?.toLowerCase() === 'cimode' &&
            (!this.options.preload || 0 === this.options.preload.length)
          )
            return s()
          let e = [],
            t = t => {
              t &&
                'cimode' !== t &&
                this.services.languageUtils.toResolveHierarchy(t).forEach(t => {
                  'cimode' !== t && 0 > e.indexOf(t) && e.push(t)
                })
            }
          ;(o
            ? t(o)
            : this.services.languageUtils
                .getFallbackCodes(this.options.fallbackLng)
                .forEach(e => t(e)),
            this.options.preload?.forEach?.(e => t(e)),
            this.services.backendConnector.load(e, this.options.ns, e => {
              ;(e ||
                this.resolvedLanguage ||
                !this.language ||
                this.setResolvedLanguage(this.language),
                s(e))
            }))
        } else s(null)
      }
      reloadResources(e, t, i) {
        let o = s()
        return (
          'function' == typeof e && ((i = e), (e = void 0)),
          'function' == typeof t && ((i = t), (t = void 0)),
          e || (e = this.languages),
          t || (t = this.options.ns),
          i || (i = M),
          this.services.backendConnector.reload(e, t, e => {
            ;(o.resolve(), i(e))
          }),
          o
        )
      }
      use(e) {
        if (!e)
          throw Error(
            'You are passing an undefined module! Please check the object you are passing to i18next.use()'
          )
        if (!e.type)
          throw Error(
            'You are passing a wrong module! Please check the object you are passing to i18next.use()'
          )
        return (
          'backend' === e.type && (this.modules.backend = e),
          ('logger' === e.type || (e.log && e.warn && e.error)) && (this.modules.logger = e),
          'languageDetector' === e.type && (this.modules.languageDetector = e),
          'i18nFormat' === e.type && (this.modules.i18nFormat = e),
          'postProcessor' === e.type && w.addPostProcessor(e),
          'formatter' === e.type && (this.modules.formatter = e),
          '3rdParty' === e.type && this.modules.external.push(e),
          this
        )
      }
      setResolvedLanguage(e) {
        if (e && this.languages && !(['cimode', 'dev'].indexOf(e) > -1)) {
          for (let e = 0; e < this.languages.length; e++) {
            let t = this.languages[e]
            if (!(['cimode', 'dev'].indexOf(t) > -1) && this.store.hasLanguageSomeTranslations(t)) {
              this.resolvedLanguage = t
              break
            }
          }
          !this.resolvedLanguage &&
            0 > this.languages.indexOf(e) &&
            this.store.hasLanguageSomeTranslations(e) &&
            ((this.resolvedLanguage = e), this.languages.unshift(e))
        }
      }
      changeLanguage(e, t) {
        this.isLanguageChangingTo = e
        let o = s()
        this.emit('languageChanging', e)
        let r = e => {
            ;((this.language = e),
              (this.languages = this.services.languageUtils.toResolveHierarchy(e)),
              (this.resolvedLanguage = void 0),
              this.setResolvedLanguage(e))
          },
          a = (i, s) => {
            ;(s
              ? this.isLanguageChangingTo === e &&
                (r(s),
                this.translator.changeLanguage(s),
                (this.isLanguageChangingTo = void 0),
                this.emit('languageChanged', s),
                this.logger.log('languageChanged', s))
              : (this.isLanguageChangingTo = void 0),
              o.resolve((...e) => this.t(...e)),
              t && t(i, (...e) => this.t(...e)))
          },
          n = t => {
            e || t || !this.services.languageDetector || (t = [])
            let s = i(t) ? t : t && t[0],
              o = this.store.hasLanguageSomeTranslations(s)
                ? s
                : this.services.languageUtils.getBestMatchFromCodes(i(t) ? [t] : t)
            ;(o &&
              (this.language || r(o),
              this.translator.language || this.translator.changeLanguage(o),
              this.services.languageDetector?.cacheUserLanguage?.(o)),
              this.loadResources(o, e => {
                a(e, o)
              }))
          }
        return (
          e || !this.services.languageDetector || this.services.languageDetector.async
            ? !e && this.services.languageDetector && this.services.languageDetector.async
              ? 0 === this.services.languageDetector.detect.length
                ? this.services.languageDetector.detect().then(n)
                : this.services.languageDetector.detect(n)
              : n(e)
            : n(this.services.languageDetector.detect()),
          o
        )
      }
      getFixedT(e, t, s) {
        let o = (e, t, ...i) => {
          let r, a
          ;(((r =
            'object' != typeof t
              ? this.options.overloadTranslationOptionHandler([e, t].concat(i))
              : { ...t }).lng = r.lng || o.lng),
            (r.lngs = r.lngs || o.lngs),
            (r.ns = r.ns || o.ns),
            '' !== r.keyPrefix && (r.keyPrefix = r.keyPrefix || s || o.keyPrefix))
          let n = this.options.keySeparator || '.'
          return (
            r.keyPrefix && Array.isArray(e)
              ? (a = e.map(
                  e => (
                    'function' == typeof e && (e = O(e, { ...this.options, ...t })),
                    `${r.keyPrefix}${n}${e}`
                  )
                ))
              : ('function' == typeof e && (e = O(e, { ...this.options, ...t })),
                (a = r.keyPrefix ? `${r.keyPrefix}${n}${e}` : e)),
            this.t(a, r)
          )
        }
        return (i(e) ? (o.lng = e) : (o.lngs = e), (o.ns = t), (o.keyPrefix = s), o)
      }
      t(...e) {
        return this.translator?.translate(...e)
      }
      exists(...e) {
        return this.translator?.exists(...e)
      }
      setDefaultNamespace(e) {
        this.options.defaultNS = e
      }
      hasLoadedNamespace(e, t = {}) {
        if (!this.isInitialized)
          return (
            this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages),
            !1
          )
        if (!this.languages || !this.languages.length)
          return (
            this.logger.warn(
              'hasLoadedNamespace: i18n.languages were undefined or empty',
              this.languages
            ),
            !1
          )
        let i = t.lng || this.resolvedLanguage || this.languages[0],
          s = !!this.options && this.options.fallbackLng,
          o = this.languages[this.languages.length - 1]
        if ('cimode' === i.toLowerCase()) return !0
        let r = (e, t) => {
          let i = this.services.backendConnector.state[`${e}|${t}`]
          return -1 === i || 0 === i || 2 === i
        }
        if (t.precheck) {
          let e = t.precheck(this, r)
          if (void 0 !== e) return e
        }
        return !!(
          this.hasResourceBundle(i, e) ||
          !this.services.backendConnector.backend ||
          (this.options.resources && !this.options.partialBundledLanguages) ||
          (r(i, e) && (!s || r(o, e)))
        )
      }
      loadNamespaces(e, t) {
        let o = s()
        return this.options.ns
          ? (i(e) && (e = [e]),
            e.forEach(e => {
              0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
            }),
            this.loadResources(e => {
              ;(o.resolve(), t && t(e))
            }),
            o)
          : (t && t(), Promise.resolve())
      }
      loadLanguages(e, t) {
        let o = s()
        i(e) && (e = [e])
        let r = this.options.preload || [],
          a = e.filter(e => 0 > r.indexOf(e) && this.services.languageUtils.isSupportedCode(e))
        return a.length
          ? ((this.options.preload = r.concat(a)),
            this.loadResources(e => {
              ;(o.resolve(), t && t(e))
            }),
            o)
          : (t && t(), Promise.resolve())
      }
      dir(e) {
        if (
          (e ||
            (e =
              this.resolvedLanguage ||
              (this.languages?.length > 0 ? this.languages[0] : this.language)),
          !e)
        )
          return 'rtl'
        try {
          let t = new Intl.Locale(e)
          if (t && t.getTextInfo) {
            let e = t.getTextInfo()
            if (e && e.direction) return e.direction
          }
        } catch (e) {}
        let t = this.services?.languageUtils || new P(U())
        return e.toLowerCase().indexOf('-latn') > 1
          ? 'ltr'
          : [
                'ar',
                'shu',
                'sqr',
                'ssh',
                'xaa',
                'yhd',
                'yud',
                'aao',
                'abh',
                'abv',
                'acm',
                'acq',
                'acw',
                'acx',
                'acy',
                'adf',
                'ads',
                'aeb',
                'aec',
                'afb',
                'ajp',
                'apc',
                'apd',
                'arb',
                'arq',
                'ars',
                'ary',
                'arz',
                'auz',
                'avl',
                'ayh',
                'ayl',
                'ayn',
                'ayp',
                'bbz',
                'pga',
                'he',
                'iw',
                'ps',
                'pbt',
                'pbu',
                'pst',
                'prp',
                'prd',
                'ug',
                'ur',
                'ydd',
                'yds',
                'yih',
                'ji',
                'yi',
                'hbo',
                'men',
                'xmn',
                'fa',
                'jpr',
                'peo',
                'pes',
                'prs',
                'dv',
                'sam',
                'ckb',
              ].indexOf(t.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf('-arab') > 1
            ? 'rtl'
            : 'ltr'
      }
      static createInstance(e = {}, t) {
        return new z(e, t)
      }
      cloneInstance(e = {}, t = M) {
        let i = e.forkResourceStore
        i && delete e.forkResourceStore
        let s = { ...this.options, ...e, isClone: !0 },
          o = new z(s)
        return (
          (void 0 !== e.debug || void 0 !== e.prefix) && (o.logger = o.logger.clone(e)),
          ['store', 'services', 'language'].forEach(e => {
            o[e] = this[e]
          }),
          (o.services = { ...this.services }),
          (o.services.utils = { hasLoadedNamespace: o.hasLoadedNamespace.bind(o) }),
          i &&
            ((o.store = new k(
              Object.keys(this.store.data).reduce(
                (e, t) => (
                  (e[t] = { ...this.store.data[t] }),
                  (e[t] = Object.keys(e[t]).reduce((i, s) => ((i[s] = { ...e[t][s] }), i), e[t])),
                  e
                ),
                {}
              ),
              s
            )),
            (o.services.resourceStore = o.store)),
          (o.translator = new R(o.services, s)),
          o.translator.on('*', (e, ...t) => {
            o.emit(e, ...t)
          }),
          o.init(s, t),
          (o.translator.options = s),
          (o.translator.backendConnector.services.utils = {
            hasLoadedNamespace: o.hasLoadedNamespace.bind(o),
          }),
          o
        )
      }
      toJSON() {
        return {
          options: this.options,
          store: this.store,
          language: this.language,
          languages: this.languages,
          resolvedLanguage: this.resolvedLanguage,
        }
      }
    }
    let B = z.createInstance()
    ;((B.createInstance = z.createInstance),
      B.createInstance,
      B.dir,
      B.init,
      B.loadResources,
      B.reloadResources,
      B.use,
      B.changeLanguage,
      B.getFixedT,
      B.t,
      B.exists,
      B.setDefaultNamespace,
      B.hasLoadedNamespace,
      B.loadNamespaces,
      B.loadLanguages)
    let { slice: H, forEach: J } = [],
      q = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
      _ = function (e, t) {
        let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { path: '/' },
          s = encodeURIComponent(t),
          o = `${e}=${s}`
        if (i.maxAge > 0) {
          let e = i.maxAge - 0
          if (Number.isNaN(e)) throw Error('maxAge should be a Number')
          o += `; Max-Age=${Math.floor(e)}`
        }
        if (i.domain) {
          if (!q.test(i.domain)) throw TypeError('option domain is invalid')
          o += `; Domain=${i.domain}`
        }
        if (i.path) {
          if (!q.test(i.path)) throw TypeError('option path is invalid')
          o += `; Path=${i.path}`
        }
        if (i.expires) {
          if ('function' != typeof i.expires.toUTCString)
            throw TypeError('option expires is invalid')
          o += `; Expires=${i.expires.toUTCString()}`
        }
        if ((i.httpOnly && (o += '; HttpOnly'), i.secure && (o += '; Secure'), i.sameSite))
          switch ('string' == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
            case !0:
            case 'strict':
              o += '; SameSite=Strict'
              break
            case 'lax':
              o += '; SameSite=Lax'
              break
            case 'none':
              o += '; SameSite=None'
              break
            default:
              throw TypeError('option sameSite is invalid')
          }
        return (i.partitioned && (o += '; Partitioned'), o)
      },
      W = {
        create(e, t, i, s) {
          let o =
            arguments.length > 4 && void 0 !== arguments[4]
              ? arguments[4]
              : { path: '/', sameSite: 'strict' }
          ;(i && ((o.expires = new Date()), o.expires.setTime(o.expires.getTime() + 60 * i * 1e3)),
            s && (o.domain = s),
            (document.cookie = _(e, t, o)))
        },
        read(e) {
          let t = `${e}=`,
            i = document.cookie.split(';')
          for (let e = 0; e < i.length; e++) {
            let s = i[e]
            for (; ' ' === s.charAt(0); ) s = s.substring(1, s.length)
            if (0 === s.indexOf(t)) return s.substring(t.length, s.length)
          }
          return null
        },
        remove(e, t) {
          this.create(e, '', -1, t)
        },
      }
    var Y = {
        name: 'cookie',
        lookup(e) {
          let { lookupCookie: t } = e
          if (t && 'undefined' != typeof document) return W.read(t) || void 0
        },
        cacheUserLanguage(e, t) {
          let { lookupCookie: i, cookieMinutes: s, cookieDomain: o, cookieOptions: r } = t
          i && 'undefined' != typeof document && W.create(i, e, s, o, r)
        },
      },
      Q = {
        name: 'querystring',
        lookup(e) {
          let t,
            { lookupQuerystring: i } = e
          if ('undefined' != typeof window) {
            let { search: e } = window.location
            !window.location.search &&
              window.location.hash?.indexOf('?') > -1 &&
              (e = window.location.hash.substring(window.location.hash.indexOf('?')))
            let s = e.substring(1).split('&')
            for (let e = 0; e < s.length; e++) {
              let o = s[e].indexOf('=')
              o > 0 && s[e].substring(0, o) === i && (t = s[e].substring(o + 1))
            }
          }
          return t
        },
      },
      G = {
        name: 'hash',
        lookup(e) {
          let t,
            { lookupHash: i, lookupFromHashIndex: s } = e
          if ('undefined' != typeof window) {
            let { hash: e } = window.location
            if (e && e.length > 2) {
              let o = e.substring(1)
              if (i) {
                let e = o.split('&')
                for (let s = 0; s < e.length; s++) {
                  let o = e[s].indexOf('=')
                  o > 0 && e[s].substring(0, o) === i && (t = e[s].substring(o + 1))
                }
              }
              if (t) return t
              if (!t && s > -1) {
                let t = e.match(/\/([a-zA-Z-]*)/g)
                if (!Array.isArray(t)) return
                return t['number' == typeof s ? s : 0]?.replace('/', '')
              }
            }
          }
          return t
        },
      }
    let Z = null,
      X = () => {
        if (null !== Z) return Z
        try {
          if (!(Z = 'undefined' != typeof window && null !== window.localStorage)) return !1
          let e = 'i18next.translate.boo'
          ;(window.localStorage.setItem(e, 'foo'), window.localStorage.removeItem(e))
        } catch (e) {
          Z = !1
        }
        return Z
      }
    var ee = {
      name: 'localStorage',
      lookup(e) {
        let { lookupLocalStorage: t } = e
        if (t && X()) return window.localStorage.getItem(t) || void 0
      },
      cacheUserLanguage(e, t) {
        let { lookupLocalStorage: i } = t
        i && X() && window.localStorage.setItem(i, e)
      },
    }
    let et = null,
      ei = () => {
        if (null !== et) return et
        try {
          if (!(et = 'undefined' != typeof window && null !== window.sessionStorage)) return !1
          let e = 'i18next.translate.boo'
          ;(window.sessionStorage.setItem(e, 'foo'), window.sessionStorage.removeItem(e))
        } catch (e) {
          et = !1
        }
        return et
      }
    var es = {
        name: 'sessionStorage',
        lookup(e) {
          let { lookupSessionStorage: t } = e
          if (t && ei()) return window.sessionStorage.getItem(t) || void 0
        },
        cacheUserLanguage(e, t) {
          let { lookupSessionStorage: i } = t
          i && ei() && window.sessionStorage.setItem(i, e)
        },
      },
      eo = {
        name: 'navigator',
        lookup(e) {
          let t = []
          if ('undefined' != typeof navigator) {
            let { languages: e, userLanguage: i, language: s } = navigator
            if (e) for (let i = 0; i < e.length; i++) t.push(e[i])
            ;(i && t.push(i), s && t.push(s))
          }
          return t.length > 0 ? t : void 0
        },
      },
      er = {
        name: 'htmlTag',
        lookup(e) {
          let t,
            { htmlTag: i } = e,
            s = i || ('undefined' != typeof document ? document.documentElement : null)
          return (s && 'function' == typeof s.getAttribute && (t = s.getAttribute('lang')), t)
        },
      },
      ea = {
        name: 'path',
        lookup(e) {
          let { lookupFromPathIndex: t } = e
          if ('undefined' == typeof window) return
          let i = window.location.pathname.match(/\/([a-zA-Z-]*)/g)
          if (Array.isArray(i)) return i['number' == typeof t ? t : 0]?.replace('/', '')
        },
      },
      en = {
        name: 'subdomain',
        lookup(e) {
          let { lookupFromSubdomainIndex: t } = e,
            i =
              'undefined' != typeof window &&
              window.location?.hostname?.match(
                /^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i
              )
          if (i) return i['number' == typeof t ? t + 1 : 1]
        },
      }
    let el = !1
    try {
      ;(document.cookie, (el = !0))
    } catch (e) {}
    let eh = ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag']
    el || eh.splice(1, 1)
    class eu {
      constructor(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        ;((this.type = 'languageDetector'), (this.detectors = {}), this.init(e, t))
      }
      init() {
        let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { languageUtils: {} },
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
        ;((this.services = e),
          (this.options = (function (e) {
            return (
              J.call(H.call(arguments, 1), t => {
                if (t) for (let i in t) void 0 === e[i] && (e[i] = t[i])
              }),
              e
            )
          })(t, this.options || {}, {
            order: eh,
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupSessionStorage: 'i18nextLng',
            caches: ['localStorage'],
            excludeCacheFor: ['cimode'],
            convertDetectedLanguage: e => e,
          })),
          'string' == typeof this.options.convertDetectedLanguage &&
            this.options.convertDetectedLanguage.indexOf('15897') > -1 &&
            (this.options.convertDetectedLanguage = e => e.replace('-', '_')),
          this.options.lookupFromUrlIndex &&
            (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
          (this.i18nOptions = i),
          this.addDetector(Y),
          this.addDetector(Q),
          this.addDetector(ee),
          this.addDetector(es),
          this.addDetector(eo),
          this.addDetector(er),
          this.addDetector(ea),
          this.addDetector(en),
          this.addDetector(G))
      }
      addDetector(e) {
        return ((this.detectors[e.name] = e), this)
      }
      detect() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.options.order,
          t = []
        return (e.forEach(e => {
          if (this.detectors[e]) {
            let i = this.detectors[e].lookup(this.options)
            ;(i && 'string' == typeof i && (i = [i]), i && (t = t.concat(i)))
          }
        }),
        (t = t
          .filter(
            e =>
              null != e &&
              !(
                'string' == typeof e &&
                [
                  /<\s*script.*?>/i,
                  /<\s*\/\s*script\s*>/i,
                  /<\s*img.*?on\w+\s*=/i,
                  /<\s*\w+\s*on\w+\s*=.*?>/i,
                  /javascript\s*:/i,
                  /vbscript\s*:/i,
                  /expression\s*\(/i,
                  /eval\s*\(/i,
                  /alert\s*\(/i,
                  /document\.cookie/i,
                  /document\.write\s*\(/i,
                  /window\.location/i,
                  /innerHTML/i,
                ].some(t => t.test(e))
              )
          )
          .map(e => this.options.convertDetectedLanguage(e))),
        this.services &&
          this.services.languageUtils &&
          this.services.languageUtils.getBestMatchFromCodes)
          ? t
          : t.length > 0
            ? t[0]
            : null
      }
      cacheUserLanguage(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options.caches
        !t ||
          (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(e) > -1) ||
          t.forEach(t => {
            this.detectors[t] && this.detectors[t].cacheUserLanguage(e, this.options)
          })
      }
    }
    eu.type = 'languageDetector'
    var ep = e.i(40712),
      eg = e.i(61387),
      ed = e.i(51840),
      ec = e.i(18285),
      ef = e.i(78608),
      em = e.i(42924),
      ey = e.i(88127),
      ex = e.i(24213),
      ev = e.i(17738),
      eb = e.i(19224),
      eS = e.i(20701),
      ek = e.i(91154)
    let ew = {
      'zh-CN': {
        common: ep.default,
        home: eg.default,
        dashboard: ed.default,
        users: ec.default,
        settings: ef.default,
        validation: em.default,
      },
      'en-US': {
        common: ey.default,
        home: ex.default,
        dashboard: ev.default,
        users: eb.default,
        settings: eS.default,
        validation: ek.default,
      },
    }
    ;(B.use(eu)
      .use(t.initReactI18next)
      .init({
        resources: ew,
        fallbackLng: 'zh-CN',
        debug: !1,
        interpolation: { escapeValue: !1 },
        detection: { order: ['localStorage', 'navigator', 'htmlTag'], caches: ['localStorage'] },
      }),
      e.s(['default', 0, B], 27255))
  },
])
