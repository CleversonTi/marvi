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
axios.interceptors.request.use(config => {
  const authStore = useAuthStore();
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
app.component('Apexchart', VueApexCharts)
app.mount('#app')
const authStore = useAuthStore(); // Agora o store existe
authStore.carregarToken(); // Certifique-se de que esta linha está após app.mount
