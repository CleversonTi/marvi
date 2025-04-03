<template>
  <div class="toolbar">
    <div class="titulo-status">
      <span>Mostrando <strong>{{ pedidosPaginados }}</strong> pedidos de <strong>{{ totalPedidos }}</strong></span>
      <button
        class="filter-button"
        @click="emitirAbrirFiltro"
      >
        <Filter
          size="20"
          stroke-width="2.5"
          color="#fff"
        />
      </button>

      <div
        v-if="filtrosAtivos.length > 0"
        class="filtros-aplicados"
      >
        <div
          v-for="(filtro, index) in filtrosAtivos"
          :key="index"
          class="filtro-tag"
        >
          <span>{{ filtro }}</span>
          <button @click="removerFiltro(index)">
            X
          </button>
        </div>
        <button
          class="btn-limpar"
          @click="limparFiltros"
        >
          Limpar Todos X
        </button>
      </div>
    </div>

    <div class="action-buttons">
      <button
        class="new-order-button"
        @click="novoPedido"
      >
        Novo Pedido +
      </button>
      <div class="actions-list-or-grid">
        <button
          class="view-button"
          @click="emitirTrocarVisualizacao('list')"
        >
          <IconList
            size="30"
            stroke-width="2.5"
            class="text-pink-500"
            color="#8B8B8B"
          />
        </button>
        <button
          class="view-button"
          @click="emitirTrocarVisualizacao('grid')"
        >
          <Grid2x2
            size="30"
            stroke-width="2.5"
            color="#8B8B8B"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Filter, Grid2x2 } from 'lucide-vue-next';
import IconList from '@/components/icons/IconListMarvi.vue';

const props = defineProps({
  pedidosPaginados: { type: Number, required: true },
  totalPedidos: { type: Number, required: true },
  filtrosAtivos: { type: Array, default: () => [] }
});


const emit = defineEmits(['abrirFiltro', 'trocarVisualizacao', 'removerFiltro', 'limparFiltros']);

const emitirAbrirFiltro = () => emit('abrirFiltro');
const emitirTrocarVisualizacao = (modo) => emit('trocarVisualizacao', modo);
const removerFiltro = (index) => emit('removerFiltro', index);
const limparFiltros = () => emit('limparFiltros');
const novoPedido = () => console.log("📦 Novo Pedido Clicado!");
</script>

<style scoped>

</style>
