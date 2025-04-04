<script setup lang="ts">
import type { Product } from '@/types/product'
import { useRouter } from 'vue-router'
import { sanitizeHtml } from '@/utilities/util'

const router = useRouter()

type Props = {
  product: Pick<Product, 'id' | 'name' | 'shortDescription' | 'productTitle'>
}

defineProps<Props>()
const onProductClicked = (id: number) => {
  router.push({
    name: 'product-detail',
    params: { id },
  })
}
</script>

<template>
  <div class="product-item">
    <h2>{{ product.name }}</h2>
    <p v-html="sanitizeHtml(product.shortDescription)"></p>
    <p>{{ product.productTitle }}</p>

    <button class="product-item__view-button" @click="onProductClicked(product.id)">
      View Product
    </button>
  </div>
</template>

<style scoped>
.product-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border-color: white;
  border: 1px solid white;
  color: white;
  height: 24rem;
  position: relative;
}

.product-item__view-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  height: 2rem;
  float: right;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}

@media screen and (max-width: 768px) {
  .product-item {
    width: 100%;
    margin: 0;
    border-radius: 0;
    height: auto;
  }
  .product-item__view-button {
    position: static;
    float: none;
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
