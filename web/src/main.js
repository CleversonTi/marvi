// Vue e App
import { createApp } from 'vue'
import App from './App.vue'

// Plugins
import router from './router'
import vuetify from './plugins/vuetify'
import ElementPlus from 'element-plus'
import ptBr from 'element-plus/es/locale/lang/pt-br'
import VueApexCharts from 'vue3-apexcharts'

// Estilos
import 'element-plus/dist/index.css'
import '@/scss/style.scss'

// Criando a aplicação
const app = createApp(App)

app
  .use(router)
  .use(vuetify)
  .use(ElementPlus, { locale: ptBr }) // Locale correto aplicado aqui
  .use(VueApexCharts)

app.component('Apexchart', VueApexCharts)

app.mount('#app')
