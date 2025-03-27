<template>
  <span>{{ title }}</span>
  <div class="area-calendar">
    <ElDatePicker
      v-model="selectedRange"
      type="daterange"
      range-separator="até"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      @change="emitSelectedRange"
    />
    <IconCalendar />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import 'element-plus/dist/index.css';
import { ElDatePicker } from 'element-plus';
import IconCalendar from '@/components/icons/IconCalendar.vue';

const selectedRange = ref([]);
const emit = defineEmits(['selectedRange']);

const emitSelectedRange = () => {
  if (selectedRange.value.length === 2) {
    emit('selectedRange', selectedRange.value); // Emitindo corretamente o evento com as datas selecionadas
  }
};

defineProps({
  title: String,
  startPlaceholder: String,
  endPlaceholder: String,
});
</script>