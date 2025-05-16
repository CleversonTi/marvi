<!-- web/src/components/Graphic/Graphic.vue -->
<script setup>
import { ref, watch } from 'vue'
import ApexChart from 'vue3-apexcharts'

// 1️⃣ Definição dos props (aceita Date ou String ISO)
const props = defineProps({
  pedidos:   { type: Array,   default: () => [] },
  startDate: { type: [Date, String], default: () => new Date(Date.now() - 1000*60*60*24*30) },
  endDate:   { type: [Date, String], default: () => new Date() }
})

// 2️⃣ Normalize os valores de startDate e endDate para refs de Date válidos
const normalizedStart = ref(new Date(props.startDate))
const normalizedEnd   = ref(new Date(props.endDate))

// Se o pai passar strings ISO, converte-as para Date
watch(() => props.startDate, val => {
  const d = new Date(val)
  if (!isNaN(d)) normalizedStart.value = d
})
watch(() => props.endDate, val => {
  const d = new Date(val)
  if (!isNaN(d)) normalizedEnd.value = d
})

// 3️⃣ Configurações iniciais do gráfico
const lineSeries  = ref([{ name: 'Pedidos', data: [] }])
const lineOptions = ref({
  chart: { id: 'basic-line-chart', toolbar: { show: false } },
  stroke: { curve: 'smooth', width: 3 },
  grid: { borderColor: '#ccc', strokeDashArray: 5 },
  xaxis: { type: 'category', labels: { datetimeUTC: false }, categories: [] }
})

// 4️⃣ Função que gera cada mês (YYYY-MM) entre duas datas
function gerarMesesNoPeriodo(start, end) {
  const meses = []
  const d = new Date(start)
  d.setDate(1)
  while (d <= end) {
    meses.push(d.toISOString().slice(0,7))
    d.setMonth(d.getMonth()+1)
  }
  return meses
}

// 5️⃣ Processa os pedidos e atualiza series/options
function processarPedidos() {
  const s = normalizedStart.value
  const e = normalizedEnd.value

  // ❌ Se não tiver datas válidas ou lista de pedidos vazia, limpa tudo
  if (!(s instanceof Date) || isNaN(s) || !(e instanceof Date) || isNaN(e) || !Array.isArray(props.pedidos)) {
    lineSeries.value  = [{ name: 'Pedidos', data: [] }]
    lineOptions.value.xaxis.categories = []
    return
  }

  // inicializa contagem para cada mês
  const agrupado = {}
  gerarMesesNoPeriodo(s, e).forEach(m => agrupado[m] = 0)

  // conta cada pedido
  props.pedidos.forEach(p => {
    if (!p.DataEntrada) return
    const [dia, mes, ano] = p.DataEntrada.split('/').map(Number)
    const dt = new Date(ano, mes-1, dia)
    dt.setDate(1)
    const chave = dt.toISOString().slice(0,7)
    if (agrupado[chave] !== undefined) agrupado[chave]++
  })

  // monta categorias e dados
  const categories = Object.keys(agrupado)
  const data       = Object.values(agrupado)

  lineOptions.value = {
    ...lineOptions.value,
    xaxis: {
      ...lineOptions.value.xaxis,
      categories
    }
  }
  lineSeries.value = [{ name: 'Pedidos', data }]
}

// 6️⃣ Observa mudanças úteis e dispara imediatamente
watch(
  [
    () => props.pedidos.length,
    () => normalizedStart.value.getTime(),
    () => normalizedEnd.value.getTime()
  ],
  processarPedidos,
  { immediate: true }
)
</script>

<template>
  <div class="area-graphics">
    <!-- só renderiza o chart quando já tivermos categorias -->
    <apexchart
      v-if="lineOptions.xaxis.categories.length"
      :series="lineSeries"
      :options="lineOptions"
      type="line"
      height="278"
      width="650"
    />
  </div>
</template>

<style scoped>
.area-graphics {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
