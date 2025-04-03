<script setup lang="ts">
import type { Product } from '@/types/product'
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products'

const { addProduct, getProducts } = useProductsStore()

const newProduct = ref<Product>({
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
  id: getProducts.length + 1, // Incremental ID for simplicity
})

const createProduct = () => {
  // Validate the new product data
  if (!newProduct.value.name || !newProduct.value.productTagline) {
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
    <form>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newProduct.name" />
      </div>
      <div>
        <label for="productTagline">Product Tagline:</label>
        <input type="text" id="productTagline" v-model="newProduct.productTagline" />
      </div>
      <div>
        <label for="shortDescription">Short Description:</label>
        <input type="text" id="shortDescription" v-model="newProduct.shortDescription" />
      </div>
      <div>
        <label for="longDescription">Long Description:</label>
        <textarea id="longDescription" v-model="newProduct.longDescription"></textarea>
      </div>
      <div>
        <label for="logoLocation">Logo Location:</label>
        <input type="text" id="logoLocation" v-model="newProduct.logoLocation" />
      </div>
      <div>
        <label for="productUrl">Product URL:</label>
        <input type="text" id="productUrl" v-model="newProduct.productUrl" />
      </div>
      <div>
        <label for="voucherTypeName">Voucher Type Name:</label>
        <input type="text" id="voucherTypeName" v-model="newProduct.voucherTypeName" />
      </div>
      <div>
        <label for="orderUrl">Order URL:</label>
        <input type="text" id="orderUrl" v-model="newProduct.orderUrl" />
      </div>
      <div>
        <label for="productTitle">Product Title:</label>
        <input type="text" id="productTitle" v-model="newProduct.productTitle" />
      </div>
      <div>
        <label for="variableDenomPriceMinAmount">Variable Denom Price Min Amount:</label>
        <input
          type="number"
          id="variableDenomPriceMinAmount"
          v-model.number="newProduct.variableDenomPriceMinAmount"
        />
      </div>
      <div>
        <label for="variableDenomPriceMaxAmount">Variable Denom Price Max Amount:</label>
        <input
          type="number"
          id="variableDenomPriceMaxAmount"
          v-model.number="newProduct.variableDenomPriceMaxAmount"
        />
      </div>

      <!-- Add a submit button -->
      <button type="submit" @click.prevent="createProduct">Create Product</button>
    </form>
  </div>
</template>
