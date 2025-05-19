<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePedidosMg }       from '@/stores/usePedidosMg';
import Graficos               from '@/components/Graphic/Graphic.vue';
import TabelaPedidos          from '@/components/pedidos/TabelaPedidos.vue';
import Download               from '@/components/download/index.vue';
import IconDirection from '@/components/icons/IconLeft.vue'
import { formatarDataSimples,sumOrders, formatatMoeda,  sumNestedField, formatWeight} from '@/utils/helpers.js';


// 1️⃣ Props opcionais (default vazio)
const props = defineProps({
  startDate: { type: Date, required: false, default: () => new Date(Date.now() - 30*24*60*60*1000) },
  endDate:   { type: Date, required: false, default: () => new Date() }
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


// 4️⃣ Ao montar, carrega pedidos e, se a store tiver datas, as usa
onMounted(() => {
  pedidosMg.carregarPedidos()
})
const pedidosFiltrados = computed(() => {
  if (!thisStartDate.value || !thisStartEnd.value) return []
  return pedidosMg.pedidos
    .filter(p => {
      // converte "YYYY-MM-DD hh:mm:ss" em um Date válido
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
    console.log('pedidosFiltrados', pedidosFiltrados);
})

const totalPedidos = computed(() => pedidosFiltrados.value.length)
const periodo      = computed(() => {
  if (!thisStartDate.value || !thisStartEnd.value) return ''
  return `${formatarDataSimples(thisStartDate.value)} – ${formatarDataSimples(thisStartEnd.value)}`
});

// soma todos os pesos (em kg) dentro de items → total em kg
const totalWeightKg = computed(() =>
  sumNestedField(pedidosMg.pedidosFiltrados, 'items', 'weight')
)
// já formatado na unidade ideal
const totalWeightFormatted = computed(() =>
  formatWeight(totalWeightKg.value)
)
// soma bruta (número)
const valorTotalBruto = computed(() =>
  sumOrders(pedidosFiltrados.value, 'base_grand_total')
)
// formata para moeda
const valorTotalFaturamento = computed(() =>
  formatatMoeda(valorTotalBruto.value)
)
const totalWeight = computed(() =>
  sumWeights(pedidosMg.pedidosFiltrados, 'items', 'weight')
)
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
        v-if="pedidosFiltrados.length"
        :pedidos="pedidosFiltrados"
        :start-date="thisStartDate.value"
        :end-date="thisStartEnd.value"
      />
    </div>
    <div class="v-card-item__box">
      <div class="card fatura not-approved">
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>1</strong>
          </div>
          <div class="link">
            <IconDirection
              stroke-width="1.5"
              size="20"
            />
          </div>
          <div class="description">
            <span>Pedidos não aprovados</span>
          </div>
        </router-link>
      </div>

      <div class="card fatura unbilled">
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>3</strong>
          </div>
          <div class="link">
            <IconDirection
              stroke-width="1.5"
              size="20"
            />
          </div>
          <div class="description">
            <span>Pedidos não faturados</span>
          </div>
        </router-link>
      </div>

      <div class="card">
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>300</strong>
          </div>
          <div class="description">
            <span>Pedidos não faturados</span>
          </div>
        </router-link>
      </div>

      <div class="card">
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>20</strong>
          </div>
          <div class="description">
            <span>Pedidos aguardando envio</span>
          </div>
        </router-link>
      </div>

      <div class="card">
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>{{ totalWeightFormatted }} </strong>
          </div>
          <div class="description">
            <span>Peso dos pedidos</span>
          </div>
        </router-link>
      </div>

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
