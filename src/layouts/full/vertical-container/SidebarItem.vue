<template>
  <router-link
    :to="to"
    class="sidebar-item"
    :class="{ active: isActive }"
  >
    <div class="item-content">
      <component
        :is="iconComp"
        class="icon"
      />
      <span v-if="!collapsed">{{ label }}</span>
    </div>

    <!-- Seta visível somente quando ativo -->
    <div
      v-if="isActive && !collapsed"
      class="arrow"
    >
      <ChevronRight class="arrow-icon" />
    </div>
  </router-link>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import * as icons from 'lucide-vue-next'

const props = defineProps({
  icon: String,
  label: String,
  to: String,
  collapsed: Boolean
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
const iconComp = computed(() => icons[props.icon] || icons.HelpCircle)
const ChevronRight = icons.ChevronRight
</script>

<style lang="scss" scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 30px;
  text-decoration: none;
  color: #1B1B1B;
  font-weight: 500;
  transition: 0.2s;

  &:hover, &.active {
    background-color: #fff;
    color: #1B1B1B;
    font-weight: 600;
  }

  .item-content {
    display: flex;
    align-items: center;
    gap: 12px;
    overflow: hidden;
    white-space: nowrap;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .arrow {
    display: flex;
    align-items: center;
  }

  .arrow-icon {
    width: 16px;
    height: 16px;
  }
}

</style>
