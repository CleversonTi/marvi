import { createApp }            from 'vue'
import App                      from './App.vue'
import { createPinia }          from 'pinia'
import axios                    from 'axios'
import router                   from './router'
import vuetify                  from './plugins/vuetify'
import ElementPlus              from 'element-plus'
import ptBr                     from 'element-plus/es/locale/lang/pt-br'
import VueApexCharts            from 'vue3-apexcharts'
import Toast, { POSITION }      from 'vue-toastification'
import 'element-plus/dist/index.css'
import 'vue-toastification/dist/index.css'
import '@/scss/style.scss'

import { useAuthStore }         from './stores/useAuthStore'

async function bootstrap() {
  // 1️⃣ Cria app e instala Pinia
  const app    = createApp(App)
  const pinia  = createPinia()
  app.use(pinia)

  // 2️⃣ Instancia authStore e recarrega o token (assume válido até validar)
  const authStore = useAuthStore()
  await authStore.carregarToken()

  // 3️⃣ Configura interceptor global do Axios
  axios.interceptors.request.use(config => {
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  })

  // 4️⃣ Registra plugins e monta
  app
    .use(router)
    .use(vuetify)
    .use(ElementPlus, { locale: ptBr })
    .use(VueApexCharts)
    .use(Toast, { position: POSITION.BOTTOM_LEFT })
    .mount('#app')
}

bootstrap()
