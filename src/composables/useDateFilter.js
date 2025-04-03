// web/src/composables/useDateFilter.js
import { ref, computed } from 'vue';

export function useDateFilter() {
  const startDate = ref('');
  const startEnd = ref('');

  const onDateChange = (datasSelecionadas) => {
    if (datasSelecionadas.length === 2) {
      startDate.value = datasSelecionadas[0].toISOString();
      startEnd.value = datasSelecionadas[1].toISOString();
      console.log("📅 Data Inicial:", startDate.value);
      console.log("📅 Data Final:", startEnd.value);
    }
  };

  const periodoFormatado = computed(() => {
    if (!startDate.value || !startEnd.value) return '';
    const formatarData = (data) => {
      const d = new Date(data);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };
    return `Período entre ${formatarData(startDate.value)} - ${formatarData(startEnd.value)}`;
  });

  return { startDate, startEnd, onDateChange, periodoFormatado };
}
