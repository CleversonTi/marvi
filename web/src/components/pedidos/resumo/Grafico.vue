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
import { ref } from 'vue';

const lineGraficSeries = ref([
  {
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70],
  },
]);

const lineGraficOptions = ref({
  chart: {
    id: 'basic-line-chart',
    toolbar: {
      show: false,  // 🔥 Remove a toolbar
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  stroke: {
    curve: 'smooth',
    width: 3,
    colors: ['#1A9701'],
  },
  grid: {
    show: true,
    borderColor: '#ccc',
    strokeDashArray: 5,  // 🔥 Linhas horizontais tracejadas
    xaxis: {
      lines: {
        show: false,  // Desativa linhas verticais
      },
    },
    yaxis: {
      lines: {
        show: true,  // Mostra linhas horizontais tracejadas
      },
    },
  },
});
</script>


