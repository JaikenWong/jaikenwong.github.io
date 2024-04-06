---
title: IDEA 代码格式化插件使用
date: 2024/04/06
categories:
 - Tools
tags:
 - IDEA
 - Code Formatter
---

## 1. 代码格式化目的

为了解决项目开发过程中由于不同格式化方式导致git提交经常发生冲突的问题，IDEA开发代码格式化需要进行统一规范。

## 2. alibaba编码规范介绍

阿里巴巴 Java 编码指南，整合了阿里巴巴集团技术团队多年来的最佳编程实践。鼓励重用和更好地理解彼此的程序，因此大量 Java 编程团队对跨项目的代码质量提出了苛刻的要求。 过去我们见过很多编程问题，难以维护的混乱代码结构， 为了解决这些问题，统一代码格式化规范。

### 2.1. 格式化插件下载

idea 插件中下载Adapter for Eclipse Code Formatter

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/711145de-f3de-11ee-9e94-02d634b58295.png)

安装好后restart一下！

### 2.2. 导入eclipse-codestyle.xml文件

idea重启后在设置里面打开 Adapter for Eclipse Code Formatter ，如图中操作将eclipse-codestyle.xml文件导入，最后apply即可，每个应用都需独立配置一次。

[参考连接及文档](https://link.zhihu.com/?target=https%3A//github.com/yansheng836/eclipse-codestyle)

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/711c41b4-f3de-11ee-a03c-02d634b58295.png)

## 3. 插件配置

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/713013ce-f3de-11ee-a5bd-02d634b58295.png)

## 4. 插件使用

热键：ctrl+alt+l 格式化代码