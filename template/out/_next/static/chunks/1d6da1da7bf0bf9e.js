;(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  33091,
  (e, t, s) => {
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
    var s = e.i(96388)
    ;(e.i(33091), Object.create(null))
    let a = {},
      i = (e, t, s, i) => {
        ;(l(s) && a[s]) ||
          (l(s) && (a[s] = new Date()),
          ((e, t, s, a) => {
            let i = [s, { code: t, ...(a || {}) }]
            if (e?.services?.logger?.forward)
              return e.services.logger.forward(i, 'warn', 'react-i18next::', !0)
            ;(l(i[0]) && (i[0] = `react-i18next:: ${i[0]}`),
              e?.services?.logger?.warn
                ? e.services.logger.warn(...i)
                : console?.warn && console.warn(...i))
          })(e, t, s, i))
      },
      n = (e, t) => () => {
        if (e.isInitialized) t()
        else {
          let s = () => {
            ;(setTimeout(() => {
              e.off('initialized', s)
            }, 0),
              t())
          }
          e.on('initialized', s)
        }
      },
      r = (e, t, s) => {
        e.loadNamespaces(t, n(e, s))
      },
      o = (e, t, s, a) => {
        if ((l(s) && (s = [s]), e.options.preload && e.options.preload.indexOf(t) > -1))
          return r(e, s, a)
        ;(s.forEach(t => {
          0 > e.options.ns.indexOf(t) && e.options.ns.push(t)
        }),
          e.loadLanguages(t, n(e, a)))
      },
      l = e => 'string' == typeof e,
      c =
        /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
      u = {
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
      d = e => u[e],
      g = {
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: !0,
        transWrapTextNodes: '',
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
        useSuspense: !0,
        unescape: e => e.replace(c, d),
      }
    e.s(
      [
        'initReactI18next',
        0,
        {
          type: '3rdParty',
          init(e) {
            ;(((e = {}) => {
              g = { ...g, ...e }
            })(e.options.react),
              (t = e))
          },
        },
      ],
      47569
    )
    let p = (0, s.createContext)()
    class m {
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
        (e, a = {}) => {
          var n, c, u
          let d,
            { i18n: f } = a,
            { i18n: h, defaultNS: v } = (0, s.useContext)(p) || {},
            b = f || h || t
          if ((b && !b.reportNamespaces && (b.reportNamespaces = new m()), !b)) {
            i(
              b,
              'NO_I18NEXT_INSTANCE',
              'useTranslation: You will need to pass in an i18next instance by using initReactI18next'
            )
            let e = (e, t) => {
                let s
                return l(t)
                  ? t
                  : 'object' == typeof (s = t) && null !== s && l(t.defaultValue)
                    ? t.defaultValue
                    : Array.isArray(e)
                      ? e[e.length - 1]
                      : e
              },
              t = [e, {}, !1]
            return ((t.t = e), (t.i18n = {}), (t.ready = !1), t)
          }
          b.options.react?.wait &&
            i(
              b,
              'DEPRECATED_OPTION',
              'useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.'
            )
          let S = { ...g, ...b.options.react, ...a },
            { useSuspense: y, keyPrefix: T } = S,
            w = e || v || b.options?.defaultNS
          ;((w = l(w) ? [w] : w || ['translation']), b.reportNamespaces.addUsedNamespaces?.(w))
          let x =
              (b.isInitialized || b.initializedStoreOnce) &&
              w.every(e =>
                ((e, t, s = {}) =>
                  t.languages && t.languages.length
                    ? t.hasLoadedNamespace(e, {
                        lng: s.lng,
                        precheck: (t, a) => {
                          if (
                            s.bindI18n &&
                            s.bindI18n.indexOf('languageChanging') > -1 &&
                            t.services.backendConnector.backend &&
                            t.isLanguageChangingTo &&
                            !a(t.isLanguageChangingTo, e)
                          )
                            return !1
                        },
                      })
                    : (i(t, 'NO_LANGUAGES', 'i18n.languages were undefined or empty', {
                        languages: t.languages,
                      }),
                      !0))(e, b, S)
              ),
            E =
              ((n = a.lng || null),
              (c = 'fallback' === S.nsMode ? w : w[0]),
              (0, s.useCallback)(b.getFixedT(n, c, T), [b, n, c, T])),
            N = () => E,
            U = () => {
              let e, t
              return (
                (e = a.lng || null),
                (t = 'fallback' === S.nsMode ? w : w[0]),
                b.getFixedT(e, t, T)
              )
            },
            [A, R] = (0, s.useState)(N),
            C = w.join()
          a.lng && (C = `${a.lng}${C}`)
          let k =
              ((u = C),
              (d = (0, s.useRef)()),
              (0, s.useEffect)(() => {
                d.current = u
              }, [u, void 0]),
              d.current),
            L = (0, s.useRef)(!0)
          ;((0, s.useEffect)(() => {
            let { bindI18n: e, bindI18nStore: t } = S
            ;((L.current = !0),
              x ||
                y ||
                (a.lng
                  ? o(b, a.lng, w, () => {
                      L.current && R(U)
                    })
                  : r(b, w, () => {
                      L.current && R(U)
                    })),
              x && k && k !== C && L.current && R(U))
            let s = () => {
              L.current && R(U)
            }
            return (
              e && b?.on(e, s),
              t && b?.store.on(t, s),
              () => {
                ;((L.current = !1),
                  b && e && e?.split(' ').forEach(e => b.off(e, s)),
                  t && b && t.split(' ').forEach(e => b.store.off(e, s)))
              }
            )
          }, [b, C]),
            (0, s.useEffect)(() => {
              L.current && x && R(N)
            }, [b, T, x]))
          let P = [A, b, x]
          if (((P.t = A), (P.i18n = b), (P.ready = x), x || (!x && !y))) return P
          throw new Promise(e => {
            a.lng ? o(b, a.lng, w, () => e()) : r(b, w, () => e())
          })
        },
      ],
      31162
    ),
      e.s([], 29352))
  },
  40712,
  e => {
    e.v({
      nav: {
        brand: 'Tauri App',
        home: '首页',
        dashboard: '仪表板',
        users: '用户',
        settings: '设置',
      },
      actions: {
        greet: '打招呼',
        save: '保存',
        cancel: '取消',
        confirm: '确认',
        delete: '删除',
        edit: '编辑',
        submit: '提交',
        reset: '重置',
      },
      theme: { toggle: '切换主题', light: '浅色主题', dark: '深色主题' },
      language: { toggle: '切换语言', chinese: '中文', english: 'English' },
      status: {
        loading: '加载中...',
        success: '成功',
        error: '错误',
        warning: '警告',
        info: '信息',
      },
    })
  },
  61387,
  e => {
    e.v({
      title: '欢迎来到 Tauri + React',
      subtitle: '这是一个现代化的桌面应用模板',
      demo: {
        title: 'Tauri 命令示例',
        description: '输入您的名字，然后点击按钮来调用 Rust 命令',
        placeholder: '输入名字...',
        success: '调用成功！',
      },
      features: {
        performance: { title: '🚀 高性能', description: 'Tauri 提供极小的包体积和极快的性能' },
        security: { title: '🛡️ 安全', description: 'Rust 提供内存安全和类型安全' },
        modern: { title: '🎨 现代化', description: 'React 19 + TypeScript + Tailwind CSS' },
      },
    })
  },
  51840,
  e => {
    e.v({
      title: '仪表板',
      subtitle: '数据统计和概览',
      cards: {
        overview: { title: '概览', description: '系统概览信息' },
        analytics: { title: '分析', description: '数据分析图表' },
        reports: { title: '报告', description: '生成和查看报告' },
      },
      metrics: { users: '用户总数', sessions: '活跃会话', revenue: '总收入', growth: '增长率' },
    })
  },
  18285,
  e => {
    e.v({
      title: '用户管理',
      subtitle: '管理系统用户',
      actions: {
        addUser: '添加用户',
        editUser: '编辑用户',
        deleteUser: '删除用户',
        viewProfile: '查看资料',
      },
      table: {
        name: '姓名',
        email: '邮箱',
        role: '角色',
        status: '状态',
        lastLogin: '最后登录',
        actions: '操作',
      },
      status: { active: '活跃', inactive: '未激活', banned: '已禁用' },
      roles: { admin: '管理员', user: '普通用户', moderator: '版主' },
      confirmDelete: '确定要删除此用户吗？',
    })
  },
  78608,
  e => {
    e.v({
      title: '设置',
      subtitle: '系统配置和个人偏好',
      sections: {
        general: '通用设置',
        appearance: '外观设置',
        notifications: '通知设置',
        security: '安全设置',
        advanced: '高级设置',
      },
      options: {
        language: '界面语言',
        theme: '主题模式',
        autoSave: '自动保存',
        soundEffects: '音效',
        animations: '动画效果',
        notifications: '桌面通知',
        autoUpdate: '自动更新',
      },
      buttons: {
        resetToDefault: '恢复默认',
        exportSettings: '导出设置',
        importSettings: '导入设置',
      },
      messages: {
        settingsSaved: '设置已保存',
        resetConfirm: '确定要恢复默认设置吗？',
        exportSuccess: '设置已导出',
        importSuccess: '设置已导入',
      },
    })
  },
  42924,
  e => {
    e.v({
      required: '此字段为必填项',
      email: '请输入有效的邮箱地址',
      minLength: '最少需要 {{count}} 个字符',
      maxLength: '最多只能输入 {{count}} 个字符',
      pattern: '格式不正确',
      number: '请输入有效数字',
      integer: '请输入整数',
      positive: '请输入正数',
      range: '值必须在 {{min}} 到 {{max}} 之间',
      passwordTooWeak: '密码强度太弱',
      passwordMismatch: '密码不匹配',
      fileSize: '文件大小不能超过 {{size}}MB',
      fileType: '不支持的文件类型',
      phone: '请输入有效的手机号码',
      url: '请输入有效的网址',
      uniqueEmail: '该邮箱已被使用',
      uniqueUsername: '该用户名已被使用',
    })
  },
  88127,
  e => {
    e.v({
      nav: {
        brand: 'Tauri App',
        home: 'Home',
        dashboard: 'Dashboard',
        users: 'Users',
        settings: 'Settings',
      },
      actions: {
        greet: 'Greet',
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        delete: 'Delete',
        edit: 'Edit',
        submit: 'Submit',
        reset: 'Reset',
      },
      theme: { toggle: 'Toggle Theme', light: 'Light Theme', dark: 'Dark Theme' },
      language: { toggle: 'Switch Language', chinese: '中文', english: 'English' },
      status: {
        loading: 'Loading...',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
      },
    })
  },
  24213,
  e => {
    e.v({
      title: 'Welcome to Tauri + React',
      subtitle: 'A modern desktop application template',
      demo: {
        title: 'Tauri Command Example',
        description: 'Enter your name and click the button to invoke a Rust command',
        placeholder: 'Enter your name...',
        success: 'Command executed successfully!',
      },
      features: {
        performance: {
          title: '🚀 High Performance',
          description: 'Tauri provides minimal bundle size and blazing fast performance',
        },
        security: {
          title: '🛡️ Security',
          description: 'Rust provides memory safety and type safety',
        },
        modern: { title: '🎨 Modern', description: 'React 19 + TypeScript + Tailwind CSS' },
      },
    })
  },
  17738,
  e => {
    e.v({
      title: 'Dashboard',
      subtitle: 'Data statistics and overview',
      cards: {
        overview: { title: 'Overview', description: 'System overview information' },
        analytics: { title: 'Analytics', description: 'Data analytics charts' },
        reports: { title: 'Reports', description: 'Generate and view reports' },
      },
      metrics: {
        users: 'Total Users',
        sessions: 'Active Sessions',
        revenue: 'Total Revenue',
        growth: 'Growth Rate',
      },
    })
  },
  19224,
  e => {
    e.v({
      title: 'User Management',
      subtitle: 'Manage system users',
      actions: {
        addUser: 'Add User',
        editUser: 'Edit User',
        deleteUser: 'Delete User',
        viewProfile: 'View Profile',
      },
      table: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        status: 'Status',
        lastLogin: 'Last Login',
        actions: 'Actions',
      },
      status: { active: 'Active', inactive: 'Inactive', banned: 'Banned' },
      roles: { admin: 'Administrator', user: 'User', moderator: 'Moderator' },
      confirmDelete: 'Are you sure you want to delete this user?',
    })
  },
  20701,
  e => {
    e.v({
      title: 'Settings',
      subtitle: 'System configuration and personal preferences',
      sections: {
        general: 'General Settings',
        appearance: 'Appearance Settings',
        notifications: 'Notification Settings',
        security: 'Security Settings',
        advanced: 'Advanced Settings',
      },
      options: {
        language: 'Interface Language',
        theme: 'Theme Mode',
        autoSave: 'Auto Save',
        soundEffects: 'Sound Effects',
        animations: 'Animations',
        notifications: 'Desktop Notifications',
        autoUpdate: 'Auto Update',
      },
      buttons: {
        resetToDefault: 'Reset to Default',
        exportSettings: 'Export Settings',
        importSettings: 'Import Settings',
      },
      messages: {
        settingsSaved: 'Settings saved',
        resetConfirm: 'Are you sure you want to reset to default settings?',
        exportSuccess: 'Settings exported',
        importSuccess: 'Settings imported',
      },
    })
  },
  91154,
  e => {
    e.v({
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minLength: 'Must be at least {{count}} characters long',
      maxLength: 'Cannot exceed {{count}} characters',
      pattern: 'Invalid format',
      number: 'Please enter a valid number',
      integer: 'Please enter an integer',
      positive: 'Please enter a positive number',
      range: 'Value must be between {{min}} and {{max}}',
      passwordTooWeak: 'Password is too weak',
      passwordMismatch: 'Passwords do not match',
      fileSize: 'File size cannot exceed {{size}}MB',
      fileType: 'File type not supported',
      phone: 'Please enter a valid phone number',
      url: 'Please enter a valid URL',
      uniqueEmail: 'This email is already in use',
      uniqueUsername: 'This username is already taken',
    })
  },
])
