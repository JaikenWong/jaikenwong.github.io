import{_ as n,o as s,c as a,e as p}from"./app-520BETNP.js";const t={},e=p(`<h2 id="_1-从实际需求出发" tabindex="-1"><a class="header-anchor" href="#_1-从实际需求出发" aria-hidden="true">#</a> 1. 从实际需求出发</h2><p>编写的五子棋程序中，有存盘退出和续上盘的功能。</p><p><img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125588164421712558815526.png" alt="img"></p><p>因为该二维数组的很多值是默认值 0, 因此记录了很多没有意义的数据.-&gt;稀疏数组。</p><h2 id="_2-基本介绍" tabindex="-1"><a class="header-anchor" href="#_2-基本介绍" aria-hidden="true">#</a> 2. 基本介绍</h2><p>当一个数组中大部分元素为０，或者为同一个值的数组时，可以使用稀疏数组来保存该数组。</p><p>稀疏数组的处理方法是:</p><ul><li>记录数组一共有几行几列，有多少个不同的值。</li><li>把具有不同值的元素的行列及值记录在一个小规模的数组中，从而缩小程序的规模。</li></ul><p><img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125594654161712559464811.png" alt="img"></p><p>这里的第0行 表示的是整个棋盘的 行列和棋子数目。</p><h2 id="_3-应用示例" tabindex="-1"><a class="header-anchor" href="#_3-应用示例" aria-hidden="true">#</a> 3. 应用示例</h2><p>给定一个棋盘假设就如上图中的情况 11* 11 的棋盘，在 (1,2) 和（2,3） 位置上存在两子。如何进行稀疏数组存储。</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> map <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">;</span> <span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    map<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    map<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token function">to_sparse_array</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">to_sparse_array</span><span class="token punctuation">(</span>map<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token keyword">i32</span><span class="token punctuation">;</span> <span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> sum<span class="token punctuation">:</span><span class="token keyword">i32</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">..</span><span class="token number">11</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">..</span><span class="token number">11</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> map<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
                sum <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> resut<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token macro property">vec!</span><span class="token punctuation">[</span><span class="token macro property">vec!</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">;</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">(</span>sum<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token keyword">usize</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    resut<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span>
    resut<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span>
    resut<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> sum<span class="token punctuation">;</span>

    <span class="token keyword">let</span> <span class="token keyword">mut</span> index <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">..</span><span class="token number">11</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">..</span><span class="token number">11</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> map<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
                resut<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> i <span class="token keyword">as</span> <span class="token keyword">i32</span><span class="token punctuation">;</span>
                resut<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> j <span class="token keyword">as</span> <span class="token keyword">i32</span><span class="token punctuation">;</span>
                resut<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> map<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                index <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token macro property">print!</span><span class="token punctuation">(</span><span class="token string">&quot;to_sparse_array is , {:?}&quot;</span><span class="token punctuation">,</span> resut<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17125653383161712565337411.png" alt="17125653383161712565337411.png"></p>`,14),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","xishushuzu.html.vue"]]);export{k as default};