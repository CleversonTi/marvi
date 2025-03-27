<template>
    <section class="primary_section">
        <h4> Resumo dos pedidos</h4>
        <div class="filter_area">
            <Download/>
            {{pedidos}}
        </div>
    </section>
    Resultado: {{pedidosFiltrados}}
     {{thisStartDate}} -{{thisStartEnd}}
    <section class="primary_section">
        
        <div class="v-card-item__content">
            <div class="v-card-item_header">
                <div class="total">
                    <strong>
                        999
                    </strong>
                    <span>Total de Pedidos</span>
                </div>
                <div class="periodo">
                    <span>Periodo entre {{ formatarData(thisStartDate) }} - {{ formatarData(thisStartEnd) }}</span>
                </div>
            </div>
            <Graficos />
        </div>
        <div class="v-card-item__box">
            <div class="card fatura not-approved">
                <router-link :to="{name: 'pedidos'}"> 
                    <div class="total">
                            <strong>1</strong>
                    </div>
                    <div class="link">
                            <IconDirection stroke-width="1.5" size="20"/> 
                    </div>
                    <div class="description">
                       <span>
                            Pedidos não aprovados
                        </span> 
                    </div>
                </router-link>
            </div>
             <div class="card fatura unbilled">
                <router-link :to="{name: 'pedidos'}">  
                    <div class="total">
                            <strong>3</strong>
                    </div>
                    <div class="link">
                           <IconDirection stroke-width="1.5" size="20"/> 
                    </div>
                    <div class="description">
                        <span>
                            Pedidos não faturados

                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <router-link :to="{name: 'pedidos'}"> 
                    <div class="total">
                            <strong>
                                300
                            </strong>
                    </div>
                    
                    <div class="description">
                        <span>
                            Pedidos não faturados
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <router-link :to="{name: 'pedidos'}"> 
                    <div class="total">
                            <strong>
                               20
                            </strong>
                    </div>
                    
                    <div class="description">
                        <span>
                           Pedidos aguardando envio
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card">
                <router-link :to="{name: 'pedidos'}">  
                    <div class="total">
                            <strong>
                                25t
                                </strong>
                    </div>
                    
                    <div class="description">
                       <span>
                        Peso dos pedidos
                        </span>
                    </div>
                </router-link>
            </div>
            <div class="card totalfaturamento">
                <router-link :to="{name: 'pedidos'}">  
                    <div class="total">
                           <strong>
                            R$ 90.000,00
                            </strong> 
                    </div>
                    
                    <div class="description">
                       <span>
                        Valor total do faturamento
                        </span>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
    
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import Download from '@/components/download/index.vue'
import Graficos from '@/components/pedidos/resumo/Grafico.vue'
import IconDirection from '@/components/icons/IconLeft.vue'

// Props recebidas
const props = defineProps({
  startDate: {
    type: Date,
    required: true
  },
  startEnd: {
    type: Date,
    required: true
  }
})

// Variáveis reativas
const pedidos = ref([])
const pedidosFiltrados = ref([])

const { startDate, startEnd } = toRefs(props) // agora são reativos!
// Cópias locais das datas (editáveis e observáveis)
const thisStartDate = ref(props.startDate)
const thisStartEnd = ref(props.startEnd)
const pedidosCarregados = ref(false)
// Atualiza valores locais ao mudar as props
watch(() => props.startDate, (newVal) => {
  thisStartDate.value = newVal
  if (Array.isArray(pedidos.value) && pedidos.value.length > 0) {
    filtrarPedidos()
  }
})

watch(() => props.startEnd, (newVal) => {
  thisStartEnd.value = newVal
  if (Array.isArray(pedidos.value) && pedidos.value.length > 0) {
    filtrarPedidos()
  }
})

// Função para buscar os pedidos da API
const getPedidos = async () => {
  try {
    const response = await axios.get('http://localhost:4000/pedidos')
    console.log('📡 Resposta da API:', response)

    pedidos.value = response.data

    // Chama o filtro só depois que os pedidos foram carregados
    filtrarPedidos()
  } catch (error) {
    console.error('❌ Erro ao carregar os pedidos:', error)
  }
}

// Filtro de pedidos por intervalo de datas
function zerarHora(data) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate())
}

const filtrarPedidos = () => {
  console.log("🔍 Iniciando filtro de pedidos")

  if (!thisStartDate.value || !thisStartEnd.value) {
    console.warn("⚠️ Datas inválidas")
    return
  }

  if (!Array.isArray(pedidos.value) || pedidos.value.length === 0) {
    console.warn("⚠️ Nenhum pedido carregado ainda")
    return
  }

  const dataIni = new Date(thisStartDate.value)
  const dataFim = new Date(thisStartEnd.value)
  dataIni.setHours(0, 0, 0, 0)
  dataFim.setHours(23, 59, 59, 999)

  console.log("📅 Data inicial:", dataIni)
  console.log("📅 Data final:", dataFim)

  pedidosFiltrados.value = pedidos.value.filter(pedido => {
    if (!pedido.DataEntrada || typeof pedido.DataEntrada !== 'string') return false

    const [dia, mes, ano] = pedido.DataEntrada.split('/')
    const dataPedido = new Date(Number(ano), Number(mes) - 1, Number(dia))
    dataPedido.setHours(12, 0, 0, 0)

    const dentroDoPeriodo = dataPedido >= dataIni && dataPedido <= dataFim

    console.log(`→ Pedido: ${pedido.DataEntrada} | ${dentroDoPeriodo ? "✅" : "❌"}`)

    return dentroDoPeriodo
  })

  console.log("📦 Pedidos filtrados:", pedidosFiltrados.value.length)
}


// Função para formatar datas no formato dd/mm/yyyy (para exibir)
const formatarData = (data) => {
  if (!data || !(data instanceof Date)) return ''
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}

// Montagem do componente
onMounted(() => {
  getPedidos()
})
</script>







<style>

</style>