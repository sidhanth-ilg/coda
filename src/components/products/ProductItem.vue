<script setup lang="ts">
import type { Product } from '@/types/product'
import { useRouter } from 'vue-router'
import { sanitizeHtml } from '@/utilities/util'
import CodaButton from '@/components/common/CodaButton.vue'

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
  <div class="product-item" :data-testid="`product-item-${product.id}`">
    <h2 :data-testid="`product-item-${product.id}-name`">{{ product.name }}</h2>
    <p v-html="sanitizeHtml(product.shortDescription)"></p>
    <p :data-testid="`product-item-${product.id}-title`">{{ product.productTitle }}</p>

    <CodaButton
      class="product-item__view-button"
      @click="onProductClicked(product.id)"
      :data-testid="`product-item-${product.id}-view-button`"
    >
      View Product
    </CodaButton>
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
  /*  min-height needs to be made heigh if want virtual list */
  min-height: 24rem;
  position: relative;
}

.product-item__view-button {
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
