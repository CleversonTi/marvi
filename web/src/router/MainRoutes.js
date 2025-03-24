export default {
    path: '/',
    
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'account',
            path: '/account',
            component: () => import('@/views/account/index.vue')
        },
        {
            name: 'pedidos',
            path: '/pedidos',
            component: () => import('@/views/pedidos/index.vue')
        },
        {
            name: 'representantes',
            path: '/representantes',
            component: () => import('@/views/representantes/index.vue')
        },
        {
            name: 'clients',
            path: '/clients',
            component: () => import('@/views/clients/index.vue')
        },
    ]
};

