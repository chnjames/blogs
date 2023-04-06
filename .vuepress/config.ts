import recoTheme from "vuepress-theme-reco";
import navbar from "./navbar";
import head from "./head";
import series from "./series";

export default {
  base: '/blogs',
  title: "一点一木",
  description: "专注为了分享，而分享则能让更多人专注！",
  head,
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "James",
    authorAvatar: "/head.png",
    lastUpdatedText: "最后更新时间",
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
