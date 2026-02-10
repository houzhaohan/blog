<template>
  <div class="toc-container" v-if="headings.length > 0">
    <!-- Mobile toggle button -->
    <div class="toc-toggle" :class="{ 'toc-open': isOpen }" @click="toggleToc" v-show="isMobile">
      <span class="toc-toggle-icon">{{ isOpen ? '×' : '☰' }}</span>
      <span class="toc-toggle-text">目录</span>
    </div>
    
    <!-- Table of contents panel -->
    <div 
      class="table-of-contents" 
      :class="{ 'toc-open': isOpen }"
      v-show="!isMobile || isOpen"
    >
      <h3 class="toc-title">目录</h3>
      <ul class="toc-list">
        <li 
          v-for="heading in headings" 
          :key="heading.id"
          :class="['toc-item', `toc-level-${heading.level}`]"
        >
          <a 
            :href="`#${heading.id}`"
            @click.prevent="scrollToHeading(heading.id)"
            :class="['toc-link', { 'toc-link-active': activeHeadingId === heading.id }]"
          >
            {{ heading.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed, onUnmounted } from 'vue'

const headings = ref([])
const isOpen = ref(false)
const isMobile = ref(window.innerWidth < 1400)
const activeHeadingId = ref('')

const extractHeadings = () => {
  nextTick(() => {
    const tryExtract = (attempt = 0) => {
      const postContent = document.querySelector('.post-content')
      if (!postContent) {
        // 如果找不到 .post-content，重试最多10次，每次间隔100ms
        if (attempt < 10) {
          setTimeout(() => tryExtract(attempt + 1), 100)
          return
        }
        headings.value = []
        return
      }

      const headingElements = postContent.querySelectorAll('h2, h3')
      
      // 如果找到容器但还没有标题，也重试
      if (headingElements.length === 0 && attempt < 10) {
        setTimeout(() => tryExtract(attempt + 1), 100)
        return
      }

      headings.value = Array.from(headingElements).map((element, index) => {
        // 如果标题没有ID，生成唯一ID
        if (!element.id) {
          element.id = `heading-${index}-${element.textContent.trim().replace(/\s+/g, '-').toLowerCase()}`
        }
        
        return {
          id: element.id,
          text: element.textContent.trim(),
          level: element.tagName.toLowerCase()
        }
      })
    }
    
    tryExtract()
  })
}

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 78 // 向上偏移78像素，让标题显示在更靠上的位置
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    // 在移动设备上，点击后关闭目录
    if (isMobile.value) {
      isOpen.value = false
    }
  }
}

// 监听滚动事件，更新当前活动标题
const updateActiveHeading = () => {
  const headingElements = headings.value.map(heading => document.getElementById(heading.id)).filter(Boolean)
  
  if (headingElements.length === 0) return
  
  // 获取当前滚动位置
  const scrollPosition = window.scrollY + 100 // 添加偏移量，提前激活标题
  
  // 找到当前最可见的标题
  let currentHeading = ''
  let minDistance = Infinity
  
  headingElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset
    const distance = Math.abs(elementTop - scrollPosition)
    
    if (distance < minDistance) {
      minDistance = distance
      currentHeading = element.id
    }
  })
  
  activeHeadingId.value = currentHeading
}

// 使用 Intersection Observer 进行更高效的滚动跟踪
const setupIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: '-100px 0px -70% 0px', // 当标题在视口顶部区域时触发
    threshold: 0
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeHeadingId.value = entry.target.id
      }
    })
  }, options)
  
  // 观察所有标题元素
  headings.value.forEach(heading => {
    const element = document.getElementById(heading.id)
    if (element) {
      observer.observe(element)
    }
  })
  
  return observer
}

const toggleToc = () => {
  isOpen.value = !isOpen.value
}

// Watch for content changes
onMounted(() => {
  // 延迟执行，确保文章内容已经加载
  setTimeout(() => {
    extractHeadings()
    
    // Re-extract headings when content changes
    const observer = new MutationObserver(() => {
      extractHeadings()
      // 重新设置 Intersection Observer
      cleanupObserver()
      setTimeout(() => {
        intersectionObserver = setupIntersectionObserver()
      }, 100)
    })
    
    // 尝试查找文章内容，如果找不到则延迟重试
    const tryObserve = (attempt = 0) => {
      const postContent = document.querySelector('.post-content')
      if (postContent) {
        observer.observe(postContent, {
          childList: true,
          subtree: true,
          characterData: true
        })
      } else if (attempt < 15) {
        setTimeout(() => tryObserve(attempt + 1), 200)
      }
    }
    
    tryObserve()
  }, 300)

  
  // Add resize event listener to detect mobile/desktop changes
  window.addEventListener('resize', handleResize)
  
  // 设置 Intersection Observer
  setTimeout(() => {
    intersectionObserver = setupIntersectionObserver()
  }, 100)
  
  // 监听滚动事件作为备选方案
  window.addEventListener('scroll', updateActiveHeading, { passive: true })
})

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', updateActiveHeading)
  cleanupObserver()
})

const handleResize = () => {
  isMobile.value = window.innerWidth < 1400
  if (!isMobile.value) {
    isOpen.value = false // 在桌面模式下关闭目录
  }
}

// Watch for route changes
watch(() => document.querySelector('.post-content'), extractHeadings)

// 初始化 Intersection Observer
let intersectionObserver = null

// 清理观察者
const cleanupObserver = () => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
}
</script>

<style scoped>
.toc-container {
  position: relative;
}

/* Mobile toggle button */
.toc-toggle {
  position: fixed;
  left: 5px;
  top: 80px; /* 导航栏下方 */
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 110;
  transition: all 0.3s ease;
  opacity: 0.4;
}

.toc-toggle:hover {
  background: #0069d9;
  transform: scale(1.05);
  opacity: 1;
}

.toc-toggle.toc-open {
  opacity: 1;
}

.toc-toggle-icon {
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
}

.toc-toggle-text {
  font-size: 10px;
  margin-top: 2px;
  line-height: 1;
}

/* Table of contents panel */
.table-of-contents {
  position: fixed;
  right: 20px;
  top: 120px;
  width: 250px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  z-index: 100;
  transition: all 0.3s ease;
}

/* Mobile open state */
.table-of-contents.toc-open {
  left: 20px;
  top: 140px;
  width: calc(100vw - 40px);
  max-width: 300px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.toc-title {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 8px 0;
}

.toc-level-h3 {
  margin-left: 16px;
  font-size: 14px;
}

.toc-link {
  color: #666;
  text-decoration: none;
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 14px;
  line-height: 1.4;
}

.toc-link:hover {
  color: #007bff;
  background-color: #e3f2fd;
  text-decoration: none;
}

.toc-link:active {
  color: #0056b3;
  background-color: #bbdefb;
}

.toc-link-active {
  color: #007bff;
  background-color: #e3f2fd;
  font-weight: 600;
  border-left: 3px solid #007bff;
  padding-left: 12px;
}

/* Responsive design */
@media (min-width: 1400px) {
  .toc-toggle {
    display: none;
  }
  
  .table-of-contents {
    display: block !important;
  }
}

@media (max-width: 1400px) {
  .table-of-contents {
    left: -300px; /* 默认隐藏在屏幕外 */
    top: 140px;
  }
  
  .table-of-contents.toc-open {
    left: 20px;
  }
}
</style>
