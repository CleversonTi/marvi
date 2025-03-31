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
    name: 'Pedidos',
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
    type: 'datetime', // Tratamento de data ativado
    labels: {
      format: 'MMM yyyy', // Exibe como Jan, Feb, Mar, etc.
      datetimeUTC: false 
    },
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
    if (!novosPedidos || !novosPedidos.length) return;

    console.log("📥 Recebendo pedidos para gráfico:", novosPedidos);

    const agrupado = {};

    novosPedidos.forEach(pedido => {
      const data = pedido.DataEntrada; // formato dd/mm/yyyy
      if (!data) return;

      const [dia, mes, ano] = data.split('/').map(Number);
      const dataObj = new Date(ano, mes - 1, dia);
      
      const dataISO = dataObj.toISOString().split('T')[0];
      
      if (agrupado[dataISO]) {
        agrupado[dataISO]++;
      } else {
        agrupado[dataISO] = 1;
      }
    });

    // Ordenar as datas para que o gráfico mostre uma linha contínua
    const dadosOrdenados = Object.keys(agrupado)
      .sort((a, b) => new Date(a) - new Date(b))
      .map(dataISO => ({ x: dataISO, y: agrupado[dataISO] }));

    console.log("📊 Dados formatados para gráfico:", dadosOrdenados);

    lineGraficSeries.value = [{ name: 'Pedidos', data: dadosOrdenados }];
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.area-graphics {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
