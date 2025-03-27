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
                    
                   
                    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class=" plain"  v-bind="props" icon>
               <div class="alias">
                  <span>PV</span>
                 </div>
               <div class="user-persona">
                    <router-link to="/"> 
                    
                        <span>
                            Primeiro Segundo 
                        </span> 
                        <ChevronDown  stroke-width="1.5" size="20"/>
                    </router-link>
                </div>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
            <v-list class="py-0" lines="one" density="compact">
                <v-list-item value="item1" color="primary" >
                    <template v-slot:prepend>
                        <UserIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">
                        <router-link to="/myperfil/"> 
                          Meu Perfil 
                          </router-link>
                    </v-list-item-title>
                </v-list-item>
                
                
            </v-list>
            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn to="/auth/login" color="primary" variant="outlined" block>Sair</v-btn>
            </div>
        </v-sheet>
    </v-menu>
                </div>
            </div>
        </v-app-bar>
    </div>
    <div class="d-flex notfound justify-center align-center text-center h-100vh">
        <div>
            <!-- <img src="@/assets/images/background/errorimg.svg" width="500" alt="404" /> -->
            <h3 class="text-h3 pt-3">Opps!!!</h3>
             <h1 class="text-h1 pt-3">404</h1>
            <h4 class="text-h4 my-8">Desculpe, mas essa página não existe.</h4>
            <v-btn flat color="primary" class="mb-4" to="/">ir para página inicial </v-btn>
        </div>    
    </div>
</template>
<script setup lang="js">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import { ChevronDown } from 'lucide-vue-next';
</script>
