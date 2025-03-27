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
        <tr v-for="rep in dados" :key="rep.nome">
          <td>{{ rep.nome }}</td>
          <td>{{ rep.peso.toFixed(2) }}</td>
          <td>{{ formatarMoeda(rep.valor) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <button @click="verTodos">Ver todos os representantes →</button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  dados: {
    type: Array,
    required: true
  }
})

const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)

const verTodos = () => {
  // Aqui você pode usar router.push, emitir evento, abrir modal etc.
  console.log('Ver todos os representantes')
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

.tabela-representantes h3 {
  font-size: 20px;
  margin-bottom: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  font-weight: bold;
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

button {
  background: #1a73e8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
