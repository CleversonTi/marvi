<template>
  <div class="account">
    <section class="primary_section">
      <h1 class="title-section">
        Pedidos
      </h1>
      <SearchBar @buscar="onBuscar" />
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
    <Tabela
      :termo-busca="termoBusca" 
      :start-date="startDate"
      :start-end="startEnd"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FilterPerido from '@/components/FilterDates/DatePicker.vue';
import { useDateFilter } from '@/composables/useDateFilter';
import { usePedidos } from '@/composables/usePedidos';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import ResumoCardsVue from '@/components/pedidos/ResumoCards.vue';
import Tabela from './Tabela.vue';
const { startDate, startEnd, onDateChange } = useDateFilter();
const { pedidos, pedidosBuscados, getPedidos, filtrarPedidos, aplicarBusca, termoBusca } = usePedidos();



const onBuscar = (termo) => {
  termoBusca.value = termo; // Atualiza o termo de busca no Composable
};


onMounted(() => {
  getPedidos();
});




onMounted(async () => {
  const response = await fetch('http://localhost:4000/pedidos');
  console.log()
  pedidos.value = await response.json();
});



const filtro = { title: 'Filtrar por Período' };


</script>


<style lang="scss" scoped>

</style>