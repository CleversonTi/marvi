<template>
  <div>{{ nomeDaRotaFormatado }}</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const formatarNomeRota = (name) => {
    if (!name) return '';
    const palavras = name.split('-').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1));
    return palavras.join(' ');
}

const nomeDaRotaFormatado = computed(() => formatarNomeRota(route.name));
</script>
