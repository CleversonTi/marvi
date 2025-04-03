<template>
  <NoResults v-if="!pedidos.length" />
  <section
    v-else
    class="listas-container"
  >
    <div class="item-conteudo">
      <ul class="lista-card">
        <li
          v-for="(pedido, index) in pedidos"
          :key="index"
          class="lista-item"
        >
          <div class="cod_pedidos item">
            <strong class="title">Nº do Pedido</strong>
            <span>{{ pedido.NumeroPedido }}</span>
          </div>

          <div class="name_cliente item">
            <strong class="title">Cliente</strong>
            <span>{{ pedido.Cliente }}</span>
          </div>
          
          <div class="dates_cliente item two-itens">
            <div class="name_cliente">
              <strong class="title">Entrada</strong>
              <span>{{ pedido.DataEntrada }}</span>
            </div>
            <div class="name_cliente">
              <strong class="title">Vencimento</strong>
              <span>{{ pedido.Vencimento }}</span>
            </div>
          </div>
          
          <div class="dates_cliente item three-itens">
            <div class="name_cliente">
              <strong class="title">Situação</strong>
              <span>{{ pedido.Situacao }}</span>
            </div>
            <div class="name_cliente">
              <strong class="title">Total</strong>
              <span>{{ formatarMoeda(pedido.ValorTotal) }}</span>
            </div>
            <div class="name_cliente badge">
              <strong class="title">Status</strong>
              <span><span :class="['status-badge', formatarStatus(pedido.Status)]">{{ pedido.Status }}</span></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Paginator 
      :total-itens="totalPedidos"
      @mudanca-pagina="atualizarPagina" 
    />
  </section>
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

<style scoped lang="scss">

</style>
