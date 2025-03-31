<template>
  <div class="sidebar-group">
    <div class="sidebar-item" @click="toggle" :class="{ collapsed }">
      <v-icon>{{ icon }}</v-icon>
      <span v-if="!collapsed" class="label">{{ label }}</span>
      <v-icon v-if="!collapsed" class="arrow" :class="{ open: expanded }">
        mdi-chevron-down
      </v-icon>
    </div>

    <v-expand-transition>
      <div v-show="expanded" class="submenu" v-if="!collapsed">
        <router-link
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          class="submenu-item"
        >
          {{ item.label }}
        </router-link>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  icon: String,
  label: String,
  collapsed: Boolean,
  items: Array
})

const expanded = ref(false)
const toggle = () => {
  expanded.value = !expanded.value
}
</script>

<style scoped>
.sidebar-group {
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 8px;
  color: #1B1B1B;
  cursor: pointer;
  transition: background 0.2s;
}

.sidebar-item:hover {
  background-color: #e0e0e0;
}

.label {
  flex-grow: 1;
}

.arrow {
  margin-left: auto;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.submenu {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
}

.submenu-item {
  padding: 6px 0;
  font-size: 14px;
  color: #333;
  text-decoration: none;
}

.submenu-item:hover {
  color: #5c3df4;
}
</style>
