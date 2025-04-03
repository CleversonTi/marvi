<template>
  <section class="tabela-pedidos">
    <div class="header">
      <div class="titulo">
        Todos os Pedidos
      </div>
      <div class="filtros">
        <span>Mostrando {{ pedidosFiltrados.value.length }} pedidos de {{ pedidos.value.length }}</span>
        <button
          class="filter-button"
          @click="abrirFiltro"
        >
          <IconFilter
            size="20"
            stroke-width="1.5"
          />
        </button>
        <button
          class="new-order-button"
          @click="novoPedido"
        >
          Novo Pedido +
        </button>
        <button
          class="view-button"
          @click="toggleView"
        >
          <IconGrid
            size="20"
            stroke-width="1.5"
          />
        </button>
        <button
          class="popup-button"
          @click="abrirPopup"
        >
          <IconMore
            size="20"
            stroke-width="1.5"
          />
        </button>
      </div>
    </div>

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
          v-for="(pedido, index) in pedidosFiltrados"
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
          <td><span :class="['status-badge', pedido.Status.toLowerCase().replace(' ', '-')]">{{ pedido.Status }}</span></td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      Resultados por página:
      <select v-model="itensPorPagina">
        <option value="10">
          10
        </option>
        <option value="20">
          20
        </option>
        <option value="50">
          50
        </option>
      </select>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePedidos } from '@/composables/usePedidos';

const { pedidos, pedidosFiltrados } = usePedidos();

const itensPorPagina = ref(10);
const currentPage = ref(1);

const abrirFiltro = () => console.log('Abrir filtro');
const novoPedido = () => console.log('Novo pedido');
const toggleView = () => console.log('Toggle view');
const abrirPopup = () => console.log('Abrir popup');

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor || 0);
};
</script>

<style scoped>
.tabela-pedidos {
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.table th {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
}

.table td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
}
.status-badge.faturado { background-color: blue; }
.status-badge.pendente { background-color: orange; }
.status-badge.enviado { background-color: green; }
.status-badge.nao-faturado { background-color: red; }
.status-badge.aguardando { background-color: yellow; }
</style>
