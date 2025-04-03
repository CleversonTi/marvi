<script setup lang="ts">
import { CircleHelp } from 'lucide-vue-next';
</script>

<template>
  <v-list-item-title> 
    <v-list-item__content>
      <div class="v-list-item-title hepl">
        <router-link :to="{name: 'helper'}">
          <CircleHelp
            stroke-width="1.5"
            size="20"
          /> Ajuda
        </router-link>
      </div>
    </v-list-item__content>
  </v-list-item-title>
</template>
<style lang="scss">
.ExtraBox {
    position: relative;
}
.line-height-none {
    line-height: normal;
}
</style>
