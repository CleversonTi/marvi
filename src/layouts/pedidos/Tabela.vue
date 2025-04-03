<template>
  <section class="tabela-pedidos">
    <Toolbar
      :pedidos-paginados="pedidosPaginados.length"
      :total-pedidos="pedidosFiltrados.length"
      :filtros-ativos="[]"
      @abrir-filtro="abrirFiltro"
      @trocar-visualizacao="trocarVisualizacao"
      @remover-filtro="removerFiltro" 
    />
   
    <!-- 🔥 Aqui você adiciona o ModalFiltro -->
    <ModalFiltro 
      :is-visible="filtroVisivel" 
      @close="fecharFiltro" 
      @filtrar="aplicarFiltro"
    />
    <!-- Exibição da Tabela ou Grid -->
    <transition
      :name="transitionName"
      mode="out-in"
    >
      <div
        v-if="viewMode === 'list'"
        :key="viewMode"
      >
        <TableList
          :pedidos="pedidosPaginados"
          :total-pedidos="pedidosFiltrados.length"
          style="cursor: pointer;"
          @mudanca-pagina="atualizarPagina"
          @click="abrirDetalhes(pedido)"
        />
      </div>
      <div
        v-else
        :key="viewMode"
      >
        <GridList
          :pedidos="pedidosPaginados"
          :total-pedidos="pedidosFiltrados.length"
          style="cursor: pointer;"
          @mudanca-pagina="atualizarPagina"
          @click="abrirDetalhes(pedido)"
        />
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, watch, onMounted,  computed } from 'vue';
import { usePedidos } from '@/composables/usePedidos';

import Paginator from '@/components/Pagination/Paginator.vue';
import ModalFiltro from '@/components/modals/ModalFiltro.vue';
import DownloadPopup from '@/components/modals/DownloadPopup.vue';
import Toolbar from '@/components/Toolbar/Toolbar.vue';
import TableList from '@/components/Tabelas/TableList.vue';
import GridList from '@/components/GridList/GridList.vue';

// 🔥 Controle da visualização atual ('list' ou 'grid')
const viewMode = ref('list');

const props = defineProps({
  startDate: { type: String, required: true },
  startEnd: { type: String, required: true },
  termoBusca: { type: String, default: '' }
});

const paginaAtual = ref(1);
const itensPorPagina = ref(10);
const thisStartDate = ref(new Date(props.startDate));
const thisStartEnd = ref(new Date(props.startEnd));


const { pedidos, pedidosFiltrados, pedidosCarregados, getPedidos, filtrarPedidos, aplicarBusca, termoBusca } = usePedidos();


const filtroVisivel = ref(false);
const filtrosAtivos = ref([]);


const transitionName = ref('fade'); 
const abrirFiltro = () => {
  filtroVisivel.value = true;
};

const fecharFiltro = () => {
  filtroVisivel.value = false;
};


const aplicarFiltro = (filtrosSelecionados) => {
  filtrosAtivos.value = filtrosSelecionados;
  fecharFiltro();
};
// Função para remover um filtro específico
const removerFiltro = (index) => {
  filtrosAtivos.value.splice(index, 1);
  aplicarFiltro(filtrosAtivos.value);
};
// Função para limpar todos os filtros
const limparFiltros = () => {
  filtrosAtivos.value = [];
  aplicarFiltro([]);
};
watch(filtrosAtivos, () => {
  filtrarPedidos(); // Refiltra a lista ao atualizar os filtros
});

const trocarVisualizacao = (mode) => {
  viewMode.value = mode;
  transitionName.value = mode === 'list' ? 'smooth-fade' : 'smooth-slide';
};

watch(() => viewMode.value, () => {
  pedidosPaginados.value = pedidosFiltrados.value.slice(0, 10);
});
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
const atualizarPagina = ({ pagina, itensPorPagina: itens }) => {
  paginaAtual.value = pagina;
  itensPorPagina.value = itens;
};

// 🔥 Computed para aplicar busca e filtro
const pedidosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina.value;
  const fim = inicio + itensPorPagina.value;
  return pedidosFiltrados.value.slice(inicio, fim);
});
// 🔥 Aplica busca sempre que o termo de busca mudar
watch(() => props.termoBusca, (novoTermo) => {
  termoBusca.value = novoTermo; // Atualiza o termo no Composable
  aplicarBusca(); // Chama o método aplicarBusca do Composable
  console.log("Aplicando busca para:", novoTermo);
});
</script>

<style scoped lang="scss">
.tabela-pedidos {

}

.table-container {
  overflow-x: auto;
}

/* Transições rápidas aprimoradas */
.smooth-fade-enter-active, .smooth-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.smooth-fade-enter-from, .smooth-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.smooth-slide-enter-active, .smooth-slide-leave-active {
  transition: all 0.3s ease;
}
.smooth-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.smooth-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.listas-container {
  
  opacity: 1;
  transition: opacity 0.3s;
}

.lista-item {
 
  transition: transform 0.3s, background-color 0.3s;
}

.lista-item:hover {
  transform: scale(1.01);
 
}
.filtros-aplicados {
  display: flex;
  gap: 10px;
  align-items: center;
  
}

.filtro-tag {
  background-color: #2270AD;
  padding: 5px 10px;
  border-radius:30px;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  cursor: pointer;
  span{
    color: #fff;
    font-size: 12px;
  }
}

.filtro-tag button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
}

.btn-limpar {
  background: none;
  border: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;

}
</style>
