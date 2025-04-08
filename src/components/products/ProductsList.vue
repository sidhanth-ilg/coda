<script setup lang="ts">
import useProductsList from '@/components/products/composables/useProductsList'
import ProductItem from '@/components/products/ProductItem.vue'
import useProductsDelete from '@/components/products/composables/useProductsDelete'
const { deleteProduct } = useProductsDelete()
const { products } = useProductsList()
</script>

<template>
  <div data-testid="product-list">
    <template v-if="products.length">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @delete="deleteProduct"
      />
    </template>
    <div v-else>
      <p class="products-list__empty-text">Sorry ! No products found.</p>
    </div>
  </div>
</template>
<style scoped>
.products-list__empty-text {
  color: white;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
}
</style>
