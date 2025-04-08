<script setup lang="ts">
import useProductsPaginatedList from '@/components/products/composables/useProductsPaginatedList'
import useProductsDelete from '@/components/products/composables/useProductsDelete'

import ProductItem from '@/components/products/ProductItem.vue'

//import { useVirtualList } from '@vueuse/core'
export type PaginatedListEmits = {
  delete: []
}

const emit = defineEmits<PaginatedListEmits>()
const { products } = useProductsPaginatedList()
const { deleteProduct } = useProductsDelete(emit)

// const { list, containerProps, wrapperProps } = useVirtualList(products, {
//   itemHeight: 384,
//   overscan: 5,
// })
</script>

<template>
  <!-- <div v-bind="containerProps" class="virtual-list-container">
    <div v-bind="wrapperProps">
      <ProductItem v-for="item in list" :key="item.data.id" :product="item.data" />
    </div>
  </div> -->
  <div data-testid="product-list-paginated" class="product-list-paginated">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      from-paginated
      @delete="deleteProduct"
    />
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
.product-list-paginated {
  width: 100%;
}
</style>
