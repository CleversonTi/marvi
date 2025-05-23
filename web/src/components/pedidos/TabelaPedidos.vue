<template>
  <section class="tabela-pedidos">
    <h3>Últimos pedidos faturados</h3>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nº do Pedido</th>
          <th>Valor Total (R$)</th>
          <th>Peso Faturado (kg)</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pedido, index) in dados"
          :key="index"
        >
          <td>{{ pedido.increment_id }}</td>
          <td>{{ pedido.created_at }}</td>
          <td>{{ pedido.created_at }}</td>
          <td>{{ formatWeight(pedido.weight) }}</td>
          <td>{{ pedido.state }}</td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <button @click="verTodos">
        Ver todos os pedidos →
      </button>
    </div>
  </section>
</template>

<script setup>
import {
  formatarMoeda,
  formatWeight
} from '@/utils/helpers.js';
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

const verTodos = () => {
  console.log('Ver todos os pedidos');
}
</script>

<style scoped>
.tabela-pedidos {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  width: 100%;
  border: 1px solid #D3D3D3; /* Borda cinza clara */
}

.tabela-pedidos h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 2px solid #007bff; /* Azul */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #F5F5F5;
  padding: 12px 16px;
  text-align: left;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #D3D3D3;
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
}

tr:hover {
  background-color: #F5F5F5;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
}

button {
  background: #007bff; /* Azul */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3; /* Azul mais escuro */
}
</style>
