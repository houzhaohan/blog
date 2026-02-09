<template>
  <div class="post-content">
    <p>(UTC+8)2026年2月2日，全球加密货币市场经历新一轮大幅下跌，主要数字资产价格普遍下挫，市场情绪指标跌至极低水平。</p>

    <p>比特币价格在当日交易中一度触及60000美元整数关口，这是自2025年11月以来首次接近这一关键心理价位。作为市场基准的比特币，其价格在24小时内下跌10%，从当日Binance最低成交价60000美元，随后反弹上升。</p>
    
    <BlogStyles
      type="image"
      :src="Image1"
      alt="比特币价格"
      caption="比特币K线"
    />

    <p>根据加密货币估值工具数据，比特币的“估值系数”指标显示为0.27，这一数值通常被市场参与者视为衡量比特币相对于其历史估值水平的位置。0.27的数值表明比特币价格已远低于其长期平均估值水平。</P>

    <BlogStyles
      type="image"
      :src="Image2"
      alt="比特币估值"
      caption="比特币估值"
    />

    <p>反映市场整体情绪的“恐惧与贪婪指数”在当日跌至5点的极低位，进入“极度恐惧”区间。本次急剧下跌标志着市场情绪显著恶化。</P>

    <BlogStyles
      type="image"
      :src="Image3"
      alt="恐惧和贪婪指数"
      caption="恐惧和贪婪指数"
    />

    <!-- 引用 -->
    <BlogStyles
      type="quote"
      quoteContent="抄底好时机。"
      quoteAuthor="我的观点"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogStyles from '../../components/BlogStyles.vue'
import Image1 from './p1.jpg'
import Image2 from './p2.jpg'
import Image3 from './p3.jpg'
</script>

<style scoped>
</style>