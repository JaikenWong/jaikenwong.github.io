---
title: MySQL 面试题之索引
date: 2024/04/22
categories:
 - 面试题
 - MySQL
tags:
 - 索引
---

## 001 MySQL中索引分类

- B+树索引
- Hash索引
- 全文索引

## 002 InnoDB索引与MyISAM索引实现的区别

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/fae0e103-0072-11ef-8944-70cf4959429b.jpg)

- MyISAM的索引方式都是非聚簇的，与InnoDB包含1个聚簇索引是不同的。

- 在InnoDB存储引擎中，我们只需要根据主键值对聚簇索引进行一次查找就能找到对应的记录，而在MyISAM中却需要进行一次回表操作，意味着MyISAM中建立的索引相当于全部都是二级索引 。
- InnoDB的数据文件本身就是索引文件，而MyISAM索引文件和数据文件是分离的 ，索引文件仅保存数据记录的地址。

- MyISAM的表在磁盘上存储在以下文件中： *.sdi（描述表结构）、*.MYD（数据），*.MYI（索引）
- InnoDB的表在磁盘上存储在以下文件中： .ibd（表结构、索引和数据都存在一起）

- InnoDB的非聚簇索引data域存储相应记录主键的值 ，而MyISAM索引记录的是地址 。换句话说，InnoDB的所有非聚簇索引都引用主键作为data域。
- MyISAM的回表操作是十分快速的，因为是拿着地址偏移量直接到文件中取数据的，反观InnoDB是通过获取主键之后再去聚簇索引里找记录，虽然说也不慢，但还是比不上直接用地址去访问。
- InnoDB要求表必须有主键 （ MyISAM可以没有 ）。如果没有显式指定，则MySQL系统会自动选择一个可以非空且唯一标识数据记录的列作为主键。如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键，这个字段长度为6个字节，类型为长整型。

## 003 一个表中如果没有创建索引，那么还会创建B+树吗？

会

- 如果有主键会创建聚簇索引
- 如果没有主键会生成rowid作为隐式主键

## 004 说一下B+树索引实现原理（数据结构）

假设有一个表index_demo，表中有2个INT类型的列，1个CHAR(1)类型的列，c1列为主键：

```sql
CREATE TABLE index_demo(c1 INT,c2 INT,c3 CHAR(1),PRIMARY KEY(c1)) ;
```

index_demo表的简化的行格式示意图如下：

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/2fb2635b-0091-11ef-b0c0-70cf4959429b.jpg)

我们只在示意图里展示记录的这几个部分：

- record_type：表示记录的类型， 0是普通记录、 2是最小记录、 3 是最大记录、1是B+树非叶子节点记录。
- next_record：表示下一条记录的相对位置，我们用箭头来表明下一条记录。
- 各个列的值：这里只记录在 index_demo 表中的三个列，分别是 c1 、 c2 和 c3 。
- 其他信息：除了上述3种信息以外的所有信息，包括其他隐藏列的值以及记录的额外信息。

将其他信息项暂时去掉并把它竖起来的效果就是这样：

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/3bdeeede-0091-11ef-ac59-70cf4959429b.jpg)

把一些记录放到页里的示意图就是（这里一页就是一个磁盘块，代表一次IO）：

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/3d3a27ae-0091-11ef-aabd-70cf4959429b.jpg)

name age sex

MySQL InnoDB的默认的页大小是16KB，因此数据存储在磁盘中，可能会占用多个数据页。如果各个页中的记录没有规律，我们就不得不依次遍历所有的数据页。如果我们想快速的定位到需要查找的记录在哪些数据页中，我们可以这样做 ：

- 下一个数据页中用户记录的主键值必须大于上一个页中用户记录的主键值
- 给所有的页建立目录项

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/2024-04-22/2c06b2fd-0091-11ef-b336-70cf4959429b.jpg)

以页28为例，它对应目录项2 ，这个目录项中包含着该页的页号28以及该页中用户记录的最小主键值 5。我们只需要把几个目录项在物理存储器上连续存储（比如：数组），就可以实现根据主键值快速查找某条记录的功能了。比如：查找主键值为 20 的记录，具体查找过程分两步：

1. 先从目录项中根据二分法快速确定出主键值为20的记录在目录项3中（因为 12 ≤ 20 < 209 ），对应页9。
2. 再到页9中根据二分法快速定位到主键值为 20 的用户记录。

至此，针对数据页做的简易目录就搞定了。这个目录有一个别名，称为索引 。