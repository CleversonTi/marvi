<template>
  <div class="search-bar">
    <input 
      v-model="termoBusca" 
      type="text"
      placeholder="Digite a sua busca"
      @input="emitirBusca"
    >
    <IconSearch class="search-icon" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import IconSearch from '@/components/icons/IconSearch.vue'
  const emit = defineEmits(['buscar']);
  const termoBusca = ref('');

  const emitirBusca = () => {
    emit('buscar', termoBusca.value); // Emite o evento de busca com o termo atual
  };
</script>
