<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { usePedidos } from '@/composables/usePedidos';
import Download from '@/components/download/index.vue';
import Graficos from '@/components/Graphic/Graphic.vue';
import TabelaPedidos from '@/components/pedidos/TabelaPedidos.vue';
import { usePedidosMg } from '@/stores/usePedidosMg';
import IconDirection from '@/components/icons/IconLeft.vue';
import { formatarDataSimples } from '@/utils/helpers.js';

const pedidosMg = usePedidosMg(); // ✅ Correto agora

const props = defineProps({
  startDate: { type: String, required: true }, 
  startEnd: { type: String, required: true },
});

const thisStartDate = ref(new Date(props.startDate));
const thisStartEnd = ref(new Date(props.startEnd));

const {
  pedidos,
  pedidosFiltrados,
  pedidosCarregados,
  getPedidos,
  filtrarPedidos,
  formatarPeriodo,
  valorTotalFaturamento
} = usePedidos();

onMounted(() => {
  pedidosMg.carregarPedidos();
});

// Quando `startDate` e `startEnd` forem detectados após o carregamento da API
watch(
  () => [pedidosMg.startDate, pedidosMg.startEnd],
  ([dataInicial, dataFinal]) => {
    if (dataInicial && dataFinal) {
      thisStartDate.value = new Date(dataInicial);
      thisStartEnd.value = new Date(dataFinal);
      filtrarPedidos(thisStartDate.value, thisStartEnd.value);
    }
  },
  { immediate: false }
);

// Se você ainda quiser usar os dados locais com getPedidos()
onMounted(() => {
  getPedidos().then(() => {
    if (pedidosCarregados.value) {
      filtrarPedidos(thisStartDate.value, thisStartEnd.value);
    }
  });
});

// Se props mudarem, aplica novo filtro
watch(
  () => [props.startDate, props.startEnd],
  ([newStartDate, newEndDate]) => {
    thisStartDate.value = new Date(newStartDate);
    thisStartEnd.value = new Date(newEndDate);
    if (pedidosCarregados.value) {
      filtrarPedidos(thisStartDate.value, thisStartEnd.value);
    }
  },
  { immediate: true }
);

const periodoFormatado = computed(() => {
  return formatarPeriodo(thisStartDate.value, thisStartEnd.value);
});
const formatarData = (data) => {
  if (!data || !(data instanceof Date)) return ''
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}

const pedidosFiltradosCount = computed(() => pedidosFiltrados.value?.length || 0);
</script>

<template>
  <section class="primary_section">
    <h4>Resumo dos pedidos Magento</h4>
    <div class="filter_area">
      <Download />
    </div>
  </section>
  
  <section class="primary_section">
    <div class="v-card-item__content">
      <div class="v-card-item_header">
        <div class="total">
          <strong>
            999
          </strong>
          <span>Total de Pedidos</span>
        </div>
        <div class="periodo">
          <span v-if="thisStartDate && thisStartEnd">
            Período entre {{ formatarDataSimples(thisStartDate) }} - {{ formatarDataSimples(thisStartEnd) }}
          </span>
        </div>
      </div>
      <Graficos />
    </div>
  </section>

  <!-- Tabela final com os pedidos filtrados -->
  <section class="primary_section tables">
    <TabelaPedidos :dados="pedidosFiltrados" />
  </section>
</template>

<style>
.primary_section {
  padding: 20px;
  margin: 20px;
  background: white;
  border-radius: 8px;
}
.v-card-item__content {
  margin-bottom: 20px;
}
.v-card-item__box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
