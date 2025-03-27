<script setup lang="js">
import { RouterView } from 'vue-router';
//  import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
// import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import MainView from './Main.vue';
</script>

<template>
    <v-locale-provider >
        <v-app>
            <!-- <VerticalSidebarVue />
            <VerticalHeaderVue  /> -->
            <MainView />
            <v-main>
               
                <v-container fluid class="page-wrapper">
                   <RouterView />
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
