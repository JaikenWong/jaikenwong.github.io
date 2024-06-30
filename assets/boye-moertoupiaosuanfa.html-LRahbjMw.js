import{_ as t,r as p,o,c,a as n,b as s,d as l,e as a}from"./app-520BETNP.js";const i={},u=a('<h2 id="_1-基本思想" tabindex="-1"><a class="header-anchor" href="#_1-基本思想" aria-hidden="true">#</a> 1. 基本思想</h2><p>Boyer-Moore 投票算法的基本思想是：</p><p>在每一轮投票过程中，从数组中删除两个不同的元素，直到投票过程无法继续，此时数组为空或者数组中剩下的元素都相等。</p><p>如果数组为空，则数组中不存在主要元素；</p><p>如果数组中剩下的元素都相等，则数组中剩下的元素可能为主要元素。</p><h2 id="_2-算法步骤" tabindex="-1"><a class="header-anchor" href="#_2-算法步骤" aria-hidden="true">#</a> 2. 算法步骤</h2><p>博耶-摩尔 投票算法的步骤如下：</p><ol><li>维护一个候选主要元素candidate 和候选主要元素的出现次数count，初始时candidate 为任意值，count=0；</li><li>遍历数组nums 中的所有元素，遍历到元素 x 时，进行如下操作：</li></ol><ul><li>如果count=0，则将 x 的值赋给candidate，否则不更新candidate 的值；</li><li>如果x=candidate，则将count 加1，否则将count 减 1。</li></ul><ol><li>遍历结束之后，如果数组nums 中存在主要元素，则candidate 即为主要元素，否则candidate 可能为数组中的任意一个元素。</li></ol><h2 id="_3-实际应用" tabindex="-1"><a class="header-anchor" href="#_3-实际应用" aria-hidden="true">#</a> 3. 实际应用</h2>',11),r={href:"https://leetcode-cn.com/problems/find-majority-element-lcci/",target:"_blank",rel:"noopener noreferrer"},d=a(`<p><img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712718120673image.jpg" alt="1712718120673image.jpg"></p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">majority_element</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">i32</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> candidate<span class="token punctuation">:</span><span class="token keyword">i32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">let</span> <span class="token keyword">mut</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> num <span class="token keyword">in</span> <span class="token operator">&amp;</span>nums <span class="token punctuation">{</span>
            <span class="token keyword">if</span> count <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
                candidate <span class="token operator">=</span> <span class="token operator">*</span>num<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token operator">*</span>num <span class="token operator">==</span> candidate <span class="token punctuation">{</span>
                count <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                count <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> num <span class="token keyword">in</span> <span class="token operator">&amp;</span>nums <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token operator">*</span>num <span class="token operator">==</span> candidate <span class="token punctuation">{</span>
                count <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> count <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">&gt;</span> nums<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> candidate<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token type-definition class-name">Solution</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> nums<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token macro property">vec!</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> solution <span class="token operator">=</span> <span class="token class-name">Solution</span><span class="token punctuation">::</span><span class="token function">majority_element</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;result is {}&quot;</span><span class="token punctuation">,</span> solution<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17127177095041712717709442.png" alt="img"></p><p>提交到 leetcode</p><p><img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/17127177635021712717762815.png" alt="img"></p>`,5);function k(m,v){const e=p("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("leetcode"),n("a",r,[s("面试题 17.10. 主要元素"),l(e)])]),d])}const y=t(i,[["render",k],["__file","boye-moertoupiaosuanfa.html.vue"]]);export{y as default};
