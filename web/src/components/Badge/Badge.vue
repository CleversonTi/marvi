<!-- web/src/components/pedidos/StatusBadge.vue -->
<template>
  <span :class="['badge', statusClass]">{{ status }}</span>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true
  }
});

const statusClass = computed(() => {
  switch (props.status) {
    case 'Faturado': return 'badge-blue';
    case 'Em aberto': return 'badge-orange';
    case 'Enviado': return 'badge-green';
    case 'Não Faturado': return 'badge-red';
    case 'Entregue': return 'badge-gray';
    case 'Aguardando': return 'badge-yellow';
    default: return 'badge-default';
  }
});
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  font-weight: bold;
  text-transform: capitalize;
}

.badge-blue { background-color: #007bff; }
.badge-orange { background-color: #ffa500; }
.badge-green { background-color: #28a745; }
.badge-red { background-color: #dc3545; }
.badge-gray { background-color: #6c757d; }
.badge-yellow { background-color: #ffc107; }
.badge-default { background-color: #343a40; }
</style>
