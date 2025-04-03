import { useProductsStore } from '@/stores/products'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/product'

const searchTerm = ref('')

const useProductsList = () => {
  const productsStore = useProductsStore()
  const products = storeToRefs(productsStore).getProducts

  //Data

  const filteredProducts = computed(() => {
    return productsStore.products.filter((product: Product) => {
      if (!searchTerm.value) {
        return products.value
      }
      return (
        product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.productTagline.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.productTitle.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.voucherTypeName.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })
  })

  const loading = computed(() => productsStore.loading)

  return {
    products: filteredProducts,
    loading,
    searchTerm,
  }
}

export default useProductsList
