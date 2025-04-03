<template>
  <div class="search-bar">
    <input 
      v-model="termoBusca" 
      type="text"
      placeholder="Buscar pedidos..."
      @input="emitirBusca"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['buscar']);
const termoBusca = ref('');

const emitirBusca = () => {
  emit('buscar', termoBusca.value); // Emite o evento de busca com o termo atual
};
</script>
