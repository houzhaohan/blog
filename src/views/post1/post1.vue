<template>
  <div class="post-content">
    <h2>一、前言</h2>
    <p>欢迎阅读我的第一篇博客文章！在这篇文章中，我将介绍博客开发过程与使用技巧。</p>
    <p>本博客是一个纯前端博客，使用vue3框架开发。</p>
    <div>
      <el-text type="success" size="large">
        本博客代码完全开源，开源地址：
        <el-link 
          type="primary" 
          :underline="false" 
          href="https://github.com/houzhaohan/blog"
          target="_blank"
        >
          https://github.com/houzhaohan/blog
        </el-link>
      </el-text>
    </div>

    <div>
      <el-text type="info" size="large">
        上一版博客已经迁移到：
        <el-link 
          type="danger" 
          :underline="false" 
          href="https://blog2.houzhaohan.vip"
          target="_blank"
        >
          https://blog2.houzhaohan.vip
        </el-link>
      </el-text>
    </div>

    <h2>二、开发使用的技术</h2>
    <el-tree
      :data="techData"
      :props="defaultProps"
      default-expand-all
      style="margin: 20px 0;"
    />

    <h2>三、部分样式组件示例</h2>
    <p>本博客可以使用element plus组件。</p>
    <p>我自己定义了部分样式组件，方便复用。</p>
    <!-- 图片样式示例 -->
    <h3>1.图片样式</h3>
    <BlogStyles
      type="image"
      :src="helloImage"
      alt="一张图片"
      caption="图1 图片示例"
    />

    <!-- 表格样式示例 -->
    <h3>2.表格样式</h3>
    <BlogStyles
      type="table"
      :tableData="[
        { name: '南京农业大学', year: 2022, address: '南京' },
        { name: '中国农业大学', year: 2026, address: '北京' },
        { name: '华中农业大学', year: 2026, address: '武汉' },
        { name: '华南农业大学', year: 2026, address: '广州' }
      ]"
      :columns="[
        { prop: 'name', label: '学校', width: '180' },
        { prop: 'year', label: '年份', width: '180' },
        { prop: 'address', label: '地址' }
      ]"
    />

    <!-- 代码样式示例 -->
    <h3>3.代码样式</h3>
    <BlogStyles
      type="code"
      codeContent="function hello() {
  console.log('Hello, World!');
  return 'Hello';
}

hello();"
      codeTitle="JavaScript 示例"
      language="javascript"
    />

    <!-- 引用样式示例 -->
    <h3>4.引用样式</h3>
    <BlogStyles
      type="quote"
      quoteContent="诚 朴 勤 仁"
      quoteAuthor="南京农业大学校训"
    />
    
    <!-- 列表样式示例 -->
    <h3>5.列表样式</h3>
    <BlogStyles
      type="list"
      listTitle="其他内容"
      :listItems="[
        '1. 本博客使用Cloudflare的CDN加速',
        '2. 正在对上一版博客内容进行迁移',
        '3. 欢迎联系我'
      ]"
    />

    <!-- 警告样式示例 -->
    <h3>6.警告样式</h3>
    <BlogStyles
      type="alert"
      alertTitle="声明"
      alertDescription="本博客系统完全由houzhaohan开发，保留所有权利。MIT证书"
      alertType="warning"
    />
  </div>
</template>

<script setup>
import BlogStyles from '../../components/BlogStyles.vue'
import helloImage from './hello.webp'

const techData = [
  {
    label: '前端框架与核心库',
    children: [
      {
        label: 'Vue.js 3.x - 主要的前端框架',
        children: [
          { label: '使用 Vue 3 的 Composition API (script setup 语法)' },
          { label: '版本：^3.5.27' }
        ]
      },
      {
        label: 'Vue Router 5.x - 路由管理',
        children: [
          { label: '用于页面导航和路由管理' },
          { label: '版本：^5.0.2' }
        ]
      }
    ]
  },
  {
    label: 'UI 框架与组件库',
    children: [
      {
        label: 'Element Plus - UI 组件库',
        children: [
          { label: '基于 Vue 3 的组件库' },
          { label: '版本：^2.13.2' },
          { label: '配置了中文语言包 (zh-cn)' }
        ]
      },
      {
        label: 'Element Plus Icons - 图标库',
        children: [
          { label: 'Element Plus 的图标组件' },
          { label: '版本：^2.3.2' }
        ]
      }
    ]
  },
  {
    label: '构建工具与开发环境',
    children: [
      {
        label: 'Vite - 构建工具与开发服务器',
        children: [
          { label: '快速的构建工具和开发服务器' },
          { label: '版本：^5.0.0' },
          { label: '配置端口：3000' }
        ]
      },
      {
        label: '@vitejs/plugin-vue - Vite Vue 插件',
        children: [
          { label: '让 Vite 支持 Vue 单文件组件' },
          { label: '版本：^5.0.0' }
        ]
      }
    ]
  },
  {
    label: 'Web 技术与标准',
    children: [
      {
        label: 'HTML5 - 标准网页结构',
        children: [
          { label: '使用 HTML5 语义化标签' },
          { label: '设置了中文语言 (zh-CN)' }
        ]
      },
      {
        label: 'CSS3 - 样式表',
        children: [
          { label: '现代 CSS 布局（Flexbox）' },
          { label: '响应式设计' },
          { label: '自定义样式重置' }
        ]
      },
      {
        label: 'ES6+ JavaScript - 现代 JavaScript',
        children: [
          { label: '使用 ES6 模块导入/导出' },
          { label: '箭头函数、解构赋值等现代语法' }
        ]
      }
    ]
  },
  {
    label: '项目结构与架构',
    children: [
      {
        label: '单页面应用 (SPA) - 应用架构',
        children: [
          { label: '使用 Vue Router 实现单页面应用' },
          { label: '组件化开发模式' }
        ]
      },
      {
        label: '组件化开发 - 代码组织',
        children: [
          { label: '可复用的 Vue 组件（Header、Footer、PostList 等）' },
          { label: '模块化路由配置' }
        ]
      }
    ]
  },
  {
    label: '部署与构建',
    children: [
      {
        label: '静态网站生成 - 部署方式',
        children: [
          { label: '构建输出到 dist/ 目录' },
          { label: '支持静态部署' }
        ]
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}
</script>

<style scoped>

</style>
