;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  69442,
  (e, s, a) => {
    'use strict'
    ;(Object.defineProperty(a, '__esModule', { value: !0 }),
      Object.defineProperty(a, 'warnOnce', {
        enumerable: !0,
        get: function () {
          return l
        },
      }))
    let l = e => {}
  },
  78214,
  e => {
    'use strict'
    var s = e.i(38068),
      a = e.i(96388),
      l = e.i(98479)
    function c() {
      let [e, c] = (0, a.useState)({
          notifications: !0,
          darkMode: !1,
          autoSave: !0,
          language: 'zh-CN',
        }),
        n = s => {
          c({ ...e, [s]: !e[s] })
        }
      return (0, s.jsx)(l.AppLayout, {
        children: (0, s.jsxs)('div', {
          className: 'space-y-6',
          children: [
            (0, s.jsxs)('div', {
              children: [
                (0, s.jsx)('h1', { className: 'text-3xl font-bold', children: '设置' }),
                (0, s.jsx)('p', {
                  className: 'mt-2 text-base-content/70',
                  children: '配置您的应用程序偏好设置',
                }),
              ],
            }),
            (0, s.jsx)('div', {
              className: 'card bg-base-100 shadow-lg',
              children: (0, s.jsxs)('div', {
                className: 'card-body',
                children: [
                  (0, s.jsx)('h3', { className: 'card-title', children: '常规设置' }),
                  (0, s.jsxs)('div', {
                    className: 'space-y-4',
                    children: [
                      (0, s.jsx)('div', {
                        className: 'form-control',
                        children: (0, s.jsxs)('label', {
                          className: 'label cursor-pointer',
                          children: [
                            (0, s.jsx)('span', { className: 'label-text', children: '启用通知' }),
                            (0, s.jsx)('input', {
                              type: 'checkbox',
                              className: 'toggle',
                              checked: e.notifications,
                              onChange: () => n('notifications'),
                            }),
                          ],
                        }),
                      }),
                      (0, s.jsx)('div', {
                        className: 'form-control',
                        children: (0, s.jsxs)('label', {
                          className: 'label cursor-pointer',
                          children: [
                            (0, s.jsx)('span', { className: 'label-text', children: '深色模式' }),
                            (0, s.jsx)('input', {
                              type: 'checkbox',
                              className: 'toggle',
                              checked: e.darkMode,
                              onChange: () => n('darkMode'),
                            }),
                          ],
                        }),
                      }),
                      (0, s.jsx)('div', {
                        className: 'form-control',
                        children: (0, s.jsxs)('label', {
                          className: 'label cursor-pointer',
                          children: [
                            (0, s.jsx)('span', { className: 'label-text', children: '自动保存' }),
                            (0, s.jsx)('input', {
                              type: 'checkbox',
                              className: 'toggle',
                              checked: e.autoSave,
                              onChange: () => n('autoSave'),
                            }),
                          ],
                        }),
                      }),
                      (0, s.jsxs)('div', {
                        className: 'form-control',
                        children: [
                          (0, s.jsx)('label', {
                            className: 'label',
                            children: (0, s.jsx)('span', {
                              className: 'label-text',
                              children: '语言',
                            }),
                          }),
                          (0, s.jsxs)('select', {
                            className: 'select select-bordered',
                            value: e.language,
                            onChange: s => {
                              var a
                              return ((a = s.target.value), void c({ ...e, language: a }))
                            },
                            children: [
                              (0, s.jsx)('option', { value: 'zh-CN', children: '简体中文' }),
                              (0, s.jsx)('option', { value: 'zh-TW', children: '繁体中文' }),
                              (0, s.jsx)('option', { value: 'en-US', children: 'English' }),
                              (0, s.jsx)('option', { value: 'ja-JP', children: '日本語' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsx)('div', {
                    className: 'card-actions justify-end mt-6',
                    children: (0, s.jsx)('button', {
                      className: 'btn btn-primary',
                      children: '保存设置',
                    }),
                  }),
                ],
              }),
            }),
            (0, s.jsx)('div', {
              className: 'card bg-base-100 shadow-lg',
              children: (0, s.jsxs)('div', {
                className: 'card-body',
                children: [
                  (0, s.jsx)('h3', { className: 'card-title', children: '关于' }),
                  (0, s.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      (0, s.jsxs)('p', {
                        children: [(0, s.jsx)('strong', { children: '版本:' }), ' 1.0.0'],
                      }),
                      (0, s.jsxs)('p', {
                        children: [(0, s.jsx)('strong', { children: '构建:' }), ' 2024-01-20'],
                      }),
                      (0, s.jsxs)('p', {
                        children: [
                          (0, s.jsx)('strong', { children: '框架:' }),
                          ' Tauri 2 + React 19 + TypeScript',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      })
    }
    e.s(['default', () => c])
  },
])
