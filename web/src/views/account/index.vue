<template>
    <div class="account">
        <section class="primary_section">
            <h1 class="title-section">Minha Conta</h1>
                <div class="filter_area">
                    <FilterPerido 
                        :title="filtro.title" 
                        v-on:selectedRange="deleteItem"
                    />
            </div>
        </section>
       
              
              <Resumo/> 
            
    </div>
</template>
<script setup>
  import { shallowRef } from 'vue'
  import { ref, onMounted } from "vue";

 const items = ref([])

    onMounted(async () => {
    const response = await fetch('http://localhost:4000/pedidos')
    console.log(response);
    items.value = await response.json();
    console.log( items.value );
    })

  const model = shallowRef(null)

  import FilterPerido from '@/components/FilterDates/DatePicker.vue';
  import Resumo from '@/layouts/pedidos/resumo/Main.vue';

  const filtro = {
    title: 'Filtrar por Período',
    };
    function selectedRange(item, item2) {
	    console.log(item, item2);
    }

</script>
