<template>
  <section class="tabela-pedidos">
    <Toolbar
      :pedidos-paginados="pedidosPaginados.length"
      :total-pedidos="pedidosFiltrados.length"
      @abrir-filtro="abrirFiltro"
    />

    <PedidoDetalhado
      v-if="pedidoSelecionado"
      :is-visible="mostrarPedidoDetalhado"
      :pedido="pedidoSelecionado"
      @close="fecharPedidoDetalhado"
    />

    <div v-if="pedidosPaginados.length > 0">
      <TableList
        :pedidos="pedidosPaginados"
        @abrir-detalhes="abrirDetalhesPedido"
      />
    </div>
    <div v-else>
      <p>Nenhum pedido encontrado.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePedidos } from '@/composables/usePedidos';

import Toolbar from '@/components/Toolbar/Toolbar.vue';
import PedidoDetalhado from '@/components/modals/PedidoDetalhado.vue';
import TableList from '@/components/Tabelas/TableList.vue';

const { pedidos, pedidosFiltrados, pedidosCarregados, getPedidos } = usePedidos();

const mostrarPedidoDetalhado = ref(false);
const pedidoSelecionado = ref(null);

const abrirDetalhesPedido = (pedido) => {
  pedidoSelecionado.value = pedido;
  mostrarPedidoDetalhado.value = true;
};

const fecharPedidoDetalhado = () => {
  pedidoSelecionado.value = null;
  mostrarPedidoDetalhado.value = false;
};

const pedidosPaginados = computed(() => pedidosFiltrados.value);

onMounted(() => {
  getPedidos();
});
</script>
