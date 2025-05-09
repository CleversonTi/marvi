// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToast } from 'vue-toastification';

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
  const toast = useToast();
  // Carrega o token do localStorage e tenta validar o usuário
  if (!authStore.token) {
    await authStore.carregarToken();
  }

  // Verifica se o token existe E foi validado com sucesso
  const isAuthenticated = !!authStore.token && authStore.isAuthenticated;
  const isPublic = ['login', 'register'].includes(to.name);

  if (!isPublic && !isAuthenticated) {
    toast.info('Você precisa estar logado para acessar esta página.');
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
