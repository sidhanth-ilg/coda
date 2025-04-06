<script setup lang="ts">
import type { Product } from '@/types/product'
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
import CodaInput from '@/components/common/CodaInput.vue'
import CodaButton from '@/components/common/CodaButton.vue'

const route = useRoute()
const router = useRouter()
const { addProduct, getProducts, updateProduct, getProductById } = useProductsStore()

// Check if we're in edit mode
const isEditMode = ref(route.query.edit === 'true')
const productId = ref(route.query.id ? parseInt(route.query.id as string, 10) : null)
const isFromPaginated = ref(route.query.fromPaginated === 'true')

const newProduct = ref<Product>({
  name: 'Sample Product',
  productTagline: 'Sample Tagline',
  shortDescription: 'Sample short description',
  longDescription: 'Sample long description',
  logoLocation: 'https://cdn1.codashop.com/S/content/common/images/mno/lordsmobile_640x241.jpeg',
  productUrl: 'https://example.com/logo.png',
  voucherTypeName: 'MAX_VOUCHER',
  orderUrl: 'https://example.com/logo.png',
  productTitle: 'https://example.com/logo.png',
  variableDenomPriceMinAmount: '20',
  variableDenomPriceMaxAmount: '30',
  gvtId: 0,
  id: getProducts.length + 1, // Incremental ID for simplicity
})

// Load product data if in edit mode
onMounted(() => {
  if (isEditMode.value && productId.value) {
    try {
      const product = getProductById(productId.value)
      newProduct.value = { ...product }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Product not found')
      router.push({ name: isFromPaginated.value ? 'products-paginated' : 'products' })
    }
  }
})

const handleSubmit = () => {
  // Validate the product data
  if (!newProduct.value.name || !newProduct.value.productTagline) {
    alert('Please fill in all required fields.')
    return
  }

  try {
    if (isEditMode.value && productId.value) {
      // Update existing product
      updateProduct(productId.value, newProduct.value)
      alert('Product updated successfully!')
    } else {
      // Add new product
      addProduct(newProduct.value)
      alert('Product created successfully!')
    }

    // Redirect back to products list
    router.push({ name: isFromPaginated.value ? 'products-paginated' : 'products' })
  } catch (error) {
    console.error('Error saving product:', error)
    alert(`Failed to ${isEditMode.value ? 'update' : 'create'} product.`)
  }
}
</script>
<template>
  <div class="create-product-view">
    <h1>{{ isEditMode ? 'Edit Product' : 'Create Product' }}</h1>
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
        is-textarea
      />

      <CodaInput
        label="Long Description"
        type="textarea"
        id="longDescription"
        placeholder="Enter detailed product description"
        v-model="newProduct.longDescription"
        is-textarea
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

      <!-- Update button text based on mode -->
      <CodaButton
        type="primary"
        @click="handleSubmit"
        :data-testid="isEditMode ? 'update-product-button' : 'create-product-button'"
        class="create-product-view__submit-button"
      >
        {{ isEditMode ? 'Update Product' : 'Create Product' }}
      </CodaButton>
    </div>
  </div>
</template>
<style scoped>
.create-product-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;
}
.create-product-view h1 {
  margin-bottom: 20px;
}
.create-product-view form {
  display: flex;
  flex-direction: column;
}
</style>
