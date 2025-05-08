import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

export const usePedidosMg = defineStore('pedidosMg', () => {
  const pedidos = ref([]);
  const carregando = ref(false);
  const erro = ref(null);

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
      

      // Logs úteis
      console.log('📦 Requisição enviada com token:', authStore.token);
      console.log('📦 URL da API:', response.config?.url);
      console.log('📦 Dados brutos:', response.data);

      pedidos.value = response.data.items || [];
      console.log('✅ Pedidos carregados:', pedidos.value.length);
    } catch (err) {
      erro.value = 'Erro ao carregar pedidos';
      console.error('❌ Erro ao buscar pedidos:', err.response?.data || err.message);
    } finally {
      carregando.value = false;
    }
  };

  return {
    pedidos,
    carregando,
    erro,
    carregarPedidos,
  };
});
