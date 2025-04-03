<script setup>

import teste from '@/components/FilterDates/testepropens.vue';
let database = ref([
	{
		name: "Johnny",
		deparment: "Marketing",
		salary: 30000
	},
	{
		name: "Sarah",
		deparment: "Engineering",
		salary: 72000
	},
	{
		name: "Terrance",
		deparment: "Executive",
		salary: 125000
	}
])
</script>

<template>
    <teste name="teste"/>
   
</template>