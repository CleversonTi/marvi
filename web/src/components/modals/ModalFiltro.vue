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
      <div class="filtros-container">
        <div class="filtros-box">
          <h3>Situação</h3>
          
          <ul class="filtros-item">
            <li>
              <label>
                <input
                  v-model="situacaoSelecionada"
                  type="checkbox"
                  value="Atrasado"
                > 
                <span>Atrasado</span>
              </label>
            </li>
            <li>
              <label>
                <input
                  v-model="situacaoSelecionada"
                  type="checkbox"
                  value="Pendente"
                > 
                <span>
                  Pendente

                </span>
              </label>
            </li>
          </ul>
        </div>
        <div class="filtros-box">
          <h3>Status</h3>
         
          <ul class="filtros-item">
            <li>
              <label>
                <input
                  v-model="statusSelecionado"
                  type="checkbox"
                  value="Em aberto"
                > 
                <span>
                  Em aberto
                
                </span>
              </label>
            </li>
            <li>
              <label><input
                       v-model="statusSelecionado"
                       type="checkbox"
                       value="Enviado"
                     > 
                <span>
                  Enviado
                </span> 
            
              </label>
            </li>
            <li>
              <label>
                <input
                  v-model="statusSelecionado"
                  type="checkbox"
                  value="Entregue"
                > 
                <span>
                  Entregue
                </span>
              </label>
            </li>
            <li>
              <label><input
                v-model="statusSelecionado"
                type="checkbox"
                value="Faturado"
              > <span>Faturado</span></label>
            </li>
            <li>
              <label>
                <input
                  v-model="statusSelecionado"
                  type="checkbox"
                  value="Não Faturado"
                > 
                <span>Não Faturado</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="filtros-box">
          <button
            class="filtrar-button"
            @click="aplicarFiltros"
          >
            Filtrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({ isVisible: Boolean });
const emit = defineEmits(['close', 'filtrar']);
console.log(props.isVisible);
const situacaoSelecionada = ref([]);
const statusSelecionado = ref([]);

const aplicarFiltros = () => {
  const filtros = [...situacaoSelecionada.value, ...statusSelecionado.value];
  emit('filtrar', filtros);
  emit('close');
};
</script>
<style scoped lang="scss">

</style>
