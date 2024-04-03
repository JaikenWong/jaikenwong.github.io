---
title: Helm安装示例
date: 2024/04/03
categories:
 - 云原生
tags:
 - Helm
---

## 1.安装helm

helm主要包括helm客户端和Tiller服务端两部分，Tiller部署在k8s集群中。ps： 如果使用阿里云容器服务kubernetes版,默认已经安装了helm的服务端（Tiller）,只要安装helm客户端即可。可以根据自己的环境从github地址下载对应的安装包:下载地址：[https://github.com/helm/helm/releases](https://github.com/helm/helm/releases)

- windows 64位版: [https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-windows-amd64.zip](https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-windows-amd64.zip)
- linux 64位版：[https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-linux-arm64.tar.gz](https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-linux-arm64.tar.gz)
- mac 版本安装

```bash
brew install helm
```

下载后解压到自己喜欢的目录，然后配置下对应的PATH环境变量。默认情况helm操作k8s集群，需要借助kubectl命令的集群配置，可以参考这里配置kubectl命令-（[k8s应用配置详解](https://www.cnblogs.com/lyc94620/p/10945437.html)），当然也可以直接给helm命令指定--kubeconfig 参数指定k8s集群证书路径。

```bash
#这是通过--kubeconfig参数指定k8s证书的方式操作k8s集群
#下面命令是部署一个名字叫app-demo的应用，helm包在./chart目录中
/alidata/server/helm-v2.13.1/helm --kubeconfig ./config/k8s.conf install app-demo ./chart
```

安装服务端：使用helm init 命令，可以一键安装。ps: 关于chart仓库（Repository），通过helm命令：helm serve 就可以启动仓库服务，但是通常很多时候我们每个项目自己的chart包都跟着源码一起提交到git仓库，所以这里的chart仓库不是必须的。

## 2.基本用法

这里以制作一个简单的网站应用chart包为例子介绍helm的基本用法。ps: 这里跳过docker镜像制作过程，镜像制作可以参考：[Docker基础教程](https://www.cnblogs.com/lyc94620/p/10758219.html)

### 2.1.创建chart包

通过helm create命令创建一个新的chart包例子:#在当前目录创建一个myapp chart包创建完成后，得到的目录结构如下:

```
myapp                                   - chart 包目录名
├── charts                              - 依赖的子包目录，里面可以包含多个依赖的chart包
├── Chart.yaml                          - chart定义，可以定义chart的名字，版本号信息。
├── templates                           - k8s配置模版目录， 我们编写的k8s配置都在这个目录， 除了NOTES.txt和下划线开头命名的文件，其他文件可以随意命名。
│   ├── deployment.yaml
│   ├── _helpers.tpl                    - 下划线开头的文件，helm视为公共库定义文件，主要用于定义通用的子模版、函数等，helm不会将这些公共库文件的渲染结果提交给k8s处理。
│   ├── ingress.yaml
│   ├── NOTES.txt                       - chart包的帮助信息文件，执行helm install命令安装成功后会输出这个文件的内容。
│   └── service.yaml
└── values.yaml                         - chart包的参数配置文件，模版可以引用这里参数。
```

我们要在k8s中部署一个网站应用，需要编写deployment、service、ingress三个配置文件，刚才通过helm create命令已经创建好了。

### 2.2.编写k8s应用部署配置文件

为了演示chart包模版的用法，我们先把deployment、service、ingress三个配置文件的内容清空，重新编写k8s部署文件。deployment.yaml 配置文件定义如下：

```yaml
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: myapp           #deployment应用名
  labels:
    app: myapp          #deployment应用标签定义
spec:
  replicas: 1           #pod副本数
  selector:
    matchLabels:
      app: myapp          #pod选择器标签
  template:
    metadata:
      labels:
        app: myapp          #pod标签定义
    spec:
      containers:
        - name: myapp           #容器名
          image: xxxxxx:1.7.9    #镜像地址
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

service.yaml定义如下：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc #服务名
spec:
  selector: #pod选择器定义
    app: myapp
  ports:
  - protocol: TCP 
    port: 80
    targetPort: 80
```

ingress.yaml定义如下：

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: myapp-ingress #ingress应用名
spec:
  rules:
    - host: www.xxxxx.com  #域名
      http:
        paths: 
          - path: /  
            backend: 
              serviceName: myapp-svc #服务名
              servicePort: 80
```

### 2.3.提取k8s应用部署配置文件中的参数，作为chart包参数。

上面已经完成k8s应用部署配置文件的编写。为什么要提取上面配置文件中的参数，作为chart包的参数？思考下面的问题：我们制作好一个chart包之后，如实现chart包更具有通用性，我们如何换域名？换镜像地址？改一下应用部署的名字？  部署多套环境（例如：dev环境、test环境分别以不同的应用名字部署一套）5.2定义的k8s配置文件还不能称之为模版，都是固定的配置。（这里所说的模版就类似大家平时做前端开发的时候用的模版技术是一个概念）我们通过提取配置中的参数，注入模版变量，模版表达式将配置文件转化为模版文件，helm在运行的时候根据参数动态的将模版文件渲染成最终的配置文件。下面将deployment、service、ingress三个配置文件转换成模版文件。ps:  {{  }} 两个花括号包裹的内容为模版表达式，具体含义，后面会说明，这里不用理会。deployment.yaml 配置模版如下：

```yaml
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  name: {{ .Release.Name }}  #deployment应用名
  labels:
    app: {{ .Release.Name }}          #deployment应用标签定义
spec:
  replicas: {{ .Values.replicas}}           #pod副本数
  selector:
    matchLabels:
      app: {{ .Release.Name }}          #pod选择器标签
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}          #pod标签定义
    spec:
      containers:
        - name: {{ .Release.Name }}           #容器名
          image: {{ .Values.image }}:{{ .Values.imageTag }}    #镜像地址
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
```

service.yaml定义如下：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-svc #服务名
spec:
  selector: #pod选择器定义
    app: {{ .Release.Name }}
  ports:
  - protocol: TCP 
    port: 80
    targetPort: 80
```

ingress.yaml定义如下：

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: {{ .Release.Name }}-ingress #ingress应用名
spec:
  rules:
    - host: {{ .Values.host }}  #域名
      http:
        paths: 
          - path: /  
            backend: 
              serviceName: {{ .Release.Name }}-svc #服务名
              servicePort: 80
```

values.yaml chart包参数定义：

```
#域名
host: www.XXX.com
 
#镜像参数
image: XXXXXXXXXXXXXXXXXX
imageTag: 1.7.9
 
#pod 副本数
replicas:1
```

### 2.4.通过helm命令安装/更新应用

安装应用:#命令格式: helm install  chart包目录

```bash
$ helm install ./myapp
```

通过命令注入参数

```bash
#命令格式: helm install  --set key=value   chart包目录
#–set 参数可以指定多个参数，他的值会覆盖values.yaml定义的值，对象类型数据可以用 . (点)分割属性名,例子:  --set apiAppResources.requests.cpu=1

$ helm install     \
--set replicas=2   \
--set host=www.xxxx.com \
 ./myapp
```

更新应用：#命令格式: helm upgrade release名字  chart包目录

```bash
$ helm upgrade myapp ./myapp
```

也可以指定–set参数

```bash
$ helm upgrade      \
--set replicas=2   \
--set host=www.xxxx.com \
 myapp ./myapp
```

默认情况下，如果release名字不存在，upgrade会失败，可以加上-i 参数当release不存在的时候则安装，存在则更新，将install和uprade命令合并。

```bash
$ helm upgrade  -i    \
--set replicas=2   \
--set host=www.xxxx.com \
 myapp ./myapp
```