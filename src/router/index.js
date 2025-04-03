import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...MainRoutes, // Importando corretamente o array de rotas
        ...AuthRoutes,
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/Error404.vue')
        }
    ]
});
