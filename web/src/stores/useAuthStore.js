import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(null);
  const erroLogin = ref('');
  const isAuthenticated = ref(false);

  // ✅ Configurar o axios para usar o Proxy do Vite
  const axiosInstance = axios.create({
    baseURL: '/api',  // ✅ Agora ele usa o proxy configurado no Vite
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true
  });

  console.log('Axios instance configurado com a URL base:', axiosInstance.defaults.baseURL);

  // 🔑 Função para obter o Token do Magento
  async function obterToken(username, password) {
    console.log('Tentando obter token com:', username, password);

    try {
      const response = await axiosInstance.post('/integration/admin/token', { // ✅ Agora usando o proxy
        username,
        password
      });

      console.log('✅ Token recebido:', response.data);
      return response.data; // Retorna o token recebido
    } catch (error) {
      console.error('❌ Erro ao obter token:', error);

      if (error.response && error.response.status === 401) {
        erroLogin.value = 'Usuário ou senha incorretos. Tente novamente.'; 
      } else if (error.code === 'ERR_NETWORK') {
        erroLogin.value = 'Falha na conexão com o servidor. Verifique se a URL está correta e o servidor está ativo.';
      } else {
        erroLogin.value = 'Ocorreu um erro ao tentar obter o token. Tente novamente mais tarde.'; 
      }

      return null;
    }
  }

  // 🔑 Função para fazer login e salvar o token
  async function fazerLogin(credentials, router) { 
    if (!credentials || !credentials.username || !credentials.password) {
      console.error('❌ Credenciais inválidas fornecidas.');
      return;
    }

    console.log('📨 Enviando requisição de login com:', credentials);

    const recebidoToken = await obterToken(credentials.username, credentials.password);

    if (recebidoToken) {
      token.value = recebidoToken;
      isAuthenticated.value = true;
      erroLogin.value = '';

      localStorage.setItem('token', token.value);

      if (router) {
        router.push({ name: 'dashboard' });
      }
    } else {
      console.error('❌ Falha ao obter token.');
    }
  }

  // 🔑 Função para carregar o usuário autenticado
  async function carregarUsuario() {
    if (!token.value) return;
  
    try {
      // Validação de token com qualquer rota protegida
      await axiosInstance.get('/orders?searchCriteria[currentPage]=1', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      });
  
      isAuthenticated.value = true;
      console.log('✅ Token válido');
    } catch (error) {
      console.error('❌ Token inválido:', error);
      token.value = null;
      localStorage.removeItem('token');
      isAuthenticated.value = false;
    }
  }

  // 🔑 Função para carregar o token salvo no localStorage
  function carregarToken() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      token.value = savedToken;
      carregarUsuario();
    }
  }

  const fullName = computed(() => {
    if (token.value) {
      console.log('🔑 Token encontrado:', token.value);
      return 'Administrador Magento';
    }
    return 'Usuário Desconhecido';
  });

  return {
    token,
    user,
    fullName,
    obterToken,
    fazerLogin,
    carregarToken,
    carregarUsuario,
    erroLogin,
    isAuthenticated
  };
});
