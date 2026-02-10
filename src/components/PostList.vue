<template>
  <div class="post-list">
    <div class="posts-container">
      <el-card v-for="post in paginatedPosts" :key="post.id" class="post-card" @click="viewPost(post.id)">
        <template #header>
          <h2 class="post-title">{{ post.title }}</h2>
        </template>
        <div class="post-meta">
          <span class="post-date">
            <el-icon><Calendar /></el-icon>
            发布于 {{ post.date }}
          </span>
          <span v-if="post.update" class="post-date">
            <el-icon><AlarmClock /></el-icon>
            更新于 {{ post.update }}
          </span>
        </div>
        <div class="post-excerpt">{{ post.excerpt }}</div>
      </el-card>
    </div>
    
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="true"
        :disabled="false"
        :background="true"
        layout="total, prev, pager, next, sizes"
        :pager-count="5"
        :total="posts.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElIcon, ElPagination } from 'element-plus'
import { Calendar, AlarmClock } from '@element-plus/icons-vue'

import { postsData } from '../data/posts'

const posts = ref(postsData)
const router = useRouter()

const currentPage = ref(1)
const pageSize = ref(10)

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return posts.value.slice(startIndex, endIndex)
})

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
}

const viewPost = (postId) => {
  router.push(`/post/${postId}`)
}
</script>

<style scoped>
.post-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.posts-container {
  flex: 1;
}

.post-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.post-card:hover .post-title {
  color: #409eff;
}

.post-card:hover .post-excerpt {
  color: #25b333ff;
}

.post-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
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
  margin-bottom: 20px;
  line-height: 1.6;
}

.pagination-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>
