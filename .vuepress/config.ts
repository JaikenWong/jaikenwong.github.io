import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Jaiken's Blog",
  description: "Just playing around",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo-small.png",
    author: "Jaiken Wong",
    authorAvatar: "/logo-small.png",
    docsRepo: "https://github.com/JaikenWong/jaikenwong.github.io",
    docsBranch: "gh-pages",
    docsDir: "/",
    lastUpdatedText: "",
    plugins: [
      // [
      //   "vuepress-plugin-copycodeblock"
      // ]
    ],
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'cEfaJdMxT5GADwcVdafssfDR-gzGzoHsz', // your appId
        appKey: 'jyIMDRb3gSK3Bl2hIYpQev7O', // your appKey
        hideComments: false, // 全局隐藏评论，默认 false
      },
    },
    // series 为原 sidebar
    series: {
      "/docs/clouddev/helm": [
        {
          text: "基础",
          children: ["Helm基础概念.html","Helm安装示例.html",],
        },
        {
          text: "模板",
          children: ["Helm模板语法.html"],
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/" },
      { text: "操作系统", link: "/categories/caozuoxitong/1/" },
      { text: "场景面试", link: "/categories/changjingmianshi/1/" },
      { text: "Rust语言", link: "/categories/Rust/1/" },
      {
        text: "开发工具",
        children: [
          { text: "Terminal", link: "/categories/Terminal/1/" },
          { text: "Git", link: "/categories/git/1/" },
          { text: "Git Pages", link: "/categories/gitpages/1/" },
          { text: "Other", link: "/categories/tools-other/1/" },
        ],
      },
      {
        text: "云原生",
        children: [
          { text: "Helm", link: "/docs/clouddev/helm/" },
          { text: "K8S", link: "/docs/clouddev" },
          { text: "Docker", link: "/docs/clouddev" },
          { text: "Istio", link: "/docs/clouddev" },
        ],
      },
    ],
  }),
});
