<template>
  <div class="area-graphics">
    <div id="chart">
      <apexchart 
        type="line"
        width="650"
        height="278"
        :options="lineGraficOptions"
        :series="lineGraficSeries"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  pedidos: {
    type: Array,
    required: true
  }
})


const lineGraficSeries = ref([
  {
    name: 'Sales',
    data: []
  }
])

const lineGraficOptions = ref({
  chart: {
    id: 'basic-line-chart',
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: [], // ← Vamos preencher isso com base nas datas dos pedidos
  },
  stroke: {
    curve: 'smooth',
    width: 3,
    colors: ['#1A9701'],
  },
  grid: {
    show: true,
    borderColor: '#ccc',
    strokeDashArray: 5,
    xaxis: {
      lines: { show: false },
    },
    yaxis: {
      lines: { show: true },
    },
  },
});

watch(
  () => props.pedidos,
  (novosPedidos) => {
    if (!novosPedidos || !novosPedidos.length) return

    // Exemplo: agrupar por data e contar quantidade de pedidos por dia
    const agrupado = {}

    novosPedidos.forEach(pedido => {
      const data = pedido.DataEntrada // formato dd/mm/yyyy
      if (agrupado[data]) {
        agrupado[data]++
      } else {
        agrupado[data] = 1
      }
    })

    const categorias = Object.keys(agrupado)
    const dados = Object.values(agrupado)

    lineGraficOptions.value.xaxis.categories = categorias
    lineGraficSeries.value = [
      {
        name: 'Pedidos',
        data: dados
      }
    ]
  },
  { immediate: true, deep: true }
)

</script>


