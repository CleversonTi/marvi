<script setup>
import { ref, watch, onMounted, toRefs,computed } from 'vue';
import { usePedidos } from '@/composables/usePedidos';
import Download from '@/components/download/index.vue';
import Graficos from '@/components/Graphic/Graphic.vue';
import TabelaRepresentantes from '@/components/Representante/resumo/TabelaRepresentantes.vue';

const props = defineProps({
  startDate: { type: String, required: true }, 
  startEnd: { type: String, required: true },
});

console.log("📅 Props recebidas - startDate:", props.startDate, "startEnd:", props.startEnd);

const thisStartDate = ref(new Date(props.startDate)); // 🔥 Converter String ISO para Date
const thisStartEnd = ref(new Date(props.startEnd));   // 🔥 Converter String ISO para Date

const { pedidos, pedidosFiltrados, pedidosCarregados, getPedidos, filtrarPedidos, formatarPeriodo } = usePedidos();

onMounted(() => {
  console.log("📥 onMounted executado.");
  getPedidos();
});

watch(
  () => [props.startDate, props.startEnd], // 🔥 Observa alterações nas `props`
  ([newStartDate, newEndDate]) => {
    console.log("🔄 Watch detectou mudança de props:", newStartDate, newEndDate);
    thisStartDate.value = new Date(newStartDate);
    thisStartEnd.value = new Date(newEndDate);
    if (pedidosCarregados.value) {
      filtrarPedidos(thisStartDate.value, thisStartEnd.value);
    }
  },
  { immediate: true }
  
);
const pedidosFiltradosCount = computed(() => pedidosFiltrados.value?.length || 0);
</script>

<template>
  <section class="primary_section">
    <h4>Resumo dos pedidos</h4>
    <div class="filter_area">
      <Download />
    </div>
  </section>
  
  <section class="primary_section">
    <div class="v-card-item__content">
      <div class="v-card-item_header">
        <div class="total">
          <strong>{{ pedidosFiltrados.value?.length || 0 }}</strong>
          <span>Total de Pedidos no Período</span>
        </div>
        <div class="periodo">
          <span>{{ formatarPeriodo(thisStartDate.value, thisStartEnd.value) }}</span>
        </div>
      </div>
      <Graficos :pedidos="pedidosFiltrados" />
    </div>

    <div class="v-card-item__box">
      <div class="card totalfaturamento">
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>{{ valorTotalFaturamento }}</strong>
          </div>
          <div class="description">
            <span>Valor total do faturamento</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
  <section class="primary_section tables">
    <TabelaRepresentantes :dados="pedidosFiltrados" />
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
