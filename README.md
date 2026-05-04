# 我的博客源码

当前仓库保存我的博客源码。

本博客代码完全由houzhaohan开发。本博客开发时未参考其他博客框架。

博客内容也完全由houzhaohan攥写。文章不构成任何建议，仅供参考。

一个基于 Vue 3 + Element Plus 构建的现代化个人博客。

## 🚀 在线访问

- 主域名: https://blog.houzhaohan.vip

- 备用域名: https://blog.njau.homes

## 🔍 关键路由

- 关于页面: https://blog.houzhaohan.vip/about

- 联系页面: https://blog.houzhaohan.vip/contact

- 本博客具体介绍: https://blog.houzhaohan.vip/post/1

## 🌟 博客特色

- **现代化技术栈**: 使用 Vue 3 + Vite + Element Plus 构建
- **响应式设计**: 完美适配桌面端和移动端
- **SPA 架构**: 单页面应用，提供流畅的用户体验
- **SEO 友好**: 支持路由级别的静态页面生成

## 📋 功能特性

### 核心功能
- 🏠 **首页展示**: 博客文章列表，支持分页浏览
- 📝 **文章阅读**: 动态加载文章内容，支持目录导航
- 👤 **关于页面**: 个人介绍
- 📞 **联系页面**: 我的联系方式

### 技术特性
- 📱 **响应式布局**: 自适应不同屏幕尺寸，在手机端自动收起导航栏
- 🎨 **现代化 UI**: 基于 Element Plus 的优雅界面
- ⚡ **快速加载**: Vite 构建工具带来的极致性能
- 🔒 **路由守卫**: 所有错误路由都指向404页面
- 📊 **目录导航**: 文章内容自动生成目录结构

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router** - 官方路由管理器
- **Element Plus** - Vue 3 组件库
- **Vite** - 下一代前端构建工具

### 开发工具
- **Node.js** - JavaScript 运行时环境
- **npm** - 包管理器

## 📁 项目结构

```cmd
vue-blog/
├── src/                   # 源代码目录
│   ├── assets/            # 静态资源
│   ├── components/        # 可复用组件
│   │   ├── Header.vue     # 页面头部
│   │   ├── Footer.vue     # 页面底部
│   │   ├── PostList.vue   # 文章列表
│   │   ├── TableOfContents.vue # 目录导航
│   │   └── BlogStyles.vue # 博客样式
│   ├── data/              # 数据文件
│   │   └── posts.js       # 文章数据
│   ├── router/            # 路由配置
│   │   ├── index.js       # 路由定义
│   │   └── 404.vue        # 404页面
│   ├── views/             # 页面组件
│   │   ├── home.vue       # 首页
│   │   ├── post.vue       # 文章页面
│   │   ├── about.vue      # 关于页面
│   │   ├── contact.vue    # 联系页面
│   │   └── post/          # 具体文章内容
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── dist/                  # 构建输出目录
├── _headers               # 部署头文件，防止部署后产生响应bug
├── _redirects             # 重定向配置，防止部署后产生响应bug
├── vite.config.js         # Vite 配置
├── package.json           # 项目配置
└── README.md              # 项目说明
```
