<template>
  <div class="post-content">
    <h2>一、安装tshark</h2>
    <BlogStyles type="code" code-title="Debian操作系统安装tshark" code-content="sudo apt install tshark" language="bash" />
    <BlogStyles type="code" code-title="查看tshark版本" code-content="tshark --version" language="bash" />
    <BlogStyles type="image" :src="p1Image" alt="tshark版本截图" caption="图1 tshark 3.4.16版本安装成功" />

    <h2>二、连入出口节点的子网</h2>
    <BlogStyles type="code" code-title="查看可用网络接口" code-content="tshark -D" language="bash" />
    <BlogStyles type="image" :src="p2Image" alt="可用网络接口截图" caption="图2 可用网络接口截图" />
    <BlogStyles type="list" list-title="上图中网络接口说明" :list-items="[
      'eth0：通常是以太网有线网卡的命名',
      'tailscale0：Tailscale VPN 虚拟接口',
      'any：所有接口',
      'lo：本地回环接口',
      'bluetooth-monitor：蓝牙监控',
      '其他都是各种特殊用途的接口'
    ]" />
    <BlogStyles type="image" :src="p3Image" alt="手机连入子网截图" caption="图3 手机连入出口节点的子网" />

    <h2>三、使用tshark抓包</h2>
    <h3>1.监听有线接口访问的网站</h3>
    <BlogStyles 
      type="code" 
      code-title="监听有线接口访问的网站" 
      code-content="tshark -i eth0 -f 'tcp port 80 or tcp port 443' -Y 'http.request or tls.handshake.type eq 1' -T fields -e http.host -e tls.handshake.extensions_server_name" 
      language="bash" 
    />
    <BlogStyles type="image" :src="p4Image" alt="抓包结果截图" caption="图4 抓包结果截图" />
    <BlogStyles type="alert" alert-title="抓包结果说明" alert-description="可以看到手机访问的网站域名都被抓取。顶格（无缩进）的域名是http协议，不顶格（有缩进）的域名是https协议" alert-type="info" />

    <h3>2.监听有线接口并保存网站访问记录</h3>
    <BlogStyles 
      type="code" 
      code-title="网站访问记录保存在website_access.log中" 
      code-content="tshark -i eth0 -f 'tcp port 80 or tcp port 443' -Y 'http.request or tls.handshake.type eq 1' -T fields -e http.host -e tls.handshake.extensions_server_name >> /mnt/usb/website_access.log" 
      language="bash" 
    />
    <BlogStyles type="code" code-title="查看website_access.log文件内容" code-content="cat /mnt/usb/website_access.log" language="bash" />
    <BlogStyles type="image" :src="p5Image" alt="访问记录文件内容截图" caption="图4 访问记录文件内容截图" />

    <el-divider />

    <BlogStyles type="quote" quote-content="以上内容都是通过SSH连接，在bedian操作系统中实现，所有设备都通过tailscale组成的内网中进行" quote-author="环境说明" />
  </div>
</template>

<script setup>
// Vue 3 Composition API
import BlogStyles from '../../components/BlogStyles.vue'
import p1Image from './p1.png'
import p2Image from './p2.png'
import p3Image from './p3.jpg'
import p4Image from './p4.png'
import p5Image from './p5.png'
</script>

<style scoped>

</style>