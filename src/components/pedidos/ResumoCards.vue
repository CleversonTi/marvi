<template>
  <div class="resumo-cards">
    <div class="card">
      <div class="value">
        9999
      </div>
      <div class="label">
        Pedidos faturado
      </div>
    </div>
    <div class="card">
      <div class="value">
        999 t
      </div>
      <div class="label">
        Peso total de produtos
      </div>
    </div>
    <div class="card">
      <div class="value">
        R$ 9.999,99
      </div>
      <div class="label">
        Valor total faturado
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.resumo-cards {
  display: flex;
  gap: 20px;
}



.value {
  font-size: 24px;
  font-weight: bold;
}

.label {
  font-size: 14px;
  color: #777;
}
</style>
