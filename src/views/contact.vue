<template>
  <div class="contact-page">
    <div class="contact-container">
      <h2 class="contact-title">联系我</h2>
      <div class="contact-content">
        <p>如果你有任何问题、建议或者合作意向，欢迎通过以下方式联系我：</p>
        
        <div class="contact-methods">
          <el-card class="contact-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><Message /></el-icon>
                <span>邮箱</span>
              </div>
            </template>
            <el-link type="primary" href="mailto:me@houzhaohan.vip" :underline="false">
              me@houzhaohan.vip
            </el-link>
          </el-card>
          
          <el-card class="contact-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><Link /></el-icon>
                <span>GitHub</span>
              </div>
            </template>
            <el-link type="primary" href="https://github.com/houzhaohan" target="_blank" :underline="false">
              https://github.com/houzhaohan
            </el-link>
          </el-card>
          
          <el-card class="contact-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><User /></el-icon>
                <span>LinkedIn</span>
              </div>
            </template>
            <el-link type="primary" href="https://linkedin.com/in/houzhaohan" target="_blank" :underline="false">
              https://linkedin.com/in/houzhaohan
            </el-link>
          </el-card>
        </div>
        
        <div class="contact-note">
          <el-alert
            title="温馨提示"
            type="primary"
            :closable="false"
            show-icon
          >
            我会尽量及时回复你的消息。
          </el-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Message, Link, User } from '@element-plus/icons-vue'
</script>

<style scoped>
.contact-page {
  padding: 40px 0;
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-title {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e4e7ed;
}

.contact-content {
  font-size: 16px;
  line-height: 1.6;
  color: #606266;
}

.contact-content p {
  margin-bottom: 30px;
  text-align: center;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.contact-card {
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-icon {
  font-size: 20px;
  color: #409eff;
}

.contact-note {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .contact-methods {
    grid-template-columns: 1fr;
  }
  
  .contact-title {
    font-size: 24px;
  }
  
  .contact-content {
    font-size: 14px;
  }
}
</style>
