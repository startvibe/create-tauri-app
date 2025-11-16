;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  69442,
  (e, s, t) => {
    'use strict'
    ;(Object.defineProperty(t, '__esModule', { value: !0 }),
      Object.defineProperty(t, 'warnOnce', {
        enumerable: !0,
        get: function () {
          return a
        },
      }))
    let a = e => {}
  },
  37681,
  e => {
    'use strict'
    var s = e.i(38068),
      t = e.i(96388),
      a = e.i(98479)
    function i() {
      let [e] = (0, t.useState)([
        { id: 1, name: '张三', email: 'zhang@example.com', status: 'active' },
        { id: 2, name: '李四', email: 'li@example.com', status: 'active' },
        { id: 3, name: '王五', email: 'wang@example.com', status: 'inactive' },
        { id: 4, name: '赵六', email: 'zhao@example.com', status: 'active' },
      ])
      return (0, s.jsx)(a.AppLayout, {
        children: (0, s.jsxs)('div', {
          className: 'space-y-6',
          children: [
            (0, s.jsxs)('div', {
              className: 'flex justify-between items-center',
              children: [
                (0, s.jsxs)('div', {
                  children: [
                    (0, s.jsx)('h1', { className: 'text-3xl font-bold', children: '用户管理' }),
                    (0, s.jsx)('p', {
                      className: 'mt-2 text-base-content/70',
                      children: '管理您的应用程序用户',
                    }),
                  ],
                }),
                (0, s.jsx)('button', { className: 'btn btn-primary', children: '添加用户' }),
              ],
            }),
            (0, s.jsx)('div', {
              className: 'card bg-base-100 shadow-lg',
              children: (0, s.jsx)('div', {
                className: 'card-body',
                children: (0, s.jsx)('div', {
                  className: 'overflow-x-auto',
                  children: (0, s.jsxs)('table', {
                    className: 'table',
                    children: [
                      (0, s.jsx)('thead', {
                        children: (0, s.jsxs)('tr', {
                          children: [
                            (0, s.jsx)('th', { children: 'ID' }),
                            (0, s.jsx)('th', { children: '姓名' }),
                            (0, s.jsx)('th', { children: '邮箱' }),
                            (0, s.jsx)('th', { children: '状态' }),
                            (0, s.jsx)('th', { children: '操作' }),
                          ],
                        }),
                      }),
                      (0, s.jsx)('tbody', {
                        children: e.map(e =>
                          (0, s.jsxs)(
                            'tr',
                            {
                              children: [
                                (0, s.jsx)('td', { children: e.id }),
                                (0, s.jsx)('td', { children: e.name }),
                                (0, s.jsx)('td', { children: e.email }),
                                (0, s.jsx)('td', {
                                  children: (0, s.jsx)('span', {
                                    className: `badge ${'active' === e.status ? 'badge-success' : 'badge-warning'}`,
                                    children: 'active' === e.status ? '活跃' : '未激活',
                                  }),
                                }),
                                (0, s.jsx)('td', {
                                  children: (0, s.jsxs)('div', {
                                    className: 'flex gap-2',
                                    children: [
                                      (0, s.jsx)('button', {
                                        className: 'btn btn-sm btn-outline',
                                        children: '查看',
                                      }),
                                      (0, s.jsx)('button', {
                                        className: 'btn btn-sm btn-outline',
                                        children: '编辑',
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            e.id
                          )
                        ),
                      }),
                    ],
                  }),
                }),
              }),
            }),
          ],
        }),
      })
    }
    e.s(['default', () => i])
  },
])
