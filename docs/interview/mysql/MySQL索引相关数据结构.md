---
title: MySQL 面试题之索引相关数据结构
date: 2024/04/22
categories:
 - 面试题
 - MySQL
tags:
 - 索引
 - 数据结构
---

## 008 索引相关数据结构

### 1. 平衡二叉树

- 基础数据结构
- 左右平衡
- 高度差大于1会自旋
- 每个节点记录一个数据

**平衡二叉树（AVL）**

AVL树全称G.M. Adelson-Velsky和E.M. Landis，这是两个人的人名。

平衡二叉树也叫平衡二叉搜索树（Self-balancing binary search tree）又被称为AVL树， 可以保证查询效率较高。

具有以下特点：

- 它是一棵空树或它的左右两个子树的高度差的绝对值不超过1
- 并且左右两个子树都是一棵平衡二叉树。

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/338c4a36-00a5-11ef-94bb-70cf4959429b.jpg)

AVL的生成演示：https://www.cs.usfca.edu/~galles/visualization/AVLtree.html

**AVL的问题**

众所周知，IO操作的效率很低，在大量数据存储中，查询时我们不能一下子将所有数据加载到内存中，只能逐节点加载（一个节点一次IO）。如果我们利用二叉树作为索引结构，那么磁盘的IO次数和索引树的高度是相关的。平衡二叉树由于树深度过大而造成磁盘IO读写过于频繁，进而导致效率低下。

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/6982b039-00a5-11ef-8d57-70cf4959429b.jpg)

为了提高查询效率，就需要 减少磁盘IO数 。为了减少磁盘IO的次数，就需要尽量降低树的高度 ，需要把原来“瘦高”的树结构变的“矮胖”，树的每层的分叉越多越好。针对同样的数据，如果我们把二叉树改成 三叉树：

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/338c2795-00a5-11ef-af23-70cf4959429b.jpg)

上面的例子中，我们将二叉树变成了三叉树，降低了树的高度。如果能够在一个节点中存放更多的数据，我们还可以进一步减少节点的数量，从而进一步降低树的高度。这就是多叉树。

**普通树的问题**

- 左子树全部为空，从形式上看，更像一个单链表，不能发挥BST的优势。
- 解决方案：平衡二叉树(AVL)

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/7367f7de-00a5-11ef-a38d-70cf4959429b.jpg)

### 2. 红黑树

演示 https://www.cs.usfca.edu/~galles/visualization/RedBlack.html

- hashmap存储
- 两次旋转达到平衡
- 分为红黑节点

在这个棵严格的平台树上又进化为“红黑树”{是一个非严格的平衡树 左子树与右子树的高度差不能超过1}，红黑树的长子树只要不超过短子树的两倍即可！

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/800270c5-00a5-11ef-81e3-70cf4959429b.jpg)

当再次插入7的时候，这棵树就会发生旋转

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/854bb671-00a5-11ef-8713-70cf4959429b.jpg)

![r-b-tree](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/105f7a17-00a8-11ef-a37c-70cf4959429b.gif)

### 3. B 树

B树是一种平衡的多分树，通常我们说m阶的B树，它必须满足如下条件： 

- 每个节点最多只有m个子节点。
- 每个非叶子节点（除了根）具有至少⌈ m/2⌉子节点。
- 如果根不是叶节点，则根至少有两个子节点。
- 具有*k*个子节点的非叶节点包含*k* -1个键。
- 所有叶子都出现在同一水平，没有任何信息（高度一致）。

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/e480e8d3-00a5-11ef-b3f9-70cf4959429b.jpg)

### 4. B+树

 　B+树是应文件系统所需而产生的B树的变形树，那么可能一定会想到，既然有了B树，又出一个B+树，那B+树必然是有很多优点的

**B+树的特征：**

- 有m个子树的中间节点包含有m个元素（B树中是k-1个元素），每个元素不保存数据，只用来索引；
- 所有的叶子结点中包含了全部关键字的信息，及指向含有这些关键字记录的指针，且叶子结点本身依关键字的大小自小而大的顺序链接。 (而B 树的叶子节点并没有包括全部需要查找的信息)；
- 所有的非终端结点可以看成是索引部分，结点中仅含有其子树根结点中最大（或最小）关键字。 (而B 树的非终节点也包含需要查找的有效信息)；

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/fe87368a-00a5-11ef-887d-70cf4959429b.jpg)

### 5. B+树和B树的差异：

- B+树中非叶子节点的关键字也会同时存在在子节点中，并且是在子节点中所有关键字的最大值（或最小）。

- B+树中非叶子节点仅用于索引，不保存数据记录，跟记录有关的信息都放在叶子节点中。而B树中， 非叶子节点既保存索引，也保存数据记录 。

- B+树中所有关键字都在叶子节点出现，叶子节点构成一个有序链表，而且叶子节点本身按照关键字的大小从小到大顺序链接。

### 6. 为什么说B+树比B树更适合数据库索引？

1）B+树的磁盘读写代价更低
B+树的内部结点并没有指向关键字具体信息的指针。因此其内部结点相对B 树更小。如果把所有同一内部结点的关键字存放在同一盘块中，那么盘块所能容纳的关键字数量也越多。一次性读入内存中的需要查找的关键字也就越多。相对来说IO读写次数也就降低了；

2）B+树查询效率更加稳定
由于非终结点并不是最终指向文件内容的结点，而只是叶子结点中关键字的索引。所以任何关键字的查找必须走一条从根结点到叶子结点的路。所有关键字查询的路径长度相同，导致每一个数据的查询效率相当；

3）B+树便于范围查询（最重要的原因，范围查找是数据库的常态）
B树在提高了IO性能的同时并没有解决元素遍历的我效率低下的问题，正是为了解决这个问题，B+树应用而生。B+树只需要去遍历叶子节点就可以实现整棵树的遍历。而且在数据库中基于范围的查询是非常频繁的，而B树不支持这样的操作或者说效率太低；不懂可以看看这篇解读-》[范围查找](https://zhuanlan.zhihu.com/p/54102723)

补充：B树的范围查找用的是中序遍历，而B+树用的是在链表上遍历；