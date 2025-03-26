<script setup>
import { ref } from 'vue';
import 'element-plus/dist/index.css';
import { ElDatePicker } from 'element-plus';
import IconCalendar from '@/components/icons/IconCalendar.vue'
const selectedRange = ref([]);
defineProps({
  title: {
    type: String,
    required: true,
  },
  startPlaceholder: {
    type: Date,
    required: true,
  },
  endPlaceholder: {
    type: Date,
    required: true,
  }
});
</script>

<template>
   <span>{{ title }}</span>
  <div class="area-calendar">
    <ElDatePicker
                v-model="selectedRange"
                type="daterange"
                range-separator="até"
                start-placeholder=" Data de início"
                end-placeholder="Data de fim"
                @change="$emit('selectedRange',(selectedRange[0], selectedRange[1]))"

    />
     <!-- <p>Período Selecionado: {{ selectedRange[0] }} a {{ selectedRange[1] }}</p>  -->
    <IconCalendar/>
  </div>
</template>

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
