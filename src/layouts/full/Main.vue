<script setup lang="ts">
import { ref, shallowRef, onMounted, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import ExtraBox from './vertical-sidebar/extrabox/ExtraBox.vue';
import Mensagem from './msg-saudacao/Mensagem.vue';
import Header from './horizontal-header/Header.vue';

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
const collapsed = ref(false);
const { mobile } = useDisplay();
const route = useRoute();

// Persistir estado colapsado
onMounted(() => {
  const saved = localStorage.getItem('sidebar_collapsed');
  collapsed.value = saved === 'true';
})

watch(collapsed, (val) => {
  localStorage.setItem('sidebar_collapsed', String(val));
})
const username = ref('')
username.value ='representante';


const login = async () => {
  // Simulação de requisição de login
  const userType = (username.value === 'admin') ? 'admin' : 'representante'
  
  // Salva o tipo de usuário no localStorage
  localStorage.setItem('userType', userType)

  
}
</script>

<template>
  <Header />
  <v-navigation-drawer
    v-model="sDrawer"
    :mini-variant="!mobile && collapsed"
    :temporary="mobile"
   
    :mini-variant-width="80"
    app
    class="dark-drawer"
  >
    <div class="drawer-toggle-wrapper">
      <button
        class="drawer-toggle"
        @click="collapsed = !collapsed"
      >
        <v-icon :class="{ rotated: collapsed }">
          mdi-chevron-left
        </v-icon>
      </button>
    </div>

    <div class="pa-5">
      <Mensagem />
    </div>

    <div class="itens">
      <div class="menu">
        <v-list class="pa-6">
          <template
            v-for="(item, i) in sidebarMenu"
            :key="i"
          >
            <NavGroup
              v-if="item.header"
              :item="item"
              :collapsed="collapsed"
            />
            <NavItem
              v-else
              :item="item"
              :collapsed="collapsed"
            />
          </template>
        </v-list>
      </div>
      

      <div class="pa-4">
        <ExtraBox />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss">
.dark-drawer {
  position: relative;

&[mini-variant*='false'] {
  width: 250px;
  .v-navigation-drawer__content {
    flex: 0 1 auto;
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    min-height: 100vh;
  }
  .pa-5{
    margin-bottom: 2rem;
  }
  
  .itens{
    flex: 1;
      .menu{
        border-top: 1px solid #BABABA;
        border-bottom: 1px solid #BABABA;
        padding: 3px 0;
      }
    .pa-6{
     
      //margin: 5rem 0 !important;

    }
  }
  .v-list-item{
   
  }
}
&[mini-variant*='true'] {
  width:80px !important;
  
  .pa-5{
    display: none;
  }
  .itens{
      padding-top: 5rem;
    }
  .v-list-item{
    min-width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    column-gap: unset;

    
    
    .v-list-item__prepend{
      
    }
  }

}
  .drawer-toggle-wrapper {
    position: absolute;
    top: 16px;
    right: -16px;
    z-index: 999;
  }

  .drawer-toggle {
    background-color: #ffffff;
    color: #1B1B1B;
    border: none;
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }

    .v-icon {
      transition: transform 0.3s ease;
    }

    .v-icon.rotated {
      transform: rotate(180deg);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
