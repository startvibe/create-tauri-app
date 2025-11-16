;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  69442,
  (e, s, a) => {
    'use strict'
    ;(Object.defineProperty(a, '__esModule', { value: !0 }),
      Object.defineProperty(a, 'warnOnce', {
        enumerable: !0,
        get: function () {
          return r
        },
      }))
    let r = e => {}
  },
  5565,
  e => {
    'use strict'
    var s = e.i(38068),
      a = e.i(96388)
    'function' == typeof SuppressedError && SuppressedError
    async function r(e, s = {}, a) {
      return window.__TAURI_INTERNALS__.invoke(e, s, a)
    }
    ;(new WeakMap(), new WeakMap(), new WeakMap(), new WeakMap(), new WeakMap(), e.i(29352))
    var t = e.i(31162)
    function c() {
      let [e, c] = (0, a.useState)(''),
        [i, l] = (0, a.useState)(''),
        { t: n } = (0, t.useTranslation)('common'),
        { t: d } = (0, t.useTranslation)('home')
      async function o() {
        i.trim() && c(await r('greet', { name: i }))
      }
      return (0, s.jsxs)('div', {
        className: 'space-y-6',
        children: [
          (0, s.jsxs)('div', {
            className: 'text-center',
            children: [
              (0, s.jsx)('h1', { className: 'text-4xl font-bold', children: d('title') }),
              (0, s.jsx)('p', {
                className: 'mt-2 text-lg text-base-content/70',
                children: d('subtitle'),
              }),
            ],
          }),
          (0, s.jsx)('div', {
            className: 'card bg-base-100 shadow-xl',
            children: (0, s.jsxs)('div', {
              className: 'card-body',
              children: [
                (0, s.jsx)('h2', { className: 'card-title', children: d('demo.title') }),
                (0, s.jsx)('p', {
                  className: 'text-base-content/70',
                  children: d('demo.description'),
                }),
                (0, s.jsx)('div', {
                  className: 'form-control',
                  children: (0, s.jsx)('input', {
                    type: 'text',
                    className: 'input input-bordered',
                    placeholder: d('demo.placeholder'),
                    value: i,
                    onChange: e => l(e.currentTarget.value),
                  }),
                }),
                (0, s.jsx)('div', {
                  className: 'card-actions',
                  children: (0, s.jsx)('button', {
                    className: 'btn btn-primary',
                    onClick: o,
                    children: n('actions.greet'),
                  }),
                }),
                e &&
                  (0, s.jsx)('div', {
                    className: 'alert alert-success mt-4',
                    children: (0, s.jsx)('span', { children: e }),
                  }),
              ],
            }),
          }),
          (0, s.jsxs)('div', {
            className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
            children: [
              (0, s.jsx)('div', {
                className: 'card bg-base-100 shadow-lg',
                children: (0, s.jsxs)('div', {
                  className: 'card-body',
                  children: [
                    (0, s.jsx)('h3', {
                      className: 'card-title',
                      children: d('features.performance.title'),
                    }),
                    (0, s.jsx)('p', { children: d('features.performance.description') }),
                  ],
                }),
              }),
              (0, s.jsx)('div', {
                className: 'card bg-base-100 shadow-lg',
                children: (0, s.jsxs)('div', {
                  className: 'card-body',
                  children: [
                    (0, s.jsx)('h3', {
                      className: 'card-title',
                      children: d('features.security.title'),
                    }),
                    (0, s.jsx)('p', { children: d('features.security.description') }),
                  ],
                }),
              }),
              (0, s.jsx)('div', {
                className: 'card bg-base-100 shadow-lg',
                children: (0, s.jsxs)('div', {
                  className: 'card-body',
                  children: [
                    (0, s.jsx)('h3', {
                      className: 'card-title',
                      children: d('features.modern.title'),
                    }),
                    (0, s.jsx)('p', { children: d('features.modern.description') }),
                  ],
                }),
              }),
            ],
          }),
        ],
      })
    }
    e.s(['HomePage', () => c], 5565)
  },
])
