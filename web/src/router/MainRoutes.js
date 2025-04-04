export default [
    {
        path: '/',
        component: () => import('@/layouts/full/FullLayout.vue'),
        children: [
            {
                name: 'dashboard',
                path: '',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'account',
                path: 'account',
                component: () => import('@/views/account/index.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'pedidos',
                path: 'pedidos',
                component: () => import('@/views/pedidos/index.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'pedidos-list',
                path: 'pedidos-list',
                component: () => import('@/pages/pedidos/PedidosList.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'pedidos-filtrados',
                path: 'pedidos-filtrados',
                component: () => import('@/pages/pedidos/PedidosFiltrados.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'representantes',
                path: 'representantes',
                component: () => import('@/views/representantes/index.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'mix-produtos',
                path: 'mix-produtos',
                component: () => import('@/views/mixprodutos/Index.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'clients',
                path: 'clients',
                component: () => import('@/views/clients/index.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'helper',
                path: 'helper',
                component: () => import('@/views/helper/index.vue'),
                meta: { requiresAuth: true }
            },
            {
                name: 'myperfil',
                path: 'myperfil',
                component: () => import('@/views/myperfil/index.vue'),
                meta: { requiresAuth: true }
            },
        ]
    }
];
