import recoTheme from "vuepress-theme-reco";
import navbar from "./navbar";
import head from "./head";
import series from "./series";

export default {
  base: '/',
  title: "一点一木",
  description: "专注为了分享，而分享则能让更多人专注！",
  head,
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "James",
    authorAvatar: "/head.png",
    // page meta
    editLinkText: '在 GitHub 上编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    // custom containers
    tip: '提示',
    warning: '注意',
    danger: '警告',
    // custom containers
    backToHome: '返回首页',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接'
    ],
    // a11y
    openInNewWindow: '在新窗口打开',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',
    series,
    navbar,
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'Pd0B2pypsOxMRD2V3xJXaQkd-gzGzoHsz',
        appKey: 'UNB1k6RyIxZ0c0lHGirz0Z1y',
        placeholder: '填写邮箱可以收到回复提醒哦！',
        visitor: true,
        recordIP: true,
        hideComments: true // 隐藏评论
      }
    }
  })
};
