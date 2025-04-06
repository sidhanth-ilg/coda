import { useProductsStore } from '@/stores/products'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/product'

const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(2) // Number of items to display per page

const useProductsList = () => {
  const productsStore = useProductsStore()

  // Filter products based on search term
  const filteredProducts = computed(() => {
    return productsStore.products.filter((product: Product) => {
      if (!searchTerm.value) {
        return true
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

  // Calculate pagination metrics
  const totalItems = computed(() => filteredProducts.value.length)
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

  // Get the current page of products
  const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return filteredProducts.value.slice(startIndex, endIndex)
  })

  // Pagination methods
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const loading = computed(() => productsStore.loading)

  return {
    products: paginatedProducts,
    filteredProducts,
    loading,
    searchTerm,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    itemsPerPage,
  }
}

export default useProductsList
