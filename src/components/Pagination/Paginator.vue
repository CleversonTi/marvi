<template>
  <div class="paginator">
    <div class="paginator-controls">
      <div class="paginator-info">
        Resultados por página: 
        <div class="result_paginator">
          <div class="select-wrapper">
            <select
              v-model="itensPorPagina"
              @change="selecionarItem"
              @focus="abrirSelect"
              @blur="fecharSelect"
            >
              <option
                v-for="opt in [10, 20, 50, 100]"
                :key="opt"
                :value="opt"
              >
                {{ opt }}
              </option>
            </select>
            <component
              :is="iconAtual"
              class="ml-2 transition-transform duration-300"
              size="20"
              stroke-width="2"
            />
          </div>
        </div>
      </div>
      <span>{{ inicioItem }} - {{ fimItem }} de {{ totalItens }}</span>
      <button
        :disabled="paginaAtual === 1"
        @click="irParaPagina(paginaAtual - 1)"
      >
        <span><ChevronLeft /></span>
      </button>
      <button
        :disabled="paginaAtual === totalPaginas"
        @click="irParaPagina(paginaAtual + 1)"
      >
        <span><ChevronRight /></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ChevronRight, ChevronLeft} from 'lucide-vue-next';
import  IconSelectUP  from '@/components/icons/Icon-selectUp.vue';
import  IconSelectDown  from '@/components/icons/Icon-select.vue';

import { ChevronDown, ChevronUp } from 'lucide-vue-next'; // Certifique-se que o import está correto

const props = defineProps({
  totalItens: Number,
  itensPorPagina: Number,
  paginaAtual: Number,
});
const iconAtual = ref(IconSelectDown); 


const emit = defineEmits(['mudanca-pagina']);

const itensPorPagina = ref(props.itensPorPagina || 10);
const paginaAtual = ref(props.paginaAtual || 1);

const totalPaginas = computed(() => Math.ceil(props.totalItens / itensPorPagina.value));

const inicioItem = computed(() => ((paginaAtual.value - 1) * itensPorPagina.value) + 1);
const fimItem = computed(() => Math.min(props.totalItens, paginaAtual.value * itensPorPagina.value));
const abrirSelect = () => {
  iconAtual.value = IconSelectUP; // Ícone vira para cima quando o select é aberto
};

const fecharSelect = () => {
  iconAtual.value = IconSelectDown; // Ícone volta para baixo quando o select é fechado
};

const selecionarItem = () => {
  fecharSelect(); // Força o ícone a mudar para baixo quando um item é selecionado
};
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

</style>
