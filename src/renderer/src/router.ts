import { createMemoryHistory, createRouter } from 'vue-router'
import Main from '@renderer/pages/Index.vue'
import Connect from '@renderer/pages/Connect.vue'

const routes = [
  { path: '/', name: 'index', component: Main },
  { path: '/connect', name: 'connect', component: Connect }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (to.name === 'index') {
    return { name: 'connect' }
  }
  return true
})

export default router
