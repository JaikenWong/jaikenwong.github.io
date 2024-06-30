import{_ as n,o as a,c as s,e}from"./app-520BETNP.js";const i={},l=e(`<h2 id="_1-模版语法" tabindex="-1"><a class="header-anchor" href="#_1-模版语法" aria-hidden="true">#</a> 1.模版语法</h2><h3 id="_1-1-表达式" tabindex="-1"><a class="header-anchor" href="#_1-1-表达式" aria-hidden="true">#</a> 1.1.表达式</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>模版表达式： {{ 模版表达式 }}
模版表达式： {{- 模版表达式 -}} 
表示去掉表达式输出结果前面和后面的空格，
  去掉前面空格可以这么写{{- 模版表达式 }}, 
  去掉后面空格 {{ 模版表达式 -}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-变量" tabindex="-1"><a class="header-anchor" href="#_1-2-变量" aria-hidden="true">#</a> 1.2.变量</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>默认情况点( . ), 代表全局作用域，用于引用全局对象。
例子：#这里引用了全局作用域下的Values对象中的key属性。 
{{ .Values.key }}
helm全局作用域中有两个重要的全局对象：
Values和ReleaseValues代表的就是values.yaml定义的参数，
通过.Values可以引用任意参数。
例子：{{ .Values.replicaCount }}
#引用嵌套对象例子，跟引用json嵌套对象类似
{{ .Values.image.repository }}
Release代表一次应用发布，下面是Release对象包含的属性字段：
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Release.Name - release的名字，一般通过Chart.yaml定义，或者通过helm命令在安装应用的时候指定。</li><li>Release.Time - release安装时间</li><li>Release.Namespace - k8s名字空间</li><li>Release.Revision - release版本号，是一个递增值，每次更新都会加一</li><li>Release.IsUpgrade - true代表，当前release是一次更新.</li><li>Release.IsInstall - true代表，当前release是一次安装</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>例子:{{ .Release.Name }}
除了系统自带的变量，我们自己也可以自定义模版变量。
#变量名以$开始命名， 
赋值运算符是 := (冒号+等号)
{{- $relname := .Release.Name -}}
引用自定义变量:#不需要 . 引用{{ $relname }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-函数-管道运算符" tabindex="-1"><a class="header-anchor" href="#_1-3-函数-管道运算符" aria-hidden="true">#</a> 1.3.函数&amp;管道运算符</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>调用函数的语法：{{ functionName arg1 arg2... }}
例子:
#调用quote函数，将结果用“”引号包括起来。
{{ quote .Values.favorite.food }}
管道（pipelines）运算符 |
类似linux shell命令，通过管道 | 将多个命令串起来，处理模版输出的内容。
例子：
#将.Values.favorite.food传递给quote函数处理，然后在输出结果。
{{ .Values.favorite.food | quote  }}
#先将.Values.favorite.food的值传递给upper函数将字符转换成大写，然后专递给quote加上引号包括起来。
{{ .Values.favorite.food | upper | quote }}
#如果.Values.favorite.food为空，则使用default定义的默认值{{ .Values.favorite.food | default &quot;默认值&quot; }}
#将.Values.favorite.food输出5次{{ .Values.favorite.food | repeat 5 }}
#对输出结果缩进2个空格
{{ .Values.favorite.food | nindent 2 }}
常用的关系运算符&gt;、 &gt;=、 &lt;、!=、与或非在helm模版中都以函数的形式实现。
关系运算函数定义：
\`eq  相当于 =\`
\`ne  相当于 !=\`
\`lt  相当于 &lt;=\`
\`gt  相当于 &gt;=\`
\`and  相当于 &amp;&amp;\`
\`or   相当于 ||\`
\`not  相当于 !\`
例子:
#相当于 if (.Values.fooString &amp;&amp; (.Values.fooString == &quot;foo&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">{</span><span class="token punctuation">{</span> if and .Values.fooString (eq .Values.fooString &quot;foo&quot;) <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">...</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-流程控制语句" tabindex="-1"><a class="header-anchor" href="#_1-4-流程控制语句" aria-hidden="true">#</a> 1.4.流程控制语句</h3><h4 id="_1-4-1-if-else" tabindex="-1"><a class="header-anchor" href="#_1-4-1-if-else" aria-hidden="true">#</a> 1.4.1. IF/ELSE</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法:
{{ if 条件表达式 }}
# Do something
{{ else if 条件表达式 }}
# Do something else
{{ else }}
# Default case{{ end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IF/ELSE 例子:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>configmap
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">myvalue</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello World&quot;</span>
  <span class="token key atrule">drink</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.favorite.drink <span class="token punctuation">|</span> default &quot;tea&quot; <span class="token punctuation">|</span> quote <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">food</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.favorite.food <span class="token punctuation">|</span> upper <span class="token punctuation">|</span> quote <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span>if eq .Values.favorite.drink &quot;coffee&quot;<span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">mug</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span>end<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-2-with" tabindex="-1"><a class="header-anchor" href="#_1-4-2-with" aria-hidden="true">#</a> 1.4.2. with</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>with主要就是用来修改 . 作用域的，默认 . 代表全局作用域，with语句可以修改.的含义.
语法:
{{ with 引用的对象 }}
这里可以使用 . (点)， 直接引用with指定的对象
{{ end }}
例子:
#.Values.favorite是一个object类型
{{- with .Values.favorite }}
drink: {{ .drink | default &quot;tea&quot; | quote }}   #相当于.Values.favorite.drink
food: {{ .food | upper | quote }}
{{- end }}

ps: 不能在with作用域内使用 . 引用全局对象, 如果非要在with里面引用全局对象，可以先在with外面将全局对象复制给一个变量，然后在with内部使用这个变量引用全局对象。

例子:{{- $release:= .Release.Name -}}   #先将值保存起来{{- with .Values.favorite }}
drink: {{ .drink | default &quot;tea&quot; | quote }}   #相当于.Values.favorite.drink
food: {{ .food | upper | quote }}
release: {{ $release }} #间接引用全局对象的值
{{- end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-3-range" tabindex="-1"><a class="header-anchor" href="#_1-4-3-range" aria-hidden="true">#</a> 1.4.3. range</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>range主要用于循环遍历数组类型。
语法1:
#遍历map类型，用于遍历键值对象
#变量key代表对象的属性名，val代表属性值
{{- range key,val := 键值对象 }}
{{ $key }}: {{ $val | quote }}
{{- end}}
语法2：
{{- range 数组 }}
{{ . | title | quote }} # . (点)，引用数组元素值。
{{- end }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#values.yaml定义</span>
 
<span class="token comment">#map类型</span>
<span class="token key atrule">favorite</span><span class="token punctuation">:</span>
  <span class="token key atrule">drink</span><span class="token punctuation">:</span> coffee
  <span class="token key atrule">food</span><span class="token punctuation">:</span> pizza
 
<span class="token comment">#数组类型</span>
<span class="token key atrule">pizzaToppings</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> mushrooms
  <span class="token punctuation">-</span> cheese
  <span class="token punctuation">-</span> peppers
  <span class="token punctuation">-</span> onions
 
<span class="token key atrule">map类型遍历例子</span><span class="token punctuation">:</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> range $key<span class="token punctuation">,</span> $val <span class="token punctuation">:</span>= .Values.favorite <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> $key <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> $val <span class="token punctuation">|</span> quote <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end<span class="token punctuation">}</span><span class="token punctuation">}</span>
 
<span class="token key atrule">数组类型遍历例子</span><span class="token punctuation">:</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> range .Values.pizzaToppings<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> . <span class="token punctuation">|</span> quote <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-子模版定义" tabindex="-1"><a class="header-anchor" href="#_1-5-子模版定义" aria-hidden="true">#</a> 1.5.子模版定义</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>我们可以在_(下划线)开头的文件中定义子模版，方便后续复用。
helm create默认为我们创建了_helpers.tpl 公共库定义文件，可以直接在里面定义子模版，也可以新建一个，只要以下划线开头命名即可。

子模版语法:
定义模版{{ define &quot;模版名字&quot; }} 模版内容 {{ end }}
引用模版:
{{ include &quot;模版名字&quot; 作用域}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#模版定义</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> define &quot;mychart.app&quot; <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">app_name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">app_version</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ .Chart.Version }}+{{ .Release.Time.Seconds }}&quot;</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
 
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>configmap
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span> include &quot;mychart.app&quot; . <span class="token punctuation">|</span> nindent 4 <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment">#引用mychart.app模版内容，并对输出结果缩进4个空格</span>
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">myvalue</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello World&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6-调试" tabindex="-1"><a class="header-anchor" href="#_1-6-调试" aria-hidden="true">#</a> 1.6.调试</h3><p>编写好chart包的模版之后，我们可以给helm命令加上--debug --dry-run 两个参数，让helm输出模版结果，但是不把模版输出结果交给k8s处理。例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#helm install命令类似，加上--debug --dry-run两个参数即可</span>
$ helm upgrade <span class="token parameter variable">--debug</span> --dry-run <span class="token parameter variable">-i</span>    <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">replicas</span><span class="token operator">=</span><span class="token number">2</span>   <span class="token punctuation">\\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">host</span><span class="token operator">=</span>www.xxxx.com <span class="token punctuation">\\</span>
myapp ./myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),t=[l];function u(p,c){return a(),s("div",null,t)}const o=n(i,[["render",u],["__file","Helmmobanyufa.html.vue"]]);export{o as default};
