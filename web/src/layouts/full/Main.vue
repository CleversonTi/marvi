<script setup lang="js">
import { ref, shallowRef } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import ExtraBox from './vertical-sidebar/extrabox/ExtraBox.vue';
import Msg from './msg-saudacao/Mensagem.vue';
// Icon Imports
import { Menu2Icon, BellRingingIcon } from 'vue-tabler-icons';
// dropdown imports
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';
import Sidebar from '@/layouts/full/vertical-container/Sidebar.vue';

import { Monitor } from 'lucide-vue-next';
const drawer = ref(false)
// Aqui está o menu que será passado
const sidebarMenu = [
  { title: 'Minha Conta', icon: 'mdi-account-circle-outline', to: '/minha-conta' },
  { title: 'Pedidos', icon: 'mdi-file-document-multiple-outline', to: '/pedidos' },
  { title: 'Clientes', icon: 'mdi-account-group-outline', to: '/clientes' },
  { title: 'Mix de Produtos', icon: 'mdi-package-variant-closed', to: '/mix-produtos' }
];

const sDrawer = ref(true);

</script>

<template>
    <div class="topo">
        <v-app-bar elevation="0" height="70">
            <div class="d-flex align-center justify-space-between w-100">
                
                <div class="logo-wrapper">
                    <div class="logo">
                        <router-link to="/">
                            <img src="@/assets/images/logos/logo.png" />
                        </router-link>
                    </div>
                </div>

                <div class="sidebar-primary">

                    <ul class="opens-site">
                        <li>
                            <router-link to="/"> <Monitor /><span> Abrir no site </span> </router-link>
                        </li>
                    </ul>
                    
                   
                    <!-- User Profile -->
                    <ProfileDD />
                </div>
            </div>
        </v-app-bar>
    </div>

    <!------Sidebar-------->
        <Sidebar :menu="sidebarMenu" />
    <!------Header-------->
    
</template>
