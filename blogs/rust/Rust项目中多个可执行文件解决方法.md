---
title: Rust项目中多个可执行文件解决方法
date: 2024/04/03
categories:
 - Rust
---

## 问题背景
在VSCode+rust-analyzer（下简称ra）的Rust开发环境下，如果想要创建多个可执行文件，可能会导致ra插件不能正常使用的问题。本文则搜集整理目前存在可用的解决方法，整理出了以下几种方法，既包括使用Cargo的方法，也有不使用Cargo的方法。
## 使用Cargo构建项目
其实Cargo默认支持项目构建多个可执行文件的功能[[1]](https://zhuanlan.zhihu.com/p/655822067#ref_1)， 有下面两种方法。
### 1. 自动搜索
Cargo会自动搜索`src/bin`目录下的所有文件，因此在此目录下的文件都可以被Cargo运行。但值得注意的是，Cargo默认的可执行文件是`src/main.rs`，因此当使用`cargo run`命令时，只会运行`main.rs`程序。 所以，的当你想运行bin目录下的文件`hello.rs`，则需要命令`cargo run --bin hello`。
```
├── Cargo.toml
├── Cargo.lock
└── src
      ├── main.rs
      └── bin
            ├── hello.rs
            └── mod.rs
```
### 2. 手动配置
Cargo除了自动搜索以外，还提供了手动配置的功能。例如，我们不想把`hello.rs`放在`src/bin`目录下，我们则可以手动在`Cargo.toml`中配置其位置。配置的基本格式如下
```
[package]
name = "demo"
version = "0.1.0"
edition = "2021"

[[bin]]
name = "hello"
path = "src/hello.rs"

[[bin]]
name = "main"
path = "src/main.rs"
```
通过这样配置，我们将`hello.rs`放在`src`目录下，也能像上面一样通过`cargo run --bin hello`运行。<br />当然，可能有人后觉得这样手动配置的方式很麻烦，那么正好我有个朋友，最近在开发简化这种配置过程的VSCode插件，有兴趣的可以了解一下。
## 无Cargo构建项目
虽然说Rust社区十分推荐使用Cargo来构建项目，但是我相信也有很多特立独行的人非要找到一个不是Cargo也能构建Rust项目的方法，我恰巧也是其中的一员。<br />众所周知，不构建Cargo项目，是不能正常激活ra插件的，因此ra插件官网也提供一个类似于`Cargo.toml`的文件用于构建Rust项目，其名曰`rust-project.json`。通过这个文件也能在不使用Cargo构建项目的情况下，正常地使用到ra插件中代码提示和补全的功能。<br />如果你对这方面感兴趣的话，笔者也写了这方面的文章，可以访问下面的链接查看。
## 总结
以上就是这篇文章的所有内容，若谷你有更好的建议，可以直接在评论区提出，笔者看到了一定会认真回复。
## 参考

1. [^](https://zhuanlan.zhihu.com/p/655822067#ref_1_0)Cargo-Book [https://doc.rust-lang.org/cargo/reference/cargo-targets.html#target-auto-discovery](https://doc.rust-lang.org/cargo/reference/cargo-targets.html#target-auto-discovery)
