//generic input components

<script setup lang="ts">
const model = defineModel()

type Props = {
  label: string
  type: string
  placeholder: string
  error?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <label :for="label" class="coda-input-label">
    {{ label }}
  </label>
  <input
    :id="label"
    :type="type"
    :placeholder="placeholder"
    v-model="model"
    class="coda-input__input"
  />
</template>
<style scoped>
.coda-input-label {
  font-size: 14px;
  font-weight: 500;
  color: white;
}
.coda-input__input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 16px;
  color: #2d3748;
  margin-bottom: 1rem;
}
</style>
