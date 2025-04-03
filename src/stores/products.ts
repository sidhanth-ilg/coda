import productsJSON from '@/assets/api/products.json'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(productsJSON.products)
  const loading = ref(false)

  const getProducts = computed(() => products.value)

  function setLoading(value: boolean) {
    loading.value = value
  }

  function addProduct(product: Product) {
    products.value.push(product)
  }
  function removeProduct(productId: number) {
    products.value = products.value.filter((product) => product.id !== productId)
  }

  const getProductById = (id: number) => {
    const product = products.value.find((product) => product.id === id)
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }
    return product
  }

  return { products, loading, getProducts, setLoading, addProduct, removeProduct, getProductById }
})
