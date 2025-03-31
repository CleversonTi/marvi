<script setup>
const props = defineProps({
  item: Object,
  collapsed: Boolean
})
</script>

<template>
  <v-list-subheader
    v-if="!collapsed"
    class="smallCap text-uppercase text-subtitle-2 mt-5 font-weight-bold"
  >
    {{ item.header }}
  </v-list-subheader>
</template>
