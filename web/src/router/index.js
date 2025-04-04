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

// Proteção de rotas que exigem autenticação
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    authStore.carregarToken();

    if (to.meta.requiresAuth && !authStore.token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
