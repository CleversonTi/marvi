<template>
  <div class="account">
    <section class="primary_section">
      <h1 class="title-section">
        Minha Conta
      </h1>
      <div class="filter_area">
        <FilterPerido 
          :title="filtro.title"
          :start-placeholder="'Data de início'"
          :end-placeholder="'Data de fim'"
          @selected-range="onDateChange"
        />
      </div>
    </section>
    <ResumoMagento 
      :start-date="startDate"
      :start-end="startEnd"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FilterPerido from '@/components/FilterDates/DatePicker.vue';
import ResumoMagento from '@/layouts/pedidos/dashboard/MainPadidos.vue';

const pedidos = ref([]);
const startDate = ref('');
const startEnd = ref('');

onMounted(async () => {
  const response = await fetch('http://localhost:4000/pedidos');
  pedidos.value = await response.json();
});

const onDateChange = (datasSelecionadas) => {
  if (datasSelecionadas.length === 2) {
    startDate.value = datasSelecionadas[0].toISOString(); // 🔥 Salvar como String ISO
    startEnd.value = datasSelecionadas[1].toISOString();   // 🔥 Salvar como String ISO
  }
};
  
const filtro = { title: 'Filtrar por Período' };
</script>