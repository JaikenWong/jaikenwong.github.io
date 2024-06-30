import{_ as e,o as t,c as i,e as a}from"./app-520BETNP.js";const d={},s=a(`<p>CPU 调度算法需要其执行所需的 CPU 时间和 IO 时间。CPU时间是CPU执行进程所花费的时间，而I/O时间说明了进程进行I/O操作所需的时间。 以优化方式执行多个进程是基于不同类型的算法，如 FCFS、最短作业优先等，这些算法取决于时间帧值，如到达时间、突发时间、等待时间等。 <strong>1. 到达时间(AT)：</strong> 到达时间是进程到达就绪队列开始执行的时间点(以毫秒为单位)。它仅与 CPU 或 I/O 时间无关，仅描述进程可用于完成其指定作业的时间范围。进程与处于运行状态的进程无关。到达时间可以计算为过程的完成时间和周转时间之差。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>到达时间 (A.T.)
= 完成时间 (C.T.) - 周转时间 (T.A.T.)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 爆发时间(BT)：</strong> 突发时间是指进程执行所需的时间(以毫秒为单位)。Burst Time 考虑了进程的 CPU 时间。不考虑 I/O 时间。它被称为进程的执行时间或运行时间。该过程在此时间范围内从运行状态转换到完成状态。Burst time 可以计算为进程的 Completion Time 和 Waiting Time 之差，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>突发时间 (B.T.)
= 完成时间 (C.T.) - 等待时间 (W.T.)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下表说明了三个进程 P1、P2 和 P3 的到达和突发时间。为执行这些进程分配了一个 CPU。 <img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141170273image.jpg" alt="1712141170273image.jpg"></p><p>如果计算甘特图，则基于 FCFS 调度，其中首先执行就绪队列中的第一个进程。进程的到达决定了进程的执行顺序，时间等于它的突发时间。 <img src="https://fastly.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/1712141224211image.jpg" alt="1712141224211image.jpg"></p><p>由于进程 P2 4ms 到达，进程 P1 需要 3ms 执行(=Burst Time)，CPU 等待 1ms，即 CPU 的空闲时间，此时它不执行任何进程执行。最后执行的进程是 P3。 下表分别说明了到达时间和突发时间的主要区别：</p><table><thead><tr><th>到达时间</th><th>突发时间</th></tr></thead><tbody><tr><td>标记队列中进程的入口点。</td><td>标记队列中进程的退出点。</td></tr><tr><td>在进程执行之前计算。</td><td>在进程执行后计算。</td></tr><tr><td>与 CPU 的就绪状态有关。</td><td>与 CPU 的运行状态有关。</td></tr></tbody></table>`,8),n=[s];function r(l,o){return t(),i("div",null,n)}const c=e(d,[["render",r],["__file","CPUdiaoduzhongdaodashijianhetufashijiandequbie.html.vue"]]);export{c as default};
