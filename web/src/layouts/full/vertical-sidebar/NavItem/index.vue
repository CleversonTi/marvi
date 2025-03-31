<script setup>
import Icon from '../Icon.vue'

const props = defineProps({
  item: Object,
  level: Number,
  collapsed: Boolean
})
</script>

<template>
  <v-list-item
    :to="item.to"
    rounded
    class="mb-1"
    color="primary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''"
  >
    <!-- Ícone -->
    <template #prepend>
      <Icon
        :item="item.icon"
        :level="level"
      />
    </template>

    <!-- Título -->
    <v-list-item-title v-if="!collapsed">
      {{ item.title }}
    </v-list-item-title>

    <!-- Subtítulo -->
    <v-list-item-subtitle
      v-if="item.subCaption && !collapsed"
      class="text-caption mt-n1"
    >
      {{ item.subCaption }}
    </v-list-item-subtitle>

    <!-- Chip -->
    <template
      v-if="item.chip && !collapsed"
      #append
    >
      <v-chip
        :color="item.chipColor"
        class="sidebarchip"
        size="small"
        :variant="item.chipVariant"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>
