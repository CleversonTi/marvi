<template>
  <section class="tabela-pedidos">
    <div class="header">
      <div class="titulo-status">
        <span>Mostrando <strong>{{ pedidosPaginados.length }}</strong> pedidos de <strong>{{ pedidosFiltrados.length }}</strong></span>
        <button
          class="filter-button"
          @click="abrirFiltro"
        >
          <Filter
            size="20"
            stroke-width="2.5"
            color="#fff"
          />
        </button>
      </div>
      <div class="action-buttons">
        <button
          class="new-order-button"
          @click="novoPedido"
        >
          <span>
            Novo Pedido +
          </span>
        </button>
        <div class="actions-list-or-grid">
          <button
            class="view-button"
            @click="toggleView"
          >
            <IconList
              size="30"
              stroke-width="2.5"
              class="text-pink-500 hover:text-red-500 transition-colors duration-300"
              color="#8B8B8B"
            />
          </button>
          <button
            class="view-button"
            @click="toggleView"
          >
            <Grid2x2
              size="30"
              stroke-width="2.5"
              color="#8B8B8B"
            />
          </button>
        </div>
        <div class="modal-downloadPopup">
          <button
            class="popup-button"
            @click="togglePopup"
          >
            <IconMoreVertical
              size="40"
              stroke-width="1.5"
            /> 
          </button>
          <DownloadPopup 
            :is-visible="popupVisivel" 
            @close="togglePopup" 
            @download="baixarArquivo" 
          />
        </div>
      </div>
    </div>
    <!-- 🔥 Aqui você adiciona o ModalFiltro -->
    <ModalFiltro 
      :is-visible="filtroVisivel" 
      @close="fecharFiltro" 
      @filtrar="aplicarFiltro"
    />
    

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Número do Pedido</th>
            <th>Data Entrada</th>
            <th>Cliente</th>
            <th>Perfil</th>
            <th>Vencimento</th>
            <th>Situação</th>
            <th>Peso (kg)</th>
            <th>Valor Total (R$)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(pedido, index) in pedidosPaginados"
            :key="index"
          >
            <td>{{ pedido.NumeroPedido }}</td>
            <td>{{ pedido.DataEntrada }}</td>
            <td>{{ pedido.Cliente }}</td>
            <td>{{ pedido.Perfil || 'Padrão' }}</td>
            <td>{{ pedido.Vencimento }}</td>
            <td>{{ pedido.Situacao }}</td>
            <td>{{ pedido.PesoFaturado || '0.0000' }}</td>
            <td>{{ formatarMoeda(pedido.ValorTotal) }}</td>
            <td><span :class="['status-badge', formatarStatus(pedido.Status)]">{{ pedido.Status }}</span></td>
          </tr>
        </tbody>
      </table>
      <Paginator 
        :total-itens="pedidosFiltrados.length" 
        @mudanca-pagina="atualizarPagina" 
      />
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, toRefs, computed } from 'vue';
import { usePedidos } from '@/composables/usePedidos';
import { Filter, Grid2x2, MoreHorizontal } from 'lucide-vue-next';
import  IconList  from '@/components/icons/IconListMarvi.vue';
import  IconMoreVertical  from '@/components/icons/IconMoreVertical.vue';
import Paginator from '@/components/Pagination/Paginator.vue';
import ModalFiltro from '@/components/modals/ModalFiltro.vue';
import DownloadPopup from '@/components/modals/DownloadPopup.vue';

const props = defineProps({
  startDate: { type: String, required: true },
  startEnd: { type: String, required: true },
  searchQuery: { type: String, default: '' }
});

const { pedidos, pedidosFiltrados, pedidosCarregados, getPedidos, filtrarPedidos } = usePedidos();
const paginaAtual = ref(1);
const itensPorPagina = ref(10);
const abrirFiltro = () => {
  filtroVisivel.value = true;
};

const fecharFiltro = () => {
  filtroVisivel.value = false;
};

const aplicarFiltro = (filtrosSelecionados) => {
  console.log('Filtros Aplicados:', filtrosSelecionados);
  fecharFiltro();
};

const popupVisivel = ref(false);

const togglePopup = () => {
  popupVisivel.value = !popupVisivel.value;
};

const baixarArquivo = (formato) => {
  console.log(`Baixando arquivo em formato: ${formato}`);
};
const pedidosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina.value;
  const fim = inicio + itensPorPagina.value;
  
  if (props.searchQuery) {
    const termosBusca = props.searchQuery.toLowerCase();
    const resultadosFiltrados = pedidosFiltrados.value.filter(pedido =>
      pedido.Cliente.toLowerCase().includes(termosBusca) ||
      pedido.NumeroPedido.toString().includes(termosBusca)
    );
    return resultadosFiltrados.slice(inicio, fim);
  }
  
  return pedidosFiltrados.value.slice(inicio, fim);
});

onMounted(() => {
  getPedidos().then(() => {
    if (pedidosCarregados.value) {
      filtrarPedidos(props.startDate, props.startEnd);
    }
  });
});

const atualizarPagina = ({ pagina, itensPorPagina: itens }) => {
  paginaAtual.value = pagina;
  itensPorPagina.value = itens;
};

watch(
  () => props.searchQuery,
  () => {
    paginaAtual.value = 1; // Reseta a paginação ao fazer uma busca
  }
);


// 🔥 Função para formatar moeda
const formatarMoeda = (valor) => {
  if (typeof valor !== 'number') valor = parseFloat(valor) || 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

// 🔥 Função para formatar o status para classe CSS
const formatarStatus = (status) => {
  if (!status) return 'status-default';
  
  // Remove caracteres especiais, mantendo apenas letras, números e espaços
  const sanitizedStatus = status
    .toLowerCase()
    .normalize('NFD') // Remove acentuação (ex: "á" -> "a")
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas diacríticas geradas pelo normalize
    .replace(/[^a-z0-9\s]/g, '') // Remove todos os caracteres especiais
    .replace(/\s+/g, '-'); // Substitui espaços por hífen

  return sanitizedStatus;
};
</script>

<style scoped>
.tabela-pedidos {
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.filtros {
  display: flex;
  gap: 10px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}


</style>
