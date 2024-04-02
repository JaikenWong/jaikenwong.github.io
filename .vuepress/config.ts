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
        text: "Docs",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
    ]
  })
});
