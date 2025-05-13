// web/src/stores/usePedidosMg.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'    // ← aqui
import axios         from 'axios'
import { useAuthStore } from './useAuthStore'

export const usePedidosMg = defineStore('pedidosMg', () => {
  const pedidos   = ref([])
  const carregando = ref(false)
  const erro       = ref(null)
  const startDate  = ref(null)
  const startEnd   = ref(null)

  async function carregarPedidos() {
    const authStore = useAuthStore()
    if (!authStore.token) {
      erro.value = 'Token não encontrado.'
      return
    }

    carregando.value = true
    erro.value       = null

    try {
      const { data } = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${authStore.token}` },
        params: {
          'searchCriteria[pageSize]': 200,
          'searchCriteria[currentPage]': 1
        }
      })

      pedidos.value = data.items || []

      // extrai datas
      const datas = pedidos.value
        .map(p => new Date(p.created_at.replace(' ', 'T')))
        .filter(d => !isNaN(d))

      if (datas.length) {
        startDate.value = new Date(Math.min(...datas))
        startEnd.value  = new Date(Math.max(...datas))
      }
    } catch (e) {
      erro.value = 'Erro ao carregar pedidos'
      console.error(e)
    } finally {
      carregando.value = false
    }
  }

  // BY DATE RANGE
  const pedidosFiltrados = computed(() => {
    if (!startDate.value || !startEnd.value) return []
    console.log("pedidosFiltrados? "+ pedidos.value);
    return pedidos.value.filter(p => {
      const d = new Date(p.created_at.replace(' ', 'T'))
      return d >= startDate.value && d <= startEnd.value
    })
  })

  return {
    pedidos,
    carregando,
    erro,
    startDate,
    startEnd,
    carregarPedidos,
    pedidosFiltrados    // ← exposto aqui
  }
})
