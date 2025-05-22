<template>
  <section class="tabela-pedidos">
    <div class="header">
      <div class="titulo">
        Todos os Pedidos
      </div>
      <div class="filtros">
        <span>Mostrando {{ filtered.length }} de {{ dados.length }}</span>
        <button
          class="filter-button"
          @click="abrirFiltro"
        >
          <IconFilter
            size="20"
            stroke-width="1.5"
          />
        </button>
        <button
          class="new-order-button"
          @click="novoPedido"
        >
          Novo Pedido +
        </button>
        <button
          class="view-button"
          @click="toggleView"
        >
          <IconGrid
            size="20"
            stroke-width="1.5"
          />
        </button>
        <button
          class="popup-button"
          @click="abrirPopup"
        >
          <IconMore
            size="20"
            stroke-width="1.5"
          />
        </button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Número do Pedido</th>
          <th>Cliente</th>
          <th>Representante</th>
          <th>Data Entrada</th>
          <th>Vencimento</th>
          <th>Situação</th>
          <th>Valor Total (R$)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <!-- Se não houver nenhum pedido, mostra uma linha única -->
        <tr v-if="filtered.length === 0">
          <td
            colspan="9"
            class="no-results"
          >
            Sem resultados
          </td>
        </tr>
        <!-- Caso contrário, lista normalmente -->
        <tr
          v-for="(pedido, i) in filtered"
          v-else
          :key="i"
        >
          <td>{{ pedido.increment_id }}</td>
          <td>{{ pedido.customer_firstname }}</td>
          <td>{{ pedido.customer_group_id }}</td>
          
          <td>{{ pedido.created_at }}</td>
          <td>{{ pedido.updated_at }}</td>
          <td>{{ pedido.hold_before_status }}</td>
          <td>{{ formatarMoeda(pedido.base_grand_total ) }}</td>
          <td>
            <span
              :class="['status-badge', pedido.status.toLowerCase().replace(/\s+/g,'-')]"
            >
              {{ pedido.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginação (opcional) -->
    <div class="pagination">
      Resultados por página:
      <select v-model="itensPorPagina">
        <option value="10">
          10
        </option>
        <option value="20">
          20
        </option>
        <option value="50">
          50
        </option>
      </select>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import IconGrid   from '@/components/icons/IconGrid.vue'
import IconMore   from '@/components/icons/IconDownload.vue'

import {
  formatarMoeda,
  formatWeight
} from '@/utils/helpers.js';
// 1️⃣ Recebe via props a lista completa e o termo de busca (se houver)
const props = defineProps({
  dados:      { type: Array,   default: () => [] },
  termoBusca: { type: String,  default: '' }
})

// 2️⃣ Ref para paginação local (se você ainda quiser)
const itensPorPagina = ref(10)
const currentPage   = ref(1)

// 3️⃣ Funções de UI
const abrirFiltro = () => console.log('Abrir filtro')
const novoPedido  = () => console.log('Novo pedido')
const toggleView  = () => console.log('Toggle view')
const abrirPopup  = () => console.log('Abrir popup')

// 4️⃣ Computed que aplica o filtro textual (se houver termo) e depois retorna o array final
const filtered = computed(() => {
  // Se não houver busca textual, retorna tudo
  if (!props.termoBusca) return props.dados

  const term = props.termoBusca.toLowerCase()
  return props.dados.filter(p => {
    return (
      String(p.NumeroPedido).toLowerCase().includes(term) ||
      String(p.Cliente).toLowerCase().includes(term) ||
      String(p.Status).toLowerCase().includes(term)
    )
  })
})
</script>

<style  lang="scss" scoped>
.tabela-pedidos {
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.filtros button {
  background: none;
  border: none;
  margin-left: 8px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.no-results {
  text-align: center;
  color: #999;
  padding: 16px 0;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.status-badge{
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
   &.faturado {
    background-color: #007bff; /* azul */
  }

  &.em-aberto,&.closed {
    background-color: #fd7e14; /* laranja */
  }

  &.enviado,&.sucessointegracao,&.aprovacao_clearsale {
    background-color: #28a745; /* verde */
  }

  &.não-faturado,
  &.nao-faturado,&.canceled {
    background-color: #dc3545; /* vermelho */
  }

  &.entregue {
    background-color: #6c757d; /* cinza-escuro */
  }

  &.aguardando,&.pending {
    background-color: #ffc107; /* amarelo */
    color: #212529;            /* texto escuro para contraste */
  }
}
.status-badge.faturado       { background-color: blue; }
.status-badge.faturado       { background-color: blue; }
.status-badge.pendente       { background-color: orange; }
.status-badge.enviado        { background-color: green; }
.status-badge.nao-faturado   { background-color: red; }
.status-badge.aguardando     { background-color: yellow; }
</style>
