<template>
  <section class="tabela-pedidos">
    <div class="toolbar">
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
            @click="toggleView('list')"
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
            @click="toggleView('grid')"
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
    <!-- 🔥 Exibe a mensagem de "Nenhum resultado encontrado" quando não há itens filtrados -->
    <div
      v-if="pedidosPaginados.length === 0"
      class="no-results"
    >
      Nenhum pedido encontrado para a busca: <strong>{{ props.termoBusca }}</strong>
    </div>
    <div
      v-else
      class="table-container"
    >
      <!-- Transição suave para os modos de exibição -->
      <transition
        :name="transitionName"
        mode="out-in"
      >
        <div
          v-if="viewMode === 'list'"
          :key="viewMode"
          class="table-container"
        >
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
      </transition>

      <transition
        :name="transitionName"
        mode="out-in"
      >
        <section
          v-if="viewMode === 'grid'"
          class="listas-container"
        >
          <div class="item-conteudo">
            <ul class="lista-card">
              <li
                v-for="(pedido, index) in pedidosPaginados"
                :key="index"
                class="lista-item"
              >
                <div class="cod_pedidos item">
                  <strong class="title">N do Pedido</strong>
                  <span>
                    {{ pedido.NumeroPedido }}
                  </span>
                </div>

                <div class="name_cliente item">
                  <strong class="title">
                    Cliente
                  </strong>
                  <span>Sorveteria Gelaboca Lorem Ipsum Dolor</span>
                </div>
                <div class="name_cliente item">
                  <strong class="title">
                    Representante
                  </strong>
                  <span>{{ pedido.Cliente }}</span>
                </div>
            
                <div class="dates_cliente item two-itens">
                  <div class="name_cliente">
                    <strong class="title">
                      Entrada
                    </strong>
                    <span class="title">{{ pedido.DataEntrada }}</span>
                  </div>
                  <div class="name_cliente">
                    <strong class="title">
                      Vencimento
                    </strong>
                    <span class="title">{{ pedido.Vencimento }}</span>
                  </div>
                </div>
                <div class="dates_cliente item three-itens">
                  <div class="name_cliente">
                    <strong class="title">
                      Situação
                    </strong>
                    <span class="title">{{ pedido.Situacao }}</span>
                  </div>
                  <div class="name_cliente">
                    <strong class="title">
                      Total
                    </strong>
                    <span>{{ formatarMoeda(pedido.ValorTotal) }}</span>
                  </div>
                  <div class="name_cliente badge">
                    <strong class="title">
                      Status
                    </strong>
                    <span><span :class="['status-badge', formatarStatus(pedido.Status)]">{{ pedido.Status }}</span></span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Paginator 
            :total-itens="pedidosFiltrados.length" 
            @mudanca-pagina="atualizarPagina" 
          />
        </section>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted,  computed } from 'vue';
import { usePedidos } from '@/composables/usePedidos';
import { Filter, Grid2x2 } from 'lucide-vue-next';
import  IconList  from '@/components/icons/IconListMarvi.vue';
import  IconMoreVertical  from '@/components/icons/IconMoreVertical.vue';
import Paginator from '@/components/Pagination/Paginator.vue';
import ModalFiltro from '@/components/modals/ModalFiltro.vue';
import DownloadPopup from '@/components/modals/DownloadPopup.vue';

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
const viewMode = ref('list');
const transitionName = ref('fade'); 
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
const toggleView = (mode) => {
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

</style>
