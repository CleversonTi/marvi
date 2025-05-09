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

      <button
        type="submit"
        :disabled="loading"
        class="btn-login"
      >
        <span
          v-if="loading"
          class="spinner"
        />
        <span v-else>Entrar</span>
      </button>
      <div class="form-group lembrar-group">
        <label>
          <input
            v-model="lembrarMe"
            type="checkbox"
          >
          <span>
            Lembrar-me
          </span>
        </label>
      </div>

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
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const lembrarMe = ref(localStorage.getItem('lembrarUsername') !== null);

// Pré-preenche username se salvo
username.value = lembrarMe.value ? localStorage.getItem('lembrarUsername') : '';

const erroLogin = computed(() => authStore.erroLogin);
const loading = computed(() => authStore.loading);

const submitForm = async () => {
  if (lembrarMe.value) {
    localStorage.setItem('lembrarUsername', username.value);
  } else {
    localStorage.removeItem('lembrarUsername');
  }

  await authStore.fazerLogin(
    {
      username: username.value,
      password: password.value
    },
    router
  );

  if (authStore.token) {
    toast.success('🎉 Login realizado com sucesso!');
    router.push({ name: 'account' });
  } else if (erroLogin.value) {
    toast.error(erroLogin.value);
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped lang="scss">
$primary-color: #4a90e2;
$secondary-color: #333;
$background-color: #f4f4f4;
$input-background: white;
$border-radius: 8px;
$transition-speed: 0.3s;

#login-form {
  width: 320px;
  margin: 40px auto;
  padding: 20px;
  background-color: $background-color;
  border-radius: $border-radius;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
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
  .lembrar-group {
    
    font-size: 14px;
    color: $secondary-color;
    label{
      display: flex;
      align-items: center;
    }
    input[type='checkbox'] {
      margin-right: 6px;
      width: 15px;
      height: 15px;
    }
}

  .btn-login {
    width: 100%;
    padding: 10px;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    transition: background-color $transition-speed;
    text-align: center;

    &:hover {
      background-color: darken($primary-color, 10%);
    }

    &:disabled {
      background-color: lighten($primary-color, 15%);
      cursor: not-allowed;
    }
  }

  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s ease-in-out infinite;
    vertical-align: middle;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
