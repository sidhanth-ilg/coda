<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import useProductsList from '@/components/products/composables/useProductsList'
import { useProductsStore } from '@/stores/products'

const route = useRoute()
const { getProductById } = useProductsStore()
const productId = route.params.id
const productsStore = useProductsStore()
const product = computed(() => {
  const product = getProductById(Number(productId))
  if (!product) {
    return null
  }
  return productsStore.getProductById(product.id)
})
</script>
<template>
  <div class="product-detail-view">
    <h1>{{ product?.name }}</h1>
    <p v-html="product?.longDescription"></p>
    <p>{{ product?.productTitle }}</p>
  </div>
</template>
