<template>
  <section class="tabela-pedidos list">
    <!-- HTML -->
    <div class="cards-container">
      <div v-if="paginated.length === 0">
        <td
          colspan="9"
          class="no-results"
        >
          Sem resultados
        </td>
      </div>
      <div
        v-for="(pedido, i) in pagedData"
        :key="i"
        class="order-card"
      >
        <h3 class="card-title">
          Nº do Pedido
        </h3>
        <p class="order-number">
          <span class="element-item">{{ pedido.increment_id }}</span>
        </p>

        <div class="field-group">
          <div class="field">
            <span class="field-label">Cliente</span>
            
            <span class="element-item">{{ pedido.customer_firstname }}</span>
          </div>
          <div class="field">
            <span class="field-label">Representante</span>
            <span class="field-value">{{ pedido.customer_group_id }}</span>
          </div>
        </div>

        <div class="field-group date-group">
          <div class="field">
            <span class="field-label">Entrada</span>
            <span class="field-value">{{ formatarDataHora(pedido.created_at) }}</span>
          </div>
          <div class="field">
            <span class="field-label">Vencimento</span>
            <span class="field-value">{{ formatarDataHora(pedido.updated_at) }}</span>
          </div>
        </div>

        <div class="field-group bottom-group">
          <div class="field">
            <span class="field-label">Situação</span>
            <span class="field-value">{{ pedido.hold_before_status }}</span>
          </div>
          <div class="field">
            <span class="field-label">Total</span>
            <span class="field-value">{{ formatarMoeda(pedido.base_grand_total) }}</span>
          </div>
          <div class="field">
            <span class="field-label">Status</span>
            <span
              class="status-badge"
              :class="pedido.status.toLowerCase().replace(/\s+/g,'-')"
            >
              {{ pedido.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- repita .order-card quantas vezes for necessário -->
    </div>


    <footer>
      <div class="pagination">
        <div class="result_itens">
          <span>Resultados por página:</span>
          <div class="limiter">
            <select 
              v-model.number="itensPorPagina"
              @focus="isOpen = true"
              @blur="isOpen = false"
              @change="isOpen = false" 
            >
              <optgroup label="Padrão">
                <option :value="10">
                  10
                </option>
                <option :value="20">
                  20
                </option>
              </optgroup>
              <optgroup label="Mais opções">
                <option :value="50">
                  50
                </option>
              </optgroup>
            </select>
            <!-- mostra um ou outro ícone conforme isOpen -->
            <IconArrowDropDown 
              class="select-icon" 
              :class="{ open: isOpen }" 
            />
          </div>
        </div>
        
        <div class="pager">
          <span class="range">
            {{ displayRange }} of {{ totalItems }}
          </span>
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            aria-label="Página anterior"
            @click="prevPage"
          >
            <IconNavigatePrev />
          </button>
          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            aria-label="Próxima página"
            @click="nextPage"
          >
            <IconNavigateNext />
          </button>
        </div>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { ref, computed,watch } from 'vue'

import IconGrid   from '@/components/icons/IconGrid.vue'
import IconMore   from '@/components/icons/IconDownload.vue'
import IconNavigateNext   from '@/components/icons/IconNavigate_next.vue';
import IconNavigatePrev   from '@/components/icons/IconNavigate_prev';
import IconArrowDropDown  from '@/components/icons/Icon_arrow_drop_down.vue'
import { ChevronUp } from 'lucide-vue-next'
import { formatarMoeda, formatarData, formatarDataHora } from '@/utils/helpers.js'

import ModalFiltro from '@/components/modals/ModalFiltro.vue';
const props = defineProps({
  dados:      { type: Array,  default: () => [] },
  termoBusca: { type: String, default: '' },
   pedidosPaginados:  { type: Array,   default: () => [] },
})

// UI callbacks
const abrirFiltro = () => {}
const novoPedido  = () => {}
const toggleView  = () => {}
const abrirPopup  = () => {}

// paginação
const itensPorPagina = ref(10)
const currentPage    = ref(1);
const isOpen = ref(false)

// 5️⃣ contadores para o Toolbar
const pedidosPaginadosCount = computed(() => paginated.value.length)
const totalPedidosCount     = computed(() => totalItems.value)

// filtro textual
const filtered = computed(() => {
  if (!props.termoBusca) return props.dados
  const term = props.termoBusca.toLowerCase()
  return props.dados.filter(p =>
    String(p.increment_id).toLowerCase().includes(term) ||
    String(p.customer_firstname).toLowerCase().includes(term) ||
    String(p.status).toLowerCase().includes(term)
  )
})

// totais para paginação
// 2️⃣ totais e ranges
const totalItems = computed(() => filtered.value.length)
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itensPorPagina.value) || 1
)

// fatia atual
const paginated = computed(() => {
  const start = (currentPage.value - 1) * itensPorPagina.value
  return filtered.value.slice(start, start + itensPorPagina.value)
})

// mostra 1–10 of 42
const displayRange = computed(() => {
  if (!totalItems.value) return '0 – 0'
  const start = (currentPage.value - 1) * itensPorPagina.value + 1
  let end = currentPage.value * itensPorPagina.value
  if (end > totalItems.value) end = totalItems.value
  return `${start} – ${end}`
})
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * itensPorPagina.value
  return filtered.value.slice(start, start + itensPorPagina.value)
})
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
// 8️⃣ Se trocar itensPorPagina, volta à página 1
watch(itensPorPagina, () => currentPage.value = 1)
</script>
