<script setup lang="ts">
import useProductsList from '@/components/products/composables/useProductsList'
import ProductItem from '@/components/products/ProductItem.vue'
import useProductsDelete from '@/components/products/composables/useProductsDelete'
import EmptyProducts from '@/components/products/components/EmptyProducts.vue'
const { deleteProduct } = useProductsDelete()
const { products } = useProductsList()
</script>

<template>
  <div data-testid="product-list" class="product-list">
    <template v-if="products.length">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @delete="deleteProduct"
      />
    </template>

    <EmptyProducts v-else />
  </div>
</template>
<style scoped>
.product-list {
  width: 100%;
}
</style>
