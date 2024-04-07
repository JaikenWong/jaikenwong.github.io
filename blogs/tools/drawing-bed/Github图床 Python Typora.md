---
title: Github图床 Python Typora
date: 2024/04/06
categories:
 - Tools
tags:
 - Github图床
 - Python脚本
 - Typora
---

## 1. 搭建Github 图床

### 1.1. 创建或者选择一个Public 仓库

![image-20240406012606606](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/95e86f62-f371-11ee-93c8-02d634b58295.png)

### 1.2. 获取Github Token

![image-20240406012713266](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/bda4721c-f371-11ee-97fb-02d634b58295.png)

![image-20240406013111358](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/4b8e512e-f372-11ee-a37b-02d634b58295.png)

## 2. Typora 结合图床

> 当Typora需要使用这个图床的时候，Picgo 是很好的解决方案，但是还可以通过其他的方式来进行上传，比如python 脚本。

### 2.1. upload-img.py

```python
import requests
import base64
import json
import uuid
import datetime
import os
import sys

ext = ""


# 从文件夹下 读取文件
def read_dir(file):
    global ext
    if not os.path.isdir(file):  # 判断是否是文件夹，不是文件夹才打开
        ext = os.path.splitext(file)[1] # 文件后缀
        with open(file, 'rb') as f:  # rb 二进制 读取
            fdata_tmp = file_base64(f.read())
            f.close()
            return fdata_tmp


# 将文件转换为base64编码，github上传文件必须将文件以base64格式上传
def file_base64(data):
    data_b64 = base64.b64encode(data).decode()
    return data_b64


# 上传文件
def upload_file(file_data):
    global ext
    file_name = str(uuid.uuid1()) + ext  # 文件名 随机生成
    # url = "https://api.github.com/repos/[user]/[repo]/contents/[path]/"+file_name  # 用户名、库名、路径
    # headers = {"Authorization": "Bearer " + token}

    # ghp_****
    # JaikenWong/Drawing-Bed
    # images
    # main
    token = "ghp_******"  ## 自行去github生成token，不懂得文章最好会写
    curr_time = datetime.datetime.now()
    path = curr_time.strftime("%Y-%m-%d") # 日期文件夹
    url = "https://api.github.com/repos/JaikenWong/Drawing-Bed/contents/images/" + path + "/" + file_name  # 用户名、库名、路径
    headers = {
        "Authorization": "Bearer " + token
    }
    content = file_data
    data = {"message": "zj upload pictures", "content": content}
    data = json.dumps(data)
    req = requests.put(url=url, data=data, headers=headers)
    req.encoding = "utf-8"
    re_data = json.loads(req.text)
    print("https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed@main/images/" + path +
          "/" + file_name)
    # 这个打印会回显给Typora cdn.jsdelivr.net 是免费的加速cdn

if __name__ == '__main__':
    args = sys.argv[1:]
    for img_path in args:
        # 从文件夹 读取文件
        fdata = read_dir(img_path)
        upload_file(fdata)
```

### 2.2. 效果展示

> 这里是一些相关打印都 打印出来的情况。上面代码不包含这些print

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/2cdc6118-f371-11ee-bf03-02d634b58295.png)

### 2.3. 配置在Typora

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/2cec70c6-f371-11ee-9247-02d634b58295.png)

### 2.4. 命令配置

```bash
/Users/jaiken/miniconda3/bin/python  -u /Users/jaiken/workplace/pypro/learning/upload-img.py
```

### 2.5. 验证测试

![img](https://cdn.jsdelivr.net/gh/JaikenWong/Drawing-Bed/images/2024-04-06/2d0a70c6-f371-11ee-90a5-02d634b58295.png)