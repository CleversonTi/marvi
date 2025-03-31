<template>
  <div class="account">
    <section class="primary_section">
      <h1 class="title-section">
        Pedidos
      </h1>
      <SearchBar />
    </section>
    <section class="primary_section pedidos">
      <ResumoCardsVue />
      <div class="filter_area">
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
import ResumoCardsVue from '@/components/pedidos/ResumoCards.vue';


const pedidos = ref([]);
const selectedRange = ref([]);
const startDate = ref('');
const startEnd = ref('');

onMounted(async () => {
  const response = await fetch('http://localhost:4000/pedidos');
  console.log()
  pedidos.value = await response.json();
});

const onDateChange = (datasSelecionadas) => {
  if (datasSelecionadas.length === 2) {
    selectedRange.value = [...datasSelecionadas];
    startDate.value = selectedRange.value[0];
    startEnd.value = selectedRange.value[1];
  } else {
    console.warn('O array datasSelecionadas deve conter exatamente duas datas.');
  }
};

const filtro = {
  title: 'Escolha um período:',
};


</script>


<style lang="scss" scoped>

</style>