---
title: Windows terminal美化工具Oh-My-Posh
date: 2024/04/02
categories:
 - Terminal
---

## 1、前言

windows电脑上的[终端工具]Window terminal大家应该都不陌生，这里介绍一款美化工具，从此告别windows terminal的黑与白。
![1712141318173image.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141318173image.jpg)

## 2、Oh-My-Posh

Oh My Posh 是一个[命令行提示]工具，通常用于美化和自定义终端提示符。它允许用户创建自定义的终端提示符，包括颜色、图标、文本样式等，以提高终端的可视化吸引力和功能性。Oh My Posh 通常与不同的终端环境和 shell（如 Bash、Zsh 和 PowerShell）兼容，因此用户可以根据自己的喜好和需求配置终端提示符的外观和行为。这有助于提高终端用户的工作效率和舒适性。
官网地址：[Home | Oh My Posh](https://ohmyposh.dev/)

### 2.1、在线安装

打开Microsoft Store，搜索oh my posh，直接安装即可。
![1712141380607image.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141380607image.jpg)

或者直接Windows Terminal直接输入命令安装：

```bash
winget install JanDeDobbeleer.OhMyPosh -s winget
```
![1712141471777image-1.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141471777image-1.jpg)

### 2.2、离线安装

Github下载地址：[Releases · microsoft/terminal · GitHub](https://github.com/microsoft/terminal/releases)
下载后解压，双击主程序即可打开。
![1712141521311image-2.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141521311image-2.jpg)

### 2.3、配置

找到Windows Terminal配置文件：
![1712141583958image-3.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141583958image-3.jpg)
我的路径是：C:\Users\79304\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1。
如果不存在的，可以新建该目录和文件：
![1712141633442image-4.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141633442image-4.jpg)
Microsoft.PowerShell_profile.ps1文件添加内容：

```bash
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\jandedobbeleer.omp.json | Invoke-Expression
```

配置完之后，重启即可。
![1712141665655image-5.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141665655image-5.jpg)
这里的乱码是需要安装字体。

### 2.4、字体安装

官网地址：[Fonts | Oh My Posh](https://ohmyposh.dev/docs/installation/fonts)。推荐我们安装[Nerd Font](https://www.nerdfonts.com/)。
下载字体后，点击安装。
![1712141701987image-6.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141701987image-6.jpg)
安装后，在Windows Terminal的设置-> Windows PowerShell ->外观中可以选择我们对应的字体：
![1712141736852image-7.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141736852image-7.jpg)
也可以直接编辑配置文件，打开Windows Terminal终端，按快捷键ctrl + shift + 逗号键，弹出setting.json即为该终端的配置信息，编辑profiles->defaults：
![1712141774289image-8.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141774289image-8.jpg)
修改为：

```json
"defaults":
{
    "fontFace": "MesloLGM Nerd Font"
}
```

![1712141817515image-9.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141817515image-9.jpg)
添加我们的字体，修改后，重启Windows Terminal即可。
![1712141846636image-10.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141846636image-10.jpg)

### 2.5、设置主题

直接终端输入命令：Get-PoshThemes，即可查看支持的主题列表。
![1712141878260image-11.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141878260image-11.jpg)
选择一个自己的主题，如选择了gmay，那么只要修改Microsoft.PowerShell_profile.ps1文件中的主题内容即可：
```
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\gmay.omp.json | Invoke-Expression
```
修改后，重启即可。
![1712141905274image-12.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141905274image-12.jpg)

## 3、小结

工具的美化，虽然不一定能提升效率，但是会让我们有时候枯燥的生活增加点色彩，有时候还能装装逼，快哉快哉，喜欢的可以试试看。

> 来自: [Windows terminal美化工具Oh-My-Posh_oh my posh-CSDN博客](https://blog.csdn.net/p793049488/article/details/133821907)

