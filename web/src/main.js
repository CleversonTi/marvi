// Vue e App
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
// Plugins
import router from './router'
import vuetify from './plugins/vuetify'
import ElementPlus from 'element-plus'
import ptBr from 'element-plus/es/locale/lang/pt-br'
import VueApexCharts from 'vue3-apexcharts'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/useAuthStore'; // ✅ Importar a store de autenticação
// Estilos
import 'element-plus/dist/index.css'
import '@/scss/style.scss'

// Criando a aplicação
const app = createApp(App)
const pinia = createPinia()
app.use(pinia) // ✅ Registra o Pinia antes de usá-lo

const authStore = useAuthStore(); // ✅ Agora é seguro usar a store

axios.interceptors.request.use(config => {
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

app
  .use(router)
  .use(vuetify)
  .use(ElementPlus, { locale: ptBr }) // Locale correto aplicado aqui
  .use(VueApexCharts)
  .use(pinia)
  .mount('#app')

authStore.carregarToken(); // ✅ Certifique-se de que o token é carregado após inicializar a store
