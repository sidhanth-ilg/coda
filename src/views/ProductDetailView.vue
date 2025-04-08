<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
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
  window.open(product.value?.orderUrl, '_blank')
}

const copyVoucherCode = () => {
  if (product.value?.voucherTypeName) {
    navigator.clipboard.writeText(product.value.voucherTypeName).then(() => {
      alert('Voucher code copied to clipboard!')
    })
  }
}

const testIds = computed(() => ({
  container: `product-detail-view-${product.value?.id}`,
  image: `product-detail-view-${product.value?.id}-image`,
  orderButton: `product-detail-view-${product.value?.id}-order-button`,
  voucherCode: `product-detail-view-${product.value?.id}-voucher-code`,
}))
</script>
<template>
  <div class="product-detail-view">
    <header>
      <CodaButton
        class="product-detail-view__back-button"
        type="primary"
        :data-testid="testIds.container"
        @click="$router.go(-1)"
      >
        Back to Products
      </CodaButton>
    </header>
    <img
      v-if="product?.logoLocation"
      class="product-detail-view__image-banner"
      :src="product?.logoLocation"
      alt="Product Logo"
      :data-testid="testIds.image"
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
      :data-testid="testIds.orderButton"
      @click="onOrderNowClicked"
    >
      Order Now
    </CodaButton>

    <div>
      Use discount voucher code:
      <div
        :data-testid="testIds.voucherCode"
        class="product-detail-view__voucher-code"
        @click="copyVoucherCode"
      >
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

.product-detail-view__back-button {
  margin: 1rem 0;
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
