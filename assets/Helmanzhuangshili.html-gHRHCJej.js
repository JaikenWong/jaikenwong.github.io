import{_ as p,r as l,o as c,c as i,a as n,b as s,d as e,t as o,e as t}from"./app-520BETNP.js";const u={},r=n("h2",{id:"_1-安装helm",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-安装helm","aria-hidden":"true"},"#"),s(" 1.安装helm")],-1),d={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},k={href:"https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-windows-amd64.zip",target:"_blank",rel:"noopener noreferrer"},m={href:"https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-linux-arm64.tar.gz",target:"_blank",rel:"noopener noreferrer"},v=n("li",null,"mac 版本安装",-1),b=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> helm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),h={href:"https://www.cnblogs.com/lyc94620/p/10945437.html",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#这是通过--kubeconfig参数指定k8s证书的方式操作k8s集群</span>
<span class="token comment">#下面命令是部署一个名字叫app-demo的应用，helm包在./chart目录中</span>
/alidata/server/helm-v2.13.1/helm <span class="token parameter variable">--kubeconfig</span> ./config/k8s.conf <span class="token function">install</span> app-demo ./chart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装服务端：使用helm init 命令，可以一键安装。ps: 关于chart仓库（Repository），通过helm命令：helm serve 就可以启动仓库服务，但是通常很多时候我们每个项目自己的chart包都跟着源码一起提交到git仓库，所以这里的chart仓库不是必须的。</p><h2 id="_2-基本用法" tabindex="-1"><a class="header-anchor" href="#_2-基本用法" aria-hidden="true">#</a> 2.基本用法</h2>`,3),g={href:"https://www.cnblogs.com/lyc94620/p/10758219.html",target:"_blank",rel:"noopener noreferrer"},x=t(`<h3 id="_2-1-创建chart包" tabindex="-1"><a class="header-anchor" href="#_2-1-创建chart包" aria-hidden="true">#</a> 2.1.创建chart包</h3><p>通过helm create命令创建一个新的chart包例子:#在当前目录创建一个myapp chart包创建完成后，得到的目录结构如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>myapp                                   - chart 包目录名
├── charts                              - 依赖的子包目录，里面可以包含多个依赖的chart包
├── Chart.yaml                          - chart定义，可以定义chart的名字，版本号信息。
├── templates                           - k8s配置模版目录， 我们编写的k8s配置都在这个目录， 除了NOTES.txt和下划线开头命名的文件，其他文件可以随意命名。
│   ├── deployment.yaml
│   ├── _helpers.tpl                    - 下划线开头的文件，helm视为公共库定义文件，主要用于定义通用的子模版、函数等，helm不会将这些公共库文件的渲染结果提交给k8s处理。
│   ├── ingress.yaml
│   ├── NOTES.txt                       - chart包的帮助信息文件，执行helm install命令安装成功后会输出这个文件的内容。
│   └── service.yaml
└── values.yaml                         - chart包的参数配置文件，模版可以引用这里参数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们要在k8s中部署一个网站应用，需要编写deployment、service、ingress三个配置文件，刚才通过helm create命令已经创建好了。</p><h3 id="_2-2-编写k8s应用部署配置文件" tabindex="-1"><a class="header-anchor" href="#_2-2-编写k8s应用部署配置文件" aria-hidden="true">#</a> 2.2.编写k8s应用部署配置文件</h3><p>为了演示chart包模版的用法，我们先把deployment、service、ingress三个配置文件的内容清空，重新编写k8s部署文件。deployment.yaml 配置文件定义如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1beta2
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp           <span class="token comment">#deployment应用名</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp          <span class="token comment">#deployment应用标签定义</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>           <span class="token comment">#pod副本数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp          <span class="token comment">#pod选择器标签</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp          <span class="token comment">#pod标签定义</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp           <span class="token comment">#容器名</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> xxxxxx<span class="token punctuation">:</span>1.7.9    <span class="token comment">#镜像地址</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>service.yaml定义如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>svc <span class="token comment">#服务名</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#pod选择器定义</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP 
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ingress.yaml定义如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>ingress <span class="token comment">#ingress应用名</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> www.xxxxx.com  <span class="token comment">#域名</span>
      <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span> 
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /  
            <span class="token key atrule">backend</span><span class="token punctuation">:</span> 
              <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>svc <span class="token comment">#服务名</span>
              <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-提取k8s应用部署配置文件中的参数-作为chart包参数。" tabindex="-1"><a class="header-anchor" href="#_2-3-提取k8s应用部署配置文件中的参数-作为chart包参数。" aria-hidden="true">#</a> 2.3.提取k8s应用部署配置文件中的参数，作为chart包参数。</h3>`,12),_=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1beta2
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment">#deployment应用名</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>          <span class="token comment">#deployment应用标签定义</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.replicas<span class="token punctuation">}</span><span class="token punctuation">}</span>           <span class="token comment">#pod副本数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>          <span class="token comment">#pod选择器标签</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>          <span class="token comment">#pod标签定义</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>           <span class="token comment">#容器名</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.image <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">:</span><span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.imageTag <span class="token punctuation">}</span><span class="token punctuation">}</span>    <span class="token comment">#镜像地址</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>service.yaml定义如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>svc <span class="token comment">#服务名</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#pod选择器定义</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP 
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ingress.yaml定义如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>ingress <span class="token comment">#ingress应用名</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.host <span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment">#域名</span>
      <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span> 
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /  
            <span class="token key atrule">backend</span><span class="token punctuation">:</span> 
              <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>svc <span class="token comment">#服务名</span>
              <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>values.yaml chart包参数定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#域名
