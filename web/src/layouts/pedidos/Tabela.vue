<template>
  <section class="tabela-pedidos">
    <div class="header">
      <!--<header><span>Todos os Pedidos</span></header>-->
      <div class="titulo-status">
        <span>Mostrando <strong>{{ pedidosFiltrados.length }}</strong> pedidos de <strong>{{ pedidos.length }}</strong></span>
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
});

console.log("📅 Props recebidas - startDate:", props.startDate, "startEnd:", props.startEnd);

const thisStartDate = ref(new Date(props.startDate));
const thisStartEnd = ref(new Date(props.startEnd));

const { pedidos, pedidosFiltrados, pedidosCarregados, getPedidos, filtrarPedidos } = usePedidos();
const filtroVisivel = ref(false);

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

onMounted(() => {
  console.log("📥 onMounted executado.");
  
  // 🔥 Aguarda a conclusão da requisição antes de configurar o watch
  getPedidos().then(() => {
    console.log("📦 Pedidos carregados com sucesso.");
    
    // Apenas configura o watch se os pedidos estiverem carregados
    if (pedidosCarregados.value) {
      console.log("🔄 Configurando o watch após carregamento dos pedidos.");
      configurarWatch();
    }
  }).catch((error) => {
    console.error("❌ Erro ao carregar os pedidos:", error);
  });
});

const configurarWatch = () => {
  watch(
    () => [props.startDate, props.startEnd],
    ([newStartDate, newEndDate]) => {
      console.log("🎯 Mudou a data ", newStartDate, newEndDate);
      
      if (newStartDate && newEndDate && pedidosCarregados.value) {
        console.log("⏳ Aplicando filtro com novas datas:", newStartDate, newEndDate);

        if (pedidos.value.length > 0) { 
          filtrarPedidos(newStartDate, newEndDate);
          console.log('📊 Pedidos Filtrados após filtro:', pedidosFiltrados.value);
        }
      } else {
        console.warn("⚠️ Dados incompletos ou pedidos ainda não carregados.");
      }
    },
    { immediate: true }
  );
};
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
const paginaAtual = ref(1);
const itensPorPagina = ref(10);


const pedidosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina.value;
  const fim = inicio + itensPorPagina.value;
  return pedidosFiltrados.value.slice(inicio, fim);
});

const atualizarPagina = ({ pagina, itensPorPagina: itens }) => {
  paginaAtual.value = pagina;
  itensPorPagina.value = itens;
  console.log( paginaAtual);
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
