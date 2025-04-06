<!-- Generic button component-->
<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

type Props = {
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  disabled?: boolean
  dataTestId?: string
}

type Emits = {
  click: []
}
withDefaults(defineProps<Props>(), {
  type: 'primary',
  disabled: false,
  dataTestId: 'coda-button',
})

const emit = defineEmits<Emits>()
</script>
<template>
  <button
    :data-testid="dataTestId"
    :class="['coda-button', type]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.coda-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
.coda-button.primary {
  background-color: #007bff;
  color: white;
}
.coda-button.secondary {
  background-color: #6c757d;
  color: white;
}
.coda-button.success {
  background-color: #28a745;
  color: white;
}
.coda-button.danger {
  background-color: #dc3545;
  color: white;
}
.coda-button.warning {
  background-color: #ffc107;
  color: black;
}
</style>
