import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Jaiken's Blog",
  description: "Just playing around",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
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
    docsRepo: "https://github.com/JaikenWong/jaikenwong.github.io.git",
    docsBranch: "gh-pages",
    docsDir: "/",
    lastUpdatedText: "",
    plugins: [],
    commentConfig: {
      type: "giscus",
      options: {
        repo: "JaikenWong/jaikenwong.github.io",
        repoId: "R_kgDOLoVp8w",
        category: "Announcements",
        categoryId: "DIC_kwDOLoVp884CeYXI",
        mapping: "title",
        hideComments: false, // 全局隐藏评论，默认 false
      },
    },
    // commentConfig: {
    //   type: 'valine',
    //   options: {
    //     appId: 'cEfaJdMxT5GADwcVdafssfDR-gzGzoHsz', // your appId
    //     appKey: 'jyIMDRb3gSK3Bl2hIYpQev7O', // your appKey
    //     hideComments: false, // 全局隐藏评论，默认 false
    //   },
    // },
    // series 为原 sidebar
    series: {
      "/docs/clouddev/helm": [
        {
          text: "基础",
          children: ["Helm基础概念.html", "Helm安装示例.html"],
        },
        {
          text: "模板",
          children: ["Helm模板语法.html"],
        },
      ],

      "/docs/datastructures": [
        {
          text: "数据结构",
          children: ["稀疏数组.html"],
        }
      ],

      "/docs/algorithms": [
        {
          text: "算法",
          children: ["博耶-摩尔投票算法.html"],
        }
      ],

      "/docs/interview/scene/": [
        {
          text: "场景面试",
          children: ["实现SpringBoot中订单30分钟自动取消.html"],
        }
      ],

      "/docs/interview/mysql/": [
        {
          text: "MySQL 索引",
          children: ["MySQL索引1-7.html", "MySQL索引相关数据结构.html","MySQL索引9-15.html"],
        },
        {
          text: "MySQL 内部技术架构",
          children: ["MySQL内部技术架构.html"],
        },
        {
          text: "MySQL 事务",
          children: ["MySQL事务.html"],
        },
        {
          text: "MySQL 开发",
          children: ["MySQL开发.html"],
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/" },
      { text: "时间纵轴", link: "/timeline/" },
      { text: "操作系统", link: "/categories/caozuoxitong/1/" },
      { text: "Rust语言", link: "/categories/Rust/1/" },
      {
        text: "开发工具",
        children: [
          { text: "Terminal", link: "/tags/Terminal/1/" },
          { text: "Keyboard", link: "/tags/keyboard/1/" },
          { text: "Github图床", link: "/tags/Githubtuchuang/1/" },
        ],
      },
      {
        text: "AI",
        children: [
          { text: "文字转语音", link: "/tags/TTS/1/" },
        ],
      },
      {
        text: "云原生",
        children: [
          { text: "Helm", link: "/docs/clouddev/helm/" },
          { text: "K8S", link: "/docs/clouddev" },
          { text: "Docker", link: "/docs/clouddev" },
          { text: "Istio", link: "/docs/clouddev/istio" },
        ],
      },
      {
        text: "算法和数据结构",
        children: [
          { text: "算法", link: "/docs/algorithms/" },
          { text: "数据结构", link: "/docs/datastructures/" }
        ],
      },
      {
        text: "面经",
        children: [
          { text: "MySQL", link: "/docs/interview/mysql/" },
          { text: "Scene", link: "/docs/interview/scene/" }
        ],
      },
    ],
  }),
});
