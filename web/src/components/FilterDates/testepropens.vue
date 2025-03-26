<script setup>
import { ref } from 'vue';
defineProps({
	name: String,
	
})

</script>
<template>
   <span>Resultado:{{name}}</span>
  <div class="area-calendar">
    
  </div>
</template>