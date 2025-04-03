<!-- web/src/components/pedidos/PaginationControls.vue -->
<template>
  <div class="pagination-controls">
    <div>
      Resultados por página:
      <select
        v-model="itemsPerPage"
        @change="updatePagination"
      >
        <option
          v-for="opt in [10, 20, 50, 100]"
          :key="opt"
          :value="opt"
        >
          {{ opt }}
        </option>
      </select>
    </div>
    <div>
      <button
        :disabled="currentPage <= 1"
        @click="previousPage"
      >
        Anterior
      </button>
      <button
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  currentPage: Number,
  itemsPerPage: Number,
  totalItems: Number
});

const emit = defineEmits(['updatePagination']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const previousPage = () => emit('updatePagination', { page: props.currentPage - 1 });
const nextPage = () => emit('updatePagination', { page: props.currentPage + 1 });
const updatePagination = () => emit('updatePagination', { itemsPerPage: parseInt(itemsPerPage.value) });
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

select {
  margin-left: 8px;
}
</style>
