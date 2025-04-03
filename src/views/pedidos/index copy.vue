<template>
  <div class="pedidos-page">
    <ResumoCards />
  </div>
</template>

<script setup>
import ResumoCards from '@/components/pedidos/ResumoCards.vue';

</script>

<style scoped>
.pedidos-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters-and-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
