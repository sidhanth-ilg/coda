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
        id="name"
        v-model="newProduct.name"
        label="Name"
        type="text"
        placeholder="Enter product name"
      />

      <CodaInput
        id="productTagline"
        v-model="newProduct.productTagline"
        label="Product Tagline"
        type="text"
        placeholder="Enter product tagline"
      />

      <CodaInput
        id="shortDescription"
        v-model="newProduct.shortDescription"
        label="Short Description"
        type="text"
        placeholder="Enter a short description"
        is-textarea
      />

      <CodaInput
        id="longDescription"
        v-model="newProduct.longDescription"
        label="Long Description"
        type="textarea"
        placeholder="Enter detailed product description"
        is-textarea
      />

      <CodaInput
        id="logoLocation"
        v-model="newProduct.logoLocation"
        label="Logo Location"
        type="text"
        placeholder="Enter logo URL or path"
      />

      <CodaInput
        id="productUrl"
        v-model="newProduct.productUrl"
        label="Product URL"
        type="text"
        placeholder="Enter product website URL"
      />

      <CodaInput
        id="voucherTypeName"
        v-model="newProduct.voucherTypeName"
        label="Voucher Type Name"
        type="text"
        placeholder="Enter voucher type"
      />

      <CodaInput
        id="orderUrl"
        v-model="newProduct.orderUrl"
        label="Order URL"
        type="text"
        placeholder="Enter order page URL"
      />

      <CodaInput
        id="productTitle"
        v-model="newProduct.productTitle"
        label="Product Title"
        type="text"
        placeholder="Enter product title"
      />

      <CodaInput
        id="variableDenomPriceMinAmount"
        v-model.number="newProduct.variableDenomPriceMinAmount"
        label="Variable Denom Price Min Amount"
        type="number"
        placeholder="Enter minimum price"
      />

      <CodaInput
        id="variableDenomPriceMaxAmount"
        v-model.number="newProduct.variableDenomPriceMaxAmount"
        label="Variable Denom Price Max Amount"
        type="number"
        placeholder="Enter maximum price"
      />

      <!-- Update button text based on mode -->
      <CodaButton
        type="primary"
        :data-testid="isEditMode ? 'update-product-button' : 'create-product-button'"
        class="create-product-view__submit-button"
        @click="handleSubmit"
      >
        {{ isEditMode ? 'Update Product' : 'Create Product' }}
      </CodaButton>
      <CodaButton
        class="create-product-view__back-button"
        data-testid="back-button"
        @click="$router.push({ name: isFromPaginated ? 'products-paginated' : 'products' })"
      >
        Go Back
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
.create-product-view__back-button {
  margin-left: 1rem;
}
</style>
