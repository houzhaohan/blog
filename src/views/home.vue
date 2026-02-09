<template>
  <div class="home-page">
    <Header />
    <main class="main-content">
      <div v-if="route.path === '/'">
        <PostList />
      </div>
      <div v-else-if="route.path === '/about'">
        <About />
      </div>
      <div v-else-if="route.path === '/contact'">
        <Contact />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import PostList from '../components/PostList.vue'
import Contact from './contact.vue'
import About from './about.vue'

const route = useRoute()
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
  width: 100%;
}
</style>