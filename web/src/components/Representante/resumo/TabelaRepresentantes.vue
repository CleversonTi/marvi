<template>
  <section class="tabela-representantes">
    <h3>Faturamento por representantes</h3>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Peso Faturado (kg)</th>
          <th>Valor Total (R$)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(representante, index) in representantesAgrupados"
          :key="index"
        >
          <td>{{ representante.nome }}</td>
          <td>{{ representante.peso.toFixed(2) }} kg</td>
          <td>{{ formatarMoeda(representante.valor) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <button @click="verTodos">
        Ver todos os representantes →
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  dados: {
    type: Array,
    required: true,
    default: () => []
  }
});

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor || 0);

const representantesAgrupados = computed(() => {
  const agrupado = {};

  props.dados.forEach(pedido => {
    const nome = pedido.Representante || 'Representante Desconhecido';
    const peso = Number(pedido.PesoFaturado || 0);
    const valor = Number(pedido.ValorTotal || 0);

    if (!agrupado[nome]) {
      agrupado[nome] = { nome, peso: 0, valor: 0 };
    }

    agrupado[nome].peso += peso;
    agrupado[nome].valor += valor;
  });

  return Object.values(agrupado);
});

const verTodos = () => {
  console.log('Ver todos os representantes');
}
</script>

<style scoped>
.tabela-representantes {
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 12px 8px;
  background: #f5f5f5;
}

td {
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
}
</style>
