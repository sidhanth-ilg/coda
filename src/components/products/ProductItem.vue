<script setup lang="ts">
import type { Product } from '@/types/product'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { sanitizeHtml } from '@/utilities/util'
import CodaButton from '@/components/common/CodaButton.vue'
import trashSVG from '@/assets/trash.svg'

const router = useRouter()

type Props = {
  product: Pick<Product, 'id' | 'name' | 'shortDescription' | 'productTitle'>
  fromPaginated?: boolean
}

type Emits = {
  delete: [id: number]
}

const emit = defineEmits<Emits>()

const props = defineProps<Props>()
const onProductClicked = (id: number) => {
  router.push({
    name: 'product-detail',
    params: { id },
  })
}

const onEditProductClicked = (id: number) => {
  router.push({
    name: 'create-product',
    params: { id },
    query: { edit: 'true', id, fromPaginated: props.fromPaginated ? 'true' : undefined },
  })
}

const testIds = computed(() => ({
  container: `product-item-${props.product.id}`,
  name: `product-item-${props.product.id}-name`,
  title: `product-item-${props.product.id}-title`,
  viewButton: `product-item-${props.product.id}-view-button`,
  editButton: `product-item-${props.product.id}-edit-button`,
}))
</script>

<template>
  <div class="product-item" :data-testid="testIds.container">
    <h2 :data-testid="testIds.name">{{ product.name }}</h2>
    <p v-html="sanitizeHtml(product.shortDescription)"></p>
    <p :data-testid="testIds.title">{{ product.productTitle }}</p>

    <div class="product-item__button-container">
      <CodaButton
        class="product-item__view-button"
        :data-testid="testIds.viewButton"
        @click="onProductClicked(product.id)"
      >
        View Product
      </CodaButton>
      <CodaButton :data-testid="testIds.editButton" @click="onEditProductClicked(product.id)">
        Edit Product
      </CodaButton>

      <img
        class="product-item__delete-icon"
        :src="trashSVG"
        alt="Delete Product"
        :data-testid="`delete-product-button-${product.id}`"
        @click="emit('delete', product.id)"
      />
    </div>
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

.product-item__button-container {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.product-item__view-button {
  margin-right: 1rem;
}

.product-item__delete-icon {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
}

@media screen and (max-width: 768px) {
  .product-item {
    width: 100%;
    margin: 0;
    border-radius: 0;
    height: auto;
  }
  .product-item__button-container {
    position: static;
    float: none;
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
