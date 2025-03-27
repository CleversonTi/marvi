<script setup>
import { ref } from 'vue';
import 'element-plus/dist/index.css';
import { ElDatePicker } from 'element-plus';

const selectedRange = ref([]);
</script>

<template>
  <div>
    <h2>Select a Date Range</h2>
    <ElDatePicker
      v-model="selectedRange"
      type="daterange"
      range-separator="Ate"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
    <p>Selected Range: {{ selectedRange[0] }} to {{ selectedRange[1] }}</p>
  </div>
</template>
