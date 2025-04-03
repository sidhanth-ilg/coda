<script setup lang="ts">
import useProductsList from '@/components/products/composables/useProductsList'
import ProductItem from '@/components/products/ProductItem.vue'
import { useVirtualList } from '@vueuse/core'

const { products } = useProductsList()

const { list, containerProps, wrapperProps } = useVirtualList(products, {
  itemHeight: 384,
  overscan: 5,
})
</script>

<template>
  <div v-bind="containerProps" class="virtual-list-container">
    <div v-bind="wrapperProps">
      <ProductItem v-for="item in list" :key="item.data.id" :product="item.data" />
    </div>
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
