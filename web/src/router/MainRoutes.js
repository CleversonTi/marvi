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
                name: 'mix-produtos',
                path: '/clients',
                component: () => import('@/views/mixprodutos/Index.vue')
            },
            {
                name: 'clients',
                path: '/mix-produtos',
                component: () => import('@/views/clients/index.vue')
            },
            {
                name: 'helper',
                path: '/helper',
                component: () => import('@/views/helper/index.vue')
            },
            {
                name: 'myperfil',
                path: '/myperfil',
                component: () => import('@/views/myperfil/index.vue')
            },
        ]
};

