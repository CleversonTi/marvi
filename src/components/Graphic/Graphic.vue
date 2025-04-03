<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  pedidos: {
    type: Array,
    required: true
  }
})

const lineGraficSeries = ref([{ name: 'Pedidos', data: [] }])
const lineGraficOptions = ref({
  chart: {
    id: 'basic-line-chart',
    toolbar: { show: false },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'MMM yyyy', // Mostra mês e ano
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
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
});

const processarPedidos = (novosPedidos) => {
  if (!novosPedidos || !novosPedidos.length) return;

  console.log("📥 Recebendo pedidos para gráfico:", novosPedidos);

  const agrupado = {};
  const mesesCompletos = gerarMesesNoPeriodo(new Date("2024-12-01"), new Date("2025-03-31")); // Ajuste o período como necessário

  // Inicializa o objeto `agrupado` com todos os meses do período
  mesesCompletos.forEach(mes => agrupado[mes] = 0);

  novosPedidos.forEach(pedido => {
    const data = pedido.DataEntrada; // formato dd/mm/yyyy
    if (!data) return;

    const [dia, mes, ano] = data.split('/').map(Number);
    const dataObj = new Date(ano, mes - 1, dia);
    dataObj.setDate(1); // Normaliza para o primeiro dia do mês

    const mesAno = dataObj.toISOString().slice(0, 7); // Formato `YYYY-MM`

    if (agrupado[mesAno] !== undefined) {
      agrupado[mesAno]++;
    } else {
      agrupado[mesAno] = 1;
    }
  });

  const categorias = Object.keys(agrupado);
  const dados = Object.values(agrupado);

  console.log("📊 Categorias do Gráfico:", categorias);
  console.log("📊 Dados do Gráfico:", dados);

  lineGraficSeries.value = [{ name: 'Pedidos', data: dados }];
  lineGraficOptions.value = { 
    ...lineGraficOptions.value,
    xaxis: { 
      ...lineGraficOptions.value.xaxis,
      categories: categorias 
    }
  };
}

// Função para gerar todos os meses entre duas datas
const gerarMesesNoPeriodo = (startDate, endDate) => {
  const months = [];
  const currentDate = new Date(startDate);

  currentDate.setDate(1);

  while (currentDate <= endDate) {
    const mesAno = currentDate.toISOString().slice(0, 7); // Formato YYYY-MM
    months.push(mesAno);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
}

watch(
  () => props.pedidos,
  (novosPedidos) => processarPedidos(novosPedidos),
  { immediate: true, deep: true }
)
</script>

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

<style scoped>
.area-graphics {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
