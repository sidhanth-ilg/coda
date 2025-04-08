<script setup lang="ts">
import type { Product } from '@/types/product'
import { ref, onMounted, watch } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
import CodaInput from '@/components/common/CodaInput.vue'
import CodaButton from '@/components/common/CodaButton.vue'

const route = useRoute()
const router = useRouter()
const { addProduct, getProducts, updateProduct, getProductById, removeProduct } = useProductsStore()

const isLoading = ref(false)

// Check if we're in edit mode
const isEditMode = ref(route.query.edit === 'true')
const productId = ref(route.query.id ? parseInt(route.query.id as string) : null)
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

const formFields = ref<
  Array<{
    id: keyof Product
    label: string
    type: string
    required?: boolean
    error?: boolean
  }>
>([
  { id: 'name', label: 'Name', type: 'text', required: true, error: false },
  { id: 'productTagline', label: 'Product Tagline', type: 'text', required: true },
  { id: 'shortDescription', label: 'Short Description', type: 'textarea', required: true },
  { id: 'longDescription', label: 'Long Description', type: 'textarea', required: true },
  { id: 'logoLocation', label: 'Logo Location', type: 'text' },
  { id: 'productUrl', label: 'Product URL', type: 'text', required: true },
  { id: 'voucherTypeName', label: 'Voucher Type Name', type: 'text', required: true },
  { id: 'orderUrl', label: 'Order URL', type: 'text', required: true },
  { id: 'productTitle', label: 'Product Title', type: 'text', required: true },
  { id: 'variableDenomPriceMinAmount', label: 'Min Price', type: 'number' },
  { id: 'variableDenomPriceMaxAmount', label: 'Max Price', type: 'number' },
])

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
  const isValid = !formFields.value.some((field) => field.required && !newProduct.value[field.id])

  if (!isValid) {
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

const handleDelete = async () => {
  if (isEditMode.value && productId.value) {
    const confirmDelete = confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      try {
        removeProduct(productId.value)
        alert('Product deleted successfully!')
        router.push({ name: isFromPaginated.value ? 'products-paginated' : 'products' })
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product.')
      }
    }
  }
}

watch(
  newProduct,
  (newValue) => {
    formFields.value.forEach((field) => {
      if (newValue[field.id] === '') {
        field.error = true
      } else {
        field.error = false
      }
    })
  },
  { deep: true },
)

const handleCancel = () => {
  router.push({ name: isFromPaginated.value ? 'products-paginated' : 'products' })
}
</script>
<template>
  <div class="create-product-view">
    <h1>{{ isEditMode ? 'Edit Product' : 'Create Product' }}</h1>
    <form class="create-product-view__form" @submit.prevent="handleSubmit">
      <CodaInput
        v-for="field in formFields"
        :id="field.id"
        :key="field.id"
        v-model.trim="newProduct[field.id]"
        :label="field.label"
        :type="field.type"
        :required="field.required"
        :disabled="isLoading"
        :error="field.error"
        :placeholder="'Enter ' + field.label.toLowerCase()"
      />

      <div class="create-product-view__buttons">
        <CodaButton
          type="primary"
          :disabled="isLoading"
          :data-testid="isEditMode ? 'update-product-button' : 'create-product-button'"
        >
          {{ isEditMode ? 'Update Product' : 'Create Product' }}
        </CodaButton>
        <!-- Delete product-->
        <CodaButton
          type="danger"
          :disabled="isLoading"
          data-testid="delete-product-button"
          class="create-product-view__delete-button"
          @click="handleDelete"
        >
          Delete Product
        </CodaButton>
        <CodaButton
          type="danger"
          :disabled="isLoading"
          data-testid="cancel-button"
          class="create-product-view__back-button"
          @click="handleCancel"
        >
          Cancel
        </CodaButton>
      </div>
    </form>
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

.create-product-view__form {
  width: 100%;
}
</style>
