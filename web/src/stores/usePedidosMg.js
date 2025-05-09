import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

export const usePedidosMg = defineStore('pedidosMg', () => {
  const pedidos = ref([]);
  const carregando = ref(false);
  const erro = ref(null);
  const startDate = ref(null);
  const startEnd = ref(null);

  const carregarPedidos = async () => {
    const authStore = useAuthStore();

    if (!authStore.token) {
      erro.value = 'Token não encontrado.';
      return;
    }

    carregando.value = true;
    erro.value = null;

    try {
      const response = await axios.get('/api/orders', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        params: {
          'searchCriteria[pageSize]': 200,
          'searchCriteria[currentPage]': 1,
        },
      });

      pedidos.value = response.data.items || [];
      console.log('📦 Pedidos carregados:', pedidos.value);

      // 🕒 Extrair datas mínimas e máximas
      const datas = pedidos.value
        .map(p => new Date(p.created_at))
        .filter(date => !isNaN(date));
      console.log('Carregar pedidos Datas extraídas:', datas);
      if (datas.length) {
        startDate.value = new Date(Math.min(...datas));
        startEnd.value = new Date(Math.max(...datas));
        console.log('📅 Intervalo detectado:', startDate.value, startEnd.value);
      }

    } catch (err) {
      erro.value = 'Erro ao carregar pedidos';
      console.error('❌ Erro ao buscar pedidos:', err.response?.data || err.message);
    } finally {
      carregando.value = false;
    }
  };
  const pedidosFiltrados = computed(() => {
    if (!startDate.value || !startEnd.value) return [];
  
    return pedidos.value.filter(pedido => {
      const dataPedido = new Date(pedido.created_at);
      return dataPedido >= startDate.value && dataPedido <= startEnd.value;
    });
  });

  return {
    pedidos,
    carregando,
    erro,
    startDate,
    startEnd,
    carregarPedidos,
    pedidosFiltrados
  };
});
