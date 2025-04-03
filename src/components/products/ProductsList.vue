<script setup lang="ts">
import useProductsList from '@/components/products/composables/useProductsList'
import ProductItem from '@/components/products/ProductItem.vue'

const { products } = useProductsList()
</script>

<template>
  <ProductItem v-for="product in products" :key="product.id" :product="product" />
</template>
