<template>
  <div class="post-page">
    <Header />
    <main class="main-content">
      <!-- 文章头部信息 -->
      <div v-if="currentPostData" class="post-header">
        <h1 class="post-title">{{ currentPostData.title }}</h1>
        <div class="post-meta">
          <span class="post-date">
            <el-icon><Calendar /></el-icon>
            发布于 {{ currentPostData.date }}
          </span>
          <span v-if="currentPostData.update" class="post-date">
            <el-icon><AlarmClock /></el-icon>
            更新于 {{ currentPostData.update }}
          </span>
        </div>
        <p class="post-excerpt">{{ currentPostData.excerpt }}</p>
      </div>
      
      <component :is="currentPostComponent" v-if="currentPostComponent" />
      <div v-else class="post-loading">
        <el-skeleton :rows="3" animated />
        <div class="loading-text">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>正在加载文章...</span>
        </div>
      </div>
    </main>
    <TableOfContents v-if="currentPostComponent" class="toc-wrapper" :current-post-component="currentPostComponent" />
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { postsData } from '../data/posts.js'
import { ElIcon } from 'element-plus'
import { Calendar, AlarmClock, Loading } from '@element-plus/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import TableOfContents from '../components/TableOfContents.vue'

const route = useRoute()
const currentPostComponent = ref(null)

// 获取当前文章数据
const currentPostData = computed(() => {
  const postId = parseInt(route.params.id)
  return postsData.find(post => post.id === postId)
})

// 动态加载文章组件
const loadPostComponent = async (postId) => {
  try {
    const component = await import(`../views/post${postId}/post${postId}.vue`)
    currentPostComponent.value = component.default
  } catch (error) {
    console.error(`无法加载文章 ${postId}:`, error)
    currentPostComponent.value = null
  }
}

// 监听路由变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadPostComponent(newId)
  }
}, { immediate: true })

// 组件挂载时加载文章
onMounted(() => {
  if (route.params.id) {
    loadPostComponent(route.params.id)
  }
})
</script>

<style scoped>
.post-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
  margin-bottom: 60px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  margin-right: 280px;
}

@media (max-width: 1400px) {
  .main-content {
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 16px;
    margin-right: 16px;
    width: auto;
  }
}

.post-loading {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.loading-text {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  color: #666;
}

.loading-text .is-loading {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.post-header {
  margin: 40px auto 20px auto;
  padding: 0 20px;
  max-width: 800px;
  border-bottom: 3px solid #e0e0e0;
}

@media (max-width: 768px) {
  .post-header {
    margin: 20px 0 16px 0;
    padding: 0 16px;
  }
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #be3088ff;
  margin-bottom: 16px;
  line-height: 1.2;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
  display: flex;
  gap: 10px;
}

.post-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #888;
}

.post-excerpt {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
  padding: 16px 0;
  font-style: italic;
}

.post-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 2;
  letter-spacing: 0.8px;
}

.toc-wrapper {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 280px;
}

@media (max-width: 1400px) {
  .toc-wrapper {
    position: static;
    width: 100%;
    margin: 20px 0;
  }
}
</style>
