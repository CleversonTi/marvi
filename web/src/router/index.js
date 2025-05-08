// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/useAuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...MainRoutes,
    ...AuthRoutes,
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Error404.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Aguarda carregarToken se necessário
  if (!authStore.token) {
    await authStore.carregarToken(); // garantir que o token seja carregado
  }

  const isAuthenticated = !!authStore.token;
  const isPublic = ['login', 'register'].includes(to.name);

  if (!isPublic && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
