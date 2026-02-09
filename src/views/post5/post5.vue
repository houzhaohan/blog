<template>
  <div class="post-content">
    <h2>一、安装tailscale</h2>

    <h3>1.通过snap商店下载tailscale</h3>
    <BlogStyles type="code" code-title="通过snap商店下载tailscale" code-content="sudo snap install tailscale" language="bash" />

    <h3>2.启动tailscale</h3>
    <BlogStyles type="code" code-title="启动tailscale" code-content="sudo snap start tailscale" language="bash" />

    <h3>3.登录tailscale账号</h3>
    <BlogStyles type="code" code-title="登录tailscale账号" code-content="sudo tailscale up" language="bash" />

    <h3>4.关闭tailscale开机自启</h3>
    <BlogStyles type="code" code-title="关闭tailscale开机自启" code-content="sudo systemctl disable snap.tailscale.tailscaled.service" language="bash" />

    <h3>5.查看当前tailscale活动状态</h3>
    <BlogStyles type="code" code-title="查看当前tailscale活动状态" code-content="sudo snap services tailscale" language="bash" />

    <h3>6.停止通过Tailscale网络访问互联网，改用自己的物理网卡直接上网</h3>
    <BlogStyles type="code" code-title="停止通过Tailscale网络访问互联网，改用自己的物理网卡直接上网" code-content="sudo tailscale up --netfilter-mode=off" language="bash" />

    <h2>二、开启ip转发（必须）</h2>

    <h3>1.开启ip转发</h3>
    <BlogStyles
      type="code"
      code-title="开启ip转发"
      code-content="echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf"
      language="bash"
    />
    <BlogStyles type="code" code-title="查看是否修改成功" code-content="sudo sysctl -p /etc/sysctl.d/99-tailscale.conf" language="bash" />

    <h3>2.配置iptables转发规则（关键！）</h3>
    <BlogStyles type="code" code-title="清除可能存在的旧规则（避免冲突）" code-content="sudo iptables -t nat -D POSTROUTING -o enp3s0 -j MASQUERADE 2>/dev/null || true" language="bash" />

    <BlogStyles type="code" code-title="添加NAT规则（让转发流量使用华为云的公网ip）" code-content="sudo iptables -t nat -A POSTROUTING -o enp3s0 -j MASQUERADE" language="bash" />

    <BlogStyles
      type="code"
      code-title="允许Tailscale接口的转发"
      code-content="sudo iptables -A FORWARD -i tailscale0 -o enp3s0 -j ACCEPT
sudo iptables -A FORWARD -i enp3s0 -o tailscale0 -m state --state RELATED,ESTABLISHED -j ACCEPT"
      language="bash"
    />
    
    <h3>3.保存iptables规则（防止重启丢失）</h3>
    <BlogStyles 
      type="code" 
      code-title="保存iptables规则"
      code-content="sudo apt-get update
sudo apt-get install iptables-persistent -y
sudo netfilter-persistent save"
      language="bash"
    />
    
    <h2>三、开启作为出口节点</h2>

    <h3>1.重启Tailscale</h3>
    <BlogStyles type="code" code-title="重启Tailscale" code-content="sudo snap restart tailscaled" language="bash" />

    <h3>2.作为出口节点</h3>
    <BlogStyles type="code" code-title="作为出口节点" code-content="sudo tailscale up --advertise-exit-node" language="bash" />

    <h2>四、测试出口节点</h2>

    <h3>1.手机测试</h3>
    <p>手机端使用华为云出口节点</p>
    <p>访问ip.cn查询当前公网ip</p>
    <BlogStyles 
      type="image" 
      :src="p1Image" 
      alt="1" 
      caption="图1 手机端使用华为云出口节点访问ip.cn"
    />
    <BlogStyles type="alert" alert-title="说明" alert-description="华为云不提供静态公网ip，这里显示的是弹性ip" alert-type="info" />

    <h3>2.关闭tailscale</h3>
    <BlogStyles type="code" code-title="关闭tailscale" code-content="sudo snap stop tailscale" language="bash" />
  </div>
</template>

<script setup>
// Vue 3 Composition API
import BlogStyles from '../../components/BlogStyles.vue'
import p1Image from './p1.jpg'
</script>

<style scoped>

</style>