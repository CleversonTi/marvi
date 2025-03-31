import { ref, computed } from 'vue';
import axios from 'axios';

export function usePedidos() {
  const pedidos = ref([]);
  const pedidosFiltrados = ref([]);
  const pedidosCarregados = ref(false);

  const getPedidos = async () => {
    console.log("🔄 Iniciando requisição para obter pedidos...");
    try {
      const response = await axios.get('http://localhost:4000/pedidos');
      pedidos.value = response.data;
      pedidosCarregados.value = true;
      console.log("✅ Pedidos carregados com sucesso:", pedidos.value);
      return true; // Agora retornamos um sucesso para o .then() do onMounted
    } catch (error) {
      console.error('❌ Erro ao carregar pedidos:', error);
      return false; // Retornamos um falso em caso de erro
    }
  };

  const filtrarPedidos = (startDate, endDate) => {
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

    console.log('✅ Pedidos Filtrados após o filtro:', pedidosFiltrados.value);
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
      return `${dia}/${mes}`;
    };

    const dataInicio = new Date(startDate);
    const dataFim = new Date(endDate);

    return `Período entre ${formatarDataCurta(dataInicio)} - ${formatarDataCurta(dataFim)}`;
  };
  const valorTotalFaturamento = computed(() => {
    return pedidosFiltrados.value.reduce((total, pedido) => {
      return total + (parseFloat(pedido.ValorTotal) || 0);
    }, 0);
  });

  return {
    pedidos,
    pedidosFiltrados,
    pedidosCarregados,
    getPedidos,
    filtrarPedidos,
    formatarData,
    formatarMoeda,
    formatarPeriodo, 
    valorTotalFaturamento
  };
}
