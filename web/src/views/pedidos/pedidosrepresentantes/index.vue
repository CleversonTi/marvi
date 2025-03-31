<template>
  <div class="account">
    <section class="primary_section">
      <h1 class="title-section">
        Pedidos Representantes
      </h1>
      <div class="filter_area">
        <SearchBar 
          :title="filtro.title"
          :placeholder="'Digite a sua busca'"
         
          @filter="onDateChange"
        />
      </div>
    </section>
    <section class="primary_section">
      <div class="filter_area">
        ResumoAW
        <ResumoCardsVue />
        <FilterPerido 
          :title="filtro.title"
          :start-placeholder="'Data de início'"
          :end-placeholder="'Data de fim'"
          @selected-range="onDateChange"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FilterPerido from '@/components/FilterDates/DatePicker.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import ResumoCardsVue from '../ResumoCards.vue';


const pedidos = ref([]);
const selectedRange = ref([]);
const startDate = ref('');
const startEnd = ref('');

onMounted(async () => {
  const response = await fetch('http://localhost:4000/pedidos');
  pedidos.value = await response.json();
  
});

const onDateChange = (datasSelecionadas) => {
  // Verifica se o array de datas selecionadas possui exatamente 2 elementos
  if (datasSelecionadas.length === 2) {
    // Atualiza o array `selectedRange` com os valores de `datasSelecionadas`
    selectedRange.value = [...datasSelecionadas]; // ou datasSelecionadas.slice()
    console.log(typeof startDate.value);
    startDate.value = selectedRange.value[0];
    console.log(startDate.value);
    startEnd.value = selectedRange.value[1];
   
  } else {
    console.warn('O array datasSelecionadas deve conter exatamente duas datas.');
  }
};
  
const filtro = {
  title: 'Filtrar por Período',
};
</script>
