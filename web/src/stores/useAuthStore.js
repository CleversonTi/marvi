// web/src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Estados
  const token           = ref(localStorage.getItem('token') || null);
  const erroLogin       = ref('');
  const isAuthenticated = ref(!!token.value);
  const loading         = ref(false);

  // Instância Axios usando o proxy /api
  const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    },
    withCredentials: true
  });

  // Interceptor para injetar o token
  axiosInstance.interceptors.request.use(config => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  // 1️⃣ Solicita token ao Magento
  async function obterToken(username, password) {
    try {
      const { data } = await axiosInstance.post('/integration/admin/token', {
        username,
        password
      });
      return data;
    } catch (err) {
      if (err.response?.status === 401) {
        erroLogin.value = 'Usuário ou senha incorretos.';
      } else {
        erroLogin.value = 'Erro de conexão. Tente novamente.';
      }
      return null;
    }
  }

  // 2️⃣ Efetua o login e salva o token
  async function fazerLogin({ username, password }, router) {
    loading.value  = true;
    erroLogin.value = '';

    const novoToken = await obterToken(username, password);
    if (novoToken) {
      token.value           = novoToken;
      isAuthenticated.value = true;
      localStorage.setItem('token', novoToken);
      router?.push({ name: 'account' });
    }

    loading.value = false;
  }

  // 3️⃣ Valida token sem derrubar sessão em caso de 500
  async function validarToken() {
    if (!token.value) return;

    try {
      // Um endpoint leve apenas para checar validade, ex: /orders?pageSize=1
      await axiosInstance.get('/orders', {
        params: { 'searchCriteria[pageSize]': 1 }
      });
      isAuthenticated.value = true;
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        // Token realmente inválido ou expirado
        console.warn('Token expirado ou inválido:', status);
        token.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('token');
      } else {
        // Outros erros (500, etc) – não derruba a sessão
        console.warn('Erro ao validar token (mas mantenho sessão):', status);
        isAuthenticated.value = true;
      }
    }
  }

  // 4️⃣ Recupera token do localStorage e já considera o usuário autenticado
  async function carregarToken() {
    const saved = localStorage.getItem('token');
    if (saved) {
      token.value = saved;
      isAuthenticated.value = true;  // assume válido até prova em contrário
      await validarToken();
    }
  }

  // 5️⃣ Logout claro
  function logout(router) {
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    router?.push({ name: 'login' });
  }

  // Nome apresentado
  const fullName = computed(() =>
    isAuthenticated.value ? 'Administrador Magento' : 'Usuário Desconhecido'
  );

  return {
    token,
    loading,
    erroLogin,
    isAuthenticated,
    fullName,

    fazerLogin,
    carregarToken,
    validarToken,
    logout
  };
});
