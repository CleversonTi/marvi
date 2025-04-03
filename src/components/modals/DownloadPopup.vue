<template>
  <div class="modal-download">
    <transition name="fade-slide">
      <div
        v-if="isVisible"
        class="popup"
        @click.stop
      >
        <div class="popup-header">
          <DownloadIcon />
          <h3>Download</h3>
        </div>
        <ul class="download-options">
          <li @click="baixar('PDF')">
            • PDF
          </li>
          <li @click="baixar('XLSX')">
            • XLSX
          </li>
          <li @click="baixar('TXT')">
            • TXT
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DownloadIcon } from 'lucide-vue-next';

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(['close', 'download']);

const fecharPopup = () => {
  emit('close');
};

const baixar = (formato) => {
  emit('download', formato);
  fecharPopup();
};
</script>


