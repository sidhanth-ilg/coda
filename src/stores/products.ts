import productsJSON from '@/assets/api/products.json'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(productsJSON.products)
  const loading = ref(false)

  const getProducts = computed(() => products.value)

  function setLoading(value: boolean): void {
    loading.value = value
  }

  function addProduct(product: Product): void {
    products.value.push(product)
  }
  function removeProduct(productId: number): void {
    const productIndex = products.value.findIndex((product) => product.id === productId)
    if (productIndex === -1) {
      throw new Error(`Product with id ${productId} not found`)
    }
    products.value = products.value.filter((product) => product.id !== productId)
  }

  function updateProduct(productId: number, updatedProduct: Product): void {
    const productIndex = products.value.findIndex((product) => product.id === productId)
    if (productIndex !== -1) {
      products.value[productIndex] = { ...products.value[productIndex], ...updatedProduct }
    } else {
      throw new Error(`Product with id ${productId} not found`)
    }
  }

  const getProductById = (id: number): Product => {
    const product = products.value.find((product) => product.id === id)
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }
    return product
  }

  return {
    products,
    loading,
    getProducts,
    updateProduct,
    setLoading,
    addProduct,
    removeProduct,
    getProductById,
  }
})
