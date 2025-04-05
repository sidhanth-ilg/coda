<script setup lang="ts">
import type { Product } from '@/types/product'
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import CodaInput from '@/components/common/CodaInput.vue'
import CodaButton from '@/components/common/CodaButton.vue'

const { addProduct, getProducts } = useProductsStore()

const newProduct = ref<Product>({
  name: 'sample name',
  productTagline: 'sample tagline',
  shortDescription: 'sample short description',
  longDescription: 'sample long description',
  logoLocation: 'https://cdn1.codashop.com/S/content/common/images/mno/lordsmobile_640x241.jpeg',
  productUrl: 'https://www.codashop.com/',
  voucherTypeName: 'MAX_DISCOUNT',
  orderUrl: 'www.codashop.com',
  productTitle: 'Sample Product Title',
  variableDenomPriceMinAmount: '20',
  variableDenomPriceMaxAmount: '40',
  gvtId: 0,
  id: getProducts.length + 1, // Incremental ID for simplicity
})

const createProduct = () => {
  if (
    !newProduct.value.name ||
    !newProduct.value.productTagline ||
    !newProduct.value.shortDescription ||
    !newProduct.value.longDescription ||
    !newProduct.value.productUrl ||
    !newProduct.value.voucherTypeName ||
    !newProduct.value.orderUrl ||
    !newProduct.value.productTitle
  ) {
    alert('Please fill in all required fields.')
    return
  }

  // Add the new product to the store
  addProduct(newProduct.value)

  // Reset the form
  newProduct.value = {
    name: '',
    productTagline: '',
    shortDescription: '',
    longDescription: '',
    logoLocation: '',
    productUrl: '',
    voucherTypeName: '',
    orderUrl: '',
    productTitle: '',
    variableDenomPriceMinAmount: '',
    variableDenomPriceMaxAmount: '',
    gvtId: 0,
    id: getProducts.values.length, // Incremental ID for simplicity
  }
}
</script>
<template>
  <div class="create-product-view">
    <h1>Create Product</h1>
    <div>
      <CodaInput
        label="Name"
        type="text"
        id="name"
        placeholder="Enter product name"
        v-model="newProduct.name"
      />
      <CodaInput
        label="Product Tagline"
        type="text"
        id="productTagline"
        placeholder="Enter product tagline"
        v-model="newProduct.productTagline"
      />
      <CodaInput
        label="Short Description"
        type="text"
        id="shortDescription"
        placeholder="Enter a short description"
        v-model="newProduct.shortDescription"
      />
      <CodaInput
        label="Long Description"
        type="textarea"
        id="longDescription"
        placeholder="Enter detailed product description"
        v-model="newProduct.longDescription"
      />
      <CodaInput
        label="Logo Location"
        type="text"
        id="logoLocation"
        placeholder="Enter logo URL or path"
        v-model="newProduct.logoLocation"
      />
      <CodaInput
        label="Product URL"
        type="text"
        id="productUrl"
        placeholder="Enter product website URL"
        v-model="newProduct.productUrl"
      />
      <CodaInput
        label="Voucher Type Name"
        type="text"
        id="voucherTypeName"
        placeholder="Enter voucher type"
        v-model="newProduct.voucherTypeName"
      />
      <CodaInput
        label="Order URL"
        type="text"
        id="orderUrl"
        placeholder="Enter order page URL"
        v-model="newProduct.orderUrl"
      />
      <CodaInput
        label="Product Title"
        type="text"
        id="productTitle"
        placeholder="Enter product title"
        v-model="newProduct.productTitle"
      />
      <CodaInput
        label="Variable Denom Price Min Amount"
        type="number"
        id="variableDenomPriceMinAmount"
        placeholder="Enter minimum price"
        v-model.number="newProduct.variableDenomPriceMinAmount"
      />
      <CodaInput
        label="Variable Denom Price Max Amount"
        type="number"
        id="variableDenomPriceMaxAmount"
        placeholder="Enter maximum price"
        v-model.number="newProduct.variableDenomPriceMaxAmount"
      />

      <!-- Add a submit button -->
      <CodaButton type="primary" @click="createProduct" data-testid="create-product-button">
        Create Product
      </CodaButton>
    </div>
  </div>
</template>
<style scoped>
.create-product-view {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;
}
</style>
