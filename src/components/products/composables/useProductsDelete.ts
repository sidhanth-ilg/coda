import { useProductsStore } from '@/stores/products'

type Emit = (event: 'delete') => void

const useProductDelete = (emit?: Emit) => {
  const { removeProduct } = useProductsStore()

  const deleteProduct = async (productId: number) => {
    //ask for confirmation
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (confirmDelete) {
      try {
        await removeProduct(productId)
        alert('Product deleted successfully')
        emit?.('delete')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product')
      }
    }
  }
  return {
    deleteProduct,
  }
}

export default useProductDelete
