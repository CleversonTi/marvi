<template>
    <div class="card fatura not-approved">
        <router-link :to="{ name: 'pedidos' }">
          <div class="total">
            <strong>1</strong>
          </div>
          <div class="link">
            <IconDirection stroke-width="1.5" size="20" />
          </div>
          <div class="description">
            <span>Pedidos não aprovados</span>
          </div>
        </router-link>
      </div>
</template>

<script setup>
    import IconDirection from '@/components/icons/IconLeft.vue'
</script>

<style lang="scss" scoped>

</style>