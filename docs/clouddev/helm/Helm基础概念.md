---
title: Helm基础概念
date: 2024/04/03
categories:
 - 云原生
tags:
 - Helm
---

## 1.概述

Helm是k8s的包管理工具，类似Linux系统常用的 apt、yum等包管理工具。使用helm可以简化k8s应用部署

## 2.基本概念

- Chart：一个 Helm 包，其中包含了运行一个应用所需要的镜像、依赖和资源定义等，还可能包含 Kubernetes 集群中的服务定义，类似 Homebrew 中的 formula、APT 的 dpkg 或者 Yum 的 rpm 文件。
- Release：在 Kubernetes 集群上运行的 Chart 的一个实例。在同一个集群上，一个 Chart 可以安装很多次。每次安装都会创建一个新的 release。例如一个 MySQL Chart，如果想在服务器上运行两个数据库，就可以把这个 Chart 安装两次。每次安装都会生成自己的 Release，会有自己的 Release 名称。
- Repository：用于发布和存储 Chart 的存储库。

## 3.架构

![1712156255591image.jpg](https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712156255591image.jpg)

Chart Install 过程：

1. Helm从指定的目录或者tgz文件中解析出Chart结构信息
2. Helm将指定的Chart结构和Values信息通过gRPC传递给Tiller
3. Tiller根据Chart和Values生成一个Release
4. Tiller将Release发送给Kubernetes运行。

Chart Update过程：

1. Helm从指定的目录或者tgz文件中解析出Chart结构信息
2. Helm将要更新的Release的名称和Chart结构，Values信息传递给Tiller
3. Tiller生成Release并更新指定名称的Release的History
4. Tiller将Release发送给Kubernetes运行