host: www.XXX.com
 
#镜像参数
image: XXXXXXXXXXXXXXXXXX
imageTag: 1.7.9
 
#pod 副本数
replicas:1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-通过helm命令安装-更新应用" tabindex="-1"><a class="header-anchor" href="#_2-4-通过helm命令安装-更新应用" aria-hidden="true">#</a> 2.4.通过helm命令安装/更新应用</h3><p>安装应用:#命令格式: helm install chart包目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ helm <span class="token function">install</span> ./myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过命令注入参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#命令格式: helm install  --set key=value   chart包目录</span>
<span class="token comment">#–set 参数可以指定多个参数，他的值会覆盖values.yaml定义的值，对象类型数据可以用 . (点)分割属性名,例子:  --set apiAppResources.requests.cpu=1</span>

$ helm <span class="token function">install</span>     <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">replicas</span><span class="token operator">=</span><span class="token number">2</span>   <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">host</span><span class="token operator">=</span>www.xxxx.com <span class="token punctuation">\\</span>
 ./myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新应用：#命令格式: helm upgrade release名字 chart包目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ helm upgrade myapp ./myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以指定–set参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ helm upgrade      <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">replicas</span><span class="token operator">=</span><span class="token number">2</span>   <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">host</span><span class="token operator">=</span>www.xxxx.com <span class="token punctuation">\\</span>
 myapp ./myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，如果release名字不存在，upgrade会失败，可以加上-i 参数当release不存在的时候则安装，存在则更新，将install和uprade命令合并。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ helm upgrade  <span class="token parameter variable">-i</span>    <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">replicas</span><span class="token operator">=</span><span class="token number">2</span>   <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">host</span><span class="token operator">=</span>www.xxxx.com <span class="token punctuation">\\</span>
 myapp ./myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function f(w,X){const a=l("ExternalLinkIcon");return c(),i("div",null,[r,n("p",null,[s("helm主要包括helm客户端和Tiller服务端两部分，Tiller部署在k8s集群中。ps： 如果使用阿里云容器服务kubernetes版,默认已经安装了helm的服务端（Tiller）,只要安装helm客户端即可。可以根据自己的环境从github地址下载对应的安装包:下载地址："),n("a",d,[s("https://github.com/helm/helm/releases"),e(a)])]),n("ul",null,[n("li",null,[s("windows 64位版: "),n("a",k,[s("https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-windows-amd64.zip"),e(a)])]),n("li",null,[s("linux 64位版："),n("a",m,[s("https://storage.googleapis.com/kubernetes-helm/helm-v2.13.1-linux-arm64.tar.gz"),e(a)])]),v]),b,n("p",null,[s("下载后解压到自己喜欢的目录，然后配置下对应的PATH环境变量。默认情况helm操作k8s集群，需要借助kubectl命令的集群配置，可以参考这里配置kubectl命令-（"),n("a",h,[s("k8s应用配置详解"),e(a)]),s("），当然也可以直接给helm命令指定--kubeconfig 参数指定k8s集群证书路径。")]),y,n("p",null,[s("这里以制作一个简单的网站应用chart包为例子介绍helm的基本用法。ps: 这里跳过docker镜像制作过程，镜像制作可以参考："),n("a",g,[s("Docker基础教程"),e(a)])]),x,n("p",null,"上面已经完成k8s应用部署配置文件的编写。为什么要提取上面配置文件中的参数，作为chart包的参数？思考下面的问题：我们制作好一个chart包之后，如实现chart包更具有通用性，我们如何换域名？换镜像地址？改一下应用部署的名字？ 部署多套环境（例如：dev环境、test环境分别以不同的应用名字部署一套）5.2定义的k8s配置文件还不能称之为模版，都是固定的配置。（这里所说的模版就类似大家平时做前端开发的时候用的模版技术是一个概念）我们通过提取配置中的参数，注入模版变量，模版表达式将配置文件转化为模版文件，helm在运行的时候根据参数动态的将模版文件渲染成最终的配置文件。下面将deployment、service、ingress三个配置文件转换成模版文件。ps: "+o()+" 两个花括号包裹的内容为模版表达式，具体含义，后面会说明，这里不用理会。deployment.yaml 配置模版如下：",1),_])}const V=p(u,[["render",f],["__file","Helmanzhuangshili.html.vue"]]);export{V as default};
