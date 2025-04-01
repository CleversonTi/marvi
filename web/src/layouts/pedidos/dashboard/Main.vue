<script setup>
import { ref, watch, onMounted, toRefs,computed } from 'vue';
import { usePedidos } from '@/composables/usePedidos';
import Download from '@/components/download/index.vue';
import Graficos from '@/components/Graphic/Graphic.vue';
import TabelaPedidos from '@/components/pedidos/TabelaPedidos.vue';

const props = defineProps({
  startDate: { type: String, required: true }, 
  startEnd: { type: String, required: true },
});

console.log("📅 Props recebidas - startDate:", props.startDate, "startEnd:", props.startEnd);

const thisStartDate = ref(new Date(props.startDate)); // 🔥 Converter String ISO para Date
const thisStartEnd = ref(new Date(props.startEnd));   // 🔥 Converter String ISO para Date

const { pedidos, pedidosFiltrados, pedidosCarregados, getPedidos, filtrarPedidos, formatarPeriodo,valorTotalFaturamento } = usePedidos();

onMounted(() => {
  //console.log("📥 onMounted executado.");
  getPedidos().then(() => {
    if (pedidosCarregados.value) {
      //console.log("🔄 Aplicando filtro após carregamento inicial.");
      filtrarPedidos(thisStartDate.value, thisStartEnd.value);
      //console.log('📊 Pedidos Filtrados após carregamento inicial:', pedidosFiltrados.value);
    }
  });
});

watch(
  () => [props.startDate, props.startEnd], // 🔥 Observa alterações nas `props`
  ([newStartDate, newEndDate]) => {
    //console.log("🔄 Watch detectou mudança de props:", newStartDate, newEndDate);
    thisStartDate.value = new Date(newStartDate);
    thisStartEnd.value = new Date(newEndDate);
    if (pedidosCarregados.value) {
      filtrarPedidos(thisStartDate.value, thisStartEnd.value);
    }
  },
  { immediate: true }
  
);
const periodoFormatado = computed(() => {
  //console.log("📅 Chamando formatarPeriodo.");
  return formatarPeriodo(thisStartDate.value, thisStartEnd.value);
});
const pedidosFiltradosCount = computed(() => pedidosFiltrados.value?.length || 0);
</script>

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
          <strong>
            {{ pedidosFiltrados.length }}
          </strong>
          <span>Total de Pedidos</span>
        </div>
        <div class="periodo">
          <div class="periodo">
            <span>{{ periodoFormatado }}</span>
          </div>
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
            <strong>{{ valorTotalFaturamento }}</strong>
          </div>
          <div class="description">
            <span>Valor total do faturamento</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
  <section class="primary_section tables">
    <TabelaPedidos :dados="pedidosFiltrados" />
  </section>
</template>

<style>
.primary_section {
  padding: 20px;
  margin: 20px;
  background: white;
  border-radius: 8px;
}
.v-card-item__content {
  margin-bottom: 20px;
}
.v-card-item__box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
