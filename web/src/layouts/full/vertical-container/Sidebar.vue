<template>

  <v-list class="pa-6">
    <v-list-item
      v-for="(item, index) in menu"
      :key="index"
      :to="item.to"
      :exact="true"
      :class="[
        'mb-2',
        'sidebar-item',
        { 'active-sidebar': $route.path === item.to }
      ]"
      rounded
      :disabled="item.disabled"
      :target="item.type === 'external' ? '_blank' : ''"
    >
      <template v-slot:prepend>
        <v-icon
          :icon="item.icon"
          class="sidebar-icon"
          :color="$route.path === item.to ? 'primary' : 'grey'"
          size="24"
        />
      </template>

      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>

    const { menu } = defineProps({
    menu: Array
    });

    console.log("menu");
    console.log(menu);


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
