import { useProductsStore } from '@/stores/products'
import { useToast } from 'vue-toastification'

type Emit = (event: 'delete') => void

const useProductDelete = (emit?: Emit) => {
  const { removeProduct } = useProductsStore()
  const toast = useToast()

  const deleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      try {
        await removeProduct(productId)
        toast.success('Product deleted successfully')
        emit?.('delete')
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product')
      }
    }
  }
  return {
    deleteProduct,
  }
}

export default useProductDelete
