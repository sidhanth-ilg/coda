//generic input components

<script setup lang="ts">
const model = defineModel<string | number | null>()

type Props = {
  label: string
  type: string
  placeholder: string
  error?: boolean
  isTextarea?: boolean
}

defineProps<Props>()
</script>

<template>
  <label :for="label" class="coda-input-label">
    {{ label }}
  </label>
  <textarea
    v-if="isTextarea"
    :id="label"
    v-model="model"
    :placeholder="placeholder"
    class="coda-input__input coda-input__input-textarea"
    :class="{ 'coda-input__input-error': error }"
    v-bind="$attrs"
  ></textarea>
  <input
    v-else
    :id="label"
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    class="coda-input__input"
    v-bind="$attrs"
    :class="{ 'coda-input__input-error': error }"
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

.coda-input__input-textarea {
  height: 12rem;
}

.coda-input__input-error {
  border: 4px solid #e53e3e;
}
</style>
