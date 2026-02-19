import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../components/layout/Home/Home.vue'
import DashboardContent from '../components/pages/dashboard/DashboardContent.vue'
import MenuPage from '../components/pages/MenuPage.vue'
import StatisticsPage from '../components/pages/StatisticsPage.vue'
import ServerPage from '../components/pages/ServerPage.vue'
import SettingsPage from '../components/pages/SettingsPage.vue'

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
        { path: '/server', component: ServerPage },
        { path: '/settings', component: SettingsPage }
      ]
    },
  ]
})

export default router
