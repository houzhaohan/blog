<template>
  <div class="home-page">
    <Header />
    <main class="main-content">
      <div class="not-found">
        <div class="error-container">
          <div class="error-code">404</div>
          <div class="error-title">页面未找到</div>
          <div class="error-description">您访问的页面不存在或已被移除</div>
          <div class="error-actions">
            <button class="btn-primary" @click="goHome">返回首页</button>
            <button class="btn-secondary" @click="goBack">返回上一页</button>
          </div>
          <div class="error-decoration">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 40px;
  width: 100%;
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 70vh;
}

.error-container {
  position: relative;
  background: linear-gradient(135deg, #f8f9ff 0%, #e3e8ff 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  animation: fadeIn 1s ease-out;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  animation: scaleIn 0.8s ease-out 0.2s both;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  animation: slideUp 0.8s ease-out 0.4s both;
}

.error-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
  animation: slideUp 0.8s ease-out 0.6s both;
}

.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  animation: slideUp 0.8s ease-out 0.8s both;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 10px 26px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #f8f9ff;
  transform: translateY(-2px);
}

.error-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  background: #667eea;
  top: 20px;
  right: 20px;
  animation-delay: 0s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  background: #764ba2;
  bottom: 40px;
  left: 30px;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  background: #f093fb;
  top: 60%;
  left: 10%;
  animation-delay: 4s;
}

.shape-4 {
  width: 50px;
  height: 50px;
  background: #4facfe;
  bottom: 20%;
  right: 15%;
  animation-delay: 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 1.6rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .error-container {
    padding: 40px 20px;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4.5rem;
  }
  
  .error-title {
    font-size: 1.4rem;
  }
  
  .error-container {
    padding: 30px 15px;
  }
}
</style>