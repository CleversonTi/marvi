// web/src/composables/usePedidos.js

import { ref, computed, watch } from 'vue';
import axios from 'axios';

export function usePedidos() {
  const pedidos = ref([]);
  const pedidosFiltrados = ref([]);
  const pedidosCarregados = ref(false);
  const termoBusca = ref('');
  const dataInicio = ref(null);
  const dataFim = ref(null);

  const getPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/pedidos');
      pedidos.value = response.data;
      pedidosFiltrados.value = pedidos.value;
      pedidosCarregados.value = true;
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...pedidos.value];

    // Filtragem por data
    if (dataInicio.value && dataFim.value) {
      const inicio = new Date(dataInicio.value);
      const fim = new Date(dataFim.value);
      resultado = resultado.filter(pedido => {
        if (!pedido.DataEntrada) return false;
        const [dia, mes, ano] = pedido.DataEntrada.split('/').map(Number);
        const dataPedido = new Date(ano, mes - 1, dia);
        return dataPedido >= inicio && dataPedido <= fim;
      });
    }

    // Filtragem por termo de busca
    if (termoBusca.value.trim()) {
      const termo = termoBusca.value.toLowerCase();
      resultado = resultado.filter(pedido => 
        (pedido.Cliente && pedido.Cliente.toLowerCase().includes(termo)) ||
        (pedido.NumeroPedido && pedido.NumeroPedido.toString().includes(termo))
      );
    }

    pedidosFiltrados.value = resultado;
  };

  const filtrarPedidos = (startDate, endDate) => {
    dataInicio.value = startDate;
    dataFim.value = endDate;
    aplicarFiltros();
  };

  const aplicarBusca = () => {
    aplicarFiltros();
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor || 0);
  };

  const valorTotalFaturamento = computed(() => {
    return formatarMoeda(pedidosFiltrados.value.reduce((total, pedido) => {
      return total + (parseFloat(pedido.ValorTotal) || 0);
    }, 0));
  });

  watch([termoBusca, dataInicio, dataFim], aplicarFiltros);

  return {
    pedidos,
    pedidosFiltrados,
    pedidosCarregados,
    getPedidos,
    filtrarPedidos,
    aplicarBusca,
    formatarMoeda,
    termoBusca,
    valorTotalFaturamento,
  };
}
