<template>
  <div class="pedidos-list">
    <h1>Todos os Pedidos</h1>
    <div class="pedidos-content">
      <ul>
        <li
          v-for="pedido in pedidosFiltrados"
          :key="pedido.id"
        >
          {{ pedido.nome }} - {{ formatarMoeda(pedido.ValorTotal) }} - {{ formatarData(new Date(pedido.DataEntrada)) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePedidos } from '@/composables/usePedidos';

const { pedidos, pedidosFiltrados, getPedidos, filtrarPedidos, formatarData, formatarMoeda } = usePedidos();

// Este componente exibe todos os pedidos, sem filtragem inicial
onMounted(() => {
  getPedidos();
});
</script>

<style scoped>
.pedidos-list {
  padding: 20px;
}

.pedidos-content ul {
  list-style: none;
  padding: 0;
}

.pedidos-content li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
