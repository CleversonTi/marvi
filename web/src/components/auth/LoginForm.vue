<template>
  <div>
    <form
      id="login-form"
      @submit.prevent="submitForm"
    >
      <div class="form-group">
        <label for="username">Usuário</label>
        <input
          v-model="username"
          type="text"
          required
          autocomplete="username"
        >
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            autocomplete="current-password"
          >
          <button
            type="button"
            class="toggle-password"
            @click="togglePassword"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
      </div>

      <button type="submit">
        Entrar
      </button>
      <p
        v-if="erroLogin"
        class="error-message"
      >
        {{ erroLogin }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const erroLogin = computed(() => authStore.erroLogin); // Obtém a mensagem de erro do store

const submitForm = async () => {
  console.log("username.value, password.value, router");
  console.log(username.value, password.value, router);

  // ✅ Correção: Enviar credenciais como um objeto, não como valores separados
  await authStore.fazerLogin({ 
    username: username.value, 
    password: password.value 
  }, router);
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped lang="scss">
 // Variáveis para cores e estilos principais
// Variáveis para cores e estilos principais
$primary-color: #4a90e2;
$secondary-color: #333;
$background-color: #f4f4f4;
$input-background: white;
$border-radius: 8px;
$transition-speed: 0.3s;

// Estilo geral do formulário
#login-form {
  width: 320px;
  margin: 40px auto;
  padding: 20px;
  background-color: $background-color;
  border-radius: $border-radius;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 6px;
      color: $secondary-color;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid $secondary-color;
      border-radius: $border-radius;
      background-color: $input-background;
      transition: border-color $transition-speed;

      &:focus {
        border-color: $primary-color;
        outline: none;
        box-shadow: 0 0 5px rgba($primary-color, 0.5);
      }
    }
     .password-wrapper {
        position: relative;
        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: $secondary-color;
          width: auto;
        }

     }

  }

  button {
    width: 100%;
    padding: 10px;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    transition: background-color $transition-speed;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
.error-message {
  color: red;
  margin-top: 10px;
}

</style>
