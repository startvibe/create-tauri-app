;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  69442,
  (s, e, a) => {
    'use strict'
    ;(Object.defineProperty(a, '__esModule', { value: !0 }),
      Object.defineProperty(a, 'warnOnce', {
        enumerable: !0,
        get: function () {
          return c
        },
      }))
    let c = s => {}
  },
  40726,
  s => {
    'use strict'
    var e = s.i(38068),
      a = s.i(96388),
      c = s.i(98479)
    function t() {
      let [s] = (0, a.useState)({ users: 1234, projects: 56, tasks: 89 })
      return (0, e.jsx)(c.AppLayout, {
        children: (0, e.jsxs)('div', {
          className: 'space-y-6',
          children: [
            (0, e.jsxs)('div', {
              children: [
                (0, e.jsx)('h1', { className: 'text-3xl font-bold', children: '仪表板' }),
                (0, e.jsx)('p', {
                  className: 'mt-2 text-base-content/70',
                  children: '查看您的应用程序统计数据和概览',
                }),
              ],
            }),
            (0, e.jsxs)('div', {
              className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
              children: [
                (0, e.jsx)('div', {
                  className: 'card bg-base-100 shadow-lg',
                  children: (0, e.jsxs)('div', {
                    className: 'card-body',
                    children: [
                      (0, e.jsx)('h2', { className: 'card-title text-primary', children: '用户' }),
                      (0, e.jsx)('div', {
                        className: 'text-3xl font-bold',
                        children: s.users.toLocaleString(),
                      }),
                      (0, e.jsx)('div', {
                        className: 'text-sm text-base-content/70',
                        children: '总用户数',
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)('div', {
                  className: 'card bg-base-100 shadow-lg',
                  children: (0, e.jsxs)('div', {
                    className: 'card-body',
                    children: [
                      (0, e.jsx)('h2', {
                        className: 'card-title text-secondary',
                        children: '项目',
                      }),
                      (0, e.jsx)('div', { className: 'text-3xl font-bold', children: s.projects }),
                      (0, e.jsx)('div', {
                        className: 'text-sm text-base-content/70',
                        children: '活跃项目',
                      }),
                    ],
                  }),
                }),
                (0, e.jsx)('div', {
                  className: 'card bg-base-100 shadow-lg',
                  children: (0, e.jsxs)('div', {
                    className: 'card-body',
                    children: [
                      (0, e.jsx)('h2', { className: 'card-title text-accent', children: '任务' }),
                      (0, e.jsx)('div', { className: 'text-3xl font-bold', children: s.tasks }),
                      (0, e.jsx)('div', {
                        className: 'text-sm text-base-content/70',
                        children: '待处理任务',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, e.jsx)('div', {
              className: 'card bg-base-100 shadow-lg',
              children: (0, e.jsxs)('div', {
                className: 'card-body',
                children: [
                  (0, e.jsx)('h3', { className: 'card-title', children: '最近活动' }),
                  (0, e.jsxs)('div', {
                    className: 'space-y-2',
                    children: [
                      (0, e.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          (0, e.jsx)('div', { className: 'w-2 h-2 bg-success rounded-full' }),
                          (0, e.jsx)('span', { className: 'text-sm', children: '新用户注册' }),
                          (0, e.jsx)('span', {
                            className: 'text-xs text-base-content/50',
                            children: '2分钟前',
                          }),
                        ],
                      }),
                      (0, e.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          (0, e.jsx)('div', { className: 'w-2 h-2 bg-warning rounded-full' }),
                          (0, e.jsx)('span', { className: 'text-sm', children: '项目更新' }),
                          (0, e.jsx)('span', {
                            className: 'text-xs text-base-content/50',
                            children: '15分钟前',
                          }),
                        ],
                      }),
                      (0, e.jsxs)('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          (0, e.jsx)('div', { className: 'w-2 h-2 bg-info rounded-full' }),
                          (0, e.jsx)('span', { className: 'text-sm', children: '系统维护完成' }),
                          (0, e.jsx)('span', {
                            className: 'text-xs text-base-content/50',
                            children: '1小时前',
                          }),
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
    s.s(['default', () => t])
  },
])
