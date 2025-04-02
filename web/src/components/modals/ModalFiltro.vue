<template>
  <div
    v-if="isVisible"
    class="modal-overlay"
    @click.self="fecharModal"
  >
    <div class="modal-content">
      <h3>Filtrar Pedidos</h3>
      <button
        class="close-button"
        @click="fecharModal"
      >
        X
      </button>
      <div class="filtros-container">
        <div>
          <h3>Situação</h3>
          <div>
            <label>
              <input
                v-model="situacaoSelecionada"
                type="checkbox"
                value="Atrasado"
              > Atrasado
            </label>
            <label>
              <input
                v-model="situacaoSelecionada"
                type="checkbox"
                value="Pendente"
              > Pendente</label>
          </div>
        </div>
        <div>
          <h3>Status</h3>
          <div>
            <label>
              <input
                v-model="statusSelecionado"
                type="checkbox"
                value="Em aberto"
              > Em aberto
            </label>
            <label><input
              v-model="statusSelecionado"
              type="checkbox"
              value="Enviado"
            > Enviado </label>
            <label><input
              v-model="statusSelecionado"
              type="checkbox"
              value="Entregue"
            > Entregue</label>
            <label><input
              v-model="statusSelecionado"
              type="checkbox"
              value="Faturado"
            > Faturado</label>
            <label><input
              v-model="statusSelecionado"
              type="checkbox"
              value="Não Faturado"
            > Não Faturado</label>
          </div>
        </div>
        
        <button
          class="filtrar-button"
          @click="aplicarFiltros"
        >
          Filtrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({ isVisible: Boolean });
const emit = defineEmits(['close', 'filtrar']);

const situacaoSelecionada = ref([]);
const statusSelecionado = ref([]);

const aplicarFiltros = () => {
  const filtros = [...situacaoSelecionada.value, ...statusSelecionado.value];
  emit('filtrar', filtros);
  emit('close');
};
</script>
<style scoped lang="scss">
button{
  &.filtrar-button{
    font-size: 14px;
    &:hover{
      background: darken( #1A9701, 5%);
    }
  }
}
</style>
