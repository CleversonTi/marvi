<template>
  <div class="paginator">
    <div class="paginator-info">
      Resultados por página: 
      <select
        v-model="itensPorPagina"
        @change="atualizarPagina"
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

    <div class="paginator-controls">
      <button
        :disabled="paginaAtual === 1"
        @click="irParaPagina(paginaAtual - 1)"
      >
        <span>◀</span>
      </button>
      <span>{{ inicioItem }} - {{ fimItem }} de {{ totalItens }}</span>
      <button
        :disabled="paginaAtual === totalPaginas"
        @click="irParaPagina(paginaAtual + 1)"
      >
        <span>▶</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  totalItens: Number,
  itensPorPagina: Number,
  paginaAtual: Number,
});

const emit = defineEmits(['mudanca-pagina']);

const itensPorPagina = ref(props.itensPorPagina || 10);
const paginaAtual = ref(props.paginaAtual || 1);

const totalPaginas = computed(() => Math.ceil(props.totalItens / itensPorPagina.value));

const inicioItem = computed(() => ((paginaAtual.value - 1) * itensPorPagina.value) + 1);
const fimItem = computed(() => Math.min(props.totalItens, paginaAtual.value * itensPorPagina.value));

const atualizarPagina = () => {
  emit('mudanca-pagina', { pagina: paginaAtual.value, itensPorPagina: itensPorPagina.value });
};

const irParaPagina = (pagina) => {
  if (pagina > 0 && pagina <= totalPaginas.value) {
    paginaAtual.value = pagina;
    atualizarPagina();
  }
};

watch(() => props.paginaAtual, (novaPagina) => {
  paginaAtual.value = novaPagina;
});
</script>

<style scoped lang="scss">
.paginator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
}

.paginator-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.paginator-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: #f0f0f0;
  }
}
</style>
