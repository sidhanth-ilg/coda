<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import useProductsList from '@/components/products/composables/useProductsList'
import { useProductsStore } from '@/stores/products'

// id: number
//   gvtId: number
//   name: string
//   productTagline: string
//   shortDescription: string
//   longDescription: string
//   logoLocation: string
//   productUrl: string
//   voucherTypeName: string
//   orderUrl: string
//   productTitle: string
//   variableDenomPriceMinAmount: string
//   variableDenomPriceMaxAmount: string

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
      class="product-detail-view__image-banner"
      :src="product?.logoLocation"
      alt="Product Logo"
    />
    <h1>{{ product?.name }}</h1>
    <p v-html="product?.longDescription"></p>
    <p>{{ product?.productTitle }}</p>
    <p>{{ product?.productTagline }}</p>
    <p v-html="product?.shortDescription"></p>
    <div>
      You can order here

      <button class="product-detail-view__order-button" @click="onOrderNowClicked">
        Order Now
      </button>
    </div>
    <div>
      Use discount voucher code:
      <div @click="copyVoucherCode" class="product-detail-view__voucher-code">
        {{ product?.voucherTypeName }}
      </div>
    </div>

    <!-- <p>{{ product?.variableDenomPriceMinAmount }}</p>
    <p>{{ product?.variableDenomPriceMaxAmount }}</p> -->
    <p>
      Price is between {{ product?.variableDenomPriceMinAmount }} -
      {{ product?.variableDenomPriceMaxAmount }}
    </p>
  </div>
</template>
<style scoped>
.product-detail-view {
  margin-bottom: 8rem;
}
.product-detail-view__image-banner {
  width: 100%;
  height: auto;
}

.product-detail-view__order-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
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
</style>
