---
title: Windows 安装 Rust
date: 2024/04/02
categories:
 - Rust
---

Rust 本来提供了完整的 Windows 安装程序，但是要求同时安装 Visual C++ 编译工具，此外我怀疑它会修改系统（注册表、环境变量什么的），或者在用户目录（`%USERPROFILE%`）下存放文件，这是我所不喜欢的。不管是开发工具还是应用软件，我喜欢“便携安装”方式（Portable installation），把程序、数据和文档等等集中放在一个文件夹里，可以随意复制、移动、备份。
的确可以手工安装（[forge.rust-lang.org/infra/other…](https://link.juejin.cn/?target=https%3A%2F%2Fforge.rust-lang.org%2Finfra%2Fother-installation-methods.html) ），文档非常简略，没有给出具体步骤。所幸，事实表明，安装过程相当直观、顺利。我是昨天晚上安装的，此刻开始写这篇笔记已经是一天以后。
Rust 安装工具是 `rustup-init.exe`，从上面的链接页面可以下载。64 位 Windows 下有`x86_64-pc-windows-gnu`和`x86_64-pc-windows-msvc`两个版本。根据交叉编译工具的 Triplet 命名惯例，这两个版本的目标 ABI 分别是 GNU（`windows-gnu`）和 Windows（`windows-msvc`）。我选 GNU。
怀着对未知事物的忐忑心情，双击运行 `rustup-init.exe`，发现这是一个命令行工具。

![1712140772343image.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712140772343image.jpg)

提示信息劝导安装 Visual Studio。说 Windows linker 和库是必须的，而 Visual Studio 可以提供这些东西。输入选项3，不装。

![](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712140669393image.jpg)

这一屏有一些有用的信息，

- Rust 编译工具默认安装在 `%USERPROFILE%\.rustup` 目录，可以通过 `RUSTUP_HOME` 环境变量自定义
- 包管理器 Cargo 的默认目录是`%USERPROFILE%\.cargo`，可以通过 `CARGO_HOME` 环境变量自定义
- `%CARGO_HOME%\bin` 路径需要添加到 `PATH` 环境变量中。可见这里面将会安装一些可执行程序

选择选项3，先终止安装。在重新安装之前，先设置环境变量，以自定义安装目录。我打算将 Rust 安装到 `D:\devel\rust` 目录下。打开 Windows 命令行（`cmd.exe`），在命令行中设置环境变量，然后启动 `rustup-init.exe`。假设`rustup-init.exe`在安装目录下，依次执行以下命令：

```
cd D:\devel\rust
set RUSTUP_HOME=%CD%\.rustup
set CARGO_HOME=%CD%\.cargo
.\rustup-init.exe
```

在 `rustup-init.exe`启动后，重复前面的步骤，来到最后一屏时，输入选项2，自定义安装选项。主要是将 “default host triple” 设为`x86_64-pc-windows-gnu`，并且**不**修改系统 `PATH` 环境变量，详细步骤如下图。

![1712141055887image.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141055887image.jpg)

设定好安装选项后，输入选项1开始安装。安装过程中`rustup-init.exe`将会在线下载所需的包。耐心等待安装完成。
在安装目录（`D:\devel\rust`）下创建一个批处理脚本，比如`rust_cmdline.bat`，内容如下：

```
@echo off

set PATH=%windir%\System32

set RUSTUP_HOME=D:\devel\rust\.rustup
set CARGO_HOME=D:\devel\rust\.cargo
set PATH=%CARGO_HOME%\bin;%PATH%

start cmd.exe
```

双击这个脚本将会启动 Windows 命令行，并且已设置了必要的环境变量。试着在命令行中执行一下 `rustc` 和 `cargo`命令，看 Rust 是否正确安装，例如：

```
D:\devel\rust>cargo --version
cargo 1.68.2 (6feb7c9cf 2023-03-26)

D:\devel\rust>rustc --version
rustc 1.68.2 (9eb3afe9e 2023-03-27)
```

### 安装 VS Code
下载 VS Code zip 压缩包，解压即可。在解压目录中创建一个 `data` 文件夹，这样 VS Code 便成为 [Portable 模式](https://link.juejin.cn/?target=https%3A%2F%2Fcode.visualstudio.com%2Fdocs%2Feditor%2Fportable)。另外，在`data` 文件夹中创建一个`tmp` 文件夹，作为 VS Code 临时目录。
安装以下扩展：

- rust-analyzer。官方扩展，提供 Rust 语言支持
- Even Better TOML。提供 TOML 语法高亮和格式化
- CodeLLDB。Rust 文档声称，仅 Linux/macOS 环境下才需要，而 Windows 下则不需此扩展。我发现实际并非如此，如果不安装此扩展，调试 Rust 程序时不会在断点暂停
- C/C++ Extension Pack。微软官方 C/C++ 扩展包

要在正确的 Rust 环境下启动 VS Code。例如，在前面创建的命令行中启动 VS Code，确保相关环境变量能被 VS Code 所继承。
跟着这篇教程把 Hello World 跑起来：[code.visualstudio.com/docs/langua…](https://link.juejin.cn/?target=https%3A%2F%2Fcode.visualstudio.com%2Fdocs%2Flanguages%2Frust)
执行`rustup docs`命令，将会在浏览器中打开 Rust 文档。找到 “the book”，跟着学起来。
