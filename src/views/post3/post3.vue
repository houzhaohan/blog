<template>
  <div class="post-content">
    <!-- 一、挂载U盘 -->
    <h2>一、挂载U盘</h2>

    <h3>1.1 创建挂载点</h3>
    <BlogStyles type="alert" alert-title="提示" alert-description="只有第一次使用时需要创建挂载点，后续使用直接挂载即可，无需重新创建" alert-type="info" />
    <BlogStyles type="code" code-title="创建挂载点" code-content="sudo mkdir /mnt/usb" language="bash" />

    <h3>1.2 挂载U盘</h3>
    <BlogStyles type="code" code-title="挂载U盘" code-content="sudo mount /dev/sda1 /mnt/usb" language="bash" />

    <h3>1.3 验证挂载</h3>
    <BlogStyles type="code" code-title="列出系统中所有的块设备信息" code-content="lsblk" language="bash" />
    
    <BlogStyles 
      type="image" 
      :src="p1Image" 
      alt="挂载验证截图" 
      caption="图1 lsblk命令输出结果"
    />
    
    <BlogStyles 
      type="code" 
      code-title="挂载成功标识" 
      code-content="sda            8:0    1  28.9G  0 disk
└─sda1         8:1    1  28.9G  0 part /mnt/usb  # <-- 这里显示挂载点！" 
      language="bash" 
    />
    
    <BlogStyles type="alert" alert-title="说明" alert-description="现在/dev/sda1的MOUNTPOINT列显示为/mnt/usb，这说明挂载成功" alert-type="success" />

    <h3>1.4 进入U盘目录</h3>
    <BlogStyles type="code" code-title="切换到U盘文件夹" code-content="cd /mnt/usb" language="bash" />
    <BlogStyles type="code" code-title="查看U盘文件夹里的文件列表" code-content="ls -la" language="bash" />

    <!-- 二、在U盘内安装python -->
    <h2>二、在U盘内安装python</h2>

    <h3>2.1 确保在U盘目录</h3>
    <BlogStyles type="code" code-title="确认U盘目录" code-content="cd /mnt/usb" language="bash" />

    <h3>2.2 下载Python 3.11</h3>
    <BlogStyles type="code" code-title="下载Python源码" code-content="wget https://www.python.org/ftp/python/3.11.7/Python-3.11.7.tgz" language="bash" />

    <h3>2.3 解压Python源码包</h3>
    <BlogStyles type="code" code-title="解压源码包" code-content="tar -xzf Python-3.11.7.tgz" language="bash" />

    <h3>2.4 查看解压后的内容</h3>
    <BlogStyles type="code" code-title="查看文件" code-content="ls -la" language="bash" />

    <h3>2.5 进入Python源码目录查看</h3>
    <BlogStyles type="code" code-title="进入源码目录" code-content="cd Python-3.11.7" language="bash" />
    <BlogStyles type="code" code-title="查看源码内容" code-content="ls -la" language="bash" />

    <!-- 三、在U盘内创建index.html -->
    <h2>三、在U盘内创建index.html</h2>

    <h3>3.1 确保在U盘目录</h3>
    <BlogStyles type="code" code-title="创建test文件夹" code-content="mkdir test" language="bash" />

    <h3>3.2 进入test文件夹</h3>
    <BlogStyles type="code" code-title="进入测试目录" code-content="cd test" language="bash" />

    <h3>3.3 创建index.html文件</h3>
    <BlogStyles 
      type="code" 
      code-title="创建HTML文件" 
      code-content="cat > index.html << 'EOF'
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Python服务器&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Python HTTP服务器&lt;/h1&gt;
&lt;p&gt;服务器正在运行！&lt;/p&gt;
&lt;p&gt;端口：8888&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
EOF" 
      language="bash" 
    />

    <!-- 四、使用python启动http服务器 -->
    <h2>四、使用python启动http服务器</h2>
    
    <h3>4.1 切换到U盘文件夹</h3>
    <BlogStyles type="code" code-title="在test文件夹的父目录启动服务器（服务整个U盘内容）" code-content="cd /mnt/usb" language="bash" />

    <h3>4.2 启动http服务</h3>
    <BlogStyles type="code" code-title="启动Python HTTP服务器，端口8888" code-content="python3 -m http.server 8888 --directory test" language="bash" />
    
    <BlogStyles 
      type="image" 
      :src="p2Image" 
      alt="服务器启动截图" 
      caption="图2 Python HTTP服务器启动成功"
    />
    
    <BlogStyles type="alert" alert-title="访问地址" alert-description="浏览器访问http://localhost:8888" alert-type="info" />
    
    <BlogStyles 
      type="image" 
      :src="p3Image" 
      alt="浏览器访问截图" 
      caption="图3 浏览器访问结果"
    />
    
    <BlogStyles type="alert" alert-title="退出提示" alert-description="Ctrl + C 退出http服务器" alert-type="warning" />

    <!-- 五、卸载U盘 -->
    <h2>五、卸载U盘</h2>

    <h3>5.1 退出到家目录（重要！！！）</h3>
    <BlogStyles type="code" code-title="返回主目录" code-content="cd ~" language="bash" />
    <BlogStyles type="alert" alert-title="重要提醒" alert-description="Linux系统不允许卸载一个正在被使用的挂载点" alert-type="warning" />

    <h3>5.2 使用完毕后卸载U盘</h3>
    <BlogStyles type="code" code-title="卸载U盘" code-content="sudo umount /mnt/usb" language="bash" />

    <h3>5.3 验证挂载</h3>
    <BlogStyles type="code" code-title="验证卸载" code-content="lsblk" language="bash" />
    
    <BlogStyles 
      type="image" 
      :src="p4Image" 
      alt="卸载验证截图" 
      caption="图4 卸载成功验证"
    />
    
    <BlogStyles type="alert" alert-title="卸载成功" alert-description="sda1分区（即U盘）的MOUNTPOINT列为空，这表示U盘已经成功卸载，此时可以拔出U盘" alert-type="success" />

    <el-divider />
    
    <BlogStyles 
      type="quote" 
      quote-content="操作系统准确来讲是Armbian，安装在了玩客云3代，所有操作均是通过SSH连接到玩客云NAS" 
      quote-author="环境说明" 
    />
  </div>
</template>

<script setup>
// Vue 3 Composition API
import BlogStyles from '../../components/BlogStyles.vue'
import p1Image from './p1.png'
import p2Image from './p2.png'
import p3Image from './p3.png'
import p4Image from './p4.png'
</script>

<style scoped>

</style>