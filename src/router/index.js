import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Post from '../views/post.vue'
import NotFound from './404.vue'
import { postsData } from '../data/posts'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守卫，当id不存在时，跳转到404页面
router.beforeEach((to, from, next) => {
  if (to.name === 'Post') {
    const postId = parseInt(to.params.id)
    const postExists = postsData.some(post => post.id === postId)
    if (!postExists) {
      next({ name: 'NotFound' })
      return
    }
  }
  next()
})

export default router