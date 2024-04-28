---
title: 火山引擎TTS API 使用文档
date: 2024/04/28
categories:
 - AI
tags:
 - TTS
 - 火山引擎API
---

## 1. 接口说明

> 接口地址为 **https://openspeech.bytedance.com/api/v1/tts**

## 2. 身份认证

认证方式采用 Bearer Token.

需要在请求的 Header 中填入"Authorization":"Bearer;${token}"

注意

Bearer和token使用分号 ; 分隔，替换时请勿保留${}

AppID/Token/Cluster 等信息可参考 [控制台使用FAQ-Q1](https://www.volcengine.com/docs/6561/196768#q1：哪里可以获取到以下参数appid，cluster，token，authorization-type，secret-key-？)

## 3. 请求方式

### 3.1 请求参数

| 字段             | 含义                 | 层级 | 格式       | 必需 | 备注                                                         |
| ---------------- | -------------------- | ---- | ---------- | ---- | ------------------------------------------------------------ |
| app              | 应用相关配置         | 1    | dict       | ✓    |                                                              |
| appid            | 应用标识             | 2    | string     | ✓    | 需要申请                                                     |
| token            | 应用令牌             | 2    | string     | ✓    | 不可为空，传入值可以通过服务端日志追溯                       |
| cluster          | 业务集群             | 2    | string     | ✓    | volcano_tts，**复刻需要根据使用的集群替换**                  |
| user             | 用户相关配置         | 1    | dict       | ✓    |                                                              |
| uid              | 用户标识             | 2    | string     | ✓    | 不可为空，传入值可以通过服务端日志追溯                       |
| audio            | 音频相关配置         | 1    | dict       | ✓    |                                                              |
| voice_type       | 音色类型             | 2    | string     | ✓    | [发音人参数列表](https://www.volcengine.com/docs/6561/79824)，**复刻音色使用声音ID(speaker id)** |
| rate             | 音频采样率           | 2    | int        |      | 默认为 24000                                                 |
| encoding         | 音频编码格式         | 2    | string     |      | wav / pcm / ogg_opus / mp3，默认为 pcm 注意：wav 不支持流式  |
| compression_rate | opus格式时编码压缩比 | 2    | int        |      | [1, 20]，默认为 1                                            |
| speed_ratio      | 语速                 | 2    | float      |      | [0.2,3]，默认为1，通常保留一位小数即可                       |
| volume_ratio     | 音量                 | 2    | float      |      | 0.1, 3]，默认为1，通常保留一位小数即可                       |
| pitch_ratio      | 音高                 | 2    | float      |      | [0.1, 3]，默认为1，通常保留一位小数即可                      |
| emotion          | 情感/风格            | 2    | string     |      | [发音人参数列表](https://www.volcengine.com/docs/6561/79824) |
| language         | 语言类型             | 2    | string     |      | [发音人参数列表](https://www.volcengine.com/docs/6561/79824) |
| request          | 请求相关配置         | 1    | dict       | ✓    |                                                              |
| reqid            | 请求标识             | 2    | string     | ✓    | 需要保证每次调用传入值唯一，建议使用 UUID                    |
| text             | 文本                 | 2    | string     | ✓    | 合成语音的文本，长度限制 1024 字节（UTF-8编码）。**复刻音色没有此限制，但是HTTP接口有60s超时限制** 大约就是333 个字 |
| text_type        | 文本类型             | 2    | string     |      | plain / ssml, 默认为plain                                    |
| silence_duration | 句尾静音时长         | 2    | int        |      | 单位为ms，默认为125                                          |
| operation        | 操作                 | 2    | string     | ✓    | query（非流式，http只能query） / submit（流式）              |
| with_frontend    | 时间戳相关           | 2    | int string |      | 当with_frontend为1且frontend_type为unitTson的时候，返回音素级时间戳 |
| frontend_type    | 时间戳相关           | 2    | int string |      | 当with_frontend为1且frontend_type为unitTson的时候，返回音素级时间戳 |
| with_timestamp   | 时间戳相关           | 2    | int string |      | 新版时间戳参数，可用来替换with_frontend和frontend_type，可返回原文本的时间戳，而非TN后文本，即保留原文中的阿拉伯数字或者特殊符号等。注意：原文本中的多个标点连用或者空格依然会被处理，但不影响时间戳连贯性 |
| split_sentence   | 复刻音色语速优化     | 2    | int string |      | 仅当使用复刻音色时设为1，可优化语速过快问题。有可能会导致时间戳多次返回。详情可见：[声音复刻录音指导-badcase优化建议2](https://www.volcengine.com/docs/6561/1204182) |
| pure_english_opt | 英文前端优化         | 2    | int string |      | 当pure_english_opt为1的时候，中文音色读纯英文时可以正确处理文本中的阿拉伯数字 |

**示例**

```json
{
    "app": {
        "appid": "appid123",
        "token": "access_token",
        "cluster": "volcano_tts",
    },
    "user": {
        "uid": "uid123"
    },
    "audio": {
        "voice_type": "BV700_streaming",
        "encoding": "mp3",
        "compression_rate": 1,
        "rate": 24000,
        "speed_ratio": 1.0,
        "volume_ratio": 1.0,
        "pitch_ratio": 1.0,
        "emotion": "happy",
        "language": "cn"
    },
    "request": {
        "reqid": "uuid",
        "text": "字节跳动语音合成",
        "text_type": "plain",
        "operation": "query",
        "silence_duration": "125",
        "with_frontend": "1",
        "frontend_type": "unitTson",
        "pure_english_opt": "1"
    }
}
```

### 3.2 返回参数

| 字段     | 含义         | 层级 | 格式   | 备注                              |
| -------- | ------------ | ---- | ------ | --------------------------------- |
| reqid    | 请求 ID      | 1    | string | 请求 ID,与传入的参数中 reqid 一致 |
| code     | 请求状态码   | 1    | int    | 错误码，参考下方说明              |
| message  | 请求状态信息 | 1    | string | 错误信息                          |
| sequence | 音频段序号   | 1    | int    | 负数表示合成完毕                  |
| data     | 合成音频     | 1    | string | 返回的音频数据，base64 编码       |
| addition | 额外信息     | 1    | string | 额外信息父节点                    |
| duration | 音频时长     | 2    | string | 返回音频的长度，单位ms            |
| frontend | 时间戳信息   | 2    | string | 包含字级别和音素级别的时间戳信息  |

响应示例

```json
{
	"reqid": "reqid",
	"code": 3000,
	"operation": "query",
	"message": "Success",
	"sequence": -1,
	"data": "base64 encoded binary data",
	"addition": {
		"description": "...",
		"duration": "1960",
		"frontend": "{
			"words": [{
				"word": "字",
				"start_time": 0.025,
				"end_time": 0.185
			},
			... 
			{
				"word": "。",
				"start_time": 1.85,
				"end_time": 1.955
			}],
			"phonemes": [{
				"phone": "C0z",
				"start_time": 0.025,
				"end_time": 0.105
			},
			... 
			{
				"phone": "。",
				"start_time": 1.85,
				"end_time": 1.955
			}]
		}"
	}
}
```



## 4. 注意事项

- 使用 HTTP Post 方式进行请求，返回的结果为 JSON 格式，需要进行解析
- 因 json 格式无法直接携带二进制音频，音频经base64编码。使用base64解码后，即为二进制音频
- 每次合成时 reqid 这个参数需要重新设置，且要保证唯一性（建议使用 UUID/GUID 等生成）

## 5. Demo

### 5.1 Python 示例
```python
#coding=utf-8

'''
requires Python 3.6 or later
pip install requests
'''
import base64
import json
import uuid
import requests

# 填写平台申请的appid, access_token以及cluster
appid = "6241498878"
access_token= "08nu**********43GNhZs"
cluster = "volcano_tts"

# 东北话男声
voice_type = "BV021_streaming"
host = "openspeech.bytedance.com"
api_url = f"https://{host}/api/v1/tts"

header = {"Authorization": f"Bearer;{access_token}"}

request_json = {
    "app": {
        "appid": appid,
        "token": "access_token",
        "cluster": cluster
    },
    "user": {
        "uid": "388808087185088"
    },
    "audio": {
        "voice_type": voice_type,
        "encoding": "mp3",
        "speed_ratio": 1.0,
        "volume_ratio": 1.0,
        "pitch_ratio": 1.0,
    },
    "request": {
        "reqid": str(uuid.uuid4()),
        "text": "字节跳动语音合成",
        "text_type": "plain",
        "operation": "query",
        "with_frontend": 1,
        "frontend_type": "unitTson"

    }
}

if __name__ == '__main__':
    try:
        resp = requests.post(api_url, json.dumps(request_json), headers=header)
        print(f"resp body: \n{resp.json()}")
        if "data" in resp.json():
            data = resp.json()["data"]
            file_to_save = open("test_submit.mp3", "wb")
            file_to_save.write(base64.b64decode(data))
    except Exception as e:
        e.with_traceback()
```

### 5.2 Java 示例

```java
package com.bytedance.tts.demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import okhttp3.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

public class TtsHttpClient {

    public static final String HOST = "openspeech.bytedance.com";
    public static final String API_URL = "https://" + HOST + "/api/v1/tts";
    public static final String ACCESS_TOKEN = "08nuE********F43GNhZs";

    public static void main(String[] args) throws IOException {
        TtsRequest ttsRequest = new TtsRequest("字节跳动人工智能实验室我要语音合成");
        post(API_URL, JSON.toJSONString(ttsRequest));
    }

    public static void post(String url, String json) throws IOException {
        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(json, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .header("Authorization", "Bearer; " + ACCESS_TOKEN)
                .build();
        try (Response response = client.newCall(request).execute()) {
            JSONObject responseJson = JSON.parseObject(response.body().string());
            System.out.println(responseJson.get("message"));
            byte[] decodedBytes = Base64.getDecoder().decode((String) responseJson.get("data"));
            try(FileOutputStream stream = new FileOutputStream("audio.wav")) {
                stream.write(decodedBytes);
            }
        }
    }
}

// TTSRequest 就是根据JSON 转化过来的
```

