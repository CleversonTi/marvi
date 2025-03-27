<template>
  
    <span>{{ title }}</span>
    <div class="area-calendar">
    <ElDatePicker
      v-model="selectedRange"
      type="daterange"
      unlink-panels
      range-separator="até"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
     format="DD/MM/YYYY"
      
      @change="emitSelectedRange"
    />
    <IconCalendar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  startPlaceholder: String,
  endPlaceholder: String
})

const emit = defineEmits(['selectedRange'])

const selectedRange = ref([])

// Dispara o evento para o pai quando a data for alterada manualmente
const emitSelectedRange = () => {
  if (selectedRange.value && selectedRange.value.length === 2) {
    emit('selectedRange', selectedRange.value)
  }
}

// Preenche automaticamente ao carregar o componente
onMounted(() => {
  const today = new Date()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)

  selectedRange.value = [thirtyDaysAgo, today]

  // Emite para o pai também, se quiser disparar logo de cara
  emit('selectedRange', selectedRange.value)
})
</script>

<style lang="scss">
  .area-calendar{
    position: relative;
    background: #F0F0F0;
    padding: 10px 0;
    border-radius: 30px;
    .el-date-editor {
      background: #F0F0F0;
      box-shadow: none !important;
      max-width: 300px;
      border-radius: 30px;
      .el-range-input{
        width: 30%;

        &::placeholder{
          color: #1D1B20;
        }
      }
      .el-range-separator{
        display: unset;
        flex: unset;
        height: auto;
        padding: 0 10px;
      }
      &.el-date-editor--daterange{
        padding: 0;
        i{
          display: none;
        }
      }
    }
    .icon-calendar{
      position: absolute;
      right: 15px;
    }

  }
</style>
