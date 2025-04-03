<template>

  Teste
</template>

<script setup>
import IconDirection from '@/components/icons/IconLeft.vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  }
})

console.log(props.total) // ou só "total" se você quiser desestruturar
</script>

<style lang="scss" scoped>

</style>