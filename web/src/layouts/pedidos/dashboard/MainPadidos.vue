<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePedidosMg }       from '@/stores/usePedidosMg';
import Graficos               from '@/components/Graphic/Graphic.vue';
import TabelaPedidos          from '@/components/pedidos/TabelaPedidos.vue';
import Download               from '@/components/download/index.vue';
import { formatarDataSimples } from '@/utils/helpers.js';


// 1️⃣ Props opcionais (default vazio)
const props = defineProps({
  startDate: { type: String, default: '' },
  startEnd:  { type: String, default: '' }
})
// 2️⃣ Defaults: hoje e 30 dias atrás
const hoje       = new Date()
const trintaDias = new Date(hoje)
trintaDias.setDate(hoje.getDate() - 30)

// 3️⃣ Cria refs usando props ou defaults
const thisStartDate = ref(
  props.startDate
    ? new Date(props.startDate)
    : trintaDias
)
const thisStartEnd = ref(
  props.startEnd
    ? new Date(props.startEnd)
    : hoje
)
const pedidosMg      = usePedidosMg();
const pedidosFiltrados = ref([]);

// 4️⃣ Ao montar, carrega pedidos e, se a store tiver datas, as usa
onMounted(async () => {
  await pedidosMg.carregarPedidos()

  if (pedidosMg.startDate && pedidosMg.startEnd) {
    thisStartDate.value = pedidosMg.startDate
    thisStartEnd.value  = pedidosMg.startEnd
  }

  // 5️⃣ Filtra + formata DataEntrada
  pedidosFiltrados.value = pedidosMg.pedidos
    .filter(p => {
      const dt = new Date(p.created_at.replace(' ', 'T'))
      return dt >= thisStartDate.value && dt <= thisStartEnd.value
    })
    .map(p => {
      const dt  = new Date(p.created_at.replace(' ', 'T'))
      const dia = String(dt.getDate()).padStart(2,'0')
      const mes = String(dt.getMonth()+1).padStart(2,'0')
      const ano = dt.getFullYear()
      return { ...p, DataEntrada: `${dia}/${mes}/${ano}` }
    })
})
console.log(pedidosFiltrados.value);
const totalPedidos = computed(() => pedidosFiltrados.value.length)
const periodo      = computed(() => {
  if (!thisStartDate.value || !thisStartEnd.value) return ''
  return `${formatarDataSimples(thisStartDate.value)} – ${formatarDataSimples(thisStartEnd.value)}`
})
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
          <strong>{{ totalPedidos }}</strong>
          <span>Total de Pedidos</span>
        </div>
    
        <span v-if="thisStartDate && thisStartEnd">
          Período entre {{ formatarDataSimples(thisStartDate) }} - {{ formatarDataSimples(thisStartEnd) }}
        </span>
      </div>
      <!-- 4️⃣ Passa pedidos e intervalo para o gráfico -->

      <Graficos
        v-if="totalPedidos > 0 && thisStartDate.value && thisStartEnd.value"
        :key="`${thisStartDate.value.toISOString()}_${thisStartEnd.value.toISOString()}`"
        :pedidos="pedidosFiltrados"
        :start-date="thisStartDate.value"
        :end-date="thisStartEnd.value"
      />
    </div>
  </section>
  {{
    pedidosFiltrados 
  }}
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
