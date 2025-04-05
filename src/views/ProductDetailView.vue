<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import useProductsList from '@/components/products/composables/useProductsList'
import { useProductsStore } from '@/stores/products'
import CodaButton from '@/components/common/CodaButton.vue'

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

const onOrderNowClicked = () => {
  // Handle order now action
  // This could be a redirect to the order URL or any other action
  window.open(product.value?.orderUrl, '_blank')
}

const copyVoucherCode = () => {
  if (product.value?.voucherTypeName) {
    navigator.clipboard.writeText(product.value.voucherTypeName).then(() => {
      alert('Voucher code copied to clipboard!')
    })
  }
}
</script>
<template>
  <div class="product-detail-view">
    <img
      v-if="product?.logoLocation"
      class="product-detail-view__image-banner"
      :src="product?.logoLocation"
      alt="Product Logo"
    />
    <h1>{{ product?.name }}</h1>
    <p class="product-detail-view__long-description" v-html="product?.longDescription"></p>
    <p>{{ product?.productTitle }}</p>
    <p>{{ product?.productTagline }}</p>

    <CodaButton
      v-if="product?.orderUrl"
      type="primary"
      class="product-detail-view__order-button"
      :disabled="!product?.orderUrl"
      @click="onOrderNowClicked"
    >
      Order Now
    </CodaButton>

    <div>
      Use discount voucher code:
      <div @click="copyVoucherCode" class="product-detail-view__voucher-code">
        {{ product?.voucherTypeName }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.product-detail-view {
  margin-bottom: 8rem;
  color: white;
}
.product-detail-view__image-banner {
  width: 100%;
  height: auto;
}

.product-detail-view__voucher-code {
  border: 1px dashed #007bff;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
  color: gold;
  text-align: center;
  cursor: pointer;
}

.product-detail-view__long-description {
  margin: 1rem 0;
}

.product-detail-view__order-button {
  margin: 1rem 0;
}
</style>
