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
      { text: '语言', items:[
        {text:'js',link:'/frontend/js/index'},
        {text:'swift',link:'/frontend/swift/index'},
      ]},
      { text: '工程化', link: '/engineering' },
      { text: '后端', link: '/backend/container/tomcat' },
      { text: '网络', link: '/network' },
      { text: 'Examples', link: '/guide/markdown-examples' }

    ],

    sidebar: { 
       "/frontend/vue": [{
        text: 'Vue',
        items: set_sidebar("frontend/vue"),
      }],
       "/frontend/js": [{
        text: 'JS',
        items: set_sidebar("frontend/js"),
      }],
      "/frontend/base": [{
        text: '基础',
        items: set_sidebar("frontend/base"),
      },{
        text: '其他',
        items: set_sidebar("frontend/other"),
      }],     
      "/frontend/ios": [{
        text: 'iOS',
        items: set_sidebar("frontend/ios"),
      }],
     
      "/frontend/swift": [{
        text: 'swift',
        items: set_sidebar("frontend/swift"),
      }],
      "/utils": [{
        text: '工具',
        items: [
          { text: 'Xcode 使用小技巧', link: '/utils/2016-03-28-post-xcode-tips.md' },
          { text: 'Xcode 使用小技巧', link: '/utils/2017-03-28-post-xcode-tips.md' },
          { text: 'Git 技巧', link: '/utils/2019-04-15-git-comment.md' }
        ]
      }],

      "/guide": [{
        text: 'Markdown 介绍',
        items: [
          { text: 'Markdown 基础语法', link: '/guide/markdown' },
          { text: 'Markdown 扩展语法', link: '/guide/markdown-extension' },
          { text: 'Markdown 样例', link: '/guide/markdown-examples' },
          { text: 'api 样例', link: '/guide/api-examples' },
        ],
      }],
      "/network": [
      {
        text: '网络',
        items: [
          { text: 'http网络请求', link: '/network/https-tips' },
          
        ]
      }],
      "/engineering": [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    },

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
