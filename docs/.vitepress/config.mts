import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto-gen-sidebar.mts";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端技术知识库",
  description: "记录前端的技术知识库，包含前端、后端、工程化等内容",
  themeConfig: {
    outlineTitle: '目录',
    outline: [2, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', items:[
        {text:'Vue',link:'/frontend/vue/index'},
        {text:'iOS',link:'/frontend/ios/index'}
      ]},
      { text: '工程化', link: '/markdown-examples' },
      { text: '后端', link: '/markdown-examples' },
      { text: 'Examples', link: '/guide/markdown-examples' }

    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    // sidebar: { 
    //   // "/frontend/base": set_sidebar("frontend/base"),
    //   "/frontend/ios": set_sidebar("frontend/ios"),
    //   "/frontend/js": set_sidebar("frontend/js"),
    //   // "/frontend/vue": set_sidebar("frontend/vue"),
    //   // "/frontend/swift": set_sidebar("frontend/swift"),
    //   "/guide": set_sidebar("/guide"),
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
  }
})
