<script setup lang="js">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import { ChevronDown } from 'lucide-vue-next';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
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
</template>
