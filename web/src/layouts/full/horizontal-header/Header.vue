<template>
  <div class="topo">
    <v-app-bar 
      app
      elevation="0" 
      height="70" 
      color="#E6223D"
    >
      <div class="d-flex pa-6 align-center justify-space-between w-100">
        <div class="logo-wrapper">
          <div class="logo">
            <router-link to="/">
              <img src="@/assets/images/logos/logo.png">
            </router-link>
          </div>
        </div>

        <div class="sidebar-primary">
          <ul class="opens-site">
            <li>
              <router-link to="/">
                <Monitor /><span> Abrir no site </span>
              </router-link>
            </li>
          </ul>
                    
                   
          <!-- User Profile -->
          <ProfileDD />
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script setup>
  import Monitor from '@/components/icons/Monitor.vue';
  import ProfileDD from '../vertical-header/ProfileDD.vue';
    


</script>

<style scoped>
.sidebar-item {
  padding: 12px 16px;
  transition: background 0.3s ease;
}
.active-sidebar {
  background: white;
  border-radius: 12px;
  font-weight: bold;
}
.sidebar-icon {
  margin-right: 16px;
  transition: color 0.3s ease;
}
</style>
