<template>
  <header class="blog-header">
    <el-container>
      <el-header>
        <div class="header-content">
          <div class="title-section">
            <el-avatar :size="40" :src="avatarSrc" />
            <h1 class="blog-title">houzhaohan的博客</h1>
          </div>
          
          <!-- Desktop Menu -->
          <el-menu class="desktop-menu" :default-active="activeMenu" mode="horizontal" background-color="#ffffff" text-color="#2c3e50" active-text-color="#409EFF" router>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/about">关于</el-menu-item>
            <el-menu-item index="/contact">联系</el-menu-item>
          </el-menu>
          
          <!-- Mobile Menu Dropdown - Integrated into top bar -->
          <el-dropdown class="mobile-menu" trigger="click" @command="handleMenuClick">
            <el-button type="text" class="mobile-menu-trigger">
              <el-icon :size="20">
                <Menu />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="/">首页</el-dropdown-item>
                <el-dropdown-item command="/about">关于</el-dropdown-item>
                <el-dropdown-item command="/contact">联系</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
    </el-container>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'
import avatarSrc from '../assets/myself.webp'

const route = useRoute()
const router = useRouter()
const activeMenu = ref('/')

onMounted(() => {
  activeMenu.value = route.path
})

watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  }
)

const handleMenuClick = (command) => {
  router.push(command)
}
</script>

<style scoped>
.blog-header {
  background-color: #ffffff;
  color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e8e8e8;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.el-menu {
  flex: 1;
  justify-content: flex-end;
  border-bottom: none;
}

/* 选中菜单项的灰色背景不显示 */
:deep(.el-menu-item.is-active) {
  background-color: transparent !important;
}

.blog-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.el-header {
  padding: 0;
  height: 60px;
  line-height: 60px;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Mobile menu hidden by default */
.mobile-menu {
  display: none;
}

/* Desktop menu visible by default */
.desktop-menu {
  display: flex;
}

/* Mobile menu trigger button styling */
.mobile-menu-trigger {
  padding: 8px;
  border: none;
  background: transparent;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-trigger:hover {
  background: rgba(64, 158, 255, 0.1);
  color: #409EFF;
}

/* Responsive styles for mobile devices */
@media (max-width: 768px) {
  .desktop-menu {
    display: none !important;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .header-content {
    padding: 0 15px;
  }
  
  .blog-title {
    font-size: 18px;
  }
}
</style>
