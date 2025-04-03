<template>
  <NoResults v-if="!pedidos.length" />
  <div
    v-else
    class="table-container"
  >
    <table>
      <thead>
        <tr>
          <th>Número do Pedido</th>
          <th>Data Entrada</th>
          <th>Cliente</th>
          <th>Perfil</th>
          <th>Vencimento</th>
          <th>Situação</th>
          <th>Peso (kg)</th>
          <th>Valor Total (R$)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pedido, index) in pedidos"
          :key="index"
        >
          <td>{{ pedido.NumeroPedido }}</td>
          <td>{{ pedido.DataEntrada }}</td>
          <td>{{ pedido.Cliente }}</td>
          <td>{{ pedido.Perfil || 'Padrão' }}</td>
          <td>{{ pedido.Vencimento }}</td>
          <td>{{ pedido.Situacao }}</td>
          <td>{{ pedido.PesoFaturado || '0.0000' }}</td>
          <td>{{ formatarMoeda(pedido.ValorTotal) }}</td>
          <td>
            <span :class="['status-badge', formatarStatus(pedido.Status)]">{{ pedido.Status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginator 
      :total-itens="totalPedidos"
      @mudanca-pagina="atualizarPagina" 
    />
  </div>
</template>

<script setup>
import NoResults from '@/components/Helpers/NoResults.vue';
import Paginator from '@/components/Pagination/Paginator.vue';
import { formatarStatus, formatarMoeda } from '@/composables/usePedidos'; // Certifique-se de que está importando corretamente

const props = defineProps({
  pedidos: { type: Array, default: () => [] },
  totalPedidos: { type: Number, required: true }
});

const emit = defineEmits(['mudancaPagina']);

const atualizarPagina = (paginaInfo) => {
  emit('mudancaPagina', paginaInfo);
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
}

.status-ativo {
  background-color: green;
}

.status-inativo {
  background-color: red;
}
</style>
