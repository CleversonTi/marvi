<script setup lang="js">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';

</script>
<template>
  <div class="authentication">
    <v-container
      fluid
      class="pa-3"
    >
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col
          cols="12"
          lg="4"
          xl="3"
          class="d-flex align-center"
        >
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4 header">
                <div class="logo-wrapper">
                  <div class="logo">
                    <router-link to="/">
                      <img src="@/assets/images/logos/logo.png">
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="text-body-1 text-muted text-center mb-3">
                Seja bem-vindo ao sistema de gestão de pedidos Marvi
              </div>
              <LoginForm />
              <h6 class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                Primeiro acesso?
                <RouterLink
                  :to="{name: 'register'}"
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  Criar uma conta
                </RouterLink>
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss">
.authentication{
  .header{
    background: #E6223D;
    border-radius: 12px 12px 0 0;
    padding: 1rem;
    margin-bottom: 1rem;
    .logo {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
}
.logo-wrapper {
 background: #E6223D;
 widows: 100%;
}
</style>
