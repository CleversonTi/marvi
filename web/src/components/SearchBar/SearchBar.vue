<template>
  <div class="search-bar">
    <input 
      v-model="termoBusca" 
      type="text"
      placeholder="Buscar pedidos..."
      @input="emitirBusca"
    >
    <div class="icon-wrapper">
      <v-icon>mdi-magnify</v-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({});
const emit = defineEmits(['buscar']);

const termoBusca = ref('');

const emitirBusca = () => {
  emit('buscar', termoBusca.value);
}
</script>

<style scoped lang="scss">

</style>
