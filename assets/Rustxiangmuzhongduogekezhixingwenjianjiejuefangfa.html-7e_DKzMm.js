import{_ as o,r as d,o as i,c as s,a as e,b as a,d as n,e as c}from"./app-520BETNP.js";const t={},l=e("h2",{id:"问题背景",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#问题背景","aria-hidden":"true"},"#"),a(" 问题背景")],-1),u=e("p",null,"在VSCode+rust-analyzer（下简称ra）的Rust开发环境下，如果想要创建多个可执行文件，可能会导致ra插件不能正常使用的问题。本文则搜集整理目前存在可用的解决方法，整理出了以下几种方法，既包括使用Cargo的方法，也有不使用Cargo的方法。",-1),h=e("h2",{id:"使用cargo构建项目",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用cargo构建项目","aria-hidden":"true"},"#"),a(" 使用Cargo构建项目")],-1),g={href:"https://zhuanlan.zhihu.com/p/655822067#ref_1",target:"_blank",rel:"noopener noreferrer"},m=c(`<h3 id="_1-自动搜索" tabindex="-1"><a class="header-anchor" href="#_1-自动搜索" aria-hidden="true">#</a> 1. 自动搜索</h3><p>Cargo会自动搜索<code>src/bin</code>目录下的所有文件，因此在此目录下的文件都可以被Cargo运行。但值得注意的是，Cargo默认的可执行文件是<code>src/main.rs</code>，因此当使用<code>cargo run</code>命令时，只会运行<code>main.rs</code>程序。 所以，的当你想运行bin目录下的文件<code>hello.rs</code>，则需要命令<code>cargo run --bin hello</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>├── Cargo.toml
├── Cargo.lock
└── src
      ├── main.rs
      └── bin
            ├── hello.rs
            └── mod.rs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-手动配置" tabindex="-1"><a class="header-anchor" href="#_2-手动配置" aria-hidden="true">#</a> 2. 手动配置</h3><p>Cargo除了自动搜索以外，还提供了手动配置的功能。例如，我们不想把<code>hello.rs</code>放在<code>src/bin</code>目录下，我们则可以手动在<code>Cargo.toml</code>中配置其位置。配置的基本格式如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[package]
name = &quot;demo&quot;
version = &quot;0.1.0&quot;
edition = &quot;2021&quot;

[[bin]]
name = &quot;hello&quot;
path = &quot;src/hello.rs&quot;

[[bin]]
name = &quot;main&quot;
path = &quot;src/main.rs&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这样配置，我们将<code>hello.rs</code>放在<code>src</code>目录下，也能像上面一样通过<code>cargo run --bin hello</code>运行。<br>当然，可能有人后觉得这样手动配置的方式很麻烦，那么正好我有个朋友，最近在开发简化这种配置过程的VSCode插件，有兴趣的可以了解一下。</p><h2 id="无cargo构建项目" tabindex="-1"><a class="header-anchor" href="#无cargo构建项目" aria-hidden="true">#</a> 无Cargo构建项目</h2><p>虽然说Rust社区十分推荐使用Cargo来构建项目，但是我相信也有很多特立独行的人非要找到一个不是Cargo也能构建Rust项目的方法，我恰巧也是其中的一员。<br>众所周知，不构建Cargo项目，是不能正常激活ra插件的，因此ra插件官网也提供一个类似于<code>Cargo.toml</code>的文件用于构建Rust项目，其名曰<code>rust-project.json</code>。通过这个文件也能在不使用Cargo构建项目的情况下，正常地使用到ra插件中代码提示和补全的功能。<br>如果你对这方面感兴趣的话，笔者也写了这方面的文章，可以访问下面的链接查看。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>以上就是这篇文章的所有内容，若谷你有更好的建议，可以直接在评论区提出，笔者看到了一定会认真回复。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,12),v={href:"https://zhuanlan.zhihu.com/p/655822067#ref_1_0",target:"_blank",rel:"noopener noreferrer"},b={href:"https://doc.rust-lang.org/cargo/reference/cargo-targets.html#target-auto-discovery",target:"_blank",rel:"noopener noreferrer"};function _(p,f){const r=d("ExternalLinkIcon");return i(),s("div",null,[l,u,h,e("p",null,[a("其实Cargo默认支持项目构建多个可执行文件的功能"),e("a",g,[a("[1]"),n(r)]),a("， 有下面两种方法。")]),m,e("ol",null,[e("li",null,[e("a",v,[a("^"),n(r)]),a("Cargo-Book "),e("a",b,[a("https://doc.rust-lang.org/cargo/reference/cargo-targets.html#target-auto-discovery"),n(r)])])])])}const C=o(t,[["render",_],["__file","Rustxiangmuzhongduogekezhixingwenjianjiejuefangfa.html.vue"]]);export{C as default};