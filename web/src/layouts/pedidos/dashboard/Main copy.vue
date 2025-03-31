<template>
  <section class="primary_section">
    <h4>Resumo dos pedidos</h4>
    <div class="filter_area">
      <Download />
    </div>
  </section>

  <section class="primary_section">
    <div class="v-card-item__content">
      <div class="v-card-item_header">
        <div class="total">
          <strong>{{ pedidosFiltrados.length }}</strong>
          <span>Total de Pedidos no Período</span>
        </div>
        <div class="periodo">
          <span>Período entre {{ formatarData(thisStartDate) }} - {{ formatarData(thisStartEnd) }}</span>
        </div>
      </div>
      <Graficos :pedidos="pedidosFiltrados" />
    </div>

    <div class="v-card-item__box">
      <div class="card fatura not-approved">
        <router-link :to="{name: 'pedidos'}"> 
          <div class="total">
            <strong>1</strong>
          </div>
          <div class="link">
            <IconDirection
              stroke-width="1.5"
              size="20"
            /> 
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
            <IconDirection
              stroke-width="1.5"
              size="20"
            /> 
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
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>{{ formatarMoeda(valorTotalFaturamento()) }}</strong>
          </div>
          <div class="description">
            <span>Valor total do faturamento</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
  <section class="primary_section tables">
    <TabelaRepresentantes :dados="faturamentoPorRepresentante" />
  </section>
</template>

<script setup>
import { ref, watch, onMounted, computed, toRefs } from 'vue'
import axios from 'axios'
import Download from '@/components/download/index.vue'
import Graficos from '@/components/Graphic/Graphic.vue';
import UnapprovedRequests from '@/components/pedidos/resumo/UnapprovedRequests.vue';
//import NotBilled from '@/components/pedidos/resumo/NotBilled.vue';
import IconDirection from '@/components/icons/IconLeft.vue'
import TabelaRepresentantes from '@/components/Representante/resumo/TabelaRepresentantes.vue'

const props = defineProps({
  startDate: { type: Date, required: true },
  startEnd: { type: Date, required: true },
})

const { startDate, startEnd } = toRefs(props)
const thisStartDate = ref(startDate.value)
const thisStartEnd = ref(startEnd.value)

const pedidos = ref([])
const pedidosFiltrados = ref([])

watch(startDate, (newVal) => {
  thisStartDate.value = newVal
  if (pedidos.value.length) filtrarPedidos()
})

watch(startEnd, (newVal) => {
  thisStartEnd.value = newVal
  if (pedidos.value.length) filtrarPedidos()
})

const getPedidos = async () => {
  try {
    const response = await axios.get('http://localhost:4000/pedidos')
    pedidos.value = response.data
    filtrarPedidos()
  } catch (error) {
    console.error('Erro ao carregar pedidos:', error)
  }
}

const filtrarPedidos = () => {
  if (!thisStartDate.value || !thisStartEnd.value || !pedidos.value.length) return

  const dataIni = new Date(thisStartDate.value)
  const dataFim = new Date(thisStartEnd.value)
  dataIni.setHours(0, 0, 0, 0)
  dataFim.setHours(23, 59, 59, 999)

  pedidosFiltrados.value = pedidos.value.filter((pedido) => {
    if (!pedido.DataEntrada) return false
    const [dia, mes, ano] = pedido.DataEntrada.split('/')
    const dataPedido = new Date(Number(ano), Number(mes) - 1, Number(dia))
    dataPedido.setHours(12, 0, 0, 0)
    return dataPedido >= dataIni && dataPedido <= dataFim
  })
}

const formatarData = (data) => {
  if (!data || !(data instanceof Date)) return ''
  return new Intl.DateTimeFormat('pt-BR').format(data)
}

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor || 0)
}

const valorTotalFaturamento = () => {
  return pedidosFiltrados.value.reduce((total, pedido) => {
    return total + (parseFloat(pedido.ValorTotal) || 0)
  }, 0)
}

onMounted(() => getPedidos())
const faturamentoPorRepresentante = computed(() => {
  const agrupado = {}

  pedidosFiltrados.value.forEach(pedido => {
    if (pedido.Status !== 'Faturado') return

    const nome = pedido.Representante || 'Não identificado'

    if (!agrupado[nome]) {
      agrupado[nome] = { peso: 0, valor: 0 }
    }

    agrupado[nome].peso += Number(pedido.PesoTotal || 0)
    agrupado[nome].valor += Number(pedido.ValorTotal || 0)
  })

  return Object.entries(agrupado).map(([nome, dados]) => ({
    nome,
    peso: dados.peso,
    valor: dados.valor
  }))
})

</script>

<style>
/* Adicione seu estilo aqui */
</style>
