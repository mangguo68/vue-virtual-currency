import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../components/layout/Home.vue'
import DashboardContent from '../components/layout/DashboardContent.vue'
import MenuPage from '../components/pages/MenuPage.vue'
import StatisticsPage from '../components/pages/StatisticsPage.vue'
import SwitchPage from '../components/pages/SwitchPage.vue'
import SettingsPage from '../components/pages/SettingsPage.vue'
import LoginRegisterPage from '../components/pages/LoginRegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home作为主路由，内部包含嵌套路由
    {
      path: '/',
      component: HomeLayout,
      children: [
        { path: '', component: DashboardContent },
        { path: '/menu', component: MenuPage },
        { path: '/statistics', component: StatisticsPage },
        { path: '/switch', component: SwitchPage },
        { path: '/settings', component: SettingsPage }
      ]
    },
    // 登录/注册路由（与Home平级）
    { path: '/login', component: LoginRegisterPage },
    { path: '/register', component: LoginRegisterPage, props: { isLogin: false } }
  ]
})

export default router
