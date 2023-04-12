import recoTheme from "vuepress-theme-reco";
import navbar from "./navbar";
import head from "./head";
import series from "./series";

export default {
  base: "/blogs/",
  title: "一点一木",
  description: "专注为了分享，而分享则能让更多人专注！",
  head,
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202304071611913.png",
    author: "James",
    authorAvatar: "https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202304071611913.png",
    // page meta
    editLinkText: "在 GitHub 上编辑此页",
    contributorsText: "贡献者",
    lastUpdatedText: "上次更新",
    // custom containers
    tip: "提示",
    warning: "注意",
    danger: "警告",
    // custom containers
    backToHome: "返回首页",
    notFound: [
      "这里什么都没有",
      "我们怎么到这来了？",
      "这是一个 404 页面",
      "看起来我们进入了错误的链接",
    ],
    // a11y
    openInNewWindow: "在新窗口打开",
    toggleDarkMode: "切换夜间模式",
    toggleSidebar: "切换侧边栏",
    series,
    navbar,
    commentConfig: {
      type: "valine",
      options: {
        appId: "Pd0B2pypsOxMRD2V3xJXaQkd-gzGzoHsz",
        appKey: "UNB1k6RyIxZ0c0lHGirz0Z1y",
        placeholder: "填写邮箱可以收到回复提醒哦！",
        visitor: true,
        recordIP: true,
        hideComments: true, // 隐藏评论
      },
    },
    // algolia: {
    //   appId: "I6ZHGXX76R",
    //   apiKey: "08f439c0e5480480430ed0f7fc4f1322",
    //   indexName: "chnjas",
    //   inputSelector: ".search-box",
    //   algoliaOptions: {
    //     button: {
    //       buttonText: "搜索文档",
    //       buttonAriaLabel: "搜索文档",
    //     },
    //     modal: {
    //       searchBox: {
    //         resetButtonTitle: "清除查询条件",
    //         resetButtonAriaLabel: "清除查询条件",
    //         cancelButtonText: "取消",
    //         cancelButtonAriaLabel: "取消",
    //       },
    //       startScreen: {
    //         recentSearchesTitle: "搜索历史",
    //         noRecentSearchesText: "没有搜索历史",
    //         saveRecentSearchButtonTitle: "保存至搜索历史",
    //         removeRecentSearchButtonTitle: "从搜索历史中移除",
    //         favoriteSearchesTitle: "收藏",
    //         removeFavoriteSearchButtonTitle: "从收藏中移除",
    //       },
    //       errorScreen: {
    //         titleText: "无法获取结果",
    //         helpText: "你可能需要检查你的网络连接",
    //       },
    //       footer: {
    //         selectText: "选择",
    //         navigateText: "切换",
    //         closeText: "关闭",
    //         searchByText: "搜索提供者",
    //       },
    //       noResultsScreen: {
    //         noResultsText: "无法找到相关结果",
    //         suggestedQueryText: "你可以尝试查询",
    //         reportMissingResultsText: "你认为该查询应该有结果？",
    //         reportMissingResultsLinkText: "点击反馈",
    //       },
    //     },
    //   },
    // },
  }),
};
