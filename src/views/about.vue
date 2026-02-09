<template>
  <div class="about-page">
    <div class="about-container">
      <h2 class="about-title">关于我</h2>
      <div class="about-content">
        <p>欢迎来到我的个人博客！我是一名热爱编程的开发者，专注于技术创新与投资研究。</p>
        
        <div class="about-cards">
          <el-card class="about-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><User /></el-icon>
                <span>个人简介</span>
              </div>
            </template>
            <div class="card-content">
              <p>你好！欢迎访问我的个人博客。</p>
              <p>我是一名热爱编程的开发者，不断学习新技术。</p>
              <p>创建这个博客的目的是记录我的投资历程、分享代码经验。</p>
            </div>
          </el-card>
          
          <el-card class="about-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><Tools /></el-icon>
                <span>专业技能</span>
              </div>
            </template>
            <div class="card-content">
              <div class="skills-list">
                <el-tag type="primary" class="skill-tag">数据科学</el-tag>
                <el-tag type="success" class="skill-tag">人工智能</el-tag>
                <el-tag type="warning" class="skill-tag">全栈开发</el-tag>
                <el-tag type="danger" class="skill-tag">网络工程</el-tag>
                <el-tag type="info" class="skill-tag">量化交易</el-tag>
                <el-tag type="primary" class="skill-tag">金融建模</el-tag>
              </div>
            </div>
          </el-card>
          
          <el-card class="about-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon"><Star /></el-icon>
                <span>兴趣爱好</span>
              </div>
            </template>
            <div class="card-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="hobby-item">
                    <el-icon><Edit /></el-icon>
                    <span>编程与技术探索</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="hobby-item">
                    <el-icon><Share /></el-icon>
                    <span>开源项目贡献</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="hobby-item">
                    <el-icon><TrendCharts /></el-icon>
                    <span>量化投资研究</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="hobby-item">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>技术社区交流</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        
        <div class="about-note">
          <el-alert
            title="欢迎交流"
            type="success"
            :closable="false"
            show-icon
          >
            如果你对我的博客内容感兴趣，或者想要交流技术话题，欢迎通过联系方式与我联系！
          </el-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Tools, Star, Edit, Share, TrendCharts, ChatDotRound } from '@element-plus/icons-vue'
</script>

<style scoped>
.about-page {
  padding: 40px 0;
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-title {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e4e7ed;
}

.about-content {
  font-size: 16px;
  line-height: 1.6;
  color: #606266;
}

.about-content > p {
  margin-bottom: 30px;
  text-align: center;
}

.about-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.about-card {
  transition: all 0.3s ease;
}

.about-card:hover {
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

.card-content {
  font-size: 14px;
  line-height: 1.8;
}

.card-content p {
  margin-bottom: 10px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  font-size: 14px;
  padding: 5px 12px;
}

.hobby-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  color: #606266;
}

.hobby-item .el-icon {
  color: #409eff;
  font-size: 16px;
}

.about-note {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .about-cards {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 24px;
  }
  
  .about-content {
    font-size: 14px;
  }
  
  .hobby-item {
    font-size: 14px;
  }
}
</style>