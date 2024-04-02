import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Jaiken's Blog",
  description: "Just playing around",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo-small.png",
    author: "Jaiken Wong",
    authorAvatar: "/logo-small.png",
    docsRepo: "https://github.com/JaikenWong/jaikenwong.github.io",
    docsBranch: "gh-pages",
    docsDir: "/",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/" },
      { text: "操作系统", link: "/categories/system/1/" },
      { text: "场景面试", link: "/categories/interview/1/" },
      { text: "Rust语言", link: "/categories/rust/1/" },
      {
        text: "开发工具",
        children: [
          { text: "Terminal", link:"/categories/terminal/1/" },
          { text: "Git", link: "/docs/tools" },
          { text: "Git Pages", link: "/docs/tools" },
          { text: "Other", link: "/docs/tools" }
        ],
      },
      {
        text: "云原生",
        children: [
          { text: "Helm", link: "/docs/clouddev" },
          { text: "K8S", link: "/docs/clouddev" },
          { text: "Docker", link: "/docs/clouddev" },
          { text: "Istio", link: "/docs/clouddev" }
        ],
      },
    ]
  })
});
