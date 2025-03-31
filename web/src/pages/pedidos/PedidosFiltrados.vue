<template>
  <div class="pedidos-filtrados">
    <h1>Pedidos Filtrados</h1>
    <div class="filter-area">
      <FilterPerido @selected-range="onDateChange" />
    </div>
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
import FilterPerido from '@/components/FilterDates/DatePicker.vue';

const { pedidos, pedidosFiltrados, getPedidos, filtrarPedidos, formatarData, formatarMoeda } = usePedidos();
const startDate = ref('');
const endDate = ref('');

const onDateChange = (range) => {
  if (range.length === 2) {
    startDate.value = range[0];
    endDate.value = range[1];
    filtrarPedidos(startDate.value, endDate.value);
  }
};

onMounted(() => {
  getPedidos();
});
</script>

<style scoped>
.pedidos-filtrados {
  padding: 20px;
}

.filter-area {
  margin-bottom: 20px;
}
</style>
