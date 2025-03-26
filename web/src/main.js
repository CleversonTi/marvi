


// Components
import App from './App.vue'
import router from './router'
// Composables
import { createApp } from 'vue'

const app = createApp(App)
import vuetify from './plugins/vuetify'
import '@/scss/style.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// Importando o locale PT-BR
import ptBr from 'element-plus/es/locale/lang/pt-br';
import VueApexCharts from 'vue3-apexcharts';


app
.use(router)
.use(vuetify)
.use(ElementPlus, { locale: ptBr })
app.use(VueApexCharts);
app.component('apexchart', VueApexCharts) 

.mount('#app')
