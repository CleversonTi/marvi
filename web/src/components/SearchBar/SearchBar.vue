<template>
  <div class="search-bar">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Digite a sua busca"
      @input="onSearch"
    >
    <div class="icon-wrapper">
      <v-icon>mdi-magnify</v-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const onSearch = () => {
  // Aqui você pode emitir o evento de busca ou processar a pesquisa
  console.log('Buscando por:', searchQuery.value)
}
</script>

<style scoped lang="scss">



</style>
