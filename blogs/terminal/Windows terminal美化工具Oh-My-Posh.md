---
title: Windows terminal美化工具Oh-My-Posh
date: 2024/04/02
categories:
 - terminal
---

## 1、前言

windows电脑上的[终端工具](https://so.csdn.net/so/search?q=%E7%BB%88%E7%AB%AF%E5%B7%A5%E5%85%B7&spm=1001.2101.3001.7020)Window terminal大家应该都不陌生，这里介绍一款美化工具，从此告别windows terminal的黑与白。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107233-604ef97e-2526-4304-b7fa-7d5af8bcffd1.png#averageHue=%232d2d2c&clientId=ue80221fe-8b01-4&from=paste&height=462&id=uad25d08b&originHeight=462&originWidth=1130&originalType=url&ratio=1&rotation=0&showTitle=false&size=66898&status=done&style=none&taskId=u48f2b189-702a-4523-a9df-a69b79e0e91&title=&width=1130)

## 2、Oh-My-Posh

Oh My Posh 是一个[命令行提示](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%8F%90%E7%A4%BA&spm=1001.2101.3001.7020)工具，通常用于美化和自定义终端提示符。它允许用户创建自定义的终端提示符，包括颜色、图标、文本样式等，以提高终端的可视化吸引力和功能性。Oh My Posh 通常与不同的终端环境和 shell（如 Bash、Zsh 和 PowerShell）兼容，因此用户可以根据自己的喜好和需求配置终端提示符的外观和行为。这有助于提高终端用户的工作效率和舒适性。
官网地址：[Home | Oh My Posh](https://ohmyposh.dev/)

### 2.1、在线安装

打开Microsoft Store，搜索oh my posh，直接安装即可。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107285-a47ac524-7739-4d8a-90c1-431f1a68d29a.png#averageHue=%236d5941&clientId=ue80221fe-8b01-4&from=paste&height=1007&id=u676b1971&originHeight=1007&originWidth=1195&originalType=url&ratio=1&rotation=0&showTitle=false&size=164512&status=done&style=none&taskId=uc7cdb639-8285-400d-ba14-1405fd774ef&title=&width=1195)
或者直接Windows Terminal直接输入命令安装：

```bash
winget install JanDeDobbeleer.OhMyPosh -s winget
```

![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107158-e5df6cd2-7ec4-4662-9f43-4e9b32e478f2.png#averageHue=%231b1b1a&clientId=ue80221fe-8b01-4&from=paste&height=79&id=u88eebe2d&originHeight=79&originWidth=715&originalType=url&ratio=1&rotation=0&showTitle=false&size=20639&status=done&style=none&taskId=u18a2bf54-bc21-4edf-8510-ea7147221a1&title=&width=715)

### 2.2、离线安装

Github下载地址：[Releases · microsoft/terminal · GitHub](https://github.com/microsoft/terminal/releases)
下载后解压，双击主程序即可打开。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107257-f7bbd3b5-4858-4ca9-a5e4-daf767129a8e.png#averageHue=%23fcfcfb&clientId=ue80221fe-8b01-4&from=paste&height=436&id=u76abaa91&originHeight=436&originWidth=671&originalType=url&ratio=1&rotation=0&showTitle=false&size=81271&status=done&style=none&taskId=u14a232d9-7976-4760-8348-3cf721ec1a4&title=&width=671)

### 2.3、配置

找到Windows Terminal配置文件：
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107188-6fc27e01-b85f-46e5-ad28-265eb6495ec0.png#averageHue=%23161616&clientId=ue80221fe-8b01-4&from=paste&height=306&id=ud811a3a8&originHeight=306&originWidth=808&originalType=url&ratio=1&rotation=0&showTitle=false&size=45016&status=done&style=none&taskId=u8f82b240-8074-4b99-b33e-378eb1d7c99&title=&width=808)
我的路径是：C:\Users\79304\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1。
如果不存在的，可以新建该目录和文件：
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107397-e67a8082-fe02-464f-af2a-60b441eccf06.png#averageHue=%231f1e1e&clientId=ue80221fe-8b01-4&from=paste&height=171&id=uea399817&originHeight=171&originWidth=623&originalType=url&ratio=1&rotation=0&showTitle=false&size=20021&status=done&style=none&taskId=u9bd0e18b-db31-49ed-bf30-441ec23411c&title=&width=623)
Microsoft.PowerShell_profile.ps1文件添加内容：

```bash
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\jandedobbeleer.omp.json | Invoke-Expression
```

配置完之后，重启即可。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107474-bd3c1740-bf75-4ae8-9bdf-77a2447c6f3c.png#averageHue=%23bd6224&clientId=ue80221fe-8b01-4&from=paste&height=212&id=u6b89bcd3&originHeight=212&originWidth=578&originalType=url&ratio=1&rotation=0&showTitle=false&size=29091&status=done&style=none&taskId=u35274795-8728-4ea8-abba-216f39d97a2&title=&width=578)
这里的乱码是需要安装字体。

### 2.4、字体安装

官网地址：[Fonts | Oh My Posh](https://ohmyposh.dev/docs/installation/fonts)。推荐我们安装[Nerd Font](https://www.nerdfonts.com/)。
下载字体后，点击安装。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107547-a7df7143-53bd-4947-ae48-c0c88623fde1.png#averageHue=%2324211f&clientId=ue80221fe-8b01-4&from=paste&height=578&id=uc2eef545&originHeight=578&originWidth=748&originalType=url&ratio=1&rotation=0&showTitle=false&size=128939&status=done&style=none&taskId=u617a3149-b86e-48fc-b94c-3fa2d567bf1&title=&width=748)
安装后，在Windows Terminal的设置-> Windows PowerShell ->外观中可以选择我们对应的字体：
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107689-8626bcdc-474e-4b7e-905a-677fdf8b660e.png#averageHue=%232c2c2c&clientId=ue80221fe-8b01-4&from=paste&height=538&id=ua880e803&originHeight=820&originWidth=1828&originalType=url&ratio=1&rotation=0&showTitle=false&size=279578&status=done&style=none&taskId=u17ec344a-c56a-494f-a503-8730569fa62&title=&width=1200)
也可以直接编辑配置文件，打开Windows Terminal终端，按快捷键ctrl + shift + 逗号键，弹出setting.json即为该终端的配置信息，编辑profiles->defaults：
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107617-69ce6ce9-bc61-40fd-998a-326033753457.png#averageHue=%232d2a29&clientId=ue80221fe-8b01-4&from=paste&height=230&id=ub257ffbf&originHeight=230&originWidth=595&originalType=url&ratio=1&rotation=0&showTitle=false&size=26550&status=done&style=none&taskId=ub936d52f-13d5-4087-9f3e-81461f1b17e&title=&width=595)
修改为：

```json
"defaults":
{
    "fontFace": "MesloLGM Nerd Font"
}
```

![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107727-c38b24a5-8957-4bb6-a573-030020c6ae83.png#averageHue=%232c2b2a&clientId=ue80221fe-8b01-4&from=paste&height=195&id=ud4371be6&originHeight=195&originWidth=476&originalType=url&ratio=1&rotation=0&showTitle=false&size=16994&status=done&style=none&taskId=u6c8d5796-b015-459d-bc29-c7b4157ea0b&title=&width=476)
添加我们的字体，修改后，重启Windows Terminal即可。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107779-0937fc19-f358-417a-ba38-c190acb11653.png#averageHue=%23141414&clientId=ue80221fe-8b01-4&from=paste&height=116&id=ub5873279&originHeight=116&originWidth=635&originalType=url&ratio=1&rotation=0&showTitle=false&size=23312&status=done&style=none&taskId=u30677c1e-26e4-4cde-a988-a501058f5ba&title=&width=635)

### 2.5、设置主题

直接终端输入命令：Get-PoshThemes，即可查看支持的主题列表。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024107888-67736cae-9f25-43e2-b753-671d7d220e18.png#averageHue=%230f0f0f&clientId=ue80221fe-8b01-4&from=paste&height=597&id=u578ef69c&originHeight=614&originWidth=1234&originalType=url&ratio=1&rotation=0&showTitle=false&size=54644&status=done&style=none&taskId=u9750dcd9-4f79-4e9a-8be4-2c299e4d6bd&title=&width=1200)
选择一个自己的主题，如选择了gmay，那么只要修改Microsoft.PowerShell_profile.ps1文件中的主题内容即可：
```
oh-my-posh init pwsh --config $env:POSH_THEMES_PATH\gmay.omp.json | Invoke-Expression
```
修改后，重启即可。
![image.jpg](https://cdn.nlark.com/yuque/0/2024/png/34556458/1712024108027-c431c1b1-f534-45e4-8b15-786927b29745.png#averageHue=%23131313&clientId=ue80221fe-8b01-4&from=paste&height=98&id=u1eb97c41&originHeight=98&originWidth=915&originalType=url&ratio=1&rotation=0&showTitle=false&size=13933&status=done&style=none&taskId=uaeee8ceb-2e87-4c98-aee6-7a138a86953&title=&width=915)

## 3、小结

工具的美化，虽然不一定能提升效率，但是会让我们有时候枯燥的生活增加点色彩，有时候还能装装逼，快哉快哉，喜欢的可以试试看。

> 来自: [Windows terminal美化工具Oh-My-Posh_oh my posh-CSDN博客](https://blog.csdn.net/p793049488/article/details/133821907)

