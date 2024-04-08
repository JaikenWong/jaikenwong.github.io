---
title: Windows终端美化工具Oh-My-Posh
date: 2024/04/02
categories:
 - Tools
tags:
 - Terminal
 - Oh-My-Posh
---

## 1. 前言

windows电脑上的[终端工具](https://so.csdn.net/so/search?q=终端工具&spm=1001.2101.3001.7020)Window terminal大家应该都不陌生，这里介绍一款美化工具，从此告别windows terminal的黑与白。

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125607653791712560765236.png)

## 2. Oh-My-Posh

Oh My Posh 是一个[命令行提示](https://so.csdn.net/so/search?q=命令行提示&spm=1001.2101.3001.7020)工具，通常用于美化和自定义终端提示符。它允许用户创建自定义的终端提示符，包括颜色、图标、文本样式等，以提高终端的可视化吸引力和功能性。Oh My Posh 通常与不同的终端环境和 shell（如 Bash、Zsh 和 PowerShell）兼容，因	此用户可以根据自己的喜好和需求配置终端提示符的外观和行为。这有助于提高终端用户的工作效率和舒适性。

官网地址：[Home | Oh My Posh](https://ohmyposh.dev/)

### 2.1. 在线安装

打开Microsoft Store，搜索oh my posh，直接安装即可。

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125608723721712560872064.png)

或者直接Windows Terminal直接输入命令安装：

```bash
winget install JanDeDobbeleer.OhMyPosh -s winget
```

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125610793691712561078540.png)

### 2.2. 离线安装

Github下载地址：[Releases · microsoft/terminal · GitHub](https://github.com/microsoft/terminal/releases)

下载后解压，双击主程序即可打开。

![img](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107257-f7bbd3b5-4858-4ca9-a5e4-daf767129a8e.png)

### 2.3. PowerShell配置

找到Windows Terminal配置文件：

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125611363661712561135804.png)

如果不存在的，可以新建该目录和文件：

Microsoft.PowerShell_profile.ps1文件添加内容：

```bash
 oh-my-posh init pwsh --config 'C:\Users\ray4t\AppData\Local\Programs\oh-my-posh\themes\remk.omp.json' | Invoke-Expression
```

配置完之后，重启即可。

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125612043651712561203663.png)

这里的乱码是需要安装字体。

### 2.4. Gitbash配置

Gitbash 也可以使用这些主题

```bash
eval "$(oh-my-posh --init --shell bash --config /c/Users/ray4t/AppData/Local/Programs/oh-my-posh/themes/onehalf.minimal.omp.json)"
```

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125618113531712561810627.png)

### 2.5. 字体安装

官网地址：[Fonts | Oh My Posh](https://ohmyposh.dev/docs/installation/fonts)。推荐我们安装[Nerd Font](https://www.nerdfonts.com/)。

下载字体后，点击安装。

安装后，在Windows Terminal的设置-> Windows PowerShell ->外观中可以选择我们对应的字体：

![img](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107689-8626bcdc-474e-4b7e-905a-677fdf8b660e.png)

也可以直接编辑配置文件，打开Windows Terminal终端，按快捷键ctrl + shift + 逗号键，弹出setting.json即为该终端的配置信息，编辑profiles->defaults：

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125613443621712561343392.png)

修改为：

```json
"defaults":
{
  "fontFace": "MesloLGM Nerd Font"
}
```

### 2.6. 设置主题

直接终端输入命令：Get-PoshThemes，即可查看支持的主题列表。

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125614053621712561405074.png)

选择一个自己的主题，如选择了gmay，那么只要修改Microsoft.PowerShell_profile.ps1文件中的主题内容即可：

```plain
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\xtoys.omp.json | Invoke-Expression
```

修改后，重启即可。

![img](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125615323591712561531509.png)

## 3. 小结

工具的美化，虽然不一定能提升效率，但是会让我们有时候枯燥的生活增加点色彩，有时候还能装装逼，快哉快哉，喜欢的可以试试看。

几个比较清爽的主题

```bash
Theme: xtoys

ray4t@DESKTOP-7STJMV5 D:\..\Rust-juejin HEAD:master ❯❯❯ 


Theme: zash

@ray4t ➜ Rust-juejin git(master) 


Theme: robbyrussell

➜ Rust-juejin git:(master) 


Theme: remk

ray4t  Rust-juejin  git(master)  15:09  


Theme: pure

ray4t D:\workplace\learn\Rust\Rust-juejin master ≡ 
❯


Theme: probua.minimal

ray4t@DESKTOP-7STJMV5 D:\workplace\learn\Rust\Rust-juejin git:master
>


Theme: onehalf.minimal


ray4t@DESKTOP-7STJMV5 D:\workplace\learn\Rust\Rust-juejin git:(master)
(0) >

Theme: neko

😺💬 Meow! What should I do next? ...                                               🏡 Rust-juejin git:(master)⌚ 15:09 😀💬 ~

Theme: half-life

ray4t in D:\workplace\learn\Rust\Rust-juejin on master λ 
```
