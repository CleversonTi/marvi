<!-- web/src/components/pedidos/FilterHeader.vue -->
<template>
  <div class="filter-header">
    <div class="left-section">
      <span>Mostrando {{ totalExibido }} pedidos de {{ totalPedidos }}</span>
    </div>
    <div class="right-section">
      <button @click="openFilter">
        🔍 Filtro
      </button>
      <button @click="novoPedido">
        ➕ Novo Pedido
      </button>
      <button @click="toggleViewMode">
        📋 / 🖼️
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalExibido: Number,
  totalPedidos: Number
});

const emit = defineEmits(['filter', 'newOrder', 'toggleView']);

const openFilter = () => emit('filter');
const novoPedido = () => emit('newOrder');
const toggleViewMode = () => emit('toggleView');
</script>

<style scoped>
.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.left-section {
  font-weight: bold;
}

.right-section button {
  margin-left: 8px;
}
</style>
