<template>
  <div class="ip-container">
    <el-card class="ip-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>当前IP地址</span>
          <el-button type="primary" @click="fetchIp" :loading="loading" size="small">
            刷新
          </el-button>
        </div>
      </template>
      
      <div class="ip-content">
        <div v-if="loading" class="loading-section">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>正在获取IP地址...</span>
        </div>
        
        <div v-else-if="error" class="error-section">
          <el-icon color="#F56C6C"><Warning /></el-icon>
          <span class="error-text">{{ error }}</span>
        </div>
        
        <div v-else class="ip-display">
          <div class="ip-label">您的公网IP地址是：</div>
          <div class="ip-value">{{ ipAddress }}</div>
          <div class="ip-info" v-if="ipInfo">
            <div class="info-item">
              <span class="info-label">国家：</span>
              <span class="info-value">{{ ipInfo.country || '未知' }}</span>
            </div>
            <div class="info-item" v-if="ipInfo.regionName">
              <span class="info-label">区域：</span>
              <span class="info-value">{{ ipInfo.regionName }}</span>
            </div>
            <div class="info-item" v-if="ipInfo.city">
              <span class="info-label">城市：</span>
              <span class="info-value">{{ ipInfo.city }}</span>
            </div>
            <div class="info-item" v-if="ipInfo.isp">
              <span class="info-label">运营商：</span>
              <span class="info-value">{{ ipInfo.isp }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Loading, Warning } from '@element-plus/icons-vue'

const ipAddress = ref('')
const ipInfo = ref(null)
const loading = ref(false)
const error = ref('')

const fetchIp = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch('https://ip-api.com/json/?lang=zh-CN')
    if (!response.ok) {
      throw new Error('网络请求失败')
    }
    
    const data = await response.json()
    
    if (data.status === 'success') {
      ipAddress.value = data.query
      ipInfo.value = data
    } else {
      throw new Error(data.message || '获取IP地址失败')
    }
  } catch (err) {
    console.error('获取IP地址失败:', err)
    error.value = err.message || '获取IP地址失败，请稍后重试'
    
    try {
      const fallbackResponse = await fetch('https://api.ipify.org?format=json')
      const fallbackData = await fallbackResponse.json()
      ipAddress.value = fallbackData.ip
      ipInfo.value = null
      error.value = ''
    } catch (fallbackErr) {
      console.error('备用API也失败了:', fallbackErr)
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchIp()
})
</script>

<style scoped>
.ip-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 400px;
}

.ip-card {
  width: 100%;
  max-width: 500px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
}

.ip-content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px 0;
  color: #909399;
}

.loading-section .el-icon {
  font-size: 32px;
}

.error-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px 0;
}

.error-section .el-icon {
  font-size: 48px;
}

.error-text {
  color: #F56C6C;
  text-align: center;
}

.ip-display {
  text-align: center;
  padding: 20px 0;
}

.ip-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
}

.ip-value {
  font-size: 32px;
  font-weight: 600;
  color: #409EFF;
  margin-bottom: 25px;
  word-break: break-all;
}

.ip-info {
  text-align: left;
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
}

.info-item {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #ebeef5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  width: 80px;
  color: #909399;
  font-size: 13px;
  flex-shrink: 0;
}

.info-value {
  color: #303133;
  font-size: 13px;
  flex: 1;
}
</style>
