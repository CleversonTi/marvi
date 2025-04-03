<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const checkbox = ref(true);
const router = useRouter();

const login = () => {
  if (username.value === 'admin' && password.value === '123') {
    localStorage.setItem('userType', 'admin');
    localStorage.setItem('userName', 'Administrador');
    router.push({ name: 'dashboard' }); // 🔥 Redireciona para dashboard
  } else if (username.value === 'rep' && password.value === '123') {
    localStorage.setItem('userType', 'representante');
    localStorage.setItem('userName', 'Representante Comercial');
    router.push({ name: 'dashboard' }); // 🔥 Redireciona para dashboard
  } else {
    alert('Credenciais inválidas! Tente novamente.');
  }
};
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">
        Username
      </v-label>
      <v-text-field 
        v-model="username"
        variant="outlined"
        hide-details
        color="primary"
      />
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">
        Password
      </v-label>
      <v-text-field 
        v-model="password"
        variant="outlined"
        type="password"
        hide-details
        color="primary"
      />
    </v-col>
    <v-col
      cols="12"
      class="pt-0"
    >
      <div class="d-flex flex-wrap align-center ml-n2">
        <v-checkbox
          v-model="checkbox"
          color="primary"
          hide-details
        >
          <template
            #label
            class="text-body-1"
          >
            Remember this Device
          </template>
        </v-checkbox>
        <div class="ml-sm-auto">
          <RouterLink 
            to="/" 
            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
          >
            Forgot Password ?
          </RouterLink>
        </div>
      </div>
    </v-col>
    <v-col
      cols="12"
      class="pt-0"
    >
      <v-btn
        color="primary"
        size="large"
        block
        flat
        @click="login"
      >
        Sign in
      </v-btn>
    </v-col>
  </v-row>
</template>
