<template>
  <div class="post-content">
    <h1 style="text-align: center;">今日上证收盘点数</h1>
    <p class="animated-number">{{ animatedNumber }}</p>
    
    <p>2025年10月29日，上证指数以4016.33点的收盘数字，为A股的历史长卷盖上新的刻度。这是时隔十年，这个承载着市场记忆的整数关口，第三次迎来真正的 "站稳" 时刻。</p>

    <p>回望过往，2007年的4000点带着经济高速增长的燥热，2015年的4000点裹挟着杠杆资金的浪潮，两次皆如流星划过，留下短暂的高光与漫长的沉淀。而今日的4000点，更似稳舵行船——没有狂热追涨的量能爆放，只有长期资金 "压舱石" 般的沉稳布局，农业银行等低估值龙头悄然创下新高，诉说着市场生态的质变。</p>

    <!-- 图片 -->
    <BlogStyles
      type="image"
      :src="marketImage"
      alt="里程碑"
      caption="解锁东方财富4000点里程碑"
    />

    <!-- 引用 -->
    <BlogStyles
      type="quote"
      quoteContent="4000点的意义，从来不只是数字游戏，更是市场信心与经济发展的晴雨表。"
      quoteAuthor="我的分析"
    />

    
    <div class="newspaper-quote">
      <div class="newspaper-header">
        <div class="newspaper-title">人民日报</div>
        <div class="newspaper-date">2015年4月21日</div>
      </div>
      <div class="newspaper-content">
        <div class="newspaper-quote-text">
          <span class="quote-mark">"</span>
          4000点才是牛市的开端
          <span class="quote-mark">"</span>
        </div>
        <div class="newspaper-quote-source">—— 《股市震荡不改“慢牛”趋势》</div>
      </div>
      <div class="newspaper-border"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogStyles from '../../components/BlogStyles.vue'
import marketImage from './4000.jpg'

const animatedNumber = ref(0)
const targetNumber = 4016.33

onMounted(() => {
  animateNumber()
})

function animateNumber() {
  const duration = 5000 // 动画持续时间
  const startTime = Date.now()
  
  function update() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用缓动函数让动画更自然
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentNumber = targetNumber * easeOutQuart
    
    animatedNumber.value = currentNumber.toFixed(2)
    
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  
  requestAnimationFrame(update)
}
</script>

<style scoped>
.animated-number {
  font-size: 72px;
  color: red;
  text-align: center;
  margin: 20px 0;
}

.newspaper-quote {
  position: relative;
  background: #f8f5f0;
  border: 2px solid #8B4513;
  border-radius: 8px;
  padding: 30px;
  margin: 40px 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  font-family: 'SimSun', '宋体', serif;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(139, 69, 19, 0.1) 2px,
      rgba(139, 69, 19, 0.1) 4px
    );
}

.newspaper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px double #8B4513;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.newspaper-title {
  font-size: 32px;
  font-weight: bold;
  color: #8B4513;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 8px;
}

.newspaper-date {
  font-size: 16px;
  color: #666;
  font-style: italic;
}

.newspaper-content {
  text-align: center;
  padding: 20px 0;
}

.newspaper-quote-text {
  font-size: 28px;
  color: #2F4F4F;
  line-height: 1.8;
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.quote-mark {
  font-size: 36px;
  color: #8B4513;
  font-weight: bold;
  opacity: 0.8;
}

.newspaper-quote-source {
  font-size: 15px;
  color: #8B4513;
  text-align: right;
  font-style: italic;
  margin-top: 15px;
  padding-right: 20px;
}

.newspaper-border {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 1px solid rgba(139, 69, 19, 0.3);
  border-radius: 10px;
  pointer-events: none;
}

.newspaper-quote::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(139, 69, 19, 0.2);
  border-radius: 6px;
  pointer-events: none;
}
</style>