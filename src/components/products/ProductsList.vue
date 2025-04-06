<script setup lang="ts">
import useProductsList from '@/components/products/composables/useProductsList'
import ProductItem from '@/components/products/ProductItem.vue'

const { products } = useProductsList()
</script>

<template>
  <div data-testid="product-list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
<style scoped>
.virtual-list-container {
  height: calc(100vh - 120px);
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
