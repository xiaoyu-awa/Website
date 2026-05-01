---
title: Xray REALITY 梯子搭建
excerpt: 使用Xray搭建REALITY的教程（心血来潮写着玩
date: 2026-5-1 21:55:00
tags: 教程
---

## 前情提要（）
> 前几天猫说起来她自建的梯子，加上最近的gfw发疯，于是想着自己也搭个玩玩x

当然，随便搭着玩所以只是记录一下，所以可用性不保证

## 准备？？
- 时间
- 金钱
- 脑子（赛博大脑也可以）


## 开始搭建

> 教程参考了挺多的来着，最后选择了用xray搭reality协议的梯子
> 
> 或许以后会尝试hysteria协议（？

- **本文使用Alpine 3.20系统**

ssh/vnc之类的连上服务器后台后，非常常规的先更新软件源
```shell
apk update
apk upgrade
```

愉快的更新完后就是装装装环节啦
```shell
apk add --no-cache curl bash openssl unzip uuidgen
```

前往xray寻找最新release 链接(https://github.com/XTLS/Xray-core/releases/)
```shell
wget -O /tmp/xray.zip "https://github.com/XTLS/Xray-core/releases/download/v26.3.27/Xray-linux-64.zip"
```

```shell
mkdir -p /usr/local/bin
mkdir -p /usr/local/share/xray
mkdir -p /usr/local/etc/xray
mkdir -p /var/log/xray

unzip -o /tmp/xray.zip -d /tmp/xray

install -m 755 /tmp/xray/xray /usr/local/bin/xray
install -m 644 /tmp/xray/geoip.dat /usr/local/share/xray/
install -m 644 /tmp/xray/geosite.dat /usr/local/share/xray/

rm -rf /tmp/xray /tmp/xray.zip
```

此时你可以使用下述命令查看是否安装成功
```shell
xray version
```

**重点来啦x  记得记录保存好**~~(或者再生成一份)~~
```shell
xray uuid
xray x25519
openssl rand -hex 8
```

记录下**UUID**，**两个Key**，**ShortID**
然后输入下一行命令创建配置文件

```shell
cat > /usr/local/etc/xray/config.json <<EOF
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 【端口】,
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "【UUID】",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "show": false,
          "dest": "【伪装域名】:443",
          "xver": 0,
          "serverNames": [
            "【伪装域名】"
          ],
          "privateKey": "【私钥】",
          "shortIds": [
            "【ShortID】"
          ]
        }
      },
      "sniffing": {
        "enabled": true,
        "destOverride": [
          "http",
          "tls",
          "quic"
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom"
    }
  ]
}
EOF
```

对创建的配置文件进行编辑，以中文括号的都需修改
```shell
nano /usr/local/etc/xray/config.json
```

其中 **伪装域名** 是reality伪装时的域名，可以是自己的，也可以是其他任何一个域名

可以使用下方网站输入服务器公网IP寻找IP段内的其他域名解析（听说会更好一些，不搞也没问题(存疑)？
- https://bgp.tools/

结束编辑后，可以检查一下配置文件是否可用
```shell
xray run -test -config /usr/local/etc/xray/config.json
```

下面将xray加入开机自启
```shell
cat >/etc/init.d/xray <<'EOF'
#!/sbin/openrc-run

name="Xray"
description="Xray Service"

command="/usr/local/bin/xray"
command_args="run -config /usr/local/etc/xray/config.json"
command_background="yes"
pidfile="/run/xray.pid"

depend() {
    need net
}
EOF
```
```shell
chmod +x /etc/init.d/xray
rc-update add xray default
```

好啦~到这里就结束咯，通过配置xray的config例如搭配warp让gemini不再提示地区不可用

Vless链接为下面这一串，记得替换x

```text
vless://【UUID】@【IP】:【PORT】?encryption=none&flow=xtls-rprx-vision&security=reality&sni=【伪装地址】&fp=chrome&pbk=【公钥】&sid=【ShortID】&type=tcp&headerType=none#Reality
```