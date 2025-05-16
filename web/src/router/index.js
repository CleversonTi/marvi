// web/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainRoutes  from './MainRoutes'
import AuthRoutes  from './AuthRoutes'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast }     from 'vue-toastification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...MainRoutes,
    ...AuthRoutes,
    { path: '/:pathMatch(.*)*', component: () => import('@/views/Error404.vue') }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const toast     = useToast()

  // Se existe token mas ainda não está marcado como autenticado,
  // faz só a validação leve (sem recarregar do localStorage)
  if (authStore.token && !authStore.isAuthenticated) {
    await authStore.validarToken()
  }

  const isPublic        = ['login', 'register'].includes(to.name)
  const isAuthenticated = authStore.isAuthenticated

  if (!isPublic && !isAuthenticated) {
    toast.info('Você precisa estar logado para acessar esta página.')
    return next({ name: 'login' })
  }

  next()
})

export default router
