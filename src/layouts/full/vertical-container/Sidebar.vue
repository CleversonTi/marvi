<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="collapsed"
    :width="260"
    :mini-variant-width="80"
    app
    class="custom-sidebar"
  >
    <div class="sidebar__top">
      <v-btn
        icon
        @click="collapsed = !collapsed"
      >
        <v-icon>{{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </div>

    <v-list
      dense
      nav
    >
      <SidebarItem
        icon="mdi-home"
        label="Home"
        to="/"
        :collapsed="collapsed"
      />
      <SidebarItem
        icon="mdi-view-dashboard"
        label="Dashboard"
        to="/dashboard"
        :collapsed="collapsed"
      />
      <SidebarItem
        icon="mdi-folder"
        label="Create"
        to="/create"
        :collapsed="collapsed"
      />
      <SidebarItem
        icon="mdi-format-list-checkbox"
        label="Todo-Lists"
        to="/todos"
        :collapsed="collapsed"
      />

      <!-- Submenu com toggle -->
      <SidebarGroup
        icon="mdi-calendar"
        label="Calendar"
        :collapsed="collapsed"
        :items="[
          { label: 'Mensal', to: '/calendar/month' },
          { label: 'Semanal', to: '/calendar/week' }
        ]"
      />

      <SidebarItem
        icon="mdi-account"
        label="Profile"
        to="/profile"
        :collapsed="collapsed"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarGroup from './SidebarGroup.vue'

const drawer = ref(true)
const collapsed = ref(false)
</script>

<style scoped>
.custom-sidebar {
  background-color: #ECEFF1;
  color: #1B1B1B;
}
.sidebar__top {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
}
</style>
