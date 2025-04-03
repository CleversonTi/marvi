<template>
  <section class="pedidos-container">
    <!-- Toolbar - Filtros e Ações -->
    <Toolbar 
      :filtros-ativos="filtrosAtivos"
      @filtrar="aplicarFiltro"
      @limpar-filtros="limparFiltros"
      @remover-filtro="removerFiltro"
      @toggle-view="toggleView"
      @novo-pedido="novoPedido"
    />

    <!-- Exibição da Tabela ou Grid -->
    <transition
      :name="transitionName"
      mode="out-in"
    >
      <div
        v-if="viewMode === 'list'"
        :key="viewMode"
      >
        <TableList :pedidos="pedidosPaginados" />
      </div>
      <div
        v-else
        :key="viewMode"
      >
        <GridList :pedidos="pedidosPaginados" />
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import TableList from '@/components/Tabelas/TableList.vue';
import GridList from '@/components/GridList/GridList.vue';
import Toolbar from '@/components/Toolbar/Toolbar.vue';
import { usePedidos } from '@/composables/usePedidos';

const viewMode = ref('list');
const transitionName = ref('fade');
const filtrosAtivos = ref([]);

const { pedidosFiltrados, pedidosPaginados, aplicarBusca, aplicarFiltro, limparFiltros, removerFiltro } = usePedidos();
console.log(pedidosFiltrados);
const toggleView = (mode) => {
  viewMode.value = mode;
  transitionName.value = mode === 'list' ? 'smooth-fade' : 'smooth-slide';
};

const novoPedido = () => {
  console.log("Criar novo pedido");
};
</script>

<style scoped>
.pedidos-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
