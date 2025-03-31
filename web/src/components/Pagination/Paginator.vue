<template>
  <div class="paginator">
    <div class="results-info">
      Resultados por página:
      <select
        v-model="itensPorPagina"
        @change="atualizarPagina"
      >
        <option
          v-for="option in [10, 20, 50]"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div class="navigation">
      <button
        :disabled="paginaAtual === 1"
        @click="paginaAnterior"
      >
        &lt;
      </button>
      <span>{{ paginaAtual }} de {{ totalPaginas }}</span>
      <button
        :disabled="paginaAtual === totalPaginas"
        @click="proximaPagina"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  totalItens: { type: Number, required: true },
  itensPorPaginaPadrao: { type: Number, default: 10 }
});

const emit = defineEmits(['mudanca-pagina']);

const itensPorPagina = ref(props.itensPorPaginaPadrao);
const paginaAtual = ref(1);

const totalPaginas = computed(() => Math.ceil(props.totalItens / itensPorPagina.value));

const atualizarPagina = () => {
  emit('mudanca-pagina', { pagina: paginaAtual.value, itensPorPagina: itensPorPagina.value });
};

watch([itensPorPagina, paginaAtual], atualizarPagina, { immediate: true });

const proximaPagina = () => {
  if (paginaAtual.value < totalPaginas.value) {
    paginaAtual.value++;
  }
};

const paginaAnterior = () => {
  if (paginaAtual.value > 1) {
    paginaAtual.value--;
  }
};
</script>

<style scoped>
.paginator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  border-top: 1px solid #ddd;
  margin-top: 10px;
}

.results-info select {
  padding: 4px;
  border-radius: 4px;
}

.navigation button {
  padding: 4px 8px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.navigation button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
