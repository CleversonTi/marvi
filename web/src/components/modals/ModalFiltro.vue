<template>
  <div
    v-if="isVisible"
    class="modal-overlay"
    @click.self="fecharModal"
  >
    <div class="modal-content">
      <button
        class="close-button"
        @click="fecharModal"
      >
        X
      </button>
      <div class="modal-body">
        <div class="filtros-container">
          <div>
            <h3>Situação</h3>
            <div>
              <label><input
                v-model="situacao.Atrasado"
                type="checkbox"
              > Atrasado</label>
              <label><input
                v-model="situacao.Pendente"
                type="checkbox"
              > Pendente</label>
            </div>
          </div>

          <div>
            <h3>Status</h3>
            <div>
              <label><input
                v-model="status.EmAberto"
                type="checkbox"
              > Em aberto</label>
              <label><input
                v-model="status.Enviado"
                type="checkbox"
              > Enviado</label>
              <label><input
                v-model="status.Entregue"
                type="checkbox"
              > Entregue</label>
              <label><input
                v-model="status.Faturado"
                type="checkbox"
              > Faturado</label>
              <label><input
                v-model="status.NaoFaturado"
                type="checkbox"
              > Não Faturado</label>
            </div>
          </div>
        </div>

        <button
          class="filtrar-button"
          @click="aplicarFiltro"
        >
          Filtrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(['close', 'filtrar']);

const situacao = ref({
  Atrasado: false,
  Pendente: false,
});

const status = ref({
  EmAberto: false,
  Enviado: false,
  Entregue: false,
  Faturado: false,
  NaoFaturado: false,
});

const fecharModal = () => emit('close');

const aplicarFiltro = () => {
  const filtrosSelecionados = {
    situacao: situacao.value,
    status: status.value,
  };
  emit('filtrar', filtrosSelecionados);
  fecharModal();
};
</script>
