<template>
  <div class="blog-styles">
    <!-- 图片样式 -->
    <div v-if="type === 'image'" class="blog-image">
      <el-card shadow="hover" class="image-card">
        <div class="image-container">
          <el-image
            :src="src"
            :alt="alt"
            fit="contain"
            :preview-src-list="previewSrcList"
            style="max-width: 100%; max-height: 100%;"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><PictureFilled /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div v-if="caption" class="image-caption">{{ caption }}</div>
      </el-card>
    </div>

    <!-- 表格样式 -->
    <div v-else-if="type === 'table'" class="blog-table">
      <el-table :data="tableData" stripe style="width: 100%" fit>
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :min-width="column.minWidth || 80"
          show-overflow-tooltip
        />
      </el-table>
    </div>

    <!-- 代码样式 -->
    <div v-else-if="type === 'code'" class="blog-code">
      <el-card shadow="hover" class="code-card">
        <template #header>
          <div class="card-header">
            <span>{{ codeTitle || '代码示例' }}</span>
            <el-tag size="small" :type="codeType || 'info'">{{ language }}</el-tag>
          </div>
        </template>
        <pre class="code-block"><code class="language-{{ language }}">{{ codeContent }}</code></pre>
      </el-card>
    </div>

    <!-- 引用样式 -->
    <div v-else-if="type === 'quote'" class="blog-quote">
      <el-card shadow="hover" class="quote-card">
        <el-divider content-position="left">{{ quoteAuthor }}</el-divider>
        <p class="quote-content">{{ quoteContent }}</p>
      </el-card>
    </div>

    <!-- 警告样式 -->
    <div v-else-if="type === 'alert'" class="blog-alert">
      <el-alert
        :title="alertTitle"
        :description="alertDescription"
        :type="alertType || 'info'"
        show-icon
        :closable="alertClosable || false"
      />
    </div>

    <!-- 列表样式 -->
    <div v-else-if="type === 'list'" class="blog-list">
      <el-card shadow="hover" class="list-card">
        <template #header>
          <div class="card-header">
            <span>{{ listTitle }}</span>
          </div>
        </template>
        <el-list>
          <el-list-item 
            v-for="(item, index) in listItems" 
            :key="index"
            class="list-item"
          >
            <template #prefix>
              <el-avatar :size="24" :icon="listItemIcon || 'el-icon-check'" />
            </template>
            {{ item }}
          </el-list-item>
        </el-list>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { PictureFilled } from '@element-plus/icons-vue'

const props = defineProps({
  // 组件类型：image, table, code, quote, alert, list
  type: {
    type: String,
    required: true
  },
  // 图片相关
  src: String,
  alt: String,
  caption: String,
  previewSrcList: {
    type: Array,
    default: () => []
  },
  // 表格相关
  tableData: Array,
  columns: Array,
  // 代码相关
  codeContent: String,
  codeTitle: String,
  codeType: String,
  language: String,
  // 引用相关
  quoteContent: String,
  quoteAuthor: String,
  // 警告相关
  alertTitle: String,
  alertDescription: String,
  alertType: String,
  alertClosable: Boolean,
  // 列表相关
  listItems: Array,
  listTitle: String,
  listItemIcon: String
})
</script>

<style scoped>
.blog-styles {
  margin: 20px 0;
}

/* 图片样式 */
.blog-image {
  margin: 20px 0;
}

.image-card {
  border-radius: 8px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 6px;
}

.image-caption {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

/* 表格样式 */
.blog-table {
  margin: 20px 0;
  overflow-x: auto;
}

.blog-table :deep(.el-table) {
  table-layout: auto !important;
}

.blog-table :deep(.el-table__body-wrapper) {
  overflow-x: auto;
}

/* 代码样式 */
.blog-code {
  margin: 20px 0;
}

.code-card {
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 代码框样式 */
.code-block {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  margin: 0;
  overflow-x: auto;
  font-family: 'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  border: 1px solid #e1e4e8;
}

.code-block code {
  background: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre;
}

/* 引用样式 */
.blog-quote {
  margin: 20px 0;
}

.quote-card {
  border-radius: 8px;
}

.quote-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  font-style: italic;
}

/* 警告样式 */
.blog-alert {
  margin: 20px 0;
}

/* 列表样式 */
.blog-list {
  margin: 20px 0;
}

.list-card {
  border-radius: 8px;
}

.list-item {
  display: block;
  width: 100%;
}

.el-list {
  width: 100%;
}

.el-list-item {
  width: 100%;
  margin-bottom: 8px;
}
</style>