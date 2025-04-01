// web/src/composables/usePedidos.js

import { ref, computed,  watch } from 'vue';
import axios from 'axios';

export function usePedidos() {
  const pedidos = ref([]);
  const pedidosFiltrados = ref([]);
  const pedidosCarregados = ref(false);
  const termoBusca = ref(''); // 🔍 Termo de busca atual

  const getPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/pedidos');
      pedidos.value = response.data;
      pedidosFiltrados.value = pedidos.value; // Inicialmente, mostra todos os pedidos
      pedidosCarregados.value = true;
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const filtrarPedidos = (startDate, endDate) => {
    console.log("Entrou no filtrar pedidos")
    if (!startDate || !endDate || !pedidos.value.length) {
      console.warn("⚠️ Dados insuficientes para o filtro.");
      return;
    }

    console.log("📅 Chamou filtrarPedidos com as datas:", startDate, endDate);

    const dataIni = new Date(startDate);
    const dataFim = new Date(endDate);
    if (isNaN(dataIni.getTime()) || isNaN(dataFim.getTime())) {
        console.error("❌ Datas inválidas fornecidas:", startDate, endDate);
        return;
    }

    dataIni.setHours(0, 0, 0, 0);
    dataFim.setHours(23, 59, 59, 999);

    pedidosFiltrados.value = pedidos.value.filter((pedido) => {
      if (!pedido.DataEntrada) return false;

      const [dia, mes, ano] = pedido.DataEntrada.split('/').map(Number);
      if (!dia || !mes || !ano) return false;

      const dataPedido = new Date(ano, mes - 1, dia);
      dataPedido.setHours(0, 0, 0, 0);

      return dataPedido >= dataIni && dataPedido <= dataFim;
    });

    aplicarBusca(); // 🔥 Aplica a busca após filtrar por data
    console.log('✅ Pedidos Filtrados após o filtro:', pedidosFiltrados.value);
  };

  const aplicarBusca = () => {
    if (!termoBusca.value.trim()) {
      pedidosFiltrados.value = pedidos.value;
      return;
    }

    const termo = termoBusca.value.toLowerCase();
    pedidosFiltrados.value = pedidos.value.filter(pedido => 
      (pedido.Cliente && pedido.Cliente.toLowerCase().includes(termo)) ||
      (pedido.NumeroPedido && pedido.NumeroPedido.toString().includes(termo))
    );
  };

  const formatarData = (data) => {
    if (!data || !(data instanceof Date)) return '';
    return new Intl.DateTimeFormat('pt-BR').format(data);
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor || 0);
  };
  const formatarPeriodo = (startDate, endDate) => {
    if (!startDate || !endDate) return '';

    const formatarDataCurta = (data) => {
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      // console.log("Formatar Periodo");
      // console.log(`${dia}/${mes}`);
      return `${dia}/${mes}`;
    };

    const dataInicio = new Date(startDate);
    const dataFim = new Date(endDate);

    return `Período entre ${formatarDataCurta(dataInicio)} - ${formatarDataCurta(dataFim)}`;
  };
  const valorTotalFaturamento = computed(() => {
    return formatarMoeda(pedidosFiltrados.value.reduce((total, pedido) => {
      return total + (parseFloat(pedido.ValorTotal) || 0);
    }, 0));
  });
  // 🔥 Sempre aplica a busca quando o termo de busca é alterado
  watch(termoBusca, aplicarBusca);
  return {
    pedidos,
    pedidosFiltrados,
    pedidosCarregados,
    getPedidos,
    filtrarPedidos,
    formatarData,
    formatarMoeda,
    formatarPeriodo,
    aplicarBusca,
    termoBusca, // Exporta o termo de busca para ser atualizado pelo SearchBar
    valorTotalFaturamento,
  };
}
